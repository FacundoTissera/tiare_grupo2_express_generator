const db = require('../../database/models');


const userApiController = {

    'todos': (req, res) => {

        db.Usuario.findAll()
        .then( usuarios => {
            
            let users = [];
            usuarios.forEach(element => {
                let unUsuario = {
                    id: element.id,
                    name: element.name,
                    email: element.email,
                    detail:'/api/user/'+element.id
                }
                users.push(unUsuario)
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
        
    }
}

module.exports = userApiController
