const {getAllMovie} = require('../services/getAllMovie');
const {getAllTVShows} = require('../services/getAllTVShows');

exports.getShows = async (req, res) => {
    let shuffle = (req.query.shuffle !== undefined && req.query.shuffle === '') ? true : (req.query.shuffle === 'true');
    let limit = req.query.limit;
    let limit_a = limit - Math.round((Math.random() * (limit - 1) + 1));
    let limit_b = limit - limit_a;

    let movies = await getAllMovie(limit_a);
    let tvshows = await getAllTVShows(limit_b);

    let result = [];
    result.push(movies);
    result.push(tvshows);

    res.json({
        count: result.length,
        data: (shuffle) ? result.sort(()=>Math.random() - 0.5) : result
    });
}