const express = require('express');
const cartController = require('../controllers/cartController');
const router = express.Router();
const loginController = require('../controllers/cartController');

//rutas de carrito

router.get('/productCart/:id',cartController.carro);

module.exports = router;