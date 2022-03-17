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
 *        description: Official score of the show from IMDb.
 *       type:
 *        type: string
 *        description: Type of the show. Pre-defined enum values [movie,tvshow].      
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
 *       type: movie   
 */

/**
 * @swagger
 *  tags:
 *   name: Shows
 *   description: API endpoint to get stored shows.
 */
const express = require('express');
const router = express.Router();
const showsController = require('../controllers/showsController');
/**
* @swagger
*   /shows:
*    get:
*     summary: Gets the data from the database based on the query parameters. Default - ALL
*     tags: [Shows]
*     parameters:
*      - in: query
*        name: limit
*        schema:
*         type: integer
*        description: Amount of the requested data.
*      - in: query
*        name: shuffle
*        schema:
*         type: boolean
*        description: Order by database or shuffle up.         
*     requestBody:
*      required: false
*     responses:
*      "200":
*       description: Data served.
*       content:
*        application/json:
*         schema:
*          $ref: '#/components/schemas/Show'  
 */
router.get('/', showsController.getShows);

module.exports = router;