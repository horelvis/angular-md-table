var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebPackAngularTranslate = require("webpack-angular-translate");
var postcss = require('postcss-loader');
var autoprefixer = require('autoprefixer');
var ENV = process.env.NODE_ENV;

var metadata = {
    title: 'Title',
    baseUrl: '/',
    host: 'localhost',
    port: 3000,
    ENV: ENV
};

var config = {
    metadata: metadata,
    debug: true,
    devtool: 'eval',
    context: path.join(__dirname, 'src'),
    output: {
        path: path.join(__dirname, 'src'),
        filename: 'bundle.js',
        sourceMapFilename: '[name].map'
    },
    entry: './index.js',
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(true),
        new WebPackAngularTranslate.Plugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: false
        }),
        new webpack.DefinePlugin({
            MODE: {
                production: process.env.NODE_ENV === 'production',
                dev: process.env.NODE_ENV === 'development',
                ON_MDTABLE_TEST: process.env.NODE_ENV === 'test',
            }
        })
    ],
    module: {
        loaders: [{
            test: /\.scss$/,
            loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
        }, {
            test: /\.css$/,
            loaders: ['style-loader', 'css-loader', 'postcss-loader']
        }, {
            test: /\.js$/,
            loaders: ['ng-annotate', 'babel?presets[]=es2015,plugins[]=transform-runtime'],
            exclude: /node_modules|bower_components/
        }, {
            test: /\.(woff|woff2|ttf|eot|svg|jpg|png)(\?]?.*)?$/,
            loader: 'file-loader?name=res/[path][name].[ext]?[hash]'
        }, {
            test: /\.html$/,
            loader: 'html?removeEmptyAttributes=false&collapseWhitespace=false'
        }, {
            test: /\.json$/,
            loader: 'json'
        }],
        postLoaders: [{
            test: /\.js$/,
            exclude: /node_modules|bower_components/,
            loader: 'istanbul-instrumenter'
        }]
    },
    postcss: function() {
        return [autoprefixer];
    },
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        port: metadata.port,
        host: metadata.host,
        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    }
};

// Modify the production path to dist folder
if (process.env.NODE_ENV === 'production') {
    config.output.path = path.join(__dirname, 'dist');
    config.plugins.push(new webpack.optimize.DedupePlugin());
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        output: {
            comments: false
        }
    }));
    config.devtool = 'source-map';
}

if (process.env.NODE_ENV === 'development') {

}

module.exports = config;
