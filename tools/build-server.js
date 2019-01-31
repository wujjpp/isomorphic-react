/**
 * Created by Wu Jian Ping on 2017/2/17.
 */
import webpack from 'webpack'
import chalk from 'chalk'
import { getPublicPath, logger, getEnv, createEnvDefinePlugin } from './libs/utils'
import { writeFile } from './libs/fs'
import webpackConfig from './webpack/server.build'
import config from './config'

const build = async env => {
  env = env || getEnv()
  webpackConfig.output.publicPath = (env === 'dev' ? '/' : getPublicPath(env))

  logger.chalk(`${chalk.blue('Server public path: ')}${webpackConfig.output.publicPath}`)

  webpackConfig.plugins.push(createEnvDefinePlugin(env))

  return new Promise((resolve, reject) => {
    webpack(webpackConfig, (err, stats) => {
      if (err) {
        reject(err)
      } else {
        console.log(stats.toString(webpackConfig.stats))
        writeFile(`${config.dist}/webpack-server-stats.json`, JSON.stringify(stats.toJson()))
        resolve()
      }
    })
  })
}

export default {
  name: 'build server',
  func: build
}
