const asyncHandler = require('../utils/asyncHandler');
const { getIrrigationAdvice } = require('../utils/irrigationRules');
const { fetchWeather } = require('../utils/weatherService');
const { CROP_NAMES, SOIL_TYPES } = require('../utils/cropRules');

const getOptions = asyncHandler(async (req, res) => {
  res.json({ crops: CROP_NAMES, soilTypes: SOIL_TYPES });
});

const getRecommendation = asyncHandler(async (req, res) => {
  const { crop, soilType, location } = req.body;

  if (!crop || !soilType || !location) {
    res.status(400);
    throw new Error('crop, soilType and location are required');
  }

  const weather = await fetchWeather(location);
  const advice = getIrrigationAdvice({
    crop,
    soilType,
    rainChancePercent: weather.rainChancePercent,
    temperature: weather.temperature,
    humidity: weather.humidity,
  });

  res.json({ ...advice, weather });
});

module.exports = { getOptions, getRecommendation };
