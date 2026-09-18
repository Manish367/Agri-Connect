const express = require('express');
const {
  getMyBookings,
  getBookingsForMyEquipment,
  createBooking,
  updateBookingStatus,
} = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(protect, getMyBookings).post(protect, createBooking);
router.get('/for-my-equipment', protect, getBookingsForMyEquipment);
router.put('/:id/status', protect, updateBookingStatus);

module.exports = router;
