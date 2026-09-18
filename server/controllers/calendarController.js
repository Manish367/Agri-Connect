const asyncHandler = require('../utils/asyncHandler');
const { CROP_CALENDAR } = require('../utils/cropCalendar');

const getCalendar = asyncHandler(async (req, res) => {
  let entries = CROP_CALENDAR;
  if (req.query.season) {
    entries = entries.filter((e) => e.season === req.query.season);
  }
  res.json(entries);
});

module.exports = { getCalendar };
