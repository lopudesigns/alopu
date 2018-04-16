<template lang="pug">
  #q-app(ref="app")
    //- navbar(:siteTitle="siteTitle")
    q-layout(
      view="HHH dpR fff"
      )
      q-layout-drawer(
        side="right"
        v-model="mainDrawer"
        :overlay="true"
        ).z-top.flex.column
        //- q-toolbar(
        //-   color="primary"
        //-   )
          //- q-btn(
          //-   icon="close"
          //-   @click="mainDrawer = !mainDrawer"
          //-   ).shadow-0
        q-list.no-border
          q-item(
            )
            q-item-side
              q-item-tile(
                avatar
                sparse
                @click="mainDrawer = !mainDrawer"
                ).q-item-tile-profile-picture
                //- :style=`{
                //-   height: '50px',
                //-   width: 'auto'
                //- }`
                img(
                  src="/statics/neo.png"
                  ).br-none
            q-item-main(
            )
              q-item-tile(
                label
              ) Neo
              q-item-tile(
                sublabel
                size=".5rem"
                ) 010010100101
            q-item-side(
              )
              q-btn(
                icon="close"
                @click="mainDrawer = !mainDrawer"
              ).shadow-0
          //- q-item-separator
          //- q-collapsible(
            label="Notifications"
            color="primary"
            avatar="/statics/planet-earth.png"
            ).text-center.notifications-collapsible.icon-avatar.square-avatar
            //- q-item()
              q-item-side(
                icon="public"
                color="primary"
                )
            //- q-collapsible(
              label="Messages"
            )
          q-item-separator
          q-collapsible(
            label="Inventory"
            ).q-pr-xs
            //- avatar="/statics/box.png"
            q-list.no-border.q-pl-sm
              img(
                v-for="num in 1"
                src="/statics/box.png"
                ).q-img-lg.q-mr-md.q-mb-md
          //- q-item-separator
          //- q-collapsible(
            label="Profile"
            avatar="/statics/neo.png"
            ).icon-avatar
            //- q-collapsible(
              label="Current Location"
              avatar="/statics/where.png"
              )
              //- q-item-separator()
              //- q-list()
                q-item(
                )
                  q-item-side(
                    avatar="/statics/devices.png"
                  )
                  q-item-main(
                    label="Available Devices"
                    sublabel="Link a Device"
                    )
                q-item-separator()
                q-item(
                )
                  q-item-side(
                    avatar="/statics/smartphone.png"
                  )
                  q-item-main(
                    label="Samsung Galaxy S5"
                    sublabel="23 Conley St, Noble Park, 3174"
                    )
                  q-item-side(
                    avatar="/statics/location-yes.png"
                  )
                q-item-separator()
                q-item(
                )
                  q-item-side(
                    avatar="/statics/smartphone.png"
                  )
                  q-item-main(
                    label="Motorola X Play"
                    sublabel="40 Highett Rd, Moorabin"
                    )
                  q-item-side(
                    avatar="/statics/location-no.png"
                  )
                q-item-separator()
                q-item(
                )
                  q-item-side(
                    avatar="/statics/computer-screen.png"
                  )
                  q-item-main(
                    label="Macbook Pro"
                    )
                  q-item-side(
                    avatar="/statics/location-no.png"
                  )
                q-item-separator()
                q-item(
                )
                  q-item-side(
                    avatar="/statics/tablet.png"
                  )
                  q-item-main(
                    label="Nexus 7"
                    sublabel="23 Conley St, Noble Park, 3174"
                    )
                  q-item-side(
                    avatar="/statics/location-no.png"
                  )
                q-item-separator()
                q-item
                  q-btn(
                    label="add a device"
                    wide
                  )
        q-toolbar(
          background="secondary"
          ).q-mt-auto.no-border.bg-none.q-pl-sm
          q-item(
            )
            q-item-main(
              label="login"
            ).text-tertiary
          //- q-item(
            )
            q-item-main(
              label="logout"
            )
          q-item(
            )
            q-item-main(
              label="register"
            ).text-tertiary
          //- q-item(
            )
            q-item-main(
              label="settings"
            )
      q-page-container.q-pt-none
        router-view.router-view(:siteTitle="siteTitle")
      navbar(
        @toggleDrawer="mainDrawer = !mainDrawer"
      )
        //- q-toolbar-title() Planet Express
    //- sidebar
</template>

