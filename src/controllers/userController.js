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
        console.log(provincias)
        Promise.all([todos, provincias])
        .then(function([usuario, provincia]){
            res.render('user/register',{usuarios:usuario, provincias:provincia});
        }) 
    },
    
    procesoDeRegistro: (req, res)=>{
        db.State.findAll()
        .then(function(provincias){
            const resultadoValidaciones = validationResult(req);
            console.log(resultadoValidaciones);
            if(resultadoValidaciones.errors.length > 0){
                return res.render('user/register',{
                    errors: resultadoValidaciones.mapped(),
                    oldData: req.body, provincias:provincias
                });
            };  
        })      

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
                if (req.body.recuerdame) {
					res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
				}
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
        
        // modificar:(req,res) =>{

        //     res.render('user/modificar',{user:req.session.usuarioLogueado})
        // },
        
        // logout:(req,res) =>{
        //     res.clearCookie('userEmail');
        //     req.session.destroy();
        //     return res.redirect('/')
        // }
        // */
};
    
    module.exports = userController;
    
    
    