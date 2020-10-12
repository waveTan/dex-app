<template>
	<view class="container">
		<view class="total">
			<view class="t-selsect">
				<xfl-select :list="list" :clearable="false" :showItemNum="5" :listShow="false" :isCanInput="true" :style_Container="'height: 1.6rem; font-size: 0.8rem;'"
				 :placeholder="'placeholder'" :initValue="'NULS'" :selectHideType="'hideAll'">
				</xfl-select>
			</view>
			<view class="t-icon">
				<text class="iconfont iconfuzhi icon"></text>
				<text class="iconfont iconshezhi icon"></text>
			</view>

		</view>
		<view class="uni-gap"></view>
		<view class="header uni-divider">
			<view class="l">
				<text class="uni-h5">总资产：$ 123456.1654</text>
			</view>
			<view class="r">
				<checkbox class="checkbox" value="true" checked="false" />
				<text class="uni-h5">隐藏小额币种</text>
			</view>

		</view>
		<view class="list">
			<view class="item uni-divider">
				<view class="title">
					<view class="n uni-h4">USDT</view>
					<view class="g uni-h5 uni-text-gray"><text class="uni-icon uni-icon-arrowright"></text></view>
				</view>
				<block>
					<view class="thead">
						<view class="l uni-text-gray">可用</view>
						<view class="c uni-text-gray">冻结</view>
						<view class="r uni-text-gray">折合(CNY)</view>
					</view>
					<view class="thead">
						<view class="l">5211.52</view>
						<view class="c">100.54</view>
						<view class="r">5612165.55</view>
					</view>
				</block>
			</view>

			<view class="item uni-divider">
				<view class="title">
					<view class="n uni-h4">BTC</view>
					<view class="g uni-h5 uni-text-gray"><text class="uni-icon uni-icon-arrowright"></text></view>
				</view>
				<block>
					<view class="thead">
						<view class="l uni-text-gray">可用</view>
						<view class="c uni-text-gray">冻结</view>
						<view class="r uni-text-gray">折合(CNY)</view>
					</view>
					<view class="thead">
						<view class="l">5211.52</view>
						<view class="c">100.54</view>
						<view class="r">5612165.55</view>
					</view>
				</block>
			</view>

			<view class="item uni-divider">
				<view class="title">
					<view class="n uni-h4">ETH</view>
					<view class="g uni-h5 uni-text-gray"><text class="uni-icon uni-icon-arrowright"></text></view>
				</view>
				<block>
					<view class="thead">
						<view class="l uni-text-gray">可用</view>
						<view class="c uni-text-gray">冻结</view>
						<view class="r uni-text-gray">折合(CNY)</view>
					</view>
					<view class="thead">
						<view class="l">5211.52</view>
						<view class="c">100.54</view>
						<view class="r">5612165.55</view>
					</view>
				</block>
			</view>

			<view class="item">
				<view class="title">
					<view class="n uni-h4">EOS</view>
					<view class="g uni-h5 uni-text-gray"><text class="uni-icon uni-icon-arrowright"></text></view>
				</view>
				<block>
					<view class="thead">
						<view class="l uni-text-gray">可用</view>
						<view class="c uni-text-gray">冻结</view>
						<view class="r uni-text-gray">折合(CNY)</view>
					</view>
					<view class="thead">
						<view class="l">5211.52</view>
						<view class="c">100.54</view>
						<view class="r">5612165.55</view>
					</view>
				</block>
			</view>

		</view>
	</view>
</template>
<script>
	import xflSelect from '../../components/xfl-select/xfl-select.vue';
	export default {
		data() {
			return {
				list: [ //要展示的数据
					'NULS',
					{
						value: 'BTC',
						disabled: true
					},
					'NVT',
					'ETH',
					'USDT',
				],
			}
		},
		onReady() {
			uni.setNavigationBarColor({
				frontColor: '#ffffff',
				backgroundColor: '#0952c3',
				animation: {
					duration: 400,
					timingFunc: 'easeIn'
				}
			})
		},
		mounted() {},
		components: {
			xflSelect
		},
		computed: {

		},
		methods: {

		}
	}
</script>
<style scoped lang="less">
	@import '../../static/font/iconfont.css';
	.container{
		.total{
			padding: 20upx 20upx 0 20upx;
			height: 1.6rem;
			.t-selsect{
				width: 70%;
				float: left;
			}
			.t-icon{
				margin: 0 2% 0 0;
				float: right;
			}
		}
	}
	
	.header{
		padding: 0 20upx 20upx 20upx;
		height: 1rem;
		.l {
			float: left;
		}
		.r {
			float: right;
			display: block;
			.checkbox {
				zoom: 60%;
				vertical-align: middle;
			}
		}
	}

	.container .list .item .title {
		display: flex;
		padding: 20upx 20upx;
	}

	.container .list .item .title .n {
		width: 50%;
		color: #0952c3;
	}

	.container .list .item .title .g {
		width: 50%;
		text-align: right;
	}

	.container .list .item .thead {
		display: flex;
		padding: 0 20upx 10upx 20upx;
	}

	.container .list .item .thead .l {
		width: 35%;
	}

	.container .list .item .thead .c {
		width: 35%;
	}

	.container .list .item .thead .r {
		width: 30%;
		text-align: right;
	}
</style>
