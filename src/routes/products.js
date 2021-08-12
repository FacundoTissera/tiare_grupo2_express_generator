const express = require('express');
const router = express.Router();
const path = require('path')
//requiere multer
const multer = require ('multer');




let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname + '../../public/images'))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
}) 
let upload = multer({ storage: storage })
//const upload = require('../middleware/multer')
/* ruta de productos */

//requiere el controlador
const productsController = require('../controllers/productsController');

router.get('/',productsController.total );

router.get('/detalle/:id',productsController.detalle);

/*nuevo producto, formulario y post */

router.get('/new',productsController.nuevo );
router.post('/new',upload.single('foto-principal'), productsController.store);

//Borrar producto
router.delete('/borrar/:id', productsController.delete);

/* edicion producto, formulario y put */
router.get('/editar/:id', productsController.editar);
router.put ('/editar/:id',productsController.cambio);

router.get('/productsAdmin',productsController.administrador)

module.exports = router;
