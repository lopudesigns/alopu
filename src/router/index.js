import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import realm from '@/components/realm'
import realms from '@/components/realms'
import inventory from '@/components/inventory'
import register from '@/components/register'
import logout from '@/components/logout'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/realms',
      name: 'realms',
      component: realms
    },
    {
      path: '/realms/:realm',
      name: 'realm',
      component: realm
    },
    {
      path: '/forum',
      name: 'forum',
      component: inventory,
      props: {
        realms: ['posts'],
        options: ['no-text', 'put-first', 'put-new-resources-first', 'wide-adder', 'rounded', 'default-new-resource'],
        newResourceOptions: ['editing', 'no-delete'],
        count: 25
      }
    },
    {
      path: '/market',
      name: 'market',
      component: inventory,
      props: {
        realms: ['posts', 'commerce', 'market'],
        options: ['no-text', 'put-first', 'put-new-resources-first', 'wide-adder', 'rounded', 'default-new-resource'],
        newResourceOptions: ['editing', 'no-delete'],
        count: 25
      }
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/logout',
      name: 'logout',
      component: logout
    }
  ],
  mode: 'history'
  // ,redirect() {
  //   return {
  //     '*': '/'
  //   }
  // }
})


