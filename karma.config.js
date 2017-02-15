var webpack = require("karma-webpack");
var webpackConfig = require("./webpack.config");
var path = require("path");

const PROJECT_ROOT = path.resolve(__dirname);

webpackConfig.module.loaders.push(
  {
	test: /\.js$/,
	include: path.join(PROJECT_ROOT, "test"),
	exclude: /(node_modules|bower_components)/,
	loader: "babel-loader",
	query: {
		presets:["react"]
	}
  })

webpackConfig.resolve.alias["fakes"] = path.join(PROJECT_ROOT, "test", "fakes");
module.exports = function (config) {
  "use strict";

  var files = (process.env.npm_config_single_file) ? 
				process.env.npm_config_single_file : 'tests/test_index.js';

  var fileWatch = (process.env.npm_config_auto_watch) ?
				process.env.npm_config_auto_watch : false;

  var singleRun = !fileWatch;

  var options = {
    frameworks: [ "jasmine" ],
    files: [
      "bower_components/jquery/dist/jquery.js",
      "bower_components/jasmine-jquery/lib/jasmine-jquery.js",
	  "test/test_index.js"
    ],
    plugins: [
      webpack,
     	"karma-spec-reporter",
      	"karma-jasmine",
      	"karma-phantomjs2-launcher"
    ],
    browsers: [ "PhantomJS2" ],
    preprocessors: {
	"test/test_index.js": ["webpack"],
      	"app/**/*.js": ["webpack"]
    },
    logLevel: config.LOG_INFO,
    reporters: ["spec"],
    singleRun: false,
    webpack: webpackConfig,
    webpackMiddleware: { noInfo: true }
  };

  options.files = [
	patterns: files, watched: filewatch
  ];

  options.preprocessors[files] = ['webpack'];

  config.set(options);
};
