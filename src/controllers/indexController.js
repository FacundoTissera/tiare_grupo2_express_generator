const indexController ={
    home:(req, res) =>{
        res.render('home/',{title: 'Pagina Principal'})
    },
}

module.exports = indexController;