// pages/qiugou/qiugou.js
const app = getApp()
const qingqiu = require('../../utils/request.js')
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
    this.getpingou()
  },
  // 我的求购
  getpingou:function(){
    var that = this
    var data = {
      id:app.globalData.wxid
    }
    console.log(data)
    qingqiu.get("askToBuyList",data,function(res){
      console.log(res)
      if(res.success == true){
        for(let obj of res.result.records){
          var str = obj.id.toString()
          if(str.length < 10){
            var str1 = ''
            for(let i=0;i<10-str.length;i++){
              str1 += 0
            }
            obj.id = str1 + str
          }
        }
        that.setData({
          qiugou:res.result.records
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
  qiugouDetails:function(){
    wx.navigateTo({
      url: '../qiugouDetails/qiugouDetails',
    })
  }
})