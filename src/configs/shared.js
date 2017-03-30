/**
 * Created by Wu Jian Ping on 2017/2/9.
 */

let config = {};

// -----------------------------------
// other shared config goes here

config.custom1 = 'custom val 1'

// ------------------------------------

if (__BROWSER__) {
  if (typeof window !== 'undefined' && window.location) {
    config.apiRoot = `${window.location.protocol}//${window.location.host}`
  }
}

if (!__BROWSER__) {
  let port = require('../../settings').default.backendPort
  config.apiRoot = `http://127.0.0.1:${port}`
}

export default config
