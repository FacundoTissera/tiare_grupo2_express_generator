const { render } = require("../../app");


// el que envia las vistas a login.js 

const loginController = {

    ingreso:(req, res)=>{
        res.render('login/login',{title: 'logueate',user:true,});
    },
    registrarse:(req,res)=>{
        res.render('login/register',{title: 'registrete'});
    },
    
    
    
};

module.exports = loginController;