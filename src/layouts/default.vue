<template lang="pug">
	q-layout(
		view="HHH dpR fff"
		)
		q-layout-drawer(
			side="right"
			v-model="mainDrawer"
			:overlay="true"
			).z-top.flex.column
			//- q-toolbar(
			//-   color="primary"
			//-   )
				//- q-btn(
				//-   icon="close"
				//-   @click="mainDrawer = !mainDrawer"
				//-   ).shadow-0
			q-list.no-border
				q-item(
					)
					q-item-side
						q-item-tile(
							avatar
							sparse
							@click="mainDrawer = !mainDrawer"
							).q-item-tile-profile-picture
							//- :style=`{
							//-   height: '50px',
							//-   width: 'auto'
							//- }`
							img(
								src="/statics/neo.png"
								).br-none
					q-item-main(
					)
						q-item-tile(
							label
						) Neo
						q-item-tile(
							sublabel
							size=".5rem"
							) 010010100101
					q-item-side(
						)
						q-btn(
							icon="close"
							@click="mainDrawer = !mainDrawer"
						).shadow-0
				//- q-item-separator
				//- q-collapsible(
					label="Notifications"
					color="primary"
					avatar="/statics/planet-earth.png"
					).text-center.notifications-collapsible.icon-avatar.square-avatar
					//- q-item()
						q-item-side(
							icon="public"
							color="primary"
							)
					//- q-collapsible(
						label="Messages"
					)
				q-item-separator
				q-collapsible(
					label="Inventory"
					).q-pr-xs
					//- avatar="/statics/box.png"
					q-list.no-border.q-pl-sm
						img(
							v-for="num in 1"
							src="/statics/box.png"
							).q-img-lg.q-mr-md.q-mb-md
				//- q-item-separator
				//- q-collapsible(
					label="Profile"
					avatar="/statics/neo.png"
					).icon-avatar
					//- q-collapsible(
						label="Current Location"
						avatar="/statics/where.png"
						)
						//- q-item-separator()
						//- q-list()
							q-item(
							)
								q-item-side(
									avatar="/statics/devices.png"
								)
								q-item-main(
									label="Available Devices"
									sublabel="Link a Device"
									)
							q-item-separator()
							q-item(
							)
								q-item-side(
									avatar="/statics/smartphone.png"
								)
								q-item-main(
									label="Samsung Galaxy S5"
									sublabel="23 Conley St, Noble Park, 3174"
									)
								q-item-side(
									avatar="/statics/location-yes.png"
								)
							q-item-separator()
							q-item(
							)
								q-item-side(
									avatar="/statics/smartphone.png"
								)
								q-item-main(
									label="Motorola X Play"
									sublabel="40 Highett Rd, Moorabin"
									)
								q-item-side(
									avatar="/statics/location-no.png"
								)
							q-item-separator()
							q-item(
							)
								q-item-side(
									avatar="/statics/computer-screen.png"
								)
								q-item-main(
									label="Macbook Pro"
									)
								q-item-side(
									avatar="/statics/location-no.png"
								)
							q-item-separator()
							q-item(
							)
								q-item-side(
									avatar="/statics/tablet.png"
								)
								q-item-main(
									label="Nexus 7"
									sublabel="23 Conley St, Noble Park, 3174"
									)
								q-item-side(
									avatar="/statics/location-no.png"
								)
							q-item-separator()
							q-item
								q-btn(
									label="add a device"
									wide
								)
			q-toolbar(
				background="secondary"
				).q-mt-auto.no-border.bg-none.q-pl-sm
				q-item(
					)
					q-item-main(
						label="login"
					).text-tertiary
				//- q-item(
					)
					q-item-main(
						label="logout"
					)
				q-item(
					)
					q-item-main(
						label="register"
					).text-tertiary
				//- q-item(
					)
					q-item-main(
						label="settings"
					)
		q-page-container.q-pt-none
			router-view.router-view(:siteTitle="siteTitle")
		navbar(
			@toggleDrawer="mainDrawer = !mainDrawer"
		)
			
</template>

<script>
import { openURL } from 'quasar'
import navbar from '@/components/nav'
import sidebar from '@/components/sidebar'

export default {
	name: 'LayoutDefault',
	data () {
		return {
			mainDrawer: false,
		}
	},
	mounted(){
    if (this.$route.hash) {
    	this.scrollTo(this.$route.hash)
    }
	},
	methods: {
	},
	props:{
		siteTitle: {}
	},
	components: {
		navbar,
		sidebar
	}
}
</script>

<style>
</style>
