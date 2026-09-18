const asyncHandler = require('../utils/asyncHandler');
const { fetchWeather } = require('../utils/weatherService');

const getWeather = asyncHandler(async (req, res) => {
  const location = req.query.location || 'India';
  const weather = await fetchWeather(location);
  res.json(weather);
});

module.exports = { getWeather };
