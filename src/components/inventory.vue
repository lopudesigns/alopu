<template lang='pug'>
  .inventory-container
    h2.inventory-title(v-if="!optIn('no-text') && !noTitle") {{ inventoryMessage || inventoryMutable.title }}
    .message-container(v-if="inventoryMessage && !optIn('no-text') && resourcesMutable.length < 1")
      .message {{ inventoryFeedback }}
    //- .debug {{ _uid }}
    .inventory-list
      //- .debug {{ resourceOptions }}
      template(
        v-for="(resource, index) in resourcesMutable" 
        )
        resource(
          :resource="resource"
          :index="index"
          :key="resource ? resource._id || resource : resource"
          :options="resource ? resource.stateType !== 'new' ? resourceOptions : newResourceOptions : newResourceOptions"
          :neighbours="resourcesMutable"
          :inventoryId="inventoryMutable._id || _uid"
          @remove="deleteResource(index)"
          :style="{ order: (optIn('put-resources-first') && resource.stateType !== 'new') ? 2 : (optIn('put-resources-last') && resource.stateType !== 'new') ? 4 : (optIn('put-new-resources-first') && resource.stateType == 'new' ) ? 2 : ( optIn('put-new-resources-last') && resource.stateType == 'new' ) ? 4 : 3 }"
          )
      .inventory-resource.add-new(
        :class="{'put-first': optIn('put-first'), 'put-last': optIn('put-last'), 'wide': optIn('wide-adder'), rounded: optIn('rounded')}"
        v-if="optIn('addable')"
        @click="addNewResource"
        )
        .inventory-resource-square
          icon(name="plus")
</template>

