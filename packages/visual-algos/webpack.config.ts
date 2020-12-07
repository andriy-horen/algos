import path from 'path';
import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import TsconfigPathsWebpackPlugin from 'tsconfig-paths-webpack-plugin';

const webpackConfig: Configuration = {
	// context: __dirname,
	entry: './src/index.tsx',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'app.js',
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
		plugins: [new TsconfigPathsWebpackPlugin()],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
				options: {
					// disable type checker - this is done in fork plugin
					transpileOnly: true,
				},
			},
		],
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		port: 3000,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
		new ForkTsCheckerWebpackPlugin({
			// TODO: enable eslint
			// eslint: {
			// 	files: './src/**/*.{ts,tsx,js,jsx}',
			// },
		}),
	],
};

export default webpackConfig;
