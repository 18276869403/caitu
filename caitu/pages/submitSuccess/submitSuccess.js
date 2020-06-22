// pages/submitSuccess/submitSuccess.js
const app = getApp()
const qingqiu = require('../../utils/request.js')
const api = require('../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    viewUrl:api.viewUrl,
    // 求购发布成功
    type: 0,
    // 拼购发布成功
    // type: 1,
    weihouid:'',
    weihuoList: [],
    pipeilist:[],
    haibaotype:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.obj)
    if(pipeilist != undefined){
      var pipeilist = JSON.parse(options.obj)
      this.data.weihuoList=pipeilist
      this.data.weihouid=pipeilist.id
      for(let obj of pipeilist){
        var str = obj.id.toString()
        if(str.length < 10){
          var str1 = ''
          for(let i=0;i<10-str.length;i++){
            str1 += 0
          }
          obj.backup1 = str1 + str
        }
      }
      for(var i=0;i<pipeilist.length;i++){
        pipeilist[i].upUrl=pipeilist[i].upUrl.split(',')[0]
      }
      this.setData({
        pipeilist:pipeilist,
        haibaitype:app.globalData.haibaitype
      })
    }else{
      console.log(app.globalData.haibaitype)
      this.setData({
        haibaitype:app.globalData.haibaitype
      })
    }
  },
  // 海报页面
  post: function() {
    wx.navigateTo({
      url: '../post/post',
    })
  },
  // 发起匹配
  faqipipei(e){
    var weihuoid=e.currentTarget.dataset.weihouid
    var data={
      inventId:weihuoid,
      wxId:app.globalData.wxid
    }
    qingqiu.get('PinfaQiPiPei',data,function(res){
      console.log(res)
      if(res.success == true){
        
      }else
      {
        return
      }
    },'post') 
    this.showModel()
  },
  // 服务规则页面显示
  showModel(){
    debugger
    this.setData({
      hasMask: true
    })
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation

    animation.opacity(0).rotateX(-100).step();
    this.setData({
      animationData: animation.export(),
      showModalStatus1: true
    })
    setTimeout(function() {
      animation.opacity(1).rotateX(0).step();
      this.setData({
        animationData: animation.export()
      })
      this.hideModal1()
    }.bind(this), 1000)
  },
  //服务规则页面关闭
  hideModal1: function() {
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    // flag = 0;
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      hasMask: false
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus1: false
      })
    }.bind(this), 200)
  },


})