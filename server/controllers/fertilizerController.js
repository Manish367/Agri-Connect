const asyncHandler = require('../utils/asyncHandler');
const { recommendFertilizer } = require('../utils/fertilizerRules');
const { CROP_NAMES, SOIL_TYPES } = require('../utils/cropRules');

const getOptions = asyncHandler(async (req, res) => {
  res.json({ crops: CROP_NAMES, soilTypes: SOIL_TYPES });
});

const getRecommendation = asyncHandler(async (req, res) => {
  const { crop, soilType, n, p, k } = req.body;

  if (!crop || !soilType) {
    res.status(400);
    throw new Error('crop and soilType are required');
  }

  const result = recommendFertilizer({ crop, soilType, n, p, k });
  if (!result) {
    res.status(404);
    throw new Error(`No fertilizer data available for "${crop}"`);
  }

  res.json(result);
});

module.exports = { getOptions, getRecommendation };
