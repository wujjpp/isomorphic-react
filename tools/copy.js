/**
 * Created by Wu Jian Ping on 2017/3/30.
 */

import {
  writeFile,
  makeDir,
  copyDir
} from './libs/fs'
import pkg from '../package.json'
import config from './config'

async function copyEnvConfig({env}) {
  await makeDir(config.dist)
  await writeFile(`${config.dist}/env.json`, JSON.stringify({
    env
  }))
}

export var copyEnvConfig = {
  name: 'generate env.json',
  func: copyEnvConfig
}

async function copyPkg() {

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

export var copyPkg = {
  name: 'generate package.json',
  func: copyPkg
}

async function copyPublic() {
  await makeDir(config.dist)
  await copyDir('public', `${config.dist}/public`)
  await copyDir('src/views', `${config.dist}/views`)
}

export var copyPublic = {
  name: 'copy assets in public folder',
  func: copyPublic
}
