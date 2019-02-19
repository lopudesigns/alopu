import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

const Router = new VueRouter({
  /*
   * NOTE! Change Vue Router mode from quasar.conf.js -> build -> vueRouterMode
   *
   * If you decide to go with "history" mode, please also set "build.publicPath"
   * to something other than an empty string.
   * Example: '/' instead of ''
   */

  // Leave as is and change from quasar.conf.js instead!
  mode: process.env.VUE_ROUTER_MODE,
	base: process.env.VUE_ROUTER_BASE,
	// scrollBehavior(to, from){
	// 	return { y: 0 }
	// },
	scrollBehavior (to, from, savedPosition) {
		//https://router.vuejs.org/guide/advanced/scroll-behavior.html
		if (to.hash) {
			return { selector: to.hash }
		} else if (savedPosition) {
			return savedPosition;
		} else {
			return { x: 0, y: 0 }
		}
	},
  routes
})

export default Router
