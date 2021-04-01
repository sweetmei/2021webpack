/*
 * @Author: your name
 * @Date: 2021-03-30 15:52:51
 * @LastEditTime: 2021-04-01 11:30:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webpack\webpack.config.js
 */
//这个模块是为了将所有得文件目录编译成一个h5得入口js文件，将所有得样式与js引入
const HtmlWebpackPlugin = require('html-webpack-plugin');  //引入插件，不可漏掉！！！
const path = require('path');
module.exports = {
  entry: {
    login: __dirname + '/src/login/index.js',// page1的入口文件，webpack是以js为入口文件的
    welcome: __dirname + '/src/welcome/index.js',
  },
  mode: 'development',
  output: {
    path: __dirname + '/dist',//产出路径，一般放在dist目录下
    filename: 'js/[name]-[chunkhash].js',
    //把为入口文件放在dist目录的js文件夹下，
    //name是文件名，chunkhash是每次打包文件的hash值，
    //目的是如果哪个文件修改，chunkhash会改变，可以只上线修改过的文件
    // publicPath: 'http://cdn.com/' //如果上线，可以改为线上地址
  },
  devServer: {
    host: '127.0.0.1',
    port: 8088,
    inline: true,
    open: true,   //自动打开浏览器
    hot: false,   //慎用！打开热更新，会导致修改样式可能不支持。关闭热更新，页面会强刷
    contentBase: path.join(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'login.html',//入口html
      template: './src/login/index.html',
      minify: {
        // removeComments:true,   //删除注释
        // collapseWhitespace: true      //删除空格，压缩
      },
      chunks: ['login']  //对应entry的入口js.这样可以按需加载js
    }),
    new HtmlWebpackPlugin({
      filename: 'welcome.html',
      template: './src/welcome/index.html',
      minify: {
        // removeComments:true,   //删除注释
        // collapseWhitespace: true      //删除空格，压缩
      },
      chunks: ['welcome']
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          { loader: "style-loader" },
          {
            loader: 'css-loader?importLoaders=2',
            options: {
              minimize: true //css压缩
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('autoprefixer')({
                    browsers: ["last 5 versions"]
                  }), //添加浏览器前缀
                ];
              }
            }
          },
          { loader: "sass-loader", }
        ],
        exclude: /node_modules/
      },
    ],
  },


}