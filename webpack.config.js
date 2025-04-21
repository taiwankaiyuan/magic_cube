const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	context: path.resolve(__dirname),
	entry: './src/js/main.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true
	},
	resolve: {
		modules: [path.resolve(__dirname, 'node_modules'), 'node_modules']
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html',
			filename: 'index.html'
		})
	],
	devServer: {
		static: './dist',
		hot: true
	},
	mode: 'production'
};
