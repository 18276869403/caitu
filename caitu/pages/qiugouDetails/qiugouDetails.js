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
    qiugou:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var qiugou = JSON.parse(options.obj)
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
  },
  post: function() {
    wx.navigateTo({
      url: '../post/post',
    })
  }
})