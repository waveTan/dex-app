<template>
	<view class="container">
		<web-view :src="url" @message="receiveMsg"></web-view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		onReady() {
			uni.setNavigationBarColor({
				frontColor: '#ffffff',
				backgroundColor: '#000000',
				animation: {
					duration: 400,
					timingFunc: 'easeIn'
				}
			})

		},
		onLoad(option) {
			this.url = '/hybrid/html/index.html?hash=68b627d91ba4412a1bf56c3c5311b67a34c093fc5551dc8b836e2644cad76320';
			console.log(this.url);
			uni.setNavigationBarTitle({
				title: 'NVT/NULS'
			});
			this.symbol = 'NULS';
			console.log("option:NULS")
		},
		data() {
			return {
				symbol: ' ',
				url: ''
			}
		},
		components: {

		},
		computed: {

		},
		methods: {
			receiveMsg(e) {
				uni.setStorage({
					key: 'market',
					data: e.detail.data[0],
					success: function() {
						uni.switchTab({
							url: "/pages/trade/main"
						})
					}
				});
			}
		}
	}
</script>

<style scoped>
	.container {
		background: #000000;
	}
</style>
s
