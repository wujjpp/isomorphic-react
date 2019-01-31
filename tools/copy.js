/**
 * Created by Wu Jian Ping on 2017/3/30.
 */

import { writeFile, makeDir, copyDir } from './libs/fs'
import pkg from '../package.json'
import config from './config'

export const copyEnvConfig = {
  name: 'generate env.json',
  func: async env => {
    await makeDir(config.dist)
    await writeFile(`${config.dist}/env.json`, JSON.stringify({
      env
    }))
  }
}

export const copyPkg = {
  name: 'generate package.json',
  func: async () => {

    await makeDir(`${config.dist}`)

    //generate package.json
    await writeFile(`${config.dist}/package.json`, JSON.stringify({
      private: true,
      engines: pkg.engines,
      dependencies: pkg.dependencies,
      scripts: {
        start: 'node server.js',
      },
    }, null, 2))
  }
}

export const copyPublic = {
  name: 'copy assets in public folder',
  func: async () => {
    await makeDir(config.dist)
    await copyDir('public', `${config.dist}/public`)
    await copyDir('src/views', `${config.dist}/views`)
  }
}

export const copyAssets = { // eslint-disable-line
  name: 'generated assets.json',
  func: async obj => {
    await writeFile('src/assets.json', JSON.stringify(obj, null, 2))
  }
}

