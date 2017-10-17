<template lang='pug'>
  .nav
    .nav-positioner(v-if="nav")
      .brand-container
        a(href="/").brand {{ nav.siteTitle }}
      //- .debug {{ user }}
      .welcome-message-container(v-if="entity")
        .welcome-message welcome, 
          a(href="/self") {{ entity.username || entity.identity }}
      .actions-group-container
        .actions-container(v-if="nav.actionGroups && nav.actionGroups.length > 0" v-for="actionsGroup in nav.actionGroups")
          .action(
            v-if="((action.auth.indexOf('user') >= 0) ? entity.auth : true) && (action.auth.indexOf('nouser') >= 0 ? !entity.auth : true)" 
            v-for="action in actionsGroup.actions"
            )
            a(v-if="action.type == 'link'" :href="action.link")
              .text(v-if="action.render == 'text'") {{ action.text }}
              <icon v-else-if="action.render == 'icon'" :name='action.icon'></icon>
            <component v-else-if="action.type == 'component' && !entity.auth" :is="action.text+'-comp'"></component>
            .dropdown-container(
              v-else-if="action.type == 'dropdown'"
              @click="emit(action.action)"
              )
              .text(v-if="action.render == 'text'") {{ action.text }}
              <icon v-else-if="action.render == 'icon'" :name='action.icon'></icon>              
            //- .debug {{ action.action }}
        .actions-container(v-if="nav.actions && nav.actions.length > 0")
          .action(v-for="action in nav.actions" v-if="((action.auth.indexOf('user') >= 0) ? entity.auth : true) && (action.auth.indexOf('nouser') >= 0 ? !entity.auth : true)")
            a(v-if="action.type == 'link'" :href="action.link")
              .text(v-if="action.render == 'text'") {{ action.text }}
              <icon v-else-if="action.render == 'icon'" :name='action.icon'></icon>
            <component v-else-if="action.type == 'component' && !entity.auth" :is="action.text+'-comp'"></component>
            .dropdown-container(v-else-if="action.type == 'dropdown'")
              .text(v-if="action.render == 'text'") {{ action.text }}
              <icon v-else-if="action.render == 'icon'" :name='action.icon'></icon>
              
</template> 

<script>
import loginSmall from '@/components/login-small'
// import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      nav: null,
      uuid: this._uid,
      entity: this.$store.state.entity,
      // message: this.$store.state.entityMessage
    }
  },
  // computed: {
  //   // mix the getters into computed with object spread operator
  //   ...mapGetters({
  //     entity: 'entityGetter'
  //   })
  // },
  sockets: {
    connect: function(){
      console.log("module %s connect vue side", this.$options.name)
    },
    giveNav(data){
      // console.log(data)
      if(this.uuid == data.id){
        this.nav = data.nav
      }
    }
  },
  created () {
    this.getNav({
      id: this.uuid,
      siteTitle: this.siteTitle
    })
    // this.$store.watch(state=>{
    //   return state.entity
    // },
    // ()=>{
    //   this.entity = state.entity
    // })
  },
  watch: {
    '$store.state.entity': function(){
      this.entity = this.$store.state.entity
    },
    // '$store.state.entityMessage': function(){
    //   this.message = this.$store.state.entityMessage
    // }
  },
  methods: {
    getNav(opts){
      this.$socket.emit('getNav', opts)
    },
    toggleSideBar(){
      console.log('worked')
      this.eventHub.$emit('toggleSideBar')
    },
    emit(data){
      this.eventHub.$emit(data)
    }
  },
  props: ["siteTitle"],
  components: {
    'login-small-comp': loginSmall
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import '~@/styles/vars'
$navSpace: 2%
.nav
  position: fixed
  display: flex
  flex-direction: row
  align-items: center
  justify-content: flex-start
  top: 0
  left: 0
  width: 100%
  max-width: 100%
  overflow: hidden
  height: 50px
  background: $grey
  z-index: 500
  .nav-positioner
    @extend .nav
    .brand-container
      margin-left: $navSpace
      margin-right: auto
      .brand
        text-transform: capitalize
        font-size: 1.5rem
    .actions-group-container
      display: flex
      align-items: center
      justify-content: center
      flex-direction: row
      margin-left: auto
      margin-right: $navSpace
    .actions-container
      display: flex
      align-items: center
      justify-content: center
      flex-direction: row
      margin-left: 15px
      // margin-right: $navSpace
      &:first-child
        margin-left: 0px
      .action
        margin-right: 10px
        height: auto
        display: flex
        align-items: center
        justify-content: center
        a
          height: auto
          display: flex
          align-items: center
          justify-content: center
          // text-shadow: 1px 1px rgba(darken($green, 12), .4)
        .dropdown-container
          height: auto
          display: flex
          align-items: center
          justify-content: center
        .fa-icon
          margin-left: 10px
          margin-right: 10px
          // text-shadow: 1px 1px rgba(darken($green, 12), .4)
        .text
          margin-right: 5px
        &:last-child
          .text
            margin-right: 0px
    .welcome-message-container
      // padding-left: 20%
      // padding-right: 10px
      display: flex
      align-items: center
      justify-content: center
      margin-right: auto
      margin-left: auto
      width: auto
  a
    text-decoration: none
</style>
