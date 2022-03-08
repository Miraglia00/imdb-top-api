const db = require('../database/db');

const schema = require('../database/schemas/showSchema');
const movieModel = db.model('movies', schema);
const seriesModel = db.model('tvshows', schema);


(async () => {
    await movieModel.deleteMany({});
    await seriesModel.deleteMany({});
    console.log("Deleted everything!");
    process.exit(0);
})();



