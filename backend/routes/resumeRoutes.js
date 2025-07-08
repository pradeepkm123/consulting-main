const express = require('express');
const multer = require('multer');
const { submitResume, getAllResumes, deleteResume } = require('../controllers/resumeController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.fields([{ name: 'resume' }, { name: 'coverLetter' }]), submitResume);
router.get('/', getAllResumes);
router.delete('/:id', deleteResume); // New route to delete a resume

module.exports = router;
