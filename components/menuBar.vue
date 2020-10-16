<template>
	<view class="tabBar">
		<view v-for="(item,index) in tabBar" :key="item.url" class="tabbar_item" :class="{'active':item.url == currentPage}"
		 @click="navTo(item,index)">
			<image v-if="item.url == currentPage" :src="item.imgClick" mode=""></image>
			<image v-else :src="item.imgNormal" mode=""></image>
			<view class="text">{{item.text}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			currentPage: {
				type: String,
				default: 'index'
			}
		},
		data() {
			return {
				tabBar: [{
						url: 'home',
						text: '首页',
						imgNormal: './../../static/icon/home.png',
						imgClick: './../../static/icon/home-active.png'
					},
					{
						url: 'quotation',
						text: '行情',
						imgNormal: './../../static/icon/quotations.png',
						imgClick: './../../static/icon/quotations-active.png'
					},
					{
						url: 'trade',
						text: '交易',
						imgNormal: './../../static/icon/trade.png',
						imgClick: './../../static/icon/trade-active.png'
					}, {
						url: 'swap',
						text: '闪兑',
						imgNormal: './../../static/icon/asset.png',
						imgClick: './../../static/icon/asset-active.png'
					}, {
						url: 'assets',
						text: '资产',
						imgNormal: './../../static/icon/asset.png',
						imgClick: './../../static/icon/asset-active.png'
					}
				],
				level: ''

			};
		},
		mounted() {
			
		},
		created() {
			uni.hideTabBar({})
		},
		computed: {

		},
		methods: {
			navTo(item, index) {
				let _this = this;
				if (item.url !== _this.currentPage) {
					var isUrl = `/pages/${item.url}/main`
					const that = this
					uni.switchTab({
						url: isUrl
					})
				} else {
					/* this.$parent.toTop() */
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	//导航栏设置
	$isRadius:20upx; //左上右上圆角
	$isWidth:100vw; //导航栏宽度
	$isBorder:1px solid #eeeeee; //边框 不需要则设为0px
	$isBg:white; //背景

	// 选中设置
	$chooseTextColor:#1b60ac; //选中时字体颜色
	$chooseBgColor:white; //选中时背景颜色 transparent为透明

	//未选中设置
	$normalTextColor:#999; //未选中颜色

	.tabBar {
		width: $isWidth;
		height: 100upx;
		position: fixed;
		bottom: 10upx;
		left: 0;
		right: 0;
		margin: 0 auto;
		z-index: 998;
		background-color: $isBg;
		color: $normalTextColor;
		border-left: $isBorder;
		border-top: $isBorder;
		border-right: $isBorder;
		display: flex;
		justify-content: space-around;
		border-top-right-radius: $isRadius;
		border-top-left-radius: $isRadius;
		box-sizing: border-box;
		overflow: hidden;

		.tabbar_item {
			width: 25%;
			font-size: 12px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			&.active {
				/* border-left: $isBorder;
                border-top: $isBorder; */
				background: $chooseBgColor;
				color: $chooseTextColor;
			}
		}

		image {
			width: 36upx;
			height: 36upx;
			margin-left: 5upx;
		}
	}
</style>
