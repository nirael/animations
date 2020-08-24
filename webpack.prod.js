const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const process = require('process');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

//console.info(commonCfg)
module.exports = env => merge(common(env),{
	mode: 'production',
	devtool: 'source-map',
	optimization: {
	    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
	  },
	module:{
		rules: [
			 {
		        test: /\.(sa|sc|c)ss$/,
		        use: [
		          {
		            loader: MiniCssExtractPlugin.loader,
		            options: {
		              hmr: false,
		            },
		          },
		          'css-loader',
		          'postcss-loader',
		          'sass-loader',
		        ],
		      },
		]
	},
	plugins:[
		 new MiniCssExtractPlugin({
			      // Options similar to the same options in webpackOptions.output
			      // both options are optional
			      filename: '[name].css',
			      chunkFilename: '[id].css',
			    }),
	],
})