<template>
	<view class="back">
		<view class="img"></view>
		<view class="top">
			<view class="title uni-text-red">安全警告</view>
			<view class="info uni-text-red">
				私钥没有加密,私钥没有加密私钥没有加密私钥没有加密私钥没有加密私钥没有加密私钥没有加密
			</view>

		</view>
		<uni-list class="list">
			<uni-list-item title="备份私钥" link @click="backKey()"></uni-list-item>
			<uni-list-item title="备份Keystore" link @click="backKeystore()"></uni-list-item>
		</uni-list>
		
		<passWord ref="password"></passWord>
	</view>
	
</template>

<script>
	import passWord from '@/components/passWord.vue';
	export default {
		components: {
			passWord
		},
		methods: {
			
			backKey() {
				console.log('backKey');
				this.$refs.password.$emit('childMethod','发送给方法一的数据') // 方法1:触发监听事件
			},

			backKeystore() {
				console.log('backKeystore')
			}

		}
	}
</script>

<style lang="less">
	.back {
		.img {
			height: 4rem;
			width: 100%;
		}

		.top {
			padding: 1rem;
			border: 1px solid #D64c58;
			margin: 0.5rem;

			.title {
				font-weight: bold;
				font-size: 0.2rem;
			}

			.info {
				font-size: 0.18rem;
				//background-color: #D64444;
			}
		}

		.list {
			margin: 1rem 0 0 0;
		}
	}
</style>
