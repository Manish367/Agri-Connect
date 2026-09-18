// Rule-based crop recommendation dataset.
// Each entry: crop, the season(s) and soil types it suits, ideal temperature (°C) and
// rainfall (mm) bands, expected yield (quintal/acre) and water requirement (mm/season).
// This is intentionally a static, explainable rule table (no ML) so it works offline
// with zero configuration. Swap for a trained model later without changing the API shape.

const CROP_DB = [
  { crop: 'Rice', seasons: ['Kharif'], soils: ['Alluvial', 'Clay', 'Loamy'], temp: [22, 35], rainfall: [1000, 2500], yield: '25-30 quintal/acre', water: 'High (1200-1500 mm)' },
  { crop: 'Wheat', seasons: ['Rabi'], soils: ['Alluvial', 'Black', 'Loamy'], temp: [10, 25], rainfall: [300, 900], yield: '18-22 quintal/acre', water: 'Medium (450-650 mm)' },
  { crop: 'Maize', seasons: ['Kharif', 'Rabi'], soils: ['Alluvial', 'Red', 'Loamy', 'Black'], temp: [18, 32], rainfall: [500, 1200], yield: '20-25 quintal/acre', water: 'Medium (500-800 mm)' },
  { crop: 'Sugarcane', seasons: ['Kharif'], soils: ['Alluvial', 'Black', 'Loamy'], temp: [20, 35], rainfall: [1000, 1500], yield: '350-400 quintal/acre', water: 'Very High (1500-2500 mm)' },
  { crop: 'Cotton', seasons: ['Kharif'], soils: ['Black', 'Alluvial', 'Red'], temp: [21, 35], rainfall: [500, 1000], yield: '8-10 quintal/acre', water: 'Medium (700-1200 mm)' },
  { crop: 'Soybean', seasons: ['Kharif'], soils: ['Black', 'Red', 'Loamy'], temp: [20, 30], rainfall: [600, 1000], yield: '10-12 quintal/acre', water: 'Medium (450-700 mm)' },
  { crop: 'Groundnut', seasons: ['Kharif', 'Zaid'], soils: ['Sandy', 'Red', 'Black'], temp: [20, 30], rainfall: [500, 1000], yield: '12-15 quintal/acre', water: 'Low-Medium (500-700 mm)' },
  { crop: 'Bajra (Pearl Millet)', seasons: ['Kharif'], soils: ['Sandy', 'Red', 'Black'], temp: [25, 35], rainfall: [300, 600], yield: '8-10 quintal/acre', water: 'Low (350-450 mm)' },
  { crop: 'Jowar (Sorghum)', seasons: ['Kharif', 'Rabi'], soils: ['Black', 'Red', 'Loamy'], temp: [20, 32], rainfall: [400, 800], yield: '9-11 quintal/acre', water: 'Low (400-500 mm)' },
  { crop: 'Mustard', seasons: ['Rabi'], soils: ['Alluvial', 'Loamy', 'Sandy'], temp: [10, 25], rainfall: [250, 500], yield: '8-10 quintal/acre', water: 'Low (250-400 mm)' },
  { crop: 'Gram (Chickpea)', seasons: ['Rabi'], soils: ['Black', 'Alluvial', 'Loamy'], temp: [10, 25], rainfall: [300, 600], yield: '9-12 quintal/acre', water: 'Low (300-450 mm)' },
  { crop: 'Potato', seasons: ['Rabi'], soils: ['Alluvial', 'Loamy', 'Sandy'], temp: [15, 25], rainfall: [400, 700], yield: '80-100 quintal/acre', water: 'Medium (500-700 mm)' },
  { crop: 'Onion', seasons: ['Rabi', 'Zaid'], soils: ['Alluvial', 'Black', 'Loamy'], temp: [13, 30], rainfall: [350, 700], yield: '90-120 quintal/acre', water: 'Medium (450-600 mm)' },
  { crop: 'Tomato', seasons: ['Rabi', 'Zaid', 'Kharif'], soils: ['Alluvial', 'Loamy', 'Red'], temp: [18, 30], rainfall: [400, 800], yield: '150-200 quintal/acre', water: 'Medium (400-600 mm)' },
  { crop: 'Tea', seasons: ['Kharif'], soils: ['Laterite', 'Red'], temp: [18, 30], rainfall: [1500, 3000], yield: '8-10 quintal/acre', water: 'Very High (1500-2500 mm)' },
  { crop: 'Cashew', seasons: ['Kharif', 'Rabi'], soils: ['Laterite', 'Red', 'Sandy'], temp: [20, 35], rainfall: [1000, 2000], yield: '6-8 quintal/acre', water: 'Medium (1000-1500 mm)' },
  { crop: 'Coconut', seasons: ['Kharif', 'Rabi', 'Zaid'], soils: ['Laterite', 'Alluvial', 'Sandy'], temp: [20, 35], rainfall: [1200, 2500], yield: '80-100 nuts/tree/yr', water: 'High (1200-2000 mm)' },
  { crop: 'Watermelon', seasons: ['Zaid'], soils: ['Sandy', 'Alluvial', 'Loamy'], temp: [24, 35], rainfall: [300, 600], yield: '100-150 quintal/acre', water: 'Medium (400-600 mm)' },
  { crop: 'Cucumber', seasons: ['Zaid'], soils: ['Sandy', 'Loamy', 'Alluvial'], temp: [20, 32], rainfall: [300, 600], yield: '60-80 quintal/acre', water: 'Medium (350-500 mm)' },
  { crop: 'Moong (Green Gram)', seasons: ['Zaid', 'Kharif'], soils: ['Sandy', 'Black', 'Loamy'], temp: [25, 35], rainfall: [300, 600], yield: '5-7 quintal/acre', water: 'Low (300-400 mm)' },
];

const SEASONS = ['Kharif', 'Rabi', 'Zaid'];
const SOIL_TYPES = ['Alluvial', 'Black', 'Red', 'Laterite', 'Sandy', 'Clay', 'Loamy'];
const CROP_NAMES = [...new Set(CROP_DB.map((entry) => entry.crop))].sort((a, b) => a.localeCompare(b));

function scoreMatch(entry, temperature, rainfall) {
  let score = 0;
  const [tMin, tMax] = entry.temp;
  const [rMin, rMax] = entry.rainfall;

  if (temperature >= tMin && temperature <= tMax) score += 2;
  else score -= Math.min(2, Math.abs(temperature - (temperature < tMin ? tMin : tMax)) / 10);

  if (rainfall >= rMin && rainfall <= rMax) score += 2;
  else score -= Math.min(2, Math.abs(rainfall - (rainfall < rMin ? rMin : rMax)) / 500);

  return score;
}

function recommendCrops({ soilType, season, temperature, rainfall }) {
  const candidates = CROP_DB.filter(
    (entry) => entry.soils.includes(soilType) && entry.seasons.includes(season)
  );

  const pool = candidates.length > 0 ? candidates : CROP_DB.filter((e) => e.seasons.includes(season));

  const ranked = pool
    .map((entry) => ({
      crop: entry.crop,
      expectedYield: entry.yield,
      waterRequirement: entry.water,
      matchScore: Number(scoreMatch(entry, temperature, rainfall).toFixed(2)),
    }))
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 5);

  return ranked;
}

module.exports = { CROP_DB, SEASONS, SOIL_TYPES, CROP_NAMES, recommendCrops };
