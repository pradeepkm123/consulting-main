const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
  conclusion: { type: String },
  sections: [
    {
      heading: { type: String, required: true },
      paragraph: { type: String, required: true },
    },
  ],
  contentSets: [
    {
      heading: { type: String, required: true },
      paragraph: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model('Blog', BlogSchema);
