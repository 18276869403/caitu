// pages/qiugou/qiugou.js
const app = getApp()
const qingqiu = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qiugou:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getpingou()
  },
  // 我的求购
  getpingou:function(){
    var that = this
    var data = {
      id:app.globalData.wxid
    }
    qingqiu.get("askToBuyList",data,function(res){
      if(res.success == true){
        for(let obj of res.result.records){
          var str = obj.id.toString()
          if(str.length < 10){
            var str1 = ''
            for(let i=0;i<10-str.length;i++){
              str1 += 0
            }
            obj.backup1 = str1 + str
          }
        }
        console.log(res.result.records)
        that.setData({
          qiugou:res.result.records
        })
      }else{
        wx.showToast({
          title: res.message,
          icon:'none',
          duration:1000
        })
      }
    })
  },
// 跳转到求购详情页面
  qiugouDetails:function(e){
    var obj = JSON.stringify(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '../qiugouDetails/qiugouDetails?obj='+obj,
    })
  }
})