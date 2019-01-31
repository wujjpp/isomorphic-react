# Isomorphic-React

同构系统，支持服务器端渲染及客户端渲染，对SEO友好。
前端支持HMR, 后端支持livereload
为什么需要同构系统，需要补脑的[这边走](http://nerds.airbnb.com/isomorphic-javascript-future-web-apps/)

[![Build Status](https://travis-ci.org/wujjpp/isomorphic-react.svg?branch=master)](https://travis-ci.org/wujjpp/isomorphic-react)

## 技术栈

- [webpack 4](https://webpack.js.org/)
- [babel 7](https://babeljs.io/)
- [react 16](https://facebook.github.io/react/)
- [react-router 4](https://github.com/ReactTraining/react-router/tree/v3/docs)
- [redux 4 & react-redux 6](http://redux.js.org/docs/basics/UsageWithReact.html)
- [redux-thunk](https://github.com/gaearon/redux-thunk)
- [react-helmet](https://github.com/nfl/react-helmet)
- [axios](https://github.com/mzabriskie/axios)
- [helmet](https://github.com/helmetjs/helmet)
- [Browsersync](https://browsersync.io/docs)
- [postcss](https://github.com/postcss/postcss)
- [less](http://lesscss.org/)
- [sass](http://sass-lang.com/)

## 安装

```shell
$ git clone https://github.com/wujjpp/isomorphic-react.git
$ cd isomorphic-react
$ npm install
```

NOTE: 执行`npm install`之前，先运行 `npm config set registry=http://registry.npm.taobao.org` 添加npm淘宝源，可以极大的加快npm包安装速度，减少因为网络原因带来的错误，安装过程中假如出现node-sass下载xxxxx_binding.node失败情况，可以手动从[淘宝镜像](https://npm.taobao.org/mirrors/node-sass/)下载对应平台的.node文件，然后改名为`binding.node`复制到`/node_modules/node-sass/vendor/xxxxx/`目录下。

## 运行&打包

### 运行&开发

```shell
$ npm start
```

### 打包

```shell
$ npm run build
```

### 构建sit/uat/prod环境包

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
import shared from '../settings'

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

### 从dist运行程序

```shell
$ npm run start:dist
```

### eslint检查

```shell
$ npm run eslint
```

### Clean

```shell
$ npm run clean
```

## 关于条件编译

**IMPORTANT**：请记住，你写的React Component是要能同时运行在服务端和客户端，然而有些前端插件（实际上是大部分jquery插件）是没法运行在服务器端的，
所以我们定义了2个条件变量用于区分环境，正确使用这两个变量，可以让你愉快的使用大部分纯前端插件。

___/tools/webpack/client.build.js___
```javascript
...
plugins: [
  new webpack.DefinePlugin({
    '__BROWSER__': true,
    '__DEV__': false
  }),
  ...
]  
...
```

你可以使用这2个变量进行条件编译

例如: 在文件 `/src/routes/test/Test.js`中, 我们使用 `__BROWSER__` 变量通知构建工具 `jquery.easypiechart` 和 `toastr` 这两个包只有在前端文件打包的时候才需要包含, 实际上这两个包在服务器端也没什么用。

___/src/routes/test/Test.js___

```javascript
if (__BROWSER__) {
  require('easy-pie-chart/dist/jquery.easypiechart')
  var toastr = require('toastr')
}

class Test extends Component {
  constructor(props, context) {
    ...
    this.updateChart = this.updateChart.bind(this)
  }
  ...
  componentDidMount(){    
    $('.chart').easyPieChart({
      easing: 'easeOutBounce',
      onStep: function(from, to, percent) {
        $(this.el).find('.percent').text(Math.round(percent))
      }
    })
    this.chart = $('.chart').data('easyPieChart');
    this.chart.update(Math.random() * 200 - 100)
  }
  ...

  updateChart() {
    this.chart.update(Math.random() * 200 - 100)
  }

  showToastr() {
    toastr.success('Have fun storming the castle!', 'Miracle Max Says')
  }
  ..
}

```

同样我们在`/src/store/configureStore.js`中使用`__BROWSER__`和`__DEV__`两个变量来决定只有在开发环境和浏览器环境下需要挂载`Redux Dev Tools Extension`， 别忘了configureStore作为redux的store配置组件，同样是需要运行在服务器端的

## 分析 webpack stats

构建完成之后就结束了吗？没有，我们集成了bundle文件分析工具，试着在控制台下敲入下面3条命令。你会喜欢的。

```shell
$ npm run analyse:client
```

```shell
$ npm run analyse:server
```

```shell
$ npm run analyse
```

## Browsersync

打开[http://localhost:3001](http://localhost:3001)可配置[Browsersync](https://browsersync.io/docs)

## 更新源码

```shell
$ git checkout master
$ git pull origin master
$ npm install
```

## 目录说明

```
.
├── /build/                         # dist目录
├── /public/                        # 存放静态资源(favicon.ico, robots.txt等，图片不需要放这里)
├── /src/                           # 源码目录
│   ├── /actions/                   # 存放redux actions
│   ├── /components                 # 系统级组件   
│   ├── /configs/                   # 前端运行配置文件，不同环境配置文件单独存放
│   ├── /constants/                 # 存放redux action常量
│   ├── /core/                      # 系统基础库
│   ├── /reducers/                  # 存放redux reducers
│   ├── /routes/                    # 路由&页面，需要补脑的走这里https://github.com/ReactTraining/react-router/tree/v3/examples/huge-apps
│   │   ├── /home/                  # route home
│   │   │   ├──/images/             # 页面级图片资源
│   │   │   ├──/components/         # components
│   │   │   ├──/containers/         # containers
│   │   │   ├──/xxx.scss(less)      # 页面级样式
│   │   │   └──/index.js            # 动态路由配置文件
│   │   ├── /xxxx/                  # route xxxx
│   │   │   ├──/components/         # components
│   │   │   ├──/containers/         # containers
│   │   │   └──/index.js            # 动态路由配置文件
│   │   └── /index.js               # 动态路由配置文件
│   └── /server.js                  # 服务端入口
│   ├── /server/                    # 存放只运行在服务端的代码，例如:RESTful API
│   ├── /store/                     # Redux store
│   ├── /styles/                    # 全局样式
│   ├── /client.js                  # 前端入口js
│   └── /server.js                  # 服务端入口
├── /tools/                         # 构建相关
│   ├── /analyse/                   # webpack stats分析工具
│   ├── /dev-tools/                 # 开发者工具
│   ├── /libs/                      # 构建相关的辅助库
│   ├── /loaders/                   # 自定义webpack loader
│   ├── /webpacks/                  # webpack相关配置
│   ├── /build-client.js            # 客户端构建脚本
│   ├── /build-server.js            # 服务端构建脚本
│   ├── /build.js                   # 统一构建脚本
│   ├── /clean.js                   # 清理脚本
│   ├── /config.js                  # 构建配置参数
│   ├── /copy.js                    # 复制静态资源、复制构建资源等
│   ├── /postcss.config.js          # postcss-loader配置
│   ├── /run.js                     # 执行任务脚本
│   ├── /start.js                   # 启动开发脚本
│   └── /watch.js                   # watch & copy
├── settings.js                     # dist目录，服务器端口设置
└── package.json                    # The list of 3rd party libraries and utilities
```

## 外围环境配置

- Web Storm 关闭 "safe write" , File -> Appearance & Behavior -> System Settings, 取消选中 "Use safe write (save changes to a temporary file first)"  
- 安装 [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?utm_source=chrome-app-launcher-info-dialog)
- 安装 [Redux Dev Tools Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?utm_source=chrome-app-launcher-info-dialog)

    NOTE: `tools/dev-tools/chrome` 包含以上两个开发工具的安装包，用chrome打开即可安装

## 不喜欢React？ 没关系，看看基于Marko和Vue版的同构脚手架

- [isomorphic-marko](https://github.com/wujjpp/isomorphic-marko) 
    NOTE: 服务端的渲染速度相对于React、Vue来说，[Marko](https://github.com/marko-js/marko)还是非常乐观的。

- [isomorphic-vue](https://github.com/wujjpp/isomorphic-vue)

Made with ♥ by Wu Jian Ping

Feel free to contact me if you have any problem [830390@qq.com](mailto:830390@qq.com)
