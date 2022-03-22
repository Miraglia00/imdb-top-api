const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.checkToken, userController.registerUser);

router.post('/login', userController.checkToken, userController.loginUser);

module.exports = router;