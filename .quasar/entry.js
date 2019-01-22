/**
 * THIS FILE IS GENERATED AUTOMATICALLY.
 * DO NOT EDIT.
 *
 * You are probably looking on adding initialization code.
 * Use "quasar new plugin <name>" and add it there.
 * One plugin per concern. Then reference the file(s) in quasar.conf.js > plugins:
 * plugins: ['file', ...] // do not add ".js" extension to it.
 **/
import './quasar'

import Vue from 'vue'
Vue.config.productionTip = false


import 'quasar-extras/roboto-font'

import 'quasar-extras/material-icons'




import 'quasar-app-styl'


import 'src/css/app.styl'


import App from 'src/App'

import router from 'src/router'

import store from 'src/store'


const app = {
  el: '#q-app',
  router,
store,
  ...App
}


const plugins = []

import pluginI18n from 'src/plugins/i18n'
plugins.push(pluginI18n)

import pluginAxios from 'src/plugins/axios'
plugins.push(pluginAxios)

import pluginCircularjson from 'src/plugins/circular-json'
plugins.push(pluginCircularjson)

import pluginMapboxgl from 'src/plugins/mapbox-gl'
plugins.push(pluginMapboxgl)

import pluginMapboxglvue from 'src/plugins/mapbox-gl-vue'
plugins.push(pluginMapboxglvue)

import pluginVueawesome from 'src/plugins/vue-awesome'
plugins.push(pluginVueawesome)

import pluginVueimginputer from 'src/plugins/vue-img-inputer'
plugins.push(pluginVueimginputer)

import pluginVuesocketio from 'src/plugins/vue-socket.io'
plugins.push(pluginVuesocketio)

import pluginAlopuselect from 'src/plugins/alopuselect'
plugins.push(pluginAlopuselect)

import pluginVueresource from 'src/plugins/vue-resource'
plugins.push(pluginVueresource)

import pluginVue2mediumeditor from 'src/plugins/vue2-medium-editor'
plugins.push(pluginVue2mediumeditor)

import pluginVueuuid from 'src/plugins/vue-uuid'
plugins.push(pluginVueuuid)

import pluginEventHub from 'src/plugins/eventHub'
plugins.push(pluginEventHub)

import pluginGlobalCss from 'src/plugins/globalCss'
plugins.push(pluginGlobalCss)

import pluginVueparticles from 'src/plugins/vue-particles'
plugins.push(pluginVueparticles)

import pluginVuedraggable from 'src/plugins/vuedraggable'
plugins.push(pluginVuedraggable)

plugins.forEach(plugin => plugin({ app, router, store, Vue }))









new Vue(app)



