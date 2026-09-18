const asyncHandler = require('../utils/asyncHandler');
const Expense = require('../models/Expense');

const getExpenses = asyncHandler(async (req, res) => {
  const filter = { farmer: req.user._id };
  if (req.query.farm) filter.farm = req.query.farm;
  const expenses = await Expense.find(filter).sort({ date: -1 });
  res.json(expenses);
});

const createExpense = asyncHandler(async (req, res) => {
  const { farm, type, category, amount, note, date } = req.body;
  if (!type || !category || amount === undefined) {
    res.status(400);
    throw new Error('type, category and amount are required');
  }
  const expense = await Expense.create({
    farmer: req.user._id,
    farm: farm || undefined,
    type,
    category,
    amount,
    note,
    date,
  });
  res.status(201).json(expense);
});

const deleteExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findOneAndDelete({ _id: req.params.id, farmer: req.user._id });
  if (!expense) {
    res.status(404);
    throw new Error('Expense not found');
  }
  res.json({ message: 'Expense removed' });
});

const getSummary = asyncHandler(async (req, res) => {
  const summary = await Expense.aggregate([
    { $match: { farmer: req.user._id } },
    {
      $group: {
        _id: { year: { $year: '$date' }, month: { $month: '$date' }, type: '$type' },
        total: { $sum: '$amount' },
      },
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } },
  ]);

  const byCategory = await Expense.aggregate([
    { $match: { farmer: req.user._id, type: 'expense' } },
    { $group: { _id: '$category', total: { $sum: '$amount' } } },
    { $sort: { total: -1 } },
  ]);

  const totals = await Expense.aggregate([
    { $match: { farmer: req.user._id } },
    { $group: { _id: '$type', total: { $sum: '$amount' } } },
  ]);

  const totalIncome = totals.find((t) => t._id === 'income')?.total || 0;
  const totalExpense = totals.find((t) => t._id === 'expense')?.total || 0;

  res.json({
    monthly: summary,
    byCategory,
    totalIncome,
    totalExpense,
    netProfit: totalIncome - totalExpense,
  });
});

module.exports = { getExpenses, createExpense, deleteExpense, getSummary };
