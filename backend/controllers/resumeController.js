const Resume = require('../models/Resume');

exports.submitResume = async (req, res) => {
  try {
    const { fullName, email, phone, qualification } = req.body;
    const resumePath = req.files['resume'][0].path;
    const coverLetterPath = req.files['coverLetter'] ? req.files['coverLetter'][0].path : null;

    const newResume = new Resume({
      fullName,
      email,
      phone,
      qualification,
      resumePath,
      coverLetterPath
    });

    await newResume.save();
    res.status(201).json({ message: 'Resume submitted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting resume', error });
  }
};

// Fetch all resumes
exports.getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find();
    res.status(200).json(resumes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resumes', error });
  }
};

// Delete a resume
exports.deleteResume = async (req, res) => {
  try {
    const { id } = req.params;
    await Resume.findByIdAndDelete(id);
    res.status(200).json({ message: 'Resume deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting resume', error });
  }
};

