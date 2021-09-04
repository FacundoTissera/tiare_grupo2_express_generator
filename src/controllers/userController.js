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
         //aca traigo convertido de la carpeta data todos los usuarios en formato array
        let users = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../data/users.json'),{encoding: 'utf-8'}));
        
        function BuscarPorCualquierCampo(campo, text) {
            
            // creo una variable todos los usuarios para que me traiga de arriba la funcion todos los usuarios
            let todosLosUsuarios = users;
            //al igual que la funcion de arriba itero en los usuarios pero le digo que del campo del json me devuelva los usuarios del mismo texto 
            let usuarioEncontrado = todosLosUsuarios.find(unUsuario => unUsuario[campo] === text);
            
            return usuarioEncontrado;
        };
        // creo una variable para que utiluce la funcion de buscar por cualquier usuario en la parte de campo email y que coincida con lo que viene ene el body
        let usuarioRegistrado = BuscarPorCualquierCampo('email', req.body.email);
        // aca digo que si usuario esta en la base de datos. si lo de arriba es verdadero pasa al if
        if (usuarioRegistrado) {
                //desencripto la clave que puso el usuario para que me coincida con la base de datos 
                let contraseniaCorrecta= bcryptjs.compareSync(req.body.password, usuarioRegistrado.password);
            
                //si la clave es correcta pasa al if y sino que salte al error      
                if (contraseniaCorrecta) {
            //elimino la contraseña para que no quede guardada al navegar 
            delete usuarioRegistrado.password
            //ACA GUARDO AL USUARIO REGISTRADO ↓
                req.session.usuarioLogeado = usuarioRegistrado;
                
                    return res.redirect('user/usuario');
                }else{
                    return res.render('user/login',{
                                errors:{
                                    email:{
                                        msg: 'La contraseña o usuario incorrecto'
                                    },
                                    password:{
                                        msg: 'La contraseña o usuario incorrecto'
                                    }                                    
                                }
                    }) ;
                };
                
        }else{
            return res.render('user/login',{
                errors:{
                    email:{
                        msg: 'La contraseña o usuario incorrecto'
                    },
                    password:{
                        msg: 'La contraseña o usuario incorrecto'
                    }                                    
                }
    }) ;        
            }
        
        },
    
    cliente:(req,res)=>{
            res.render('user/usuario', {
                //aca dejo a USER como req en la vista ejs (con user vas a poder usarlo en ejs);
            user:req.session.usuarioLogeado})
        }
    
};

module.exports = userController;



//ACA PRACTICO QUE LO DE4 ARRIBA FUNCIONE!!

// let users = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../data/users.json'),{encoding: 'utf-8'}));
//     //console.log(users);

// function todosLosUsuarios(){
//     let todos = users
//     return todos
//     };
    
//     //console.log(todosLosUsuarios());
    
// function buscarUsuarioPorPk(id) {
//     // creo una variable todos los usuarios para que me traiga de arriba la funcion todos los usuarios
//         let todosLosUsuarios = users;
        
//     //aca lo que hago es iterar el array de todos los isualrios si lo encuentra por id lo devuelve  
//         let usuarioEncontrado = todosLosUsuarios.find(unUsuario => unUsuario.id == id);
        
//         return usuarioEncontrado;
//     };

//     //console.log(buscarUsuarioPorPk(1));

//     function BuscarPorCualquierCampo(campo, text) {
        
//         // creo una variable todos los usuarios para que me traiga de arriba la funcion todos los usuarios
//             let todosLosUsuarios = users;
//         //al igual que la funcion de arriba itero en los usuarios pero le digo que del campo del json me devuelva los usuarios del mismo texto 
//             let usuarioEncontrado = todosLosUsuarios.find(unUsuario => unUsuario[campo] === text);

//             return usuarioEncontrado;
//         };

//         //console.log(BuscarPorCualquierCampo('email', 'facundotisserasorribas@gmail.com'));
//   //metodo para generar un ID 
//         function generadorId() {
//             let todos = users;
//             let ultimoId = todos.pop();
//             if (ultimoId) {
                
//                 return ultimoId.id + 1;
//             }
//             return 1;
//         };
//         //console.log(generadorId());

//         function guardarUsuario(infoUsuario) {
//             // creo una variable todos los usuarios para que me traiga de arriba la funcion todos los usuarios
//             let todosLosUsuarios = users;
//             let idUltimo = todosLosUsuarios.length +1
//             let nuevoUsuario = {
//                 id: idUltimo ,
//                 ...infoUsuario
//             }
//             todosLosUsuarios.push(nuevoUsuario);
    
//             fs.writeFileSync(path.join(__dirname, '../data/users.json'),JSON.stringify(todosLosUsuarios, null, ' '));
        
//             return nuevoUsuario;
//         };

//         //console.log(guardarUsuario({nombre: 'Lucas', apellido: 'HidghdhdLcs'}));
    
        
        
//     function eliminar(id) {
//         // creo una variable todos los usuarios para que me traiga de arriba la funcion todos los usuarios
//         let todosLosUsuarios = users;
//         let ultimosUsuarios = todosLosUsuarios.filter(unUsuario => unUsuario.id !== id);
        
//         fs.writeFileSync(path.join(__dirname, '../data/users.json'),JSON.stringify(ultimosUsuarios, null, ' '));
    
//         return true;
//     }
//     //console.log(eliminar(21));

