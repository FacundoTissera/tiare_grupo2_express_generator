const path = require('path');
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

    store:(req, res) =>{
        //pongo datos al nuevo producto
        let nuevoProductoStore ={
            id:prendas.length+1,  
            nombre: req.body.nombre,
            precio: req.body.precio,
            categoria: req.body.categoria,
            color: req.body.color,
            descripcion: req.body.descripcion,          
        }
        prendas.push (nuevoProductoStore)

        //mando el array modificado con el producto nuevo a data
        fs.writeFileSync(productsDatos, JSON.stringify(prendas, null, 4), 'utf-8') 

        //mando el click del formulario al detalle del producto subido
        res.redirect ("/products/detalle/"+nuevoProductoStore.id);
    },
    editar:(req, res) =>{
        let id= req.params.id;
        let productoAEditar = prendas.find (element => element.id ==id);
        res.render('products/editar', {productoAEditar:productoAEditar})
    },
    cambio: (req,res) =>{
        let id= req.params.id;
        prendas.forEach(element => {
            if (element.id== id){
                element.nombre=req.body.nombre;
                element.categoria=req.body.categoria;
                element.color=req.body.color;
                element.descripcion=req.body.descripcion;
                element.precio=req.body.precio;
            }   
        })
        res.redirect ("/products/detalle/"+id)
    },

    administrador:(req, res) =>{
        res.render('products/productsAdmin',{title: 'pagina administrador' })
    },

};


module.exports = productsController;