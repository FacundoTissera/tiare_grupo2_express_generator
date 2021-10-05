const db = require('../database/models');

async function usuarioLogMiddleware (req, res, next){

    res.locals.isLogged = false;

    if (req.cookies.userEmail) {
        let userFromCookie = await db.Usuario.findOne({
            where: {
                email: req.cookies.userEmail
            }
        });
        if (userFromCookie) {
            req.session.usuarioLogueado = userFromCookie; 
        }
        if (req.session && req.session.usuarioLogueado){
            res.locals.isLogged = true;
        }    
    }
    
    next();
};
module.exports = usuarioLogMiddleware;