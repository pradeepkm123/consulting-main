const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  qualification: { type: String, required: true },
  resumePath: { type: String, required: true },
  coverLetterPath: { type: String }
});

module.exports = mongoose.model('Resume', ResumeSchema);