<script>
import navbar from '@/components/nav'
import sidebar from '@/components/sidebar'
import smartOpts from '@/components/mixins/smartOpts'
export default {
  mixins: [smartOpts],
  name: 'app',
  data(){
    return {
      siteTitle: 'alopu',
      entity: this.$store.state.entity,
      uuid: this._uid,
      pageHistory: this.$store.state.pageHistory,
      mainDrawer: false
    }
  },
  sockets: {
    connect: function(){
      // console.log("socket connect vue side")
    },
    giveAuthenticate(data) {
      console.log(data)
      // console.log("this.$store")
      // console.log(this.$store)
      if(data.entity && data.auth){
        // console.log("setting store user state to user")
        data.entity.auth = true
        this.$store.commit('entitySet', data.entity)
        // this.$store.commit('entityMessageUpdate', "welcome, <a href='/self'>" + (this.entity ? this.entity.username : 'anonymous') + "</a>")
        // console.log(this.entity)
        // console.log(this.pageHistory)
        // console.log('this')
        // console.log(this)
        // console.log("mystery string for this.$router.go")
        // console.log('/' + (this.pageHistory.length > 0 ? this.pageHistory[this.pageHistory.length-1] : ''))
        // this.$router.go('/')
        // this.$router.go('/' + (this.pageHistory.length > 0 ? this.pageHistory[this.pageHistory.length-1] : ''))
        // this.$router.go('/' + (this.pageHistory.length > 0 ? this.pageHistory[this.pageHistory.length-1] : ''))
      } else {
        console.log('resetting entity')
        this.$store.commit('entitySet',  {
          type: 'temporary',
          identity: 'anonymous',
          auth: false,
          username: undefined
        })
        if(data.err){
          this.$store.commit('newAuthLog', {
            err: data.err,
            msg: 'something went wrong authorizing the user'
            })
        }
      }
    },
    giveRealms(data){
      if(data.id == this.uuid){
        // console.log("setting reamls in store")
        // console.log(data)
        this.$store.commit('SetRealms', data.realms)
        // this.$store.state.realms = ret.realms
      }
    }
  },
  created(){
    let that = this
    var down
    var up
    var waitdown
    var waitup
    var movingTimerDown
    var movingTimerUp
    var lastUpTimer = new timer(()=>{}, 0)
    var lastDownTimer = new timer(()=>{}, 0)
    var count = 0
    var mouseClick = function(){
      // console.lgog('count click')
      let lastUp = lastUpTimer.getTimeLeft()
      new timer(()=>{
        document.body.classList.add('cursor-pointer')
      }, lastUp)
      lastDownTimer = new timer(()=>{}, lastUp+200)
    }
    var mouseUp = function(){
      // console.lgog('count release')
      let lastDown = lastDownTimer.getTimeLeft()
      new timer(()=>{
        document.body.classList.remove('cursor-pointer')
      }, lastDown)
      lastUpTimer = new timer(()=>{}, lastDown+100)
      count++
      // console.lgog(count)
    }
    document.body.onmousedown = mouseClick
    document.body.onmouseup = mouseUp
    console.log("%s was created", this.siteTitle)
    this.$socket.emit('getRealms', {
      id: this.uuid,
      find: {},
      count: Infinity
    })
    function timer(callback, delay) {
        var id, started, remaining = delay, running

        this.start = function() {
            running = true
            started = new Date()
            id = setTimeout(callback, remaining)
        }

        this.pause = function() {
            running = false
            clearTimeout(id)
            remaining -= new Date() - started
        }

        this.getTimeLeft = function() {
            if (running) {
                this.pause()
                this.start()
            }

            return remaining
        }

        this.getStateRunning = function() {
            return running
        }

        this.start()
    }
  },
  watch: {
    '$store.state.entity': function(){
      this.entity = this.$store.state.entity
    },
    '$store.state.pageHistory': function(){
      this.pageHistory = this.$store.state.pageHistory
    },
  },
  components: {
    navbar,
    sidebar
  }
}
</script>

<style lang="sass">
@import 'src/styles/vars'
html
  // cursor: url(/statics/cursors/ms/aero_link2.cur), pointer
  cursor: url(/statics/cursors/ms/aero_arrow.cur) 2 2, auto
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  // text-align: center
  color: $friendly
  // padding-top: 60px
  // min-height: 100vh
body
  margin: 0px
  &.cursor-pointer,
  &.cursor-pointer *
    cursor: url(/statics/cursors/ms/aero_link2.cur) 2 2, auto !important
h1,h2
  font-weight: normal

ul
  list-style-type: none
  padding: 0

li
  display: inline-block
  margin: 0 10px

