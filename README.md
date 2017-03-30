# Isomorphic-React
同构系统，同时支持服务器端渲染及客户端渲染，SEO友好

## 技术栈
- [react](https://facebook.github.io/react/)
- [react-router](https://github.com/ReactTraining/react-router/tree/v3/docs)
- [redux & react-redux](http://redux.js.org/docs/basics/UsageWithReact.html)
- [redux-thunk](https://github.com/gaearon/redux-thunk)
- [axios](https://github.com/mzabriskie/axios)
- [redial](https://github.com/markdalgleish/redial)
- [webpack](https://webpack.js.org/)
- [babel](https://babeljs.io/)
- [react-hot-loader](https://github.com/gaearon/react-hot-loader)
- [helmet](https://github.com/helmetjs/helmet)
- [react-helmet](https://github.com/nfl/react-helmet)
- [react-router-redux](https://github.com/reactjs/react-router-redux)
- [postcss](https://github.com/postcss/postcss)
- [less](http://lesscss.org/)
- [sass](http://sass-lang.com/)


## 安装

```shell
$ git clone https://github.com/wujjpp/isomorphic-react.git
$ cd isomorphic-react
$ npm install
```
NOTE: 执行`npm install`之前，先运行 `npm config set registry=http://registry.npm.taobao.org` 添加npm淘宝源，可以极大的加快npm包安装速度，减少因为网络原因带来的错误

## 运行&打包

#### 运行&开发
```shell
$ npm start
```

#### 打包
```shell
$ npm run build
```

#### 构建sit/uat/prod环境包
使用参数sit, uat或者prod进行打包，可以配置不同环境CDN路径， 没有使用CDN的情况下，请将`publicPath`改成 `/`
例如：
```shell
$ npm run build -- sit
```

```shell
$ npm run build -- uat
```

```shell
$ npm run build -- prod
```

NOTE：`--` 与 `prod`之间有个空格

通过修改 ___/tools/config.js___ 配置CDN
```javascript
const shared = {
  dist: 'build',
  frontPort: 3000,//前端服务端口
  backendPort: 9000//后端服务端口
}

const config = {
  dev: {
    //这里publicPath没有直接使用`/`, 是因为在开发环境下我们需要依赖sourceMap, 具体说明可以查看：https://github.com/webpack-contrib/style-loader#recommended-configuration
    publicPath: `http://127.0.0.1:${shared.frontPort}/`
  },
  sit: {
    //这里可以配置SIT环境CDN路径，打包完成后，将`/build/public`目录复制到CDN，完成CDN加速
    publicPath: '//sitcache.YourCDN.com/'
  },
  uat: {
    //这里可以配置UAT环境CDN路径，打包完成后，将`/build/public`目录复制到CDN，完成CDN加速
    publicPath: '//uatcache.YourCDN.com/'
  },
  prod: {
    //这里可以配置PROD环境CDN路径，打包完成后，将`/build/public`目录复制到CDN，完成CDN加速
    publicPath: '//cache.YourCDN.com/'
  }
}

export default Object.assign({}, shared, config)
```

#### 从打包结果目录运行程序
```shell
$ npm run start:dist
```

#### Clean
```shell
$ npm run clean
```

## 更新
```shell
$ git checkout master
$ git pull origin master
$ npm install
```

## 目录说明
```
.
├── /src/                       # 源码目录
│   ├── /actions/               # 存放redux actions
│   ├── /components             # 系统级组件   
│   ├── /configs/               # 系统运行配置文件
│   ├── /constants/             # 存放redux action常量
│   ├── /core/                  # 系统基础库
│   └── /reducers/              # 存放redux reducers
├── /routes/                    # The source code of the application
│   ├── /xxxx/                  # 存放router对应页面   
│   └── /index.js               # 路由配置
├── /server/                    # 存放服务端API router
├── /store/                     # redux store相关
├── /tools/                     # 构建相关
│   ├── /dev-tools/             # 开发者工具
│   ├── /lib/                   # 构建相关的辅助函数
│   ├── /loaders/               # 自定义webpack loader
│   ├── /webpacks/              # webpack相关配置
│   ├── config.js               # 构建配置参数
│   ├── postcss.config.js       # postcss-loader配置
│   └── <other>.js              # 构建相关脚本
└── package.json                # The list of 3rd party libraries and utilities
```
---

## 外围环境配置
- Web Storm 关闭 "safe write" , File -> Appearance & Behavior -> System Settings, 取消选中 "Use safe write (save changes to a temporary file first)"  
- 安装 [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?utm_source=chrome-app-launcher-info-dialog)
- 安装 [Redux Dev Tools Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?utm_source=chrome-app-launcher-info-dialog)

    NOTE: tools/dev-tools/chrome 包含以上两个开发工具的安装包，用chrome打开即可安装

Made with ♥ by Wu Jian Ping
