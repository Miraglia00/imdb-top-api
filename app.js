const express = require("express");

const app = express();

require('dotenv').config();

require('./database/db');

const parser = require('body-parser');

const {getAllMovie} = require('./services/getAllMovie');

const showsRoute = require('./routes/shows');
const userRoute = require('./routes/user');
const notFound = require('./middlewares/notFound');
const handleErrors = require('./middlewares/handleErrors');

app.use(parser.json());

app.use('/user', userRoute);
app.use('/shows', showsRoute);

app.get('/', async (req, res) => {
    res.json({
        "message": "This project can be found on GitHub: https://github.com/zsoltgombocz/imdb-top-api. Further documentation included in the README."
    });
});

app.use(notFound);
app.use(handleErrors);

app.listen(4444, () => console.log('[SERVER]: Listening on port 4444....'));