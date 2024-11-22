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
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.set('view engine', 'ejs'); // Set EJS as the templating engine
app.set('views', './views'); // Path to the views folder

// Routes
// Render a welcome home page
app.get('/home', (req, res) => {
  res.render('home'); // Render a dedicated home page
});

// Homepage - Fetch all assignments with search and sorting
app.get('/', async (req, res) => {
  try {
    const searchQuery = req.query.search || ''; // Search query from the URL
    const sortBy = req.query.sortBy || 'dueDate'; // Sorting option, default to 'dueDate'

    // Fetch assignments based on the search query and sort them
    const assignments = await Assignment.find({
      $or: [
        { title: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive title match
        { description: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive description match
      ],
    }).sort({ [sortBy]: 1 }); // Sort by the specified field (ascending)

    // Render the index.ejs with assignments, error, search query, and sorting option
    res.render('index', { assignments, error: null, search: searchQuery, sortBy });
  } catch (err) {
    console.error('Error fetching assignments:', err.message);
    res.render('index', { assignments: [], error: 'Failed to fetch assignments', search: '', sortBy: null });
  }
});

// Render form to add a new assignment
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
    res.render('new', { error: 'Failed to create assignment' });
  }
});

// Render form to edit an assignment
app.get('/edit/:id', async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id); // Fetch the assignment by ID
    if (!assignment) {
      return res.status(404).send('Assignment not found');
    }
    res.render('edit', { assignment }); // Render the edit.ejs form
  } catch (err) {
    console.error('Error fetching assignment for edit:', err);
    res.status(500).send('Failed to fetch assignment');
  }
});

// Update an assignment
app.post('/edit/:id', async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    await Assignment.findByIdAndUpdate(req.params.id, { title, description, dueDate }); // Update assignment
    res.redirect('/'); // Redirect to homepage after update
  } catch (err) {
    console.error('Error updating assignment:', err);
    res.status(500).send('Failed to update assignment');
  }
});

// Delete an assignment
app.post('/delete/:id', async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id); // Delete assignment by ID
    res.redirect('/'); // Redirect to homepage after deletion
  } catch (err) {
    console.error('Error deleting assignment:', err);
    res.status(500).send('Failed to delete assignment');
  }
});

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
