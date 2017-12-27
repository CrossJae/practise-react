## 练习

* 每次要切换webpack.config.js中的入口文件的文件名
```
entry: [
  'webpack-dev-server/client?http://127.0.0.1:8080', // WebpackDevServer host and port
  'webpack/hot/only-dev-server',
  './entry/demo1.jsx' // Your appʼs entry point
],
```

* demo1 - 子组件向父组件通信
* demo2 - 跨级通信
