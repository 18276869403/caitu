// pages/zixunMore/zixunMore.js
//获取应用实例
const app = getApp()
const qingqiu = require('../../utils/request.js')
const api = require('../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zixunList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getzixun()
  },
// 获取最新资讯
getzixun(){
  var that = this
  var data = {
    pageNo:1,
    pageSize:10
  }
  qingqiu.get('initInformation',data,function(res){
    console.log(res)
    if(res.success == true){
      if (res.result != null) {
        that.data.zixunList=res.result.records
        for(var i=0;i<res.result.records.length;i++){
          that.data.zixunList[i].createTime=that.data.zixunList[i].createTime.split(' ')[0]
          that.data.zixunList[i].upUrl=api.baseUrl+api.viewUrl+that.data.zixunList[i].upUrl
        }
        console.log(that.data.zixunList)
        that.setData({
          zixunList:that.data.zixunList
        })
      }else {
        wx.showToast({
          title: '暂无数据！',
          icon:'none',
          duration:2000
        })
      }
    }
  })
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})