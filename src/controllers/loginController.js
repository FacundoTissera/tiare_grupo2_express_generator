const { render } = require("../../app");


// el que envia las vistas a login.js 

const loginController = {

    ingreso:(req, res)=>{
        res.render('login/login',{title: 'logueate',});
    },
    registrarse:(req,res)=>{
        res.render('login/register',{title: 'registrete'});
    },
    admin: (req, res) =>{
        res.render('login/admin', {title: 'administrador'})
    },
    
    
};

module.exports = loginController;