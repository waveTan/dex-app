<template>
	<view class="set">
		<view class="uni-bg2 top" v-if="addressList.length !==0">
			<view class="t-selsect">
				<xfl-select :list="addressList" :clearable="false" :showItemNum="10" :listShow="false" :isCanInput="true"
				 :style_Container="'height: 2.2rem; font-size:12upx;color: #bbbdca;padding: 0 12% 0 1%;'" :initValue="selectAddress"
				 :selectHideType="'hideAll'" @change="changeAddress">
				</xfl-select>
			</view>
		</view>

		<view class="uni-bg2 list">

			<view class="li" @click="showVisible('0')" v-if="addressList.length !==0">
				<text>备份</text>
				<u-icon name="arrow-right" size="28"></u-icon>
			</view>
			<view class="li" @click="showVisible('1')">
				<text>导入</text>
				<u-icon name="arrow-right" size="28"></u-icon>
			</view>
			<view class="li" @click="showVisible('2')">
				<text>创建账户</text>
				<u-icon name="arrow-right" size="28"></u-icon>
			</view>
		</view>

		<view class="uni-bg2 list">
			<view class="li" @click="showVisible('3')">
				<text class="uni-text-red">移除账户</text>
				<u-icon name="arrow-right" size="28"></u-icon>
			</view>
		</view>

	</view>
</template>
<script>
	import nerve from 'nerve-sdk-js';
	import xflSelect from '../../components/xfl-select/xfl-select.vue';

	export default {
		data() {
			return {
				addressList: [], //账户列表
				selectAddress: '',
			}
		},
		onReady() {
			this.getAddressList();
		},
		mounted() {},
		components: {
			xflSelect
		},
		computed: {

		},
		methods: {

			//获取账户列表
			getAddressList() {
				try {
					let resData = JSON.parse(uni.getStorageSync('addressData'));
					//console.log(resData);
					this.addressList = [];
					if (resData) {
						resData.map(item => {
							this.addressList.push(item.address)
						})

						for (let item of resData) {
							//console.log(item.isItem);
							if (item.isItem) {
								this.selectAddress = item.address
							}
						}

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
					if (this.selectAddress === item.address) {
						item.isItem = true;
					}
				}

				//console.log(resData);
				uni.setStorageSync('addressData', JSON.stringify(resData));
			},

			//导航跳转
			showVisible(value) {
				if (value === '0') {
					this.toUrl('/pages/assets/back');
				} else if (value === '2') {
					this.toUrl('/pages/assets/newAddress');
				} else if (value === '3') {
					console.log(this.selectAddress)
				}
			},

			/** 连接跳转
			 * @param {Object} name
			 */
			toUrl(name) {
				console.log(name);
				uni.navigateTo({
					url: name
					//url: "/pages/trade/kline/main?symbol=" + e.symbol
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
