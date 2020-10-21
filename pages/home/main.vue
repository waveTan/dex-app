<template>
	<view class="uni-bg home">
		<view class="top">
			<view class="uni-left">
				<image class="logo" src="../../static/svg/logo-w.svg"></image>
			</view>
			<view class="uni-right">
				<u-icon name="photo" color="#2979ff" size="40"></u-icon>
			</view>
		</view>
		<view class="uni-clear"></view>
		<homeSwiper :list="bannerList"></homeSwiper>
		<!-- <noticeSwiper :list="noticeList"></noticeSwiper> -->

		<view class="uni-bg2 why">
			<view class="title uni-center uni-h5 uni-bold">为什么需要NerveDEX</view>
			<view class="info uni-text-small">
				<view class="p">
					<image class="img" src="../../static/img/home01.png"></image>
					无需第三方的中心化认证，导入你的账户地址即可开始进行交易
				</view>
				<view class="p">
					<image class="img" src="../../static/img/home02.png"></image>
					只作为一个去中心化交易平台，资产完全由用户通过私钥进行管理
				</view>
				<view class="p">
					<image class="img" src="../../static/img/home03.png"></image>
					按照既定规则进行交易，无人为因素干预
				</view>
			</view>
		</view>

		<view class="uni-bg2 how uni-center">
			<view class="title uni-h5 uni-bold">如何开始</view>

			<view class="h_list">
				<view class="li">
					<image class="img" src="../../static/img/home04.png"></image>
					<view class="uni-h7 uni-bold"><text class='click'>创建/导入</text>账户</view>
				</view>
				<view class="li ">
					<text class="iconfont iconweb__bitebiyoujiantou icon"></text>
				</view>
				<view class="li">
					<image class="img" src="../../static/img/home05.png"></image>
					<view class="uni-h7 uni-bold"><text class='click'>转入</text>资产</view>
				</view>
				<view class="li">
					<text class="iconfont iconweb__bitebiyoujiantou icon"></text>
				</view>
				<view class="li">
					<image class="img" src="../../static/img/home06.png"></image>
					<view class="uni-h7 uni-bold">开始<text class='click'>交易</text></view>
				</view>
			</view>

		</view>

	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import {
		uniDrawer
	} from '@dcloudio/uni-ui'
	import homeSwiper from './homeSwiper.vue'
	export default {
		data() {
			return {
				bannerList: [],
				noticeList: [],
			}
		},
		onHide() {

		},
		components: {
			homeSwiper
		},
		mounted() {
			//this.initPage()
			this.bannerList = [{
					id: 1,
					name: "1",
					value: "https://oss999.oss-cn-hongkong.aliyuncs.com/upload/201903211634211654.jpg"
				},
				{
					id: 2,
					name: "2",
					value: "https://oss999.oss-cn-hongkong.aliyuncs.com/upload/2019031211003874293.jpg"
				},
				{
					id: 3,
					name: "3",
					value: "https://oss999.oss-cn-hongkong.aliyuncs.com/upload/2019031815071397696.jpg"
				}
			];
		},
		computed: {

		},
		methods: {
			...mapActions('home', ['getHomeData']),
			closeDrawer() {
				this.drawerVisible = false;
			}
		}
	}
</script>

<style lang="less">
	@import './../../static/font/iconfont.css';

	.home {

		.top {
			position: fixed;
			height: 2rem;
			width: 100%;
			z-index: 99;
			margin: 20px 0 0 0;

			.uni-left {
				.logo {
					width: 5rem;
					height: 1.5rem;
					text-align: left;
					margin: 0 0 0 0.5rem;

					img {
						height: 0.5rem;
					}
				}
			}

			.uni-right {
				margin: -0.2rem 0.5rem 0 0;
			}
		}

		.why {
			margin: 0.3rem 0 0.3rem 0;

			.title {
				line-height: 3rem;
				color: #ced0dc;
			}

			.info {
				//border-top: 0.15rem solid #149ffa;
				padding: 0 0 1rem 0;

				.p {
					padding: 0 1rem 1rem 1rem;
					color: #777D9D;

					.img {
						width: 70upx;
						height: 70upx;
						display: block;
						float: left;
						margin: 0.3rem 0.5rem 0 0;
					}
				}
			}
		}

		.how {
			padding: 0 0 0 0;
			height: 11rem;
			color: #ced0dc;

			.title {
				line-height: 2.5rem;
			}

			.h_list {
				margin: 1rem 0 0 0;

				.li {
					width: 22%;
					text-align: center;
					float: left;

					&:nth-child(2n) {
						width: 17%;
					}

					.img {
						width: 2rem;
						height: 2rem;
					}

					.imgs {
						width: 40px;
						height: 33px;
					}

					.click {
						color: #149af2;
					}
				}

			}

		}

	}
</style>
