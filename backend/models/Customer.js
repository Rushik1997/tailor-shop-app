const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  whatsapp: { type: String, required: true },
  address: { type: String, required: true },

  measurements: {
    sleeve: String,
    shoulder: String,
    height: String,
    chest: String,
    neck: String,
    back: String
  },

  orders: [
    {
      qty: Number,
      blouseType: String,
      total: Number,
      neckDesign: String,
      date: Date,
      status: String
    }
  ]

}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);