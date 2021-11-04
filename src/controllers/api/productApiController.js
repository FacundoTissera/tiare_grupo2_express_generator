const db = require('../../database/models');
const productsController = require('../productsController');
//const Op = db.Sequelize.Op

const productApiController = {
    //listado de todos los productos
    'list': (req, res) => {
        db.Producto
            .findAll({
                include: ['categorias']
            })
            .then(productos => {
                //console.log(productos[0].categorias.category)
                let prodCateg = {};
                for (let i = 0; i <productos.length; i++) {
                    let producto = productos[i];
                    let categoria = producto.categorias.category;
                    if (prodCateg[categoria]) {
                        prodCateg[categoria] = prodCateg[categoria] + 1;
                    } 
                    else {
                        prodCateg[categoria] = 1;
                    }
                }
                let products =[]
                for (let i=0; i <productos.length; i++){
                    let unProducto = {
                       id:productos[i].id, 
                       name:productos[i].name, 
                       description:productos[i].description, 
                       category:productos[i].categorias.category, 
                       detail:'api/products/'+productos[i].id
                    }
                products.push(unProducto)  
                }
                return res.status(200).json({
                    
                    meta:{
                        status:200, 
                        count: productos.length,
                        countByCategory: prodCateg,
                        url:'api/products/'
                    },
                    
                    data:{
                        products, 
                    }
                })
            }
        )},
    'detail': (req, res) => {
        db.Producto
            .findByPk(req.params.id,{
                include:[{association:"categorias"}, {association:"talles"}, {
                    association:"colores"}
                ]
            })
            .then(producto => {
                //console.log(producto.talles[0].size)
                let arrayTalles = []
                for (let i=0; i<producto.talles.length;i++){
                    let unTalle=producto.talles[i].size
                    arrayTalles.push(unTalle)
                     
                 }
                 let arrayColores = []
                for (let i=0; i<producto.colores.length;i++){
                    let unColor=producto.colores[i].color
                    arrayColores.push(unColor)
                }

                let objeto = {
                    id:producto.id, 
                    name:producto.name, 
                    description:producto.description, 
                    price:producto.price,
                    category:producto.categorias.category, 
                    sizes: arrayTalles,
                    colors:arrayColores, 
                    image: '/images/prendas/'+producto.image          
                 }
                return res.status(200).json({
                      data:objeto  
                    
                });
            })
            .catch(function(error){
                return res.status(400).json({
                    error:"Id no encontrado"
                })
            });
    }

}
module.exports = productApiController;