<template>
	<view class="uni-bg2 container">
		<view class="top-list">
			<view class="lis" :class="current ==='-1-1' ? 'lis-choose' : ''" @click="onClickItem('-1-1')">自选</view>
			<view v-for="(item, index) in tradingConfigList" :key="index" class="lis" :class="current ===item.key ? 'lis-choose' : ''"
			 @click="onClickItem(item.key)">
				{{item.assetInfo.symbol}}
			</view>
		</view>
		<view class="uni-clear"></view>
		<marketList :list="marketList"></marketList>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'

	import marketList from './marketList.vue'
	import {
		WEBSOCKET_URL
	} from '@/config.js'
	import {
		Minus,
		Times,
		Division,
		divisionDecimals,
		tofix
	} from '@/utils/utils.js'
	import {
		dexGet
	} from '@/utils/api.js'
	import {
		unListener,
		listener
	} from '@/utils/websocket.js'

	export default {
		data() {
			return {
				accountInfo: {}, //账户信息
				tradingConfigList: [], //交易对配置列表
				current: '-1-1', //选择交易对
				marketList: [], //交易对列表
				myCoinData: [], //收藏列表
			}
		},
		onReady() {
			unListener(WEBSOCKET_URL, "tradingList");
		},
		mounted() {
			this.tradingConfig();

			this.marketList = [];
		},
		components: {
			marketList
		},
		computed: {

		},
		destroyed() {
			unListener(WEBSOCKET_URL, "tradingList");
		},
		methods: {

			/** @disc: 获取交易对配置文件
			 * @date: 2020-04-10 14:20
			 * @author: Wave
			 */
			async tradingConfig() {
				this.coinLoading = true;
				try {
					let coinRes = await dexGet('/coin/trading/config');
					//console.log(coinRes);
					if (coinRes.success) {
						//this.coinLoading = false;
						for (let item of coinRes.result) {
							item.key = item.assetInfo.assetChainId + '' + item.assetInfo.assetId;
						}
						this.tradingConfigList = coinRes.result;
						//console.log(this.tradingConfigList);
					}
				} catch (e) {
					this.coinLoading = true;
					console.log('获取交易对异常,请检查网络刷新重试，异常信息:' + JSON.stringify(e));
				}
			},

			//选择类型
			onClickItem(index) {
				if (this.current !== index) {
					unListener(WEBSOCKET_URL, "tradingList");
					this.current = index;
					this.marketList = [];
					if (index === '-1-1') {
						console.log("获取自选列表");
						return;
					}

					for (let item of this.tradingConfigList) {
						if (item.key === index) {
							//console.log(item.assetInfo)
							this.webList(item.assetInfo);
						}
					}
				}
			},

			/** @disc: 获取推送数据
			 * @params:
			 * @date: 2020-03-20 14:03
			 * @author: Wave
			 */
			async webList(assetInfo) {
				//console.log(this.coinValue);

				unListener(WEBSOCKET_URL, "tradingList");
				let newParams = {};
				if (this.current === '-1-1') {
					newParams = {
						"address": "",
						"assetChainId": -1,
						"assetId": -1,
						"size": 10
					};
				} else {
					newParams = {
						"address": "",
						"assetChainId": assetInfo.assetChainId,
						"assetId": assetInfo.assetId,
						"size": 100
					};
				}


				if (this.accountInfo.address && this.current === '-1-1') {
					newParams.address = this.accountInfo.address
				}
				//console.log(newParams);
				listener(WEBSOCKET_URL, "tradingList", JSON.stringify(newParams),
					data => {
						let newList = JSON.parse(data);
						let nerCoinInfo = this.tradingConfigList.filter(k => k.key === this.current);
						let newData = nerCoinInfo[0].tradingDtoList;
						//console.log(newData);

						if (newData.length !== 0) {
							for (let item of newData) {
								item.newPrices = parseFloat(tofix(Number(divisionDecimals(item.newPrice, item.quoteDecimal)), item.scaleQuoteDecimal,
									-1));
								//涨跌 = （newPrice - beginPrice24）/beginPrice24
								if (item.newPrice && item.beginPrice24) {
									let newMinus = Number(Minus(item.newPrice, item.beginPrice24));
									item.upsDowns = newMinus === 0 ? 0 : parseFloat(Number(Times(Number(Division(newMinus, item.beginPrice24)),
										100)).toFixed(2));
								} else {
									item.upsDowns = 0
								}
								item.dealAmount24 = parseFloat(Number(divisionDecimals(item.dealAmount24, item.quoteDecimal)).toFixed(0));

								item.isCollection = 0; //是否收藏 0:没收藏 1:收藏
								if (this.current === '-1-1') {
									item.isCollection = 1;
								} else {
									for (let k of this.myCoinData) {
										if (k.tradingName === item.tradingName) {
											item.isCollection = 1
										}
									}
								}
							}
							this.marketList = [...newData];
							//console.log(this.marketList);

							//this.counterpartyData = newData;
							/* if (this.tradingSort === 'desc') {
								this.counterpartyData.sort(this.compare('tradingName'))
							} else if (this.tradingSort === 'asc') {
								this.counterpartyData.reverse()
							}

							if (this.priceSort === 'desc') {
								this.counterpartyData.sort(this.compare('newPrice'))
							} else if (this.priceSort === 'asc') {
								this.counterpartyData.reverse()
							}

							if (this.riseFallSort === 'desc') {
								this.counterpartyData.sort(this.compare('upsDowns'))
							} else if (this.riseFallSort === 'asc') {
								this.counterpartyData.reverse()
							}

							if (this.volSort === 'desc') {
								this.counterpartyData.sort(this.compare('dealAmount24'))
							} else if (this.volSort === 'asc') {
								this.counterpartyData.reverse()
							} */

							this.oldCounterpartyData = this.counterpartyData;
						}
					});
			},


		}
	}
</script>

<style lang="less">
	.container {
		padding: 0.5rem 0 0 0;

		.top-list {
			margin: 0.5rem auto 0;
			width: 94%;

			.lis {
				float: left;
				width: 19.3%;
				text-align: center;
				border: 1upx solid #2f314b;
				height: 2rem;
				line-height: 2rem;
			}

			.lis-choose {
				background-color: #149af2;
				border-color: #149af2;
			}
		}

	}
</style>
