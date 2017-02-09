var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

const PROJECT_ROOT = path.resolve(__dirname);

module.exports = {
  devtool: "source-map",
  entry: {
    app: "./app/application.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(PROJECT_ROOT, "app"),
		exclude: /(node_modules|bower_components)/,
        loader: "babel-loader"
      },
      {
        test: /\.jsx?$/,
        include: path.join(PROJECT_ROOT, "app"),
		exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
		query: {
			presets:["react"]
		}
      },
	  {
		test: /\.json$/,
		loader: "json"
	  },
      {
        test: /\.css$/,
        loader: "style!css"
      },
      {
        test: /\.scss$/, // Only .scss files
        loader: 'style!css!sass' // Run both loaders
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
        loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
      },
      {
        test: /\.html$/,
        include: path.join(PROJECT_ROOT, "app"),
        loader: "mustache"
      },
      {
        test: /\.ejs$/,
        loader: "ejs-compiled"
      }
    ]
  },
  output: {
    filename: "application.js",
    path: path.resolve(__dirname, "dist")
  },
  externals: {
	'react/lib/ExecutionEnvironment': true,
	'react/addons': true,
	'react/lib/ReactContext': 'window'
  },
  resolve: {
	  extensions: ["", ".js", ".jsx", ".json"],
	  alias: {
      "project_name": path.join(PROJECT_ROOT, "app", "scripts", "project_name"),
      "components": path.join(PROJECT_ROOT, "app", "components"),
      "scripts": path.join(PROJECT_ROOT, "app", "scripts"),
      "styles": path.join(PROJECT_ROOT, "app", "styles")
    },
    modulesDirectories: [path.join(PROJECT_ROOT, "node_modules"), path.join(PROJECT_ROOT, "bower_components")]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.ejs'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      _: "underscore"
    }),
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
    )
  ]
}
