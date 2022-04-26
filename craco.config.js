/* craco.config.js */
const CracoLessPlugin = require('craco-less');
const { getThemeVariables } = require('antd/dist/theme');
// 设置craco
module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { 
                            '@primary-color': '#CE57C1',
                            '@link-color':'#CE57C1'
                    },
                        // modifyVars:getThemeVariables({dark:true}),
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
    //抽离公用模块
    optimization: {
        splitChunks: {
            chunks:'all',
            name:true,
            automaticNameDelimiter:'-',
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    priority: -10,
                    enforce: true
                },
                default:{
                    minChunks:2,
                    priority:-20,
                    reuseExistingChink:true,
                }
            }
        }
    }
};