// pages/submitSuccess/submitSuccess.js
const app = getApp()
const qingqiu = require('../../utils/request.js')
const api = require('../../utils/config.js')
const utils = require('../../utils/util.js')
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
    dataobj:{},
    dunwei:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if(options.askId!=undefined){
      var askId1=JSON.parse(options.askId)
      this.setData({
        askId1:askId1
      })
    }
    if(options.dunwei!=undefined){
      var dunwei = JSON.parse(options.dunwei)
      this.setData({
        dunwei:dunwei
      })
    }
    if(options.dataobj != undefined){
      var dataobj = JSON.parse(options.dataobj)
      this.setData({
        dataobj:dataobj
      })
    }
    if(options.objtype != undefined){
      var type = JSON.parse(options.objtype)
      this.setData({
        type:type
      })
      if(type=='3'){
        wx.setNavigationBarTitle({
          title: '选择匹配'
        })
      }
    }else{
      this.setData({
        type:0
      })
    }
    if(options.obj != undefined){
      var pipeilist = JSON.parse(options.obj)
      var askId=pipeilist[0].askId
      console.log(pipeilist)
      for(let obj of pipeilist){
        var str = obj.id
        if(str.toString().length < 10){
          obj.backup1 = utils.IdentityNum(str.toString())
        }
        if(obj.upUrl.indexOf(',') != -1){
          obj.upUrl=obj.upUrl.split(',')[0]
        }
      }
      this.setData({
        pipeilist:pipeilist,
        askId:askId
      })
    }
  },
  // 海报页面
  post: function() {
    var dataobj = JSON.stringify(this.data.dataobj)
    // var dataobj=dataobj==''?this.data.dunwei:dataobj
    wx.navigateTo({
      url: '../post/post?obj='+dataobj+'&dunwei='+this.data.dunwei,
    })
  },
  // 发起匹配
  faqipipei(e){
    var that = this
    
    var weihuoid=e.currentTarget.dataset.weihouid
    if(that.data.askId1!=''&&that.data.askId1!=null&&that.data.askId1!=undefined){
      that.data.askId=that.data.askId1
    }
    var data={
      askId:that.data.askId,
      inventId:weihuoid,
      wxId:app.globalData.wxid
    }
    if(that.data.type=='0'){
      qingqiu.get('QiufaQiPiPei',data,function(res){
        console.log(res)
        if(res.success == true){
          that.showModel()
        }else
        {
          return
        }
      },'post') 
    }else{
    qingqiu.get('PinfaQiPiPei',data,function(res){
      console.log(res)
      if(res.success == true){
        that.showModel()
      }else
      {
        return
      }
    },'post') 
  }
  },
  // 服务规则页面显示
  showModel(){
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