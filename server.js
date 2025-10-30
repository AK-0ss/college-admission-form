const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Data file path
const dataFile = path.join(__dirname, 'submissions.json');

// Initialize data file if it doesn't exist
if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, JSON.stringify({ students: [], admins: [{ username: 'admin', password: 'admin123' }] }, null, 2));
}

// Helper function to read data
function readData() {
  const data = fs.readFileSync(dataFile, 'utf8');
  return JSON.parse(data);
}

// Helper function to write data
function writeData(data) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Submit admission form
app.post('/api/submit', (req, res) => {
  try {
    const data = readData();
    const newStudent = {
      id: Date.now().toString(),
      ...req.body,
      submittedAt: new Date().toISOString()
    };
    data.students.push(newStudent);
    writeData(data);
    res.json({ success: true, message: 'Application submitted successfully!', id: newStudent.id });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error submitting application' });
  }
});

// Admin login
app.post('/api/admin/login', (req, res) => {
  try {
    const { username, password } = req.body;
    const data = readData();
    const admin = data.admins.find(a => a.username === username && a.password === password);
    if (admin) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error logging in' });
  }
});

// Get all students
app.get('/api/students', (req, res) => {
  try {
    const data = readData();
    res.json({ success: true, students: data.students });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching students' });
  }
});

// Update student
app.put('/api/students/:id', (req, res) => {
  try {
    const data = readData();
    const index = data.students.findIndex(s => s.id === req.params.id);
    if (index !== -1) {
      data.students[index] = { ...data.students[index], ...req.body, id: req.params.id };
      writeData(data);
      res.json({ success: true, message: 'Student updated successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating student' });
  }
});

// Delete student
app.delete('/api/students/:id', (req, res) => {
  try {
    const data = readData();
    data.students = data.students.filter(s => s.id !== req.params.id);
    writeData(data);
    res.json({ success: true, message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting student' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Access the application at http://localhost:${PORT}`);
});
