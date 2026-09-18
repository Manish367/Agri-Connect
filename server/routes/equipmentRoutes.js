const express = require('express');
const { getEquipment, createEquipment, updateEquipment, deleteEquipment } = require('../controllers/equipmentController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(protect, getEquipment).post(protect, createEquipment);
router.route('/:id').put(protect, updateEquipment).delete(protect, deleteEquipment);

module.exports = router;
