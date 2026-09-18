const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    machineName: { type: String, required: true, trim: true },
    type: {
      type: String,
      required: true,
      enum: ['Tractor', 'Seeder', 'Harvester', 'Sprayer', 'Plough', 'Rotavator', 'Other'],
    },
    description: { type: String, trim: true },
    rentPerDay: { type: Number, required: true, min: 0 },
    location: { type: String, trim: true },
    contactPhone: { type: String, trim: true },
    imageUrl: { type: String, default: '' },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Equipment', equipmentSchema);
