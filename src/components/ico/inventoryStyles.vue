<template lang='pug'>
	.icoThings
		.icoThings-container
			.icoThings-positioner
				intro
				.inventories-container.vertical
					thing(
						:thing=`{
							title: 'Your Inventory',
							description: 'Somethings description..',
							properties: [
								{
									title: 'options',
									names: ['property'],
									list: [
										//- 'focused',
										//- 'editing',
										'inventory mode',
										'show inventory',
										//- 'slotted',
										//- 'show slots',
										//- 'shrink slot icons',
										//- 'generate slots',
										//- 'put-first',
										'put new things first',
										'dont load childrens children',
										'put addable last',
										//- 'hide addable button',
										'properties not addable',
										//- 'holo mode',
										'show properties',
										],
									type: Array,
									properties: [
										{
											title: 'options',
											names: ['property'],
											list: [
												'show value'
											]
										},
										{
											title: 'array type',
											type: String
										}
									]
								}
						],
						things: [
							//- {
							//- 	title: 'test'
							//- },
						]
					}`)
					thing(
						:thing=`{
							title: 'Your Inventory',
							description: 'Somethings description..',
							properties: [
								{
									title: 'options',
									names: ['property'],
									list: [
										//- 'focused',
										//- 'editing',
										'inventory mode',
										'show inventory',
										'slotted',
										//- 'show slots',
										//- 'shrink slot icons',
										//- 'generate slots',
										//- 'put-first',
										'put new things first',
										'dont load childrens children',
										'put addable last',
										//- 'hide addable button',
										'properties not addable',
										//- 'holo mode',
										'show properties',
										],
									type: Array,
									properties: [
										{
											title: 'options',
											names: ['property'],
											list: [
												'show value'
											]
										},
										{
											title: 'array type',
											type: String
										}
									]
								}
						],
						things: [
							//- {
							//- 	title: 'test'
							//- },
						]
					}`)
					thing(
						:thing=`{
							title: 'Your Inventory',
							description: 'Somethings description..',
							properties: [
								{
									title: 'options',
									names: ['property'],
									list: [
										//- 'focused',
										//- 'editing',
										'inventory mode',
										'show inventory',
										'slotted',
										'show slots',
										//- 'shrink slot icons',
										//- 'generate slots',
										//- 'put-first',
										'put new things first',
										'dont load childrens children',
										'put addable last',
										//- 'hide addable button',
										'properties not addable',
										//- 'holo mode',
										'show properties',
										],
									type: Array,
									properties: [
										{
											title: 'options',
											names: ['property'],
											list: [
												'show value'
											]
										},
										{
											title: 'array type',
											type: String
										}
									]
								}
						],
						things: [
							//- {
							//- 	title: 'test'
							//- },
						]
					}`)
					thing(
						:thing=`{
							title: 'Your Inventory',
							description: 'Somethings description..',
							properties: [
								{
									title: 'options',
									names: ['property'],
									list: [
										//- 'focused',
										//- 'editing',
										'inventory mode',
										'show inventory',
										'slotted',
										'show slots',
										'shrink slot icons',
										//- 'generate slots',
										//- 'put-first',
										'put new things first',
										'dont load childrens children',
										'put addable last',
										//- 'hide addable button',
										'properties not addable',
										//- 'holo mode',
										'show properties',
										],
									type: Array,
									properties: [
										{
											title: 'options',
											names: ['property'],
											list: [
												'show value'
											]
										},
										{
											title: 'array type',
											type: String
										}
									]
								}
						],
						things: [
							//- {
							//- 	title: 'test'
							//- },
						]
					}`)
					thing(
						:thing=`{
							title: 'Your Inventory',
							description: 'Somethings description..',
							properties: [
								{
									title: 'options',
									names: ['property'],
									list: [
										//- 'focused',
										//- 'editing',
										'inventory mode',
										'show inventory',
										'slotted',
										'show slots',
										'shrink slot icons',
										'generate slots',
										//- 'put-first',
										'put new things first',
										'dont load childrens children',
										'put addable last',
										//- 'hide addable button',
										'properties not addable',
										//- 'holo mode',
										'show properties',
										],
									type: Array,
									properties: [
										{
											title: 'options',
											names: ['property'],
											list: [
												'show value'
											]
										},
										{
											title: 'array type',
											type: String
										}
									]
								}
						],
						things: [
							//- {
							//- 	title: 'test'
							//- },
						]
					}`)
</template>

<script>
import thing from 'components/thing'
import intro from 'components/intro/.vue'
export default {
	name: 'icoThings-comp',
	data () {
		return {
			entity: this.$store.state.entity,
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
		thing,
		intro
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
			margin-bottom: 90px
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

