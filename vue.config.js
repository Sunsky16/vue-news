const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const themePath = path.join(__dirname, './src/theme.less')

module.exports = defineConfig({
    //没上线，这可以让打包后的网页可以打开
    publicPath: './',
    transpileDependencies: true,
    //关闭命名检查
    lintOnSave: false,
    css: {
        loaderOptions: {
            less: {
                // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
                modifyVars: {
                    // 直接覆盖变量，这样改的缺点是：每次修改完都要重启
                    // 'text-color': '#fff',
                    // 'border-color': '#eee',
                    // 'nav-bar-background-color': 'red',
                    // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
                    hack: `true; @import "${themePath}";`,
                },
            },
        },
    },
})