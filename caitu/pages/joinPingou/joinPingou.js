// pages/joinPingou/joinPingou.js
const app = getApp()
const qingqiu = require('../../utils/request.js')
const api = require('../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    viewUrl:api.viewUrl,
    multiIndex1: [0, 0],
    multiArray1: [],
    citylist:[],
    city:[],
    dunwei:'',
    pgid:'',
    shuju:{},
    shuju1:[],
    areaOneId:'',
    areaTwoId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.shuju != undefined){
      var shuju=JSON.parse(options.shuju)
      this.setData({
        pgid:shuju.id,
        shuju:shuju
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
    console.log(data)
    qingqiu.get("canYuGroupBuying",data,function(res){
      console.log(res)
      if(res.success == true){
        wx.showToast({
          title: '提交成功',
          icon:'none',
          duration:2000
        })
        
        var item = that.data.shuju
        var dataobj = {
          wxUserId:app.globalData.wxid,
          areaOneId:item.areaOneId,
          areaTwoId:item.areaTwoId,
          steelName:item.steelname,
          thickness:item.thickness,
          width:item.width,
          paint:item.paint,
          front:item.front,
          rear:item.rear,
          coat:item.coat,
          zincLayer:item.zinclayer,
          color:item.color,
          density:item.density,
          tonnage:item.tonnage,
        }
        dataobj.theName = item.itemvalue_dictText
        dataobj = JSON.stringify(dataobj)
        if(res.result.records.length == 0){
          wx.redirectTo({
            url: '../post/post?obj='+dataobj,
          })
        }else{
          var shuju1=JSON.stringify(res.result.records)
          setTimeout(function(){
            app.globalData.haibaitype = 1
            wx.redirectTo({
              url: '../submitSuccess/submitSuccess?obj='+shuju1+"&dataobj="+dataobj,
            })
          },1000)
        }
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