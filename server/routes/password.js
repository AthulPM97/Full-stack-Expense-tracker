const express = require('express');

const passwordController = require('../controllers/password');

const router = express.Router();

router.post('/forgot-password', passwordController.postForgotPassword);

router.get('/reset-password/:id',passwordController.getResetPassword);

router.post('/update-password', passwordController.postUpdatePassword);

module.exports = router;