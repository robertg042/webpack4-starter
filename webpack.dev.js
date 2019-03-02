require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, 'src'),
  pages: path.join(__dirname, 'src', 'pages'),
  dist: path.join(__dirname, 'dist'),
};

module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(PATHS.src, 'index.js'),
    about: path.resolve(PATHS.pages, 'about', 'about.js'),
  },
  devtool: 'cheap-module-eval-source-map', // eval maps not always working
  devServer: {
    contentBase: './dist',
    host: process.env.HOST,
    port: process.env.PORT,
    open: false,
    overlay: true,
    hotOnly: true,
  },
  output: {
    chunkFilename: '[name].[hash:4].js',
    filename: '[name].[hash:4].js',
    path: PATHS.dist,
    // Needed for code splitting to work in nested paths
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      // bundle splitting
      chunks: 'initial',
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: PATHS.src,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: false,
              attrs: ['img:src', 'source:srcset'],
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'resolve-url-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sourceMapContents: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/i,
        exclude: [/node_modules/],
        use: ['url-loader'],
      },
      {
        test: /\.(svg)$/i,
        exclude: [/node_modules/],
        use: ['svg-url-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        exclude: [/node_modules/],
        use: ['file-loader'],
      },
      {
        test: /\.(csv|tsv)$/i,
        exclude: [/node_modules/],
        use: ['csv-loader'],
      },
      {
        test: /\.(xml)$/i,
        exclude: [/node_modules/],
        use: ['xml-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(PATHS.src, 'index.html'),
      inject: true,
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      filename: 'pages/about/about.html',
      template: path.resolve(PATHS.pages, 'about', 'about.html'),
      inject: true,
      chunks: ['about'],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash:4].css',
      chunkFilename: '[id].[hash:4].css',
    }),
    new WriteFilePlugin(),  // forces webpack-dev-server to write bundle files to the file system
    new webpack.HotModuleReplacementPlugin(),
  ],
};
