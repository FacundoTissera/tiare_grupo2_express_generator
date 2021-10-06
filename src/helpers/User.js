const fs = require('fs');
const path = require('path');
const db = require('../database/models');

    const User = {
       // archivoJson: '../data/users.json',

        //aca traigo convertido de la carpeta data todos los usuarios en formato array
        todos: function(){
            db.Usuario.findAll({
                include:[{association:"states"}, {association:"roles"}]
            })
            .then (function(usuarios){
                return usuarios
            })

             //console.log(usuarios);
            
           // return JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/users.json'),{encoding: 'utf-8'}));
        },

        buscarPorCampo: function (campo, valor){                                   //findByfield
            let usuarios = this.todos();
            let usuarioEncontrado= usuarios.find(unUsuario => unUsuario[campo] === valor);
            return usuarioEncontrado;
        },

        buscarPorPk: function (id){                                             //findBypk
            return this.buscarPorCampo('id',id)
        },

        crearID: function (){                                                     
            let usuarios = this.todos();
            let ultimoUsuario= usuarios.pop()
            if (ultimoUsuario){
            return ultimoUsuario.id+1
            }
            return 1
        }, 

        crearUsuario: function (req,res) {                                      //create
            db.Usuario.create({ 
                
            })
            
            
            /*let usuarios = this.todos();
            let nuevoUsuario = {
                id: this.crearID(),
                ...infoUsuario
            }
            usuarios.push (nuevoUsuario);
            fs.writeFileSync(path.join(__dirname, '../data/users.json'),JSON.stringify(usuarios, null, ' '));
                
            return nuevoUsuario; */
        },

        borrarUsuario: function(id){                                                   //destroy
            let usuarios = this.todos();
            let ultimosUsuarios = usuarios.filter(unUsuario => unUsuario.id !== id);

            fs.writeFileSync(path.join(__dirname, '../data/users.json'),JSON.stringify(ultimosUsuarios, null, ' '));
        
            return true;
        }
        


    }


    module.exports = User;

