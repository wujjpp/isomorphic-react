/**
 * Created by JP on 2017/2/8.
 */
import sharedConfig from './shared'
import devConfig from './config-dev'
import prodConfig from './config-prod'

let config = devConfig

if (__BROWSER__) {
  if (typeof(window) !== 'undefined' && window.__ENV__) {
    switch (window.__ENV__) {
      case 'prod':
        config = prodConfig
    }
  }
}

export default Object.assign({}, sharedConfig, config)
