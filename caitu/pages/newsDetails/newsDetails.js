// pages/newsDetails/newsDetails.js
var wxParse = require('../../wxParse/wxParse.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var shuju = '<img src ="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592544985647&di=ff6125d0ccaf74dfd4b6131bfbf42510&imgtype=0&src=http%3A%2F%2Fcdn.qiancipai.com%2F190305170514872174.jpg"></img><div>新华社北京6月18日电 6 月17日晚， 习近平主席在北京主持中非团结抗疫特别峰会并发表题为《 团结抗疫 共克时艰》 的主旨讲话.</div>';
    wxParse.wxParse('news_Content', 'html', shuju, that, 10);
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