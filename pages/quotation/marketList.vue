<template>
	<block>
		<view class="rank">
			<view class="item thead">
				<view class="n uni-h7">名称 <u-icon name="arrow-upward"></u-icon>
				</view>
				<view class="p uni-h7">最新价 <u-icon name="arrow-downward"></u-icon>
				</view>
				<view class="t uni-h7">涨跌幅 <u-icon name="arrow-upward"></u-icon>
				</view>
			</view>
			<view class="uni-clear"></view>
			<view v-for="(item, index) in list_" :key="index" class="item uni-divider" @click="onClick(item)">
				<view class="n">
					<view class="uni-h6">{{item.tradingName}}</view>
					<view class="uni-h7 uni-text-gray">24H量{{item.dealAmount24}}</view>
				</view>
				<view class="p">
					<view>{{item.newPrices}}</view>
					<view class="uni-h7 uni-text-gray">$ {{item.usdPrice}}</view>
				</view>
				<view class="t">
					<label class="light uni-bg-up" v-if="item.upsDowns > 0">
						+{{item.upsDowns}}%
					</label>
					<label class="light uni-bg-gray" v-else-if="item.upsDowns === 0">
						{{item.upsDowns}}%
					</label>
					<label class="light uni-bg-down" v-else-if="item.upsDowns < 0">
						{{item.upsDowns}}%
					</label>
				</view>
			</view>
		</view>
	</block>
</template>

<script>
	export default {
		data() {
			return {};
		},
		props: {
			list: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		computed: {
			list_() {
				return this.list;
			}
		},
		methods: {
			onClick(e) {
				console.log(e);
				uni.setStorageSync('tradingInfo', JSON.stringify(e));
				uni.navigateTo({
					url: "/pages/quotation/kline"
				})
			}
		}
	}
</script>

<style scoped>
	.rank {
		padding: 10px 0 0 0px;
		margin: 0.5rem 0 0 0;
	}

	.rank .title {
		padding: 10px 20px;
	}

	.rank .item {
		display: flex;
		padding: 20px 20px 0;
	}

	.rank .item .n {
		width: 35%;
	}

	.rank .item .p {
		width: 35%;
	}

	.rank .item .t {
		width: 30%;
		text-align: right;
		margin: 0 0 0 0;
	}

	.rank .item .t .light {
		display: block;
		width: 150px;
		color: #ffffff;
		text-align: center;
		float: right;
		border-radius: 4upx;
	}
</style>
