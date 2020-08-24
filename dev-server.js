const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const process = require('process')

const HOST = '192.168.0.101';
const config = require('./webpack.dev.js')(process.env);
console.info(config);
const options = config.devServer || {
  contentBase: './dist',
  hot: true,
  host: HOST,
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(5000, HOST, () => {
  console.log('dev server listening on port 5000');
});