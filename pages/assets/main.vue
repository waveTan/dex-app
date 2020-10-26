<template>
	<view class="container">
		<view class="total uni-bg2">
			<view class="t-selsect">
				<!-- <xfl-select :list="addressList" :clearable="false" :showItemNum="10" :listShow="false" :isCanInput="true"
				 :style_Container="'height: 2.2rem; font-size:12upx; color: #bbbdca; padding: 0 12% 0 1%;'" :placeholder="'placeholder'"
				 :initValue="selectAddress" :selectHideType="'hideAll'" @change="changeAddress">
				</xfl-select> -->
				<view class="address-select" @click="showAddressSelect">
					<text class="uni-text-gray">{{selectAddress}}</text>
					<u-icon name="arrow-down-fill" color="#363955" size="28"></u-icon>
					<u-select v-model="addressSelectModel" mode="single-column" :list="addressList" @confirm="changeAddress"></u-select>
				</view>


			</view>
			<view class="t-icon">
				<text class="iconfont iconfuzhi icon uni-left" @click="copyAddress()"></text>
				<u-icon class="uni-right" name="account" color="#707070" size="44" @click="toUrl('set')"></u-icon>
				<!-- <text class="iconfont iconshezhi icon" @click="toUrl('set')"></text> -->
			</view>
		</view>

		<view class="uni-clear"></view>
		<view class="uni-bg2 header uni-divider">
			<view class="l">
				<view class="uni-h5 uni-text-gray ">总资产</view>
				<view class="uni-h5 uni-bold">${{totalUsbValue}}</view>
			</view>
			<view class="r">
				<checkbox class="checkbox" value="true" checked="false" />
				<text class="uni-h5 uni-text-gray">隐藏小额币种</text>
			</view>
		</view>

		<view class="uni-clear uni-bg2 list">
			<view class="uni-center" style="line-height: 5rem;" v-if="assersData.length ===0">
				<u-loading color="#4cd964"></u-loading>
			</view>

			<view class=" uni-clear list-li" v-else v-for="(item,index) in assersData" :key="index">
				<view class="uni-left">
					<image class="icon" src="../../static/icon/asset.png"></image>
					<text class="uni-h4 symbol">{{item.symbol}}</text>
				</view>
				<view class="uni-right">
					<view class="uni-h4 info">{{item.total}}</view>
					<view class="uni-text-gray uni-h7 info">≈${{item.usable}}</view>
				</view>
			</view>


		</view>

		<u-toast ref="uToast" />
	</view>
</template>
<script>
	import xflSelect from '@/components/xfl-select/xfl-select.vue';
	import {
		dexPost
	} from '@/utils/api.js'
	import {
		superLong,
		copys,
		Plus,
		divisionDecimals
	} from '@/utils/utils.js'
	export default {
		data() {
			return {
				addressList: [], //账户列表
				addressData: [], //账户完整信息列表

				addressSelectModel: false,

				selectAddressInfo: {}, //选择账户信息
				selectAddress: '', //选择账户地址

				assersData: [], //资产列表
				totalUsbValue: 0, //总估值
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

						for (let item of this.addressData) {
							//console.log(item);
							if (item.isItem) {
								this.selectAddressInfo = item;
								this.selectAddress = superLong(item.address, 10);
								this.addressInfoByAddress(item.address)
							}
						}
						//console.log(this.selectAddress);

						resData.map((item) => {
							let newAddressInfo = {
								label: superLong(item.address, 10),
								value: item.address
							}

							this.addressList.push(newAddressInfo)
						})
						//console.log(this.addressList);

					}
				} catch (e) {
					console.log(e)
				}
			},

			//
			showAddressSelect() {
				this.addressSelectModel = true;
			},

			//下拉框选中
			changeAddress(e) {
				//console.log(e);
				if(this.selectAddress === e[0].label){
					return;
				}
				this.selectAddress = e[0].label;
				this.totalUsbValue = 0;
				this.assersData = [];

				let resData = JSON.parse(uni.getStorageSync('addressData'));
				//console.log(resData);

				for (let item of resData) {
					//console.log(item);
					item.alias = '';
					item.isItem = false;
					if (this.selectAddress === superLong(item.address, 10)) {
						item.isItem = true;
						this.addressInfoByAddress(item.address)
					}
				}

				//console.log(resData);
				uni.setStorageSync('addressData', JSON.stringify(resData));
			},

			//复制地址
			copyAddress() {
				copys(this.selectAddressInfo.address);
				this.$refs.uToast.show({
					title: '已复制到剪切板',
					type: 'success',
					position: 'top',
					duration: 2000
				})
			},

			//获取资产列表
			async addressInfoByAddress(address) {
				console.log(address);
				let url = "/account/assets";
				let data = {
					"address": address
				};
				let resData = await dexPost(url, data);
				//console.log(resData);
				if (!resData.success) {
					//this.assetsLoading = false;
					return;
				}
				for (let item of resData.result) {
					item.currency = item.symbol;
					item.total = divisionDecimals(item.total, item.decimal);
					item.usable = divisionDecimals(item.available, item.decimal);
					item.frozen = divisionDecimals(item.freeze, item.decimal);
					item.orderFreeze = item.orderAmount ? divisionDecimals(item.orderAmount, item.decimal) : 0;
					item.btcValue = Number(divisionDecimals(item.btcValue, item.decimal));
					this.totalUsbValue = Number(Plus(this.totalUsbValue, item.usable))
				}
				this.assersData = resData.result.filter(item => Number(item.total) > 0.0001);
				//console.log(this.assersData);

				//this.assetsLoading = false; 
			},


			//连接跳转
			toUrl(name) {
				console.log(name);
				uni.navigateTo({
					url: "/pages/assets/set"
					//url: "/pages/trade/kline/main?symbol=" + e.symbol
				})
			}
		}
	}
</script>
<style scoped lang="less">
	@import '../../static/font/iconfont.css';

	.container {
		.total {
			padding: 1.5rem 0.5rem 0 1rem;
			height: 3.5rem;

			.t-selsect {
				width: 75%;
				float: left;

				.address-select {
					height: 2rem;
					width: 100%;
					line-height: 2rem;
					padding: 0 0.2rem;
					border: 1upx solid #363955;

					.u-icon--right {
						display: block;
						float: right;
						margin: 0.55rem 0.3rem 0 0;
					}
				}

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

			.t-icon {
				margin: 0 2% 0 0;
				float: right;

				.uni-left,
				.uni-right {
					display: block;
				}

				.uni-left {
					margin: 0 1rem 0 0;
				}

				.uni-right {
					margin: 0.4rem 0 0 0;
				}
			}
		}

		.header {
			margin: 0.2rem 0 0 0;
			padding: 1rem 0.5rem 0;
			height: 4rem;

			.l {
				float: left;
			}

			.r {
				float: right;
				display: block;
				margin: 1.5rem 0 0 0;

				.checkbox {
					zoom: 60%;
					vertical-align: middle;
					margin: -10px 0 0 0;
				}
			}
		}

		.list {
			min-height: 28.5rem;
			padding: 0 0.5rem;

			.list-li {
				border-bottom: 0.05rem solid #363955;
				height: 4rem;

				.uni-left {
					.icon {
						width: 2rem;
						height: 2rem;
						margin: 1rem 0.3rem 0 0;
						display: block;
						float: left;
					}

					.symbol {
						display: block;
						float: left;
						margin: 1.2rem 0 0 0;
					}

				}

				.uni-right {
					margin: 1rem 0 0 0;

					.info {
						line-height: 1.4;
					}
				}
			}

		}

	}
</style>
