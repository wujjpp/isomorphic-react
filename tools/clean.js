/**
 * Created by JP on 2017/2/17.
 */

import {cleanDir} from './lib/fs'

function clean() {
  return Promise.all([
    cleanDir('dist', {
      nosort: true,
      dot: true
    }),

    cleanDir('.tmp/*', {
      nosort: true,
      dot: true,
      ignore: ['.tmp/.cache'],
    }),
  ])
}

export default {
  name: 'clean',
  func: clean
}
