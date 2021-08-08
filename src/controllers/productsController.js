const productsController = {

    total:(req,res) =>{
        res.render('products/productsAll', {title: 'todos los productos'})
    },

    detalle:(req,res) =>{
        res.render('products/detail', {title: 'detealle del producto'})
    },
        

    nuevo:(req,res) =>{
        
        res.render('products/new', {title: 'Agregar productos'})
    },

    store:(req, res) =>{
    res.send ('hola');
    },

    administrador:(req, res) =>{
        res.render('products/productsAdmin',{title: 'pagina administrador' })
    }
    

};


module.exports = productsController;