const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: path.resolve('src'),
    entry: "./index.es6",
    output: {
        path: path.resolve('build'),
        filename: "bundle.js",
        publicPath: '/public/assets',
    },
    module: {
        loaders: [
            {
                test: /\.es6?$/,
                exclude: /node_modules/,
                loaders: ["babel-loader"]
            }, {
                test: /\.jsx?/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', '!css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]&sourceMap!sass?sourceMap')
            }, {
                test: /\.svg$/,
                loader: 'url?limit=65000&mimetype=image/svg+xml&name=public/fonts/[name].[ext]'
            },
            {
                test: /\.woff$/,
                loader: 'url?limit=65000&mimetype=application/font-woff&name=public/assets/fonts/[name].[ext]'
            },
            {
                test: /\.woff2$/,
                loader: 'url?limit=65000&mimetype=application/font-woff2&name=public/assets/fonts/[name].[ext]'
            },
            {
                test: /\.[ot]tf$/,
                loader: 'url?limit=65000&mimetype=application/octet-stream&name=public/assets/fonts/[name].[ext]'
            },
            {
                test: /\.eot$/,
                loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject&name=public/assets/fonts/[name].[ext]'
            }]
    },
    plugins: [
        new ExtractTextPlugin("styles.css")
    ],
    watch: false,
    resolve: {
        extensions: ['', '.js', '.jsx', '.json', '.es6', '.scss']
    },
};


// loader: ExtractTextPlugin.extract({
//     fallbackLoader: 'style-loader',
//     loader: 'style!css?modules&localIdentName=[local]___[hash:base64:5]!resolve-url!sass?outputStyle=expanded&sourceMap'
// }),