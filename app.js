
const express = require("express");

const app = express();

require('dotenv').config();

require('./database/db');


app.get('/', (req, res) => {
    res.json({message: "IMDb guesser backend. It will allow to scrape some information from IMDb to use it in front-end."});
});

app.get('/:id', (req, res) => {
    res.json(req.params.id);
});

app.listen(4444, () => console.log('[SERVER]: Listening on port 4444....'));