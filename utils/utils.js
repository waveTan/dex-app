import nerve from 'nerve-sdk-js'
import {
	BigNumber
} from 'bignumber.js'
import copy from 'copy-to-clipboard'

/**
 * 10的N 次方
 * @param arg
 * @returns {BigNumber}
 * @constructor
 */
export function Power(arg) {
	let newPower = new BigNumber(10);
	return newPower.pow(arg);
}

/**
 * 加法
 * @param nu
 * @param arg
 * @returns {BigNumber}
 * @constructor
 */
export function Plus(nu, arg) {
	let newPlus = new BigNumber(nu);
	return newPlus.plus(arg);
}

/**
 * 减法
 * @param nu
 * @param arg
 * @returns {BigNumber}
 * @constructor
 */
export function Minus(nu, arg) {
	let newMinus = new BigNumber(nu);
	return newMinus.minus(arg);
}

/**
 * 乘法
 * @param nu
 * @param arg
 * @returns {BigNumber}
 * @constructor
 */
export function Times(nu, arg) {
	let newTimes = new BigNumber(nu);
	return newTimes.times(arg);
}

/**
 * 除法
 * @param nu
 * @param arg
 * @returns {BigNumber}
 * @constructor
 */
export function Division(nu, arg) {
	let newDiv = new BigNumber(nu);
	return newDiv.div(arg);
}

/**
 * 数字乘以精度系数
 */
export function timesDecimals(nu, decimals) {
	if (decimals === 0) {
		return nu
	}
	let newNu = 0;
	if (decimals > 9) {
		newNu = new BigNumber(Times(nu, Power(decimals))).toFormat().replace(/[,]/g, '');
	} else {
		newNu = new BigNumber(Times(nu, Power(decimals))).toString();
	}
	return newNu;
}

/**
 * 数字除以精度系数
 */
export function divisionDecimals(nu, decimals = '') {
	if (decimals === 0) {
		return nu
	}
	let newNu = new BigNumber(Division(nu, Power(decimals)).toString());
	return newNu.toFormat().replace(/[,]/g, '');
}

/**
 * 账户存入缓存
 */
export function addressSetStorage(newAddressInfo) {
	
	let addressList = [];
	try {
		let resData = JSON.parse(uni.getStorageSync('addressData'));
		//console.log(resData);

		if (resData.length !== 0) {
			for (let item of resData) {
				item.isItem = false;
			}
			newAddressInfo.isItem = true;
			addressList = [...resData, newAddressInfo]
		}
	} catch (e) {
		// error
		return {
			success: false,
			data: e
		}
	}
	//console.log(addressList)

	try {
		uni.setStorageSync('addressData', JSON.stringify(addressList));
		return {
			success: true,
			data: addressList,
		}
	} catch (e) {
		return {
			success: false,
			data: e
		}
	}

}
