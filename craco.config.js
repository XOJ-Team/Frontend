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
                        // modifyVars: { '@primary-color': '#41DCF' },
                        // modifyVars:getThemeVariables({dark:true}),
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
    //抽离公用模块
    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             commons: {
    //                 chunks: 'initial',
    //                 minChunks: 2, maxInitialRequests: 5,
    //                 minSize: 0
    //             },
    //             vendor: {
    //                 test: /node_modules/,
    //                 chunks: 'initial',
    //                 name: 'vendor',
    //                 priority: 10,
    //                 enforce: true

    //             }
    //         }
    //     }
    // }
};