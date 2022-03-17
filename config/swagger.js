require('dotenv/config');

module.exports = {
    definition: {
        openapi: "3.0.0",
        info: {
          title: "IMDb guesser API for a web based game.",
          version: "0.1.0",
          description:
            "This is a simple API that can be used to scrape info about IMDb's top shows, store it in a mongoDB database and serve back. " +
            "Also serves as a backend for web based mini game 'Guess the rating' (gtibub linkkkk).",
          license: {
            name: "MIT",
            url: "https://spdx.org/licenses/MIT.html",
          },
          contact: {
            name: "Gömböcz Zsolt",
            url: "-",
            email: "zsolt.gombocz00@gmail.com",
          },
        },
        servers: [
          {
            url: process.env.API_URL,
          },
        ],
      },
      apis: ["./routes/*.js"],
};