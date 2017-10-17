<template lang='pug'>
  .home
    img(style="transform: rotate(180deg)", src="../assets/logo.png")
    .intro-text-container 
      .intro-text Welcome to 
        .capitalize.inline {{ siteTitle }}
    search(:options="['first']")
    .inventories-container
      inventory(
        inventoryMessage="What\'s available"
        inventoryFeedback="Add any resources you want, this is the public inventory"
        :count=50 
        :options="['addable', 'put-last']" 
        :resourceOptions="['icon', 'inventory-item']" 
        :newResourceOptions="['icon', 'editing', 'inventory-item']" 
        :realms="['market','commerce']"
        )
      .inventories-container.vertical.inventory-width
        inventory(
          :inventory='{_id: entity.inventory._id ? entity.inventory._id : entity.inventory}'
          inventoryMessage="Add to your inventory"
          inventoryFeedback="This is your own inventory, it's empty at the moment"
          type="userInventory" 
          :count=40 
          :options="['addable', 'put-last', 'owner-root', 'owner-only']" 
          :resourceOptions="['icon', 'inventory-item']" 
          :newResourceOptions="['icon', 'editing', 'inventory-item']"
          )
        inventory(
          inventoryMessage="Add to your wishlist"
          inventoryFeedback="Add any resources you wish to have, this is your wishlist inventory"
          :count=0 
          :options="['addable', 'put-last', 'owner-only']" 
          :resourceOptions="['icon', 'inventory-item']" 
          :newResourceOptions="['icon', 'editing', 'inventory-item']"
          )
    inventory(
      style="max-width: 80%" 
      :realms="['posts']" 
      :count=25 
      :options="['no-text']" 
      :addable="{ allowed: false }"
      )
</template>

<script>

import search from '@/components/search'
export default {
  data () {
    return {
      entity: this.$store.state.entity,
    }
  },
  sockets: {
    connect: function(){
      console.log("module %s connect vue side", this.$options.name)
    }
  },
  watch: {
    '$store.state.entity': function(){
      this.entity = this.$store.state.entity
    },
  },
  props: ["siteTitle"],
  components: {
         'search'    : search,
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

.home
  display: flex
  align-items: center
  justify-content: flex-start
  flex-direction: column

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
  padding-left: 10%
  padding-right: 10%
  box-sizing: border-box
  padding-bottom: 20px
  &.vertical
    flex-direction: column
    padding-left: 0%
    padding-right: 0%
    &.inventory-width
      width: 50%
      .inventory-container
        width: 100%
  .inventory-container
    display: inline-block
    width: 50%
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
