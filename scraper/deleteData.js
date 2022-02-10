require('../database/db');

const movieModel = require('../database/models/Movie');


(async () => {
    await movieModel.deleteMany({});
    console.log("Deleted everything!");
    process.exit(0);
})();



