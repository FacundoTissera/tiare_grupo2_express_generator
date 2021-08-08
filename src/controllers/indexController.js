<<<<<<< HEAD
const { render } = require("../../app");
const fs = require('fs');
const path = require('path');

const productsDatos = path.join(__dirname, '../data/datosProductos.json');
let prendas = JSON.parse(fs.readFileSync(productsDatos,'utf-8'));


=======
>>>>>>> 51120ebe2cfce6ba713fdd3119e017b342311d65
const indexController ={
    home:(req, res) =>{

        let sale = prendas.filter(element => element.sale == 'true');
        
        res.render('home/',{sale: sale});
    },
}

module.exports = indexController;