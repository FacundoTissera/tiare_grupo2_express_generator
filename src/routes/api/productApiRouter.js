const express = require('express');
const router = express.Router();
const productApiController = require('../../controllers/api/productApiController');

router.get('/', productApiController.list);
router.get('/todos', productApiController.todo);
router.get('/:id', productApiController.detail);


module.exports = router;