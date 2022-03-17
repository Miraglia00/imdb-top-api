const cheerio = require('cheerio');
const axios = require('axios');

const showSchema = require('../database/schemas/showSchema');

const movieTopURL = 'https://www.imdb.com/chart/top';
const tvShowsTopRUL = 'https://www.imdb.com/chart/toptv';

const preHeader = {
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'accept-encoding': 'gzip, deflate, br',
    'cache-control': 'no-cache',
    'pragma': 'no-cache',
    'sec-ch-ua': 'Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': 'Windows',
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-user': '?1',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36'
}

const db = require('../database/db');

const movieModel = db.model('movies', showSchema);
const tvshowModel = db.model('tvshows', showSchema);

async function scrapeMovies(url) {
    let emptyMovies = await getEmptyObjectsFromURL(url);
    
    let savedMovies = [];

    await asyncForEach(emptyMovies, async (movie, i) => {
        try{
            let movieObj = await getAdditionalData(movie);
            movieObj['type'] = 'movie';
            if(movieObj !== false) {
                let movie = new movieModel(movieObj);
    
                let savedMovie = await movie.save();
                savedMovies.push(savedMovie);
            }
        }catch(error) {
            console.error(error);
            console.log(`Skipping movie ${movie.movie_id} due to an error. Error: ${error}`);
        }
        
    });
    return savedMovies;
}

async function scrapeTVSeries(url) {
    let emptyTVSeries = await getEmptyObjectsFromURL(url);
    
    let savedSeries = [];

    await asyncForEach(emptyTVSeries, async (serial, i) => {
        try{
            let serialObj = await getAdditionalData(serial);
            serialObj['type'] = 'tvshow';
            if(serialObj !== false) {
                let serial = new tvshowModel(serialObj);
                
                let savedSerial = await serial.save();
                savedSeries.push(savedSerial);
            }
        }catch(error) {
            console.error(error);
            console.log(`Skipping serial ${serial.movie_id} due to an error. Error: ${error}`);
        }
        
    });
    return savedSeries;
}

async function getAdditionalData(dataObj) {
    try {
        let request = await axios.get(`http://omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${dataObj.movie_id}`);

        let data = request.data;

        Object.assign(dataObj.titles, {'en-US': data['Title']});
        dataObj.short_plot = (data['Plot'] === "N/A") ? null : data['Plot'];
        dataObj.genre = (data['Genre'] === "N/A") ? null : data['Genre'];
        dataObj.origin = (data['Country'] === "N/A") ? null : data['Country'];
        dataObj.released_year = (data['Released'] === "N/A") ? data['Year'] : data['Released'].match(/([0-9]{4,4})/g)[0];
        dataObj.length = (data['Runtime'] === "N/A") ? null : data['Runtime'];
        dataObj.directors = (data['Director'] === "N/A") ? null : data['Director'];
        dataObj.stars = (data['Actors'] === "N/A") ? null : data['Actors'];
        dataObj.imdb_score = data['imdbRating'];
    
        return dataObj;
    }catch(error) {
        console.error(error);
        process.exit(1);
    } 
}

const getEmptyObjectsFromURL = async (url) => {
    let scrapedDataObjects = [];

    const {data} = await axios.get(url, {
        headers: {
            ...preHeader,
            'accept-language': 'hu-HU',
        }
    });

    const $ = cheerio.load(data);
    const chartTable = $('.chart');

    chartTable.find('.titleColumn a').each((i,e) => {
        const scrapedID = $(e).attr('href').split('/')[2];
        const hunTitle = $(e).text();
        let data = {
            titles: {},
            short_plot: null,
            genre: null,
            origin: null,
            released_year: null,
            length: null,
            directors: null,
            stars: null,
            imdb_score: null,
            movie_id: scrapedID
        };
        Object.assign(data.titles, {'hu-HU': hunTitle})
        scrapedDataObjects.push(data);
    });

    return scrapedDataObjects;
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

(async () => {
    console.log('Started scraping, once it is finished a message will appear in the console. Takes about 5-10 minutes...');
    let savedMovies = await scrapeMovies(movieTopURL);
    let savedSeries = await scrapeTVSeries(tvShowsTopRUL);

    console.log(`Scraped ${savedMovies.length + savedSeries.length} IMDb data, and saved to the database! Now terminating process...`);
    db.connection.close();
    process.exit(0);
})();