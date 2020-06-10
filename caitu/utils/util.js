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

module.exports = {
  formatTime: formatTime,
  yanzheng:yanzheng
}
