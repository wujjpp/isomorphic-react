/**
 * Created by JP on 2017/2/18.
 */

const shared = {
  dist: 'dist',
  frontPort: 3000,//前端服务端口
  backendPort: 9000//后端服务端口
}

const config = {
  dev: {
    publicPath: `http://127.0.0.1:${shared.frontPort}/`
    // publicPath: `public/`
  },
  prod: {
    publicPath: '//cache.YourCDN.com/'
  }
}

export default Object.assign({}, shared, config)
