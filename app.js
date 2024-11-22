// Load environment variables
require('dotenv').config();

// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const Assignment = require('./models/Assignment'); // Import the Assignment model

// Initialize the app
const app = express();
const PORT = process.env.PORT || 3000;

// Debug: Log the MongoDB URI for confirmation
console.log('MongoDB URI:', process.env.MONGO_URI);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.set('view engine', 'ejs'); // Set EJS as the templating engine
app.set('views', './views'); // Path to the views folder

// Routes

// Homepage - Fetch all assignments
app.get('/', async (req, res) => {
    try {
      const assignments = await Assignment.find();
      res.render('index', { assignments, error: null });
    } catch (err) {
      console.error('Error fetching assignments:', err.message);
      res.render('index', { assignments: [], error: 'Failed to fetch assignments' });
    }
  });  

// Render form to add new assignment
app.get('/new', (req, res) => {
  res.render('new'); // Render the form for creating new assignments
});

// Add a new assignment
app.post('/new', async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    await Assignment.create({ title, description, dueDate }); // Create a new assignment
    res.redirect('/'); // Redirect to homepage after creation
  } catch (err) {
    console.error('Error creating assignment:', err);
    res.send('Error creating assignment');
  }
});

// Delete an assignment
app.post('/delete/:id', async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id); // Delete assignment by ID
    res.redirect('/'); // Redirect to homepage after deletion
  } catch (err) {
    console.error('Error deleting assignment:', err);
    res.send('Error deleting assignment');
  }
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
