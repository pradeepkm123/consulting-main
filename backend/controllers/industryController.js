// const Industry = require('../models/Industry');

// // Create a new industry
// exports.createIndustry = async (req, res) => {
//   try {
//     const newIndustry = new Industry(req.body);
//     const savedIndustry = await newIndustry.save();
//     res.status(201).json(savedIndustry);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Get all industries
// exports.getAllIndustries = async (req, res) => {
//   try {
//     const industries = await Industry.find();
//     res.json(industries);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get a single industry by ID
// exports.getIndustryById = async (req, res) => {
//   try {
//     const industry = await Industry.findById(req.params.id);
//     if (!industry) {
//       return res.status(404).json({ message: 'Industry not found' });
//     }
//     res.json(industry);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update an industry by ID
// exports.updateIndustry = async (req, res) => {
//   try {
//     const updatedIndustry = await Industry.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updatedIndustry) {
//       return res.status(404).json({ message: 'Industry not found' });
//     }
//     res.json(updatedIndustry);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Delete an industry by ID
// exports.deleteIndustry = async (req, res) => {
//   try {
//     const deletedIndustry = await Industry.findByIdAndDelete(req.params.id);
//     if (!deletedIndustry) {
//       return res.status(404).json({ message: 'Industry not found' });
//     }
//     res.json({ message: 'Industry deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };













const Industry = require('../models/Industry');

exports.createIndustry = async (req, res) => {
  try {
    const { title, subtitle, description, iconUrl, date, contentSets } = req.body;
    const imageUrl = req.file?.filename;

    const newIndustry = new Industry({
      title,
      subtitle,
      description,
      iconUrl,
      date,
      imageUrl,
      contentSets: JSON.parse(contentSets),
    });

    const saved = await newIndustry.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('Error creating industry:', error);
    res.status(500).json({ error: 'Failed to create industry' });
  }
};

exports.getAllIndustries = async (req, res) => {
  try {
    const industries = await Industry.find();
    res.json(industries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getIndustryById = async (req, res) => {
  try {
    const industry = await Industry.findById(req.params.id);
    if (!industry) return res.status(404).json({ message: 'Not found' });
    res.json(industry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateIndustry = async (req, res) => {
  try {
    const { title, subtitle, description, iconUrl, date, contentSets } = req.body;
    const update = {
      title,
      subtitle,
      description,
      iconUrl,
      date,
      contentSets: JSON.parse(contentSets),
    };

    if (req.file) update.imageUrl = req.file.filename;

    const updated = await Industry.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteIndustry = async (req, res) => {
  try {
    await Industry.findByIdAndDelete(req.params.id);
    res.json({ message: 'Industry deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
