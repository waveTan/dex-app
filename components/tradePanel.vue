<template>
	<view class="trade-inner">
		<view class="tab">
			<view class="buy uni-bg-up" :class="type == 2 ? 'normal' : ''" @click="onChangeType(1)">买入</view>
			<view class="sell uni-bg-down " :class="type == 1 ? 'normal' : ''" @click="onChangeType(2)">卖出</view>
			<view class="parallelogram"></view>
		</view>

		<view class="sell-buy">
			<u-form :model="sbForm" ref="sbuForm" label-position="top" border-bottom="true">
				<u-form-item label="限价单" prop="limitOrders" border-bottom="true" :label-style="cs">
					<u-input v-model="sbForm.limitOrders" border="true" border-color="#363955" placeholder="请输入单价" />
				</u-form-item>

				<view class="uni-text-gray uni-h6">
					<text class="uni-left">估值</text>
					<text class="uni-right">$ 2.356</text>
				</view>

				<u-form-item label="" prop="numberValue" class="uni-clear">
					<u-input v-model="sbForm.numberValue" border="true" border-color="#363955" placeholder="请输入数量" />
					<text class="symbol">NVT</text>
				</u-form-item>

				<view class="lis">
					<text class="li li-choose">25%</text>
					<text class="li">50%</text>
					<text class="li">75%</text>
					<text class="li">100%</text>
				</view>

				<view class="uni-clear uni-text-gray uni-h6">
					<text class="uni-left uni-bold">可用</text>
					<text class="uni-right">236.2665 NULS</text>
				</view>

			</u-form>
			<u-button class="uni-clear" @click="submit" type="success">买入NVT</u-button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				sbForm: {
					limitOrders: '',
					numberValue: '',
					cs: {
						"color": "#8c9fad"
					}
				},
				rules: {
					limitOrders: [{
						required: true,
						message: '请输入单价',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur'],
					}],
					numberValue: [{
						required: true,
						message: '请输入数量',
						trigger: 'change'
					}]
				}
			};
		},
		methods: {
			submit() {
				this.$refs.sbuForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
					} else {
						console.log('验证失败');
					}
				});
			}
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.sbForm.setRules(this.rules);
		}
	};
</script>

<style lang="less">
	.trade-inner {
		.tab {
			position: relative;
			display: flex;
			text-align: center;
			margin: 0.5rem 0 0 0.5rem;
			width: 96%;

			.buy {
				color: #ffffff;
				font-weight: bold;
				width: 50%;
				height: 70upx;
				line-height: 70upx;
				border-radius: 0.1rem;
			}

			.sell {
				color: #ffffff;
				font-weight: bold;
				width: 50%;
				height: 70upx;
				line-height: 70upx;
				border-radius: 0.1rem;
			}

			.normal {
				background: #242740;
				color: #FFFFFF;
				font-weight: bold;
			}

			.parallelogram {
				position: absolute;
				left: calc(50% - 19upx);
				top: 0;
				transform: translate(-50%, -50%);
				width: 36upx;
				height: 90upx;
				background: #141726;
				-webkit-transform: skew(-30deg);
				-moz-transform: skew(-30deg);
				-o-transform: skew(-30deg);
				transform: skew(-30deg);
				margin: 0 0 0 -6upx;
			}
		}

		.sell-buy {
			margin: 0.5rem 0.5rem 0;

			.u-form {
				.u-form-item {
					padding: 0 0 10upx 0;

					.u-form-item__body {
						.u-form-item--left {
							.u-form-item--left__content {
								.u-form-item--left__content__label {
									color: #8c9fad;
								}
							}

						}

						.u-form-item--right {
							border: 1px solid #0056B3;

							.uni-input-input {
								
							}
						}
					}

					.symbol {
						display: block;
						position: absolute;
						right: 1.5rem;
					}
				}
			}

			.lis {
				margin: 0.5rem 0;
				height: 1.5rem;

				.li {
					float: left;
					display: block;
					width: 2.5rem;
					text-align: center;
					color: #8c9fad;
					border: 2upx solid #8c9fad;
					font-size: 14upx;
					margin: 0 9upx;
					border-radius: 4upx;

					&:first-child {
						margin: 0 10upx 0 0;
					}

					&:last-child {
						margin: 0 0 0 10upx;
					}
				}

				.li-choose {
					background-color: #2dbb6d;
					border-color: #2dbb6d;
					color: #FFFFFF;
				}
			}
		}

	}
</style>
