/**
 * Created by Wu Jian Ping on 2017/2/6.
 */

import webpack, { HotModuleReplacementPlugin } from 'webpack'
import path from 'path'
import config from '../config'


export default {
  target: 'web',
  devtool: 'eval-source-map',
  mode: 'development',

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    unsafeCache: true
  },

  entry: {
    script: [
      '@babel/polyfill',
      'webpack-hot-middleware/client?reload=true', //reload - Set to true to auto-reload the page when webpack gets stuck
      './src/client.js'
    ]
  },

  output: {
    path: path.join(process.cwd(), config.dist, 'public'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/',
  },

  module: {

    noParse: function (content) {
      return /lodash/.test(content)
    },
    unsafeCache: true,

    rules: [
      {
        test: /\.(js|jsx)$/i,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: './.cache/babel-loader'
            }
          }
        ],
        include: [
          path.join(process.cwd(), 'src')
        ]
      },
      {
        test: /\.scss$/i,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: './tools/postcss.config.js'
              },
              sourceMap: 'inline'
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },

      {
        test: /\.less$/i,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: './tools/postcss.config.js'
              },
              sourceMap: 'inline'
            }
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },

      {
        test: /\.css$/i,
        use: [{
          loader: 'style-loader'
        },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            config: {
              path: './tools/postcss.config.js'
            },
            sourceMap: 'inline'
          }
        }
        ]
      },

      {
        test: /\.(ico|gif|png|jpg|jpeg|webp)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            /*limit: 8192,*/
            name: '[path][name].[ext]'
          }
        }]
      },

      {
        test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        },
      },

      {
        test: /\.(woff2?|ttf|eot|svg)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'font/[name].[ext]'
          }
        }]
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      '__BROWSER__': true,
      '__DEV__': true
    }),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jquery: 'jquery',
      'window.jQuery': 'jquery',
      jQuery: 'jquery'
    }),

    new HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],

  stats: {
    colors: true,
    warnings: false
  }
}
