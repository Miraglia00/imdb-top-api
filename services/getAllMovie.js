const schema = require('../database/schemas/showSchema');
const db = require('../database/db');
const movieModel = db.model('movies', schema);

async function getAllMovie(limit=null) {
    limit = (typeof limit === 'number') ? limit : null;
    let returnData = [];
    if(limit > 1 || limit === null) {
        returnData = await movieModel.find({}).limit(limit);
    }else if(limit === 1){
        returnData = await movieModel.find(null);
        returnData = returnData[Math.floor(Math.random() * 250)];
    }
    
    return returnData;
}

module.exports = {
    getAllMovie
}