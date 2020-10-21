<template>
	<view class="uni-bg2 new-address">
		<view class="titles">密码用来保护私钥授权，请不要使用过于简单的密码；</view>
		<view class="titles">DEX不存储密码，也无法帮您找回，请务必记牢密码</view>

		<u-form :model="newAddressForm" ref="newAddressRef" :border-bottom="true" label-position="top" class="newAddress-form">
			<u-form-item label="" prop="password">
				<u-input v-model="newAddressForm.password" :clearable="false" placeholder='请输入密码' type='password' border="true" />
			</u-form-item>
			<u-form-item label="" prop="passwordTwo">
				<u-input v-model="newAddressForm.passwordTwo" :clearable="false" placeholder='请输入重复密码' type='password' border="true" />
			</u-form-item>
			<u-form-item>
				<u-checkbox-group>
					<u-checkbox v-model="newAddressForm.isAgree" :label-disabled="true">
						我已仔细阅读并同意
						<text class="uni-text-green">服务及隐私条款</text>
					</u-checkbox>
				</u-checkbox-group>
			</u-form-item>
		</u-form>

		<u-button @click="submit" type="success" :disabled="!newAddressForm.isAgree">提交</u-button>
	</view>
</template>
<script>
	import nerve from 'nerve-sdk-js';
	import {
		addressSetStorage
	} from '../../utils/utils.js';
	export default {
		data() {
			return {
				newAddressForm: {
					password: 'nuls123456',
					passwordTwo: 'nuls123456',
					isAgree: true,
				},
				rules: {
					password: [{
						required: true,
						message: '请输入密码',
						trigger: ['change', 'blur'],
					}],
					passwordTwo: [{
						required: true,
						message: '请输入重复密码',
						trigger: ['change', 'blur'],
					}]
				},

			};
		},
		methods: {
			submit() {
				this.$refs.newAddressRef.validate(async valid => {
					if (valid) {
						const newAddress = nerve.newAddress(4, this.newAddressForm.password, 'TNVT');
						//console.log(newAddress);

						let addressList = await addressSetStorage(newAddress);
						//console.log(addressList);
						
						if(addressList.success){
							uni.navigateTo({
								url: '/pages/assets/back'
							})
						}

					} else {
						console.log('验证失败');
					}
				});
			}
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.newAddressRef.setRules(this.rules);
		}
	};
</script>
<style scoped lang="less">
	.new-address {
		width: 100%;
		height: 23rem;
		padding: 0;

		.titles {
			font-size: 0.4rem;
			line-height: 0.5rem;
			height: 0.9rem;
			line-height: 0.9rem;
			padding: 0.2rem 0 0.3rem 1rem;
			background-color: #fff2df;
			color: #c39576;
		}

		.newAddress-form {
			margin: 2rem 1rem 1rem;

			.uni-input-input {
				//border-bottom: 1px solid #005CBF;
			}
			.u-input__right-icon__item{
				margin: 5upx 0 0 0;
			}
		}

		.u-btn--success {
			width: 18rem;
		}

	}
</style>
