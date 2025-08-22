const express = require('express');
const upload = require('../middleware/upload'); // adjust path

const router = express.Router();

router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  res.json({
    message: 'File uploaded successfully',
    fileUrl: `/uploads/${req.file.filename}` // 👈 Accessible via browser
  });
});

module.exports = router;
