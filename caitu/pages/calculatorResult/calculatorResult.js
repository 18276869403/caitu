// pages/calculatorResult/calculatorResult.js
const app = getApp()
const qingqiu = require('../../utils/request')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    key:[],
    value:[],
    pricingPrice:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if(options.obj!= undefined){
      this.getcalcul(options.obj)
    }
  },

  getcalcul(id){
    var that = this
    qingqiu.get("getCalculateList",{id:id},function(res){
      console.log(res)
      if(res.success == true){
        that.datafenge(res.result.records[0])
      }
    })
  },

  datafenge(list){
    console.log(list)
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
    key.push(list.tonnage.split('|')[0])
    key.push(list.theNameText)
    key.push(list.steelName)
    key.push(list.monovalent)
    key.push(list.backup1)
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
    this.setData({
      key:key,
      value:value
    })
  },

  // 跳转到计算器页面
  calculator: function() {
    var obj = JSON.stringify(this.data.jisuanDetails)
    wx.redirectTo({ 
      url: '../calculator/calculator?obj=' + obj,
    })
  },
  // 跳转到发起求购页面
  qiugouSubmit: function() {
    var obj = JSON.stringify(this.data.jisuanDetails)
    wx.navigateTo({
      url: '../qiugouSubmit/qiugouSubmit?obj=' + obj,
    })
  },
  // 跳转到发起求购页面
  pingouSubmit:function(){
    var obj = JSON.stringify(this.data.jisuanDetails)
    wx.navigateTo({
      url: '../qiugouSubmit/qiugouSubmit?obj=' + obj,
    })
  }
})