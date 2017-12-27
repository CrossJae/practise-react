var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: [
		'webpack-dev-server/client?http://127.0.0.1:8080', // WebpackDevServer host and port
		'webpack/hot/only-dev-server',
		'./entry/demo1.jsx' // Your appʼs entry point

	],
	//生成的sourcemap的方式
	devtool: process.env.WEBPACK_DEVTOOL || 'source-map',
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		// loaders:loaders
	loaders: [
    {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [
            'react-hot',
            'babel'
        ]
    }, {
        test: /\.less$/,
        loaders: [
            'style',
            'css?sourceMap',
            'postcss', // 使用了autoprefixer
            'less?sourceMap'
        ]
    },
    {
			test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
			loader: "file"
		},
		{
			test: /\.(woff|woff2)$/,
			loader: "url?prefix=font/&limit=5000"
		},
		{
			test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
			loader: "url?limit=10000&mimetype=application/octet-stream"
		},
		{
			test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
			loader: "url?limit=10000&mimetype=image/svg+xml"
		},
		{
			test: /\.gif/,
			loader: "url-loader?limit=10000&mimetype=image/gif"
		},
		{
			test: /\.jpg/,
			loader: "url-loader?limit=10000&mimetype=image/jpg"
		},
		{
			test: /\.png/,
			loader: "url-loader?limit=10000&mimetype=image/png"
		}
    ]
	},
	postcss: function() {
      return [
          require('autoprefixer')({ browsers: ["Android >= 4", "iOS >= 7"] })
      ];
  },
	devServer: {
		contentBase: "./build", //静态资源的目录
		noInfo: true, //  --no-info option
		hot: true,   //自动刷新
		inline: true,
		port:8080,
		host:"0.0.0.0"
	},
	plugins: [
		new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
	    // new ExtractTextPlugin('main.css', {
     //        allChunks: true
     //    }),
		new CopyWebpackPlugin([//拷贝资源 到编译目录
 			{from: './index.html'}
 		])
	]
};
