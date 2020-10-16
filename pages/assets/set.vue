<template>
	<view class="set">
		<view class="top" v-if="addressList.length !==0">
			<view class="t-selsect">
				<xfl-select :list="addressList" :clearable="false" :showItemNum="5" :listShow="false" :isCanInput="true"
				 :style_Container="'height: 1.6rem; font-size: 0.8rem;'" :initValue="selectAddress" :selectHideType="'hideAll'"
				 @change="changeAddress">
				</xfl-select>
			</view>
			<view class="t-icon">
				<text class="iconfont iconfuzhi icon"></text>
			</view>
		</view>

		<view class="list">
			<uni-list>
				<uni-list-item title="备份" link @click="showVisible('0')" v-if="addressList.length !==0"></uni-list-item>
				<uni-list-item title="导入" link @click="showVisible('1')"></uni-list-item>
				<uni-list-item title="创建账户" link @click="showVisible('2')"></uni-list-item>
			</uni-list>
		</view>

		<view class="list" v-if="addressList.length !==0">
			<uni-list>
				<uni-list-item title="移除账户" link @click="showVisible('3')"></uni-list-item>
			</uni-list>
		</view>

	</view>
</template>
<script>
	import nerve from 'nerve-sdk-js';
	import xflSelect from '../../components/xfl-select/xfl-select.vue';
	import menuBar from '../../components/menuBar.vue';
	import sPopup from '../../components/s-popup';

	import newAddress from './newAddress.vue';

	export default {
		data() {
			return {
				addressList: [], //账户列表
				selectAddress: '',
				currentPage: 'assets', //导航选中
				visible: false, //弹框
				visibleValue: '', //弹框显示内容

				newAddressForm: {
					pass: 'nuls123456',
					passTwo: 'nuls123456'
				},
				newAddressRules: {
					pass: {
						required: true,
						rule: 'type:string|length:~,20'
					},
					passTwo: {
						required: true,
						rule: 'type:string|length:~,20'
					},
				}
			}
		},
		onReady() {
			this.getAddressList();
		},
		mounted() {},
		components: {
			xflSelect,
			menuBar,
			sPopup,
			newAddress
		},
		computed: {

		},
		methods: {

			//获取账户列表
			getAddressList() {
				try {
					let resData = uni.getStorageSync('addressData');
					//console.log(resData);
					this.addressList = [];
					if (resData) {
						JSON.parse(resData).map(item => {
							this.addressList.push(item.address)
						})
						this.selectAddress = this.addressList[0];
					}
				} catch (e) {
					console.log(e)
				}
			},

			//下拉框选中
			changeAddress(e) {
				//console.log(e);
				this.selectAddress = e.orignItem
			},

			//显示弹框
			showVisible(value) {
				this.visibleValue = value;
				if (value === '0') {
					this.toUrl('/pages/assets/back');
				} else if (value === '2') {
					this.toUrl('/pages/assets/newAddress');
				} else if (value === '3') {
					console.log(this.selectAddress)
				}
				//this.visible = true;
			},

			//隐藏弹框
			hideVisible(info) {
				console.log(info);
				if (info.success) {
					this.addressList = [];
					info.data.map(item => {
						this.addressList.push(item.address)
					})
				}
				this.visible = false;
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
	@import '../../static/font/iconfont.css';

	.set {
		.top {
			height: 1.8rem;

			.t-selsect {
				width: 86%;
				float: left;
				margin: 0.2rem 0 0 2%;
			}

			.t-icon {
				margin: 0.1rem 2% 0 0;
				float: right;
			}
		}

		.list {
			margin: 0.5rem 0 0 0;
			border-top: 0.09rem solid #797979;
			border-bottom: 0.09rem solid #797979;
		}

		.set-visible {
			.set-popup {
				width: 90%;
				height: 20rem;
				margin: 0 auto;

			}
		}


	}
</style>
