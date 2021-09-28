const path = require('path');
const fs = require('fs');
const {validationResult} = require ('express-validator');
//requiero el modelo de producto de la base de datos
const db = require ('../database/models')

const productsDatos = path.join(__dirname, '../data/datosProductos.json');
let prendas = JSON.parse(fs.readFileSync(productsDatos,'utf-8'));

const adminController = {
    //menu administrador
    index:  (req, res )=>{
        res.render('admin/administrar', {title: 'menu administrar'})

    },
    //listado de productos para editar, ver o borrar desde el menu admin
    lista:(req,res) =>{
       // let prendas = JSON.parse(fs.readFileSync(productsDatos,'utf-8'));
        //res.render('admin/listaEdit', {prendas:prendas});
        db.Producto.findAll()
        .then(function(producto){
            res.render('admin/listaEdit', {producto:producto})
        })
    },
    //nuevo producto CREAR GET (formulario)
    nuevo:(req,res) =>{
        let listaCategorias=db.Categoria.findAll()
        let listaColores=db.Color.findAll()
        let listaTalles=db.Talle.findAll()
        Promise.all([listaCategorias, listaColores, listaTalles])
        .then(function([categoria, color, talle]){
            res.render('admin/newProduct', {title: 'Agregar productos', categorias:categoria, colores:color, talles:talle})
        })
     },

    //nuevo producto post   
    store:(req, res) =>{
        //let prendas = JSON.parse(fs.readFileSync(productsDatos,'utf-8'));
        
        //validaciones
        const resultadosValidacion= validationResult(req)
        if(resultadosValidacion.errors.length >0){
            let listaCategorias=db.Categoria.findAll()
            let listaColores=db.Color.findAll()
            let listaTalles=db.Talle.findAll()
            Promise.all([listaCategorias, listaColores, listaTalles])
            .then(function([categoria, color, talle]){
                return res.render('admin/newProduct', {title: 'Agregar productos', categorias:categoria, colores:color, talles:talle, errors:resultadosValidacion.mapped(),
                oldData:req.body})
            });
        }
        else {
            db.Producto.create({
                name:req.body.nombre,
                price:req.body.precio,
                description:req.body.descripcion,
                image:req.file.originalname,
                sale:req.body.sale,
                category_id:req.body.categoria,
            })
            .then(function(nuevoProducto){
                let promesas = []
                for (let i=0; i<req.body.color.length; i++){
                    if(req.body.color[i]){
                        promesas.push(db.Stock.create({
                            product_id:nuevoProducto.id,
                            size_id:req.body.talles[i],
                            color_id:req.body.color[i],
                            stock:req.body.stock[i]
                        }));
                    }
                }
                Promise.all(promesas).then( res.redirect('/products/detalle/'+nuevoProducto.id))
            
            })
            
                
        }
    },

    //formulario de editar get
    editar:(req, res) =>{
        let productoEditar=db.Producto.findByPk(req.params.id)
        let listaCategorias=db.Categoria.findAll()
        let listaColores=db.Color.findAll()
        let listaTalles=db.Talle.findAll()
        let stocks=db.Stock.findAll({
            where: {
                product_id:req.params.id
              }
        })
        Promise.all([productoEditar, listaCategorias, listaColores, listaTalles, stocks])
        .then(function([producto, categoria, color, talle, stock]){
            res.render('admin/editar', {title: 'Editar productos', producto:producto, categorias:categoria, colores:color, talles:talle, stocks:stock})
        })
        //let prendas = JSON.parse(fs.readFileSync(productsDatos,'utf-8'));
        //let id= req.params.id;
        //let productoAEditar = prendas.find (element => element.id ==id);
        //res.render('admin/editar', {productoAEditar:productoAEditar})
    },

    //modifica el producto put
    cambio: (req,res) =>{
        let prendas = JSON.parse(fs.readFileSync(productsDatos,'utf-8'));
        let id= req.params.id;
        prendas.forEach(element => {
            if (element.id== id){
                element.nombre=req.body.nombre;
                element.categoria=req.body.categoria;
                if  (req.file) {
                    element.imagen = req.file.originalname;
                }
                //element.imagen=req.file ? req.file.originalname : req.body.oldImagen;
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