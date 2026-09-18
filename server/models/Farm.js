const mongoose = require('mongoose');

const farmSchema = new mongoose.Schema(
  {
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    name: { type: String, required: true, trim: true },
    area: { type: Number, required: true, min: 0 },
    soilType: {
      type: String,
      required: true,
      enum: ['Alluvial', 'Black', 'Red', 'Laterite', 'Sandy', 'Clay', 'Loamy'],
    },
    location: {
      village: { type: String, trim: true },
      district: { type: String, trim: true },
      state: { type: String, trim: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Farm', farmSchema);
