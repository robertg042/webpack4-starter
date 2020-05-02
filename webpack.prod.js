require('dotenv').config();

const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');

module.exports = (env = {}) => {
  const PATHS = {
    src: path.resolve(__dirname, 'src'),
    pages: path.resolve(__dirname, 'src', 'pages'),
    dist: path.resolve(__dirname, 'dist'),
  };

  const entries = {
    main: path.resolve(PATHS.src, 'index.js'),
    about: path.resolve(PATHS.pages, 'about', 'about.js'),
  };

  const pagesHtmlPlugins = Object.keys(entries).slice(1).map(function(entryName) {
    return new HtmlWebpackPlugin({
      filename: `pages/${entryName}.html`,
      template: path.resolve(PATHS.pages, entryName, `${entryName}.html`),
      chunks: [entryName],
    })
  });

  const plugins = [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(PATHS.src, 'index.html'),
      chunks: ['main'],
    }),
    ...pagesHtmlPlugins,
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
      chunkFilename: 'styles/[id].[contenthash].css',
      sourceMap: env.sourceMaps,
      esModule: false,
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
      cssProcessorOptions: {
        discardComments: {
          removeAll: true,
        },
        safe: true,
        map: env.sourceMaps ? {
          inline: false,
          annotation: true,
        } : false,
      },
      canPrint: false,
    })
  ];

  if (!env.sourceMaps) {
    plugins.push(
      new PurgecssPlugin({
        paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
      })
    );
  }

  return {
    mode: 'production',
    entry: entries,
    devtool: env.sourceMaps ? 'source-map' : 'none',
    output: {
      chunkFilename: 'js/[name].[chunkhash].js',
      filename: 'js/[name].[chunkhash].js',
      path: PATHS.dist,
      // Needed for code splitting and media urls to work for nested paths:
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
          exclude: [/node_modules/],
          use: [
            {
              loader: 'html-loader',
              options: {
                attributes: true,
                minimize: false,
                esModule: false
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
              options: {
                sourceMap: env.sourceMaps,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
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
                outputPath: 'assets',
              },
            },
            {
              loader: 'image-webpack-loader',
            },
          ],
        },
        {
          test: /\.(mp4)$/i,
          exclude: [/node_modules/],
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 15000,
                name: '[name].[hash].[ext]',
                esModule: false,
                outputPath: 'assets',
              },
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
                name: 'assets/[name].[hash].[ext]',
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
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'assets/[name].[hash].[ext]',
                limit: 15000,
              },
            }
          ]
        },
      ],
    },
    plugins: plugins,
  };
};
