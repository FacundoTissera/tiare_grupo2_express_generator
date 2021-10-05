const User = require('../models/User');


function usuarioLogMiddleware (req, res, next){

    res.locals.isLogged = false;

    
        let emailInCookie = req.cookies.userEmail;
    //console.log(emailInCookie);
    let usuarioExistente = usuarios.find(unUsuario => unUsuario.email === req.cookies.userEmail);
    let userFromCookie = usuarioExistente('email', emailInCookie);  

    if (userFromCookie) {
        req.session.usuarioLogueado = userFromCookie;
    }

   
   


    if (req.session && req.session.usuarioLogueado){
        res.locals.isLogged = true;
        
    }



    next();
};
module.exports = usuarioLogMiddleware;