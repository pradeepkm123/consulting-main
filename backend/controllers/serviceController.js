const Service = require('../models/Service');

exports.createService = async (req, res) => {
  try {
    const { title, date, description, paragraph } = req.body;
    const imageUrl = req.files['image'] ? req.files['image'][0].path : null;
    const iconUrl = req.files['icon'] ? req.files['icon'][0].path : null;

    const newService = new Service({
      title,
      imageUrl,
      iconUrl,
      date,
      description,
      paragraph,
    });

    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateService = async (req, res) => {
  try {
    const { title, date, description, paragraph } = req.body;
    const imageUrl = req.files['image'] ? req.files['image'][0].path : req.body.imageUrl;
    const iconUrl = req.files['icon'] ? req.files['icon'][0].path : req.body.iconUrl;

    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      { title, imageUrl, iconUrl, date, description, paragraph },
      { new: true }
    );

    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json(updatedService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
