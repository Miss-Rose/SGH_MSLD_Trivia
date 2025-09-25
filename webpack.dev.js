const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = env =>
	merge(common(env), {
		mode: 'development',
		devtool: 'eval-cheap-module-source-map',
		devServer: {
			hot: true,
			port: 3000,
		},
		plugins: [new webpack.HotModuleReplacementPlugin()],
	});
