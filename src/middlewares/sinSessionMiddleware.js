function sinSessionMiddleware (req, res, next){
    if (!req.session.usuarioLogueado){
        return res.redirect ('/user');
        }
        next ();
    }


module.exports = sinSessionMiddleware;