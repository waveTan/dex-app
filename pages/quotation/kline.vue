<template>
	<view class="uni-bg kline">
		<view class="uni-bg2 back">
			<u-navbar :is-back="false" title="" :background="background">
				<view class="slot-wrap">
					<view class="uni-left">
						<u-icon name="arrow-leftward"></u-icon>
						<text>NVT/NULS</text>
					</view>
					<view class="uni-right">
						<u-icon name="star"></u-icon>
					</view>
				</view>
			</u-navbar>
			<view class="content">
				<!-- 正文内容 -->
			</view>
		</view>

		<view class="uni-bg2 top">
			<view class="uni-left">
				<view class="title uni-text-red">0.5686</view>
				<view class="info uni-text-gray">
					$ 1.2345
					<text class="percentage uni-text-red">-23.23%</text>
				</view>
			</view>
			<view class="uni-right">
				<view class="uni-h6">
					<text class="uni-text-gray">24h高 </text>
					<text class="nu">0.5698</text>
				</view>
				<view class="uni-h6">
					<text class="uni-text-gray">24h低 </text>
					<text class="nu">0.5698</text>
				</view>
				<view class="uni-h6">
					<text class="uni-text-gray">24h量 </text>
					<text class="nu">2565698</text>
				</view>
			</view>
		</view>

		<view class="uni-bg2 line">
			k 线图
		</view>

		<view class="uni-bg2 bottom">
			委托订单
			最新成交
		</view>

		<view class="uni-bg bottom-btn">
			<view class="uni-left">
				<u-button type="success">买入</u-button>
			</view>
			<view class="uni-right">
				<u-button type="error">卖出</u-button>
			</view>
		</view>

	</view>
</template>
<script>
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#141627',

				}
			}
		},
		methods: {

		}
	}
</script>

<style lang="less">
	.kline {
		.back {
			.slot-wrap {
				width: 100%;

				.uni-left {
					margin: 0 0 0 0.5rem;
				}

				.uni-right {
					margin: 0 0.5rem 0 0;
				}

			}

		}

		.top {
			height: 5rem;
			padding: 0 0.5rem;

			.uni-left {
				.title {
					font-size: 1.6rem;
				}

				.info {
					font-size: 0.22rem;

					.percentage {
						display: block;
						float: right;
						margin: 0 0 0 1rem;
					}
				}
			}

			.uni-right {
				margin: 0.5rem 0 0 0;

				.nu {
					display: block;
					float: right;
					margin: 0 0 0 2rem;
				}
			}
		}

		.line {
			height: 20rem;
			margin: 0.2rem 0;
		}

		.bottom {
			height: 20rem;
		}

		.bottom-btn {
			height: 5rem;
			text-align: center;

			.uni-left {
				margin: 1rem 0 0 2rem;
			}

			.uni-right {
				margin: 1rem 2rem 0 0;
			}

			.u-btn {
				width: 9rem;
			}
		}

	}
</style>
