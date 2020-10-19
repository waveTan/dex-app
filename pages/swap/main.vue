<template>
	<view class="swap">
		<view class="uni-bg2 top">
			<view class="info">
				<text class="uni-text-blue uni-h6">根据多个交易所实时价格综合计算并 上浮5% ，该功能主要用于兑换小额手续费</text>
			</view>
			<view class="info">
				<text class="uni-h7 uni-text-gray">NerveNetwork去中心化执行闪兑任务，保证资产安全</text>
			</view>
		</view>

		<view class="middle">
			<form @submit="formSubmit" @reset="formReset" class="m-form">
				<view class="uni-form-item uni-column">
					<view class="title uni-h6">
						<text class="fl">发送</text>
						<text class="fr">余额：5555 NULS</text>
					</view>

					<view class="info">
						<view class="m-input">
							<input class="uni-input" name="input" placeholder="请输入发送金额" />
						</view>
						<view class="m-select">
							<xfl-select :list="list" :clearable="false" :showItemNum="5" :listShow="false" :isCanInput="true"
							 :style_Container="'height: 1.6rem; font-size: 0.8rem;'" :placeholder="'placeholder'" :initValue="'NULS'"
							 :selectHideType="'hideAll'">
							</xfl-select>
						</view>
					</view>

				</view>
				<view class="uni-form-item uni-column">
					<view class="info">
						<view class="m-input">
							<input class="uni-input" name="input" placeholder="可兑换金额" />
						</view>
						<view class="m-select">
							<xfl-select :list="list" :clearable="false" :showItemNum="5" :listShow="false" :isCanInput="true"
							 :style_Container="'height: 1.6rem; font-size: 0.8rem;'" :placeholder="'placeholder'" :initValue="'NULS'"
							 :selectHideType="'hideAll'">
							</xfl-select>
						</view>
					</view>

				</view>
				<view class="uni-btn-v">
					<button form-type="submit" type="primary">兑换</button>
				</view>
			</form>
		
		
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
		components: {
			xflSelect
		}, //注册为子组件
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="less">
	@import './../../common/uni.css';

	.swap {
		.top {
			height: 5rem;
			width: 100%;

			.info {
				padding: 0.5rem 0.5rem 0 0.5rem;
				line-height: 1rem;
			}
		}

		.middle {
			.m-form {
				.title {
					color: #777d97;
					.fl {
						display: block;
						float: left;
					}

					.fr {
						display: block;
						float: right;
						margin: 0 6.5rem 0 0;
					}
				}

				.info {
					.m-input {
						width: 70%;
						float: left;

						.uni-input {
							.uni-input-input {
								border: 2upx solid #c0c4cc;
							}
						}
					}

					.m-select {
						width: 28%;
						float: right;
						margin: 0 2% 0 0;
						margin-bottom: 20px;
					}

				}

				.uni-btn-v {
					margin: 0 0.5rem;
				}
			}
		}
	}
</style>
