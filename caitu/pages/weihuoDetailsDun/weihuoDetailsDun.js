// pages/weihuoDetails/weihuoDetails.js
const app = getApp()
const api = require('../../utils/config.js')
const qingqiu = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    viewUrl:api.viewUrl,
    cangkuindex: 0,
    region: ['广东省', '广州市', '海珠区'],
    gangchangindex: 0,
    gangchangarray: ['上海宝钢', '上海宝钢1', '上海宝钢2', '上海宝钢3'],
    caituindex: 0,
    caituarray: ['镀铝锌', '镀铝锌1', '镀铝锌2', '镀铝锌3'],
    youqiindex: 0,
    youqiarray: ['PE', 'PE1', 'PE2', 'PE3'],
    zhengmianindex: 0,
    zhengmianarray: ['正面25μ', '正面25μ1', '正面25μ2', '正面25μ3'],
    beimianindex: 0,
    beimianarray: ['选择膜厚', '选择膜厚1', '选择膜厚2', '选择膜厚3'],
    xincengindex: 0,
    xincengarray: ['100', '1001', '1002', '1003'],
    yanseindex: 0,
    yansearray: ['标准', '标准1', '标准2', '标准3'],
    qiangduindex: 0,
    qiangduarray: ['TS250GD+AZ', 'TS250GD+AZ1', 'TS250GD+AZ11', 'TS250GD+AZ111'],
    items:{},
    imglist:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id != undefined){
      var id = options.id
      this.getweihuo(id)
    }
  },

  // 根据id获取库存详情
  getweihuo(id){
    var that = this
    var data = {
      invenId:id
    }
    var imglist = []
    qingqiu.get("selectInventById",data,function(res){
      console.log(res)
      if(res.success == true){
          if(res.result[0].upUrl.indexOf(',') != -1){
            res.result[0].upUrl = res.result[0].upUrl.split(',')
            for(let obj of res.result[0].upUrl){
              imglist.push(api.viewUrl + obj)
            }
          }else{
            imglist.push(api.viewUrl + res.result[0].upUrl)
          }
        that.setData({
          items:res.result[0],
          imglist:imglist
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
  
  tonnage:function(e){
    console.log(e.detail.value)
    var tonnage = "items.tonnage"
    this.setData({
      [tonnage]:e.detail.value
    })
  },

  saveInfo:function(){
    var that = this
    var data = {
      id:that.data.items.id,
      tonnage:that.data.items.tonnage
    }
    console.log(data)
    qingqiu.get("updateInventById",data,function(res){
      console.log(res)
      if(res.success == true){
        wx.showToast({
          title: '保存成功',
          icon:'success',
          duration:2000
        })
        setTimeout(function(){
          wx.redirectTo({
            url: '../mykucunpandian/mykucunpandian?type='+2,
          })
        },1000)
      }else{
        wx.showToast({
          title: res.message,
          icon:'none',
          duration:2000
        })
        return
      }
    },'put')
  },

  // 跳转到海报页面
  post:function(){
    var weihuo = this.data.items
    console.log(weihuo)
    var dataobj={
      id:weihuo.id,
      wxUserId:app.globalData.wxid,
      areaOneId:weihuo.areaOneId,
      areaTwoId:weihuo.areaTwoId,
      steelName:weihuo.steelName,
      thickness:weihuo.thickness,
      width:weihuo.width,
      paint:weihuo.paint,
      front:weihuo.front,
      rear:weihuo.rear,
      coat:weihuo.coat,
      zincLayer:weihuo.zinclayer,
      color:weihuo.color,
      density:weihuo.density,
      tonnage:weihuo.tonnage,
    }
    dataobj.theName = weihuo.theNameText
    dataobj.haibaotype = 2
    dataobj = JSON.stringify(dataobj) 
    wx.navigateTo({
      url: '../post/post?obj='+dataobj,
    })
  },
  // 图片预览
  imageTop:function(e){
    var current = e.currentTarget.dataset.url
    wx.previewImage({
      current:current,
      urls: [current],
    })
  }
})