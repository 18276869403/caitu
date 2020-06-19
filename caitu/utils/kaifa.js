// const api = require('../utils/config.js')
// const baseUrl = "http://111.231.51.198:9045/jeecg-boot/" 
const baseUrl = "http://192.168.1.243:8080/jeecg-boot/" 
 // 我的页面-我的拼购
 const groupByingList = baseUrl + "rabbit/mine/groupByingList"
 // 我的页面-我的计算历史
 const calculateList = baseUrl + "rabbit/mine/calculateList" 
// 首页面-拼购
const initGroupBuying = baseUrl + "rabbit/index/initGroupBuying"
// 首页面-资讯
const initInformation = baseUrl + "rabbit/index/initInformation"
// 首页面-尾货
const initInventory = baseUrl + "rabbit/index/initInventory"
// 首页面-拼购参与者 
const groupBuyingCanYuZhu = baseUrl + "rabbit/lobby/groupBuyingCanYuZhu"
// 大厅-拼购
const groupByingLists = baseUrl + "rabbit/lobby/groupByingList"
// 大厅-求购
const askToBuyLists = baseUrl + "rabbit/lobby/askToBuyList"
// 大厅-尾货
const inventoryLists = baseUrl + "rabbit/lobby/inventoryList"
// 大厅-油漆
const commonPrint = baseUrl + "rabbit/lobby/commonPrint"
// 大厅-膜厚
const commonMoHou = baseUrl + "rabbit/lobby/commonMoHou"
// 大厅-拼购发布
const faBuPinGou = baseUrl + "rabbit/lobby/faBuPinGou"
// 大厅-求购发布
const faBuQiuGou = baseUrl + "rabbit/lobby/faBuQiuGou"
// 参与拼购-提交
const canYuGroupBuying = baseUrl + "rabbit/index/canYuGroupBuying"

 module.exports = {
  groupByingList:groupByingList,
  calculateList:calculateList,
  initGroupBuying:initGroupBuying, 
  initInformation:initInformation,
  initInventory:initInventory,
  groupBuyingCanYuZhu:groupBuyingCanYuZhu,
  groupByingLists:groupByingLists,
  askToBuyLists:askToBuyLists,
  inventoryLists:inventoryLists,
  commonPrint:commonPrint,
  commonMoHou:commonMoHou,
  faBuPinGou:faBuPinGou,
  faBuQiuGou:faBuQiuGou,
  canYuGroupBuying:canYuGroupBuying
 } 
