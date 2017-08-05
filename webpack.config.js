require('dotenv').config();
const Dotenv = require('dotenv-webpack');
const ReplacePlugin = require('replace-webpack-plugin');

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
			{
				test: /\.js$/,
	      exclude: /node_modules/,
	      loader: 'babel-loader'
	    }
		]
  },
	plugins: [
		new ReplacePlugin({
      //skip: process.env.NODE_ENV === 'development',
      entry: '/src/index.html',
      output: 'index.html',
      data: {
        js: '	<script src="https://maps.googleapis.com/maps/api/js?key=' + process.env.GOOGLE_PLACES_API_KEY +'&libraries=places&language=pt-br"></script>'
      }
    }),
		new Dotenv({
			path: './.env', // Path to .env file (this is the default)
		})
	],
  devServer: {
    // Set this as true if you want to access dev server from arbitrary url.
    // This is handy if you are using a html5 router.
    historyApiFallback: true,
    contentBase: './',
    host: '0.0.0.0',
    port: 8003,
		public: 'local-cadastro.projetoincluir.com'
  }
};
