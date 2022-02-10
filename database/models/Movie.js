const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const validateId = (id) => {
    const regex = /^tt\d{7,8}$/;
    return regex.test(id);
};

const MovieSchema = new Schema({
    movie_id: {type: String, validate: [validateId, "Must be a valid IMDb id!"]}
}, {strict: false});

module.exports = model('Movie', MovieSchema);