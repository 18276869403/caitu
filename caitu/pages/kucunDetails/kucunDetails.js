// pages/kucunDetails/kucunDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cangkuindex: 0,
    multiIndex: [0, 0, 0],
    region: ['省', '市', '区'],
    multiArray: [
      ['选择钢厂', '广州宝钢', '上海宝钢', '浙江宝钢'],
      ['选择彩涂品', '镀铝锌卷', '镀铝锌彩涂卷', '镀铝锌']
    ],
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 跳转到成功页面
  kucunSubmitSuccess: function () {
    wx.navigateTo({
      url: '../kucunSubmitSuccess/kucunSubmitSuccess',
    })
  },
  // 选择仓库
  RegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  // 选择钢厂
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },

  // 彩涂品名
  caituChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      caituindex: e.detail.value
    })
  },
  // 油漆
  youqiChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      youqiindex: e.detail.value
    })
  },
  // 正面
  zhengmianChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      zhengmianindex: e.detail.value
    })
  },
  // 背面
  beimianChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      beimianindex: e.detail.value
    })
  },
  // 锌层
  xincengChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      xincengindex: e.detail.value
    })
  },
  // 颜色
  yanseChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      yanseindex: e.detail.value
    })
  },
  //强度
  qiangduChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      qiangduindex: e.detail.value
    })
  },
})