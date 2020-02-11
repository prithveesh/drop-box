/* eslint-disable max-len */
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	entry: './server/index.js',

	target: 'node',
	mode: 'development',
	node: {
		__dirname: false,
	},
	output: {
		path: path.resolve('./build/server'),
		filename: 'index.js',
		chunkFilename: '[name].js',
		libraryTarget: 'commonjs2',
	},

	plugins: [
		// new CleanWebpackPlugin(),
		new webpack.HotModuleReplacementPlugin(),
	],
	devtool: 'source-map'
};
