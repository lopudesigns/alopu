// import something here

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
	// something to do
	// var vm = new Vue({
	// 	el: "#q-app"
	// })
  Vue.mixin({
    methods: {
			scrollTo: function (hashtag) {
				var still = true
				setTimeout(() => { still = false }, 1000)
				var that = this
				var checkExist = setInterval(function() {
					console.log('start')
					console.log(Vue.$refs)
					console.log(this.$refs)
					console.log(that.$refs)
					console.log(that.$refs[hashtag])
					console.log(vm)
					console.log('stop')
					if (that && that.$refs && that.$refs[hashtag]) {
						console.log('moving')
						location.href = hashtag
						clearInterval(checkExist)
					} else if(!still){
						clearInterval(checkExist)
					}
				}, 10)
			}
		}
  })
}
