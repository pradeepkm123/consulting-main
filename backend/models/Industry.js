const mongoose = require('mongoose');

const contentSetSchema = new mongoose.Schema({
  heading: String,
  paragraph: String,
});

const IndustrySchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: String,
  description: String,
  imageUrl: String,
  iconUrl: String,
  date: { type: Date, required: true },
  contentSets: [contentSetSchema],
});

module.exports = mongoose.model('Industry', IndustrySchema);
