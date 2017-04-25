const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: path.resolve('src'),
    entry: './index.jsx',
    output: {
        path: path.resolve('build'),
        filename: 'bundle.js',
        publicPath: '/public/assets',
    },
    devServer: {
        historyApiFallback: {
            index: 'index.html'
        },
    },
    module: {
        loaders: [{
                test: [/\.es6?$/, /\.jsx?/],
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react', 'stage-2']
                }
            },
            {
                test: /\.scss$/,
                // eslint-disable-next-line max-len
                loader: ExtractTextPlugin.extract('style', '!css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]&sourceMap!sass?sourceMap')
            }, {
                test: /\.svg$/,
                loader: 'url?limit=65000&mimetype=image/svg+xml&name=public/fonts/[name].[ext]'
            },
            {
                test: /\.woff$/,
                // eslint-disable-next-line max-len
                loader: 'url?limit=65000&mimetype=application/font-woff&name=public/assets/fonts/[name].[ext]'
            },
            {
                test: /\.woff2$/,
                // eslint-disable-next-line max-len
                loader: 'url?limit=65000&mimetype=application/font-woff2&name=public/assets/fonts/[name].[ext]'
            },
            {
                test: /\.[ot]tf$/,
                // eslint-disable-next-line max-len
                loader: 'url?limit=65000&mimetype=application/octet-stream&name=public/assets/fonts/[name].[ext]'
            },
            {
                test: /\.eot$/,
                // eslint-disable-next-line max-len
                loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject&name=public/assets/fonts/[name].[ext]'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('styles.css')
    ],
    watch: false,
    resolve: {
        extensions: ['', '.js', '.jsx', '.json', '.es6', '.scss']
    },
};
