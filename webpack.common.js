const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => ({
	entry: './src/index.ts',
	output: {
		filename: 'bundle.[contenthash].js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},

	resolve: {
		extensions: ['.ts', '.js', '.json'],
		alias: {
			system: path.resolve(__dirname, 'src/system'),
			utils: path.resolve(__dirname, 'src/utils'),
			game: path.resolve(__dirname, 'src/game'),
			assets: path.resolve(__dirname, 'src/assets'),
			app: path.resolve(__dirname, 'src/app'),
			components: path.resolve(__dirname, 'src/components'),
			eventsNames: path.resolve(__dirname, 'src/eventsNames.ts'),
			audios: path.resolve(__dirname, 'src/audios'),
			types: path.resolve(__dirname, 'src/types'),
		},
	},
	module: {
		rules: [
			{
				test: /\.(ts|js)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						cacheDirectory: true,
						presets: ['@babel/preset-env', '@babel/preset-typescript'],
						plugins: ['@babel/plugin-transform-runtime'],
					},
				},
			},
			{
				test: /\.(png|jpg|jpeg|mp3|ttf|mp4|woff2|ogg|svg)$/i,
				type: 'asset/inline',
			},

			{
				test: /\.html$/,
				loader: 'html-loader',
				options: { minimize: true },
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							api: 'modern-compiler'
						}
					}
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			inject: 'body',
			minify: {
				removeComments: true,
				collapseWhitespace: true,
			},
		}),
	],
});
