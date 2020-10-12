<template>
	<view class="home">
		<homeSwiper :list="bannerList"></homeSwiper>
		<noticeSwiper :list="noticeList"></noticeSwiper>

		<view class="why">
			<view class="title uni-center uni-h5 uni-bold">为什么需要NerveDEX</view>
			<view class="info uni-text-small">
				<p>无需第三方的中心化认证，导入你的账户地址即可开始进行交易</p>
				<p>只作为一个去中心化交易平台，资产完全由用户通过私钥进行管理</p>
				<p>按照既定规则进行交易，无人为因素干预</p>
			</view>
		</view>

		<view class="how uni-center">
			<view class="title uni-h5 uni-bold">如何开始</view>

			<view class="h_list">
				<view class="li">
					<image class="img" src="../../static/img/1.png"></image>
					<view class="uni-h7"><span class='click'>创建/导入</span>账户</view>
				</view>
				<view class="li ">
					<text class="iconfont iconweb__bitebiyoujiantou icon"></text>
				</view>
				<view class="li">
					<image class="img" src="../../static/img/1.png"></image>
					<view class="uni-h7"><span class='click'>转入</span>资产</view>
				</view>
				<view class="li">
					<text class="iconfont iconweb__bitebiyoujiantou icon"></text>
				</view>
				<view class="li">
					<image class="img" src="../../static/img/1.png"></image>
					<view class="uni-h7"><span class='click'>开始</span>交易</view>
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
	import homeSwiper from '../../components/homeSwiper.vue'
	import noticeSwiper from '../../components/noticeSwiper.vue'
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
			homeSwiper,
			noticeSwiper
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
			this.noticeList = ["DEX 9月1日14:00开放NVT/USDT交易市场", "DEX 9月2日10:00上线NULS", "关于DEX即将上线xxx"];
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
		.why {
			margin: 0.02rem 0.5rem 0;
		
			.title {
				line-height: 2rem;
			}
		
			.info {
				border-top: 0.15rem solid #149ffa;
				background-color: #f2f2f2;
				padding: 0 0 1rem 0;
		
				p {
					padding: 1rem 1rem 0;
				}
			}
		}
		
		.how {
			margin: 0.2rem 1rem 0;
			.h_list{
				margin: 1rem 0 0 0;
				.li{
					width: 22%;
					text-align: center;
					float: left;
					&:nth-child(2n){
						width: 17%;
					}
					.img{
						width: 2rem;
						height: 2rem;
					}
					.imgs{
						width: 40px;
						height: 33px;
					}
				}
				
			}
		
		}
			
	}
</style>
