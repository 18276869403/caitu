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
		if(list[0] == ""||list[0]==0||list[0]==undefined||list[0]==null){
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
		if(list[0].indexOf('选择') != -1){
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

module.exports = {
  formatTime: formatTime,
  yanzheng:yanzheng,
  getArrIndex:getArrIndex,
  yanzhengVal:yanzhengVal 
}
