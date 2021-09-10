function usuarioLogMiddleware (req, res, next){
    res.locals.isLogged = false;

    if (req.session && req.session.usuarioLogueado){
        res.locals.isLogged = true;
    }
    next();
};
module.exports = usuarioLogMiddleware;