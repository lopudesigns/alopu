<template lang='pug'>
  .forum
    <feed-comp :realm='all' :count=25 :theme='reddit'></feed-comp>
</template>

<script>

// import inventory from '@/components/inventory.vue';
// import search from '@/components/search.vue'
import feed from '@/components/feed.vue'
export default {
  // data () {
  //   return {
  //     // 'siteTitle'
  //   }
  // },
  // sockets: {
  //   connect: function(){
  //     console.log("socket connect vue side")
  //   }
  // },
  props: ["siteTitle"],
  components:{
        //  'inventory-comp' : inventory,
        //  'search-comp'    : search,
         'feed-comp'      : feed
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
h1, h2
  font-weight: normal
.intro-text-container
  margin-top: 10px
  margin-bottom: 10px
  .intro-text
    display: inline-block  
.inventories-container
  display: flex
  align-items: flex-start
  justify-content: center
  width: 100%
  &.vertical
    flex-direction: column
    &.inventory-width
      width: 40%
      .inventory-container
        width: 100%
  .inventory-container
    width: 40%
.uppercase
  text-transform: uppercase

.capitalize
  text-transform: capitalize

.inline
  display: inline-block

ul
  list-style-type: none
  padding: 0


li
  display: inline-block
  margin: 0 10px


a
  color: #42b983

</style>
