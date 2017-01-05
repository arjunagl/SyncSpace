module.exports = {
    entry: "./app.es6",
    output: {
        path: __dirname,
        filename: "bundle.js"
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
            }
        ]
    },
    watch: true,
    inline: true,
    resolve: {
        extensions: ['', '.js', '.jsx', '.json', '.es6']
    },
};