const { render } = require("../../app");



const cartController = {

    carro: (req, res) =>{
        res.render('carrito/productCart',{title: 'producto del carro'})
    },

};

module.exports = cartController;