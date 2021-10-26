const session = require('express-session')
const path = require('path')
const { body } = require('express-validator');
const db = require('../database/models');


const validaciones ={
    
    register : [
        body('nombre')
                        .notEmpty()
                        .withMessage('Debes escribir tu Nombre y Apellido')
                        .bail()
                        .isLength({ min: 2}).withMessage('Este campo debe tener al menos 2 caracteres'),
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
                        .withMessage('Debes escribir un formato de correo valido')
                        .bail()
                        .custom(async (value, {req})=>{
                            let usuarioExistente = await db.Usuario.findOne({
                                where: {
                                    email: req.body.email
                                }
                            });
                            if (usuarioExistente) {
                                throw new Error ('Este email ya esta registrado')
                            }
                            return true;
                        }),
        body('password')
                        .notEmpty()
                        .withMessage('Debes escribir tu Contraseña')
                        .bail()
                        .isLength({ min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres'),
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
                                        
                                        throw new Error (`Las extensiones permitidas son ${acceptedExtensions.join(', ')}`);
                                    }
                                }
                                
                                return true;
        })
    ],
    
    login: [ 
    
        body('email')
            .notEmpty()
            .withMessage('Debes escribir un email')
            .bail().isEmail()
            .withMessage('Debes escribir un formato de correo valido'),
            // .custom(value => {
            //     return Usuario.findUserByEmail(value).then(user => {
            //       if (!user) {
            //         return Promise.reject('Este mail aún no está registrado');
            //       }
            //     });
            //   }),
        body('password')
            .notEmpty()
            .withMessage('Debes escribir tu Contraseña'),
        
    ]
    
};
module.exports = validaciones;
