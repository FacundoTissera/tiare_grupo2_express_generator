const path = require('path');
const fs = require('fs');
const {validationResult} = require ('express-validator');
//requiero el modelo de producto de la base de datos
const db = require ('../database/models');

//const Producto = require('../database/models/Producto');
//const productsDatos = path.join(__dirname, '../data/datosProductos.json');
//let prendas = JSON.parse(fs.readFileSync(productsDatos,'utf-8'));

const adminController = {
    //menu administrador
    index:  (req, res )=>{
        res.render('admin/administrar', {title: 'menu administrar'})

    },
    //listado de productos para editar, ver o borrar desde el menu admin
    lista:(req,res) =>{
     
        db.Producto.findAll()
        .then(function(producto){
            res.render('admin/listaEdit', {Producto:producto})
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
      
    },

    //modifica el producto put
    cambio: (req,res) =>{
        //validaciones
        
        const resultadosValidacion= validationResult(req)
       
         if(resultadosValidacion.errors.length >0){
            let productoEditar=db.Producto.findByPk(req.params.id)
            let listaCategorias=db.Categoria.findAll()
            let listaColores=db.Color.findAll()
            let listaTalles=db.Talle.findAll()
            let stocks=db.Stock.findAll({
                where: {
                    product_id:req.params.id
                  }
            })
            Promise.all([productoEditar,listaCategorias, listaColores, listaTalles, stocks])
            .then(function([producto, categoria, color, talle, stock]){
                return res.render('admin/editar', {title: 'Editar productos', producto:producto,categorias:categoria, colores:color, talles:talle,stocks:stock, errors:resultadosValidacion.mapped(),
                oldData:req.body})
            });
        }
        else {

        let datosProducto = {
            name:req.body.nombre,
            price:req.body.precio,
            description:req.body.descripcion,
            sale:req.body.sale,
            category_id:req.body.categoria,
            };
                if (req.file){
                datosProducto.image= req.file.originalname
                }
        let productEditado = db.Producto.update(datosProducto,
            { where: {id:req.params.id}})
            
            .then(function(){
                db.Stock.destroy(
                 {where:{product_id: req.params.id}}).then(function() {
                    let promesas = []
                    for (let i=0; i<req.body.color.length; i++){
                        if(req.body.color[i]){
                            promesas.push(db.Stock.create({
                                product_id:req.params.id,
                                size_id:req.body.talles[i],
                                color_id:req.body.color[i],
                                stock:req.body.stock[i]
                            }));
                        }
                    
                    }
                    Promise.all([promesas])
                    .then(() => res.redirect('/products/detalle/'+req.params.id))
                 });
            })
        }
    },

    delete: (req, res) =>{
  
        let deleteStock= db.Stock.destroy({
            where:{product_id:req.params.id}
        })
        
        let deleteProduct= db.Producto.destroy({
            where:{id:req.params.id}
        })
       
         Promise.all([deleteProduct, deleteStock])
         .then(() => res.redirect('/products'))
        
    }

    }
    module.exports = adminController