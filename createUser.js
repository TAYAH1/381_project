const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user'); // Ensure this path is correct

mongoose.connect('mongodb+srv://tommy:1234zzaa@cluster0.pwzu4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(async () => {
        const username = 'admin';  // Change this to your desired username
        const password = 'password'; // Change this to your desired password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        console.log('User created successfully');
        mongoose.connection.close();
    })
    .catch(err => console.error('MongoDB connection error:', err));
