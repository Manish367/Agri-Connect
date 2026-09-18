const asyncHandler = require('../utils/asyncHandler');
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const { getOrCreateDailyRoom } = require('../config/daily');

const getMyAppointments = asyncHandler(async (req, res) => {
  const filter =
    req.user.role === 'expert'
      ? { expert: req.user._id }
      : { farmer: req.user._id };

  const appointments = await Appointment.find(filter)
    .populate('farmer', 'name phone')
    .populate('expert', 'name phone')
    .sort({ scheduledAt: -1 });

  res.json(appointments);
});

const getAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id)
    .populate('farmer', 'name phone')
    .populate('expert', 'name phone')
    .populate('messages.sender', 'name');

  if (!appointment) {
    res.status(404);
    throw new Error('Appointment not found');
  }

  const uid = req.user._id.toString();
  if (appointment.farmer._id.toString() !== uid && appointment.expert._id.toString() !== uid) {
    res.status(403);
    throw new Error('Not authorized to view this appointment');
  }

  res.json(appointment);
});

const createAppointment = asyncHandler(async (req, res) => {
  const { expert, scheduledAt, reason } = req.body;
  if (!expert || !scheduledAt) {
    res.status(400);
    throw new Error('expert and scheduledAt are required');
  }

  const expertUser = await User.findOne({ _id: expert, role: 'expert' });
  if (!expertUser) {
    res.status(404);
    throw new Error('Expert not found');
  }

  const appointment = await Appointment.create({
    farmer: req.user._id,
    expert,
    scheduledAt,
    reason,
  });

  const populated = await appointment.populate([
    { path: 'farmer', select: 'name phone' },
    { path: 'expert', select: 'name phone' },
  ]);

  res.status(201).json(populated);
});

const updateStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  if (!['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
    res.status(400);
    throw new Error('Invalid status');
  }

  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) {
    res.status(404);
    throw new Error('Appointment not found');
  }

  const uid = req.user._id.toString();
  if (appointment.farmer.toString() !== uid && appointment.expert.toString() !== uid) {
    res.status(403);
    throw new Error('Not authorized to update this appointment');
  }

  appointment.status = status;
  await appointment.save();
  res.json(appointment);
});

const addMessage = asyncHandler(async (req, res) => {
  const { text } = req.body;
  if (!text) {
    res.status(400);
    throw new Error('Message text is required');
  }

  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) {
    res.status(404);
    throw new Error('Appointment not found');
  }

  const uid = req.user._id.toString();
  if (appointment.farmer.toString() !== uid && appointment.expert.toString() !== uid) {
    res.status(403);
    throw new Error('Not authorized to message in this appointment');
  }

  appointment.messages.push({ sender: req.user._id, text });
  await appointment.save();

  const populated = await appointment.populate('messages.sender', 'name');
  res.status(201).json(populated.messages);
});

const getVideoRoom = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) {
    res.status(404);
    throw new Error('Appointment not found');
  }

  const uid = req.user._id.toString();
  if (appointment.farmer.toString() !== uid && appointment.expert.toString() !== uid) {
    res.status(403);
    throw new Error('Not authorized for this appointment');
  }

  const roomName = `agriconnect-${appointment._id}`;

  try {
    const dailyUrl = await getOrCreateDailyRoom(roomName);
    if (dailyUrl) {
      return res.json({ provider: 'daily', url: dailyUrl });
    }
  } catch (err) {
    console.error('Daily.co room creation failed, falling back to Jitsi:', err.message);
  }

  res.json({ provider: 'jitsi', url: `https://meet.jit.si/AgriConnect-Appointment-${appointment._id}` });
});

module.exports = { getMyAppointments, getAppointment, createAppointment, updateStatus, addMessage, getVideoRoom };
