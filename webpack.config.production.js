const path = require('path');

const baseConfig = require('./webpack.config.base');
const commonConfig = require('./webpack.config.common');

const config = Object.create(baseConfig);

config.output.path = path.join('dist', commonConfig.pluginName);

module.exports = config;
