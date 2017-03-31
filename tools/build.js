/**
 * Created by Wu Jian Ping on 2017/2/17.
 */
import run from './run'
import clean from './clean'
import config from './config'
import { copyEnvConfig, copyPublic, copyPkg } from './copy'
import buildClient from './build-client'
import buildServer from './build-server'
import {
  getEnv
} from './libs/utils'

async function build() {
  const env = getEnv()

  await run(clean)
  await run(copyPublic)
  await run(copyEnvConfig, {
    env: env
  })
  await run(copyPkg)

  await run(buildClient, env)
  await run(buildServer, env)
}

export default {
  name: 'build all',
  func: build
}
