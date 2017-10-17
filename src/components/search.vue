<template lang='pug'>
  .search
    .search-container
      form.search-form
        input.search-input(v-show="anyOptsIn(['first', 'all']) && optIn('all') || optIn('first') && !optIn('hide-first')" placeholder="Type in any resource that you have or need" @click="popOpt('all'); pushOpt('first')")
        input.search-input(v-show="anyOptsIn(['second', 'double']) && optIn('all') || optIn('second') && !optIn('hide-second')" placeholder="What do you have?" @click="popOpt('all'); pushOpt('second')")
        //- .debug {{ anyOptsIn(['second', 'double'])  }}
</template>

<script>
import smartOpts from '@/components/mixins/smartOpts'
export default {
  mixins: [smartOpts],
  name: 'search-comp',
  data () {
    return {
      optionsMutable: this.options
    }
  },
  sockets: {
    connect: function(){
      // console.log("module %s connect vue side", this.$options.name)
    },
    // giveObjects(data){
    //   // console.log(data)
    //   if(this.someid == data.id){
    //     this.objects = data.objects
    //   }
    // }
  },
  created () {
    // if(this.count !== 0){
    //   this.getObjects({
    //     count: this.count,
    //     sort: 'alphabetical',
    //     sortDirection: 'ascending',
    //     id: this.someid
    //   })
    // } else {
    //   this.objects = null
    // }
  },
  methods: {
    // getObjects(opts){
    //   this.$socket.emit('getObjects', opts)
    // }
  },
  props: {
    options: {
      default: function(){ return ['double', 'all'] }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import '~@/styles/vars'

.search
  width: 80%
  .search-container
    width: 100%
    .search-form
      width: 100%
      display: flex
      flex-direction: row
      align-items: center
      justify-content: center
      flex-grow: 1
      flex-shrink: 1
      flex-wrap: no-wrap
      border-left: 2px solid darken($grey, 3)
      border-right: 2px solid darken($grey, 3)
      input
        outline: none
        font-size: .8rem
        // font-weight: 800
        width: 100%
        padding: 12px
        text-align: center
        border: 2px solid darken($grey, 3)
        border-left: none
        border-right: none
        background: $grey
        +animate(all, 350ms, ease)
        &:first-child
          // border-left: 2px solid darken($grey, 3)
        &:last-child
          // border-right: 2px solid darken($grey, 3)
        
</style>
