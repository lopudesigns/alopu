import CPS from 'vuex-persistedstate'
export default {
    // You can use it as state property
    state: {
        isAuthenticated: false,
        entity: {
            type: 'temporary',
            identity: 'anonymous',
            auth: false,
            username: undefined
        },
        authLogs: [],
        entityMessage: "welcome, <a href='/self'>" + (this.user ? this.user.username : 'anonymous') + "</a>",
        realms: [],
        resourceTypes: [
            {
                type: "object",
            },
            {
                type: "service",
            },
            {
                type: "inventory",
            },
            {
                type: "question",
            },
            {
                type: "answer",
            },
            {
                type: "moment",
            },
        ],
        resourceNames: [
            {
                name: "fork",
            },
            {
                name: "flashlight",
            },
            {
                name: "book",
            },
            {
                name: "food",
            },
            {
                name: "vegan lesagne",
            },
            {
                name: "sour strap",
            },
            {
                name: "wallet",
            },
            {
                name: "blanket",
            },
            {
                name: "mattress",
            },
        ],
        priceUnits: [
            {
                unit: "purchase",
            },
            {
                unit: "unit",
            },
            {
                unit: "use",
            },
            {
                unit: "click",
            },
            {
                unit: "second",
            },
            {
                unit: "minute",
            },
            {
                unit: "hour",
            },
            {
                unit: "day",
            },
            {
                unit: "cm",
            },
            {
                unit: "metre",
            },
            {
                unit: "km",
            },
            {
                unit: "mg",
            },
            {
                unit: "g",
            },
            {
                unit: "kg",
            },
            {
                unit: "tonne",
            },
        ],
        currencies: [
            {
                currency: "AUD",
            },
            {
                currency: "USD",
            },
            {
                currency: "EUR",
            },
            {
                currency: "REN",
            },
            {
                currency: "YEN",
            },
            {
                currency: "RUP",
            }
        ],
        sideBarOptions: [
            'closed'
        ]
    },
  
    getters: {
      isAuthenticated () {
        // return this.isAuthenticated
      },
      entityGetter(state){
          return state.entity
      },
      getUsername(state){
          return state.entity.username
      }
    },
    // setters: {

    // },
    // Mutation for when you use it as a state property
    mutations: {
        isAuthenticated (state, payload) {
            state.isAuthenticated = payload.isAuthenticated
        },
        entitySet (state, entity){
            state.entity = entity
            // update
        },
        newAuthLog (state, log){
            state.authLogs.push(log)
        },
        entityMessageUpdate(state, newMsg){
            state.userMessage = newMsg
        },
        SetRealms(state, realms){
            state.realms = realms
        },
        SetResourceTypes(state, resourceTypes){
            state.resourceTypes = resourceTypes
        }
    },
  
    actions: {
  
      // Perform VueAuthenticate login using Vuex actions
      login (context, payload) {
  
        // vueAuth.login(payload.user, payload.requestOptions).then((response) => {
        //   context.commit('isAuthenticated', {
        //     isAuthenticated: vueAuth.isAuthenticated()
        //   })
        // })
  
      }
    },
    plugins: [
        CPS()
    ],
  }