const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const path = require('path')
const multer = require('multer');

const { body } = require('express-validator');


const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, './public/avatars' );
    },
    filename: (req, file, cb)=>{
        
        let filename = `${Date.now()}_img${path.extname(file.originalname)}`;
        cb(null, filename);
    }
});
const uploadFile = multer({ storage });

//VALIDACIONES

const validations = [
    body('fullName').notEmpty().withMessage('Debes escribir tu Nombre y Apellido'),
    body('direccion').notEmpty().withMessage('Debes escribir la direccion de tu domicilio'),
    body('numero').notEmpty().withMessage('Debes escribir el numero de tu domicilio'),
    body('ciudad').notEmpty().withMessage('Debes escribir tu ciudad de residencia '),
    body('provincia').notEmpty().withMessage('Debes seleccionar tu provincia'),
    body('codigoPostal').notEmpty().withMessage('Debes escribir el codigo postad de tu ciudad'),
    body('telefono').notEmpty().withMessage('Debes escribir tu numero telefonico'),
    body('email').notEmpty().withMessage('Debes escribir un email').bail().isEmail().withMessage('Debes escribir un formato de correo valido'),
    body('password').notEmpty().withMessage('Debes escribir tu Contraseña'),
    body('aceptoTerminos').notEmpty().withMessage('Debes aceptar terminos y condiciones'),
    body('avatar').custom((value, { req })=>{
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif', '.jpeg'];
        
        if (!file){
            throw new Error (' Tienes que subir una imagen de perfil');
        }else{
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                
                throw new Error (`Las extenciones permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }
        
        return true;
    })
]

//rutas de login

router.get('/',userController.ingreso);


router.get('/register', userController.registrarse);
//proceso de registro

router.post('/register',uploadFile.single('avatar'),validations ,userController.procesoDeRegistro);




module.exports = router;
