// pages/hall/hall.js
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
    pageNo:1,
    navid1: 2,
    navid: 2,
    index: 0,
    pmindex: 0,
    color:0,
    colorid:0,
    hdid:0,
    thickness:0,
    gangchang: [],
    pinming: ['品名'],
    pinminglist:['品名', '镀锌彩涂卷','镀锌板彩板彩涂卷','板彩涂卷'],
    colorlist:['颜色'],
    houdu:['厚度'],
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
    qiugou:[],
    theNameId:'',
    steelName:'',
    isLastPage:false,
    pageNo:1,
    thicknessList:[],
    colorLists:[]
  },
  getgangchang(){
    var that = this
    qingqiu.get("stell",null,function(res){
      var list = res.result;
      var names = ['钢厂'];
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
    this.data.navid=navid
    if(navid==1){
      this.data.pageNo=1
      this.data.isLastPage=false
      this.data.qiugou=[]
      this.selectqiugou()
    }
    if(navid==2){
      this.data.pageNo=1
      this.data.isLastPage=false
      this.data.kucun=[]
      this.selectweihuo()
    }
    if(navid==3){
      this.data.pageNo=1
      this.data.isLastPage=false
      this.data.pingou=[]
      this.selectpingou()
    }
    this.setData({
      navid1: this.data.navid
    })
  },
  // 品名
  getpinming(value){
    var that = this
    var pnames = ['品名']
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
  // 颜色/厚度
  getColor(){
    var that = this
    var data={
      steelName:that.data.steelName,
      theNameId:that.data.theNameId
    }
    var colorlist = ['颜色']
    var houdu = ['厚度']
    qingqiu.get("common",data,function(res){
      console.log('颜色/厚度',res)
      if(res.success == true){
        for(let obj of res.result.colorList){
          colorlist.push(obj.context)
        }
        for(let obj of res.result.thicknessList){
          houdu.push(obj.scopeBelow+'~'+obj.scopeUp)
        }
        that.setData({
          colorlist:colorlist,
          houdu:houdu,
        })
      }
    })
  },
  // 厚度
  getHou(value){
  },
  bindgoogle:function(e){
    this.setData({
      googleVal:e.detail.value
    })
  },
  // 搜索
  getGoogle(){
    console.log(this.data.navid)
    if(this.data.navid == 1){
      this.selectqiugou()      
    }else if(this.data.navid == 2){
      this.selectweihuo()
    }else{
      this.selectpingou()
    }
  },

  bindPickerChange: function(e) {
    this.data.steelName=this.data.gangchang[e.detail.value]
    console.log(this.data.steelName)
    this.setData({
      index: e.detail.value,
      pmindex: 0,
      color:0,
      thickness:0
    })
    if(e.detail.value != 0){
      this.getpinming(this.data.gangchang[e.detail.value])
    }else{
      this.setData({
        pinming:['品名'],
        colorlist:['颜色'],
        houdu:['厚度'],
        theNameId:'',
        colorid:0,
        hdid:0
      })
    }
    if(this.data.navid == 1){
      this.data.pageNo=1
      this.data.isLastPage=false
      this.data.qiugou=[]
      this.selectqiugou()      
    }else if(this.data.navid == 2){
      this.data.pageNo=1
      this.data.isLastPage=false
      this.data.kucun=[]
      this.selectweihuo()
    }else{
      this.data.pageNo=1
      this.data.isLastPage=false
      this.data.pingou=[]
      this.selectpingou()
    }
  },
  bindPickerpm: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    if(this.data.steelName=='钢厂'){
      wx.showToast({
        title: '请先选择钢厂',
        icon:'none',
        duration:2000
      })
      return
    }
    this.data.theNameId=e.detail.value
    console.log(this.data.theNameId)
    this.setData({
      pmindex: e.detail.value,
      color:0,
      thickness:0
    })
    this.data.colorid=''
    this.data.hdid=''
    this.data.colorlist[this.data.colorid]=''
    this.data.houdu[this.data.hdid]=''
    this.getColor()
    if(this.data.navid == 1){
      this.data.pageNo=1
      this.data.isLastPage=false
      this.data.qiugou=[]
      this.selectqiugou()      
    }else if(this.data.navid == 2){
      this.data.pageNo=1
      this.data.isLastPage=false
      this.data.kucun=[]
      this.selectweihuo()
    }else{
      this.data.pageNo=1
      this.data.isLastPage=false
      this.data.pingou=[]
      this.selectpingou()
    }
  },
  // 选择颜色
  bindPickerColor: function(e) {
    if(this.data.steelName=='钢厂'||this.data.steelName==''){
      wx.showToast({
        title: '请先选择钢厂',
        icon:'none',
        duration:2000
      })
      return
    }
    if(this.data.theNameId=='0'||this.data.theNameId==''){
      wx.showToast({
        title: '请先选择品名',
        icon:'none',
        duration:2000
      })
      return
    }
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.data.colorid=e.detail.value
    this.setData({
      color: e.detail.value,
    })
    this.data.houdu[this.data.hdid]=''
    if(this.data.navid == 1){
      this.data.pageNo=1
      this.data.isLastPage=false
      this.data.qiugou=[]
      this.selectqiugou()      
    }else if(this.data.navid == 2){
      this.data.pageNo=1
      this.data.isLastPage=false
      this.data.kucun=[]
      this.selectweihuo()
    }else{
      this.data.pageNo=1
      this.data.isLastPage=false
      this.data.pingou=[]
      this.selectpingou()
    }
  },
  // 选择厚度
  bindPickerThickness: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.data.hdid=e.detail.value
    this.setData({
      thickness: e.detail.value,
    })
    if(this.data.navid == 1){
      this.data.pageNo=1
      this.data.isLastPage=false
      this.data.qiugou=[]
      this.selectqiugou()      
    }else if(this.data.navid == 2){
      this.data.pageNo=1
      this.data.isLastPage=false
      this.data.kucun=[]
      this.selectweihuo()
    }else{
      this.data.pageNo=1
      this.data.isLastPage=false
      this.data.pingou=[]
      this.selectpingou()
    }
  },
  
  // 下拉刷新
  onPullDownRefresh: function () {
    this.data.pageNo=1
    this.data.qiugou=[]
    this.data.kucun=[]
    this.data.pingou=[]
    this.data.isLastPage=false
    this.onLoad()
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000);
  },
  //上拉功能
  onReachBottom(){
    if(this.data.isLastPage){
      wx.showToast({
        title: '没有更多了！',
        icon:'none',
        duration:2000
      })
      return
    }
    this.setData({pageNo:this.data.pageNo+1})
    if(this.data.navid == 1){
      this.selectqiugou()      
    }else if(this.data.navid == 2){
      this.selectweihuo()
    }else{
      this.selectpingou()
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.navid=app.globalData.dtid==undefined?2:app.globalData.dtid
    this.selectqiugou()
    this.selectweihuo()
    this.selectpingou()
    this.getgangchang()
  },
  // 获取求购
  selectqiugou(){
    var that = this
    if(that.data.colorid==''){
      that.data.colorid=0
    }
    if(that.data.hdid==''){
      that.data.hdid=0
    }
    var data = {
      pageNo:that.data.pageNo,
      pageSize:10,
    }
    if(that.data.index != 0) {data.steelName = that.data.gangchang[that.data.index]}
    if(that.data.pmindex != 0) {data.theNameId = that.data.pinming[that.data.pmindex]}
    if(that.data.colorid != 0) {data.color = that.data.colorlist[that.data.colorid]}
    if(that.data.hdid != 0) { data.thickness = that.data.houdu[that.data.hdid]}
    if(that.data.googleVal != "") { data.searchText = that.data.googleVal }
    console.log(data)
    qingqiu.get('askToBuyLists',data,function(res){
      if(res.success == true){
        if (res.result != null) {
          if(res.result.records==''){
            that.data.isLastPage=true
          }
          var qiugou=that.data.qiugou
          for(let obj of res.result.records){
            var str = obj.id.toString()
            if(str.length < 10){
              obj.backup1 = utils.IdentityNum(str)
            }
            if(obj.createtime!=''&& obj.createtime!=null ){
              obj.createtime=obj.createtime.split(' ')[0]
            }
            qiugou.push(obj)
          }
          that.setData({
            qiugou:qiugou
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
      pageNo:that.data.pageNo,
      pageSize:10,
      putaway:0,
      strState:1,
    }
    if(that.data.index != 0) {data.steelName = that.data.gangchang[that.data.index]}
    if(that.data.pmindex != 0) {data.theNameId = that.data.pinming[that.data.pmindex]}
    if(that.data.colorid != 0) {data.color = that.data.colorlist[that.data.colorid]}
    if(that.data.hdid != 0) { data.thickness = that.data.houdu[that.data.hdid]}
    if(that.data.googleVal != "") { data.searchText = that.data.googleVal }
    console.log(data)
    qingqiu.get('inventoryLists',data,function(res){
      if(res.success == true){
        if (res.result != null) {
          if(res.result.records==''){
            that.data.isLastPage=true
          }
          var kucun=that.data.kucun
          for(let obj of res.result.records){
            var str = obj.id.toString()
            if(str.length < 10){
              obj.backup1 = utils.IdentityNum(str)
            }
            obj.upUrl=obj.upUrl.split(',')
            kucun.push(obj)
          }
          console.log(kucun)
          that.setData({
            kucun:kucun
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
      pageNo:that.data.pageNo,
      pageSize:10,
    }
    if(that.data.index != 0) {data.steelName = that.data.gangchang[that.data.index]}
    if(that.data.pmindex != 0) {data.theNameId = that.data.pinming[that.data.pmindex]}
    if(that.data.colorid != 0) {data.color = that.data.colorlist[that.data.colorid]}
    if(that.data.hdid != 0) { data.thickness = that.data.houdu[that.data.hdid]}
    if(that.data.googleVal != "") { data.searchText = that.data.googleVal }
    console.log(data)
    qingqiu.get('groupByingLists',data,function(res){
      if(res.success == true){
        if (res.result != null) {
          if(res.result.records==''){
            that.data.isLastPage=true
          }
          var pingou=that.data.pingou
          for(let obj of res.result.records){
            if(obj.createtime!=''&& obj.createtime!=null ){
              obj.createtime=obj.createtime.split(' ')[0]
            }
            if(obj.deadline!=''&& obj.deadline!=null ){
              obj.deadline=obj.deadline.split(' ')[0]
            }
            if(obj.upUrl!=''&& obj.upUrl!=null ){
              obj.upUrl=obj.upUrl.split(',')
            }
            var str = obj.id.toString()
            if(str.length < 10){
              obj.backup1 = utils.IdentityNum(str)
            }
            pingou.push(obj)
          }
          console.log(pingou)
          that.setData({
            pingou:pingou
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
    if(app.globalData.dtid!=undefined){
      this.setData({
      navid1: app.globalData.dtid
    })
    }
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
    var id=e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../weihuoDetails/weihuoDetails?id='+id,
    })
  }

})