const schema = require('../database/schemas/showSchema');
const db = require('../database/db');
const tvShowsModel = db.model('tvshows', schema);

async function getAllTVShows() {
    let returnData = await tvShowsModel.find(null);
    return returnData;
}

module.exports = {
    getAllTVShows
}