// pages/kucunManage/kucunManage.js
const app = getApp()
const qingqiu = require('../../utils/request.js')
const api = require('../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cangkuindex: 0,
    multiIndex: [0, 0],
    region: ['省', '市', '区'],
    index:{gangchang:0,pingming:0},
    // multiArray: [['钢厂', '广州宝钢', '上海宝钢', '浙江宝钢'], ['彩涂品名', '镀铝锌卷', '镀铝锌彩涂卷', '镀铝锌']],
    multiArray: [[],[]],
    youqiindex: 0,
    youqiarray: ['选择油漆', 'PE', 'PE1', 'PE2', 'PE3'],
    zhengmianindex: 0,
    zhengmianarray: ['选择正面膜厚', '正面25μ', '正面25μ1', '正面25μ2', '正面25μ3'],
    beimianindex: 0,
    beimianarray: ['选择背面膜厚', '选择膜厚', '选择膜厚1', '选择膜厚2', '选择膜厚3'],
    xincengindex: 0,
    xincengarray: ['选择锌层', '100', '1001', '1002', '1003'],
    yanseindex: 0,
    yansearray: ['选择颜色', '标准', '标准1', '标准2', '标准3'],
    qiangduindex: 0,
    qiangduarray: ['选择强度', 'TS250GD+AZ', 'TS250GD+AZ1', 'TS250GD+AZ11', 'TS250GD+AZ111'],
    multiArray1: [],
    cityList:[],
    multiIndex1: [0, 0],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getstell()
    this.getAddress()
    // this.getCity()
  },
  // 获取省
  getAddress(){
    var that = this
    qingqiu.get("shengFen",null,function(res){
      console.log(res)
      if(res.success == true){
        var names = []
        that.data.cityList = res.result
        for(let obj of res.result){
          names.push(obj.name)
        }
        var multiArray1 = [names,[]]
        that.setData({
          multiArray1:multiArray1
        })
      }
    })
  },
  // 获取市
  // getCity(pid){
  //   var that = this
  //   qingqiu.get("shi",{pid:pid},function(res){
  //     console.log(res)
  //     if(res.success == true){
  //       var multiArray1 = "multiArray1[1]"
  //       that.setData({
  //         [multiArray1]:res.result
  //       })
  //       console.log(that.data.multiArray1)
  //     }
  //   })
  // },
  // 省市点击
  // bindMultiPickerColumnChange:function(){

  // },
  // 钢厂
  getstell(){
    var that = this
    qingqiu.get("stell",null,function(res){
      var list = res.result;
      var names = [];
      for(let obj of list){
        names.push(obj.name);
      }
      var multiArray=[names,[]];
      that.setData({
        multiArray:multiArray
      })
      qingqiu.get("theName",{name:'宝山钢铁'},function(res){
        if(res.success == true){
          var names = []
          for(let obj of res.result.records){
            names.push(obj.theNameId_dictText)
          }
          var multiArray = "multiArray[1]"
          that.setData({
            [multiArray]:names,
          })
        }
      })
    })
  },

  // 宽度最小值限制
  minReg:function(e){
    if(e.detail.value<400){
      wx.showToast({
        title: '宽度不能低于400',
        icon:'none',
        duration:2000
      })
      return
    }
  },
  // 跳转到成功页面
  kucunSubmitSuccess: function() {
    wx.navigateTo({
      url: '../kucunSubmitSuccess/kucunSubmitSuccess',
    })
  },
  // 选择仓库
  regionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex1: e.detail.value
    })
  },
  // 选择钢厂
  bindMultiPickerChange: function(e) {
    var that = this
    console.log('picker发送选择改变，携带值为', e.detail)
    var column = e.detail.column
    var indexs = e.detail.value;
    //picker发送选择改变，携带值为 (2) [1, 0]
    if(column == 0){
      var data = {
        name:that.data.multiArray[0][indexs]
      }
      qingqiu.get("theName",data,function(res){
        console.log(res)
        if(res.success == true){
          var names = []
          for(let obj of res.result.records){
            names.push(obj.theNameId_dictText)
          }
          var multiArray = "multiArray[1]"
          var index = "index.gangchang"
          var multiIndex = [indexs,0]
          console.log(multiIndex)
          that.setData({
            [multiArray]:names,
            multiIndex:multiIndex,
            [index]:0
          })
        }
      })
    }else{
      var index = "index.pingming"
      var multiIndex = [that.data.index.gangchang,indexs]
      this.setData({
        multiIndex: multiIndex,
        [index]:indexs
      })
      console.log(that.data.multiIndex)
    }
  },
  // 厚度
  houdu: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      houdu: e.detail.value
    })
  },
  // 宽度
  kuandu: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      kuandu: e.detail.value
    })
  },

  // 彩涂品名
  caituChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      caituindex: e.detail.value
    })
  },
  // 油漆
  youqiChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      youqiindex: e.detail.value
    })
  },
  // 正面
  zhengmianChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      zhengmianindex: e.detail.value
    })
  },
  // 背面
  beimianChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      beimianindex: e.detail.value
    })
  },
  // 涂层
  tuceng: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      tuceng: e.detail.value
    })
  },
  // 锌层
  xincengChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      xincengindex: e.detail.value
    })
  },
  // 颜色
  yanseChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      yanseindex: e.detail.value
    })
  },
  //强度
  qiangduChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      qiangduindex: e.detail.value
    })
  },
  // 吨位
  dunwei: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      dunwei: e.detail.value
    })
  },
})