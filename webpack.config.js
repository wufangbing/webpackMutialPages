const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

// noinspection WebpackConfigHighlighting
module.exports = {
    entry: {
        index: './src/js/index.js',
        login: './src/js/login.js',
    },
    output: {
        filename: "js/[name].[hash:8].js",   // 多出口
        path: path.resolve(__dirname, './dist'),
        chunkFilename: 'js/[name].js'
        // 引入资源前缀
        // publicPath: 'https://cdn.example.com/assets/'
    },
    // js代码切割
    optimization: {
        // splitChunks: {
        //     chunks: 'initial', // 只对入口文件处理
        //     cacheGroups: {
        //         vendor: { // split `node_modules`目录下被打包的代码到 `js/vendor.js && .css` 没找到可打包文件的话，则没有。css需要依赖 `ExtractTextPlugin`
        //             test: /node_modules\//,
        //             name: 'js/vendor',
        //             priority: 10,
        //             enforce: true
        //         },
        //         commons: { // split `common`和`components`目录下被打包的代码到`js/commons.js && .css`
        //             // test: /src\/commonjs\/|src\/components\//,
        //             test: /commonjs\/|components\//,
        //             name: 'js/commons',
        //             priority: 10,
        //             enforce: true
        //         }
        //     }
        // },
        splitChunks: {
            chunks: 'all'
        },
        runtimeChunk: true,
    },
    // 追踪错误,开发模式使用
    // devtool: 'inline-source-map',
    // 服务路径指向
    devServer: {
        contentBase: './dist/',
        port: 3000,
        compress: true, //服务器压缩
        open: true     // 自动打开
        // hot: true
    },
    module: {
        rules: [
            {
                // 用正则去匹配要用该 loader 转换的 SCSS 文件
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // 从 .js 文件中提取出来的 .css 文件的名称
            filename: `[name]_[contenthash:8].css`,
        }),
        // 删除dist
        new CleanWebpackPlugin(['./dist']),
        // html模板，打包
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: "./src/html/index.html", // 多页面也用同一个模板
            title: 'index',
            chunks: ['index'],                // 该页面引入的js
            hash: true, // 清理缓存
            minify: {
                removeAttributeQuotes: true, // 去除双引号
                collapseWhitespace: true     // 压缩为一行
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'login.html',
            template: "./src/html/login.html", // 多页面也用同一个模板
            title: 'login',
            chunks: ['login'],                // 该页面引入的js
            // hash: true, // 清理缓存
            minify: {
                removeAttributeQuotes: true, // 去除双引号
                collapseWhitespace: true     // 压缩为一行
            }
        }),
    ],
    mode: 'development',
    resolve: {}, // 解析规则
}