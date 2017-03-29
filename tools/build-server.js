/**
 * Created by Wu Jian Ping on 2017/2/17.
 */
import webpack from 'webpack'
import chalk from 'chalk'
import {getPublicPath, logger, getEnv} from './lib/utils'

import config from './webpack/server.build'

async function build(env) {

  env = env || getEnv()
  config.output.publicPath = (env === 'dev' ? '/' : getPublicPath(env))

  logger.chalk(`${chalk.blue('Server public path: ')}${config.output.publicPath}`)

  return new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
      if (err) {
        reject(err)
      } else {
        console.log(stats.toString(config.stats))
        resolve()
      }
    })
  })
}

export default {
  name: 'build server',
  func: build
}
