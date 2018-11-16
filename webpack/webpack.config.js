const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/main.js', // 入口, 可以为相对路径, 当然绝对路径也没错
  output: { // 输出配置
    path: path.join(__dirname, './dist'), // 输出的目录
    filename: 'bundle.js' // 输出的文件名
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "less-loader" }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ]
      }
    ]
  },
  // module: {
  //   rules: [
  //     // loader的加载顺序是从右到左的
  //     // css-loader是帮助webpack编译css文件. 而style-loader是将最终编译的结果放到HTML中生效
  //     { test: /\.css$/, use: ['style-loader', 'css-loader'] }
  //   ]
  // },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HTMLWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      filename: 'index.html'
    })
  ], // methods: {}  filters: {}  props:[]
  devServer: {
    // contentBase: path.join(__dirname, "src"),
    compress: true,
    // host: '0.0.0.0',
    port: 3000,
    open: true,
    // hot: true
  },
  mode: 'development' // 打包的模式, production | development
}