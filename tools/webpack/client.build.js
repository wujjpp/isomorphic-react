/**
 * Created by Wu Jian Ping on 2017/2/9.
 */

import webpack from 'webpack'

import AssetsPlugin from 'assets-webpack-plugin'
import path from 'path'
import config from '../config'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'

export default {
  target: 'web',

  mode: 'production',

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },

  entry: {
    script: [
      '@babel/polyfill',
      './src/client.js'
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
      use: ['babel-loader'],
      include: [
        path.join(process.cwd(), 'src')
      ]
    },

    {
      test: /\.scss$/i,
      use: [
        {
          loader: MiniCssExtractPlugin.loader
        },
        {
          loader: 'css-loader',
        },
        {
          loader: 'postcss-loader',
          options: {
            config: {
              path: './tools/'
            }
          }
        },
        {
          loader: 'sass-loader'
        }
      ]
    },

    {
      test: /\.less$/i,
      use: [
        {
          loader: MiniCssExtractPlugin.loader
        },
        {
          loader: 'css-loader'
        },
        {
          loader: 'postcss-loader',
          options: {
            config: {
              path: './tools/'
            }
          }
        },
        {
          loader: 'less-loader'
        }
      ]
    },

    {
      test: /\.css$/i,
      use: [
        {
          loader: MiniCssExtractPlugin.loader
        },
        {
          loader: 'css-loader'
        },
        {
          loader: 'postcss-loader',
          options: {
            config: {
              path: './tools/'
            }
          }
        }
      ]
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

    new webpack.ProvidePlugin({
      $: 'jquery',
      jquery: 'jquery',
      'window.jQuery': 'jquery',
      jQuery: 'jquery'
    }),
    // new ExtractTextPlugin({
    //   filename: 'style.[hash:8].css',
    //   allChunks: true
    // }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[contenthash].css',
      chunkFilename: '[id].css'
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new AssetsPlugin({
      filename: 'assets.json',
      path: path.join(process.cwd(), config.dist),
      prettyPrint: true
    })
    // new webpack.optimize.UglifyJsPlugin({
    //   comments: false,
    //   compress: {
    //     warnings: false,
    //     drop_console: true //remove all console
    //   }
    // })
  ],

  stats: {
    colors: true,
    warnings: false
  }
}
