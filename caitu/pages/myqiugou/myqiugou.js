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
        that.data.qiugou=res.result.records
        for(let obj of res.result.records){
          var str = obj.id.toString()
          if(str.length < 10){
            var str1 = ''
            for(let i=0;i<10-str.length;i++){
              str1 += 0
            }
            obj.backup1 = str1 + str
          }
          for(var i=0;i<res.result.records.length;i++){
            if(that.data.qiugou[i].createtime!=''&&that.data.qiugou[i].createtime!=null){
              that.data.qiugou[i].createtime=that.data.qiugou[i].createtime.split(' ')[0]
            }
          }
        }
        console.log(that.data.qiugou)
        that.setData({
          qiugou:that.data.qiugou
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