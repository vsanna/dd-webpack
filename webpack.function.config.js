const path = require('path') // これは common js のmodule

module.exports = function (env, argv) {
	return {
		mode: env.production ? 'production' : 'developmennt',
		devtool: env.production ? 'source-maps' : 'eval',
		entry: 'index.js',
		output: {
			filename: 'bundle.js',
			path: path.resolve(__dirname, 'dist')
		}
	}
}