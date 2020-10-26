import Request from 'luch-request' // 使用npm
import {
	DEX_URL
} from '@/config.js'

const http = new Request();

/**  封装get请求
 * Encapsulation get method
 * @param url
 * @returns {Promise}
 */
export async function dexGet(url) {
	axios.defaults.baseURL = DEX_URL;
	let newUrl = DEX_URL + url
	try {
		let res = await http.get(newUrl);
		console.log(res)
		return (res.data.data)
	} catch (err) {
		return {
			success: false,
			data: err
		}
	}
}

/**封装post请求
 * Encapsulation post method
 * @param url
 * @param data
 * @returns {Promise}
 */
export async function dexPost(url, data) {
	let newUrl = DEX_URL + url
	try {
		let res = await http.post(newUrl, data);
		//console.log(res);
		return (res.data.data)
	} catch (err) {
		return {
			success: false,
			data: err
		}
	}
}
