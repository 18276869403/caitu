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
    // entertype:1,
    type: 1, //进行中
    // type: 2, //匹配中
    // type: 3, //已完成
    imglist:[],
    items:{},
    wxid:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if(options.id != undefined){
      this.getDetails(options.id)
    }
    this.setData({
      wxid:app.globalData.wxid
    })
  },

  getDetails:function(id){
    var that = this 
    var imglist = []
    qingqiu.get("selectInventById",{invenId:id},function(res){
      console.log(res)
      if(res.success == true){
        if(res.result[0].upUrl.indexOf(',') != -1){
          imglist = res.result[0].upUrl.split(',')
        }else{
          imglist.push(res.result[0].upUrl)
        }
        that.setData({
          items:res.result[0],
          imglist:imglist
        })
      }else{
        wx.showToast({
          title: res.message,
          icon:'none',
          duration:2000
        })
        return
      }
    })
  },

  // 图片预览
  imageTop:function(e){
    var current = e.currentTarget.dataset.url
    wx.previewImage({
      current:current,
      urls: [current],
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