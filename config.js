"use strict";

//开发模式
export const IS_DEV = false;

//dex 网络api
export const DEX_URL = IS_DEV ? 'http://pre.nervedex.com' : 'http://beta.nervedex.com';
//export const DEX_URL = IS_DEV ? '/' : 'http://192.168.1.60:8081';

//浏览器连接地址
export const EXPLORER_URL = IS_DEV ? 'http://explorer.nervedex.com/' : 'http://beta.explorer.nervedex.com/';

//资产信息 chainId、assetId
export const CHAIN_INFO = IS_DEV ? {
	chainId: 9,
	assetId: 1,
	prefix: 'NVERVE'
} : {
	chainId: 5,
	assetId: 1,
	prefix: 'TNVT'
};

//websocket api
export const WEBSOCKET_URL = IS_DEV ? 'ws://pre.nervedex.com/ws' : 'ws://beta.nervedex.com/ws';
//export const WEBSOCKET_URL = IS_DEV ? 'ws://pre.nervedex.com/ws' : 'ws://192.168.1.60:8081/ws';
