require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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

  return {
    mode: 'development',
    entry: entries,
    devtool: 'cheap-module-eval-source-map', // eval maps not always working
    devServer: {
      contentBase: PATHS.dist,
      host: process.env.HOST || 'localhost',
      port: process.env.PORT || 3080,
      open: false,
      overlay: true,
      hot: true,
      hotOnly: true,
      before(app, server) {
        server._watch(path.resolve(PATHS.src, '**/*.html'));
      },
      clientLogLevel: 'none',
      // writeToDisk: true,
    },
    watchOptions: {
      ignored: /node_modules/
    },
    output: {
      chunkFilename: 'js/[name].[hash:4].js',
      filename: 'js/[name].[hash:4].js',
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
              options: {
                sourceMap: true,
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
                esModule: false,
                outputPath: 'assets',
              }
            }
          ]
        },
        {
          test: /\.(mp4)$/i,
          exclude: [/node_modules/],
          use: [
            {
              loader: 'url-loader',
              options: {
                esModule: false,
                outputPath: 'assets',
              }
            }
          ]
        },
        {
          // alternative: https://github.com/webpack-contrib/url-loader/issues/6#issuecomment-365019230
          test: /\.(svg)$/i,
          exclude: [/node_modules/],
          use: [
            {
              loader: 'svg-url-loader',
              options: {
                name: 'assets/[name].[hash:4].[ext]',
              },
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
                name: 'assets/[name].[hash:4].[ext]',
              },
            }
          ]
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(PATHS.src, 'index.html'),
        chunks: ['main'],
      }),
      ...pagesHtmlPlugins,
      new webpack.HotModuleReplacementPlugin(),
    ]
  }
};
