const path = require('path');
const fs = require('fs');
const {validationResult} = require ('express-validator');

const productsDatos = path.join(__dirname, '../data/datosProductos.json');
let prendas = JSON.parse(fs.readFileSync(productsDatos,'utf-8'));

// console.log(prendas);

const productsController = {

    total:(req,res) =>{
        let prendas = JSON.parse(fs.readFileSync(productsDatos,'utf-8'));

        let id = req.params.id;
        let todosLosProductos = prendas.filter(element => element.sale == "si");

        res.render('products/productsAll', {
            prendas : prendas
        })
    },

    detalle:(req,res) =>{
        let prendas = JSON.parse(fs.readFileSync(productsDatos,'utf-8'));
        let id = req.params.id;
        let unProducto= prendas.find(element => element.id == id);

        res.render('products/detail', {product: unProducto}
        );
    },
  
};


module.exports = productsController;