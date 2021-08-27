const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const path = require('path')
const multer = require('multer');

const { body } = require('express-validator');

const validaciones = require('../middlewares/validator');

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

//rutas de login

router.get('/',userController.ingreso);

//proceso de login
router.post('/', validaciones.login, userController.procesoDeLogin);


router.get('/register', userController.registrarse);

//proceso de registro
router.post('/register',uploadFile.single('avatar'),validaciones.register ,userController.procesoDeRegistro);




module.exports = router;
