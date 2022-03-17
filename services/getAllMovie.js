const schema = require('../database/schemas/showSchema');
const db = require('../database/db');
const movieModel = db.model('movies', schema);

async function getAllMovie() {
    let returnData = await movieModel.find(null);
    return returnData;
}

module.exports = {
    getAllMovie
}