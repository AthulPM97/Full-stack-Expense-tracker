const express = require('express');

const purchaseController = require('../controllers/purchase');

const router = express.Router();

router.get('/buy-premium',purchaseController.buyPremium);

router.post('/update-transaction-status', purchaseController.updateTransactionStatus);

module.exports = router;