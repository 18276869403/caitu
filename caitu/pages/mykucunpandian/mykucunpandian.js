// pages/mykucun/mykucun.js
const app = getApp()
const qingqiu = require('../../utils/request.js')

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
        type:[0,0]
      },
      {
        id: 2,
        name: '已上架',
        type:[0,1]
      },
      {
        id: 3,
        name: '未上架',
        type:[1,0]
      }
    ],
    kucun: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.mykucun()
  },

  // 我的库存判断
  mykucun(){
    var that = this
    var data = {
      id:app.globalData.wxid
      // putaway
    }
    qingqiu.get("inventoryList",data,function(res){
      console.log(res)
      if(res.success == true){
        that.setData({
          kucun:res.result.records
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

  // // 获取数据
  // getInfo(){
  //   qingqiu.get("inventoryList",data,function(res){
      
  //   })
  // },
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