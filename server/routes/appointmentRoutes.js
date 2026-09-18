const express = require('express');
const {
  getMyAppointments,
  getAppointment,
  createAppointment,
  updateStatus,
  addMessage,
  getVideoRoom,
} = require('../controllers/appointmentController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(protect, getMyAppointments).post(protect, createAppointment);
router.get('/:id', protect, getAppointment);
router.put('/:id/status', protect, updateStatus);
router.post('/:id/messages', protect, addMessage);
router.get('/:id/video-room', protect, getVideoRoom);

module.exports = router;
