function ingresoMiddleware (req, res, next){
    if (req.session.usuarioLogueado){
        return res.redirect ('/user/usuario');
        }
        next ();
    }


module.exports = ingresoMiddleware;
