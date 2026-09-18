const asyncHandler = require('../utils/asyncHandler');
const Farm = require('../models/Farm');

const getFarms = asyncHandler(async (req, res) => {
  const farms = await Farm.find({ farmer: req.user._id }).sort({ createdAt: -1 });
  res.json(farms);
});

const createFarm = asyncHandler(async (req, res) => {
  const { name, area, soilType, location } = req.body;
  if (!name || !area || !soilType) {
    res.status(400);
    throw new Error('name, area and soilType are required');
  }
  const farm = await Farm.create({ farmer: req.user._id, name, area, soilType, location });
  res.status(201).json(farm);
});

const getFarm = asyncHandler(async (req, res) => {
  const farm = await Farm.findOne({ _id: req.params.id, farmer: req.user._id });
  if (!farm) {
    res.status(404);
    throw new Error('Farm not found');
  }
  res.json(farm);
});

const updateFarm = asyncHandler(async (req, res) => {
  const farm = await Farm.findOne({ _id: req.params.id, farmer: req.user._id });
  if (!farm) {
    res.status(404);
    throw new Error('Farm not found');
  }
  const { name, area, soilType, location } = req.body;
  farm.name = name ?? farm.name;
  farm.area = area ?? farm.area;
  farm.soilType = soilType ?? farm.soilType;
  farm.location = location ?? farm.location;
  const updated = await farm.save();
  res.json(updated);
});

const deleteFarm = asyncHandler(async (req, res) => {
  const farm = await Farm.findOneAndDelete({ _id: req.params.id, farmer: req.user._id });
  if (!farm) {
    res.status(404);
    throw new Error('Farm not found');
  }
  res.json({ message: 'Farm removed' });
});

module.exports = { getFarms, createFarm, getFarm, updateFarm, deleteFarm };
