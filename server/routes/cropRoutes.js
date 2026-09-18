const express = require('express');
const { getOptions, getRecommendation } = require('../controllers/cropController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/options', getOptions);
router.post('/recommend', protect, getRecommendation);

module.exports = router;
