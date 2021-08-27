


const path = require('path')


const { body } = require('express-validator');


const validaciones ={
    
    register : [
        body('fullName')
                        .notEmpty()
                        .withMessage('Debes escribir tu Nombre y Apellido'),
        body('direccion')
                        .notEmpty()
                        .withMessage('Debes escribir la direccion de tu domicilio'),
        body('numero')
                        .notEmpty()
                        .withMessage('Debes escribir el numero de tu domicilio'),
        body('ciudad') 
                        .notEmpty()
                        .withMessage('Debes escribir tu ciudad de residencia '),
        body('provincia')
                        .notEmpty()
                        .withMessage('Debes seleccionar tu provincia'),
        body('codigoPostal')
                        .notEmpty()
                        .withMessage('Debes escribir el codigo postad de tu ciudad'),
        body('telefono')
                        .notEmpty()
                        .withMessage('Debes escribir tu numero telefonico'),
        body('email')
                        .notEmpty()
                        .withMessage('Debes escribir un email')
                        .bail()
                        .isEmail()
                        .withMessage('Debes escribir un formato de correo valido'),
        body('password')
                        .notEmpty()
                        .withMessage('Debes escribir tu Contraseña'),
        body('aceptoTerminos')
                        .notEmpty()
                        .withMessage('Debes aceptar terminos y condiciones'),
        body('avatar')
                        .custom((value, { req })=>{
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
    ],
    
    login: [ 
    
        body('email').notEmpty().withMessage('Debes escribir un email').bail().isEmail().withMessage('Debes escribir un formato de correo valido'),
        body('password').notEmpty().withMessage('Debes escribir tu Contraseña'),
    
    ]
    
};
module.exports = validaciones;
