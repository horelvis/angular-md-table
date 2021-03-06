var path = require('path');
var webpackConfig = require('./webpack.config');
var entry = path.resolve(webpackConfig.context, webpackConfig.entry);
var preprocessors = {};
preprocessors[entry] = ['webpack'];

module.exports = function(config) {
    config.set({

        browserNoActivityTimeout: 500000,

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            './node_modules/phantomjs-polyfill/bind-polyfill.js',
            './node_modules/babel-polyfill/dist/polyfill.js',
            entry
        ],
        webpack: webpackConfig,

        // list of files to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: preprocessors,

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['coverage', 'spec'],
        coverageReporter: {
            type: 'lcov',
            dir: path.join(__dirname, 'coverage')
        },

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_WARN,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: process.env.NODE_ENV === 'test' ? true : false,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],
        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: process.env.NODE_ENV === 'test' ? false : true,
        plugins: [
            require('karma-phantomjs-launcher'),
            require('karma-jasmine'),
            require('karma-webpack'),
            'karma-coverage',
            'karma-spec-reporter'
        ]
    })
};
