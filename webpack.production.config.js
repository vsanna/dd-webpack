const path = require('path') // これは common js のmodule
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const UglifyPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './src/index.js',

	output: {
		filename: 'bundle.[contenthash].js',
		path: path.resolve(__dirname, './dist'),
		// publicPath: 'dist/'
	},

	mode: 'production', // none | production | development

	module: {
		rules: [{
			test: /\.(png|jpg)$/,
			use: [
				'file-loader'
			]
		}, {
			test: /\.css$/,
			use: [
				MiniCssExtractPlugin.loader, 'css-loader'
			]
		}, {
			test: /\.scss$/,
			use: [
				MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
			]
		}, {
			test: /\.js$/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['stage-0'] // インスタンス変数用
				}
			}
		}, {
			test: /\.hbs$/,
			use: [
				'handlebars-loader'
			]
		}],
	},

	plugins: [
		// new UglifyPlugin(), // productionでは勝手に入る
		new MiniCssExtractPlugin({
			filename: 'styles.[hash].css'
		}),
		new CleanWebpackPlugin('dist'),

		// no optionでcss, jsをincludeしたhtmlを出してくれる。どうやってcssまで出しているかは不明
		// options: https://github.com/jantimon/html-webpack-plugin
		new HtmlWebpackPlugin({
			title: 'hello world',
			filename: 'custome_filename.html',
			meta: {
				viewpoint: 'width=devise-width, inintial-scale=1'
			}
		}),
		new HtmlWebpackPlugin({
			title: 'hello world',
			description: 'some description',
			template: 'src/index.hbs'
		}),
	]
}