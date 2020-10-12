<script>
	import {
		mapActions,
		mapMutations
	} from 'vuex'
	export default {
		created() {

		},
		methods: {
			async getLocation() {
				return await new Promise((resolve, reject) => {
					wx.getLocation({
						success(location) {
							resolve(location)
						},
						fail(err) {
							console.log(err)
							reject(err)
						}
					})
				})
			}
		}
	}
</script>

<style>
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import './common/uni.css';
</style>
