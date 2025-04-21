const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	context: path.resolve(__dirname),
	entry: './src/js/main.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/', // 確保資源路徑正確，支援 SPA 路由
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
				type: 'asset/resource',
				generator: {
					filename: 'images/[hash][ext][query]' // 將圖片輸出到 dist/images 目錄
				}
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i, // 處理字型檔案 (如果有的話)
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[hash][ext][query]' // 將字型輸出到 dist/fonts 目錄
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html', // 使用根目錄的 index.html 作為模板
			filename: 'index.html'
		})
	],
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist')
		},
		compress: true,
		port: 9000, // 可以指定開發伺服器端口
		hot: true,
		open: true, // 自動開啟瀏覽器
		historyApiFallback: true // 對於 SPA 路由很重要
	},
	mode: 'production' // 在 package.json 的 build 指令中會覆蓋為 production
};
