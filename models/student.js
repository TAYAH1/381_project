const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    studentId: { 
        type: Number, 
        required: true, 
        unique: true, 
        validate: {
            validator: function(v) {
                return /^\d{8}$/.test(v); // Checks if the number has exactly 8 digits
            },
            message: props => `${props.value} is not a valid 8-digit student ID!`
        }
    },
    course: { type: String, required: true },
});

module.exports = mongoose.model('Student', studentSchema);
