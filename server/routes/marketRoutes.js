const express = require('express');
const { getMarketPrices } = require('../controllers/marketController');

const router = express.Router();

router.get('/', getMarketPrices);

module.exports = router;
