<template>
	<view class="uni-bg2 pmain">
		<view class="item">
			<text class="uni-text-gray price">价格</text>
			<text class="uni-text-gray num">数量</text>
		</view>
		<view class="item uni-down" v-for="(item,index) in sellData" :key="index+10" >
			<text class="price">{{item.prices}}</text>
			<text class="num">{{item.baseAmount}}</text>
			<view class="bg buybg" style="width: 50%;"></view>
		</view>

		<view class="current-price">
			<view class="uni-h5 uni-bold uni-up usdt">521.5</view>
			<view class="uni-h7 cny uni-text-gray"> $28767.23 CNY</view>
		</view>

		<view class="item uni-up" v-for="(item,index) in buyData" :key="index" >
			<text class="price">{{item.prices}}</text>
			<text class="num">{{item.baseAmount}}</text>
			<view class="bg sellbg" style="width: 50%;"></view>
		</view>

		<view class="drop-down">
			
		</view>
	</view>
</template>

<script>
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
		data() {
			return {
				tradingInfo: {}, //交易对信息
				buyData: [], //买订单
				sellData: [], //卖订单
				entrustData: [], //当前委托订单

				depthValue: 4
			}
		},
		onReady() {

		},
		mounted() {
			console.log(this.tradingInfo);
			this.tradingInfo = JSON.parse(uni.getStorageSync('tradingInfo'));
			this.getOrderList(this.tradingInfo.hash, this.depthValue, 0, {});

		},
		computed: {},
		methods: {

			/** @disc: 获取交易对挂单盘口
			 * @params: tradingHash
			 * @params: depthValue 精度系数
			 * @params: type 0：接口查询 1：websocket推送
			 * @params: dataInfo
			 * @date: 2019-12-13 15:44
			 * @author: Wave
			 */
			async getOrderList(tradingHash, depthValue, type = 0, dataInfo = {}) {
				let url = '/order/list/';
				let data = {
					"key": tradingHash,
					"decimal": depthValue,
					"type": 0,
					"size": 5
				};
				//console.log(data);
				let coinRes = dataInfo;
				if (type === 0) {
					try {
						coinRes = await dexPost(url, data);
						//console.log(coinRes);
						if (!coinRes.success && type === 0) {
							console.log('获取交易对挂单错误,请检查网络刷新重试，错误信息:' + JSON.stringify(coinRes));
							return;
						}
					} catch (err) {
						console.log('获取交易对挂单异常,请检查网络刷新重试，异常信息:' + JSON.stringify(err));
						return;
					}
				}
				//console.log(coinRes);
				//console.log(this.entrustData);
				for (let item of coinRes.result.buyOrderList) {
					item.prices = tofix(item.price, this.depthValue, -1);
					item.number = Number(item.baseAmount);
					item.amount = Number(item.quoteAmount);
					item.isMyEntrust = false;
					for (let k of this.entrustData) {
						if (k.type === 1 && tofix(k.prices, this.depthValue, -1) === item.prices) {
							item.isMyEntrust = true;
						}
					}
				}

				//console.log(this.entrustData);
				for (let item of coinRes.result.sellOrderList) {
					item.prices = tofix(item.price, this.depthValue, -1);
					item.number = Number(item.baseAmount);
					item.amount = Number(item.quoteAmount);
					item.isMyEntrust = false;
					//console.log(this.entrustData);
					for (let k of this.entrustData) {
						if (k.type === 2 && tofix(k.prices, this.depthValue, -1) === item.prices) {
							item.isMyEntrust = true;
						}
					}
				}
				this.buyData = coinRes.result.buyOrderList;

				//卖盘不够用空格代替
				if (coinRes.result.sellOrderList.length < 5 && data.size === 5) {
					let numbers = 5 - coinRes.result.sellOrderList.length;
					let newArray = Array(numbers);
					newArray.fill({});
					let newArrays = newArray.concat(coinRes.result.sellOrderList);
					this.sellData = newArrays;
				} else {
					this.sellData = coinRes.result.sellOrderList;
				}

				//console.log(this.buyData);
				//console.log(this.sellData);

			},

			/** @disc: 委托订单推送信息
			 * @params:
			 * @date: 2020-05-07 16:40
			 * @author: Wave
			 */
			wsOrder() {
				unListener(WEBSOCKET_URL(), "orderBook");
				let newString = JSON.stringify({
					"tradingHash": this.tradingInfo.hash,
					"decimal": this.depthValue,
					"size": 15,
					"type": 0
				});
				//console.log(newString);
				listener(WEBSOCKET_URL(), "orderBook", newString,
					data => {
						//console.log(JSON.parse(data));
						if (data) {
							this.getOrderList(this.tradingInfo.hash, this.depthValue, 1, {
								result: JSON.parse(data)
							});
						}
					});
			},


		}
	}
</script>

<style scoped>
	.pmain {
		width: 100%;
		height: 600upx;
		position: relative;
		justify-content: space-between;
		text-align: left;
		padding: 0.5rem 0 0 0.5rem;
	}

	.pmain .item {
		position: relative;
		width: 100%;
		display: flex;
		font-size: 24upx;
	}

	.pmain .item .bg {
		height: 100%;
		position: absolute;
		top: 0;
		right: 0;
		z-index: -9999;
	}

	.pmain .item .buybg {
		background: #fdf4f7;
	}

	.pmain .item .sellbg {
		background: #f0faf9;
	}

	.pmain .item .price {
		display: block;
		width: 50%;
		text-align: left;
	}

	.position .item .num {
		display: block;
		width: 50%;
		text-align: right;
		padding-right: 10upx;
	}

	.pmain .current-price {
		margin: 10upx 0;
	}

	.pmain .current-price .usdt {
		float: left;

	}

	.pmain .current-price .cny {
		float: left;
		margin: 0.18rem 0 0 0.5rem;
	}

	.pmain .depth {
		position: relative;
		margin-top: 10upx;
		margin-right: 10upx;
	}

	.pmain .depth .uni-h6 {
		text-align: center;
		height: 60upx;
		line-height: 60upx;
	}

	.pmain .depth .popover {
		position: absolute;
		top: 80upx;
		width: 100%;
		z-index: 9999999999;
		//background: #ffffff;
		display: inline-block;
		border-radius: 20px;
	}

	.pmain .depth .popover .item {
		width: 100%;
		height: 60upx;
		line-height: 60upx;
		display: block;
		text-align: center;
	}

	.pmain .depth .kailong {
		position: absolute;
		left: 50%;
		top: 74upx;
		transform: translate(-50%, -50%);
		max-width: 50%;
		width: 0;
		height: 0;
		border-right: 20px solid transparent;
		border-left: 20px solid transparent;
		border-bottom: 20px solid #E0E0E0;
	}

	.popover-wrap .uni-thinner-border:before {
		border-radius: 15px !important;
	}
</style>
