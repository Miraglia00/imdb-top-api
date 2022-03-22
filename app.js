const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerConfig = require('./config/swagger');

const express = require("express");

const app = express();

require('dotenv').config();

require('./database/db');

const parser = require('body-parser');

const showsRoute = require('./routes/shows');
const userRoute = require('./routes/user');
const notFound = require('./middlewares/notFound');
const handleErrors = require('./middlewares/handleErrors');
const checkToken = require('./middlewares/checkToken');

const helmet = require('helmet');

app.use(parser.json());
app.use(helmet());
app.use('/user', checkToken, userRoute);
app.use('/shows', showsRoute);

app.get('/', async (req, res) => {
    res.json({
        "message": "This project can be found on GitHub: https://github.com/zsoltgombocz/imdb-top-api. Further documentation included in the README."
    });
});


app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerJsdoc(swaggerConfig), {swaggerOptions: {
        supportedSubmitMethods: ['get']
    }})
);

app.use(notFound);
app.use(handleErrors);
const port = process.env.PORT || 4444;
app.listen(port, () => console.log(`[SERVER]: Listening on port ${port}....`));