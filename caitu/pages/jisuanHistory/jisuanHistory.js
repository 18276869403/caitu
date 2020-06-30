// pages/jisuanHistory/jisuanHistory.js
//获取应用实例
const app = getApp()
var qingqiu = require('../../utils/request.js')
var api = require('../../utils/config.js')
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
    ],
    jisuans:[],
    pageNo:1,
    isLastPage:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getjisuanLS()
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    this.data.isLastPage=false
    this.data.pageNo=1
    this.data.jisuans=[]
    this.onLoad()
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000);
  },
  //上拉功能
  onReachBottom(){
    if(this.data.isLastPage){
      wx.showToast({
        title: '没有更多了！',
        icon:'none',
        duration:2000
      })
      return
    }
    this.setData({pageNo:this.data.pageNo+1})
    this.getjisuanLS()
  },
  //获取计算历史
  getjisuanLS(){
    var that = this
    var data = {
      id:app.globalData.wxid,
      pageNo:that.data.pageNo,
      pageSize:10
    }
    qingqiu.get('calculateList',data,function(res){
      if(res.success == true){
        if (res.result != null) {
          if(res.result.records=='')
          {
            that.data.isLastPage=true
          }
          // that.data.jisuans=res.result.records
          for(var i=0;i<res.result.records.length;i++){
            res.result.records[i].createTime=res.result.records[i].createTime.split(' ')[0]
            that.data.jisuans.push(res.result.records[i])
          }
          console.log(that.data.jisuans)
          that.setData({
            jisuans:that.data.jisuans
          })
        }else {
          wx.showToast({
            title: '暂无数据！',
            icon:'none',
            duration:2000
          })
        }
      }
    })
  },
  // 跳转到计算结果
  calculatorResult: function(e) {
    var obj =e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../calculatorResult/calculatorResult?obj=' + obj 
    })
  }
})