require('dotenv').config();

const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');

const PATHS = {
  src: path.join(__dirname, 'src'),
  pages: path.join(__dirname, 'src', 'pages'),
  dist: path.join(__dirname, 'dist'),
};

module.exports = (env = {}) => {
  return {
    mode: 'production',
    entry: {
      main: path.resolve(PATHS.src, 'index.js'),
      about: path.resolve(PATHS.pages, 'about', 'about.js'),
    },
    devtool: env.sourceMaps ? 'source-map' : 'none',
    output: {
      chunkFilename: '[name].[chunkhash].js',
      filename: '[name].[chunkhash].js',
      path: PATHS.dist,
      // Needed for code splitting to work in nested paths:
      publicPath: '/',
    },
    optimization: {
      splitChunks: {
        // bundle splitting
        chunks: 'initial',
      },
    },
    performance: {
      hints: 'warning', // 'error', 'warning' or false
      maxEntrypointSize: 250000, // bytes
      maxAssetSize: 450000, // bytes
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
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: env.sourceMaps,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: env.sourceMaps,
              },
            },
            {
              loader: 'resolve-url-loader',
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: env.sourceMaps,
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|webp)$/i,
          exclude: [/node_modules/],
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 15000,
                name: '[name].[hash].[ext]',
                esModule: false,
              },
            },
            {
              loader: 'image-webpack-loader',
            },
          ],
        },
        {
          test: /\.(svg)$/i,
          exclude: [/node_modules/],
          use: [
            {
              loader: 'svg-url-loader',
              options: {
                name: '[name].[hash].[ext]',
                limit: 15000,
              },
            },
            {
              loader: 'image-webpack-loader',
            },
          ],
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
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(PATHS.src, 'index.html'),
        inject: true,
        chunks: ['main'],
        minify: true,
      }),
      new HtmlWebpackPlugin({
        filename: 'pages/about/about.html',
        template: path.resolve(PATHS.pages, 'about', 'about.html'),
        inject: true,
        chunks: ['about'],
        minify: true,
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: '[id].[contenthash].css',
        sourceMap: env.sourceMaps,
      }),
      new PurgecssPlugin({
        paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessor: cssnano,
        cssProcessorOptions: {
          discardComments: {
            removeAll: true,
          },
          safe: true,
        },
        canPrint: false,
      }),
    ],
  };
};