<script>
import smartOpts from '@/components/mixins/smartOpts';
export default {
  mixins: [smartOpts],
  data () {
    return {
      inventoryMutable: this.inventory,
      entity: this.$store.state.entity,
      resourcesMutable: this.resources,
      realmsMutable: this.realms,
      optionsMutable: this.optionsComputed,
      countMutable: this.count,
      finds: [],
    }
  },
  sockets: {
    connect: function(){
      // console.error("module %s connect vue side", this.$options.name)
    },
    giveResources(data){
      if(this.inventoryMutable._id ? this.inventoryMutable._id == data.inventoryId : this._uid == data.inventoryId){
        // loop over all returned resources to try to add them the render list
        data.resources.forEach((resource, index)=>{
          // if the resource index from the returned list is loading in the render list, then replace it with the resource
          if(this.resourcesMutable[index].stateType == 'loading' || this.resourcesMutable[index].stateType == 'waiting-hidden'){
            this.resourcesMutable.splice(index, 1, resource)
          } 
          // else, search the render list for a free spot and replace it
          else {
            for(let i = 0; i < this.resourcesMutable.length; i++){
              // replace the first found occurance of loading or 'waiting-hidden'
              if(this.resourcesMutable[i].stateType == 'loading' || this.resourcesMutable[i].stateType == 'waiting-hidden'){
                this.resourcesMutable.splice(i, 1, resource)
                return
              } 
              // otherwise if there are no loading spots, 
              else if (i == this.resourcesMutable.length - 1){
                var unique = true
                // check all already rendered resources for a resource._id indicating it already exists
                for(let i = 0; i < this.resourcesMutable.length; i++){
                  if(this.resourcesMutable[i]._id == resource._id){
                    // set the resource to the returned resource
                    this.resourcesMutable[i] = resource
                    unique = false
                  }
                }
                // if the resource has not already been rendered, push it
                if(unique){
                  this.resourcesMutable.push(resource)
                }
              }
            }
            // this.resourcesMutable.forEach((resource2, index2)=>{
            // })
          }
        })
        var overcount = 0
        this.resourcesMutable.forEach(resource=>{
          if(resource.stateType == 'loading' || resource.stateType == 'waiting-hidden'){
            overcount++
          }
        })
        this.countMutable = this.resourcesMutable.length - overcount
        console.log(this.countMutable)
        // this.resourcesMutable.splice(this.countMutable)
        // this.resourcesMutable = this.resourcesMutable.concat(data.resources)
      }
    },
    giveResource(data){
      if (this.inventoryMutable._id ? this.inventoryMutable._id == data.inventoryId : this._uid == data.inventoryId && data.index && data.index < this.countMutable){
        if(this.resourcesMutable[data.index] && ['loading', 'waiting-hidden'].includes(this.resourcesMutable[data.index].stateType)){
          this.resourcesMutable.splice(data.index, 1, data.resource)
          // this.resourcesMutable.splice(optIn('default-new-resource') ? data.count + 1 : data.count)
        } else if(this.resourcesMutable.filter(resource=>{return resource._id == data.resource._id}).length < 1){
          this.resourcesMutable.push(data.resource)
        }
      } else if (this._uid == data.id && data.resource._id == this.inventoryMutable._id){
        this.inventoryMutable = data.resource
        this.loadPlaceholders(this.inventoryMutable.resources.length)
        // if(this.inventoryMutable.resources.length > 0){
        let count = this.genFind('count')
        let find = this.genFind()
        this.getResources({
          count,
          sort: 'alphabetical',
          sortDirection: 'ascending',
          inventoryId: this.inventoryMutable._id || this._uid,
          entity: this.entity,
          find
        })
      } else if (this.inventory._id && data.resource.parents.indexOf(this.inventory._id) >= 0 && this.resourcesMutable.filter(resource=>{return (resource.clientId == data.id || resource._id == data.resource._id)}).length < 1){
        this.resourcesMutable.push(data.resource)
      }
    },
    confirmResourceDeletion(opts){
      if(this.inventory._id == opts.inventoryId || this._uid == opts.inventoryId){
        this.resourcesMutable.forEach((resource, index)=>{
          if(resource._id == opts.resource._id){
            this.resourcesMutable.splice(index, 1)
          }
        })
      }
    }
  },
  created () {
    // this.resourcesMutable = this.resources
    // this.realmsMutable = this.realms
    this.optionsMutable = JSON.parse(JSON.stringify(this.options))
    // check if no resources were passed
    if(this.resourcesMutable.length < 1){
      // check if the generated inventory had a mongod id
      if(this.inventoryMutable._id){
        this.getInventory({
          resource: this.inventoryMutable,
          id: this._uid
        })
      } 
      // otherwise we generate an inventory using a mongoose query
      else {
        this.loadPlaceholders(this.countMutable)
        let find = this.genFind()
        let count = this.genFind('count')
        this.getResources({
          sort: 'alphabetical',
          sortDirection: 'ascending',
          inventoryId: this.inventoryMutable._id || this._uid,
          entity: this.entity,
          count,
          find
        })
      }
    } 
    // if they were, do nothing because they will be rendered
    else if (this.inventoryMutable._id){
      // console.log('getting inventory')
      // this.getInventory({
      //   resource: this.inventoryMutable,
      //   id: this._uid
      // })
    }
    // check if the renderer wants a default new resource
    if(this.optIn('default-new-resource')){
      this.addResource()
    }
  },
  mounted(){

  },
  watch: {
    '$store.state.entity': function(){
      this.entity = this.$store.state.entity
    }
  },
  methods: {
    getResources(opts){
      this.$socket.emit('getResources', opts)
    },
    getInventory(opts){
      this.$socket.emit('getResource', opts)
    },
    addResource(resource){
      var resource = {
        stateType: 'new',
        parents: [this.inventoryMutable._id]
      }
      if(resource){
        this.resourcesMutable.push(resource)
      }
    },
    addNewResource(){
      var resource = {
        stateType: 'new',
        parents: [this.inventoryMutable._id]
      }
      this.resourcesMutable.push(resource)
    },
    removeResource: function(resource) {
      this.resourcesMutable.$remove(resource)
    },
    deleteResource: function(index){
      if(this.resourcesMutable[index]._id){
        let opts = {
          resource: this.resourcesMutable[index],
          inventoryId: this.inventory._id || this._uid,
          entity: this.entity
        }
        this.$socket.emit('deleteResource', opts)
      } else {
        this.resourcesMutable.splice(index, 1)
      }
    },
    loadPlaceholders: function(length){
      for(let i = 0; i < length; i++){
        if(!this.optIn('bulk-resource-fetch') || this.optIn('show-loading-resources')){
          this.resourcesMutable.push({
            stateType: 'loading',
            parents: [this.inventoryMutable._id]

          })
        } else if (!this.optIn('bulk-resource-fetch')) {
          this.resourcesMutable.push({
            stateType: 'waiting-hidden',
            parents: [this.inventoryMutable._id]
          })
        } else {
          this.resourcesMutable.push({
            stateType: 'loading',
            parents: [this.inventoryMutable._id]

          })
          
        }
      }
    },
    genFind: function(arb){
      var find = {}
      var count = Infinity
      // generate owner/parents find options
      if(this.optIn('owner-only') && !this.optIn('owner-root')) {
        var find = {
          $or: [ {owner: this.entity._id}, {parents: {$in: [this.inventoryMutable._id]}} ]
        }
      } else if (this.optIn('owner-root') && !this.optIn('owner-only')){
        find.owner = this.entity._id
        find.parents = {$in: [this.inventoryMutable._id]}
      } else if (this.optsIn(['owner-root', 'owner-only'])){
        find.owner = this.entity._id
        find.parents = {$in: [this.inventoryMutable._id, null, undefined]}
      }

      // generate realms options
      if(this.realmsMutable && this.realmsMutable.length > 0) {
        if(this.optIn('broad-realms')){
          find.realms = {$in: this.realmsMutable}
        } else if(this.optIn('all-realms')) {
          find.realms = {$all: this.realmsMutable}
        } else {
          find.realms = {$all: this.realmsMutable}
        }
      }

      // generate count options
      if(this.countMutable > 0){
        count = this.countMutable
      } else if(this.inventoryMutable.resources){
        count = this.inventoryMutable.resources.length
      } else {
        count = Infinity
      }

      // check if there was a default
      // if(this.optIn('default-'))

      if(arb == 'count'){
        return count
      } else {
        return find
      }
    }
  },
  props: {
    inventory: {
      default: () => { return {} }
    },
    realms: {
      default: () => { return [] },
      type: Array
    }, 
    resources: {
      default: () => { return [] }
    },
    resourceOptions: {
      type: Array,
      default: () => { return [] }
    },
    newResourceOptions: {
      type: Array,
      default: () => { return ['editing'] }
    },
    options: {
      type: Array,
      default: () => { return [] }
    },
    count: {
      type: Number,
      default: 0
    }, 
    inventoryMessage: {
      type: String,
      default: "An inventory"
    },
    inventoryFeedback: {
      type: String,
      default: 'This is an inventory of resources'
    },
    noTitle: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    optionsComputed(){
      return JSON.parse(JSON.stringify(this.options))

    }
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import '~@/styles/vars'
.inventory-container
  position: relative
  width: 100%
  max-width: 100%
  flex-grow: 1
  padding: 4px
  // border: 1px solid rgba($green, .2)
  box-sizing: border-box
  display: flex
  flex-direction: column
  // border-bottom: 0px
  overflow-y: scroll
  .inventory-title
    margin-bottom: 5px
  .message-container
    width: 100%
    text-align: center
    margin: 4px
    z-index: 50
    position: relative
    top: 0
    left: 0 
    .message
      font-size: .9rem
      opacity: .5
  .inventory-list
    display: flex
    align-items: flex-start
    justify-content: flex-start
    flex-direction: row
    flex-wrap: wrap
    position: relative
    width: 100%
    .inventory-resource
      width: 80px
      height: 80px
      order: 2
      border-radius: 1px
      background-color: $grey
      margin: 4px
      font-size: .7rem
      line-height: .6rem
      word-break: break-all
      display: flex
      align-items: center
      justify-content: center
      cursor: pointer
      +animate(all, 250ms, ease)
      &:hover
        background-color: darken($grey, 5)
        // font-size: .28rem
      .inventory-resource-square
        padding: 4px
      .add-resource
        font-size: 1.2rem
      &.add-new
        order: 9999
        margin-bottom: 10px
        &.put-first
          order: 1
          margin-bottom: 4px
        &.put-last
          order: 9999
        &.wide
          margin-left: 0px
          margin-right: 0px
          width: 100%
        &.rounded
          border-radius: 20px
          border-bottom-left-radius: 5px
</style>
