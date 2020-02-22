const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
require('dotenv').config();

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
		path: path.join(__dirname, '/dist'),
		filename: 'index_bundle.js',
		publicPath: '/'
	},
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
				test: /\.(png|jpg|gif)$/,
				use: ['file-loader']
			}
    ]
  },
  devServer: {
		historyApiFallback: true
	},
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new webpack.DefinePlugin({
			'process.env': {
				API_URL: JSON.stringify(process.env.API_URL)
			}
		})
  ]
};
