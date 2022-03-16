const schema = require('../database/schemas/showSchema');
const db = require('../database/db');
const movieModel = db.model('movies', schema);

async function getAllMovie() {
    let data = await movieModel.find({});

    return data;
}

module.exports = {
    getAllMovie
}