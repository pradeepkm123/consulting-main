// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const path = require('path');
// const fs = require('fs');

// const jobRoutes = require('./routes/jobRoutes');
// const jobApplicationsRouter = require('./routes/jobApplications');
// const blogRoutes = require('./routes/blogRoutes');
// const serviceRoutes = require('./routes/serviceRoutes');
// const industryRoutes = require('./routes/industryRoutes');
// const callbackRoutes = require('./routes/callbackRoutes');
// const contactRoutes = require('./routes/contactRoutes');
// const resumeRoutes = require('./routes/resumeRoutes');
// const authRoutes = require('./routes/authRoutes');
// const teamRoutes = require('./routes/teamRoutes');

// dotenv.config(); // Load .env file

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json()); // For parsing application/json
// app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// // Serve uploaded images/files statically
// const uploadDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// // app.use('/uploads', express.static(uploadDir));
// app.use('/public', express.static('public'));

// // Ensure 'uploads' directory exists
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
//   console.log(`Upload directory created at ${uploadDir}`);
// } else {
//   console.log(`Upload directory already exists at ${uploadDir}`);
// }

// // Connect to MongoDB
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('✅ MongoDB connected');
//   } catch (error) {
//     console.error('❌ MongoDB connection failed:', error.message);
//     process.exit(1);
//   }
// };
// connectDB();

// // API Routes
// app.use('/api', jobRoutes);
// app.use('/api/jobApplications', jobApplicationsRouter);
// app.use('/api/blogs', blogRoutes);
// app.use('/api/services', serviceRoutes);
// app.use('/api/industries', industryRoutes);
// app.use('/api/callback', callbackRoutes);
// app.use('/api/contact', contactRoutes);
// app.use('/api/resumes', resumeRoutes);
// app.use('/api/auth', authRoutes);
// app.use('/api', teamRoutes);
// app.use('/api/counter', require('./routes/counterRoutes'));
// app.use('/api/clients', require('./routes/clientRoutes'));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });








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

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files from "uploads" folder
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log(`📁 Upload directory created at ${uploadDir}`);
} else {
  console.log(`📁 Upload directory already exists at ${uploadDir}`);
}

// ✅ Serve /uploads as static files
// app.use('/uploads', express.static(uploadDir));

app.use('/uploads', express.static('uploads'));


// ✅ If you have a public folder (like for HTML or other assets), you can keep this:
app.use('/public', express.static('public'));

// MongoDB Connection
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

// Routes
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

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

