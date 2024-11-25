const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const User = require('./models/user');
const Student = require('./models/student');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'Secretkey', // Replace with your actual secret
    resave: false,
    saveUninitialized: true,
}));

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Redirect root to login
app.get('/', (req, res) => {
    res.redirect('/login'); // Redirect to the login page
});

// Authentication Middleware
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.userId) {
        return next();
    }
    res.redirect('/login');
};


// Database connection
const mongoURI = 'mongodb+srv://tommy:1234zzaa@cluster0.pwzu4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Your MongoDB URI

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.error('Connection failed:', err));

// Routes

app.get('/login', (req, res) => res.render('login'));

app.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.redirect('/login'); // User not found
        }

        if (await bcrypt.compare(req.body.password, user.password)) {
            req.session.userId = user._id; // Store user ID in session
            return res.redirect('/layout');
        }
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.redirect('/login');
    }
});

// Route to show logout confirmation
app.get('/logout', (req, res) => {
    res.render('logout'); // Render the logout confirmation page
});

// Handle the actual logout process when the form is submitted
app.get('/logout/confirm', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/layout'); // Redirect to layout if there's an error
        }
        res.redirect('/login'); // Redirect to login page after successful logout
    });
});

// Route to show students
app.get('/layout', isAuthenticated, async (req, res) => {
    try {
        const students = await Student.find(); // Fetch students from the database
        res.render('layout', { students }); // Pass the students data to the EJS template
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).send('Error fetching students');
    }
});

// API to Create Student
app.post('/api/students/create', isAuthenticated, async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        console.error(error);
        res.status(400).send('Error creating student');
    }
});

// API to Read Students with filtering
app.get('/api/students', isAuthenticated, async (req, res) => {
    const { search } = req.query; // Get search query from request
    try {
        const query = search ? { name: { $regex: search, $options: 'i' } } : {}; // Filter by name if search is provided
        const students = await Student.find(query);
        res.json(students);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching students');
    }
});

// API to Update Student
app.put('/api/students/update/:id', isAuthenticated, async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedStudent) {
            return res.status(404).send('Student not found');
        }
        res.json(updatedStudent);
    } catch (error) {
        console.error(error);
        res.status(400).send('Error updating student: ' + error.message);
    }
});

// API to Delete Student
app.delete('/api/students/delete/:id', isAuthenticated, async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(404).send('Student not found');
        }
        res.status(204).send(); // No content
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting student: ' + error.message);
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Something broke!');
});

// Start server
const PORT = 8099; // You can change this to your preferred port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
