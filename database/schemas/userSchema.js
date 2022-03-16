const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    username: {
        type: String, 
        min: [5, 'Minimum character for the username must be at least 5!'], 
        min: [15, 'Maximum character for the username is 15!'], 
        required: [true, 'This field is required! (username)']
    },
    password: {
        type: String, 
        required: [true, 'This field is required! (password)']
    },
    scores: {
        type: Array,
        default: []
    }
}, {strict: true});

module.exports = userSchema;