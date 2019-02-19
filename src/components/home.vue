<template lang='pug'>
	.home
		//- img(style="max-width: 220px" src="../statics/agoraLogo.png")
		.particles-container
			.particles-positioner
				.particles
					vue-particles.vue-particles(
					shapeType="image"
					:moveSpeed="2.5"
					:image=`{
						src: '/statics/box.png'
						}`
					color="#42b983"
					linesColor="#42b983"
					:opacity="1"
					:particlesNumber="14"
					:lineLinked="true"
					:lineOpacity=".45"
					:linesDistance="180"
					:particleSize="20"
						)
					//- :linesWidth="1"
		.home-positioner
			img.noselect(
				style="max-width: 100%; opacity: .978;" 
				src="statics/logo.png" 
				title="yes, this is the vue logo upside down"
				alt="yes this is the vue logo upside down :P"
				)
				//- ref="logo"
				//- @click="spinLogo"
			.intro-text-container
				.intro-text Welcome to Alopu, a platform for anything and everything
					//- span(style="padding: 0px 5px; font-size: 16px;") Anything 
					//- | and 
					//- span(style="padding: 0px 5px; font-size: 16px;") Everything 
				.intro-cta
					q-btn(
						color="primary"
						label="How it works"
						@click="$router.push('#docs') ; scrollTo('#docs')"
					)
					//- @click="location.href = '#docs'"
					//- q-btn(
					//- 	color="primary"
					//- 	label="ICO"
					//- 	@click="$router.push('/ico')"
					//- )
				//- .capitalize.inline Agora
		docs
		//- feed example
		.inventories-container.vertical
</template>

<script>

import search from 'src/components/search'
import smarts from 'smarts'
import thing from 'src/components/thing'
import docs from 'src/components/ico/ico'
export default {
	mixins: [
		smarts({
			vue: {
					reactiveSetter: true,
					vm: 'this'
			}, 
		})
	],
	name: 'home',
	data () {
		return {
			entity: this.$store.state.entity,
			pageHistory: this.$store.state.pageHistory,
			frontPageThing: {
				title: 'The Collective Inventory',
				names: ['a lopu inventory generator'],
				uuid: 'hngg',
				properties: [
					{
						title: 'a saveable lopu?',
						Boolean: false,
						type: 'Boolean'
					},
					{
						title: 'things schema',
						properties: [
							{
								title: 'properties schema',
								type: 'Array',
								Array: [
									{
										title: 'options',
										type: 'Array of Strings',
										'Array of Strings': [
											'show title'
										]
									}
								],


							}
						]
					},
					{
						title: 'things render limit',
						type: 'Number',
						Number: 20
					},
					{
						title: 'count',
						Number: 20,
						type: 'Number'
					},
					// {
					// 	title: 'dont gen this lopu',
					// 	Boolean: true,
					// 	type: 'Boolean'
					// },
					{
						title: 'sort',
						type: 'json',
						json: {
							created: -1
						}
					},
					{
						title: 'options',
						type: 'Array of Strings',
						'Array of Strings': [
							'no options',
							'addable',
							'put new things first',
							'dont load childrens children',
							'show inventory',
							'hide description',
							'put addable first',
							'template adder',
							//- 'location',
							'holo mode',
							'feed',
							]
					}
				]
			}
		}
	},
	sockets: {
		connect: function(){
		}
	},
	created() {
		this.$store.commit('addPage', this.$options.name)
	},
	methods: {
		spinLogo(){
			this.$refs.logo.classList.add('spin')
			let that = this
			this.$refs.logo.movingTimer = this.$refs.logo.movingTimer || 1000
			// clearTimeout()
			this.$refs.logo.movingTimer = setTimeout(function(){
				that.$refs.logo.classList.remove('spin')			
			}, this.$refs.logo.movingTimer)
		},
		queryNewThings(txt){
			this.setThing({
				option: {
					title: 'a special lopu regex to match',
					type: 'String',
					String: txt.title
				},
				list: this.gosmart(this, 'frontPageThing.properties', []),
				key: ['title'],
				push: true
			})
			this.popOpt('gotten', this.getsmart(this, 'frontPageThing.properties.mapped.options.Array of Strings', []))
			this.pushOpt('regen lopu', this.getsmart(this, 'frontPageThing.properties.mapped.options.Array of Strings', []))
		}
	},
	watch: {
		'$store.state.entity': function(){
			this.entity = this.$store.state.entity
			this.entity.inventory = this.$store.state.entity.inventory
		},
		'$store.state.pageHistory': function(){
			this.pageHistory = this.$store.state.pageHistory
		},
		// '$store.state.entity': function(){
		// 	this.entity = this.$store.state.entity
		// }
	},
	props: ["siteTitle"],
	components: {
				 search,
				 thing,
				 docs
		}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">

	.home
		display: flex
		align-items: center
		justify-content: center
		flex-direction: column
		// padding-top: 50px
		// padding-bottom: 200px
		width: 100%
		max-width: 100%
		.home-positioner
			display: flex
			align-items: center
			justify-content: center
			flex-direction: column
			max-width: 100%
			max-height: 100%
			min-height: 100vh
			z-index: 10			
			// pointer-events: none
	.search
		// padding-bottom: 10px
	.spin
		// +animate(transform, 400ms, ease)
		animation: spin 1000ms linear
	@keyframes spin
		0%
			transform: rotateZ(180deg)
		100%
			transform: rotateZ(539.99deg)
	.intro-text-container
		margin-top: 10px
		margin-bottom: 10px
		.intro-text
			display: flex
			align-items: center
			justify-content: center
			text-align: center
		.intro-cta
			padding-top: 20px
			display: flex
			align-items: center
			justify-content: center
			flex-direction: column
			.q-btn
				margin: 5px
	.inventories-container
		display: flex
		align-items: flex-start
		justify-content: center
		width: 100%
		padding-left: 10%
		padding-right: 10%
		box-sizing: border-box
		padding-bottom: 20px
		.inventory-mode
			// display: inline-block
			// width: 50%
		.thing
			max-width: 1000px
		&.vertical
			flex-direction: column
			// padding-left: 0%
			// padding-right: 0%
			&.inventory-width
				width: 50%
				.inventory-mode
					width: 100%
		&.maps-inventory-container
			padding-left: 0%		
			padding-right: 0%
			padding-bottom: 100px		
			.inventory-mode
				width: 100%
			.thing
				max-width: 100%
		&.stream-container
			padding-left: 10%
			padding-right: 10%
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

<style lang="stylus">
@import '~variables'
.home
	z-index 6
.particles-container
	// z-index: 5
	position: absolute
	width: 100%
	height: 100%
	.particles-positioner
		width: 100%
		height: 100%
		.particles
			width: 100%
			height: 100%
			.vue-particles
				width: 100%
				height: 100%
</style>