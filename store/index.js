import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		addressInfo: {}, //选中的账户信息

	},
	mutations: {
		setAddressInfo(state, data) {
			state.dealData = data;
		},
	},
	getters: {
		getAddressInfo(state) {
			let addressData = JSON.parse(uni.getStorageSync('addressData'));
			console.log(addressData);
			console.log(addressData.filter(k => k.isItem));
			state.addressInfo = addressData.filter(k => k.isItem)
			return state.addressInfo
		},

	},
	actions: {

	}
})

export default store
