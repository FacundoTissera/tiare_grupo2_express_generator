const db = require ('../database/models');
const path = require('path');
const { body } = require('express-validator');

const validations=[
    body('nombre').notEmpty().withMessage('Debes completar este campo').bail()
    .isLength({ min: 5}).withMessage('Este campo debe tener al menos 5 caracteres'),
    body('precio').notEmpty().withMessage('Debes completar este campo').bail() 
    .isInt() .withMessage ('Debes poner un número entero'),
    body('categoria').notEmpty().withMessage('Debes completar este campo').bail()
    .custom(value => {
        return db.Categoria.findByPk(value)
        .then(function(element){
            if (!element){
                return Promise.reject('Categoría inválida')
            }
        })
        
    }),
    body('descripcion').notEmpty().withMessage('Debes completar este campo').bail()
    .isLength({ min: 20}).withMessage('Este campo debe tener al menos 20 caracteres'),
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
 module.exports = validations;