// pages/joinPingou/joinPingou.js
const app = getApp()
const qingqiu = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiIndex1: [0, 0],
    multiArray1: [],
    citylist:[],
    city:[],
    dunwei:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAddress()
  },
  dunwei:function(e){
    console.log('事件携带值:',e.detail.value)
    this.setData({
      dunwei:e.detail.value
    })
  },
  // 获取省
  getAddress(){
    var that = this
    qingqiu.get("shengFen",null,function(res){
      console.log(res)
      if(res.success == true){
        var names = []
        for(let obj of res.result){
          if(names.length==0){
            names.push("选择省")
          }
          names.push(obj.itemText)
        }
        var multiArray1 = [names,[]]
        that.setData({
          multiArray1:multiArray1,
          cityList:res.result
        })
        qingqiu.get("shi",{pid:110000},function(res){
          if(res.success == true){
            var cityname = []
            for(let obj of res.result){
              if(cityname.length==0){
                cityname.push("选择市")
              }
              cityname.push(obj.itemText)
            }
            var multiArray1 = "multiArray1[1]"
            that.setData({
              [multiArray1]:cityname,
              city:res.result
            })
          }
        })
      }
    })
  },

  // 省份触发事件
  bindMultiPickerColumnChangeCity:function(e){
    console.log("携带参数",e.detail)
    var indexs = e.detail.value
    var column = e.detail.column
    var that = this
    if(column == 0){
      var data = {
        pid:that.data.cityList[indexs-1].itemValue
      }
      qingqiu.get("shi",data,function(res){
        console.log(res)
        if(res.success == true){
            var cityname = []
            for(let obj of res.result){
              if(cityname.length==0){
                cityname.push("选择市")
              }
              cityname.push(obj.itemText)
            }
            var multiArray1 = "multiArray1[1]"
            var multiIndex1 = [indexs,0]
            that.setData({
              [multiArray1]:cityname,
              city:res.result,
              multiIndex1:multiIndex1
            })
        }
      })
    }else{
      var multiIndex1 = "multiIndex1[1]"
      this.setData({
        [multiIndex1]: indexs,
      })
    }
  },
  submitSuccess:function(){
    var that = this
    var data = {
      areaOneId:citylist[cityindex[0]-1].itemValue,
      areaTwoId:city[cityindex[1]-1].itemValue,
      
    }
    wx.navigateTo({
      url: '../submitSuccess/submitSuccess',
    })
  }
})