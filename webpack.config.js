const path = require('path')
const webpack = require('webpack');
const PORT = process.env.PORT || "8000"
const dist = 'dist'
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: [
        './src/index.js'
    ],
    output: {
        path: path.join(__dirname, "dist"),
        filename: 'bundle.[chunkhash].js'
    },
    devServer: {
        contentBase: "./dist",
        noInfo: true,
        inline: true,
        historyApiFallback: true,
        port: PORT,
        host: "localhost",
        devtool: "source-map"
    },
    plugins: [
        new webpack.ProvidePlugin({riot: 'riot'}),
        new HtmlWebpackPlugin({
            template: './src/template.html'
        })
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
        ]
    }
}
