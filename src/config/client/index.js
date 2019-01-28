/**
 * Created by Wu Jian Ping on 2017/05/10.
 */

import shared from './shared'
import allShared from '../shared'

let config = {}

if (__BROWSER__) {
  let tmp = {}

  // dev
  if (__DEV__) {
    tmp.endpoints = require('./dev/endpoints')
  }
  // sit
  if (__SIT__) {
    tmp.endpoints = require('./sit/endpoints')
  }
  // sit
  if (__UAT__) {
    tmp.endpoints = require('./uat/endpoints')
  }
  // prod
  if (__PROD__) {
    tmp.endpoints = require('./prod/endpoints')
  }
  config = Object.assign({}, allShared, shared, tmp)
}

export default config
