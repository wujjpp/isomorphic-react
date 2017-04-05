/**
 * Created by Wu Jian Ping on 2017/2/8.
 */
import sharedConfig from './shared'
import devConfig from './config-dev'
import sitConfig from './config-sit'
import uatConfig from './config-uat'
import prodConfig from './config-prod'

let config = devConfig

if (__BROWSER__) {
  if (typeof(window) !== 'undefined' && window.__ENV__) {
    switch (window.__ENV__) {
      case 'sit':
        config = sitConfig
        break
      case 'uat':
        config = uatConfig
        break
      case 'prod':
        config = prodConfig
    }
  }
}

export default Object.assign({}, sharedConfig, config)
