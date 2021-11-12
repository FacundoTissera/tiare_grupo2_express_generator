const db = require('../../database/models');


const userApiController = {

    todos: (req, res) => {

        db.Usuario.findAll()
        .then( usuarios => {
            
            let users = [];
            usuarios.forEach(element => {
                let unUsuario = {
                    id: element.id,
                    name: element.name,
                    email: element.email,
                    detail:'/api/user/'+ element.id
                }
            
                    users.push(unUsuario);
                
            });
                

                return res.json({
                
                    meta : {
                        status: 200,
                        total: usuarios.length,
                        url: '/api/user'
                    },
                    data: {
                        users,
                    }
                
            })
            
        })
        
    },

    detail:(req, res) => {
        db.Usuario.findByPk(req.params.id)
        .then(usuario =>{


            let user = {

                    id: usuario.id,
                    name: usuario.name,
                    email: usuario.email,
                    image: '/images/avatars/'+usuario.image,
                    detail:'/api/user/'+ usuario.id

            };


            return res.status(200).json({
                data: user,
            })
        }).catch(function(error){
            return res.status(400).json({
                error:'usuario no encontrado'
            })
        })


    }
}

module.exports = userApiController
