const db = require('../../database/models');
const productsController = require('../productsController');
const Op = db.Sequelize.Op

const productApiController = {
    'list': (req, res) => {
        db.Producto
            .findAll({
                include: ['categorias']
            })
            .then(productos => {
                //console.log (productos[8].categorias.category)
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
                let datosProducto =[]
                for (let i=0; i <productos.length; i++){
                    let unProducto = {
                       id:productos[i].id, 
                       name:productos[i].name, 
                       description:productos[i].description, 
                       category:productos[i].categorias.category, 
                       detail:'api/products/'+productos[i].id
                    }
                datosProducto.push(unProducto)  
                }
                return res.status(200).json({
                    
                    meta:{
                        status:200, 
                        count: productos.length,
                        countByCategory: prodCateg,
                        url:'api/products/'
                    },
                    
                    data:{
                      
                        datosProducto, 
                    }
                })
            }
        )},
    'detail': (req, res) => {
        db.Producto
            .findByPk(req.params.id)
            .then(producto => {
                return res.status(200).json({
                    data:producto
                });
            });
    }

}
module.exports = productApiController;