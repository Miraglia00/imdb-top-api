const schema = require('../database/schemas/showSchema');
const db = require('../database/db');
const tvShowsModel = db.model('tvshows', schema);

async function getAllTVShows(limit=null) {
    limit = (typeof limit === 'number') ? limit : null;
    let data = await tvShowsModel.find({}).limit(limit);

    return data;
}

module.exports = {
    getAllTVShows
}