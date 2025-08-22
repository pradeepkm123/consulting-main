
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Use same uploads directory as server.js
const uploadDir = process.env.UPLOAD_DIR || path.join(__dirname, 'uploads');

// Make sure the folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log(`📁 Upload directory created at ${uploadDir}`);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // ✅ absolute path
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

module.exports = upload;
