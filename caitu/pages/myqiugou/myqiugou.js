// pages/qiugou/qiugou.js
const app = getApp()
const qingqiu = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qiugou:[],
    isLastPage:false,
    pageNo:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getqiugou()
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    this.data.isLastPage=false
    this.data.pageNo=1
    this.data.qiugou=[]
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
    this.getqiugou()
  },
  // 我的求购
  getqiugou:function(){
    var that = this
    var data = {
      id:app.globalData.wxid,
      pageNo:that.data.pageNo,
      pageSize:10
    }
    qingqiu.get("askToBuyList",data,function(res){
      if(res.success == true){
        if(res.result.records==''){
          that.data.isLastPage=true
        }
        // that.data.qiugou=res.result.records
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
            that.data.qiugou.push(res.result.records[i])
        }
        console.log(that.data.qiugou)
        that.setData({
          qiugou:that.data.qiugou
        })
      }else{
        wx.showToast({
          title: res.message,
          icon:'none',
          duration:1000
        })
      }
    })
  },
// 跳转到求购详情页面
  qiugouDetails:function(e){
    var obj = JSON.stringify(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '../qiugouDetails/qiugouDetails?obj='+obj+"&objtype="+'1',
    })
  }
})