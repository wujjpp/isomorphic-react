/**
 * Created by Wu Jian Ping on 2017/2/9.
 */

import webpack from 'webpack'
import path from 'path'
import marked from "marked"
import config from '../config'
const renderer = new marked.Renderer()

export default {
  target: 'node',
  devtool: 'source-map',
  entry: './src/server.js',

  module: {
    rules: [{
        test: /\.(js|jsx)$/i,
        use: ['babel-loader'],
        include: [
          path.join(process.cwd(), 'src')
        ]
      },

      {
        test: /\.(scss|less|css)$/,
        use: ['null-loader']
      },

      {
        test: /\.(ico|gif|png|jpg|jpeg|webp)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name]-[hash:8].[ext]',
            emitFile: false
          }
        }]
      },

      {
        test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)$/i,
        loader: 'file-loader',
        options: {
          name: '[name]-[hash:8].[ext]',
          emitFile: false
        },
      },

      {
        test: /\.(woff2?|ttf|eot|svg)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name]-[hash:8].[ext]',
            emitFile: false
          }
        }]
      },

      {
        test: /\.md$/,
        use: [{
            loader: "html-loader"
          },
          {
            loader: "markdown-loader",
            options: {
              pedantic: true,
              renderer
            }
          }
        ]
      }
    ]
  },

  output: {
    path: path.join(process.cwd(), config.dist),
    filename: 'server.js',
    libraryTarget: 'commonjs2',
    publicPath: '/'
  },
  externals: [
    /^\.\/assets\.json$/,
    /^\.\/env\.json$/,
    (context, request, callback) => {
      const isExternal =
        //the module name start with ('@' or 'a-z') character and contains 'a-z' or '/' or '.' or '-' or '0-9'
        request.match(/^[@a-z][a-z/.\-0-9]*$/i) &&
        //not stylesheet
        !request.match(/\.(css|less|scss|sss)$/i) &&
        //for performance issue, built react-dom/server to package, it can avoid server use un-minfied react-dom/server
        !request.match(/react-dom\/server$/i)

      //console.log(request, '------- ', Boolean(isExternal))

      callback(null, Boolean(isExternal))
    },
  ],

  resolveLoader: {
    alias: {}
  },

  resolve: {
    alias: {},
    extensions: ['.js', '.jsx', '.json']
  },

  node: {
    __filename: false,
    __dirname: false
  },

  plugins: [
    new webpack.DefinePlugin({
      '__BROWSER__': false,
      '__DEV__': false
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),

    new webpack.BannerPlugin({
      banner: "require('source-map-support').install();process.env.NODE_ENV='production';",
      raw: true,
      entryOnly: true
    }),

    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      comments: false,
      compress: {
        warnings: false
      },
      /*mangle: false*/
    })
  ],

  stats: {
    colors: true,
    warnings: false
  }
  //stats:'verbose'
}
