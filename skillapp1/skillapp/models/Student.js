const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  rollnumber: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  guardian_phone: { type: String, default: null },
  skills: { type: [String], required: true }
});

module.exports = mongoose.model("Student", StudentSchema);
