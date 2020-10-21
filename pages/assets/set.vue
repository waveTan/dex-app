<template>
	<view class="set">
		<view class="uni-bg2 top" v-if="addressList.length !==0">
			<view class="t-selsect">
				<xfl-select :list="addressList" :clearable="false" :showItemNum="10" :listShow="false" :isCanInput="true"
				 :style_Container="'height: 2.2rem; font-size:12upx;color: #bbbdca;padding: 0 12% 0 1%;'" 
				 :initValue="selectAddress"
				 :selectHideType="'hideAll'" @change="changeAddress">
				</xfl-select>
			</view>
		</view>

		<view class="uni-bg2 list">
			<view class="li" @click="showVisible('0')">
				<text>创建账户</text>
				<u-icon name="arrow-right" size="28"></u-icon>
			</view>
			<view class="li" @click="showVisible('1')">
				<text>私钥导入</text>
				<u-icon name="arrow-right" size="28"></u-icon>
			</view>
			<view class="li" @click="showVisible('2')">
				<text>Keystore导入</text>
				<u-icon name="arrow-right" size="28"></u-icon>
			</view>
			<view class="li" @click="showVisible('3')" v-if="addressList.length !==0">
				<text>私钥备份</text>
				<u-icon name="arrow-right" size="28"></u-icon>
			</view>
			<view class="li" @click="showVisible('4')" v-if="addressList.length !==0">
				<text>Keystore备份</text>
				<u-icon name="arrow-right" size="28"></u-icon>
			</view>

		</view>

		<view class="uni-bg2 list">
			<view class="li" @click="showVisible('5')" v-if="addressList.length !==0">
				<text class="uni-text-red">移除账户</text>
				<u-icon name="arrow-right" size="28"></u-icon>
			</view>
		</view>

		<u-top-tips ref="uTips"></u-top-tips>
		<passWord ref="password" @passwordSubmit="removePassSubmit"></passWord>
	</view>
</template>
<script>
	import nerve from 'nerve-sdk-js';
	import xflSelect from '../../components/xfl-select/xfl-select.vue';
	import passWord from '@/components/passWord.vue';
	import {
		superLong
	} from '@/utils/utils.js'
	export default {
		data() {
			return {
				addressList: [], //账户列表
				addressData: [], //账户完整信息列表
				selectAddressInfo: {}, //选择账户信息
				selectAddress: '', //选择账户地址
			}
		},
		onReady() {
			this.getAddressList();
		},
		mounted() {},
		components: {
			xflSelect,
			passWord
		},
		computed: {

		},
		methods: {

			//获取账户列表
			getAddressList() {
				try {
					let res = uni.getStorageSync('addressData');
					if (!res) {
						///console.log("没有账户")
						return;
					}

					let resData = JSON.parse(res);
					//console.log(resData);
					this.addressList = [];
					if (resData) {
						this.addressData = resData;
						resData.map((item) => {
							this.addressList.push(superLong(item.address, 10))
						})
						//console.log(this.addressList);

						for (let item of this.addressData) {
							//console.log(item.isItem);
							if (item.isItem) {
								this.selectAddressInfo = item;
								this.selectAddress = superLong(item.address, 10);
							}
						}
						//console.log(this.selectAddress);

						//this.selectAddress = this.addressList[0];
					}
				} catch (e) {
					console.log(e)
				}
			},

			//下拉框选中
			changeAddress(e) {
				//console.log(e);
				this.selectAddress = e.orignItem

				let resData = JSON.parse(uni.getStorageSync('addressData'));
				//console.log(resData);

				for (let item of resData) {
					//console.log(item);
					item.alias = '';
					item.isItem = false;
					if (this.selectAddress === superLong(item.address, 10)) {
						item.isItem = true;
					}
				}

				//console.log(resData);
				uni.setStorageSync('addressData', JSON.stringify(resData));
			},

			//导航跳转
			showVisible(value) {
				if (value === '0') {
					this.toUrl('/pages/assets/newAddress');
				} else if (value === '1') {
					this.toUrl('/pages/assets/importKey');
				} else if (value === '2') {
					console.log("Keystore导入")
					//this.toUrl('/pages/assets/back');
				} else if (value === '3') {
					this.toUrl('/pages/assets/back');
				} else if (value === '4') {
					console.log("Keystore备份")
					//this.toUrl('/pages/assets/back');
				} else if (value === '5') {
					//console.log(this.selectAddress);
					this.$refs.password.$emit('showPassWord', true)
				}
			},

			//获取密码
			removePassSubmit(passWord) {
				//console.log(passWord);

				this.selectAddressInfo.pri = nerve.decrypteOfAES(this.selectAddressInfo.aesPri, passWord);

				if (!this.selectAddressInfo.pri) {
					this.$refs.uTips.show({
						title: '密码错误，请输入正确的密码！',
						type: 'error',
						duration: '2300'
					})
					return;
				}
				//console.log(this.addressData);

				let newAdddressList = this.addressData.filter((item) => item.address !== this.selectAddressInfo.address)
				//console.log(newAdddressList);
				this.selectAddress = '';
				this.addressList = [];
				if (newAdddressList.length === 0) {
					uni.removeStorageSync('addressData');
				} else {
					for (let item of newAdddressList) {
						item.isItem = false;
					}
					newAdddressList[0].isItem = true;
					this.selectAddress = superLong(newAdddressList[0].address, 10);
					newAdddressList.map(item => {
						this.addressList.push(superLong(item.address, 10))
					})
					uni.setStorageSync('addressData', JSON.stringify(newAdddressList));
				}

			},

			/** 连接跳转
			 * @param {Object} name
			 */
			toUrl(name) {
				console.log(name);
				uni.navigateTo({
					url: name
				})
			}

		}
	}
</script>
<style scoped lang="less">
	.set {
		.top {
			height: 3.5rem;
			width: 100%;

			.t-selsect {
				width: 95%;
				float: left;
				margin: 0.5rem 0 0 2.5%;

				.show-box {
					background: #141627;
					color: #FFF;
					border: 1upx solid #363955;

					.input {
						.uni-input-wrapper {
							.uni-input-input {
								color: #bbbdca;
								line-height: 2rem;
								height: 2rem;
							}
						}
					}

					.list-container {}

				}
			
			}
		}

		.list {
			margin: 0.3rem 0 0 0;
			border-top: 0 solid #797979;

			.li {
				color: #c1d0de;
				font-weight: bold;
				border-bottom: 2upx solid #363955;
				margin: 0 0.5rem;
				height: 3.2rem;
				line-height: 3.2rem;

				.u-icon--right {
					display: block;
					float: right;
					margin: 1.1rem 0 0 0;
				}
			}


		}
	}
</style>
