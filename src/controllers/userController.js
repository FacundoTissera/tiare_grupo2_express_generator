const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const { getMaxListeners } = require('process');



const userController = {
    
    registrarse:(req,res)=>{
        res.render('user/register',{title: 'registrete'});
    },
    
    procesoDeRegistro: (req, res)=>{
        
        const resultadoValidaciones = validationResult(req);
        
        if(resultadoValidaciones.errors.length > 0){
            
            return res.render('user/register',{
                
                errors: resultadoValidaciones.mapped(),
                oldData: req.body,
            });
        };
        //aca traigo convertido de la carpeta data todos los usuarios en formato array
        let users = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../data/users.json'),{encoding: 'utf-8'}));
        
        //metodo para generar un ID 
        function generadorId() {
            let todos = users;
            let ultimoId =todos.pop();
            if (ultimoId) {
                
                return ultimoId.id + 1;
            }
            return 1;
        };
        
        //esta funcion me permite buscar a todos los usuarios 
        function todosLosUsuarios(){
            let todos = users
            return todos
        };
        
        //aca busco a usuiario en base de datos o carpeta data por su pk("id")
        function buscarUsuarioPorPk(id) {
            
            // creo una variable todos los usuarios para que me traiga de arriba la funcion todos los usuarios
            let todosLosUsuarios = users;
            
            //aca lo que hago es iterar el array de todos los isualrios si lo encuentra por id lo devuelve  
            let usuarioEncontrado = todosLosUsuarios.find(unUsuario => unUsuario.id === id);
            
            return usuarioEncontrado;
        };
        
        //creo funcion que permita buscar por cualquier campo.. (email)
        function BuscarPorCualquierCampo(campo, text) {
            
            // creo una variable todos los usuarios para que me traiga de arriba la funcion todos los usuarios
            let todosLosUsuarios = users;
            //al igual que la funcion de arriba itero en los usuarios pero le digo que del campo del json me devuelva los usuarios del mismo texto 
            let usuarioEncontrado = todosLosUsuarios.find(unUsuario => unUsuario[campo] === text);
            
            return usuarioEncontrado;
        };
        
        //aca voy a intentar guardar los usuarios en la base de datos jajaj 
        function guardarUsuario(infoUsuario) {
            // creo una variable todos los usuarios para que me traiga de arriba la funcion todos los usuarios
            let todosLosUsuarios = users;
            let idUltimo = todosLosUsuarios.length +1
            let nuevoUsuario = {
                id: idUltimo ,
                ...infoUsuario
            }
            todosLosUsuarios.push(nuevoUsuario);
            
            fs.writeFileSync(path.join(__dirname, '../data/users.json'),JSON.stringify(todosLosUsuarios, null, ' '));
            
            return nuevoUsuario;
        };
        
        // aca hago una funcion que permita eliminar un usuario
        function eliminar(id) {
            
            // creo una variable todos los usuarios para que me traiga de arriba la funcion todos los usuarios
            let todosLosUsuarios = users;
            let ultimosUsuarios = todosLosUsuarios.filter(unUsuario => unUsuario.id !== id);
            
            fs.writeFileSync(path.join(__dirname, '../data/users.json'),JSON.stringify(ultimosUsuarios, null, ' '));
            
            return true;
        };
        
        
        //aca valido que el usuario no se encuentre logueado
        let usuarioExistente = BuscarPorCualquierCampo('email', req.body.email);
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
        
        // encripto la contraseña y agrego el avatar a la base de datos
        let usuarioCreado ={
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
            avatar:req.file.filename
        };
        
        let usuarioParaExport = guardarUsuario(usuarioCreado) 
        // hago uso de la funcion guardado y le paso como parametro el usuario con la contraseña encriptada ('let usurioCreado')
        //guardarUsuario(usuarioCreado);
        //return res.send('se guardo el user')
        
        return res.redirect('/user');
        
    },
    
    ingreso:(req, res)=>{
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

        let usuarioRegistrado = BuscarPorCualquierCampo('email', req.body.email);

        if (usuarioRegistrado) {
                
            let contraseniaCorrecta= bcryptjs.compareSync(req.body.password, usuarioRegistrado.password);
                if (contraseniaCorrecta) {
                    return res.redirect('/');
                }else{
                    return res.render('user/login',{
                                errors:{
                                    email:{
                                        msg: 'La contraseña o usuario incorrecto'
                                    }
                                }
                    }) ;
                }
            
        }
        
        },
    
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

