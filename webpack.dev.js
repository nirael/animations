const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = env => merge(common(env),{
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	module:{
		rules: [
			 {
		        test: /\.(sa|sc|c)ss$/,
		        use: [
		          {
		            loader: MiniCssExtractPlugin.loader,
		            options: {
		              hmr: true,
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
			       filename: '[name].[hash].css',
      			  chunkFilename: '[id].[hash].css',
			    
			    }),
	],
	optimization:{
			//splitChunks: {chunks: 'all'}
			usedExports: true,
			moduleIds: 'hashed',
			runtimeChunk: 'single',
			splitChunks: {
				cacheGroups: {
					vendor : {
						test : /[\\/]node_modules[\\/]/,
						name: 'vendors',
						chunks: 'all',
					}
				}
			}
		},
	devServer: {
		 contentBase: './dist',
  		 hot: true,
 		 host: "192.168.0.101",
	}
})