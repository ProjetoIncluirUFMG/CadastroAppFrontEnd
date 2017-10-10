require('webpack-clear-require')();
require('dotenv').config();
const Dotenv = require('dotenv-webpack');
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ReplacePlugin = require('replace-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

const staticSourcePath = path.join(__dirname, 'static');
const sourcePath = path.join(__dirname, 'src');
const buildPath = path.join(__dirname, 'dist');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: {
    app: path.resolve(sourcePath, 'index.js')
  },
  output: {
    path: buildPath,
    filename: '[name].[chunkhash].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
    modules: [
      sourcePath,
      path.resolve(__dirname, 'node_modules')
    ]
  },
  plugins: [
    new CleanWebpackPlugin(
      ['dist/*'],
      {
        root: path.resolve(__dirname),
        verbose: true,
        dry: false
      }),
    new CopyWebpackPlugin([
      { from: staticSourcePath }
    ]),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new Dotenv({
      path: './.env', // Path to .env file (this is the default)
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.[hash].js',
      minChunks(module) {
        return module.context && module.context.indexOf('node_modules') >= 0;
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      },
      output: {
        comments: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer({
            browsers: [
              'last 3 version',
              'ie >= 10'
            ]
          })
        ],
        context: staticSourcePath
      }
    }),
    new webpack.HashedModuleIdsPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      path: buildPath,
      excludeChunks: ['base'],
      filename: 'index.html',
      hash: true,
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeComments: false,
        removeRedundantAttributes: true
      }
    }),
    new PreloadWebpackPlugin({
      rel: 'preload',
      as: 'script',
      include: 'all',
      fileBlacklist: [/\.(css|map)$/, /base?.+/]
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ],
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
        include: staticSourcePath
      },
      {
        test: /\.(eot?.+|svg?.+|ttf?.+|otf?.+|woff?.+|woff2?.+)$/,
        use: 'file-loader?name=assets/[name]-[hash].[ext]'
      },
    ]
  },
  devServer: {
    // Set this as true if you want to access dev server from arbitrary url.
    // This is handy if you are using a html5 router.
    historyApiFallback: true,
    contentBase: ['./dist/'],
    host: '0.0.0.0',
    port: 8003,
    public: 'local-cadastro.projetoincluir.com'
  }
};
