// pages/mykucun/mykucun.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navid1: 1,
    shang: true,
    nav: [{
        id: 1,
        name: '待审核',
      },
      {
        id: 2,
        name: '已上架',
      },
      {
        id: 3,
        name: '未上架',
      }
    ],
    kucun: [{
        id: 1,
        weight: '12',
        yanse: '标准',
        name: '镀锌板彩涂卷',
        guige: '厚0.6/宽100',
        xinceng: '100',
        cangku: '浙江/杭州'
      },
      {
        id: 2,
        yanse: '标准',
        weight: '12',
        name: '镀锌板彩涂卷',
        guige: '厚0.6/宽100',
        xinceng: '100',
        cangku: '浙江/杭州'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  // 跳转到库存管理页面
  kucunManage: function () {
    wx.navigateTo({
      url: '../kucunManage/kucunManage',
    })
  },
  // 顶部样式切换
  bindnav: function(e) {
    // debugger
    var navid = e.currentTarget.dataset.id
    console.log(navid)
    this.setData({
      navid1: navid
    })
  },
  // 下架

  bindshangjia: function() {
    var that = this
    this.setData({
      shang: false
    })
    setTimeout(function() {
      that.setData({
        shang: true
      })
    }, 1000)
  },
  // 待审核 跳到尾货详情页面
  weihuoDetails: function() {
    wx.navigateTo({
      url: '../weihuoDetails/weihuoDetails',
    })
  },
  // 已上架状态 跳转到尾货详情页面
  weihuoDetailsDun: function() {
    wx.navigateTo({
      url: '../weihuoDetailsDun/weihuoDetailsDun',
    })
  },
  // 未上架，跳转到库存详情页面
  kucunDetails: function() {
    wx.navigateTo({
      url: '../kucunDetails/kucunDetails',
    })
  }
})