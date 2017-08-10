const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const extractCSS = new ExtractTextPlugin({
	// result css filename
	filename: 'styles.css',
	// NOTE: not sure about this option, set to true for now
	// guess this will merge all files generated by the this same instance?
	allChunks: true,
});

module.exports = {
	entry: './app/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve('../static/client-app-dist'),
	},
	module: {
		// TODO: add uglify & compress for PROD
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env', 'es2015', 'react']
					}
				}
			},
			{
				test: /\.css$/,
				exclude: /(node_modules|bower_components)/,
				// Note: dont know why but using style loader here causes errors
				use: extractCSS.extract(['css-loader']),
			},
		],
	},
	plugins: [
		extractCSS,
	],
};
