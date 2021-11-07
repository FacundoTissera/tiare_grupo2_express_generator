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
            let user = [];
            usuario.forEach(element => {
                let usuarioId = {
                    id: element.id,
                    name: element.name,
                    email: element.email,
                    image: '/images/avatars/'+element.image,
                    detail:'/api/user/'+ element.id    
                }
                usuario.push(usuarioId);
            })
            return res.json({
                meta:{
                    status:200,
                    url:'/api/user/'+usuario.id,
                },
                data:{
                    user,
                }
            })
        })


    }
}

module.exports = userApiController
