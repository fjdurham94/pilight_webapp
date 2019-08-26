var webpack = require('webpack');
var path = require('path');

var parentDir = path.join(__dirname, '../');

module.exports = {
    mode: 'development',
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
		}, {
			test: /\.css$/,
			use: ['style-loader', 'css-loader'],
		}],
    },
    output: {
        path: parentDir + 'dist',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: parentDir + 'src',
        historyApiFallback: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        },
        before(app) {
            const bodyParser = require('body-parser');
            app.use(bodyParser.json());
        }
    }
}