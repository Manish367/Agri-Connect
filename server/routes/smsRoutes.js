const express = require('express');
const { sendTestSms } = require('../controllers/smsController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/test', protect, sendTestSms);

module.exports = router;
