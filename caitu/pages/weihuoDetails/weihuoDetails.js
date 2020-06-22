// pages/weihuoDetails/weihuoDetails.js
//获取应用实例
const app = getApp()
const qingqiu = require('../../utils/request.js')
const api = require('../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    viewUrl:api.viewUrl,
    // entertype为0，从首页进入，为1，从我的页面进入
    entertype:1,
    type: 1, //进行中
    // type: 2, //匹配中
    // type: 3, //已完成
    whtulist:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var whxx=JSON.parse(options.obj)
    this.data.whtulist=whxx.upUrl
    this.setData({
      whxx:whxx,
      whtulist:this.data.whtulist
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})