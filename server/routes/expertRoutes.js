const express = require('express');
const { getExperts } = require('../controllers/expertController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, getExperts);

module.exports = router;
