const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// Add student with check
router.post("/add", async (req, res) => {
  try {
    const exists = await Student.findOne({ rollnumber: req.body.rollnumber });
    if (exists) return res.json({ success: false, msg: "Student already exists" });

    const s = await Student.create(req.body);
    res.json({ success: true, msg: "Student Added", student: s });
  } catch (e) {
    res.json({ success: false, msg: e.message });
  }
});

// Delete student with check
router.delete("/delete/:roll", async (req, res) => {
  const s = await Student.findOne({ rollnumber: req.params.roll });
  if (!s) return res.json({ success: false, msg: "Student not found" });

  await Student.deleteOne({ rollnumber: req.params.roll });
  res.json({ success: true, msg: "Student Deleted" });
});

// Update student with check
router.put("/update/:roll", async (req, res) => {
  const s = await Student.findOne({ rollnumber: req.params.roll });
  if (!s) return res.json({ success: false, msg: "Student not found" });

  await Student.updateOne({ rollnumber: req.params.roll }, { $set: { skills: req.body.skills } });
  res.json({ success: true, msg: "Updated Successfully" });
});

// Get student by roll
router.get("/student/:roll", async (req, res) => {
  const s = await Student.findOne({ rollnumber: req.params.roll });
  res.json(s);
});

// Search by skill (regex)
router.get("/skill/:pattern", async (req, res) => {
  const regex = new RegExp(req.params.pattern, "i");
  const students = await Student.find({ skills: { $regex: regex } });
  res.json(students);
});

/// Get students by roll number range
router.get("/range", async (req, res) => {
  const from = parseInt(req.query.from);
  const to = parseInt(req.query.to);

  console.log(from, to);

  try {
    const students = await Student.find({
      rollnumber: { $gte: from, $lte: to }
    });

    res.json(students); // return array
  } catch (err) {
    res.json([]);
  }
});

// All day scholars
router.get("/dayscholars", async (req, res) => {
  const students = await Student.find({ guardian_phone: null });
  res.json(students);
});

module.exports = router;
