// pages/calculatorResult/calculatorResult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jisuanDetails:{},
    objValue:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var xiangqing=JSON.parse(options.obj)
    var value = JSON.parse(options.objval)
    console.log(xiangqing)
    console.log(value)
    this.setData({
      jisuanDetails:value,
      objValue:xiangqing
    })
  },
  // 跳转到计算器页面
  calculator: function() {
    wx.redirectTo({ 
      url: '../calculator/calculator',
    })
  },
  // 跳转到发起求购页面
  qiugouSubmit: function() {
    wx.navigateTo({
      url: '../qiugouSubmit/qiugouSubmit',
    })
  }
})