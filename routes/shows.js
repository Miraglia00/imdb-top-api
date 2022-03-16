const express = require('express');
const router = express.Router();
const {getAllMovie} = require('../services/getAllMovie');
const {getAllTVShows} = require('../services/getAllTVShows');

router.get('/', async (req,res) => {
    let shuffle = (req.query.shuffle !== undefined && req.query.shuffle === '') ? true : (req.query.shuffle === 'true');
    let limit = req.query.limit;
    let limit_a = limit - Math.floor((Math.random() * (limit - 1) + 1));
    let limit_b = limit - limit_a;
    console.log(limit_a, limit_b);
    let movies = await getAllMovie(limit_a);
    let tvshows = await getAllTVShows(limit_b);
    let result = movies.concat(tvshows);

    res.json({
        count: result.length,
        data: (shuffle) ? result.sort(()=>Math.random() - 0.5) : result
    });
});

module.exports = router;