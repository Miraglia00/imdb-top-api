const {getAllMovie} = require('../services/getAllMovie');
const {getAllTVShows} = require('../services/getAllTVShows');

exports.getShows = async (req, res) => {
    let shuffle = (req.query.shuffle !== undefined && req.query.shuffle === '') ? true : (req.query.shuffle === 'true');
    let limit = (typeof req.query.limit !== undefined && parseInt(req.query.limit, 10)) ? parseInt(req.query.limit, 10) : null;
    let movies = await getAllMovie();
    let tvshows = await getAllTVShows();

    let result = [...movies, ...tvshows];
    result = (shuffle) ? result.sort(()=>Math.random() - 0.5) : result;
    result = (limit !== null) ? result.slice(0, limit) : result;
    res.json({
        count: result.length,
        data: result
    });
}