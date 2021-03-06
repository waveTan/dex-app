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
 * 复制 copy
 * @param value
 */
export const copys = (value) => copy(value);

/**
 * 字符串中间显示....
 * @param string
 * @param leng
 * @returns {*}
 */
export function superLong(string, leng) {
	if (string && string.length > 10) {
		return string.substr(0, leng) + "...." + string.substr(string.length - leng, string.length);
	} else {
		return string;
	}
}

/**
 * 保留指定小数位数
 * @param val 要处理的数据，Number | String
 * @param len 保留小数位数，位数不足时，以0填充
 * @param side 1|-1 对应 入|舍
 * @returns {string|number}
 */
export function tofix(val, len, side) {
  const numval = Number(val);
  if (isNaN(numval)) return 0;
  const str = val.toString();
  if (str.indexOf('.') > -1) {
    let numArr = str.split('.');
    if (numArr[1].length > len) {
      let tempnum = numval * Math.pow(10, len);
      if (!side) {
        return Number(val).toFixed(len)
      } else if (side === 1) {
        if (tempnum < 1) return (1 / Math.pow(10, len));
        return (Math.ceil(tempnum) / Math.pow(10, len)).toFixed(len)
      } else if (side === -1) {
        return (Math.floor(tempnum) / Math.pow(10, len)).toFixed(len)
      } else {
        return Number(val.toFixed(len))
      }
    } else {
      return Number(str).toFixed(len)
    }
  } else {
    return Number(val).toFixed(len)
  }
}

/** 账户存入缓存
 */
export function addressSetStorage(newAddressInfo) {

	let addressList = [];
	try {

		let res = uni.getStorageSync('addressData');
		//console.log(res);
		let resData = []
		if (res) {
			resData = [...JSON.parse(res), newAddressInfo];
		} else {
			resData.push(newAddressInfo);
		}
		//console.log(resData);

		//账户列表去重
		let obj = {};
		let newAddressList = resData.reduce((item, next) => {
			obj[next.address] ? '' : obj[next.address] = true && item.push(next);
			return item
		}, []);
		//console.log(newAddressList);

		if (newAddressList.length !== 0) {
			let isAddress = false;
			for (let item of newAddressList) {
				item.isItem = false;
				if (item.address === newAddressInfo.address) {
					isAddress = true;
					item.isItem = true;
				}
			}

			if (isAddress) {
				newAddressInfo.isItem = true;
				addressList = [...newAddressList]
			} else {
				addressList = [...newAddressList]
			}

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
