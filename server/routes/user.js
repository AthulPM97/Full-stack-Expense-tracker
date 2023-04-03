const express = require('express');

const userController = require('../controllers/user');
const authenticateUser = require("../middlewares/authenticate");

const router = express.Router();

router.post('/sign-up',userController.postUserSignup);

router.post('/login', userController.postUserLogin);

router.get('/download', authenticateUser, userController.getDownloadExpenses);

module.exports = router;