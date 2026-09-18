// Rule-based smart irrigation advice. Combines the crop's typical water need (from
// cropRules), the soil's water retention, and current weather (rain chance, temperature,
// humidity as a proxy for evapotranspiration) into a simple "irrigate today? how much?"
// recommendation. No soil-moisture sensor data is used — this is a heuristic, not a
// measurement, and is clearly presented as such.

const { CROP_DB } = require('./cropRules');

const WATER_LEVEL_WEIGHT = { Low: 1, Medium: 2, High: 3, 'Very High': 4 };
const BASE_LITERS_PER_ACRE = { Low: 15000, Medium: 25000, High: 35000, 'Very High': 45000 };

const SOIL_RETENTION_FACTOR = {
  Sandy: 1.3,
  Laterite: 1.15,
  Clay: 0.7,
  Alluvial: 1,
  Black: 0.9,
  Red: 1.05,
  Loamy: 0.95,
};

function parseWaterLevel(waterString) {
  if (waterString.startsWith('Very High')) return 'Very High';
  if (waterString.startsWith('High')) return 'High';
  if (waterString.startsWith('Medium')) return 'Medium';
  return 'Low';
}

function getIrrigationAdvice({ crop, soilType, rainChancePercent, temperature, humidity }) {
  const cropEntry = CROP_DB.find((c) => c.crop === crop);
  const waterLevel = cropEntry ? parseWaterLevel(cropEntry.water) : 'Medium';
  const soilFactor = SOIL_RETENTION_FACTOR[soilType] ?? 1;

  let weatherFactor = 1;
  if (temperature > 32 && humidity < 40) weatherFactor = 1.3;
  else if (temperature < 20 || humidity > 70) weatherFactor = 0.7;

  const rainExpected = rainChancePercent > 60;
  const baseLiters = BASE_LITERS_PER_ACRE[waterLevel];
  const adjustedLiters = Math.round(baseLiters * soilFactor * weatherFactor);

  const irrigateToday = !rainExpected && weatherFactor >= 1;

  let reason;
  if (rainExpected) {
    reason = `Rain is likely (${rainChancePercent}% chance) — skip irrigation today and let rainfall do the work.`;
  } else if (irrigateToday) {
    reason = `Hot/dry conditions (${temperature}°C, ${humidity}% humidity) increase water loss for a ${waterLevel.toLowerCase()}-water-need crop like ${crop} in ${soilType.toLowerCase()} soil.`;
  } else {
    reason = `Mild conditions (${temperature}°C, ${humidity}% humidity) mean the soil is losing moisture slowly — irrigation can wait a day.`;
  }

  return {
    crop,
    soilType,
    waterNeedLevel: waterLevel,
    irrigateToday,
    recommendedLitersPerAcre: irrigateToday ? adjustedLiters : 0,
    reason,
  };
}

module.exports = { getIrrigationAdvice, WATER_LEVEL_WEIGHT };
