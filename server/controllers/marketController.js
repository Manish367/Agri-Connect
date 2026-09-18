const asyncHandler = require('../utils/asyncHandler');
const MarketPrice = require('../models/MarketPrice');

const getMarketPrices = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.crop) filter.crop = new RegExp(req.query.crop, 'i');
  if (req.query.state) filter.state = new RegExp(req.query.state, 'i');
  const prices = await MarketPrice.find(filter).sort({ crop: 1 });
  res.json(prices);
});

module.exports = { getMarketPrices };
