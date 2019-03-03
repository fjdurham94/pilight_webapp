var webpack = require('webpack');
var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var parentDir = path.join(__dirname, '../');

module.exports = {
    mode: 'production',
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    entry: [
        path.join(parentDir, 'src/index.js')
    ],
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		},{
			test: /\.css$/,
			use: {
                loader: 'css-loader',
                options: {
                    sourceMap: true
                }
            }
		}],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html'
      })
    ],
    output: {
        path: parentDir + 'dist',
        filename: 'bundle.js'
    }
}