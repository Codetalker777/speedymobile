const path = require('path');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = (env, argv) => {
	return [
		{
			plugins:
				argv.mode === 'development'
					? [
							new MiniCssExtractPlugin(),
							new webpack.DefinePlugin({
								'process.env.API_URL': JSON.stringify(env.API_URL),
								'process.env.isNode': true
							}),
							new NodemonPlugin({
								script: './dist/server.js',
								watch: [path.resolve('./dist'), path.resolve('./public')]
							})
					  ]
					: [
							new MiniCssExtractPlugin(),
							new webpack.DefinePlugin({
								'process.env.API_URL': JSON.stringify(env.API_URL),
								'process.env.isNode': true
							})
					  ],
			entry: {
				server: './src/server.js'
			},
			devtool: argv.mode === 'development' ? 'eval-source-map' : false,
			mode: argv.mode,
			watch: argv.mode === 'development',
			watchOptions: {
				ignored: ['node_modules', 'dist', 'public']
			},
			output: {
				path: path.join(__dirname, './dist'),
				publicPath: '/',
				filename: '[name].js'
			},
			target: 'node',
			node: {
				__dirname: false,
				__filename: false
			},
			externals: [nodeExternals()],
			resolve: {
				extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css']
			},
			module: {
				rules: [
					{
						test: /\.(ts|js)x?$/,
						exclude: /node_modules/,
						use: {
							loader: 'babel-loader'
						}
					},
					{
						test: /\.(png|svg|jpg|gif)$/,
						use: {
							loader: 'file-loader',
							options: {
								publicPath(url) {
									if (argv.mode === 'development') return `static/${url}`;
									return `${env.API_URL}/static/${url}`;
								}
							}
						}
					},
					{
						test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
						use: {
							loader: 'file-loader',
							options: {
								publicPath(url) {
									if (argv.mode === 'development') return `${url}`;
									return `${env.API_URL}/static/${url}`;
								}
							}
						}
					},
					{
						test: /\.css$/i,
						use: [MiniCssExtractPlugin.loader, 'css-loader']
					}
				]
			}
		},
		{
			plugins: [
				new MiniCssExtractPlugin(),
				new webpack.DefinePlugin({
					'process.env.API_URL': JSON.stringify(env.API_URL)
				})
			],
			entry: {
				client: './src/clientServer/client.tsx'
			},
			devtool: argv.mode === 'development' ? 'eval-source-map' : false,
			mode: argv.mode,
			watch: argv.mode === 'development',
			watchOptions: {
				ignored: ['node_modules', 'dist', 'public']
			},
			output: {
				path: path.join(__dirname, './public'),
				publicPath: '/',
				filename: '[name].js',
				chunkFilename: '[id].[name].[chunkhash:8].js'
			},
			resolve: {
				extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css']
			},
			module: {
				rules: [
					{
						test: /\.(ts|js)x?$/,
						exclude: /node_modules/,
						use: {
							loader: 'babel-loader'
						}
					},
					{
						test: /\.(png|svg|jpg|gif)$/,
						use: {
							loader: 'file-loader',
							options: {
								publicPath(url) {
									if (argv.mode === 'development') return `static/${url}`;
									return `${env.API_URL}/static/${url}`;
								}
							}
						}
					},
					{
						test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
						use: {
							loader: 'file-loader',
							options: {
								publicPath(url) {
									if (argv.mode === 'development') return `${url}`;
									return `${env.API_URL}/static/${url}`;
								}
							}
						}
					},
					{
						test: /\.css$/i,
						use: [MiniCssExtractPlugin.loader, 'css-loader']
					}
				]
			},
			optimization: {
				minimize: !argv.mode === 'development',
				minimizer: [new TerserPlugin()]
			}
		}
	];
};
