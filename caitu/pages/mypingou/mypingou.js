// pages/mypingou/mypingou.js
//获取应用实例
const app = getApp()
var qingqiu = require('../../utils/request.js')
var api = require('../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // qiugou: [
    //   {
    //     id: 1,
    //     bianhao: 'hz10001',
    //     guige: "厚0.5/宽11000000000000",
    //     xinceng: "100",
    //     didian: "浙江/杭州",
    //     shijian: "2020.01.20",
    //     type: 1
    //   },
    //   {
    //     id: 2,
    //     bianhao: "hz20002",
    //     guige: "厚0.5/宽1100",
    //     xinceng: "100",
    //     didian: "浙江/杭州",
    //     shijian: "2020.01.20",
    //     type: 2
    //   },
    //   {
    //     id: 3,
    //     bianhao: "hz20002",
    //     guige: "厚0.5/宽1100",
    //     xinceng: "100",
    //     didian: "浙江/杭州",
    //     shijian: "2020.01.20",
    //     type: 3
    //   }
    // ],
    piugou:[],
    pageNo:1,
    isLastPage:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getpingou()
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    this.data.isLastPage=false
    this.data.piugou=[]
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
    this.getpingou()
  },
  // 获取拼购信息
  getpingou(){
    var that = this
    var data = {
      id:app.globalData.wxid,
      pageNo:that.data.pageNo,
      pageSize:10
    }
    qingqiu.get('groupByingList',data,function(res){
      console.log(res)
      if(res.success == true){
        if (res.result != null) {
          if(res.result.records==''){
            that.data.isLastPage=true
          }
          // that.data.piugou=res.result.records
          for(let obj of res.result.records){
            var str = obj.id.toString()
            if(str.length < 10){
              var str1 = ''
              for(let i=0;i<10-str.length;i++){
                str1 += 0
              }
              obj.backup1 = str1 + str
            }
          }
          for(var i=0;i<res.result.records.length;i++){
            if(res.result.records[i].createtime!=''&&res.result.records[i].createtime!=null){
              res.result.records[i].createtime=res.result.records[i].createtime.split(' ')[0]
            }
            if(res.result.records[i].deadline!=''&&res.result.records[i].deadline!=null){
              res.result.records[i].deadline=res.result.records[i].deadline.split(' ')[0]
            }
            that.data.piugou.push(res.result.records[i])
          }
          console.log(that.data.piugou)
          that.setData({
            piugou:that.data.piugou
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
  // 跳转到拼购详情页面
  pingouDetails: function (e) {
    var obj =e.currentTarget.dataset.pgxx;
    var pgxx = JSON.stringify(obj);
    wx.navigateTo({
      url: '../pingouDetails/pingouDetails?obj='+pgxx,
    })
  }
})