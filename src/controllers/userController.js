const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const User = require ('../helpers/User'); //Traigo el modelo User para usarlo en este controlador
const db = require("../database/models")  //Aca traigo los mopdelos de la base de datos.

const userController = {
    //formulario registro
    registrarse:(req,res)=>{
       let todos = db.Usuario.findAll();
       let provincias = db.State.findAll();
       //let roles = db.Role.findAll();
       Promise.all([todos, provincias])
       .then(function([usuario, provincia]){
        res.render('user/register',{usuarios:usuario, provincias:provincia});
       })
    },
    
    procesoDeRegistro: async (req, res)=>{
        let provincias = await db.State.findAll()
        const resultadoValidaciones = validationResult(req);
        if (resultadoValidaciones.errors.length > 0){
            return res.render('user/register',{
                errors: resultadoValidaciones.mapped(),
                oldData: req.body, 
                provincias: provincias
            });
        };  

        let usuarioCreado = {
            name:req.body.nombre,
            street:req.body.direccion,
            number:req.body.numero,
            city:req.body.ciudad,
            state_id:req.body.provincia,
            postal_code:req.body.codigoPostal,
            phone:req.body.telefono,
            email:req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10),
            image: req.file.filename, 
            acept_terms: req.body.aceptoTerminos
        };

        db.Usuario.create(usuarioCreado)
        .then(function() {
            return res.redirect('/user');
        })    
    },
    listado:(req,res)=> {
        db.Usuario.findAll()
           .then(function(usuarios){
               res.render("user/listadoUsuarios", {Usuario:usuarios})
           }) 
    },

    detalleUsuarios:(req,res) => {

        db.Usuario.findByPk(req.params.id,{
            include:[{association:"states"}, {association:"roles"}
            ]
        })
        .then(function(usuario){
            res.render('user/detalleUsuario', {Usuario:usuario})
        })
    },
    
    
    //formulario login
    ingreso:(req, res)=>{
        //console.log(req.session);
        
            res.render('user/login',{title: 'logueate',});
        },
        
    procesoDeLogin: async (req, res)=>{
        //voy a ver si el usuario ya esta registrado
        const usuarioRegistrado = await db.Usuario.findOne({
            where: {
                email: req.body.email
            }
        });

        if (usuarioRegistrado) {
            let contraseniaCorrecta = bcryptjs.compareSync(req.body.password, usuarioRegistrado.password);
            
            if (contraseniaCorrecta) {
                //elimino la contraseña para que no quede guardada al navegar 
                delete usuarioRegistrado.password
                //ACA GUARDO AL USUARIO REGISTRADO ↓
                req.session.usuarioLogueado = usuarioRegistrado;

                //creo la cookie
                res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
                
                //voy a la vista del usuario
                return res.redirect('user/usuario');  
            } 

            return res.render('user/login', {
                errors:{
                    email:{
                        msg: 'Contraseña o usuario incorrecto'
                    },
                    password:{
                        msg: 'Contraseña o usuario incorrecto'
                    }                                    
                }
            });
        }
        
        return res.render('user/login',{
            errors:{
                email:{
                    msg: 'Usuario no registrado'
                }                                   
            }
        });
    },
        //Perfil
    cliente:(req,res)=>{
            
            res.render('user/usuario', {
                //aca dejo a USER como req en la vista ejs (con user vas a poder usarlo en ejs);
            user:req.session.usuarioLogueado}) 
        },
        
    modificar:(req,res) =>{
        let usuarioEditar=db.Usuario.findByPk(req.params.id)
        let listaProvincias=db.State.findAll()
        let listaRoles=db.Role.findAll()

        Promise.all([usuarioEditar, listaProvincias, listaRoles])
        .then(function([usuario, provincia, role]){
            res.render('user/modificar', {title: 'Editar usuarios', Usuario:usuario, provincias:provincia, Role:role})
        })
           // res.render('user/modificar',{user:req.session.usuarioLogueado})

    },
    modificarUsuario: async (req, res) =>{
        let provincias = await db.State.findAll()
        const resultadoValidaciones = validationResult(req);
        if (resultadoValidaciones.errors.length > 0){
            return res.render('user/modificar',{
                errors: resultadoValidaciones.mapped(),
                oldData: req.body, 
                provincias: provincias
            });
        };    
        
        let usuarioEditado ={
            name:req.body.nombre,
            street:req.body.direccion,
            number:req.body.numero,
            city:req.body.ciudad,
            state_id:req.body.provincia,
            postal_code:req.body.codigoPostal,
            phone:req.body.telefono,
            email:req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10), 
            acept_terms: req.body.aceptoTerminos
        }
             if (req.file){
            usuarioEditado.image= req.file.filename}
        
       db.Usuario.update(usuarioEditado,
            { where: {id:req.params.id}})
    
        .then(() => res.redirect('/user/detalle/'+req.params.id))
        },
    logout:(req,res) =>{
            res.clearCookie('userEmail');
            req.session.destroy();
            return res.redirect('/')
        },
        borrar: function(req,res) {
            db.Usuario.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.redirect('/user/listadoUsuarios');
        }  
    }
    
    module.exports = userController;
    
    
    