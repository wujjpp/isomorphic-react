/**
 * Created by Wu Jian Ping on 2017/2/18.
 */

const shared = {
  dist: 'dist',
  frontPort: 3000, //前端服务端口
  backendPort: 9000 //后端服务端口
}

const config = {
  dev: {
    //这里publicPath没有直接使用`/`, 是因为在开发环境下我们需要依赖sourceMap, 具体说明可以查看：https://github.com/webpack-contrib/style-loader#recommended-configuration
    publicPath: `http://127.0.0.1:${shared.frontPort}/`
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
