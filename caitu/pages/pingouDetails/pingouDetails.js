// pages/pingouDetails/pingouDetails.js
//获取应用实例
const app = getApp()
const qingqiu = require('../../utils/request.js')
const api = require('../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // entertype为0，从首页进入
    // entertype为1，从我的页面进入
    entertype: 0,
    type: 1, //进行中
    // type:2,//匹配中
    // type:3,//已完成
    pgid:'',
    pgxxlist:[],
    pgxx:{},
    wxid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var pgxx=JSON.parse(options.obj)
    this.data.pgid=pgxx.id
    this.setData({
      pgxx:pgxx,
      wxid:app.globalData.wxid
    })
    this.selectpingouxx()
  },
  // 获取参与拼购信息
  selectpingouxx(){
    var that = this
    var data = {
      gbId:that.data.pgid
    }
  qingqiu.get('groupBuyingCanYuZhu',data,function(res){
    console.log(res)
    if(res.success == true){
      if (res.result != null) {
        // for(var i=0;i<res.result.records.length;i++){
        //   that.data.pgxxlist[i].createtime=that.data.pgxxlist[i].createtime.split(' ')[0]
        // }
        that.setData({
          pgxxlist:res.result.records
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
  // 参与拼购
  joinPingou: function(e) {
    var shuju=e.currentTarget.dataset.shuju
    var shuju1 = JSON.stringify(shuju);
    var pgid = this.data.pgid
    var pgxxlist = this.data.pgxxlist
    for(let obj of pgxxlist){
      if(obj.wxUserId == app.globalData.wxid){
        wx.showToast({
          title: '你已参入改拼购，不能重复参与',
          icon:'none',
          duration:2000
        })
        return
      }
    }
    wx.navigateTo({
      url: '../joinPingou/joinPingou?shuju=' + shuju1,
    })
  },
  // 跳转海报页面
  post: function() {
    wx.navigateTo({
      url: '../post/post',
    })
  },
  // 跳转到成功页面
  submitSuccess:function(){
    wx.navigateTo({
      url: '../submitSuccess/submitSuccess',
    })
  }
})