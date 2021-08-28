const path = require('path');
const fs = require('fs');
const {validationResult} = require ('express-validator');

const productsDatos = path.join(__dirname, '../data/datosProductos.json');
let prendas = JSON.parse(fs.readFileSync(productsDatos,'utf-8'));

const adminController = {
    index:  (req, res )=>{
        res.render('admin/administrar', {title: 'menu administrar'})

    },
    lista:(req,res) =>{
        let prendas = JSON.parse(fs.readFileSync(productsDatos,'utf-8'));
        res.render('admin/listaEdit', {prendas:prendas});
    },
    nuevo:(req,res) =>{
        let prendas = JSON.parse(fs.readFileSync(productsDatos,'utf-8'));
        res.render('admin/newProduct', {title: 'Agregar productos'})
        },
    //nuevo producto post   
    store:(req, res) =>{
        let prendas = JSON.parse(fs.readFileSync(productsDatos,'utf-8'));
        //validaciones
        const resultadosValidacion= validationResult(req)
        if(resultadosValidacion.errors.length >0){
            return res.render('admin/newProduct',
                {errors:resultadosValidacion.mapped(),
                oldData:req.body}
            );
        }
        //pongo datos al nuevo producto
        let nuevoId= prendas[prendas.length-1].id+1
        let nuevoProductoStore ={
            id:nuevoId,  
            nombre: req.body.nombre,
            precio: req.body.precio,
            categoria: req.body.categoria,
            color: req.body.color,
            descripcion: req.body.descripcion,  
            imagen: req.file.originalname,
            sale: req.body.sale,        
        }
        prendas.push(nuevoProductoStore);

        //mando el array modificado con el producto nuevo a data
        fs.writeFileSync(productsDatos, JSON.stringify(prendas, null, 4), 'utf-8');

        //mando el click del formulario al detalle del producto subido
        res.redirect ("/products/detalle/" + nuevoProductoStore.id);
        },

    //formulario de editar get
    editar:(req, res) =>{
        let prendas = JSON.parse(fs.readFileSync(productsDatos,'utf-8'));
        let id= req.params.id;
        let productoAEditar = prendas.find (element => element.id ==id);
        res.render('admin/editar', {productoAEditar:productoAEditar})
    },

    //modifica el producto put
    cambio: (req,res) =>{
        let prendas = JSON.parse(fs.readFileSync(productsDatos,'utf-8'));
        let id= req.params.id;
        prendas.forEach(element => {
            if (element.id== id){
                element.nombre=req.body.nombre;
                element.categoria=req.body.categoria;
                element.imagen=req.file.originalname;
                element.color=req.body.color;
                element.descripcion=req.body.descripcion;
                element.precio=req.body.precio;
                element.sale=req.body.sale;
            }  
            fs.writeFileSync(productsDatos, JSON.stringify(prendas, null, 4), 'utf-8')
        }) 
        res.redirect ("/products/detalle/"+id)
    },
    delete: (req, res) =>{
        let prendas = JSON.parse(fs.readFileSync(productsDatos,'utf-8'));

        let id = req.params.id;
        let productosActualizados = prendas.filter(element => element.id != id);
            
        // busca los que sean diferentes al id
        
        fs.writeFileSync(productsDatos, JSON.stringify(productosActualizados, null, 4), 'utf-8')


        res.redirect("/products")
    }

    }
    module.exports = adminController