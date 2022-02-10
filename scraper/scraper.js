const cheerio = require('cheerio');
const axios = require('axios');

const movieTopURL = 'https://www.imdb.com/chart/top';
const tvshowTopURL = 'https://www.imdb.com/chart/toptv';

require('../database/db');

const movieModel = require('../database/models/Movie');

async function scrapeMovies(url) {
    console.log("Started movie scraping...");
    return promise = new Promise(async (resolve, reject) => {

        const {data} = await axios.get(url, {
            headers: {
                'accept-language': 'en-GB',
            }
        });
    
        const $ = cheerio.load(data);
        const chartTable = $('.chart');

        let saveCount = 0;
    
        chartTable.find('.titleColumn a').each(async (i, e) => {
    
            const scrapedMovieId = $(e).attr('href').split('/')[2];
            const exists = await movieModel.exists({movie_id: scrapedMovieId});

            if(!exists) {
                const movie = new movieModel({
                    movie_id: scrapedMovieId,
                });
                
                await movie.save();
            }

            saveCount++;
            if(saveCount == 250) {
                resolve("All movie saved!");
            }
        });
        
    });
}

async function scrapeTVShows(url) {
    console.log("Started tv shows scraping...");
    return promise = new Promise(async (resolve, reject) => {

        const {data} = await axios.get(url, {
            headers: {
                'accept-language': 'en-GB',
            }
        });
    
        const $ = cheerio.load(data);
        const chartTable = $('.chart');

        let saveCount = 0;
    
        chartTable.find('.titleColumn a').each(async (i, e) => {
    
            const scrapedMovieId = $(e).attr('href').split('/')[2];
            const exists = await movieModel.exists({movie_id: scrapedMovieId});

            if(!exists) {
                const movie = new movieModel({
                    movie_id: scrapedMovieId,
                });
                
                await movie.save();
            }
            
            saveCount++;
            if(saveCount == 250) {
                resolve("All tv shows saved!");
            }
        });
        
    });
}

try {
    scrapeMovies(movieTopURL).then(res => {
        console.log(res);
    });
    scrapeTVShows(tvshowTopURL).then(res => {
        console.log(res);
        process.exit(0);
    });
} catch (error) {
    console.log(error);
}
