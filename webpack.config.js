require('dotenv').config();
const Dotenv = require('dotenv-webpack');
const ReplacePlugin = require('replace-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const sourcePath = path.join(__dirname, 'src');
const buildPath = path.join(__dirname, 'dist');

module.exports = {
  entry: {
    app: path.resolve(sourcePath, 'index.js')
  },
  output: {
    path: buildPath,
    publicPath: '/dist',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ],
        include: sourcePath
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          }
        ],
      },
      {
        test: /\.(jpeg?.+|jpg?.+|png?.+|eot?.+|svg?.+|ttf?.+|otf?.+|woff?.+|woff2?.+)$/,
        use: 'file-loader?name=assets/[name]-[hash].[ext]'
      }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      path: buildPath,
      excludeChunks: ['base'],
      filename: 'index.html',
    }),
    new ReplacePlugin({
      entry: '/src/index.html',
      output: '/dist/index.html',
      data: {
        js: '	<script src="https://maps.googleapis.com/maps/api/js?key=' + process.env.GOOGLE_PLACES_API_KEY + '&libraries=places&language=pt-br"></script>'
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
    contentBase: ['./dist/', './static/'],
    host: '0.0.0.0',
    port: 8003,
    public: 'local-cadastro.projetoincluir.com'
  }
};