a,
.action,
.fa-icon,
a:-webkit-any-link,
.btn,
.btn-container
  color: $green
  text-decoration: none
  // cursor: url(/statics/cursors/ms/aero_link1.cur), pointer
  // border-bottom: 1px dotted rgba($green, .5)
  +animate(all, 300ms, ease)
  cursor: url(/statics/cursors/ms/aero_arrow.cur) 2 2, auto
  animation: 400ms hoverMaple linear infinite
  &:hover
    color: $greenhover

  +keyframes(hoverMaple)
    0%
      cursor: url(/statics/cursors/ms/aero_link2.cur) 2 2, pointer 
    49%
      cursor: url(/statics/cursors/ms/aero_link2.cur) 2 2, pointer 
    50% 
      cursor: url(/statics/cursors/ms/aero_link1.cur) 2 2, auto 
    99% 
      cursor: url(/statics/cursors/ms/aero_link1.cur) 2 2, auto 
    100%
      cursor: url(/statics/cursors/ms/aero_link2.cur) 2 2, pointer 
  
.fa-icon
  user-select: none
button,
.btn
  color: $green
  // cursor: url(/statics/cursors/ms/aero_link1.cur), pointer
.content-editable
  outline: none
  padding: 5px
  &:focus
    // background: white
input
  color: $friendly
body
  background: $white
.router-view
  // padding-top: 50px
.v-select
  $font-size: 1rem
  font-size: $font-size
  line-height: $font-size
  height: 100%
  max-width: 100%
  .dropdown-toggle
    border: none !important
    border-radius: 0px !important
    // border-bottom: 1px solid $grey !important
    display: flex
    align-items: flex-start
    justify-content: flex-start
    flex-direction: column
    flex-wrap: wrap
    height: 100%
    max-width: 100%
    &:after
      display: none
    .input-container
      width: 100%
      max-width: 100%
      .form-control
        order: 1
        height: 100% !important
        max-width: 100%
        background: rgba(black, 0)
        font-size: $font-size
        line-height: $font-size
        font-family: $family
        padding: 0 4px
    .selected-tag-list
      order: 2
      max-width: 100%
      .selected-tag
        margin: 0
        margin-left: 4px
        padding: 0
        padding-right: 9px
        max-width: 100%
        height: auto
        font-size: $font-size
        line-height: $font-size + .3rem
        background: rgba(black, 0)
        color: $friendly
        font-family: $family
        width: auto
        border: none
        border-radius: 0px
        max-height: 100%
        white-space: normal
        position: relative
        text-transform: capitalize
        word-wrap: break-word
        &:first-child
          // margin-left: 4px
        button
          top: 0
          left: -5px
          position: absolute
          align-self: flex-start
          bottom: auto
          float: right
          font-size: .85rem
          line-height: .2rem
          // font-weight: 900
          color: rgba(darken($green, 0),.5)
          opacity: 1
    .open-indicator
      top: 0px
      display: flex
      align-self: flex-start
      align-items: center
      justify-content: center
      &:before
        height: 5px
        width: 5px
        border-width: 1px 1px 0 0
  .dropdown-menu
    border: 1px solid rgba($friendly, .15)
    display: flex
    align-items: flex-start
    justify-content: flex-start
    flex-direction: column
    text-transform: capitalize
    li
      margin-right: 4px
    .active,
      background-color: rgba($green, .5)
    .highlight
      background-color: $green
      a
        background-color: inherit
.mapboxgl-ctrl-logo
  display: none !important
.mapboxgl-ctrl-attrib
  display: none !important

// quasar style modifications
.q-pt-none
  // padding-top: 0px !important
.q-nav-toolbar
  background: rgba($green, 0) !important
  img
    width: 60px
    height: auto
    right: 0
    margin-right: 0px
    margin-left: auto
.text-primary
  color: $green !important
.q-chip
  margin-left: -16px !important
  top: -0.6rem !important
  padding: 0 10px !important
  min-height: 25px !important
.q-verified-status
  text-align: center
  justify-content: center
  img
    width: 20px
    height: auto
.q-item-tile-profile-picture
  img
    width: 60px
    height: auto
  width: auto
  height: auto
</style>
<style lang="stylus">
@import '~variables'
.icon-primary
  .q-item-icon
    // color $primary !important
.notifications-collapsible
  .q-item-icon
    // color $primary !important
.square-avatar
  // &>.q-collapsible-inner
  //   &>.q-item
  //     &>.q-item-side
  .q-item-avatar
    border-radius 0px
.icon-avatar
  .q-item-avatar
    width: 24px
    height: auto
.q-item-side
  display: flex
  align-items center
</style>
