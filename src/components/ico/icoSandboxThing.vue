<template lang='pug'>
	.icoThings
		.icoThings-container
			.icoThings-positioner
				//- img(style="max-width: 220px" src="../statics/agoraLogo.png")
				intro
						//- .inline {{ siteTitle }}
						//- .capitalize.inline Agora
				.inventories-container.vertical
					thing(
						:thing=`sandboxThing`
						)
				.buttons-container
					.button-container(@click="makeProperty")
						.button make property
					.button-container(@click="commit")
						.button commit
					.button-container(@click="resetThing")
						.button reset
</template>

<script>
import {mapState} from 'vuex'
import smarts from 'smarts'
import thing from 'components/thing'
import intro from 'components/intro/.vue'
export default {
	mixins: [smarts({
		vue: {
			reactiveSetter: true,
			vm: this
		}
	})],
	name: 'icoThings-comp',
	data () {
		return {
			entity: this.$store.state.entity,
			uuid: this._uid,
			wait: 2000
		}
	},
	sockets: {
		connect: function(){
			// console.log("socket connect vue side")
		},
		// giveObjects(data){
		//   // console.log(data)
		//   if(this.uuid == data.id){
		//     this.objects = data.objects
		//   }
		// }
	},
	created () {
		let that = this
		this.wait = setInterval(function(){
			that.$store.commit('sandboxThingSet', that.sandboxThing)
		}, 1000)
		// if(this.count !== 0){
		//   this.getObjects({
		//     count: this.count,
		//     sort: 'alphabetical',
		//     sortDirection: 'ascending',
		//     id: this.uuid
		//   })
		// } else {
		//   this.objects = null
		// }
	},
	methods: {
		// getObjects(opts){
		//   this.$socket.emit('getObjects', opts)
		// }
		commit(){
			// this.$store.commit('sandboxThingSet', this.sandboxThing)
		},
		setRandomText(){
			console.log(Math.random(1000).toString())
			this.$set(this.sandboxThing, 'description', Math.random(1000).toString())
		},
		setRandomNum(){
			this.$set(this.sandboxThing, 'description', Math.random(1000).toString())
		},
		makeProperty(){
			this.pushOpt('property', this.sandboxThing.names)
		},
		resetThing(){
			this.sandboxThing = this.jsmart.parse(this.jsmart.stringify(this.$store.state.ico.sandboxThingSchema))
		},
	},
	props: {
		"siteTitle": {}
	},
	components: {
		thing,
		intro
	},
	watch: {
		// '$store.state.entity': function(){
		//   this.entity = this.$store.state.entity
		// },
	},  
	computed: {
		sandboxThing: {
			get(){
				return this.$store.state.ico.sandboxThing
			},
			set(){
				clearInterval(this.wait)
				let that = this
				this.wait = setInterval(function(){
					that.$store.commit('sandboxThingSet', that.sandboxThing)
				}, 2000)
				this.$store.commit('resetSandboxThing', true)
			}
		},
	},
	route: {
		canActivate(){
			return true
		}
	}}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import 'src/styles/vars'
@import 'src/components/icoThings/.sass'
					
.inventories-container
	display: flex
	align-items: flex-start
	justify-content: center
	width: 100%
	padding-left: 10%
	padding-right: 10%
	box-sizing: border-box
	padding-bottom: 20px
	.thing
		max-width: 1000px
	&.vertical
		align-items: center
		justify-content: flex-start
		flex-direction: column
		// padding-left: 0%
		// padding-right: 0%
		&.inventory-width
			width: 50%
			.inventory-mode
				width: 100%
		.thing
			margin-bottom: 20px
	&.maps-inventory-container
		padding-left: 0%		
		padding-right: 0%
		padding-bottom: 100px		
		.inventory-mode
			width: 100%
		.thing
			max-width: 100%
	&.no-padding
		padding: 0%
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

