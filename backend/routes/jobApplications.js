// routes/jobApplications.js
const express = require('express');
const router = express.Router();
const JobApplication = require('../models/JobApplication');
const multer = require('multer');
const path = require('path');
const fs = require('fs');



const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Submit a job application
router.post('/', upload.single('resume'), async (req, res) => {
  try {
    const { jobId, fullName, email, phone, qualification, coverLetter } = req.body;
    const resume = req.file.path;

    const jobApplication = new JobApplication({
      jobId,
      fullName,
      email,
      phone,
      qualification,
      resume,
      coverLetter
    });

    await jobApplication.save();
    res.status(201).send(jobApplication);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get job applications by job ID
router.get('/:jobId', async (req, res) => {
  try {
    const jobApplications = await JobApplication.find({ jobId: req.params.jobId });
    res.send(jobApplications);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a job application
router.delete('/:id', async (req, res) => {
  try {
    const jobApplication = await JobApplication.findByIdAndDelete(req.params.id);
    if (!jobApplication) {
      return res.status(404).send();
    }
    res.send(jobApplication);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
