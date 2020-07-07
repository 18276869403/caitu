// pages/qqq/qqq.js
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
    username:'',
    phone:'',
    tjname:'',
    gongshi:'',
    imgurl:'',
    bindimg:'',
    type:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type:app.globalData.wxState
    })
    this.getUserInfo()
  },

  //获取个人信息
  getUserInfo:function(){
    var that = this
    var data = {
      id:app.globalData.wxid
    }
    qingqiu.get("my",data,function(res){
      if(res.success == true){
        if(res.result.records[0]!=null){
          var wxUser = res.result.records[0]
          if(wxUser.curl == "" || wxUser.curl == null || wxUser.curl == "null"){
            wxUser.curl = null
          }
          console.log(res)
          that.setData({
            username:wxUser.name,
            phone:wxUser.phone,
            bindimg:wxUser.curl==null?'':that.data.viewUrl + wxUser.curl,
            imgurl:wxUser.curl,
            gongshi:wxUser.cname,
            tjname:wxUser.referrerName=="null"?'':wxUser.referrerName
          })
        }
      }
    })
  },

  // 获取用户姓名
  username:function(e){
    this.setData({
      username:e.detail.value
    })
  },

  // 获取手机号
  phone:function(e){
    this.setData({
      phone:e.detail.value
    })
  },

  // 获取推荐人
  tjname:function(e){
    this.setData({
      tjname:e.detail.value
    })
  },

  // 获取公司名称
  gongshi:function(e){
    this.setData({
      gongshi:e.detail.value
    })
  },

  // 保存
  saveInfo:function(){
    var that = this
    var s = utils.yanzheng(that.data.username + ",请输入姓名|" + that.data.phone + ",请输入手机号|" + that.data.gongshi + ",请输入公司名称|" + that.data.imgurl + ",请上传营业执照")
    if(s != 0){
      wx.showToast({
        title: s,
        icon:'none',
        duration:1000
      })
      return
    }
    if(that.data.phone.length != 11){
      wx.showToast({
        title: '请输入11位手机号',
        icon:'none',
        duration:1000
      })
      return
    }
    if(that.data.imgurl==''){
      wx.showToast({
        title: '请上传营业执照！',
        icon:'none',
        duration:1000
      })
      return
    }
    var data = {
      id:app.globalData.wxid,
      name:that.data.username,
      phone:that.data.phone,
      referrerName:that.data.tjname,
      CName:that.data.gongshi,
      CUrl:that.data.imgurl
    }
    console.log(data)
    qingqiu.get("modifyMy",data,function(res){
      console.log(res)
      if(res.success == true){
        wx.showToast({
          title: '保持成功',
          icon:'none',
          duration:2000
        })
      }else{
        wx.showToast({
          title: res.message,
          icon:'none',
          duration:2000
        })
      }
    },'put')
  },

  // 图片上传
  tupian:function(){
    var that = this
    wx.chooseImage({
      count:1,
      sizeType:['compressed'],
      sourceType:['album', 'camera'],
      success:function(res){
        console.log(res)
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths[0])
        wx.uploadFile({
          url: api.upload,
          filePath: tempFilePaths[0],
          header: {
            "Content-Type": "multipart/form-data"
          },
          formData: {
            method: 'POST' //请求方式
          },
          name: 'file',
          success:function(res){
            if(res.statusCode == 200){
              console.log(res)
              var data = JSON.parse(res.data)
              that.setData({
                bindimg:that.data.viewUrl + data.message,
                imgurl:data.message
              })
            }else{
              wx.showToast({
                title: res.errMsg,
                icon:'none',
                duration:1000
              })
            }
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})