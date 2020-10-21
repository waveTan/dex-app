<template>
	<view class="pass-word">
		<s-popup custom-class="pass-popup" position="center" v-model="passWordVisible">
			<view class="title">
				请输入密码
			</view>

			<form @submit="passWordSubmit" @reset="passWordReset" class="password-form">
				<view class="uni-form-item uni-column">
					<input type="password" class="uni-input" name="input" v-model="passValue" placeholder="请输入密码" />
				</view>
				<view class="uni-btn-v">
					<button class="btn btn-cancel uni-text-gray" form-type="reset">取消</button>
					<button class="btn btn-confirm uni-text-gray" form-type="submit">确定</button>
				</view>
			</form>

		</s-popup>
	</view>
</template>

<script>
	import sPopup from '@/components/s-popup';
	export default {
		data() {
			return {
				passWordVisible: false,
				passValue: '',
			}
		},
		mounted() {
			this.monitoring() // 注册监听事件
		},
		components: {
			sPopup
		},

		methods: {

			monitoring() { // 监听事件
				this.$on('showPassWord', (res) => {
					//console.log(res);
					this.passWordVisible = res;
				})
			},

			//提交
			passWordSubmit() {
				//console.log();
				if (!this.passValue) {
					alert('请输入正确的密码！')
				}
				//console.log(this.passValue);
				this.$emit('passwordSubmit', this.passValue);
				this.passWordVisible = false;

				setTimeout(() => {
					this.passValue = ''
				}, 500)

			},

			//取消
			passWordReset() {
				//console.log(e);
				this.passWordVisible = false;
			},


		}
	}
</script>

<style lang="less">
	.pass-word {
		.pass-popup {
			width: 100%;

			.title {
				font-size: 0.30rem;
				font-weight: bold;
				text-align: center;
				line-height: 2rem;
				height: 2rem;
				width: 18rem;
			}

			.password-form {
				width: 20rem;

				.uni-column {
					.uni-input {
						border-bottom: 1px solid #c1c1c1;
						margin: 0 2rem;

						.uni-input-wrapper {
							.uni-input-input {}
						}
					}
				}

				.uni-btn-v {
					height: 2rem;
					margin: 1rem 0;

					.btn {
						width: 6rem;
						line-height: 2rem;
					}

					.btn-cancel {
						float: left;
						margin: 0 0 0 2rem;
						border: 1px solid #09BB07;
						color: #09BB07;
					}

					.btn-confirm {
						float: right;
						margin: 0 2rem 0 0;
						background-color: #09BB07;
						color: #FFFFFF;
					}
				}
			}
		}
	}
</style>
