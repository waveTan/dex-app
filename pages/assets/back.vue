<template>
	<view class="back">
		<view class="img"></view>
		<view class="uni-bg2 top">
			<view class="uni-h7">备份账户：{{backAddress}}</view>
			<view class="title uni-text-red">安全警告</view>
			<view class="info uni-text-red">
				私钥没有加密,私钥没有加密私钥没有加密私钥没有加密私钥没有加密私钥没有加密私钥没有加密
			</view>
		</view>

		<view class="uni-clear list-b">
			<u-button class="bnt p-bnt" type="primary" @click="backKey()">备份私钥</u-button>
			<u-button class="bnt p-bnt" type="primary" @click="backKeystore()">备份Keystore</u-button>
			<u-button class="bnt k-bnt" @click="complete()">备份完成</u-button>
		</view>

		<u-top-tips ref="uTips"></u-top-tips>
		<passWord ref="password" @passwordSubmit="backPassSubmit"></passWord>
	</view>

</template>

<script>
	import nerve from 'nerve-sdk-js';
	import passWord from '@/components/passWord.vue';
	export default {
		data() {
			return {
				backAddress: '', //备份地址
				backAddressInfo: {}, //备份账户信息
				selectAddress: '',
			}
		},
		components: {
			passWord
		},
		onReady() {
			this.getAddressList();
		},
		methods: {

			//获取地址列表
			getAddressList() {
				let resData = JSON.parse(uni.getStorageSync('addressData'));
				//console.log(resData);

				for (let item of resData) {
					if (item.isItem) {
						this.backAddress = item.address;
						this.backAddressInfo = item;
					}
				}

			},

			//备份私钥
			backKey() {
				this.$refs.password.$emit('showPassWord', true)
			},

			//备份keystore
			backKeystore() {
				console.log('backKeystore')
			},

			//获取密码
			backPassSubmit(passWord) {
				this.backAddressInfo.pri = nerve.decrypteOfAES(this.backAddressInfo.aesPri, passWord);
				//console.log(this.backAddressInfo);

				if (!this.backAddressInfo.pri) {
					this.$refs.uTips.show({
						title: '密码错误，请输入正确的密码！',
						type: 'error',
						duration: '2300'
					})
					return;
				}

				uni.setStorageSync('backInfo', JSON.stringify(this.backAddressInfo));
				uni.navigateTo({
					url: '/pages/assets/backKey'
				})
			},
			
			//完成备份
			complete(){
				uni.navigateTo({
					url: '/pages/assets/set'
				})
			}

		}
	}
</script>

<style lang="less">
	.back {
		.img {
			height: 8rem;
			width: 100%;
		}

		.top {
			padding: 1rem;
			border: 1px solid #D64c58;
			padding: 0.5rem;

			.title {
				font-weight: bold;
				font-size: 0.2rem;
			}

			.info {
				font-size: 0.18rem;
			}
		}

		.list-b {
			margin: 3rem 0 0 0;

			.bnt {
				width: 90%;
				margin: 2rem auto 0;
				border-radius: 0.1rem;
			}

			.p-bnt {
				border-color: #149af2;
				background-color: #149af2;
			}

			.k-bnt {
				border-color: #149af2;
				background-color: #141627;
				color: #FFFFFF;
			}
		}
	}
</style>
