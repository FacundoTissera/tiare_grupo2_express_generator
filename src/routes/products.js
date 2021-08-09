const express = require('express');
const router = express.Router();

//requiere el controlador
const productsController = require('../controllers/productsController');

/* ruta de productos */

router.get('/',productsController.total );

router.get('/detalle/:id',productsController.detalle);

/*nuevo producto, formulario y post */

router.get('/new',productsController.nuevo );
router.post('/new', productsController.store);

/* edicion producto, formulario y put */
router.get('/editar/:id', productsController.editar);
router.put ('/editar/:id',productsController.cambio)

router.get('/productsAdmin',productsController.administrador)

module.exports = router;
