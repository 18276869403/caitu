// pages/mykucun/mykucun.js
const app = getApp()
const qingqiu = require('../../utils/request.js')
const api = require('../../utils/config.js')
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
    kucun: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var nav = this.data.nav
    if(options.type == 2){
      this.setData({
        navid1:3,
      })
      this.mykucun(nav[2].type)
    }else if(options.type == 0){
      this.setData({
        navid1:1
      })
      this.mykucun(nav[0].type)
    }else if(options.type == 1){
      this.setData({
        navid1:2
      })
      this.mykucun(nav[1].type)
    }else{
      this.setData({
        navid1:1
      })
      this.mykucun(nav[0].type)
    }
  },

  // 我的库存判断
  mykucun(type){
    var that = this
    var data = {
      id:app.globalData.wxid,
      putaway:type[0],
      strState:type[1]
    }
    qingqiu.get("inventoryList",data,function(res){
      console.log(res)
      if(res.success == true){
        var imgUrl = []
        for(let obj of res.result.records){
          if(obj.upUrl.indexOf(',')!=1){
            obj.upUrl = api.viewUrl + obj.upUrl.split(',')[0]
          }else{
            obj.upUrl = api.viewUrl + ob.upUrl
          }
        }
        that.setData({
          kucun:res.result.records,
          imgUrl:imgUrl
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
    var nav = this.data.nav
    console.log(navid)
    if(navid == 1){
      this.setData({
        navid1: navid
      })
      this.mykucun(nav[0].type)
    }else if(navid == 2){
      this.setData({
        navid1: navid
      })
      this.mykucun(nav[1].type)
    }else{
      this.setData({
        navid1: navid
      })
      this.mykucun(nav[2].type)
    }
  },
  // 下架
  bindxiajia: function(e) {
    var that = this
    var id = e.currentTarget.dataset.id
    console.log(id)
    var data = {
      invenId:id
    }
    qingqiu.get("updateXiaInvent",data,function(res){
      if(res.success == true){
        that.setData({
          shang: false,
          navid1:3
        })
        setTimeout(function() {
          that.setData({
            shang: true
          })
          that.mykucun(that.data.nav[that.data.navid1 - 1].type)
        }, 1000)
      }else{
        wx.showToast({
          title: res.message,
          icon:'none',
          duration:1000
        })
      }
    },'put')
  },
  // 上架
  bindshangjia: function(e) {
    var that = this
    var id = e.currentTarget.dataset.id
    console.log(id)
    var data = {
      invenId:id
    }
    qingqiu.get("updateShangInvent",data,function(res){
      if(res.success == true){
        that.setData({
          shang: false,
        })
        setTimeout(function() {
          that.setData({
            shang: true,
            navid1:1
          })
          that.mykucun(that.data.nav[that.data.navid1 - 1].type)
        }, 1000)
      }else{
        wx.showToast({
          title: res.message,
          icon:'none',
          duration:1000
        })
      }
    },'put')
  },
  // 删除按钮
  bindshanchu:function(e){
    var that = this
    var id = e.currentTarget.dataset.id
    var data = {
      invenId:id
    }
    qingqiu.get("deleteInvent",data,function(res){
      if(res.success == true){
        wx.showToast({
          title: '删除成功',
          icon:'none',
          duration:1000
        })
        setTimeout(() => {
          that.mykucun(that.data.nav[that.data.navid1 - 1].type)
        }, 1000);
      }else{
        wx.showToast({
          title: res.message,
          icon:'none',
          duration:1000
        })
      }
    },'delete')
  },

  // 待审核 跳到尾货详情页面
  weihuoDetails: function() {
    debugger
    wx.navigateTo({
      url: '../weihuoDetails/weihuoDetails',
    })
  },
  // 已上架状态 跳转到尾货详情页面
  weihuoDetailsDun: function(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../weihuoDetailsDun/weihuoDetailsDun?obj=' + id,
    })
  },
  // 未上架，跳转到库存详情页面
  kucunDetails: function(e) {
    var obj = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../kucunDetails/kucunDetails?obj=' + obj,
    })
  }
})