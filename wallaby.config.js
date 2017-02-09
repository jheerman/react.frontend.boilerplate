var webpackConfig = require("./webpack.config");
var wallabyWebpack = require('wallaby-webpack');
var path = require("path");
var webpack = require("webpack");

const PROJECT_ROOT = path.resolve(__dirname);

module.exports = function (wallaby) {

  var webpackPostprocessor = wallabyWebpack({
    devtool: "source-map",
    module: {
      loaders: [
        {
          test: /\.html$/,
          include: path.join(wallaby.projectCacheDir, "app"),
          loader: "mustache"
        },
        {
          test: /\.ejs$/,
          loader: "ejs-compiled"
        },
      ]
    },
    plugins: [
      new webpack.ResolverPlugin(
        new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
      )
    ],
    resolve: {
      alias: {
        "fakes": path.join(wallaby.projectCacheDir, "test", "fakes"),
        "project_name": path.join(wallaby.projectCacheDir, "app", "scripts", "project_name")
      },
      modulesDirectories: [path.join(PROJECT_ROOT, "node_modules"), path.join(PROJECT_ROOT, "bower_components")],
      root: [
        path.join(wallaby.projectCacheDir, 'app', "scripts")
      ]

    }
  });

  return {
    files: [
      "bower_components/jquery/dist/jquery.js",
      {pattern: "app/scripts/project_name/**/*.ejs", load: false},
      {pattern: "app/scripts/project_name/**/*.html", load: false},
      {pattern: "app/scripts/project_name/**/*.js", load: false},
      {pattern: "test/fakes/**/*.js", load: false}
    ],

    tests: [
      {pattern: "test/**/*_spec.js", load: false}
    ],

    compilers: {
      "**/*.js": wallaby.compilers.babel()
    },

    postprocessor: webpackPostprocessor,

    setup: function () {
      window.__moduleBundler.loadTests();
    }
  };
};
