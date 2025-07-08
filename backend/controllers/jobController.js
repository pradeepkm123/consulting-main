// const Job = require('../models/Job');

// // Create a new job
// exports.createJob = async (req, res) => {
//   try {
//     const job = new Job(req.body);
//     await job.save();
//     res.status(201).json(job); // Using json() instead of send() for consistency
//   } catch (error) {
//     res.status(400).json({ error: error.message }); // Sending error message in JSON format
//   }
// };

// // Get all jobs
// exports.getAllJobs = async (req, res) => {
//   try {
//     const jobs = await Job.find({});
//     res.json(jobs); // Using json() instead of send() for consistency
//   } catch (error) {
//     res.status(500).json({ error: error.message }); // Sending error message in JSON format
//   }
// };

// // Get job by ID
// exports.getJobById = async (req, res) => {
//   try {
//     const job = await Job.findById(req.params.id);
//     if (!job) {
//       return res.status(404).json({ error: 'Job not found' }); // Sending error message in JSON format
//     }
//     res.json(job); // Using json() instead of send() for consistency
//   } catch (error) {
//     res.status(500).json({ error: error.message }); // Sending error message in JSON format
//   }
// };

// exports.updateJob = async (req, res) => {
//   try {
//     const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
//     if (!job) {
//       return res.status(404).json({ error: 'Job not found' });
//     }
//     res.json(job);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };


// // Delete job by ID
// exports.deleteJob = async (req, res) => {
//   try {
//     const job = await Job.findByIdAndDelete(req.params.id);
//     if (!job) {
//       return res.status(404).json({ error: 'Job not found' }); // Sending error message in JSON format
//     }
//     res.json(job); // Using json() instead of send() for consistency
//   } catch (error) {
//     res.status(500).json({ error: error.message }); // Sending error message in JSON format
//   }
// };


const Job = require('../models/Job');

// Create a new job
exports.createJob = async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all jobs
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get job by ID
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update job by ID
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete job by ID
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

