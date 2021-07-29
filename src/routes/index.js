const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
/* pagina principal */
router.get('/',indexController.home);

module.exports = router;
