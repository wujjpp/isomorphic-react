/**
 * Created by Wu Jian Ping on 2017/2/9.
 */
import webpack, {
  HotModuleReplacementPlugin
} from 'webpack'
import path from 'path'


import marked from "marked"
import config from '../config'

const renderer = new marked.Renderer()

export default {
  target: 'node',
  devtool: 'eval-source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  entry: './src/server.js',

  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: './.cache/babel-loader'
          }
        }],
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
            name: '[path][name].[ext]',
            emitFile: false
          }
        }]
      },

      {
        test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            emitFile: false
          }
        }]
      },

      {
        test: /\.(woff2?|ttf|eot|svg)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
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
        // the module name start with ('@' or 'a-z') character and contains 'a-z' or '/' or '.' or '-' or '0-9'
        request.match(/^[@a-z][a-z/.\-0-9]*$/i)
        //NOTE: only internal resource can pass to loader
        // not stylesheet
        &&
        !request.match(/\.(css|less|scss)$/i)

      //console.log(request + '--------' + Boolean(isExternal))

      callback(null, Boolean(isExternal))
    },
  ],

  resolveLoader: {
    alias: {}
  },

  node: {
    __filename: false,
    __dirname: false
  },

  plugins: [
    new webpack.DefinePlugin({
      '__BROWSER__': false,
      '__DEV__': true
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),

    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install()',
      raw: true,
      entryOnly: false
    }),

    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
  ],

  stats: {
    colors: true,
    warnings: false
  }
}
