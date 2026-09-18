const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ['Income Support', 'Insurance', 'Subsidy', 'Loan', 'Equipment'],
      required: true,
    },
    description: { type: String, required: true },
    benefits: { type: String, required: true },
    eligibility: { type: String, required: true },
    states: { type: [String], default: ['All India'] },
    applyLink: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Scheme', schemeSchema);
