<template>
	<view class="uni-bg container">
		<view class="uni-bg2 top">
			<view class="uni-left">
				<text class="name">{{tradingInfo.tradingName}}</text>
				<text class="amount green" v-if="tradingInfo.upsDowns > 0">{{tradingInfo.upsDowns}}</text>
				<text class="amount" v-else-if="tradingInfo.upsDowns === 0">{{tradingInfo.upsDowns}}</text>
				<text class="amount red" v-else-if="tradingInfo.upsDowns < 0">{{tradingInfo.upsDowns}}</text>
			</view>

			<view class="uni-right">
				<u-icon name="star"></u-icon>
			</view>

		</view>
		<view class="uni-bg2 content">
			<view class="position">
				<positionList :tradingInfo="tradingInfo"></positionList>
			</view>
			<view class="trade">
				<tradePanel ref="trade" :tradingInfo="tradingInfo"></tradePanel>
			</view>
		</view>
		<view class="uni-gap"></view>
		<!-- <entrustOrderList></entrustOrderList> -->
		<!-- <uni-drawer :visible="drawerVisible" mask="false" mode="left" @close="closeDrawer">
			<marketDrawer :areaList="areaList" :marketList="marketList"></marketDrawer>
		</uni-drawer> -->
	</view>
</template>

<script>
	import {
		uniDrawer
	} from '@dcloudio/uni-ui'
	import positionList from './positionList.vue'
	import entrustOrderList from './entrustOrderList.vue'
	import tradePanel from './tradePanel.vue'
	import marketDrawer from './marketDrawer.vue'
	import {
		WEBSOCKET_URL
	} from '@/config.js'
	import {
		dexGet,
		dexPost
	} from '@/utils/api.js'
	import {
		Plus,
		divisionDecimals,
		Minus,
		Times,
		timesDecimals,
		Division,
		tofix
	} from '@/utils/utils.js'
	export default {
		onReady() {
			this.tradingInfo = JSON.parse(uni.getStorageSync('tradingInfo'));

			this.getTradingInfo(this.tradingInfo.hash, 0, {});
			//this.getOrderList(this.tradingInfo.hash, this.depthValue, 0, {});
		},

		onShow() {

		},
		onHide() {

		},
		components: {
			uniDrawer,
			positionList,
			entrustOrderList,
			tradePanel,
			marketDrawer
		},
		data() {
			return {
				tradingInfo: {}, //交易对信息
				buyData: [], //买订单
				sellData: [], //卖订单
				entrustData: [], //当前委托订单
			}
		},
		mounted() {
			this.areaList = [];
			this.marketList = [];
		},
		computed: {},
		methods: {

			/** @disc: 获取交易对详情
			 * @params: tradingHash
			 * @params: type 0:进入界面查询数据 1：websocket查询后的数据
			 * @params: res
			 * @date: 2019-12-16 10:41
			 * @author: Wave
			 */
			async getTradingInfo(tradingHash, type = 0, res = {}) {
				let tradingInfoRes = res;
				if (type === 0) {
					let url = '/coin/trading/get/' + tradingHash;
					//console.log(url);
					try {
						tradingInfoRes = await dexGet(url);
						//console.log(tradingInfoRes);
						if (!tradingInfoRes.success) {
							console.log('获取交易对错误,请检查网络刷新重试，错误信息:' + JSON.stringify(tradingInfoRes));
							return;
						}
					} catch (e) {
						console.log('获取交易对异常,请检查网络刷新重试，异常信息:' + JSON.stringify(e));
						return;
					}
				}

				if (tradingInfoRes.result.newPrice === 0 || tradingInfoRes.result.beginPrice24 === 0) {
					tradingInfoRes.result.upsDowns = 0
				} else {
					let newMinus = Number(Minus(tradingInfoRes.result.newPrice, tradingInfoRes.result.beginPrice24));
					tradingInfoRes.result.upsDowns = newMinus === 0 ? 0 : parseFloat(Number(Times(Number(Division(newMinus,
						tradingInfoRes.result.beginPrice24)), 100)).toFixed(2));
				}

				this.tradingInfo = tradingInfoRes.result;
				//console.log(this.tradingInfo);

				/* if (this.accountInfo.address && type === 0) {
					let quoteAssetByAddress = await getBaseAssetInfo(this.tradingInfo.quoteAssetChainId, this.tradingInfo.quoteAssetId,
						this.accountInfo.address);
					//console.log(quoteAssetByAddress);
					if (!quoteAssetByAddress.success) {
						console.log('获取买资产信息错误:' + JSON.stringify(quoteAssetByAddress.data));
						return;
					}
					quoteAssetByAddress.data.balances = Number(divisionDecimals(quoteAssetByAddress.data.available, this.tradingInfo.quoteDecimal));
					this.quoteAssetInfo = quoteAssetByAddress.data;
					//console.log(this.quoteAssetInfo);

					let baseAssetByAddress = await getBaseAssetInfo(this.tradingInfo.baseAssetChainId, this.tradingInfo.baseAssetId,
						this.accountInfo.address);
					//console.log(baseAssetByAddress);
					if (!baseAssetByAddress.success) {
						console.log('获取卖资产信息错误:' + JSON.stringify(quoteAssetByAddress.data));
						return;
					}
					baseAssetByAddress.data.balances = Number(divisionDecimals(baseAssetByAddress.data.available, this.tradingInfo.baseDecimal));
					this.baseAssetInfo = baseAssetByAddress.data;
					//console.log(this.baseAssetInfo);
				} */

			},

			/**@disc:交易对详情websocket推送信息
			 * @date: 2020-05-11 16:14
			 * @author: Wave
			 */
			wsTrading() {
				unListener(WEBSOCKET_URL(), "trading");
				listener(WEBSOCKET_URL(), "trading", JSON.stringify({
						"tradingHash": this.tradingInfo.hash
					}),
					data => {
						//console.log(JSON.parse(data));
						if (this.tradingInfo.id !== JSON.parse(data).id) {
							return;
						}
						this.getTradingInfo(this.tradingInfo.hash, 1, {
							result: JSON.parse(data)
						});
					});
			},

			/** @disc: 交易对类型选择
			 * @params: type 0:自选1:nuls 2:usdi
			 * @date: 2019-12-13 14:31
			 * @author: Wave
			 */
			orderValue(type) {
				this.coinOrderValue = type;
				if (this.accountInfo.address) {
					this.getEntrustList(this.accountInfo.address, 1, 100);
				}
				this.getOrderList(this.tradingInfo.hash, this.depthValue, 0, {});
				setTimeout(() => {
					this.wsOrder();
				}, 100);

			},


			/** @disc: 获取用户当前委托列表
			 * @params: address
			 * @params: pageIndex
			 * @params: pageSize
			 * @date: 2019-12-13 15:44
			 * @author: Wave
			 */
			async getEntrustList(address, pageIndex, pageSize) {
				let url = '/order/list/address';
				let data = {
					"address": address,
					"pageNumber": pageIndex,
					"pageSize": pageSize
				};
				let entrustListRes = await this.$dexPost(url, data);
				//console.log(entrustListRes);
				if (!entrustListRes.success) {
					this.getEntrustList(address, pageIndex, pageSize);
					return;
				}
				this.pageTotal = entrustListRes.result.total;
				for (let item of entrustListRes.result.list) {
					item.tradingName = item.baseSymbol + '/' + item.quoteSymbol;
					item.prices = parseFloat(Number(divisionDecimals(item.price, item.quoteDecimal)));
				}
				this.entrustData = entrustListRes.result.list.filter(k => k.tradingName === this.tradingInfo.tradingName);
				//console.log(this.entrustData);
			},

			/** @disc: 选择深度
			 * @params: value
			 * @date: 2020-01-03 17:01
			 * @author: Wave
			 */
			changeDepth(value) {
				this.depthValue = value;
				this.getOrderList(this.$store.getters.getDealData.hash, this.depthValue);
				this.wsOrder();
			},

			/** @disc: 撤销委托
			 * @params:  tradingInfo
			 * @date: 2020-01-06 15:30
			 * @author: Wave
			 */
			revoke(tradingInfo) {
				//console.log(tradingInfo);
				this.revokeInfo = tradingInfo;
				this.passwordType = 1;
				this.$refs.password.showPassword(true);
			},

			/** 撤销委托交易组装
			 * @param tradingOrderInfo
			 * @param addressInfo
			 * @param defaultAsset
			 */
			async tradingOrderCancel(tradingOrderInfo, addressInfo, defaultAsset) {
				let balanceInfo = await getBalanceOrNonceByAddress(tradingOrderInfo.address, defaultAsset.assetsChainId,
					defaultAsset.assetsId);
				//console.log(balanceInfo);

				if (!balanceInfo.success) {
					console.log("获取nonce错误");
					this.revokeList.hash = '';
					return;
				}
				if (balanceInfo.data.balance < addressInfo.fee) {
					this.$message({
						message: this.$t('tips.tips19') + JSON.stringify(balanceInfo.data),
						type: 'error',
						duration: 3000
					});
					this.revokeList.hash = '';
					return;
				}

				let inOrOutputs = await revokeCoinData(tradingOrderInfo, addressInfo, defaultAsset);
				console.log(inOrOutputs);
				//交易组装
				let tAssemble = await nerve.transactionAssemble(inOrOutputs.data.inputs, inOrOutputs.data.outputs, addressInfo.remark,
					addressInfo.type, tradingOrderInfo);
				//console.log(tAssemble);
				//获取hash
				let hash = await tAssemble.getHash();
				//console.log(hash);
				//交易签名
				let txSignature = await sdk.getSignData(hash.toString('hex'), addressInfo.pri);
				//console.log(txSignature);
				//通过拼接签名、公钥获取HEX
				let signData = await sdk.appSplicingPub(txSignature.signValue, addressInfo.pub);
				tAssemble.signatures = signData;
				let txhex = tAssemble.txSerialize().toString("hex");
				//console.log(txhex.toString('hex'));
				return {
					success: true,
					data: txhex.toString('hex')
				}
			},


			closeDrawer() {

			},
			depthChange(e) {}
		}
	}
</script>

<style lang="less">
	@import '@/static/font/iconfont.css';

	.container {
		.top {
			height: 2.8rem;

			.uni-left {
				.name {
					line-height: 2.8rem;
					display: block;
					float: left;
					margin: 0 0 0 0.5rem;
					font-size: 1.2rem;
				}

				.amount {
					display: block;
					float: right;
					border-radius: 0.1rem;
					font-size: 0.20rem;
					padding: 0.09rem 0.5rem;
					margin: 0.7rem 0 0 0.5rem;
				}

				.red {
					color: #D64C58;
					background-color: #291b2c;
				}

				.green {
					color: #2DBB6D;
					background-color: #17272e;
				}
			}

			.uni-right {
				margin: 0.75rem 0.5rem 0 0;

				.u-icon {
					font-size: 1.2rem;
				}
			}
		}

		.content {
			float: none;
			clear: both;
			display: flex;

			.trade {
				width: 60%;
				padding-left: 20upx;
				padding-right: 20upx;
			}

			.position {
				width: 40%;
			}
		}

	}
</style>
