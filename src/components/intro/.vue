<template lang='pug'>
	.intro-container
		img.noselect(style="max-width: 100%" src="statics/logo.png" title="yes, this is the vue logo upside down")
		.intro-text-container
			.intro-text Welcome
</template>

<script>
export default {
	name: 'intro',
	data () {
		return {
			// objects: null,
			uuid: this._uid
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
	},
	props: {
		"siteTitle": {}
	},
	components: {
	},
	watch: {
		// '$store.state.entity': function(){
		//   this.entity = this.$store.state.entity
		// },
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
@import './.sass'
.intro-container
	width: 100%
	max-width: 100%
	overflow: hidden
	display: flex
	align-items: center
	justify-content: center
	flex-direction: column
	padding-top: 110px
	padding-bottom: 40px
	// background: $grey
	.intro-text-container
		margin-top: 8px
		margin-bottom: 40px
		.intro-text
			display: inline-block
</style>