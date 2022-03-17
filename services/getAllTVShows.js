const schema = require('../database/schemas/showSchema');
const db = require('../database/db');
const tvShowsModel = db.model('tvshows', schema);

async function getAllTVShows(limit=null) {
    limit = (typeof limit === 'number') ? limit : null;
    let returnData = [];
    if(limit > 1 || limit === null) {
        returnData = await tvShowsModel.find({}).limit(limit);
    }else if(limit === 1){
        returnData = await tvShowsModel.find(null);
        returnData = returnData[Math.floor(Math.random() * 250)];
    }
    
    return returnData;
}

module.exports = {
    getAllTVShows
}