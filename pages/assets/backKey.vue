<template>
	<view class="backKey">
		<view class="uni-bg2 top">
			<view class="title uni-text-red">安全警告</view>
			<view class="info uni-text-red">
				私钥没有加密,私钥没有加密私钥没有加密私钥没有加密私钥没有加密私钥没有加密私钥没有加密
			</view>
		</view>

		<view class="uni-bg2 key-info">
			<view class="address uni-h5 uni-text-gray">备份账户</view>
			<view class="addressInfo uni-h6">{{backAddressInfo.address}}</view>
			<view class="key uni-h5 uni-text-gray">私钥</view>
			<view class="keyinfo uni-h6 uni-bg">
				{{backAddressInfo.pri}}
			</view>
			<u-button class="bnt p-bnt" type="primary" @click="copykey(backAddressInfo.pri)">{{copyTitle}}</u-button>
		</view>

	</view>

</template>

<script>
	import {
		copys
	} from "@/utils/utils.js"
	export default {
		data() {
			return {
				backAddressInfo: {}, //备份地址信息
				copyTitle: '复制私钥'
			}
		},
		components: {

		},
		onReady() {
			this.getBackInfo();
		},
		onHide() {
			uni.removeStorageSync('backInfo');
		},
		onUnload() {
			uni.removeStorageSync('backInfo');
		},
		methods: {

			//获取地址列表
			getBackInfo() {
				this.backAddressInfo = JSON.parse(uni.getStorageSync('backInfo'));
				//console.log(this.backAddressInfo);
			},


			//复制私钥
			copykey(copyInfo) {
				copys(copyInfo);
				this.copyTitle = "已复制"
			},

		}
	}
</script>

<style lang="less">
	.backKey {
		.top {
			margin: 0.1rem 0 0 0;
			padding: 0.5rem;
			height: 6.5rem;

			.title {
				font-weight: bold;
				font-size: 1.2rem;
			}

			.info {
				border: 1px solid #D64c58;
				font-size: 0.18rem;
				padding: 0.5rem;
			}
		}

		.key-info {
			margin: 0.5rem 0 0 0;
			padding: 0 1rem;
			height: 20rem;

			.address {
				margin: 0.5rem 0 0;
				//height: 2rem;
				padding: 1rem 0 0 0;
			}

			.key {
				padding: 1rem 0 0 0;
			}

			.keyinfo {
				height: 4rem;
				padding: 0.5rem;
				border-radius: 0.2rem;
				margin: 0.2rem 0 0 0;
				word-wrap: break-word;
			}

			.bnt {
				width: 90%;
				margin: 2rem auto 0;
				border-radius: 0.1rem;
			}

			.p-bnt {
				border-color: #149af2;
				background-color: #149af2;
			}

		}
	}
</style>
