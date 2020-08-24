const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = env => {
	return {

		entry: {
				polyfills: "./src/polyfills.js",
			 	app: "./src/index.js",
			 	//print: "./src/print.js",
			 	shared: ['lodash'],
		},
		
		module: {

			rules: [
			/*{
				test: require.resolve("./src/index.js"),
				use : "imports-loader?this=>window",
			},*/
				{
					test: /\.js$/,
					include: path.resolve(__dirname, 'src'),
					loader: 'babel-loader',
				},
				
				{
					test: /\.(png|svg|jpg|gif)$/,
					use: ['file-loader'],
				},
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/,
					use: ['file-loader'],
				},
				{
					test: /\.(csv|tsv)$/,
					use: ['csv-loader',],
				},
				{
					test: /\.xml$/,
					use: ['xml-loader',]
				},
				/*{
					test: /\.(sass|scss)$/,
					use: ['style-loader','css-loader','sass-loader'],
				}*/
			],
		},
		output: {
			filename: '[name].bundle.js',
			path: path.resolve(__dirname, 'dist'),
			publicPath: '/',
			pathinfo: false,
		},
		plugins: [
			new CleanWebpackPlugin({ cleanStaleWebpackAssets: false}),
			new HtmlWebpackPlugin({title:'Production', template : './index.html'}),
			new webpack.ProvidePlugin({
				_: 'lodash',
			})
			
		]
	}
}