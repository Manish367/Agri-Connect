const asyncHandler = require('../utils/asyncHandler');
const { recommendCrops, SEASONS, SOIL_TYPES, CROP_NAMES } = require('../utils/cropRules');

const getOptions = asyncHandler(async (req, res) => {
  res.json({ seasons: SEASONS, soilTypes: SOIL_TYPES, crops: CROP_NAMES });
});

const getRecommendation = asyncHandler(async (req, res) => {
  const { soilType, season, temperature, rainfall } = req.body;

  if (!soilType || !season || temperature === undefined || rainfall === undefined) {
    res.status(400);
    throw new Error('soilType, season, temperature and rainfall are required');
  }

  const recommendations = recommendCrops({
    soilType,
    season,
    temperature: Number(temperature),
    rainfall: Number(rainfall),
  });

  res.json({ input: { soilType, season, temperature, rainfall }, recommendations });
});

module.exports = { getOptions, getRecommendation };
