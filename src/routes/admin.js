const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();
const path = require('path')

//requiere multer
const multer = require ('multer');

//requiere express validator
const {body} = require ('express-validator');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname + '../../../public/images/prendas'))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
}) 
let upload = multer({ storage: storage })

//constante con la validaciones
const validations=[
   body('nombre').notEmpty().withMessage('Debes completar este campo'),
   body('precio').notEmpty().withMessage('Debes completar este campo').bail() 
   .isInt() .withMessage ('Debes poner un número entero'),
   body('color').notEmpty().withMessage('Debes completar este campo'),
   body('categoria').notEmpty().withMessage('Debes completar este campo'),
   body('sale').notEmpty().withMessage('Debes completar este campo'),
   body('fotoPrinc').custom((value, {req}) =>{
     let file = req.file;
     let extensionPermitida = ['.jpg', '.jpeg', '.png', '.gif'];
     if (!file){
         throw new Error ('Tienes que subir una imagen');
        } else {
            let extensiones = path.extname(file.originalname);
           if (!extensionPermitida.includes(extensiones)){
           throw new Error ('El archivo debe ser .jpg, .jpeg, .png o .gif');

            }
        }
     return true;
 })
]


//rutas del admin

router.get('/',adminController.index);

/*nuevo producto, formulario y post */

router.get('/newProduct',adminController.nuevo );
router.post('/newProduct',upload.single('fotoPrinc'),validations, adminController.store);

//Borrar producto
router.delete('/borrar/:id', adminController.delete);

/* edicion producto, formulario y put */
router.get('/editar/:id', adminController.editar);
router.put ('/editar/:id',adminController.cambio);

/*listar productos en admin*/
router.get('/listaEdit',adminController.lista);


module.exports = router;