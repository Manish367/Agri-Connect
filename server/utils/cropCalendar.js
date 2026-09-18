// Static crop calendar derived from the same CROP_DB used for crop recommendations,
// mapped onto India's three standard agricultural seasons. Sowing/harvest windows are
// general guidance — actual timing varies by exact region and micro-climate.

const { CROP_DB } = require('./cropRules');

const SEASON_WINDOWS = {
  Kharif: { sowing: 'June - July', harvesting: 'September - October' },
  Rabi: { sowing: 'October - December', harvesting: 'March - April' },
  Zaid: { sowing: 'March - April', harvesting: 'June - July' },
};

function buildCalendar() {
  const entries = [];
  CROP_DB.forEach((entry) => {
    entry.seasons.forEach((season) => {
      const window = SEASON_WINDOWS[season];
      entries.push({
        crop: entry.crop,
        season,
        sowingWindow: window.sowing,
        harvestWindow: window.harvesting,
        waterRequirement: entry.water,
        expectedYield: entry.yield,
      });
    });
  });
  return entries.sort((a, b) => a.crop.localeCompare(b.crop));
}

const CROP_CALENDAR = buildCalendar();

module.exports = { CROP_CALENDAR, SEASON_WINDOWS };
