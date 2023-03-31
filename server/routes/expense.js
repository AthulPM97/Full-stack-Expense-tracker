const express = require('express');

const expenseController = require('../controllers/expense');

const router = express.Router();

router.get('/', expenseController.getExpenses);

router.get('/check-premium', expenseController.getCheckPremium);

router.post('/add-expense', expenseController.postAddExpense);

router.delete('/delete-expense/:id', expenseController.deleteExpense);

module.exports = router;