<template>
	<view class="uni-bg2 import-key">
		<view class="top">
			<view class="title uni-h4">使用私钥导入</view>
			<view class="info uni-text-gray">将您的钱包私钥复制到下方输入框内</view>
		</view>

		<u-form :model="keyImportForm" ref="keyImportRef" :border-bottom="true" label-position="top" class="import-form">
			<u-form-item label="" prop="key">
				<u-input v-model="keyImportForm.key" type="textarea" :border="border" placeholder='请输入私钥内容' />
			</u-form-item>
			<u-form-item label="" prop="password">
				<u-input v-model="keyImportForm.password" :clearable="false" placeholder='请输入密码' type='password' :border="border" />
			</u-form-item>
			<u-form-item label="" prop="passwordTwo">
				<u-input v-model="keyImportForm.passwordTwo" :clearable="false" placeholder='请输入重复密码' type='password' :border="border" />
			</u-form-item>
		</u-form>

		<u-button @click="importKeySubmit" type="success">下一步</u-button>
	</view>
</template>
<script>
	import nerve from 'nerve-sdk-js';
	import {
		addressSetStorage
	} from '@/utils/utils.js';
	export default {
		data() {
			return {
				border:true,
				keyImportForm: {
					key: '9ce21dad67e0f0af2599b41b515a7f7018059418bab892a7b68f283d489abc4b',
					password: 'nuls123456',
					passwordTwo: 'nuls123456',
				},
				rules: {
					key: [{
						required: true,
						message: '请输入私钥',
						trigger: ['change', 'blur'],
					}],
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
			
			//导入私钥
			importKeySubmit() {
				this.$refs.keyImportRef.validate(async valid => {
					if (valid) {
						
						const newAddress = nerve.importByKey(4, this.keyImportForm.key,this.keyImportForm.password, 'TNVT');
						//console.log(newAddress);

						let addressList = await addressSetStorage(newAddress);
						//console.log(addressList);
						
						if (addressList.success) {
							uni.navigateTo({
								url: '/pages/assets/set'
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
			this.$refs.keyImportRef.setRules(this.rules);
		}
	};
</script>
<style scoped lang="less">
	.import-key {
		width: 100%;
		height: 25rem;
		padding: 0;

		.top {
			margin: 0.1rem 0 0 0;
			padding: 1rem 1rem 0;

			.titles {
				font-size: 0.4rem;
				line-height: 0.5rem;
				height: 0.9rem;
				line-height: 0.9rem;
				padding: 0.2rem 0 0.3rem 1rem;
				background-color: #fff2df;
				color: #c39576;
			}
		}


		.import-form {
			margin: -0.8rem 1rem 1rem;

			.uni-input-input {
				//border-bottom: 1px solid #005CBF;
			}

			.u-input__right-icon__item {
				margin: 5upx 0 0 0;
			}
		}

		.u-btn--success {
			width: 18rem;
		}

	}
</style>
