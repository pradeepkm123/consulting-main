const mongoose = require('mongoose');

const CallbackRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  help: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('CallbackRequest', CallbackRequestSchema);
