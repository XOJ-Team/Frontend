/* craco.config.js */
const CracoLessPlugin = require('craco-less');
const { getThemeVariables } = require('antd/dist/theme');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
var DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const CracoVtkPlugin = require("craco-vtk");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require('webpack');

// 设置craco
module.exports = {
    "resolve": {
        "alias": {
            "react": "preact-compat",
            "react-dom": "preact-compat"
        }
    },
    plugins: [
        {
            plugin: [
                CracoLessPlugin,
                CracoVtkPlugin()
            ],
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#CE57C1',
                            '@link-color': '#CE57C1'
                        },
                        // modifyVars:getThemeVariables({dark:true}),
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
    webpack: {
        plugins: [
            // bundle size analyzer & visualization
            // new BundleAnalyzerPlugin({
            //     analyzerMode: 'server',
            //     analyzerHost: '127.0.0.1',
            //     analyzerPort: 8888,
            //     openAnalyzer: true
            // }),
            // specify production build
            new webpack.DefinePlugin({ // <-- key to reducing React's size
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            // bundle gzip compression plugin
            new CompressionWebpackPlugin({
                algorithm: 'gzip',
                test: new RegExp(
                    '\\.(' +
                    ['js', 'css'].join('|') +
                    ')$'
                ),
                threshold: 1024,
                minRatio: 0.8
            }),
            // duplicate package checker
            new DuplicatePackageCheckerPlugin(),
            // webpack bundling progress visualizer
            new SimpleProgressWebpackPlugin(),
            // pack en-us only for moment.js
            new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en-us/)
        ],
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin(),
                new UglifyJsPlugin()
            ],
        },
        // configure: (webpackConfig, { env, paths }) =>{
        //     webpackConfig.plugins.push(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en-us/));
        // }
    },
    babel: {
        plugins: [
            ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }],
            ['@babel/plugin-proposal-decorators', { legacy: true }]
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                common: {
                    name: 'chunk-common',
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/](react|react-dom|react-router|redux-saga|dva|react-router-dom|draft-js\/lib|core-js|@antv\/data-set\/build|)[\\/]/,
                    priority: -10,
                },
                antd: {
                    name: 'chunk-antd',
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/](@ant-design|antd|moment|immutable\/dist|rc-calendar\/es|braft-finder\/dist|lodash|rc-tree\/es)[\\/]/,
                    priority: -11,
                },
                commons: {
                    chunks: 'initial',
                    minChunks: 2, maxInitialRequests: 5,
                    minSize: 0
                },
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    priority: 10,
                    enforce: true
                }
            }
        }
    }
};