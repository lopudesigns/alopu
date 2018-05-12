<template lang='pug'>
	.ico
		.banner-container
			.banner-position-helper
				.banner-sizer
		.contents-container
			.contents-positioner
				template(
					v-for="link in links"
					)
					.content-container
						.content-positioner
							.content-title-container
								.content-title-positioner
									q-btn(
										color="primary"
										:label="link.text"
										@click="$router.push(link.url)"
									)
</template>

<script>
export default {
	name: 'ico-comp',
	data () {
		return {
			// objects: null,
			uuid: this._uid,
			links: [
				{
					text: 'things',
					url: 'ico/things'
				},
				{
					text: 'inventories',
					url: 'ico/things/inventories'
				},
				{
					text: 'objects',
					url: 'ico/things/objects'
				},
				{
					text: 'arrays',
					url: 'ico/things/arrays'
				},
				{
					text: 'sandbox',
					url: 'ico/things/sandbox'
				},
				{
					text: 'manifest',
					url: 'ico/things/manifest'
				},
				{
					text: 'styles',
					url: 'ico/things/styles'
				},
				{
					text: 'options',
					url: 'ico/things/options'
				},
				{
					text: 'status',
					url: 'ico/status'
				},
				{
					text: 'etc',
					url: 'ico/etc'
				},
				{
					text: 'alopu',
					url: 'ico/alopu'
				},
				{
					text: 'source',
					url: 'ico/source'
				},
				{
					text: 'whitepaper',
					url: 'ico/whitepaper'
				},
			]
		}
	},
	sockets: {
		connect: function(){
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
.ico
	width: 100%
	max-width: 100%
	overflow: hidden
	// background: $grey
	.contents-container
		height: 100vh
		.contents-positioner
			height: 100vh
			display: flex
			align-items: center
			justify-content: center
			flex-direction: column
			.q-btn
				margin: 5px 0px
				+animate(all, 600ms, ease)
				&:hover
					margin: 8px 0px
</style>
