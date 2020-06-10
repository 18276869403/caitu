// pages/qiugou/qiugou.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qiugou:[
      {
        id:1,
        bianhao:'hz10001',
        guige:"厚0.5/宽11000000000000",
        xinceng:"100",
        didian:"浙江/杭州",
        shijian:"2020.01.20",
        type:1
      },
      {
        id:2,
        bianhao:"hz20002",
        guige:"厚0.5/宽1100",
        xinceng:"100",
        didian:"浙江/杭州",
        shijian:"2020.01.20",
        type:2
      },
      {
        id:3,
        bianhao:"hz20002",
        guige:"厚0.5/宽1100",
        xinceng:"100",
        didian:"浙江/杭州",
        shijian:"2020.01.20",
        type:3
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
// 跳转到求购详情页面
  qiugouDetails:function(){
    wx.navigateTo({
      url: '../qiugouDetails/qiugouDetails',
    })
  }
})