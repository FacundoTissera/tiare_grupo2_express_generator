const express = require('express');
const router = express.Router();

//requiere el controlador
const productsController = require('../controllers/productsController');

/* ruta de productos */

router.get('/',productsController.total );

router.get('/detalle/:id',productsController.detalle);

router.get('/new',productsController.nuevo );
router.post('/new', productsController.store);

router.get('/productsAdmin',productsController.administrador)

module.exports = router;
