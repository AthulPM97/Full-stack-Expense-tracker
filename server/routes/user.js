const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.post('/sign-up',userController.postUserSignup);

router.post('/login', userController.postUserLogin);

module.exports = router;