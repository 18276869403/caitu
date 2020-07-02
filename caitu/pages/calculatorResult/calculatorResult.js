// pages/calculatorResult/calculatorResult.js
const app = getApp()
const qingqiu = require('../../utils/request')
const api = require('../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    viewUrl: api.viewUrl,
    key: [],
    value: [],
    pricingPrice: '',
    jisuanDetails: {},
    showModalStatus1: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.obj != undefined) {
      this.getcalcul(options.obj)
    }
  },

  getcalcul(id) {
    var that = this
    qingqiu.get("getCalculateList", {
      id: id
    }, function (res) {
      console.log(res)
      if (res.success == true) {
        that.datafenge(res.result.records[0])
        that.setData({
          jisuanDetails: res.result.records[0]
        })
      }
    })
  },

  datafenge(list) {
    var key = []
    var value = []
    key.push(list.thickness.split('|')[0])
    key.push(list.width.split('|')[0])
    key.push(list.paint.split('|')[0])
    key.push(list.front.split('|')[0])
    key.push(list.rear.split('|')[0])
    key.push(list.coat.split('|')[0])
    key.push(list.zincLayer.split('|')[0])
    key.push(list.color.split('|')[0])
    key.push(list.density.split('|')[0])
    key.push(Number(list.tonnage.split('|')[0]))
    key.push(list.theNameId_dictText)
    key.push(list.steelName)
    key.push(list.monovalent)
    key.push(Number(list.backup1.split("|")[0]))
    value.push(list.thickness.split('|')[1])
    value.push(list.width.split('|')[1])
    value.push(list.paint.split('|')[1])
    value.push(list.front.split('|')[1])
    value.push(list.rear.split('|')[1])
    value.push(list.coat.split('|')[1])
    value.push(list.zincLayer.split('|')[1])
    value.push(list.color.split('|')[1])
    value.push(list.density.split('|')[1])
    value.push(list.tonnage.split('|')[1])
    value.push(list.backup1.split("|")[1])
    console.log(key)
    console.log(value)
    this.setData({
      key: key,
      value: value
    })
  },

  // 跳转到计算器页面
  calculator: function () {

    var key = this.data.key
    var value = this.data.value
    var data = this.data.jisuanDetails
    data.thickness = key[0]
    data.width = key[1]
    data.paint = key[2]
    data.front = key[3]
    data.rear = key[4]
    data.coat = key[5]
    data.zincLayer = key[6]
    data.color = key[7]
    data.density = key[8]
    data.tonnage = key[9]
    data.theNameId_dictText = key[10]
    data.steelName = key[11]
    data.monovalent = key[12]
    data.backup1 = key[13]
    data.xinceng = value[6]
    data.tuceng = value[5]
    var obj = JSON.stringify(this.data.jisuanDetails)
    wx.redirectTo({
      url: '../calculator/calculator?obj=' + obj + '&mohouStatus=1', 
    })

  },
  // 跳转到发起求购页面
  qiugouSubmit: function () {
    if (app.globalData.wxState == 0) {
      this.setData({
        showModalStatus1: true
      })
    } else {
      var key = this.data.key
      var data = this.data.jisuanDetails
      data.thickness = key[0]
      data.width = key[1]
      data.paint = key[2]
      data.front = key[3]
      data.rear = key[4]
      data.coat = key[5]
      data.zincLayer = key[6]
      data.color = key[7]
      data.density = key[8]
      data.tonnage = key[9]
      data.theNameId_dictText = key[10]
      data.steelName = key[11]
      data.monovalent = key[12]
      data.backup1 = key[13]
      var obj = JSON.stringify(this.data.jisuanDetails)
      wx.redirectTo({
        url: '../qiugouSubmit/qiugouSubmit?obj=' + obj,
      })
    }
  },
  // 跳转到发起拼购页面
  pingouSubmit: function () {
    if (app.globalData.wxState == 0) {
      this.setData({
        showModalStatus1: true
      })
    } else {
      var key = this.data.key
      var data = this.data.jisuanDetails
      data.thickness = key[0]
      data.width = key[1]
      data.paint = key[2]
      data.front = key[3]
      data.rear = key[4]
      data.coat = key[5]
      data.zincLayer = key[6]
      data.color = key[7]
      data.density = key[8]
      data.tonnage = key[9]
      data.theNameId_dictText = key[10]
      data.steelName = key[11]
      data.monovalent = key[12]
      data.backup1 = key[13]
      var obj = JSON.stringify(this.data.jisuanDetails)
      wx.redirectTo({
        url: '../pingouSubmit/pingouSubmit?obj=' + obj,
      })
    }
  },
  //弹窗关闭
  hideModal1: function () {
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
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus1: false
      })
    }.bind(this), 200)
  },
  // 跳转到认证信息页面
  renzhengInfo: function () {
    this.hideModal1()
    wx.navigateTo({
      url: '../renzhengInfo/renzhengInfo',
    })
  },

})