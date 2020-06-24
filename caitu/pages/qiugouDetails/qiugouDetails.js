// pages/qgxiangqing/qgxiangqing.js
const app = getApp()
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
    qiugou:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if(options.obj != undefined){
      var qiugou = JSON.parse(options.obj)
      console.log(qiugou)
      var type = ''
      if(qiugou.startoks==1){
        type = 0
      }else if(qiugou.startoks==2){
        type = 1
      }else{
        type = 2
      }
      this.setData({
        qiugou:qiugou,
        type:type
      })
    }
  },
  post: function() {
    var qiugou = this.data.qiugou
    var dataobj={
      wxUserId:app.globalData.wxid,
      areaOneId:qiugou.areaOneId,
      areaTwoId:qiugou.areaTwoId,
      steelName:qiugou.steelname,
      thickness:qiugou.thickness,
      width:qiugou.width,
      paint:qiugou.paint,
      front:qiugou.front,
      rear:qiugou.rear,
      coat:qiugou.coat,
      zincLayer:qiugou.zinclayer,
      color:qiugou.color,
      density:qiugou.density,
      tonnage:qiugou.tonnage,
    }
    dataobj.theName = qiugou.itemvalue_dictText
    dataobj = JSON.stringify(dataobj)
    wx.navigateTo({
      url: '../post/post?obj='+dataobj,
    })
  }
})