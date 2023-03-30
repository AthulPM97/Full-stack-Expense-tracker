const express = require('express');

const purchaseController = require('../controllers/purchase');

const router = express.Router();

router.get('/buy-premium',purchaseController.buyPremium);

router.get('/update-transaction-status',);

module.exports = router;