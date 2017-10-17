<template lang='pug'>
  .feed
    .feed-sizer.agora-market
      .resources-container(v-if="resourcesMutable")
        .resource-list
          <resource v-if="addable.allowed && addable.position == 'top'" :activeOptions="['editing']"></resource>
          <resource v-for="(resource, key) in resourcesMutable" :resource='resource' :key='key'></resource>
</template>

<script>
export default {
  data () {
    return {
      uuid: this._uid,
      realmsMutable: [],
      resourcesMutable: []
    }
  },
  sockets: {
    connect: function(){
      console.log("module %s connect vue side", this.$options.name)
    },
    giveResources(data){
      // console.log(data)
      if(this.uuid == data.id){
        this.resourcesMutable = data.resources
      }
    }
  },
  created () {
    this.realmsMutable = this.realms
    this.resourcesMutable = this.resources
    if(this.count !== 0){
      this.getResources({
        count: this.count,
        sort: 'date',
        sortDirection: 'latest',
        id: this.uuid,
        find: {
          realms: {$all: this.realmsMutable}
        }
      })
    } else {
      this.objects = null
    }

  },
  methods: {
    getResources(opts){
      this.$socket.emit('getResources', opts)
    }
  },
  props: {
    count: {
      default: 100,
      type: Number
    },
    realms: {
      default: () => { return ["posts"] },
      type: Array
    }, 
    resources: {
      default: () => { return [] },
      type: Array
    },
    theme:{
      default: 'reddit',
      type: String
    },
    addable: {
      default: ()=>{ return {allowed: true, position: 'top'} },
      type: Object
    }
  },
  components: {
  },
  route: {
    canActivate(){
      return true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import '~@/styles/vars'
.feed
  width: 100%
  display: flex
  align-items: flex-start
  justify-content: center
  max-width: 100%
  // overflow-x: hidden
  overflow-y: visible
  height: auto
  .feed-sizer
    overflow-y: visible
    &.reddit
      width: 1000px
    &.facebook
      width: 500px
    &.agora-market
      width: 80%
  // background: $grey
</style>
