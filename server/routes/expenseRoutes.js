const express = require('express');
const { getExpenses, createExpense, deleteExpense, getSummary } = require('../controllers/expenseController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(protect, getExpenses).post(protect, createExpense);
router.get('/summary', protect, getSummary);
router.delete('/:id', protect, deleteExpense);

module.exports = router;
