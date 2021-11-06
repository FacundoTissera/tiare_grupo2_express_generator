const express = require('express');
const router = express.Router();
const userApiController = require ('../../controllers/api/userApiController');

router.get('/', userApiController.todos);

module.exports = router;