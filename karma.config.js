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
  config.set({
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
      "karma-phantomjs-launcher"
    ],
    browsers: [ "PhantomJS" ],
    preprocessors: {
	  "test/test_index.js": ["webpack"],
      "app/**/*.js": ["webpack"]
    },
    logLevel: config.LOG_INFO,
    reporters: ["spec"],
    singleRun: false,
    phantomjsLauncher: {
      exitOnResourceError:true
    },
    webpack: webpackConfig,
    webpackMiddleware: { noInfo: true }
  });
};
