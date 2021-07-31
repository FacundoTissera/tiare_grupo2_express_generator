const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

/* ruta de productos */

router.get('/',productsController.total );

router.get('/detalle/:id',productsController.detalle);

router.get('/new',productsController.nuevo );

router.get('/productsAdmin',productsController.administrador)

module.exports = router;
