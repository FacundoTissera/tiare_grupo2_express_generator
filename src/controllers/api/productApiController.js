const db = require('../../database/models');

const productApiController = {
    'list': (req, res) => {
        db.Producto
            .findAll()
            .then(productos => {
                return res.status(200).json({
                    meta:{
                        status:200, 
                        count: productos.length,
                        url:'api/products/'
                    },
                    data:productos
                    
                })
            })
    // },
    // 'detail': (req, res) => {
    //     db.Genre.findByPk(req.params.id)
    //         .then(genre => {
    //             res.render('genresDetail.ejs', {genre});
    //         });
    }

}
module.exports = productApiController;