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

import pluginAlopuselect from 'src/plugins/alopuselect'
plugins.push(pluginAlopuselect)

import pluginAxios from 'src/plugins/axios'
plugins.push(pluginAxios)

import pluginCircularjson from 'src/plugins/circular-json'
plugins.push(pluginCircularjson)

import pluginGlobalCss from 'src/plugins/globalCss'
plugins.push(pluginGlobalCss)

import pluginI18n from 'src/plugins/i18n'
plugins.push(pluginI18n)

import pluginMapboxglvue from 'src/plugins/mapbox-gl-vue'
plugins.push(pluginMapboxglvue)

import pluginMapboxgl from 'src/plugins/mapbox-gl'
plugins.push(pluginMapboxgl)

import pluginScrollTo from 'src/plugins/scrollTo'
plugins.push(pluginScrollTo)

import pluginVueawesome from 'src/plugins/vue-awesome'
plugins.push(pluginVueawesome)

import pluginVueimginputer from 'src/plugins/vue-img-inputer'
plugins.push(pluginVueimginputer)

import pluginVueparticles from 'src/plugins/vue-particles'
plugins.push(pluginVueparticles)

import pluginVueresource from 'src/plugins/vue-resource'
plugins.push(pluginVueresource)

import pluginVuesocketio from 'src/plugins/vue-socket.io'
plugins.push(pluginVuesocketio)

import pluginVueuuid from 'src/plugins/vue-uuid'
plugins.push(pluginVueuuid)

import pluginVue2mediumeditor from 'src/plugins/vue2-medium-editor'
plugins.push(pluginVue2mediumeditor)

import pluginVuedraggable from 'src/plugins/vuedraggable'
plugins.push(pluginVuedraggable)

import pluginZeventHub from 'src/plugins/zeventHub'
plugins.push(pluginZeventHub)

plugins.forEach(plugin => plugin({ app, router, store, Vue }))









new Vue(app)



