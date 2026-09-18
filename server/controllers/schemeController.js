const asyncHandler = require('../utils/asyncHandler');
const Scheme = require('../models/Scheme');

const getSchemes = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.state) {
    filter.states = { $in: [req.query.state, 'All India'] };
  }
  if (req.query.category) filter.category = req.query.category;
  const schemes = await Scheme.find(filter).sort({ title: 1 });
  res.json(schemes);
});

module.exports = { getSchemes };
