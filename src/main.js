// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import socketio from 'socket.io-client'
import VueSocketIo from 'vue-socket.io'
var SocketInstance = socketio('http://uberagoraserver.dev')
Vue.use(VueSocketIo, SocketInstance)
// Vue.use(VueSocketIo, 'http://uberagoraserver.dev')
Vue.use(Vuex)
Vue.config.productionTip = false
import storeOpts from './store'
const store = new Vuex.Store(storeOpts)
/* eslint-disable no-new */
//import all icons if you don't care about bundle size
import 'vue-awesome/icons'
/* Register component with one of 2 methods */
import Icon from 'vue-awesome/components/Icon'
Vue.component('icon', Icon)

// vue-select for selection inputs
import vSelect from 'vue-select'
Vue.component('v-select', vSelect)

import VueImgInputer from 'vue-img-inputer'
Vue.component('VueImgInputer', VueImgInputer)

import editor from 'vue2-medium-editor'
Vue.component('medium-editor', editor)

import inventory from '@/components/inventory'
Vue.component('inventory', inventory)

import resource from '@/components/resource'
Vue.component('resource', resource)

import feed from '@/components/feed'
Vue.component('feed', feed)

// css
require('./styles/css/medium-editor.min.css')
const eventHub = new Vue()

Vue.mixin({
  data: function(){
    return {
      eventHub: eventHub
    }
  }
})

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})

