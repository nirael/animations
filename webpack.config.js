const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = env => {
	console.log('NODE_ENV', env.NODE_ENV);
	console.log('Production', env.production)
	return {
		mode: 'development',
		entry: {
			 	app: "./src/index.js",
			 	//print: "./src/print.js",
			 	shared: ['lodash'],
		},
		devtool: 'cheap-module-eval-source-map',//'inline-source-map',
		/*devServer: {
			contentBase: './dist',
			hot: true,
		},*/
		module: {

			rules: [
				{
					test: /\.js$/,
					include: path.resolve(__dirname, 'src'),
					loader: 'babel-loader',
				},
				{
					test: /\.css$/,
					use: ['style-loader','css-loader']
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
				{
					test: /\.(sass|scss)$/,
					use: ['style-loader','css-loader','sass-loader'],
				}
			],
		},
		output: {
			filename: '[name].[hash].js',
		//	chunkFilename: '[name].[chunkhash].js',
			path: path.resolve(__dirname, 'dist'),
			publicPath: '/',
			pathinfo: false,
		},
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
		plugins: [
			new CleanWebpackPlugin({ cleanStaleWebpackAssets: false}),
			new HtmlWebpackPlugin({title:'Caching', template : './index.html'})
		]
	}
}