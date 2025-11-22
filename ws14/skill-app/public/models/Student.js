const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  rollnumber: { type: String, required: true, unique: true }, // string to allow leading zeros
  name: { type: String, required: true },
  guardianPhone: { type: String, default: null }, // optional
  skills: { type: [String], default: [] }, // array of skills (strings)
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', studentSchema);
