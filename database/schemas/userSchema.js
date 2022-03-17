const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    username: {
        type: String, 
        minlength: [5, 'Minimum character for the username must be at least 5!'], 
        maxlength: [15, 'Maximum character for the username is 15!'], 
        required: [true, 'This field is required! (username)']
    },
    password: {
        type: String, 
        required: [true, 'This field is required! (password)']
    }
}, {strict: true});

module.exports = userSchema;