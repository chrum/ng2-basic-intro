var path = require ('path');
var webpack = require ('webpack');
var nodeModules = path.resolve(__dirname, 'node_modules');

module.exports = {
    devtool: 'inline-source-map',
    entry: [
        './src/app.js'
    ],
    output: {
        filename: '[name].bundle.js',
        publicPath: '',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        loaders: [
            {
                test: /\.js$/, exclude: [/node_modules/],
                loader: 'babel',
                query: {
                    plugins: ['transform-runtime', 'transform-decorators-legacy'],
                    presets: ['es2015']
                }
            },
            {test: /\.html$/, loader: 'raw'}
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin ({
            name: 'vendor',
            /**
             *
             * @param module
             * @param count
             * @returns {boolean} true - to include file in vendor
             */
            minChunks: function (module) {
                if (module.resource) {
                    if (module.resource.indexOf(path.resolve(__dirname, 'src')) === -1) {
                        return true;
                    }
                }

                return false;
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({name: 'meta', chunks: ['vendor']})
    ],
    devServer: {
        contentBase: "./dist",
        noInfo: false,
        hot: false
    },
    resolve: {
        alias: {
            components: path.resolve(__dirname, 'src/components')
        }
    }
};
