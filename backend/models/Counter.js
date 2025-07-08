const mongoose = require('mongoose');

const CounterSchema = new mongoose.Schema({
  clients: {
    type: Number,
    required: true,
  },
  placements: {
    type: Number,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Counter', CounterSchema);
