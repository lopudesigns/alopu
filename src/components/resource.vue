<template lang='pug'>
  .resource(
    @mouseover='showOptions' 
    @mouseleave='hideOptionsMaybe'
    @click.self="popOpt('icon')"
    :class="{ icon: optIn('icon'), 'icon-wide': optIn('icon-wide'), editing: optIn('editing'), 'inventory-item': optIn('inventory-item') }"
    v-if="resourceMutable && resourceMutable.stateType !== 'waiting-hidden' && resourceMutable.stateType !== 'deleted'"
    )
    .main-container(@click.self="toggleOptions; popOpt('icon')")
      .msg-container(@click="showOptionsPerm; popOpt('icon')")
        .msg(
          v-if="!optIn('editing') && !optIn('icon') && resourceMutable.stateType !== 'loading'" 
          @click.self='toggleOptions'
          ) {{ resourceMutable.description || resourceMutable.properties && resourceMutable.properties.fbData && resourceMutable.properties.fbData.story }}
        medium-editor(
          v-show="optIn('editing') && !optIn('icon') && resourceMutable.stateType !== 'loading'" 
          :options="resourceInputOptions" 
          custom-tag='p' 
          :text="resourceMutable.description || ''" 
          @edit="handleEdit"
          )
        .name-container(
          v-if="optIn('icon') && resourceMutable.stateType !== 'loading'" 
          @click="popOpt('icon')"
          )
          .name(v-if="resourceMutable.names && resourceMutable.names.length > 0") {{ typeof resourceMutable.names[0] == 'object' ? resourceMutable.names[0].name : resourceMutable.names[0] }}
          .name(v-else-if="resourceMutable.description" v-html="resourceMutable.description")
          .name(v-else) New Resource 
        .status-container(v-if="resourceMutable.stateType == 'loading'")
          icon( 
            name="spinner" pulse
            )        
      //- .attachments-inventory(v-if="resourceMutable.mappedInventory['facebook attachments']")
      //-   .attachment(v-for="resource of resourceMutable.mappedInventory['facebook attachments']") {{ resource.properties.fbData && resource.properties.fbData }}
      //- .sharedposts-inventory(v-if="resourceMutable.mappedInventory['facebook sharedposts']")
      //-   .sharedpost(v-for="resource of resourceMutable.mappedInventory['facebook sharedposts']") {{ resource.properties.fbData && resource.properties.fbData }}
    //- .comments-container(v-if='resourceMutable.comments.data')
    //-   .comment(v-for='comment in resourceMutable.comments.data')
    //-     .comment-msg {{ comment.message }}
    <transition name="options">
      .options-container(v-show="optIn('options') && !optIn('icon')")
        .options-sizer
          .options-group.icons
            .option.meta
              .action(
                @click="toggleOpt('moreOptions')"
                )
                <icon name="cog"></icon>
            .option.realms(v-if="optIn('editing')")
              .action(
                @click="toggleOpt('realms')"
                )
                icon(name="connectdevelop")
            //- .option.name(v-if="optIn('editing')")
            //-   .action(
            //-     @click="toggleOpt('type')"
            //-     )
            //-     //- icon(name="address-book")
            //-     //- icon(name="archive")
            //-     icon(name="database")
            .option.names(v-if="optIn('editing')")
              .action(
                @click="toggleOpt('names')"
                )
                //- icon(name="address-book")
                icon(name="diamond")
            .option.reply(v-if="!optIn('editing')")
              .action(
                @click="toggleOpt('comment')"
                )
                icon(name="comment")
            .option.replies(v-if="!optIn('editing')")
              .action(
                @click="toggleOpt('comments')"
                )
                icon(name="comments")
            .option.save(v-if="!optIn('editing')")
              .action(
                @click="saveResource"
                )
                icon(name="save")
            .option.fork(v-if="!optIn('editing')")
              .action(
                @click="forkResource"
                )
                <icon name="code-fork"></icon>
            .option.reference(v-if="!optIn('editing')")
              .action(
                @click="referenceResource"
                )
                <icon name="sitemap"></icon>
            .option.boxup(v-if="optIn('inventory-item')")
              .action(
                @click="toggleOpt('icon')"
                )
                <icon name="cube"></icon>
            .option.showinv()
              .action(
                @click="toggleOpt('inventory')"
                )
                icon(name="cubes")
            .option.statement(v-if="!optIn('editing') && (resourceMutable.realms && resourceMutable.realms.indexOf('statement') >= 0)")
              .action
                <icon name="level-up" flip="horizontal"></icon>
              .action
                <icon name="level-down"></icon>
            .option.url()
              .action
                .icon-wrapper
                  <icon name="paperclip" flip="vertical"></icon>
            .option.url()
              .action.link
                .icon-wrapper
                  <icon name="link" flip="vertical"></icon>
                .input-popup-positioner(v-show="optIn('editing')")
                  .input-popup
                    .input(contenteditable='true' placeholder="paste a link")
                  .input-diamond-positioner
                    .input-diamond
                //- input(type="text" placeholder="or paste a link")
            //- .option.commerce()
            //-   .action(
            //-     v-if="optIn('editing')"
            //-     @click="toggleOpt('prices')"
            //-     )
            //-     <icon name="credit-card"></icon>
            //-   .action(v-else
            //-     @click="toggleOpt('prices')"
            //-     )
            //-     <icon name="credit-card"></icon>
            .option.postas(v-if="optIn('editing')")
              .action(
                @click="toggleOpt('postas')"
                )
                icon(name="user")
                //- icon(name="bolt")
            //- .option.privacy(v-if="optIn('editing')")
            //-   .action(
            //-     @click="toggleOpt('privacy')"
            //-     )
            //-     icon(name="eye")
            .option.close-options(v-if="optIn('editing')")
              .label.action(
                @click="hideOptions"
                )
                icon(name="angle-double-up") 
            .option.delete(v-if="optIn('editing') && !optIn('no-delete')")
              .label.action(
                @click="deleteResource(false)"
                )
                icon(name="trash") 
            .option.submit(v-if="optIn('editing')")
              .label.action(
                @click="saveResource"
                )
                icon(name="magic") 
              .err(v-if="err") {{ err }}
          .options-group.current-input
            .option.pill.realms(v-if="optIn('realms')")
              .values(v-if="!optIn('editing')")
                .value(v-for="realm in resourceMutable.realms") {{ realm }}
              <alopuselect @click='showOptionsPerm' v-show="optIn('editing')" :pushTags="true" multiple taggable v-model="resourceMutable.realms" :options="realms" label="realm" placeholder="realms"></alopuselect>
            //- .option.pill.resourceType(v-if="optIn('type')")
            //-   .label(v-if="!optIn('editing')") type 
            //-   .value(v-if="!optIn('editing')") {{ resourceMutable.type }}
            //-   //- input(ref="realmsinput" v-model="resourceMutable.realms" placeholder="eg. food, vegan, icecream")
            //-   <alopuselect @click='showOptionsPerm' v-show="optIn('editing')" :pushTags="true" v-model="resourceMutable.types" :options="resourceTypes" label="type" placeholder="resource type"></alopuselect>
            .option.pill.resourceNames(v-if="optIn('names')")
              //- .label(v-if="!optIn('editing')") resource 
              //- .label(v-else) resource 
              .value(v-if="!optIn('editing')") {{ resourceMutable.resource }}
              //- input(ref="realmsinput" v-model="resourceMutable.realms" placeholder="eg. food, vegan, icecream")
              alopuselect( @click='showOptionsPerm' v-show="optIn('editing')" :pushTags="true" taggable multiple v-model="resourceMutable.names" :options="resourceNames" label="name" placeholder="resource names")
            .option.pill.privacy(v-if="optIn('privacy')")
              //- .label(v-if="!optIn('editing')") resource 
              //- .label(v-else) resource 
              .value(v-if="!optIn('editing')") {{ resourceMutable.resource }}
              //- input(ref="realmsinput" v-model="resourceMutable.realms" placeholder="eg. food, vegan, icecream")
              alopuselect( @click='showOptionsPerm' v-show="optIn('editing')" :pushTags="true" taggable multiple v-model="resourceMutable.privacy" :options="resourceNames" label="name" placeholder="these eyes only")
            .option.pill.prices(v-show="optIn('prices')" @click='showOptionsPerm' )
              template()
                .label-group
                  .label costs
                  .label.price-add(v-if="optIn('editing')" @click="addPrice") +
                    //- .icon-wrapper
                    //- icon( name="plus-square")
                //- input(ref="realmsinput" v-model="resourceMutable.realms" placeholder="eg. food, vegan, icecream")
                .values(v-if="!optIn('editing')")
                  .value(v-for="price in resourceMutable.prices") {{ price.fiat }} per {{ price.multipler}} {{ price.unit }}'s
                .prices-list(v-else)
                  .price(v-for="(price, index) in resourceMutable.prices")
                    //- <alopuselect class="resource-select" inputStore v-show="optIn('editing') && price.type == 'resource'" v-model="price.currency" :options="currencies" label="currency" placeholder="currency"></alopuselect>
                    <alopuselect class="currency-select" inputStore v-show="optIn('editing')" v-model="price.currency" :options="currencies" label="currency" placeholder="currency"></alopuselect>
                    .denominator $
                    <alopuselect class="ammount-select" inputStore placeholder="ammount" v-show="optIn('editing')" :pushTags="true" taggable v-model="price.fiat" :options="realms" label="realm"></alopuselect>
                    .signifier per
                    <alopuselect class="multiplier-select" inputStore placeholder="multiplier" v-show="optIn('editing')" :pushTags="true" taggable v-model="price.multiplier" :options="realms" label="realm"></alopuselect>
                    <alopuselect class="unit-select" inputStore placeholder="unit" v-show="optIn('editing')" v-model="price.unit" :options="priceUnits" label="unit"></alopuselect>
                    .action(@click="removePrice(index)")
                      icon(name="remove")
              //- .action(@click="free = false" v-if="free") Add price
            .option.pill.postas(v-show="optIn('postas')")
              //- .label(v-show="optIn('editing')") post as: 
              alopuselect(
                :inputStore="true"
                placeholder="post as" 
                :taggable="true"
                :pushTags="true" 
                v-model="resourceMutable.ownerAlias" 
                :options="alterEgos"
                :value="resourceMutable.ownerAlias"
                )
            .option.feedback(v-if="feedback")
              .msg {{ feedback.msg }}
                .action(
                  v-if="feedback.type !== 'delete'"
                  @click="setFeedback()"
                  ) Thank you
                .action(
                  v-if="feedback.type == 'delete'"
                  @click="deleteResource(true)"
                  ) Yes
          .option.question(v-if="(!optIn('editing') && resourceMutable.realms && (resourceMutable.realms.indexOf('question') >= 0) && resourceMutable.realms.indexOf('boolean') >= 0)")
            .action.tf true 
            .action.tf false 
          .option.answer(v-if="(!optIn('editing') && resourceMutable.realms && (resourceMutable.realms.indexOf('answer') >= 0))")
            .action.tf agree 
            .action.tf disagree 
          .option.answer(v-if="(!optIn('editing') && resourceMutable.realms && (resourceMutable.realms.indexOf('answer') >= 0) && resourceMutable.realms.indexOf('boolean') >= 0)")
            .action.tf true 
            .action.tf false 
          
          .option.resources(v-show="optIn('inventory')")
            //- .label resources:
            inventory(
              v-if="!optIn('icon')"
              :noTitle="true"
              inventoryFeedback="These are the resources of the above resource"
              :inventory="resourceMutable" 
              :options="['addable', 'put-first', 'owner-root']" 
              :resourceOptions="['icon', 'inventory-item']" 
              :newResourceOptions="['editing', 'icon', 'inventory-item']"
              )
            
    </transition>
