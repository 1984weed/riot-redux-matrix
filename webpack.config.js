const path = require('path')
const webpack = require('webpack');
const PORT = process.env.PORT || "8000"


module.exports = {
    entry: [
        './src/index.js'
    ],
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: "./",
        noInfo: true,
        inline: true,
        historyApiFallback: true,
        port: PORT,
        host: "localhost",
        devtool: "source-map"
    },
    plugins: [
        new webpack.ProvidePlugin({riot: 'riot'})
    ],
    module: {
        preLoaders: [
            {test: /\.tag$/, exclude: /node_modules/, loader: 'riotjs-loader', query: {type: 'none'}}
        ],
        loaders: [
            {
                test: /\.js$|\.tag$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'es2015-riot'],
                    plugins: ["transform-object-rest-spread"]
                }
            }
            // ,
            // {
            //   test: /\.tag$/,
            //   loader: 'tag',
            //   exclude: /node_modules/
            // }
        ]
    }
}
