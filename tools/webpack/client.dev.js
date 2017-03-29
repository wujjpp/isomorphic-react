/**
 * Created by Wu Jian Ping on 2017/2/6.
 */

import webpack, {
  HotModuleReplacementPlugin
} from 'webpack'
import path from 'path'


export default {
  target: 'web',
  devtool: 'eval-source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },

  entry: {
    script: [
      'webpack-hot-middleware/client?reload=true', //reload - Set to true to auto-reload the page when webpack gets stuck
      './src/client.js'
    ]
  },

  output: {
    path: path.join(process.cwd(), '.tmp', 'public'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/',
  },

  module: {
    rules: [{
        test: /\.(js|jsx)$/i,
        use: [{
            loader: 'react-hot-loader'
          },
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: './.tmp/.cache/babel-loader'
            }
          }
        ],
        include: [
          path.join(process.cwd(), 'src')
        ]
      },

      {
        test: /\.scss$/i,
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
              config: './tools/postcss.config.js',
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
              config: './tools/postcss.config.js',
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
              config: './tools/postcss.config.js',
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
      minChunks: 2
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ],

  stats: {
    colors: true,
    warnings: false
  }
}
