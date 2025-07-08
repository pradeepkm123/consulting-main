const CallbackRequest = require('../models/CallbackRequest');

exports.submitCallbackRequest = async (req, res) => {
  const { name, email, phone, qualification, help } = req.body;
  const file = req.file ? req.file.path : null;

  try {
    const newRequest = new CallbackRequest({
      name,
      email,
      phone,
      qualification,
      help,
      file,
    });

    await newRequest.save();
    res.status(201).json({ message: 'Callback request submitted successfully!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error submitting callback request' });
  }
};

exports.getAllCallbackRequests = async (req, res) => {
  try {
    const requests = await CallbackRequest.find().sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    console.error('Error fetching callback requests:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteCallbackRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRequest = await CallbackRequest.findByIdAndDelete(id);

    if (!deletedRequest) {
      return res.status(404).json({ error: 'Callback request not found' });
    }

    res.status(200).json({ message: 'Callback request deleted successfully!' });
  } catch (error) {
    console.error('Error deleting callback request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
