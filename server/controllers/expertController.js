const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/User');

const getExperts = asyncHandler(async (req, res) => {
  const experts = await User.find({ role: 'expert' }).select('name state phone');
  res.json(experts);
});

module.exports = { getExperts };
