const fs = require('fs');
const path = require('path');

//requiero los modelos
const db = require('../database/models');

//const productsDatos = path.join(__dirname, '../data/datosProductos.json');
//let prendas = JSON.parse(fs.readFileSync(productsDatos,'utf-8'));


const indexController ={
    home:(req, res) =>{
     //   let sale = prendas.filter(element => element.sale == 'si');
      //  res.render('home/',{sale: sale});
      db.Producto.findAll ({
        include:[{association:"categorias"}, {association:"talles"}, {
            association:"colores"}]
    })
    .then (function(productos){
        let productoPublicar= productos.filter(element => element.sale =='1')
        res.render('home/', {producto:productoPublicar})
    })
    }
}


module.exports = indexController;