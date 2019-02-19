//- search(
			@go=`createNewGetter(data)`
			:options=`frontPageThing.things`
			label=`title`
			@searchText=`queryNewThings`
			)
		//- .inventories-container.stream-container.maps-inventory-container
			//- thing(
				:thing=`{
					title: 'The Collective Inventory',
					names: ['a lopu inventory generator', 'a lopu map'],
					uuid: 'woo',
					properties: [
						{
							title: 'a saveable lopu?',
							boolean: false
						},
						{
							title: 'realms to match',
							type: 'Array of Strings',
							'Array of Strings': ['posts']
						},
						{
							title: 'broadly match realms',
							boolean: true
						},
						{
							title: 'use this things location',
							boolean: true
						},
						{
							title: 'broadly match location',
							boolean: true,
							properties: [
								{
									title: 'how broad?',
									Number: 12,
									properties: [
										{
											title: 'unit',
											text: 'km'
										}
									]
								}
							]
						},
						{
							title: 'how broad?',
							Number: 12,
							json: {
								unit: {
									title: 'unit',
									text: 'km'
								}
							}
						},
						{
							title: 'limit',
							Number: 50
						}
			thing(
				:thing=`frontPageThing`
			)

		//- .inventories-container.vertical
			// html builder thing
			//- thing(
				:thing=`{
					names: ['a lopu root'],
					properties: [
						{
							title: 'options',
							names: ['property'],
							type: 'Array of Strings',
							'Array of Strings': [
								'show inventory',
								//- 'show properties',
								//- 'focused',
								//- 'editing',
								//- 'no options',
								'feed',
								'addable',
								//- 'put-first',
								//- 'put new things first',
								'dont load childrens children',
								'put addable last',
								'hide title',
								'hide description'
								],
						}
					],
					things: [{
						title: 'test thing',
						text: 'test thing description',
						properties: [
							{
								title: 'options',
								names: ['property'],
								type: 'Array of Strings',
								'Array of Strings': [
									'show options',
									'show properties',
									'focused',
									//- 'editing',
									'addable',
									'put-first',
									'put new things first',
									'dont load childrens children',
									'put addable last',
									'hide title'
									],
								properties: [
									{
										title: 'options',
										names: ['property'],
										type: 'Array of Strings',
										'Array of Strings': [
											//- 'show value'
										]
									}
								]
							},
							{
								title: 'some number',
								names: ['property'],
								Number: 5,
								type: Number,
								properties: [
									{
										title: 'options',
										names: ['property'],
										type: 'Array of Strings',
										'Array of Strings': [
											//- 'show value'
										]
									}
								]
							},
							{
								title: 'some boolean',
								names: ['property'],
								boolean: true,
								type: Boolean,
								properties: [
									{
										title: 'options',
										names: ['property'],
										type: 'Array of Strings',
										'Array of Strings': [
											//- 'show value'
										]
									}
								]
							},
							{
								title: 'some text',
								names: ['property'],
								text: 'fill me',
								type: String,
								properties: [
									{
										title: 'options',
										names: ['property'],
										type: 'Array of Strings',
										'Array of Strings': [
											//- 'show value'
										]
									}
								]
							},
							{
								title: 'some thing',
								names: ['property'],
								thing: {},
								type: Object,
								properties: [
									{
										title: 'options',
										names: ['property'],
										type: 'Array of Strings',
										'Array of Strings': [
											//- 'show value'
										]
									}
								]
							},
						]
					}]
				}`
				)
			// single thing
			//- thing(
				:thing=`{
					title: 'Your Inventory',
					description: 'Somethings description..',
					properties: [
						{
							title: 'options',
							names: ['property'],
							type: 'Array of Strings',
							'Array of Strings': [
								//- 'show options',
								//- 'show properties',
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
								'hide title',
								'properties not addable',
								//- 'holo mode'
								],
							properties: [
								{
									title: 'options',
									names: ['property'],
									type: 'Array of Strings',
									'Array of Strings': [
										'show value'
									]
								}
							]
						},
						{
							title: 'some number',
							names: ['property'],
							Number: 5,
							type: Number,
							properties: [
								{
									title: 'options',
									names: ['property'],
									type: 'Array of Strings',
									'Array of Strings': [
										//- 'show value'
									]
								}
							]
						},
						{
							title: 'some boolean',
							names: ['property'],
							boolean: true,
							type: Boolean,
							properties: [
								{
									title: 'options',
									names: ['property'],
									type: 'Array of Strings',
									'Array of Strings': [
										//- 'show value'
									]
								}
							]
						},
						{
							title: 'some text',
							names: ['property'],
							text: 'fill me',
							type: String,
							properties: [
								{
									title: 'options',
									names: ['property'],
									type: 'Array of Strings',
									'Array of Strings': [
										//- 'show value'
									]
								}
							]
						},
						{
							title: 'some thing',
							names: ['property'],
							thing: {},
							type: Object,
							properties: [
								{
									title: 'options',
									names: ['property'],
									type: 'Array of Strings',
									'Array of Strings': [
										//- 'show value'
									]
								}
							]
						},
					],
					things: [
						//- {
						//- 	title: 'test'
						//- },
					]
				}`)
			//- thing(
				:thing=`{
					title: 'Your Inventory',
					description: 'Somethings description..',
					properties: [
						{
							title: 'options',
							names: ['property'],
							type: 'Array of Strings',
							'Array of Strings': [
								//- 'show options',
								//- 'show properties',
								//- 'focused',
								//- 'editing',
								//- 'inventory mode',
								//- 'show inventory',
								'slotted',
								'show slots',
								'shrink slot icons',
								//- 'generate slots',
								//- 'addable',
								//- 'put-first',
								'put new things first',
								'dont load childrens children',
								'put addable last',
								'hide title',
								'properties not addable',
								'holo mode'
								],
							properties: [
								{
									title: 'options',
									names: ['property'],
									type: 'Array of Strings',
									'Array of Strings': [
										'show value'
									]
								}
							]
						},
						{
							title: 'some number',
							names: ['property'],
							Number: 5,
							type: Number,
							properties: [
								{
									title: 'options',
									names: ['property'],
									type: 'Array of Strings',
									'Array of Strings': [
										//- 'show value'
									]
								}
							]
						},
						{
							title: 'some boolean',
							names: ['property'],
							boolean: true,
							type: Boolean,
							properties: [
								{
									title: 'options',
									names: ['property'],
									type: 'Array of Strings',
									'Array of Strings': [
										//- 'show value'
									]
								}
							]
						},
						{
							title: 'some text',
							names: ['property'],
							text: 'fill me',
							type: String,
							properties: [
								{
									title: 'options',
									names: ['property'],
									type: 'Array of Strings',
									'Array of Strings': [
										//- 'show value'
									]
								}
							]
						},
						{
							title: 'some thing',
							names: ['property'],
							thing: {},
							type: Object,
							properties: [
								{
									title: 'options',
									names: ['property'],
									type: 'Array of Strings',
									'Array of Strings': [
										//- 'show value'
									]
								}
							]
						},
					],
					things: [
						//- {
						//- 	title: 'test'
						//- },
					]
				}`)
			//- thing(
				:thing=`{
					title: 'Your Inventory',
					description: 'Somethings description..',
					properties: [
						{
							title: 'options',
							names: ['property'],
							type: 'Array of Strings',
							'Array of Strings': [
								//- 'show options',
								//- 'show properties',
								//- 'focused',
								//- 'editing',
								//- 'inventory mode',
								//- 'show inventory',
								'slotted',
								'show slots',
								'shrink slot icons',
								//- 'generate slots',
								//- 'addable',
								//- 'put-first',
								'put new things first',
								'dont load childrens children',
								'put addable last',
								'hide title',
								'properties not addable',
								//- 'holo mode'
								],
							properties: [
								{
									title: 'options',
									names: ['property'],
									type: 'Array of Strings',
									'Array of Strings': [
										'show value'
									]
								}
							]
						},
						{
							title: 'some number',
							names: ['property'],
							Number: 5,
							type: Number,
							properties: [
								{
									title: 'options',
									names: ['property'],
									type: 'Array of Strings',
									'Array of Strings': [
										//- 'show value'
									]
								}
							]
						},
						{
							title: 'some boolean',
							names: ['property'],
							boolean: true,
							type: Boolean,
							properties: [
								{
									title: 'options',
									names: ['property'],
									type: 'Array of Strings',
									'Array of Strings': [
										//- 'show value'
									]
								}
							]
						},
						{
							title: 'some text',
							names: ['property'],
							text: 'fill me',
							type: String,
							properties: [
								{
									title: 'options',
									names: ['property'],
									type: 'Array of Strings',
									'Array of Strings': [
										//- 'show value'
									]
								}
							]
						},
						{
							title: 'some thing',
							names: ['property'],
							thing: {},
							type: Object,
							properties: [
								{
									title: 'options',
									names: ['property'],
									type: 'Array of Strings',
									'Array of Strings': [
										//- 'show value'
									]
								}
							]
						},
					],
					things: [
						//- {
						//- 	title: 'test'
						//- },
					]
				}`)
			//- .inventories-container.vertical.inventory-width
				thing(
					:thing='entity.inventory'
					:count=40
					:parentOptions=`['inventory mode',
						'show inventory',
						'addable',
						'put addable last',
						'owner-root',
						'owner-only',
						'put-options-last'
						]`
					)
				thing(
					:thing=`{owner: entity._id,
						title: 'Add to your wishlist',
						description: 'this is your wishlist, any things you put in here will be sent out to your peers',
						stateType: 'unlinked'
						}`
					:parentOptions=`['inventory mode',
						'show inventory',
						'addable',
						'put addable last',
						'owner-root',
						'owner-only',
						'put-options-last'
						]`
					)
		//- thing(
			:thing=`{
				names: ['a lopu inventory generator'],
				properties: [
					{
						title: 'realms to match',
						type: 'Array of Strings',
						'Array of Strings': ['tests']
					},
					{
						title: 'limit',
						Number: 5
					},
					{
						title: 'broadly match realms',
						boolean: true
					},
					{
						title: 'options',
						type: 'Array of Strings',
						'Array of Strings': [
							'no options',
							'addable',
							'no context',
							'put-first',
							'feed',
							'show-children-comments',
							'put new things first',
							'addable with template',
							'dont load childrens children',
							'wide-adder',
							'put addable last',
							'put-options-last'
							]
					}
				]
			}`
			)