"use strict";

//开发模式
export const IS_DEV = false;

//dex 网络api
export const DEX_URL = IS_DEV ? '/' : 'http://beta.nervedex.com';

//浏览器连接地址
export const EXPLORER_URL = IS_DEV ? 'http://explorer.nervedex.com/' : 'http://beta.explorer.nervedex.com/';

//资产信息 chainId、assetId
export const CHAIN_INFO = {
	chainId: 5,
	assetId: 1,
	prefix: 'TNVT'
};
