const express = require('express');
const { getFarms, createFarm, getFarm, updateFarm, deleteFarm } = require('../controllers/farmController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(protect, getFarms).post(protect, createFarm);
router.route('/:id').get(protect, getFarm).put(protect, updateFarm).delete(protect, deleteFarm);

module.exports = router;
