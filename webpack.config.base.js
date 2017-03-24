const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/plugin.js',
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.js$/,
                use: [
                    'babel-loader'
                ]
            }
        ]
    },
    node: {
        fs: 'empty'
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
