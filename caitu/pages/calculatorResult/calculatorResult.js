// pages/calculatorResult/calculatorResult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jisuanDetails:{},
    objValue:{},
    pricingPrice:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var xiangqing=JSON.parse(options.obj)
    var value = JSON.parse(options.objval)
    this.setData({
      jisuanDetails:value,
      objValue:xiangqing
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