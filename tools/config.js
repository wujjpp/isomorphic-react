/**
 * Created by Wu Jian Ping on 2017/2/18.
 */

import shared from '../settings'

const config = {
  dev: {
    //这里publicPath没有直接使用`/`, 是因为在开发环境下我们需要依赖sourceMap, 具体说明可以查看：https://github.com/webpack-contrib/style-loader#recommended-configuration
    // publicPath: 'http://localhost:' + shared.frontPort + '/'
    publicPath: '/'
  },
  sit: {
    //这里可以配置SIT环境CDN路径，打包完成后，将`/dist/public`目录复制到CDN，完成CDN加速
    publicPath: '//sitcache.YourCDN.com/'
  },
  uat: {
    //这里可以配置UAT环境CDN路径，打包完成后，将`/dist/public`目录复制到CDN，完成CDN加速
    publicPath: '//uatcache.YourCDN.com/'
  },
  prod: {
    //这里可以配置PROD环境CDN路径，打包完成后，将`/dist/public`目录复制到CDN，完成CDN加速
    publicPath: '//cache.YourCDN.com/'
  }
}

export default Object.assign({}, shared, config)
