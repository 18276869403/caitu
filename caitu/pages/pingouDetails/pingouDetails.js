// pages/pingouDetails/pingouDetails.js
//获取应用实例
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
    // entertype为0，从首页进入
    // entertype为1，从我的页面进入
    entertype: 0,
    type: 1, //进行中
    // type:2,//匹配中
    // type:3,//已完成
    typeState:1, //是否是首页进入
    pgid:'',
    pgxxlist:[],
    pgxx:{},
    wxid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if(options.type != undefined){
      this.setData({
        typeState:options.type
      }) 
    }
    if(options.id != undefined){
      this.getDetails(options.id)
    }else{
      var pgxx=JSON.parse(options.obj)
      console.log(pgxx)
      this.data.pgid=pgxx.id
      this.setData({
        pgxx:pgxx
      })
      this.selectpingouxx()
    }
    this.setData({ wxid:app.globalData.wxid })
  },

  // 获取详情
  getDetails(id){
    var that = this
    qingqiu.get("initGroupBuying",{askId:id},function(res){
      console.log(res)
      if(res.success == true){
        var data = res.result.records[0]
        data.backup1 = utils.IdentityNum(data.id.toString())
        that.setData({
          pgxx:data
        })
      }
    })
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
    if(app.globalData.wxState == 0){
      this.setData({
        showModalStatus1:true
      })
      return
    }
    var shuju=e.currentTarget.dataset.shuju
    var shuju1 = JSON.stringify(shuju);
    var pgid = this.data.pgid
    var pgxxlist = this.data.pgxxlist
    for(let obj of pgxxlist){
      if(obj.wxUserId == app.globalData.wxid){
        wx.showToast({
          title: '你已参入该拼购，不能重复参与',
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
  post: function(e) {
    var pingou = e.currentTarget.dataset.item
    var dataobj={
      id:pingou.id,
      wxUserId:app.globalData.wxid,
      areaOneId:pingou.areaOneId,
      areaTwoId:pingou.areaTwoId,
      steelName:pingou.steelname,
      thickness:pingou.thickness,
      width:pingou.width,
      paint:pingou.paint,
      front:pingou.front,
      rear:pingou.rear,
      coat:pingou.coat,
      zincLayer:pingou.zinclayer,
      color:pingou.color,
      density:pingou.density,
      tonnage:pingou.tonnage,
    }
    dataobj.theName = pingou.itemvalue_dictText
    dataobj.haibaotype = 1
    dataobj = JSON.stringify(dataobj)
    wx.navigateTo({
      url: '../post/post?obj='+dataobj,
    })
  },
  // 跳转到成功页面
  submitSuccess:function(e){
    var that = this
    var item = e.currentTarget.dataset.item
    var data = {
      matchingId:item.id
    }
    qingqiu.get("findPiPei",data,function(res){
      console.log(res)
      if(res.success == true){
        var item = res.result.records
        var obj = JSON.stringify(item)
        console.log(dataobj)
        var dataobj={
          wxUserId:app.globalData.wxid,
          areaOneId:item.areaOneId,
          areaTwoId:item.areaTwoId,
          steelName:item.steelname,
          thickness:item.thickness,
          width:item.width,
          paint:item.paint,
          front:item.front,
          rear:item.rear,
          coat:item.coat,
          zincLayer:item.zinclayer,
          color:item.color,
          density:item.density,
          tonnage:item.tonnage,
        }
        dataobj.theName = item.itemvalue_dictText
        dataobj = JSON.stringify(dataobj)
        app.globalData.haibaitype = 0
        wx.navigateTo({
          url: '../submitSuccess/submitSuccess?obj=' + obj+"&dataobj="+dataobj+"&objtype="+'1',
        })
      }else{
        wx.showToast({
          title: res.message,
          icon:'none',
          duration:2000
        })
      }
    })
  },
  // 跳转到认证信息页面
  renzhengInfo: function() {
    this.hideModal1()
    wx.navigateTo({
      url: '../renzhengInfo/renzhengInfo',
    })
  },
  //弹窗关闭
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