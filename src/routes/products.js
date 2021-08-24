const express = require('express');
const router = express.Router();
const path = require('path')

//requiere el controlador
const productsController = require('../controllers/productsController');

router.get('/',productsController.total );

router.get('/detalle/:id',productsController.detalle);


//router.get('/productsAdmin',productsController.administrador)

module.exports = router;
