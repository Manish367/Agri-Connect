const asyncHandler = require('../utils/asyncHandler');
const Equipment = require('../models/Equipment');
const Booking = require('../models/Booking');

const getEquipment = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.type) filter.type = req.query.type;
  if (req.query.mine === 'true') filter.owner = req.user._id;
  const equipment = await Equipment.find(filter).populate('owner', 'name phone state').sort({ createdAt: -1 });
  res.json(equipment);
});

const createEquipment = asyncHandler(async (req, res) => {
  const { machineName, type, description, rentPerDay, location, contactPhone } = req.body;
  if (!machineName || !type || rentPerDay === undefined) {
    res.status(400);
    throw new Error('machineName, type and rentPerDay are required');
  }
  const equipment = await Equipment.create({
    owner: req.user._id,
    machineName,
    type,
    description,
    rentPerDay,
    location,
    contactPhone,
  });
  res.status(201).json(equipment);
});

const updateEquipment = asyncHandler(async (req, res) => {
  const equipment = await Equipment.findOne({ _id: req.params.id, owner: req.user._id });
  if (!equipment) {
    res.status(404);
    throw new Error('Equipment not found');
  }
  Object.assign(equipment, req.body);
  const updated = await equipment.save();
  res.json(updated);
});

const deleteEquipment = asyncHandler(async (req, res) => {
  const equipment = await Equipment.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
  if (!equipment) {
    res.status(404);
    throw new Error('Equipment not found');
  }
  await Booking.deleteMany({ equipment: equipment._id });
  res.json({ message: 'Equipment removed' });
});

module.exports = { getEquipment, createEquipment, updateEquipment, deleteEquipment };
