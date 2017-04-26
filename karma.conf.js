// Karma configuration
// Generated on Tue Apr 04 2017 08:42:27 GMT+0300 (Jerusalem Daylight Time)

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['qunit'],


        // list of files / patterns to load in the browser
        files: [
            'game/scripts/player.js',
            'game/scripts/game.js',
            'https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js',
            'game/scripts/app.js',
            'test/*js'
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {},


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ["spec"],
        
        specReporter: {
            maxLogLines: 5, // limit number of lines logged per test 
            suppressErrorSummary: true, // do not print error summary 
            suppressFailed: false, // do not print information about failed tests 
            suppressPassed: false, // do not print information about passed tests 
            suppressSkipped: true, // do not print information about skipped tests 
            showSpecTiming: false, // print the time elapsed for each spec 
            failFast: true // test would finish with error when a first fail occurs.  
        },
        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}