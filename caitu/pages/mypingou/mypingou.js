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
    piugou:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getpingou()
  },
  // 获取拼购信息
  getpingou(){
    var that = this
    var data = {
      id:app.globalData.wxid,
      pageNo:1,
      pageSize:10
    }
    qingqiu.get('groupByingList',data,function(res){
      console.log(res)
      if(res.success == true){
        if (res.result != null) {
          that.data.piugou=res.result.records
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
            if(that.data.piugou[i].createtime!=''&&that.data.piugou[i].createtime!=null){
              that.data.piugou[i].createtime=that.data.piugou[i].createtime.split(' ')[0]
            }
            if(that.data.piugou[i].deadline!=''&&that.data.piugou[i].deadline!=null){
              that.data.piugou[i].deadline=that.data.piugou[i].deadline.split(' ')[0]
            }
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