const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//Middlewares
const uploadFile= require('../middlewares/multerMiddleware')
const validaciones = require('../middlewares/validator');
const ingresoMiddleware = require('../middlewares/ingresoMiddleware');

//rutas

//formulario de login
router.get('/', ingresoMiddleware, userController.ingreso);

//proceso de login
router.post('/', userController.procesoDeLogin);

//formulario de registro
router.get('/register',ingresoMiddleware, userController.registrarse);

//proceso de registro
router.post('/register',uploadFile.single('avatar'),validaciones.register ,userController.procesoDeRegistro);

//perfil del usuario
router.get('/usuario', userController.cliente);

//router.get('/cliente', userController.cliente);

module.exports = router;
