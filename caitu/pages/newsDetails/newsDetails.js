// pages/newsDetails/newsDetails.js
// var wxParse = require('../../wxParse/wxParse.js')
const qingqiu = require('../../utils/request.js')
const api = require('../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    viewUrl:api.viewUrl,
    news:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if(options.obj != undefined){
      var id = JSON.parse(options.obj)
      this.getNewsInfo(id)
    }    
  },

  // 查询资讯详情
  getNewsInfo(id){
    var that = this
    qingqiu.get("initInformation",{informationId:id},function(res){
      console.log(res)
      if(res.success == true){
        for(let obj of res.result.records){
          obj.upUrl = api.viewUrl + obj.upUrl
        }
        that.setData({
          news:res.result.records[0]
        })
      }
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