<template lang='pug'>
  .realm
    .posts-container
      .posts-list all realms
</template>

<script>
export default {
  name: 'realms',
  data () {
    return {
      // realm: $route.params.realm
      // siteTitle: 'Agora'
    }
  },
  socket: {
    connect() {
      this.isConnected = true
    },
    disconnect() {
      this.isConnected = false
    },
    giveRealms(data){
      if(this.user && this.user.wantsLive){

      }
      console.log(data)
      this.realms = data
    }
  },
  created () {
    this.getRealms({
      count: 100,
      sort: 'alphabetical',
      sortDirection: 'ascending'
    })
  },
  methods: {
    getRealms(opts){
      this.$socket.emit('getRealms', opts)
    }
  },
  props: ['realms']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
