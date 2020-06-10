 // const api = require('../utils/config.js')
 const baseUrl = "http://192.168.1.238:8080/jeecg-boot/" 
 // 我的页面-个人信息查询
 const my = baseUrl + "rabbit/mine/my"
 // 登陆
 const getKeyInfo = baseUrl + "rabbit/wxLogin/getKeyInfo"
 // 我的页面-个人信息修改
 const modifyMy = baseUrl + "rabbit/mine/modifyMy"
 // 获取首页信息
 const init = baseUrl + "rabbit/index/init"
 // 我的求购
const askToBuyList = baseUrl +  "rabbit/mine/askToBuyList"
// 我的库存
const inventoryList = baseUrl + "rabbit/mine/inventoryList"
// 计算历史
const calculateList = baseUrl + "rabbit/mine/calculateList"

 module.exports = {
   baseUrl:baseUrl,
   my:my,
   getKeyInfo:getKeyInfo,
   modifyMy:modifyMy,
   init:init,
   askToBuyList:askToBuyList,
   inventoryList:inventoryList,
   calculateList:calculateList
 } 
