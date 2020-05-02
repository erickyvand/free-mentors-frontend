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
        test: /\.(js|jsx?)$/,
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
        test: /\.s(a|c)ss$/,
				exclude: /\.module.(s(a|c)ss)$/,
				use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }]
      },
      {
				test: /\.(png|jpg|gif)$/,
				use: ['file-loader']
      },
      {
        test: /\.(svg$)/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 1000
            }
          }
        ]
      },
      {
        test: /\.(png|woff|woff2|ttf|eot)($|\?)/i,
        use: {loader: 'url-loader?limit=5000'}
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
  ],
  resolve: {
		extensions: ['.js', '.jsx', '.scss']
	}
};
