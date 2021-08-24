const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');


//rutas de login

router.get('/',loginController.ingreso);

router.get('/register', loginController.registrarse);




module.exports = router;
