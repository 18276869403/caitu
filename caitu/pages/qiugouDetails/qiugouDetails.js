// pages/qgxiangqing/qgxiangqing.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // entertype为0，从首页进入
    // entertype为1，从我的页面进入
    entertype: 0,
    type: 1, //进行中
    type: 2, //匹配中
    type: 3, //已完成
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  post: function() {
    wx.navigateTo({
      url: '../post/post',
    })
  }

})