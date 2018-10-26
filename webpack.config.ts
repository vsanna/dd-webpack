const path = require('path') // これは common js のmodule

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	/*
	## configのtop level optionは5つ
	1. entry
	2. output
	3. mode
	4. modules
	5. plugins
	6. other
	  - devServer
	  - devtool
	  - optimizations
		  - 4から. modeで基本的に管理するけど、個別に指定もまだできる
		  - minimize, minimizer
	  - watch, watchOptions	
	  - externals
	  - performance
	  	- webpackがパフォーマンス改善のhintを見つけたら教えてくれる

	https://webpack.js.org/configuration/
	ここを見る  

	## pluginいろいろ
	- UglifyPlugin ... 裏側に取り込まれていった

	## split webpack.config.js
	*/

	// 1. entry
	// - buildが開始する場所
	entry: './src/index.js',

	// 2. output
	// - bundleしたファイルの出力ルールを決める
	// - must: filename, path
	// - option: [name], [contenthash]
	// - publicPath: 
	output: {
		filename: 'bundle.[contenthash].js',
		path: path.resolve(__dirname, './dist'),
		// publicPath: 'dist/'
	},

	// 3. mode
	// - build-in optimizationを選択する
	// - none
	// - production
	//   - sourcemapを作らない
	// - development
	//   - sourcemapを作る
	mode: 'development', // none | production | development

	// 4. module
	// - webpackにimport時の挙動を伝える
	// - must: 
	//   - test: 対象 
	//   - use:  使うloaderを指定。 **後ろから適用される点に注意**
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

	// 5. plugins
	// - desc
	// - https://webpack.js.org/plugins/
	plugins: [
		new UglifyPlugin(),
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
	],

	// 6. devServer
	// hotreloadなどできる
	// https://webpack.js.org/configuration/dev-server/
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		index: 'index.html',
		port: 9000
	},

	// optimization
	optimization: {
		// splitChunks
		// 共通のライブラリを共通のものとして吐き出してくれる
		splitChunks: {
			chunks: 'all',
			minSize: 10000,
			automaticNameDelimiter: '_'
		}
	},
}