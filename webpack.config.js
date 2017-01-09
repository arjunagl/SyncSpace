var path = require('path');

module.exports = {
    context: path.resolve('app'),
    entry: "./app.es6",
    output: {
        path: path.resolve('build'),
        filename: "bundle.js",
        publicPath: '/public/assets',
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.es6?$/,
                exclude: /node_modules/,
                loaders: ["babel-loader"]
            },
            {
                test: /\.(svg|woff|woff2|png|jpg|ttf|eot)$/,
                exclude: /node_modules/,
                loader: 'url-loader?limit=10000'
            }
        ]
    },
    watch: false,
    resolve: {
        extensions: ['', '.js', '.jsx', '.json', '.es6', '.scss']
    },
};