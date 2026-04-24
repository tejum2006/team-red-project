const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  role: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    trim: true
  },

  image: {
    type: String,
    default: ''
  },

  // 🟢 EXTRA FIELDS
  rollNumber: {
    type: String,
    default: ''
  },

  project: {
    type: String,
    default: ''
  },

  certificate: {
    type: String,
    default: ''
  },

  internship: {
    type: String,
    default: ''
  },

  about: {
    type: String,
    default: ''
  },

  hobbies: {
    type: [String],
    default: []
  }

}, {
  timestamps: true
});

module.exports = mongoose.model('Member', memberSchema);