const asyncHandler = require('../utils/asyncHandler');
const Booking = require('../models/Booking');
const Equipment = require('../models/Equipment');

const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ farmer: req.user._id })
    .populate({ path: 'equipment', populate: { path: 'owner', select: 'name phone' } })
    .sort({ createdAt: -1 });
  res.json(bookings);
});

const getBookingsForMyEquipment = asyncHandler(async (req, res) => {
  const myEquipmentIds = await Equipment.find({ owner: req.user._id }).distinct('_id');
  const bookings = await Booking.find({ equipment: { $in: myEquipmentIds } })
    .populate('equipment', 'machineName')
    .populate('farmer', 'name phone')
    .sort({ createdAt: -1 });
  res.json(bookings);
});

const createBooking = asyncHandler(async (req, res) => {
  const { equipment, startDate, endDate, message } = req.body;
  if (!equipment || !startDate || !endDate) {
    res.status(400);
    throw new Error('equipment, startDate and endDate are required');
  }
  const equipmentDoc = await Equipment.findById(equipment);
  if (!equipmentDoc) {
    res.status(404);
    throw new Error('Equipment not found');
  }
  if (equipmentDoc.owner.toString() === req.user._id.toString()) {
    res.status(400);
    throw new Error('You cannot book your own equipment');
  }
  const booking = await Booking.create({
    farmer: req.user._id,
    equipment,
    startDate,
    endDate,
    message,
  });
  const populated = await booking.populate({ path: 'equipment', populate: { path: 'owner', select: 'name phone' } });
  res.status(201).json(populated);
});

const updateBookingStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
    res.status(400);
    throw new Error('Invalid status');
  }
  const booking = await Booking.findById(req.params.id).populate('equipment');
  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }
  const isOwner = booking.equipment.owner.toString() === req.user._id.toString();
  const isRenter = booking.farmer.toString() === req.user._id.toString();
  if (!isOwner && !isRenter) {
    res.status(403);
    throw new Error('Not authorized to update this booking');
  }
  booking.status = status;
  await booking.save();
  res.json(booking);
});

module.exports = { getMyBookings, getBookingsForMyEquipment, createBooking, updateBookingStatus };
