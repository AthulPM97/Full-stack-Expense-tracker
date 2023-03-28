const express = require('express');

const { postUserSignup} = require('../controllers/user');

const router = express.Router();

router.post('/sign-up',postUserSignup);

module.exports = router;