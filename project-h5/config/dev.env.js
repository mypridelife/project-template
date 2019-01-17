'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
    // BASE_API: '"http://yapi.hzhengji.cn/mock/41/"'
  BASE_API: '"http://192.168.0.133:10000/"'
  // BASE_API: '"http://databoard-api.gengyunkj.com/"'
  // BASE_API: '"http://dev-databoard-api.hzhengji.cn/"'
})
