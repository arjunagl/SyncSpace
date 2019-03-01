const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const envSettings = require('./config/dev.config');

module.exports = {
    context: path.resolve('src'),
    entry: './index.jsx',
    output: {
        path: path.resolve('build'),
        filename: 'bundle.js',
        publicPath: '/public/assets',
    },
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        historyApiFallback: {
            index: 'index.html'
        },
    },
    module: {
        rules: [{
            test: [/\.es6?$/, /\.jsx?/],
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react', 'stage-2']
            }
        },
        {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                use: [{
                    loader: 'css-loader?modules&localIdentName=[local]___[hash:base64:6]&sourceMap'
                }, {
                    loader: 'sass-loader?sourceMap'
                }]

            })
        }, {
            test: /\.svg$/,
            loader: 'url-loader',
            options: {
                limit: 65000,
                mimetype: 'image/svg+xml',
                name: 'public/fonts/[name].[ext]'
            }
        },
        {
            test: /\.woff$/,
            loader: 'url-loader',
            options: {
                limit: 65000,
                mimetype: 'application/font-woff',
                name: 'public/fonts/[name].[ext]'
            }
        },
        {
            test: /\.woff2$/,
            loader: 'url-loader',
            options: {
                limit: 65000,
                mimetype: 'application/font-woff2',
                name: 'public/fonts/[name].[ext]'
            }
        },
        {
            test: /\.[ot]tf$/,
            loader: 'url-loader',
            options: {
                limit: 65000,
                mimetype: 'application/octet-stream',
                name: 'public/fonts/[name].[ext]'
            }
        },
        {
            test: /\.eot$/,
            loader: 'url-loader',
            options: {
                limit: 65000,
                mimetype: 'application/vnd.ms-fontobject',
                name: 'public/fonts/[name].[ext]'
            }
        }
        ]
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),
        new webpack.DefinePlugin({
            'process.env': envSettings
        })
    ],
    watch: false,
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.es6', '.scss']
    }
};
