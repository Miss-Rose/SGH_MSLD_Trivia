const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');

module.exports = env =>
	merge(common(env), {
		mode: 'production',
		devtool: false,
		optimization: {
			minimizer: [
				new TerserPlugin({
					parallel: true,
				}),
				new ImageMinimizerPlugin({
					minimizer: {
						implementation: ImageMinimizerPlugin.sharpMinify,
						options: {
							encodeOptions: {
								png: {
									quality: 90,
								},
								jpeg: {
									quality: 90,
								},
							},
						},
					},
				})
			],
			splitChunks: {
				chunks: 'all',
			},
		},
		plugins: [new CleanWebpackPlugin(), new HtmlInlineScriptPlugin(), new HtmlMinimizerPlugin()],
	});
