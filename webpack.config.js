const path = require('path');

module.exports = {
    mode: 'production',
    watch: true,
    entry: {
        index: "./dist/build/controllers/index.controller.js",
        condensed: "./dist/build/controllers/condensed.controller.js",
        scores: "./dist/build/controllers/scores.controller.js",
        game: "./dist/build/controllers/game.controller.js",
        standings: "./dist/build/controllers/standings.controller.js",
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name]-bundle.js"
    }
};
