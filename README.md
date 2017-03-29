# Isomorphic-React
同构系统，同时支持服务器端渲染及客户端渲染，SEO友好

## 安装

```shell
$ git clone https://github.com/wujjpp/isomorphic-react.git
$ cd isomorphic-react
$ npm install
```
NOTE: 执行`npm install`之前，先运行 `npm config set registry=http://registry.npm.taobao.org` 添加npm淘宝源，可以极大的加快npm包安装速度，减少错误

## 编译&运行
- 开发&调试：`npm start`
- 编译：`npm run build`

      构建sit环境包：  `npm run build -- sit`
      构建uat环境包：  `npm run build -- uat`
      构建prod环境包： `npm run build -- prod`

      注意： "--" 与 "环境参数(sit,uat,prod)"之间有个空格

- 运行dist: `npm run start:dist`
- clean: `npm run clean`
- eslint: `npm run lint:js`

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
│   ├── /webpacks/              # 构建相关配置
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

## 相关资料
- [React](https://facebook.github.io/react/docs/installation.html)
- 关于 Container 和 Presentational Component的几篇文章
   >https://segmentfault.com/a/1190000007786080
   >http://www.tuicool.com/articles/uqey6f
   >https://medium.com/@learnreact/container-components-c0e67432e005
   >https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
- [React Router](https://github.com/ReactTraining/react-router/tree/v3/docs)   
- [Redux](https://github.com/reactjs/redux)
- [React Redux](https://github.com/reactjs/react-redux)
- [Babel](https://babeljs.io/)
- [Webpack](https://webpack.js.org/configuration/)

Made with ♥ by Wu Jian Ping
