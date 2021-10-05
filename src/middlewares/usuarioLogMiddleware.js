const db = require('../database/models');
const User = require('../models/User');


function usuarioLogMiddleware (req, res, next){

    res.locals.isLogged = false;

    db.Usuario.findOne({
        where: {
            email: req.cookies.userEmail
        }
    })
    .then((userFromCookie) => {
        if (userFromCookie) {
            req.session.usuarioLogueado = userFromCookie; 
        }
        if (req.session && req.session.usuarioLogueado){
            res.locals.isLogged = true;
        }
    }).finally(() => {
        next();
    });
};
module.exports = usuarioLogMiddleware;