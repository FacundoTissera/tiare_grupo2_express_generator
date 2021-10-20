const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();
const path = require('path');
//requiere el filtro para vistas sin sesion
const sinSessionMiddleware = require('../middlewares/sinSessionMiddleware');
//requiere multer
const multer = require ('multer');
//requiere express validator
const {body} = require ('express-validator');
//requiere las validaciones
const validations = require('../middlewares/productoValidator');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname + '../../../public/images/prendas'))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
}) 
let upload = multer({ storage: storage })


//rutas del admin

router.get('/',sinSessionMiddleware, adminController.index);

//ruta de listado gral

router.get('/listaEdit', adminController.lista);

/*nuevo producto, formulario y post */

router.get('/newProduct',adminController.nuevo );
router.post('/newProduct',upload.single('fotoPrinc'),validations, adminController.store);

//Borrar producto
router.delete('/borrar/:id', adminController.delete);

/* edicion producto, formulario y put */
router.get('/editar/:id', adminController.editar);
router.put ('/editar/:id',upload.single('fotoPrinc'),validations,adminController.cambio);

/*listar productos en admin*/
router.get('/listaEdit',adminController.lista);


module.exports = router;