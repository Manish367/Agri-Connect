const mongoose = require('mongoose');

const marketPriceSchema = new mongoose.Schema(
  {
    crop: { type: String, required: true, trim: true },
    market: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    pricePerQuintal: { type: Number, required: true },
    unit: { type: String, default: 'quintal' },
    date: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('MarketPrice', marketPriceSchema);
