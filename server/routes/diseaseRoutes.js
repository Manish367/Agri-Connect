const express = require('express');
const { detectDisease } = require('../controllers/diseaseController');
const { protect } = require('../middleware/auth');
const uploadMemory = require('../middleware/uploadMemory');

const router = express.Router();

router.post('/detect', protect, uploadMemory.single('image'), detectDisease);

module.exports = router;
