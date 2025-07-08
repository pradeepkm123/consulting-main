const express = require('express');
const router = express.Router();
const callbackController = require('../controllers/callbackController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, '../../public/uploads');

// Create the directory if it does not exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

router.get('/download/:filename', (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, '../public/uploads', fileName);
  res.download(filePath); // 👈 Forces download
});

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.get('/', callbackController.getAllCallbackRequests);
router.post('/submit', upload.single('file'), callbackController.submitCallbackRequest);
router.delete('/:id', callbackController.deleteCallbackRequest);

module.exports = router;
