const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  iconUrl: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  paragraph: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Service', ServiceSchema);
