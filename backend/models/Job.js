const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobCategory: { type: String, required: true },
  jobType: { type: String, required: true },
  jobLocation: { type: String, required: true },
  positionName: { type: String, required: true },
  companyName: { type: String, required: true },
  experience: { type: String, required: true },
  educationDetails: { type: String, required: true },
  jobDescription: { type: String, required: true },
  keyResponsibilities: { type: [String], required: true },
  requiredSkills: { type: [String], required: true },
  salary: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Job', jobSchema);
