/**
 * Created by Wu Jian Ping on 2017/2/17.
 */

import { cleanDir } from './libs/fs'
import config from './config'

function clean() {
  return Promise.all([
    cleanDir(config.dist, {
      nosort: true,
      dot: true
    })
  ])
}

export default {
  name: 'clean',
  func: clean
}
