// const express = require('express');
// const router = express.Router();
// const industryController = require('../controllers/industryController');

// // Create a new industry
// router.post('/', industryController.createIndustry);

// // Get all industries
// router.get('/', industryController.getAllIndustries);

// // Get a single industry by ID
// router.get('/:id', industryController.getIndustryById);

// // Update an industry by ID
// router.put('/:id', industryController.updateIndustry);

// // Delete an industry by ID
// router.delete('/:id', industryController.deleteIndustry);

// module.exports = router;














const express = require('express');
const router = express.Router();
const industryController = require('../controllers/industryController');
const multer = require('multer');
const path = require('path');

// File storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Routes
router.post('/', upload.single('image'), industryController.createIndustry);
router.get('/', industryController.getAllIndustries);
router.get('/:id', industryController.getIndustryById);
router.put('/:id', upload.single('image'), industryController.updateIndustry);
router.delete('/:id', industryController.deleteIndustry);

module.exports = router;