</template>

<script>
// import resource from '@/components/resource'
import smartOpts from '@/components/mixins/smartOpts';
export default {
  mixins: [smartOpts],
  data () {
    return {
      resourceMutable: this.resourceComputed || this.resource,
      entity: this.$store.state.entity,
      feedback: null,
      realms: this.$store.state.realms,
      resourceTypes: this.$store.state.resourceTypes,
      resourceNames: this.$store.state.resourceNames,
      priceUnits: this.$store.state.priceUnits,
      currencies: this.$store.state.currencies,
      urls: [
        "http://agora.dev/forum",
        "http://lopu.com.au",
        "http://agora.lopu.com.au"
      ],
      err: null,
      alterEgos: [this.$store.state.entity.username ? this.$store.state.entity.username : 'anonymous', 'anonymous'],
      resourceInputOptions: {
         toolbar: {
          //  buttons: ['bold', 'strikethrough', 'h1']
        },
        placeholder: {
          text: this.resourceMutable ? this.resourceMutable.stateType == 'new' ? 'Start typing to add a new resource' : "Start typing to begin editing this resource's text" : 'Start typing to add a new resource',
          hideOnClick: false
        }
      },
      optionsMutable: this.options,
      neighboursMutable: this.neighbours
    }
  },
  sockets: {
    connect: function(){
      // console.error("socket connect vue side")
    },
    giveResource(data){
      if(this._uid == data.id || this.resource._id == data.resource._id){
        this.resourceMutable = data.resource
        this.resourceMutable.clientId = this._uid
        this.setFeedback(data.feedback)
      } else if ((this.inventoryId == data.inventoryId && this.index == data.index) || this.resource._id == data.resource._id){
        this.resourceMutable = data.resource
        this.resourceMutable.clientId = this._uid
        this.setFeedback(data.feedback)
      } 
      // DONT NEED THIS RIGHT?
      // else if (this._uid == data.id){
      //   this.resourceMutable = data.resource
      //   this.setFeedback(data.feedback)
      // }
    }
  },
  created () {
    this.neighboursMutable = this.neighbours
    if(typeof this.resourceMutable == 'object'){
      this.resourceMutable.clientId = this._uid
      this.resourceMutable.mappedInventory = this.resourceMutable.mappedInventory || {}
      this.mapInventory(this.resourceMutable, this.resourceMutable.mappedInventory)
    }
    let that = this
    setTimeout(function(){
      if(that.resourceMutable && that.resourceMutable.stateType == 'loading'){
        that.resourceMutable.stateType = 'waiting-hidden'
      }
      }, 12345)
  },
  mounted() {
    this.textProp = this.text
    this.optionsMutable = JSON.parse(JSON.stringify(this.options))
    this.neighboursMutable[this.index] = this.resourceMutable
  },
  methods: {
    getResource(opts){
      // this.$socket.emit('getResource', opts)
    },
    showOptions: function(){
      if(!this.optIn('icon') && !this.optIn('hiding') && !this.optIn('options')){
        this.pushOpts(['options'])
      }
    },
    showOptionsPerm: function(){
      this.pushOpts(['options', 'focused'])
      this.popOpts(['hiding'])
    },
    toggleOptions: function(){
      if(this.optIn('focused')){
        this.popOpts(['options', 'focused'])
        this.pushOpts(['hiding'])
      } else if (!this.optIn('icon')) {
        this.pushOpts(['options', 'focused'])
        this.popOpt('hiding')
      }
    },
    hideOptions: function(){
      this.popOpts(['options', 'focused'])
      this.pushOpt('hiding')
      setTimeout(this.popOpt('hiding'), 4000)
    },
    hideOptionsMaybe: function(){
      if(!this.optIn('focused')){
        this.popOpt('options')
        this.pushOpt('hiding')
        setTimeout(this.popOpt('hiding'), 3000)
      } else {
      }
    },
    createResource: function(){
      let allgood = true
      this.resourceMutable.forEach((field, index)=>{
        if(!field){
          allgood = false
        }
      })
      if(allgood){
        this.$socket.emit('makeResource', data)
      } else {
        this.setFeedback("please fill in all required data")
      }
    },
    postResource: function(){
      if(this.resourceMutable.description){

        for(let realm of this.requiredRealms){
          if(this.resourceMutable.realms.indexOf(realm) < 0){
            this.resourceMutable.realms.push(realm)
          }
        }
        // this.resourceMutable.
        this.$socket.emit('makeResource', this.fields)
      } else {
        this.setFeedback("please include some text for this post")
      }
    },
    saveResource: function(){
      if(this.resourceMutable.description){
        this.resourceMutable.owner = this.entity._id
        let opts = {
          resource: this.resourceMutable,
          id: this._uid
        }
        this.resourceMutable.clientId = this._uid
        this.$socket.emit('saveResource', opts)
      } else {
        this.setFeedback("please include some text for this post")
      }
    },
    forkResource: function(){
    },
    referenceResource: function(){
    },
    deleteResource(confirmed){
      if(confirmed == true){
        this.$emit('remove')
        // this.neighboursMutable.splice(this.index, 1)
        this.setFeedback(null)
      } else {
        this.setFeedback("Are you sure you want to delete this?", "delete")
      }
    },
    updateRealmsList: function(realm, loading){
      this.realms["searched"] = null
      this.realms.push({
        key: "searched",
        realm: realm
      })
      // if(this.realms.indexOf(realm) < 0){
      //   this.searchedRealm = [realm]
      // }

    },
    addPrice: function(){
      if(this.resourceMutable.prices){
        this.resourceMutable.prices.push({
          currency: null,
          fiat: null,
          multiplier: null,
          unit: null
        })
      } else {
        this.resourceMutable.prices = [
          {
            currency: null,
            fiat: null,
            multiplier: null,
            unit: null
          }
        ]
      }
    },
    removePrice(price){
      this.resourceMutable.prices.splice(price, 1)
    },
    handleEdit(operation){
      this.resourceMutable.description = operation.event.srcElement.innerHTML
    },
    mapInventory(currentResource, currentInventory, i){
      if(typeof currentResource == 'object' && currentResource.resources){
        for(let resourceOrInv of currentResource.resources){
          if(currentResource.resource){
            currentInventory[resourceOrInv.resource] = resourceOrInv
            this.mapInventory(resourceOrInv, currentInventory[resourceOrInv.resource], i++)
          }
        }
      }
    },
    setFeedback(msg, type){
      if(!msg){
        this.feedback = null
      } else {
        this.feedback = {
          msg,
          type
        }
      }
    }
  },
  watch: {
    '$store.state.entity': function(){
      this.entity = this.$store.state.entity
    },
    '$store.state.realms': function(){
      this.realms = this.$store.state.realms
      // this.searchRealms = this.$store.state.realms
    },
    '$store.state.resourceTypes': function(){
      this.resourceTypes = this.$store.state.resourceTypes
      // this.searchRealms = this.$store.state.realms
    },
    '$store.state.resourceNames': function(){
      this.resourceNames = this.$store.state.resourceNames
      // this.searchRealms = this.$store.state.realms
    },
    '$store.state.priceUnits': function(){
      this.priceUnits = this.$store.state.priceUnits
      // this.searchRealms = this.$store.state.realms
    },
    '$store.state.currencies': function(){
      this.currencies = this.$store.state.currencies
      // this.searchRealms = this.$store.state.realms
    },
    'resourceMutable': function(){
      let that = this
      setTimeout(function(){
        if(that.resourceMutable.stateType == 'loading'){
          that.resourceMutable.stateType = 'waiting-hidden'
        }
      }, 15000)
    }
    // '$store.state.entityMessage': function(){
    //   this.message = this.$store.state.entityMessage
    // }
  },
  props: {
    resource: {
      default: function(){
        return {
          description: undefined,
          resource: 'new resource',
          stateType: 'new'
        }
      }
    },
    neighbours: {
      default: function(){
        return []
      }
    },
    inventoryId: {},
    index: {},
    options: {
      type: Array,
      default: function(){return []}
    },
    type: {
      default: 'default',
      type: String
    }, 
    theme:{
      default: 'reddit',
      type: String
    },
    fieldsDraft: {
      default: function(){return undefined}
    },
    requiredRealms: {
      default: function(){ return [ {realm: 'all'} ] }
    }
    
  },
  computed: {
    resourceComputed: {
      get: function(){
        return this.resource || {
          description: '',
          parents: [this.inventoryId],
          resource: 'new resource',
          stateType: 'new'
        }
      }
    },
    fieldsComputed: {
      get: function(){
        return this.fieldsDraft || {
          title: null,
          description: this.resourceMutable ? this.resourceMutable.description : '',
          owner: this.$store.state.entity._id,
          ownerAlias: this.$store.state.entity.username,
          realms: null,
          names: null,
          url: null,
          parents: this.resourceMutable ? this.resourceMutable.parents : undefined
          // prices: [],
          // resources: null,
        }
      }
    }
  },
  components: {
    // 'inventory' : inventory
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import '~@/styles/vars'
.resource
  width: 100%
  max-width: 100%
  margin-bottom: 10px
  display: flex
  align-items: flex-start
  justify-content: center
  flex-direction: column
  z-index: 100
  overflow: visible
  .main-container
    display: flex
    position: relative
    align-items: center
    justify-content: center
    flex-direction: row
    width: 100%
    max-width: 100%
    background: $grey
    margin-bottom: 5px
    border-radius: 20px
    border-bottom-left-radius: 5px
    // border-bottom-right-radius: 5px
    .msg-container
      color: $friendly
      padding: 20px 10px
      // background: darken($grey, 0)
      cursor: pointer
      width: 100%
      max-width: 100%
      box-sizing: border-box
      display: flex
      align-items: flex-start
      justify-content: flex-start
      // flex-grow: 1
      .msg
        text-align: left
        white-space: normal
        word-break: break-word
        width: auto
      textarea
        font-size: .88rem !important
        color: $friendly
        background: rgba(black, 0)
        border: none
        outline: none
        // height: auto !important 
        width: 100% !important
      .medium-editor-element
        text-align: left
        outline: none
      .status-container
        display: flex
        width: 100%
        height: 100%
        align-items: center
        justify-content: center
  .options-container
    max-height: 15000px
    position: relative
    width: 100%
    max-width: 100%
    overflow: visible
    cursor: default
    // padding-left: 10px
    margin-bottom: 30px
    display: flex
    align-items: flex-start
    justify-content: flex-start
    flex-direction: row
    box-sizing: border-box
    .options-sizer
      width: 100%
      max-width: 100%
      overflow: visible
      cursor: default
      display: flex
      align-items: flex-start
      justify-content: flex-start
      flex-direction: column
      flex-wrap: wrap
      box-sizing: border-box
    .option
      display: flex
      align-items: center
      justify-content: center
      flex-direction: row
      white-space: nowrap
      box-sizing: border-box
      // flex-grow: 1
      flex-shrink: 1
      // &:last-child
      //   margin-right: 10px
      .action
        margin-right: 4px
        display: flex
        align-items: center
        justify-content: center
        white-space: nowrap
        margin-left: 4px
        // color: inherit
        &.label
          margin-right: 0px
        &:first-child
          margin-left: 0px
        &:last-child
          margin-right: 0px
      .label-group
        display: flex
        align-items: flex-start
        justify-content: flex-start
        flex-direction: row
      
        // color: inherit

      &.realms
        // display: flex
        // align-items: flex-start
        // justify-content: flex-start
        // flex-direction: row
        input
          width: auto
          outline: none
          background: rgba(white, 0)
          border: none
          border-bottom: 1px solid rgba($friendly, .1)
          margin-left: 4px
          font-size: .87rem
          text-align: center
      &.resources
        width: 100%
        margin-top: 5px
        margin-left: auto
        margin-right: 0px
        padding: 0px 0px 5px 5px
        border-left: 1px solid rgba($green, .6)
        border-bottom: 1px solid rgba($green, .6)
        border-bottom-left-radius: 3px
        display: flex
        align-items: center
        justify-content: flex-start
        .btn
          margin-left: 4px
      
      &.postas
        // margin-left: auto
        .btn
          opacity: .6
          margin-left: 4px
          &.selected
            opacity: 1
          &.meta-selected
            opacity: 1
        select
          margin-left: 4px
          background: rgba(black, 0)
          outline: none
          border: none
          border-radius: 0px
          bottom: 0
          align-self: flex-end
          font-size: .87rem
          font-family: 'Avenir', Helvetica, Arial, sans-serif
          color: $friendly
      &.submit
        // margin-left: auto
      &.question
        .tf
          text-transform: uppercase
          font-weight: 900
          font-size: .7rem
          &:first-child
            margin-right: 4px
      &.commerce
        // margin-left: auto
      &.url
        // margin-left: auto
        .fa-icon
          // margin-left: 4px
      &.prices
        display: flex
        justify-content: flex-start
        align-items: flex-start
        .prices-list
          display: flex
          align-items: flex-start
          justify-content: flex-start
          flex-direction: column
          max-width: 100%
          .price
            max-width: 100%
            display: flex
            align-items: center
            justify-content: flex-start
            flex-direction: row
            margin-bottom: 5px
            .denominator
              margin-left: 5px
            .signifier
              margin-left: 5px
              margin-right: 5px
        .label-group
          .label
            margin-right: 0px
            border-bottom-right-radius: 0px
            border-top-right-radius: 0px
            +animate(all, 250ms, ease)
            cursor: pointer
            &.price-add
              background: $grey
              display: flex
              align-items: center
              justify-content: center
              // color: rgba(white, 0)
              font-weight: 900
              padding: 1px 12px
              margin-left: 0px
              color: $green
              font-size: 1.2rem
              border-bottom-right-radius: 9px
              border-top-right-radius: 9px
              border-bottom-left-radius: 0px
              border-top-left-radius: 0px
              .fa-icon
                // position: absolute
                color: $green
          &:hover
            .label
              // background: $grey
              // color: $green
              &.price-add
                // box-shadow: 0px 0px 40px -5px darken($green, 20) inset
                // background: $green
                // color: $grey
      &.pill
        // border-top-left-radius: 5px
        // border-bottom-left-radius: 5px
        // padding-right: 2px
        margin-bottom: 5px
        // padding-left: 0px
        max-width: 100%
        display: flex
        align-items: flex-start
        justify-content: flex-start
        flex-direction: column
        .action
          // color: inherit
          margin-right: 7px
        .label
          // margin-left: 2px
          background: $green
          color: white
          padding: 4px 10px
          border-radius: 7px
          text-transform: capitalize
          margin-right: 7px
          margin-bottom: 5px
    .options-group
      position: relative
      right: 0
      top: 0
      margin-top: 5px
      .option
        &:last-child
          // margin-right: 10px
      &.icons
        width: 100%
        display: flex
        align-items: flex-start
        justify-content: flex-end 
        flex-wrap: wrap
        .option
          margin-right: 15px
          margin-left: 15px
          margin-bottom: 10px
      &.current-input
        // margin-top: 30px
        position: relative
        left: 0
        right: auto
        width: 50%
        display: flex
        align-items: flex-start
        justify-content: center 
        flex-direction: column
  //Animations
  .options-enter-active, 
    transition: max-height 7000ms ease
  .options-leave-active 
    transition: max-height 3000ms ease
  .options-enter, 
  .options-leave-to
    // opacity: 0
    overflow: hidden
    max-height: 0px
  &.editing
    z-index: 105
    .main-container
      display: flex
      position: relative
      align-items: flex-start
      justify-content: center
      flex-direction: row
      width: 100%
      max-width: 100%
      // border: 1px solid rgba($green, .2)
      // background: $grey
      background: $green
      .msg-container
        color: white
        background: rgba($grey, 0)
        border: none
        width: 100%
        max-width: 100%
        height: 100%
        padding: 20px 10px
        margin-bottom: 0px
      .upload-container
        max-width: 20%
        width: 100%
        height: 100%
        padding: 20px 10px
        box-sizing: border-box
        display: flex
        align-items: center
        justify-content: flex-start
        flex-direction: column
        .img-inputer
          width: 100%
          height: 60px
            outline: none
    .options-container
      .options-sizer
        .option
          &.url
            .action
              // margin-left: 10px
              // margin-right: 10px
              &:first-child
                // margin-right: 30px
              .icon-wrapper
                width: 100%
            .fa-icon
              // height: 1.4rem
              // width: auto
              // /* You would have to include the following two lines to make this work in Safari */
              // max-width: 100%
              // max-height: 100%              
            .link
              position: relative
              .input-popup-positioner
                display: none
                align-items: center
                justify-content: center
                position: absolute
                top: -110%
                right: 0
                width: 100%
                overflow: visible
                .input-popup
                  z-index: 10
                  .input-wrapper

                  input,
                  .input
                    // border: none
                    border: 1px solid $greenhover
                    padding: 5px 10px
                    min-width: 150px
                    font-size: .8rem
                    background: white
                    width: auto
                    text-align: center
                    outline: none
                    display: flex
                    align-items: center
                    justify-content: center
                    cursor: text
                    &[contenteditable=true]:empty:before
                      content: attr(placeholder)
                      display: block
                .input-diamond-positioner
                  width: 100%
                  display: flex
                  align-items: center
                  justify-content: center
                  position: absolute
                  bottom: 0px
                  height: 1px
                  overflow: visible
                  z-index: 5
                  .input-diamond
                    // bottom: 50%
                    height: 10px
                    width: 10px
                    transform: rotate(45deg)
                    background: $greenhover
                  // border-right: 1p
              &:hover
                .input-popup-positioner
                  display: flex
              // margin-top: 5px
              // width: 100%
              // input
              //   width: 100%
              //   border: none
              //   font-size: .8rem
              //   border-bottom: 1px solid rgba(darken($grey,5),1)
      
          &.resources
            // display: inline-block
            align-items: flex-start
            justify-content: flex-start
            position: relative
            // flex-grow: 1
            .label
              display: inline-block
            .inventory-container
              display: inline-block !important
          &.resourceType,
          &.resourceNames
            align-items: flex-start
            justify-content: flex-start
          &.resourceNames
            
  &.icon
    width: 80px
    height: 80px
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
    .name-container
      max-height: 100%
      max-width: 100%
      overflow: hidden
      align-self: center
      width: 100%
      display: flex
      justify-content: center
      align-items: flex-start
      padding: 4px
      box-sizing: border-box
      color: $green
      .name
        width: 100%
        height: 100%
        max-height: 100%
        overflow: hidden
        // display: flex
        // justify-content: center
        // align-items: center
        white-space: normal
        word-break: break-word
        border: none
        box-sizing: border-box
        hyphens: auto
        >:first-child
          margin-top: 15%
    .main-container
      width: 100%
      height: 100%
      border: none
      margin: 0
      background: rgba($grey, 0)
      display: flex
      align-items: center
      justify-content: center
  &.inventory-item
    margin-top: 4px  
  @keyframes anim
    0%
      display: none;
      opacity: 0;
    1%
      display: block;
      opacity: 0;
      transform: scaleY(0);
    100%
      opacity: 1;
      transform: scaleY(1);
  
</style>
<style lang="sass">
@import '~@/styles/vars'
.resource
  &.editing
    .msg-container
  .msg-container
    .msg
    .medium-editor-element
      width: 100%
      box-sizing: border-box
      // display: flex
      // align-items: flex-start
      // justify-content: flex-start
      // flex-direction: column
      // &[contenteditable=true]:empty:before
      //   content: attr(placeholder)
      //   display: block
      >*
        // order: 2
      &.medium-editor-placeholder:after
        margin-top: 0px
        // order: 1
        max-width: 100%
        white-space: normal
        word-break: break-word
        position: relative
        // top: auto
        // left: auto
        &:first-child
          // font-size: 1.5rem
          // border-bottom: 1px solid darken($grey, 5)
  .options-container
    .option      
      &.realms,
      &.url,
      &.resourceType,
      &.resourceNames,
      &.prices,
      &.postas,
      &.privacy
        .alopuselect
          $font-size: 1rem
          font-size: $font-size
          line-height: $font-size
          height: 100%
          max-width: 100%
          // background: white
          // border-radius: 7px
          // border-top-right-radius: 7px
          // border-bottom-right-radius: 7px
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
            // overflow-x: scroll
            // overflow-y: hidden
            width: auto
            max-width: 250px
            &:after
              display: none
            .input-container
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
                word-break: break-word
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
              margin-right: 5px
            .active,
              background-color: rgba($green, .5)
            .highlight
              background-color: $green
              a
                background-color: inherit
        .price
          .alopuselect
            &.currency-select
              min-width: 90px
              max-width: 90px
            &.ammount-select
              min-width: 90px
              max-width: 90px
            &.multiplier-select
              min-width: 90px
              max-width: 90px
            &.unit-select
              min-width: 100px
              max-width: 100px
            .form-control
              text-align: center
        &.pill
          .alopuselect
            // display: none
            .dropdown-toggle
              flex-direction: column                
              flex-wrap: nowrap
              .form-control
                // background: $green
                background: white
                border: 1px solid $green
                border-radius: 8px
                padding: 1px 5px
                // margin-top: 3px
                // margin-bottom: 5px
              .selected-tag-list
                .selected-tag
                  border-radius: 8px
                  // overflow: hidden
                  margin: 0px
                  padding: 4px 9px
                  background: $green
                  color: white
                  margin-top: 5px
                  margin-right: 5px
      // &.postas
      //   input
      //   .alopuselect
      //     $font-size: 1rem
      //     font-size: $font-size
      //     line-height: $font-size
      //     .dropdown-toggle
      //       border: none !important
      //       border-radius: 0px !important
      //       display: flex
      //       align-items: center
      //       justify-content: flex-start
      //       flex-direction: row
      //       flex-wrap: no-wrap
      //       overflow-x: scroll
      //       overflow-y: hidden
      //       width: auto
      //       // max-width: 80px
      //       .form-control
      //         height: auto !important
      //         background: rgba(black, 0)  
      //         font-size: $font-size
      //         line-height: $font-size 
      //         font-family: $family
      //         padding: 0 4px
      //       .selected-tag
      //         margin: 0
      //         margin-left: 4px
      //         padding: 0
      //         padding-right: 9px
      //         height: auto
      //         font-size: $font-size
      //         line-height: $font-size
      //         background: rgba(black, 0)
      //         color: $friendly
      //         font-family: $family
      //         width: auto
      //         max-height: 100%
      //         white-space: nowrap
      //         position: relative
      //         &:first-child
      //           // margin-left: 4px
      //         button
      //           top: 0
      //           position: absolute
      //           align-self: flex-start
      //           bottom: auto
      //           float: right
      //           font-size: .85rem
      //           line-height: .2rem
      //           // font-weight: 900
      //           color: rgba(darken($green, 0),.5)
      //           opacity: 1
      //       .open-indicator
      //         bottom: 0px
      //         display: flex
      //         align-items: center
      //         justify-content: center
      //         &:before
      //           height: 5px
      //           width: 5px
      //           border-width: 1px 1px 0 0
      //     .dropdown-menu
      //       border: 1px solid rgba($friendly, .15)
                // margin-left: 0px
      .inventory-container
        padding: 0px
</style>