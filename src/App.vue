<template lang="pug">
  #app
    navbar(:siteTitle="siteTitle")
    sidebar
    router-view(:siteTitle="siteTitle")
</template>

<script>
import nav from '@/components/nav'
import sidebar from '@/components/sidebar'
export default {
  name: 'app',
  data(){
    return {
      siteTitle: 'agora',
      entity: this.$store.state.entity,
      uuid: this._uid
    }
  },
  sockets: {
    connect: function(){
      console.log("socket connect vue side")
    },
    giveAuthenticate(ret) {
      console.log(ret)
      console.log("this.$store")
      console.log(this.$store)
      if(ret.entity && ret.auth){
        console.log("setting store user state to user")
        ret.entity.auth = true
        this.$store.commit('entitySet', ret.entity)
        // this.$store.commit('entityMessageUpdate', "welcome, <a href='/self'>" + (this.entity ? this.entity.username : 'anonymous') + "</a>")
        console.log(this.$store.state.entity)
      } else {
        this.$store.commit('entitySet',  {
          type: 'temporary',
          identity: 'anonymous',
          auth: false,
          username: undefined
        })
        if(ret.err){
          this.$store.commit('newAuthLog', {
            err: ret.err, 
            msg: 'something went wrong authorizing the user'
            })
        }
      }
    },
    giveRealms(ret){
      if(ret.id == this.uuid){
        console.log("setting reamls in store")
        console.log(ret)
        this.$store.commit('SetRealms', ret.realms)
        // this.$store.state.realms = ret.realms
      }
    }
  },
  created(){
    console.log("agora was created")
    this.$socket.emit('getRealms', {
      id: this.uuid,
      find: {},
      count: Infinity
    })
  },
  watch: {
    '$store.state.entity': function(){
      this.entity = this.$store.state.entity
    },
  },
  components: {
    'navbar' : nav,
    'sidebar' : sidebar
  }
}
</script>

<style lang="sass">
@import '~@/styles/vars'
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: $friendly
  margin-top: 60px
h1, h2 
  font-weight: normal

ul 
  list-style-type: none
  padding: 0

li 
  display: inline-block
  margin: 0 10px

a,
.action,
.fa-icon
  color: $green
  text-decoration: none
  cursor: pointer
  +animate(all, 300ms, ease)
  &:hover
    color: $greenhover
.fa-icon
  user-select: none
button,
.btn
  color: $green
  cursor: pointer
.content-editable
  outline: none
  padding: 5px
  &:focus
    // background: white
input
  color: $friendly
</style>
