const { validationResult } = require('express-validator');

const userController = {

    ingreso:(req, res)=>{
        res.render('user/login',{title: 'logueate',});
    },
    
    registrarse:(req,res)=>{
        res.render('user/register',{title: 'registrete'});
    },

    procesoDeRegistro: (req, res)=>{
        const resultadoValidaciones = validationResult (req);

        if(resultadoValidaciones.errors.length > 0){

            return res.render('user/register',{

                errors: resultadoValidaciones.mapped(),
                oldData: req.body,
            });
        }
        return res.redirect('/user');
    },
    
};

module.exports = userController;