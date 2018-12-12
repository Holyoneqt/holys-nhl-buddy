const path = require('path');

module.exports = {
    mode: 'development',
    watch: true,
    entry: {
        index: "./dist/build/controllers/index.controller.js",
        game: "./dist/build/controllers/game.controller.js"
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name]-bundle.js"
    }
};
