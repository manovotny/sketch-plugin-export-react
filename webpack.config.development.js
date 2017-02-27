const path = require('path');

const expandTilde = require('expand-tilde');

const baseConfig = require('./webpack.config.base');
const commonConfig = require('./webpack.config.common');

const config = Object.create(baseConfig);

config.output.path = path.join(expandTilde('~'), 'Library/Application Support/com.bohemiancoding.sketch3/Plugins', commonConfig.pluginName);

module.exports = config;
