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
    dunwei:'',
    pgid:'',
    shuju:[],
    shuju1:[],
    areaOneId:'',
    areaTwoId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.shuju=JSON.parse(options.shuju)
    if(this.data.shuju != undefined){
      this.setData({
        pgid: this.data.shuju.id
      })
    }
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
          citylist:res.result
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
        pid:that.data.citylist[indexs-1].itemValue
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
    var cityindex = that.data.multiIndex1
    var citylist = that.data.citylist
    var city = that.data.city
    console.log(citylist)
    console.log(city)
    that.data.areaOneId=citylist[cityindex[0]-1].itemValue
    that.data.areaTwoId=city[cityindex[1]-1].itemValue
    var data = {
      areaOneId:citylist[cityindex[0]-1].itemValue,
      areaTwoId:city[cityindex[1]-1].itemValue,
      groupId:that.data.pgid,
      wxUserId:app.globalData.wxid,
      sumsn:that.data.dunwei
    }
    qingqiu.get("canYuGroupBuying",data,function(res){
      console.log(res)
      if(res.success == true){
        wx.showToast({
          title: '提交成功',
          icon:'none',
          duration:2000
        })
        that.data.shuju1=JSON.stringify(res.result.records)
        setTimeout(function(){
          app.globalData.haibaitype = 1
          wx.navigateTo({
            url: '../submitSuccess/submitSuccess?obj='+that.data.shuju1,
          })
        },1000)
      }else{
        wx.showToast({
          title: res.message,
          icon:'none',
          duration:2000
        })
        return
      }
    },'post')
  }
})