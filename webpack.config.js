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
	  - watch
	  - devtool

	これくらいを抑えておくと良さそう  

	https://webpack.js.org/configuration/
	ここを見る  

	## pluginいろいろ
	loader以外の様々な機能をもつ。
	なおmodeによって暗黙的に有効化されるものがいくつかある点に注意

	https://webpack.js.org/plugins/
	ここをみる


	## split webpack.config.js
	node.jsとしてObject.assignでmergeするなどはできる
	が、webpack.production.config.js, webpack.dev.config.jsなどに分けるのが一般的なのかも
	でも２つのファイルを管理するのは面倒なのでfunction形式を採用して一つのファイルにするのが絶対に良さそう

	## webpack.config.jsのいくつかの定義方法
	ここにある
	https://webpack.js.org/configuration/configuration-languages/
	https://webpack.js.org/configuration/configuration-types/

	1. functionを使う
	// $ webpack --env.production sets env.production == true // option引数を付与しないとtrueがセットされる
	// $ webpack --env.platform=web sets env.platform == 'web'
	// $ webpack --optimize-minimize sets args['optimize-minimize'] == true
	module.exports = (env, args) => {
		return {
			// configurations
		}
	}

	2. promiseを使う 省略

	3. typescriptを使う
	// $ npm install --save-dev ts-node @types/node @types/webpack
	import webpack from 'webpack'
	const config: webpack.Configuration = {
		// configurations
	}
	export default config
	*/

	// 1. entry
	// - buildが開始する場所
	// - string | [string] | objectなど定義の仕方が多様
	entry: './src/index.js',
	// entry: {
	// 	user: './src/user.js',   // -> bundle.user.[contenthash].js
	// 	admin: './src/admin.js', // -> bundle.admin.[contenthash].js
	// },

	// 2. output
	// - bundleしたファイルの出力ルールを決める
	// - options:
	//   - [must] filename
	//   - [must] path
	//   - publicPath
	// - [name], [contenthash]などをファイル名に付与する事ができる
	output: {
		filename: 'bundle.[name].[contenthash].js',
		path: path.resolve(__dirname, './dist'),
		// publicPath: 'dist/'
	},

	// 3. mode
	// - build-in optimizationを選択したりsourcemapの扱いが変わったりと全般的な挙動が変わる
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
	// - loaderが行うこと以外割と何でも
	// - task runnerっぽいこともできる
	//   - ex: 不要なファイルを消したり。
	// - https://webpack.js.org/plugins/
	// - とりあえずいくつか使ってみる
	plugins: [
		new UglifyPlugin(), // mode: productionでは暗黙的に利用されるし、devでは不要なので実は明示的に登場することはあんまりない
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
}