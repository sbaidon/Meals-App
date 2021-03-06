import 'babel-polyfill'
import Vue from 'vue'


Vue.config.productionTip = false

var testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().forEach(testsContext)

var srcContext = require.context('../src', true, /^\.\/(?!main(\.js)?$)/)
srcContext.keys().forEach(srcContext)