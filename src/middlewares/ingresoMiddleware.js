function ingresoMiddleware (req, res, next){
    console.log (req.session)
    if (req.session.usuarioLogueado){
        return res.redirect ('/user/usuario');
        }
        next ();
    }


module.exports = ingresoMiddleware;
