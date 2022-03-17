/**
 * @swagger
 * components:
 *  schemas:
 *   Show:
 *      type: object
 *      required:
 *       - movie_id
 *      properties:
 *       movie_id:
 *        type: integer
 *        description: IMDb id of the show.
 *       titles:
 *        type: orderedMap
 *        description: Holds the titles of the show in different langueges.
 *       short_plot:
 *        type: string
 *        description: Short plot of the movie.
 *       genre:
 *        type: string
 *        description: String of the genre of the show.
 *       origin:
 *        type: string
 *        description: Country of origin, places where the show recorded.
 *       released_year:
 *        type: string
 *        description: First appearance date.
 *       length:
 *        type: string
 *        description: Length of the movie or a episode.
 *       directors:
 *        type: string
 *        description: Directors of the show.
 *       stars:
 *        type: string
 *        description: Start or voice actors in the show.
 *       imdb_score:
 *        type: string
 *        desciption: Official score of the show from IMDb.
 *      example:
 *       movie_id: tt0111161
 *       titles:
 *        hu-HU: A remény rabjai
 *        en-US: The Shawshank Redemption
 *       short_plot: Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.
 *       genre: drama
 *       origin: United States
 *       released_year: 1994
 *       length: 142 min
 *       directors: Frank Darabont
 *       stars: Tim Robbins, Morgan Freeman, Bob Gunton
 *       imdb_score: 9.3       
 */

const express = require('express');
const router = express.Router();
const {getAllMovie} = require('../services/getAllMovie');
const {getAllTVShows} = require('../services/getAllTVShows');

router.get('/', async (req,res) => {
    let shuffle = (req.query.shuffle !== undefined && req.query.shuffle === '') ? true : (req.query.shuffle === 'true');
    let limit = req.query.limit;
    let limit_a = limit - Math.floor((Math.random() * (limit - 1) + 1));
    let limit_b = limit - limit_a;

    let movies = await getAllMovie(limit_a);
    let tvshows = await getAllTVShows(limit_b);
    let result = movies.concat(tvshows);

    res.json({
        count: result.length,
        data: (shuffle) ? result.sort(()=>Math.random() - 0.5) : result
    });
});

module.exports = router;