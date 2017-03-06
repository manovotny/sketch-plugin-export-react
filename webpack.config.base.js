const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/plugin.js',
    node: {
        fs: 'empty'
    },
    module: {
        rules: [
            {
                exclude: new RegExp(`node_modules(?:\\\\|/)(?!svgo)`),
                test: /\.js$/,
                use: [
                    'babel-loader'
                ]
            }
        ]
    },
    output: {
        filename: 'plugin.js'
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: 'src/manifest.json'
        }])
    ]
};
