// pages/joinPingou/joinPingou.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiIndex1: [0, 0],
    multiArray1: [
      ['省', '上海', '浙江省'],
      ['市', '宝山区', '静安区', '浦东新区', '杨浦区', '虹口区']
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 交货地
  regionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex1: e.detail.value
    })
  },
  submitSuccess:function(){
    wx.navigateTo({
      url: '../submitSuccess/submitSuccess',
    })
  }
})