const { render } = require("../../app");



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
    

};


module.exports = productsController;