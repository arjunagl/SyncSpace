const path = require('path');
var combineLoaders = require('webpack-combine-loaders');

module.exports = {
    context: path.resolve('src'),
    entry: "./index.es6",
    output: {
        path: path.resolve('build'),
        filename: "bundle.js",
        publicPath: '/public/assets',
    },
    module: {
        loaders: [{
            test: /\.scss$/,
            loader: 'style!css?modules&sourceMap&localIdentName=[local]___[hash:base64:5]!resolve-url!sass?outputStyle=expanded&sourceMap'
        }, {
            test: /\.es6?$/,
            exclude: /node_modules/,
            loaders: ["babel-loader"]
        }, {
            test: /\.(svg|woff|woff2|png|jpg|ttf|eot)$/,
            exclude: /node_modules/,
            loader: 'url-loader?limit=10000'
        }, {
            test: /\.jsx?/,
            exclude: /node_modules/,
            loader: 'babel'
        }]
    },
    watch: false,
    resolve: {
        extensions: ['', '.js', '.jsx', '.json', '.es6', '.scss']
    },
};


// {
//     test: /\.scss$/,
//         loaders: ["style-loader", "css-loader", "sass-loader"]
// }