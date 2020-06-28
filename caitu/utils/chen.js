 // const api = require('../utils/config.js')
//  const baseUrl = "http://111.231.51.198:9045/jeecg-boot/" 
 const baseUrl = "http://192.168.1.248:8080/jeecg-boot/" 

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
// 首页-求购
const initAskToBuy = baseUrl + "rabbit/index/initAskToBuy"
// 首页-广告
const initBanners = baseUrl + "rabbit/index/initBanners"
// 省份
const shengFen = baseUrl + "rabbit/index/shengFen"
// 市
const shi = baseUrl + "rabbit/index/shi"
// 钢厂
const stell = baseUrl + "rabbit/index/stell"
// 品名
const theName = baseUrl + "rabbit/index/theName"
// 库存管理
const common = baseUrl + "rabbit/lobby/common"
// 油漆
const commonPrint = baseUrl + "rabbit/lobby/commonPrint"
// 膜厚
const commonMoHou = baseUrl + "rabbit/lobby/commonMoHou"
// 发布尾货
const faBuWeiHuo = baseUrl + "rabbit/lobby/faBuWeiHuo"
// 修改尾货
const updateInventById = baseUrl + "rabbit/mine/updateInventById"
// 根据id查库存 
const selectInventById = baseUrl + "rabbit/mine/selectInventById"
// 删除
const deleteInvent = baseUrl + "rabbit/mine/deleteInvent"
// 上架
const updateShangInvent = baseUrl + "rabbit/mine/updateShangInvent"
// 下架 
const updateXiaInvent = baseUrl + "rabbit/mine/updateXiaInvent"
// 发起匹配
const PinfaQiPiPei = baseUrl + "rabbit/lobby/PinfaQiPiPei"
// 查看匹配记录
const findPiPei = baseUrl + "rabbit/lobby/findPiPei"
// 获取计算历史
const getCalculateList = baseUrl + "rabbit/lobby/getCalculateList"
// 获取锌层
const getXC = baseUrl + "rabbit/lobby/getXC"

 module.exports = {
   baseUrl:baseUrl,
   my:my,
   getKeyInfo:getKeyInfo,
   modifyMy:modifyMy,
   init:init,
   askToBuyList:askToBuyList,
   inventoryList:inventoryList,
   initAskToBuy:initAskToBuy,
   initBanners:initBanners,
   shengFen:shengFen, 
   shi:shi,
   stell:stell,
   theName:theName,
   common:common,
   commonPrint:commonPrint,
   commonMoHou:commonMoHou,
   faBuWeiHuo:faBuWeiHuo,
   selectInventById:selectInventById,
   deleteInvent:deleteInvent,
   updateShangInvent:updateShangInvent,
   updateXiaInvent:updateXiaInvent,
   updateInventById:updateInventById,
   PinfaQiPiPei:PinfaQiPiPei,
   findPiPei:findPiPei,
   getCalculateList:getCalculateList,
   getXC:getXC
 } 
