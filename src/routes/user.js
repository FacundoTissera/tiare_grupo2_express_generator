const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//Middlewares
const uploadFile= require('../middlewares/multerMiddleware')
const validaciones = require('../middlewares/validator');
const ingresoMiddleware = require('../middlewares/ingresoMiddleware');
const sinSessionMiddleware = require('../middlewares/sinSessionMiddleware');

//RUTAS

//formulario de login
router.get('/', ingresoMiddleware, userController.ingreso);

// //proceso de login
router.post('/', userController.procesoDeLogin);

// //formulario de registro
router.get('/register',ingresoMiddleware, userController.registrarse);

// //proceso de registro
router.post('/register',uploadFile.single('avatar'),validaciones.register ,userController.procesoDeRegistro);

// //perfil del usuario
router.get('/usuario', sinSessionMiddleware, userController.cliente);

// //modificar datos usuario
 router.get('/modificar/:id', sinSessionMiddleware, userController.modificar);

//modificar datos usuario por put
router.put('/modificar/:id',userController.modificarUsuario);

// //cerrar sesion, logout
 router.get('/logout', userController.logout);

// Listado de todos los usuarios
router.get("/listadoUsuarios", sinSessionMiddleware, userController.listado);

//Detalle usuario (para los que no estan es session)
router.get("/detalle/:id", sinSessionMiddleware, userController.detalleUsuarios)

module.exports = router;
