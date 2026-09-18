const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
  {
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    farm: { type: mongoose.Schema.Types.ObjectId, ref: 'Farm' },
    type: { type: String, enum: ['income', 'expense'], required: true },
    category: {
      type: String,
      required: true,
      enum: ['Seeds', 'Fertilizer', 'Labour', 'Fuel', 'Equipment', 'Irrigation', 'Sale', 'Other'],
    },
    amount: { type: Number, required: true, min: 0 },
    note: { type: String, trim: true },
    date: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Expense', expenseSchema);
