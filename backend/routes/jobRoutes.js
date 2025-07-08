// // /backend/routes/jobRoutes.js
// const express = require('express');
// const router = express.Router();
// const jobController = require('../controllers/jobController');

// // Create a new job
// router.post('/jobs', jobController.createJob);

// // Get all jobs
// router.get('/jobs', jobController.getAllJobs);

// // Get job by ID
// router.get('/jobs/:id', jobController.getJobById);

// // Update job by ID
// router.patch('/jobs/:id', jobController.updateJob);

// // Delete job by ID
// router.delete('/jobs/:id', jobController.deleteJob);

// router.put('/jobs/:id', jobController.updateJob);

// module.exports = router;

const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

// Create a new job
router.post('/jobs', jobController.createJob);

// Get all jobs
router.get('/jobs', jobController.getAllJobs);

// Get job by ID
router.get('/jobs/:id', jobController.getJobById);

// Update job by ID
router.patch('/jobs/:id', jobController.updateJob);

// Delete job by ID
router.delete('/jobs/:id', jobController.deleteJob);

router.put('/jobs/:id', jobController.updateJob);

module.exports = router;

