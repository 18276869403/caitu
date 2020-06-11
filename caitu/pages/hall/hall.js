// pages/hall/hall.js
//获取应用实例
const app = getApp()
const qingqiu = require('../../utils/request.js')
const api = require('../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    viewUrl:api.viewUrl,
    navid1: 2,
    index: 0,
    colour: 0,
    thickness: 0,
    width: 0,
    array: ['品名', '镀锌彩涂卷', '镀锌板彩板彩涂卷', '板彩涂卷'],
    yanse: ['颜色', '阔叶绿','帝王白','乳白','银灰色','白灰','象牙','银色','瓷蓝','雪白','白银灰','骨白','深天蓝','宝钢蓝','深豆绿','砖红','海蓝','其他'],
    houdu: ['厚度', '100-500', '500-999'],
    kuandu: ['宽度', '0-100', '100-500'],
    nav: [{
        id: 1,
        name: '求购',
      },
      {
        id: 2,
        name: '尾货',
      },
      {
        id: 3,
        name: '拼购',
      }
    ],
    kucun:[],
    pingou:[],
    qiugou:[]
  },
  bindnav: function(e) {
    // debugger
    var navid = e.currentTarget.dataset.id
    console.log(navid)
    this.setData({
      navid1: navid
    })
  },
  bindPickerChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
    })
  },
  bindPickerColour: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      colour: e.detail.value,
    })
  },
  bindPickerThickness: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      thickness: e.detail.value,
    })
  },
  bindPickerWidth: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      width: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.selectqiugou()
    this.selectweihuo()
    this.selectpingou()
  },
  // 获取求购
  selectqiugou(){
    var that = this
    var data = {
      pageNo:1,
      pageSize:10
    }
    qingqiu.get('askToBuyLists',data,function(res){
      if(res.success == true){
        if (res.result != null) {
          that.data.qiugou=res.result.records
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
            if(that.data.qiugou[i].createtime!=''&&that.data.qiugou[i].createtime!=null ){
              that.data.qiugou[i].createtime=that.data.qiugou[i].createtime.split(' ')[0]
            }
          }
          console.log(that.data.qiugou)
          that.setData({
            qiugou:that.data.qiugou
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
  // 获取尾货
  selectweihuo(){
    var that = this
    var data = {
      pageNo:1,
      pageSize:10
    }
    qingqiu.get('inventoryLists',data,function(res){
      if(res.success == true){
        if (res.result != null) {
          that.data.kucun=res.result.records
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
            that.data.kucun[i].upUrl=that.data.kucun[i].upUrl.split(',')
          }
          console.log(that.data.kucun)
          that.setData({
            kucun:that.data.kucun
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
  // 获取拼购
  selectpingou(){
    var that = this
    var data = {
      pageNo:1,
      pageSize:10
    }
    qingqiu.get('groupByingLists',data,function(res){
      if(res.success == true){
        if (res.result != null) {
          that.data.pingou=res.result.records
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
            if(that.data.pingou[i].createtime!=''&& that.data.pingou[i].createtime!=null ){
              that.data.pingou[i].createtime=that.data.pingou[i].createtime.split(' ')[0]
            }
            if(that.data.pingou[i].deadline!=''&& that.data.pingou[i].deadline!=null ){
              that.data.pingou[i].deadline=that.data.pingou[i].deadline.split(' ')[0]
            }
            if(that.data.pingou[i].upUrl!=''&& that.data.pingou[i].upUrl!=null ){
              that.data.pingou[i].upUrl=that.data.pingou[i].upUrl.split(',')
            }
          }
          console.log(that.data.pingou)
          that.setData({
            pingou:that.data.pingou
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
  onShow(){
    this.setData({
      navid1: app.globalData.dtid
    })
  },
  // 跳转到求购详情
  qiugouDetails: function(e) {
    var obj=e.currentTarget.dataset.item
    var qiugou = JSON.stringify(obj);
    wx.navigateTo({
      url: '../qiugouDetails/qiugouDetails?obj='+qiugou,
    })
  },
  // 跳转到拼购详情页面
  pingouDetails: function(e) {
    var obj=e.currentTarget.dataset.item
    var pingou = JSON.stringify(obj);
    wx.navigateTo({
      url: '../pingouDetails/pingouDetails?obj='+pingou,
    })
  },
  // 跳转到尾货详情页面
  weihuoDetails: function (e) {
    var obj=e.currentTarget.dataset.item
    var weihuo = JSON.stringify(obj);
    wx.navigateTo({
      url: '../weihuoDetails/weihuoDetails?obj='+weihuo,
    })
  }

})