const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { sendWelcomeEmail } = require('../utils/emailService');
const { sendWelcomeSms } = require('../utils/smsService');

// @route POST /api/auth/register
const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone, state, role } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Name, email and password are required');
  }

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    res.status(400);
    throw new Error('An account with this email already exists');
  }

  const safeRole = role === 'expert' ? 'expert' : 'farmer';
  const user = await User.create({ name, email, password, phone, state, role: safeRole });

  // Fire-and-forget: don't let a slow/failed welcome message delay or break registration.
  sendWelcomeEmail(user.email, user.name).catch(() => {});
  sendWelcomeSms(user.phone, user.name).catch(() => {});

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone,
    state: user.state,
    token: generateToken(user._id),
  });
});

// @route POST /api/auth/login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: (email || '').toLowerCase() });
  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone,
    state: user.state,
    token: generateToken(user._id),
  });
});

// @route GET /api/auth/profile
const getProfile = asyncHandler(async (req, res) => {
  res.json(req.user);
});

// @route PUT /api/auth/profile
const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.name = req.body.name ?? user.name;
  user.phone = req.body.phone ?? user.phone;
  user.state = req.body.state ?? user.state;
  if (req.body.password) user.password = req.body.password;

  const updated = await user.save();
  res.json({
    _id: updated._id,
    name: updated.name,
    email: updated.email,
    role: updated.role,
    phone: updated.phone,
    state: updated.state,
  });
});

module.exports = { register, login, getProfile, updateProfile };
