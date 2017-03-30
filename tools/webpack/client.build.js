/**
 * Created by Wu Jian Ping on 2017/2/9.
 */

import webpack from 'webpack'

import AssetsPlugin from 'assets-webpack-plugin'
import path from 'path'
import config from '../config'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

export default {
  target: 'web',

  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },

  entry: {
    script: [
      './src/client.js'
    ],
    vendor: [
      'react',
      'react-dom',
      'react-router'
    ]
  },

  output: {
    path: path.join(process.cwd(), config.dist, 'public'),
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[hash:8].js',
    publicPath: '/',
  },


  module: {
    rules: [{
        test: /\.(js|jsx)$/i,
        use: ['react-hot-loader', 'babel-loader'],
        include: [
          path.join(process.cwd(), 'src')
        ]
      },

      {
        test: /\.scss$/i,
        use: ExtractTextPlugin.extract({
          use: [{
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                config: './tools/postcss.config.js',
              }
            },
            {
              loader: 'sass-loader'
            }
          ],
          fallback: 'style-loader'
        })
      },

      {
        test: /\.less$/i,
        use: ExtractTextPlugin.extract({
          use: [{
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                config: './tools/postcss.config.js',
              }
            },
            {
              loader: 'less-loader'
            }
          ],
          fallback: 'style-loader'
        })
      },

      {
        test: /\.css$/i,
        use: ExtractTextPlugin.extract({
          use: [{
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                config: './tools/postcss.config.js',
              }
            }
          ],
          fallback: 'style-loader'
        })
      },

      {
        test: /\.(ico|gif|png|jpg|jpeg|webp)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name]-[hash:8].[ext]'
          }
        }]
      },

      {
        test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)$/i,
        loader: 'file-loader',
        options: {
          name: '[name]-[hash:8].[ext]'

        },
      },

      {
        test: /\.(woff2?|ttf|eot|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name]-[hash:8].[ext]'
          }
        }]
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      '__BROWSER__': true,
      '__DEV__': false
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),

    new ExtractTextPlugin({
      filename: 'style.[hash:8].css',
      allChunks: true
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.[hash:8].js',
      minChunks: 2
    }),
    new AssetsPlugin({
      filename: 'assets.json',
      path: path.join(process.cwd(), config.dist),
      prettyPrint: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        warnings: false,
        drop_console: true //remove all console
      }
    })
  ],

  stats: {
    colors: true,
    warnings: false
  }
}
