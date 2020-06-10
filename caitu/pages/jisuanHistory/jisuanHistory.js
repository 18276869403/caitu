// pages/jisuanHistory/jisuanHistory.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jisuan: [{
        id: 1,
        user: '镀锌板彩涂卷',
        users: '',
        name: '上海宝钢',
        price: '300',
        time: '2020.05.02'
      },
      {
        id: 2,
        user: '三级抗震盘螺',
        users: 'HRB400E 8',
        name: '上海宝钢',
        price: '300',
        time: '2020.05.02'
      },
      {
        id: 3,
        user: '镀锌板彩涂卷',
        users: '',
        name: '上海宝钢',
        price: '300',
        time: '2020.05.02'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getInfo()
  },
  getInfo(){

  },
  calculatorResult: function() {
    wx.navigateTo({
      url: '../calculatorResult/calculatorResult',
    })
  }

})