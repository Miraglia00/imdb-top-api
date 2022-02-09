const req = require('express/lib/request');
const mongoose = require('mongoose');

require('dotenv/config');

try{
    mongoose.connect(process.env.DB_LINK, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: false
    });
}catch(err) {
    console.log('[DB]: ' + err);
    process.exit(0);
}

const db = mongoose.connection;

db.on("error", (err) => {
    console.log('[DB]: ' + err);
    process.exit(0);
});

db.once("open", () => {
    console.log("[DB]: Connected!");
});

module.exports = mongoose;