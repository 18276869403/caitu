// pages/hall/hall.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navid1: 2,
    index: 0,
    colour: 0,
    thickness: 0,
    width: 0,
    array: ['品名', '镀锌彩涂卷', '镀锌板彩板彩涂卷', '板彩涂卷'],
    yanse: ['颜色', '标准', '非标'],
    houdu: ['厚度', '100-500', '500-999'],
    kuandu: ['宽度', '0-100', '100-500'],
    nav: [{
        id: 1,
        name: '求购',
      },
      {
        id: 2,
        name: '尾货',
      },
      {
        id: 3,
        name: '拼购',
      }
    ],
    kucun:[],
    qiugou:[],
    kucun: [{
        id: 1,
        name: "镀锌板彩涂卷",
        bianhao: 'hz10001',
        guige: "厚0.5/宽1100",
        yanse: "非标",
        xinceng: "10000000000000000000000000000000",
        didian: "浙江/杭州",
        url: '../image/top.png'
      },
      {
        id: 2,
        name: "镀锌板彩涂卷",
        bianhao: 'hz10001',
        guige: "厚0.5/宽1100",
        yanse: "非标",
        xinceng: "1000",
        didian: "浙江/杭州",
        url: '../image/top.png'
      }
    ],
    qiugou: [{
        id: 1,
        name: "镀锌板彩涂卷",
        bianhao: 'hz10001',
        guige: "厚0.5/宽1100",
        xinceng: "10000000000000000000000000000000",
        yanse: "非标",
        jiezhi: "2020.5.21",
        didian: "浙江/杭州",
        shijian: "2020.01.20",
        type: 1
      },
      {
        id: 2,
        name: "镀锌板彩涂卷",
        bianhao: "hz20002",
        guige: "厚0.5/宽1100",
        xinceng: "100",
        yanse: "非标",
        jiezhi: "2020.5.21",
        didian: "浙江/杭州",
        shijian: "2020.01.20",
        type: 2
      }
    ],
  },
  bindnav: function(e) {
    // debugger
    var navid = e.currentTarget.dataset.id
    console.log(navid)
    this.setData({
      navid1: navid
    })
  },
  bindPickerChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
    })
  },
  bindPickerColour: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      colour: e.detail.value,
    })
  },
  bindPickerThickness: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      thickness: e.detail.value,
    })
  },
  bindPickerWidth: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      width: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
  },
  onShow(){
    this.setData({
      navid1: app.globalData.dtid
    })
  },
  // 跳转到求购详情
  qiugouDetails: function() {
    wx.navigateTo({
      url: '../qiugouDetails/qiugouDetails',
    })
  },
  // 跳转到拼购详情页面
  pingouDetails: function() {
    wx.navigateTo({
      url: '../pingouDetails/pingouDetails',
    })
  },
  // 跳转到尾货详情页面
  weihuoDetails: function () {
    wx.navigateTo({
      url: '../weihuoDetails/weihuoDetails',
    })
  }

})