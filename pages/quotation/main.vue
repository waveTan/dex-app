<template>
	<view class="uni-bg2 container">
		<view class="top-list">
			<view class="lis lis-choose">自选</view>
			<view v-for="(item, index) in topList" :key="index" class="lis">
				{{item.name}}
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

	import marketList from '../../components/marketList.vue'

	export default {
		data() {
			return {
				topList: [{
						name: 'NULS',
						key: 1
					},
					{
						name: 'BRIDGE',
						key: 2
					},
					{
						name: 'OpenList',
						key: 3
					},
				],

				marketList: []
			}
		},
		mounted() {
			this.marketList = [{
					"symbol": "BTCUSDT",
					"name": "BTC",
					"price": 51807.8400,
					"priceUnit": "USDT",
					"cnyPrice": 360064.91,
					"coinCnyPrice": 6.95,
					"high": 35.51000000,
					"low": 35.51000000,
					"volume": 132412,
					"amount": 7223022.64800000,
					"change": 51.93
				},
				{
					"symbol": "ETHUSDT",
					"name": "ETH",
					"price": 807.2500,
					"priceUnit": "USDT",
					"cnyPrice": 1064.91,
					"coinCnyPrice": 6.95,
					"high": 35.51000000,
					"low": 35.51000000,
					"volume": 863446,
					"amount": 692302221.12300000,
					"change": -25.43
				},
				{
					"symbol": "EOSUSDT",
					"name": "EOS",
					"price": 63.9000,
					"priceUnit": "USDT",
					"cnyPrice": 988114.91,
					"coinCnyPrice": 6.95,
					"high": 35.51000000,
					"low": 35.51000000,
					"volume": 743356,
					"amount": 834513535.87600000,
					"change": 46.75
				}
			];
		},
		components: {
			marketList
		},
		computed: {

		},
		methods: {
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
				}
			}
		}
	}
</script>

<style lang="less">
	.container {
		padding: 0.5rem 0 0 0;

		.top-list {
			margin: 0.5rem auto 0;
			width: 90%;
			.lis {
				float: left;
				width: 5rem;
				text-align: center;
				border: 1upx solid #2f314b;
				height: 2rem;
				line-height: 2rem;
			}
			.lis-choose{
				background-color: #149af2;
				border-color:#149af2 ;
			}
		}

	}
</style>
