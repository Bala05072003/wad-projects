const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const Student = require('./models/Student');

const app = express();

// === CONFIG ===
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true })); // supports nested objects

// === MongoDB connect ===
// Replace <username>, <password>, <cluster>, <dbname> with your values or use localhost
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/skilldb';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connect error:', err));

// === ROUTES ===

// Home
app.get('/', (req, res) => {
  res.render('index');
});

// Add student (form)
app.get('/addStudent', (req, res) => {
  res.render('addStudent', { error: null });
});

// Create student (POST)
app.post('/addStudent', async (req, res) => {
  try {
    const { rollnumber, name, guardianPhone } = req.body;
    // skills may come as array or single value
    let skills = req.body.skills || [];
    if (!Array.isArray(skills)) skills = [skills];
    // If empty string removed
    skills = skills.filter(s => s && s.trim().length > 0);
    const student = new Student({
      rollnumber: rollnumber.trim(),
      name: name.trim(),
      guardianPhone: guardianPhone && guardianPhone.trim().length ? guardianPhone.trim() : null,
      skills
    });
    await student.save();
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.render('addStudent', { error: err.message });
  }
});

// Delete student (by roll number) - GET form & POST handler
app.get('/deleteStudent', (req, res) => {
  res.render('deleteStudent'); // create a simple view with a roll no input
});
app.post('/deleteStudent', async (req, res) => {
  const { rollnumber } = req.body;
  await Student.findOneAndDelete({ rollnumber: rollnumber.trim() });
  res.redirect('/');
});

// Update student (form)
app.get('/updateStudent', async (req, res) => {
  // show form to input roll no and view current info
  res.render('updateStudent', { student: null, message: null });
});

// fetch student by rollNo (post from updateStudent search)
app.post('/updateStudent/search', async (req, res) => {
  const { rollnumber } = req.body;
  const student = await Student.findOne({ rollnumber: rollnumber.trim() });
  res.render('updateStudent', { student, message: !student ? 'Student not found' : null });
});

// update POST
app.post('/updateStudent', async (req, res) => {
  const { rollnumber, name, guardianPhone } = req.body;
  let skills = req.body.skills || [];
  if (!Array.isArray(skills)) skills = [skills];
  skills = skills.filter(s => s && s.trim().length > 0);
  await Student.findOneAndUpdate(
    { rollnumber: rollnumber.trim() },
    { $set: { name: name.trim(), guardianPhone: guardianPhone && guardianPhone.trim() ? guardianPhone.trim() : null, skills } },
    { new: true }
  );
  res.redirect('/');
});

// Display student by rollNo (GET form + POST display)
app.get('/displayStudent', (req, res) => {
  res.render('displayStudent', { student: null, message: null });
});
app.post('/displayStudent', async (req, res) => {
  const { rollnumber } = req.body;
  const student = await Student.findOne({ rollnumber: rollnumber.trim() });
  res.render('displayStudent', { student, message: !student ? 'Not found' : null });
});

// Skill search page: form to enter pattern -> show list matched
app.get('/skillStudent', (req, res) => {
  res.render('skillStudent', { results: null, pattern: '' });
});
app.post('/skillStudent', async (req, res) => {
  const { pattern } = req.body;
  // server side: create case-insensitive regex to match skill array elements
  // We will find docs where any element matches regex
  try {
    const regex = new RegExp(pattern, 'i'); // pattern from user (used carefully)
    const students = await Student.find({ skills: { $elemMatch: { $regex: regex } } }).sort({ rollnumber: 1 });
    res.render('skillResults', { results: students, pattern });
  } catch (err) {
    res.render('skillStudent', { results: null, pattern, error: 'Invalid pattern' });
  }
});

// Display all day scholars (guardianPhone == null)
app.get('/displayAll', async (req, res) => {
  const students = await Student.find({ guardianPhone: null }).sort({ rollnumber: 1 });
  res.render('displayAll', { students });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
