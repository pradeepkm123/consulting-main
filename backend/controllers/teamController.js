// backend/controllers/teamController.js
const Team = require('../models/Team');

// Get all team members
exports.getAllTeamMembers = async (req, res) => {
  try {
    const teamMembers = await Team.find();
    res.json(teamMembers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new team member
exports.addTeamMember = async (req, res) => {
  try {
    const { name, role } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const teamMember = new Team({
      name,
      role,
      imageUrl
    });

    const newTeamMember = await teamMember.save();
    res.status(201).json(newTeamMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



// Delete a team member
exports.deleteTeamMember = async (req, res) => {
  try {
    await Team.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Team member deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




exports.updateTeamMember = async (req, res) => {
  try {
    const { name, role } = req.body;
    const updateFields = {
      name,
      role,
    };

    if (req.file) {
      updateFields.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedTeamMember = await Team.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    res.status(200).json(updatedTeamMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
