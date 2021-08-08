const fs = require('fs');
const path = require('path');

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
        //variable con la ruta al archivo JSON
        const productsFilePath = path.join(__dirname, '../data/datosProductos.json');

        //traduccion a array del JSON
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
       
        //pongo datos al nuevo producto
        let nuevoProductoStore ={
            id:products.length+1,  
            nombre: req.body.nombre,
            precio: req.body.precio,
            categoria: req.body.categoria,
            color: req.body.color,
            descripcion: req.body.descripcion,          
        }
        products.push (nuevoProductoStore)

        //mando el array modificado con el producto nuevo a data
        fs.writeFileSync(productsFilePath,JSON.stringify (products), 'utf-8') 

        //mando el click del formulario al detalle del producto subido
        res.redirect ("/products/detail/"+nuevoProductoStore.id);
    },

    administrador:(req, res) =>{
        res.render('products/productsAdmin',{title: 'pagina administrador' })
    }
    

};


module.exports = productsController;