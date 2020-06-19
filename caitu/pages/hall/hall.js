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
    pageNo:1,
    navid1: 2,
    index: 0,
    pmindex: 0,
    gangchang: [],
    pinming: ['品 名', '镀锌彩涂卷','镀锌板彩板彩涂卷','板彩涂卷'],
    pinminglist:['品 名', '镀锌彩涂卷','镀锌板彩板彩涂卷','板彩涂卷'],
    multilist:[],
    googleVal:'',
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
  getgangchang(){
    var that = this
    qingqiu.get("stell",null,function(res){
      var list = res.result;
      var names = ['钢 厂'];
      for(let obj of list){
        names.push(obj.name);
      }
      that.setData({
        gangchang:names
      })
    })
  },
  bindnav: function(e) {
    // debugger
    var navid = e.currentTarget.dataset.id
    this.setData({
      navid1: navid
    })
  },
  getpinming(value){
    var that = this
    var pnames = ['品 名']
    qingqiu.get("theName",{name:value},function(res){
      if(res.success == true){
        for(let obj of res.result.records){
          pnames.push(obj.theNameId_dictText)
        }
        that.setData({
          pinming:pnames,
          multilist:res.result.records
        })
      }
    })
  },
  bindgoogle:function(e){
    this.setData({
      googleVal:e.detail.value
    })
  },
  // 搜索
  getGoogle(){
    debugger
    console.log(this.data.navid1)
    if(this.data.navid1 == 1){
      this.selectqiugou()      
    }else if(this.data.navid1 == 2){
      this.selectweihuo()
    }else{
      this.selectpingou()
    }
  },

  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value,
    })
    if(e.detail.value != 0){
      this.getpinming(this.data.gangchang[e.detail.value])
    }else{
      this.setData({
        pinming:this.data.pinminglist
      })
    }
    if(this.data.navid1 == 1){
      this.selectqiugou()      
    }else if(this.data.navid1 == 2){
      this.selectweihuo()
    }else{
      this.selectpingou()
    }
  },
  bindPickerpm: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      pmindex: e.detail.value,
    })
    if(this.data.navid1 == 1){
      this.selectqiugou()      
    }else if(this.data.navid1 == 2){
      this.selectweihuo()
    }else{
      this.selectpingou()
    }
  },
  
  // 下拉刷新
  onPullDownRefresh: function () {
    this.onLoad()
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.selectqiugou()
    this.selectweihuo()
    this.selectpingou()
    this.getgangchang()
  },
  // 获取求购
  selectqiugou(){
    var that = this
    var data = {pageNo:that.data.pageNo}
    if(that.data.googleVal != "") {data.text = that.data.googleVal}
    if(that.data.index != 0) {data.steelName = that.data.gangchang[that.data.index]}
    if(that.data.pmindex != 0) {data.theNameId = that.data.multilist[that.data.pmindex-1]}
    console.log(data)
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
    var data = {pageNo:that.data.pageNo}
    if(that.data.googleVal != "") {data.text = that.data.googleVal}
    if(that.data.index != 0) {data.steelName = that.data.gangchang[that.data.index]}
    if(that.data.pmindex != 0) {data.theNameId = that.data.multilist[that.data.pmindex-1]}
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
    var data = {pageNo:that.data.pageNo}
    if(that.data.googleVal != "") {data.text = that.data.googleVal}
    if(that.data.index != 0) {data.steelName = that.data.gangchang[that.data.index]}
    if(that.data.pmindex != 0) {data.theNameId = that.data.multilist[that.data.pmindex-1]}
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
    console.log(app.globalData.dtid)
    this.setData({
      // navid1: app.globalData.dtid
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