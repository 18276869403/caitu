// pages/qgxiangqing/qgxiangqing.js
const app = getApp()
const api = require('../../utils/config.js')
const qingqiu =require('../../utils/request.js')
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
    type: 2, //匹配中
    type: 3, //已完成
    typeState:1,
    qiugou:{},
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
      // 根据id查详情
      this.getDetails(options.id)
    }else{
      if(options.obj != undefined){
        var qiugou = JSON.parse(options.obj)
        console.log(qiugou)
        var type = ''
        if(qiugou.startoks==1){
          type = 0
        }else if(qiugou.startoks==2){
          type = 1
        }else{
          type = 2
        }
        this.setData({
          qiugou:qiugou,
          type:type
        })
      }
    }
    this.setData({
      wxid:app.globalData.wxid
    })
  },

  // 查询详情
  getDetails:function(id){
    var that = this
    qingqiu.get("initAskToBuy",{askId:id},function(res){
      console.log(res)
      if(res.success == true){ 
        var data = res.result.records[0]
        data.id = utils.IdentityNum(data.id.toString())
        var type = ''
        if(data.startoks==1){
          type = 0
        }else if(data.startoks==2){
          type = 1
        }else{
          type = 2
        }
        that.setData({
          qiugou:data,
          type:type
        })
      }
    })
  },
  post: function() {
    var qiugou = this.data.qiugou
    var dataobj={
      id:qiugou.id,
      wxUserId:app.globalData.wxid,
      areaOneId:qiugou.areaOneId,
      areaTwoId:qiugou.areaTwoId,
      steelName:qiugou.steelname,
      thickness:qiugou.thickness,
      width:qiugou.width,
      paint:qiugou.paint,
      front:qiugou.front,
      rear:qiugou.rear,
      coat:qiugou.coat,
      zincLayer:qiugou.zinclayer,
      color:qiugou.color,
      density:qiugou.density,
      tonnage:qiugou.tonnage,
    }
    dataobj.theName = qiugou.itemvalue_dictText
    dataobj.haibaotype = 0
    dataobj = JSON.stringify(dataobj)
    wx.navigateTo({
      url: '../post/post?obj='+dataobj,
    })
  }
})