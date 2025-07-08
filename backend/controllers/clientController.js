// controllers/clientController.js
const Client = require('../models/Client');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Get all clients
exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Add a new client
exports.addClient = [
  upload.array('images', 5), // 'images' is the field name for the files, 5 is the max number
  async (req, res) => {
    const { name, description } = req.body;
    const images = req.files.map(file => file.path);

    try {
      const newClient = new Client({
        name,
        description,
        images,
      });

      await newClient.save();
      res.status(201).json(newClient);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
];




exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({ msg: 'Client not found' });
    }

    // Delete uploaded image files
    client.images.forEach((imagePath) => {
      fs.unlink(imagePath, (err) => {
        if (err) console.error(`Error deleting file: ${imagePath}`, err);
      });
    });

    await client.deleteOne(); // or client.remove() for older Mongoose versions

    res.json({ msg: 'Client removed' });
  } catch (err) {
    console.error('Server error deleting client:', err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};