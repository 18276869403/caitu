const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 我的信息验证
const yanzheng = function(str){
  var strlist = str.split('|')
	for(let obj of strlist){
		var list = obj.split(',')
		if(list[0] == ""||list[0]==0||list[0]==undefined||list[0]==null||list[0]=='undefined'||list[0]=='选择颜色'||list[0]=='选择强度'||list[0]=='选择油漆'||list[0]=='选择正面膜厚'||list[0]=='选择背面膜厚'||list[0]=='选择镀层量'||list[0]=='请选择日期'){
			return list[1]
		}
  }
  return 0
}

// 下拉列表验证
const yanzhengVal = function(str){
  var strlist = str.split('|')
	for(let obj of strlist){
		var list = obj.split(',')
		if(list[0].indexOf('选择') != -1 ||list[0] == undefined){
			return list[1]
		}
  }
  return 0
}

// 获取集合中的下标
const getArrIndex = function(arr,obj){
  var i = arr.length
  while(i--){
    if(arr[i] == obj){
      return i;
    }
  }
  return -1;
}
// 在指定字符串指定位置中添加一段字符
const arrayStrAdd = function(arr,index,str){
  var str1 = arr.slice(0,index)
  var str2 = arr.slice(index)
  var temp = str1 + str + str2
  return temp
}

// 获取指定字符在字符串中出现的次数
const arrayStrNum = function(arr,str){
  var index = arr.indexOf(str)
  var num = 0
  while(index !== -1){
      num++;
      index = arr.indexOf(str,index + 1)
  }
  return num
}

// 编号10位
const IdentityNum = function(str){
  var str1 = ''
  for(let i=0;i<10-str.length;i++){
    str1 += 0
  }
  return str1 + str
} 
// 限制输入两位小数点
var douleNum = function(obj){
  // 先把非数字的都替换掉，除了数字和
  obj = obj.replace(/[^\d.]/g,"")
  // 保证只有出现一个，而没有多个
  obj = obj.replace(/\.{2,}/g,".")
  // 必须保证第一个为数字而不是.
  obj = obj.replace(/^\./g,"")
  // 保证.只出现一次，而不能出现两次以上
  obj = obj.replace(".","$#$").replace(/\./g,"").replace("$#$",".")
  // 只能出现输入两位数小数点
  obj = obj.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')
  return obj
}
const newDate = function(){
  var timestamp = Date.parse(new Date());
  var date = new Date(timestamp);
  //获取年份  
  var Y =date.getFullYear();
  //获取月份  
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  //获取当日日期 
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 
  return Y + '-' + M + '-' + D
}

module.exports = {
  formatTime: formatTime,
  yanzheng:yanzheng,
  getArrIndex:getArrIndex,
  yanzhengVal:yanzhengVal,
  arrayStrAdd:arrayStrAdd,
  arrayStrNum:arrayStrNum,
  IdentityNum:IdentityNum,
  douleNum:douleNum,
  newDate:newDate
}
