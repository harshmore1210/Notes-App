const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: { type: String, required: true },
  body: String
}, { timestamps: true });

module.exports = mongoose.model('Note', schema);
