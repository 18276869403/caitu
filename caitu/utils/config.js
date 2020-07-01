 // const baseUrl = "http://192.168.1.238:8080/" 
 const chen = require('../utils/chen.js')
 const kaifa = require('../utils/kaifa.js')
//  const baseUrl = "http://111.231.51.198:9045/jeecg-boot/"  
 const baseUrl = "http://192.168.1.237:8080/jeecg-boot/" 

 // 图片上传
 const upload = baseUrl + "sys/common/upload"
 // 图片预览
 const viewUrl = baseUrl + "sys/common/static/"
 
 module.exports = {
  //  baseUrl:baseUrl,
   upload:upload,
   chen:chen, 
   viewUrl:viewUrl,
   kaifa:kaifa
 } 

