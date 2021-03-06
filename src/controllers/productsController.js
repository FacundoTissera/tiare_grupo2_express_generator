const path = require('path');
const fs = require('fs');
const {validationResult} = require ('express-validator');
//requiero los modelos
const db = require('../database/models');


const productsDatos = path.join(__dirname, '../data/datosProductos.json');
let prendas = JSON.parse(fs.readFileSync(productsDatos,'utf-8'));

// console.log(prendas);

const productsController = {

    total:(req,res) =>{
        //CON JSONlet prendas = JSON.parse(fs.readFileSync(productsDatos,'utf-8'));
        //let todosLosProductos = prendas.filter(element => element.sale == "si");
        //res.render('products/productsAll', {
          //  prendas : prendas})
        db.Producto.findAll ({
            include:[{association:"categorias"}, {association:"talles"}, {
                association:"colores"}]
        })
        .then (function(productos){
            let productoPublicar= productos.filter(element => element.sale =='1')
            res.render('products/productsAll', {producto:productoPublicar})
        })
    },

    detalle:(req,res) =>{
        //CON JSON: let prendas = JSON.parse(fs.readFileSync(productsDatos,'utf-8'));
         //let id = req.params.id;
        //let unProducto= prendas.find(element => element.id == id);
        //res.render('products/detail', {product: unProducto} 
        db.Producto.findByPk(req.params.id,{
            include:[{association:"categorias"}, {association:"talles"}, {
                association:"colores"}
            ]
        })
        .then(function(producto){
            res.render('products/detail', {producto:producto})
        })
    },
};


module.exports = productsController;