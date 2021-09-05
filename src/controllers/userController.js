const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const User = require ('../models/User');
//Traigo el modelo User para usarlo en este controlador

const userController = {
    
    registrarse:(req,res)=>{
        res.render('user/register',{title: 'registrate'});
    },
    
    procesoDeRegistro: (req, res)=>{
        
        const resultadoValidaciones = validationResult(req);
        if(resultadoValidaciones.errors.length > 0){
            return res.render('user/register',{
                errors: resultadoValidaciones.mapped(),
                oldData: req.body,
            });
        };
        let usuarioExistente = User.buscarPorCampo('email', req.body.email);
        if (usuarioExistente) {
            return res.render('user/register',{
                errors: {
                    email:{
                        msg: 'Este email ya esta registrado'
                    }
                },
                oldData: req.body,
            });
        };
        let usuarioCreado = {
            ...req.body,
        password: bcryptjs.hashSync(req.body.password, 10),
        avatar:req.file.filename
        };

        User.crearUsuario(usuarioCreado);

        return res.redirect('/user');
    },

    
    ingreso:(req, res)=>{
        //console.log(req.session);
            res.render('user/login',{title: 'logueate',});
        },
        
    procesoDeLogin:(req, res)=>{
        let usuarioRegistrado = User.buscarPorCampo('email', req.body.email);

        if (usuarioRegistrado){
            let contraseniaCorrecta= bcryptjs.compareSync(req.body.password, usuarioRegistrado.password);
            if (contraseniaCorrecta) {
                //elimino la contraseña para que no quede guardada al navegar 
                delete usuarioRegistrado.password
                //ACA GUARDO AL USUARIO REGISTRADO ↓
                req.session.usuarioLogueado = usuarioRegistrado;
                //voy a la vista del usuario
                return res.redirect('user/usuario'); }   

            return res.render('user/login',{
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
                }) ;
        },
        cliente:(req,res)=>{
            res.render('user/usuario', {
                //aca dejo a USER como req en la vista ejs (con user vas a poder usarlo en ejs);
            user:req.session.usuarioLogueado})
        }
};
    
module.exports = userController;
          


