const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    // JavaScript 执行入口文件
    entry: './main.js',
    output: {
        // 把所有依赖的模块合并输出到一个 bundle.js 文件
        filename: 'bundle.js',
        // 输出文件都放到 dist 目录下
        path: path.resolve(__dirname, './dist'),
        // 引入资源前缀
        // publicPath: 'https://cdn.example.com/assets/'
    },
    // 追踪错误
    devtool: 'inline-source-map',
    // 服务路径指向
   devServer: {
     contentBase: './dist/'
   },
    module: {
        rules: [
            {
                // 用正则去匹配要用该 loader 转换的 CSS 文件
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader?minimize'],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // 从 .js 文件中提取出来的 .css 文件的名称
            filename: `[name]_[contenthash:8].css`,
        }),
        // 删除dist
        // new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: "./index.html",
        })
    ]
};