'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    ENV_CONFIG: '"dev"',
    // BASE_API: '"http://192.168.0.133:10200"',
    BASE_API: '"https://dev-gather-api.hzhengji.cn/"',
    // BASE_API: '"http://wenda-api.hzhengji.cn/"'
})
