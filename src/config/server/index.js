/**
 * Created by Wu Jian Ping on 2017/05/10.
 */

import shared from './shared'
import allShared from '../shared'

let config = {}

if (!__BROWSER__) { // avoid import at client js by mistake
  let tmp = {}

  // dev
  if (__DEV__) {
    tmp.api = require('./dev/api')
  }
  // sit
  if (__SIT__) {
    tmp.api = require('./sit/api')
  }
  // uat
  if (__UAT__) {
    tmp.api = require('./uat/api')
  }
  // prod
  if (__PROD__) {
    tmp.api = require('./prod/api')
  }

  config = Object.assign({}, allShared, shared, tmp)
}

export default config
