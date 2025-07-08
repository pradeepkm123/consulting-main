// const express = require('express');
// const multer = require('multer');
// const Internship = require('../models/Internship');
// const router = express.Router();

// // File upload config
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, 'public/uploads/'),
//   filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
// });
// const upload = multer({ storage });

// router.post('/submit', upload.single('file'), async (req, res) => {
//   try {
//     const { name, email, phone, qualification, help } = req.body;
//     const internship = new Internship({
//       name,
//       email,
//       phone,
//       qualification,
//       help,
//       file: req.file.filename,
//     });
//     const saved = await internship.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // GET all submissions
// router.get('/', async (req, res) => {
//   try {
//     const internships = await Internship.find();
//     res.json(internships);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;


const express = require('express');
const multer = require('multer');
const Internship = require('../models/Internship');
const router = express.Router();
const path = require('path');

// File upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

router.post('/submit', upload.single('file'), async (req, res) => {
  try {
    const { name, email, phone, qualification, help } = req.body;
    const internship = new Internship({
      name,
      email,
      phone,
      qualification,
      help,
      file: req.file ? req.file.filename : null, // Store only the filename
    });
    const saved = await internship.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// GET all submissions
router.get('/', async (req, res) => {
  try {
    const internships = await Internship.find();
    res.json(internships);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
