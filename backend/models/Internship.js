// models/Internship.js
const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  qualification: String,
  help: String,
  file: String, // store filename or file path
});

module.exports = mongoose.model('Internship', internshipSchema);
