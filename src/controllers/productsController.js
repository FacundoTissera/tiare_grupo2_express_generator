const { render } = require("../../app");
const path = require('path');
const { json } = require("express");
const fs = require('fs');

const productsDatos = path.join(__dirname, '../data/datosProductos.json');
let prendas = JSON.parse(fs.readFileSync(productsDatos,'utf-8'));

// console.log(prendas);

const productsController = {

    total:(req,res) =>{
        res.render('products/productsAll', {title: 'todos los productos'})
    },

    detalle:(req,res) =>{
        let id = req.params.id;
        let unProducto= prendas.find(element => element.id == id);

        res.render('products/detail', {
            product: unProducto,
            
        });
    },

    nuevo:(req,res) =>{
        res.render('products/new', {title: 'Agregar productos'})
    },

    administrador:(req, res) =>{
        res.render('products/productsAdmin',{title: 'pagina administrador' })
    },

};


module.exports = productsController;