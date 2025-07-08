// backend/routes/teamRoutes.js
const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const upload = require('../middlewares/upload'); // Make sure this points to your Multer config

// Create a new team member
router.post('/team', upload.single('image'), teamController.addTeamMember);

// Get all team members
router.get('/team', teamController.getAllTeamMembers);

// Delete a team member
router.delete('/team/:id', teamController.deleteTeamMember);

// ✅ Update a team member (with image upload support)
router.put('/team/:id', upload.single('image'), teamController.updateTeamMember);

module.exports = router;
