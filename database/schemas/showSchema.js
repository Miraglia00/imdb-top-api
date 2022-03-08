const mongoose = require('mongoose');
const {Schema} = mongoose;

const validateId = (id) => {
    const regex = /^tt\d{7,9}$/;
    return regex.test(id);
};

const showSchema = new Schema({
    movie_id: {type: String, validate: [validateId, "Must be a valid IMDb id!"]},
    titles: {type: Map, of: String, default: null},
    short_plot: {type: String, default: null},
    genre: {type: String, default: null},
    origin: {type: String, default: null},
    released_year: {type: String, default: null},
    length: {type: String, default: null},
    directors: {type: String, default: null},
    stars: {type: String, default: null},
    imdb_score: {type: String, default: null},
}, {strict: true});

module.exports = showSchema;