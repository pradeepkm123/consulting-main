const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Route Imports
const jobRoutes = require('./routes/jobRoutes');
const jobApplicationsRouter = require('./routes/jobApplications');
const blogRoutes = require('./routes/blogRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const industryRoutes = require('./routes/industryRoutes');
const callbackRoutes = require('./routes/callbackRoutes');
const contactRoutes = require('./routes/contactRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const authRoutes = require('./routes/authRoutes');
const teamRoutes = require('./routes/teamRoutes');
const counterRoutes = require('./routes/counterRoutes');
const clientRoutes = require('./routes/clientRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

dotenv.config(); // Load environment variables

const app = express();

// =======================
// Middleware
// =======================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =======================
// Uploads Directory Setup
// =======================

// Use persistent disk path in Render if provided, otherwise fallback to local "uploads"
const uploadDir = process.env.UPLOAD_DIR || path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log(`📁 Upload directory created at ${uploadDir}`);
} else {
  console.log(`📁 Upload directory already exists at ${uploadDir}`);
}

// Serve static files from uploads
app.use('/uploads', express.static(uploadDir));

// Optional: serve public folder for frontend assets
app.use('/public', express.static(path.join(__dirname, 'public')));

// =======================
// MongoDB Connection
// =======================
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};
connectDB();

// =======================
// Routes
// =======================
app.use('/api', jobRoutes);
app.use('/api/jobApplications', jobApplicationsRouter);
app.use('/api/blogs', blogRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/industries', industryRoutes);
app.use('/api/callback', callbackRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', teamRoutes);
app.use('/api/counter', counterRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api', uploadRoutes);

// =======================
// Start Server
// =======================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
