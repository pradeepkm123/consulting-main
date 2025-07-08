const Counter = require('../models/Counter');

// Get counter data
exports.getCounterData = async (req, res) => {
  try {
    const counterData = await Counter.findOne();
    if (!counterData) {
      return res.status(404).json({ message: 'Counter data not found' });
    }
    res.json(counterData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update counter data
exports.updateCounterData = async (req, res) => {
  const { clients, placements, experience } = req.body;

  try {
    let counterData = await Counter.findOne();

    if (!counterData) {
      counterData = new Counter({
        clients,
        placements,
        experience,
      });
    } else {
      counterData.clients = clients;
      counterData.placements = placements;
      counterData.experience = experience;
    }

    await counterData.save();
    res.json(counterData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
