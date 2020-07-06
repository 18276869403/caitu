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
    areaTwoId:'',
    select:1,
    xieyi:api.xieyi
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.shuju != undefined){
      var shuju=JSON.parse(options.shuju)
      this.setData({
        pgid:shuju.id,
        shuju:shuju,
        pricingprice:shuju.pricingprice
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
    if(cityindex[0]=='0'){
      wx.showToast({
        title: '请选择省',
        icon:'none',
        duration:2000
      })
      return
    }
    if(cityindex[1]=='0'){
      wx.showToast({
        title: '请选择市',
        icon:'none',
        duration:2000
      })
      return
    }
    that.data.areaOneId=citylist[cityindex[0]-1].itemValue
    that.data.areaTwoId=city[cityindex[1]-1].itemValue
    var data = {
      areaOneId:citylist[cityindex[0]-1].itemValue,
      areaTwoId:city[cityindex[1]-1].itemValue,
      groupId:that.data.pgid,
      wxUserId:app.globalData.wxid,
      sumsn:that.data.dunwei
    }
    if(that.data.dunwei==''){
      wx.showToast({
        title: '请输入需求吨数',
        icon:'none',
        duration:2000
      })
      return
    }
    if(Number(that.data.dunwei)>Number(that.data.pricingprice)){
      wx.showToast({
        title: '拼购吨数不能大于钢厂最高起订量',
        icon:'none',
        duration:2000
      })
      return
    }
    if(that.data.select=='1')
    {
      wx.showToast({
        title: '请勾选用户协议！',
        icon:'none',
        duration:2000
      })
      return
    }
    debugger
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
          id:that.data.id,
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
        dataobj.haibaotype = 1
        dataobj.theName = item.itemvalue_dictText
        dataobj = JSON.stringify(dataobj)
        if(res.result.records.length == 0){
          wx.redirectTo({
            url: '../post/post?obj='+dataobj+"&dunwei="+that.data.dunwei,
          })
        }else{
          var shuju1=JSON.stringify(res.result.records)
          setTimeout(function(){
            app.globalData.haibaitype = 1
            wx.redirectTo({
              url: '../submitSuccess/submitSuccess?obj='+shuju1+"&dataobj="+dataobj+"&objtype="+1+"&dunwei="+that.data.dunwei,
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
  },
  //改变选框状态(免责协议)
  change: function(e) {
    var that = this
    //得到选中状态
    var select = e.currentTarget.dataset.xid
    if (select == "1") {
      var stype = "2"

    } else {
      var stype = "1"
    }
    //赋值
    that.setData({
      select: stype
    })

  },
  // 服务规则页面显示
  showModal1: function() {
    this.setData({
      hasMask: true
    })
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation

    animation.opacity(0).rotateX(-100).step();
    this.setData({
      animationData: animation.export(),
      showModalStatus1: true
    })
    setTimeout(function() {
      animation.opacity(1).rotateX(0).step();
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //服务规则页面关闭
  hideModal1: function() {
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    // flag = 0;
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      hasMask: false
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus1: false
      })
    }.bind(this), 200)
  },
})