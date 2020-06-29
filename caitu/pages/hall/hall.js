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
    navid: 2,
    index: 0,
    pmindex: 0,
    color:0,
    colorid:'',
    hdid:'',
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
    steelName:''
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
      this.selectqiugou()
    }
    if(navid==2){
      this.selectweihuo()
    }
    if(navid==3){
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
  // 颜色
  getColor(){
    var that = this
    var data={
      steelName:that.data.steelName,
      theNameId:that.data.theNameId
    }
    that.data.colorlist = ['颜色']
    qingqiu.get("common",data,function(res){
      if(res.success == true){
        for(let obj of res.result.colorList){
          that.data.colorlist.push(obj.context)
        }
        that.setData({
          colorlist:that.data.colorlist
          // multilist:res.result.records
        })
      }
    })
  },
  // 厚度
  getHou(value){
    var that = this
    var data={
      steelName:that.data.steelName,
      theNameId:that.data.theNameId
    }
    that.data.houdu = ['厚度']
    var hd1=''
    var hd2=''
    qingqiu.get("common",data,function(res){
      if(res.success == true){
        // for(let obj of res.result.thickness){
        //   houdu.push(obj)
        // }
        hd1=res.result.thickness[0]
        hd2=res.result.thickness[1]
        that.data.houdu.push(hd1+'~'+hd2)
        that.setData({
          houdu:that.data.houdu
          // multilist:res.result.records
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
    this.data.theNameId=''
    this.data.colorlist[this.data.colorid]=''
    this.data.houdu[this.data.hdid]=''
    this.data.pinming=['品名']
    this.data.colorlist=['颜色']
    this.data.houdu=['厚度']
    this.data.colorid=0
    this.data.hdid=0
    if(e.detail.value != 0){
      this.getpinming(this.data.gangchang[e.detail.value])
    }else{
      this.setData({
        // pinming:this.data.pinminglist,
        pinming:this.data.pinming,
        colorlist:this.data.colorlist,
        houdu:this.data.houdu
      })
    }
    if(this.data.navid == 1){
      this.selectqiugou()      
    }else if(this.data.navid == 2){
      this.selectweihuo()
    }else{
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
    this.getHou()
    if(this.data.navid == 1){
      this.selectqiugou()      
    }else if(this.data.navid == 2){
      this.selectweihuo()
    }else{
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
      this.selectqiugou()      
    }else if(this.data.navid == 2){
      this.selectweihuo()
    }else{
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
      this.selectqiugou()      
    }else if(this.data.navid == 2){
      this.selectweihuo()
    }else{
      this.selectpingou()
    }
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    app.globalData.dtid=this.data.navid
    this.onLoad()
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000);
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
      steelName:that.data.steelName=='钢厂'?'':that.data.steelName,
      theNameId:that.data.theNameId=='0'?'':that.data.theNameId,
      color:that.data.colorlist[that.data.colorid]=='颜色'?'':that.data.colorlist[that.data.colorid],
      thickness:that.data.houdu[that.data.hdid]=='厚度'?'':that.data.houdu[that.data.hdid]
    }
    if(that.data.googleVal != "") {data.text = that.data.googleVal}
    if(that.data.index != 0) {data.steelName = that.data.gangchang[that.data.index]}
    if(that.data.pmindex != 0) {data.theNameId = that.data.multilist[that.data.pmindex-1].theNameId}
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
    if(that.data.colorid==''){
      that.data.colorid=0
    }
    if(that.data.hdid==''){
      that.data.hdid=0
    }
    var data = {
      pageNo:that.data.pageNo,
      pageSize:10,
      steelName:that.data.steelName=='钢厂'?'':that.data.steelName,
      theNameId:that.data.theNameId=='0'?'':that.data.theNameId,
      color:that.data.colorlist[that.data.colorid]=='颜色'?'':that.data.colorlist[that.data.colorid],
      thickness:that.data.houdu[that.data.hdid]=='厚度'?'':that.data.houdu[that.data.hdid]
    }
    if(that.data.googleVal != "") {data.text = that.data.googleVal}
    if(that.data.index != 0) {data.steelName = that.data.gangchang[that.data.index]}
    if(that.data.pmindex != 0) {data.theNameId = that.data.multilist[that.data.pmindex-1].theNameId}
    console.log(data)
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
    if(that.data.colorid==''){
      that.data.colorid=0
    }
    if(that.data.hdid==''){
      that.data.hdid=0
    }
    var data = {
      pageNo:that.data.pageNo,
      pageSize:10,
      steelName:that.data.steelName=='钢厂'?'':that.data.steelName,
      theNameId:that.data.theNameId=='0'?'':that.data.theNameId,
      color:that.data.colorlist[that.data.colorid]=='颜色'?'':that.data.colorlist[that.data.colorid],
      thickness:that.data.houdu[that.data.hdid]=='厚度'?'':that.data.houdu[that.data.hdid]
    }
    if(that.data.googleVal != "") {data.text = that.data.googleVal}
    if(that.data.index != 0) {data.steelName = that.data.gangchang[that.data.index]}
    if(that.data.pmindex != 0) {data.theNameId = that.data.multilist[that.data.pmindex-1].theNameId}
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
    var obj=e.currentTarget.dataset.item
    var weihuo = JSON.stringify(obj);
    wx.navigateTo({
      url: '../weihuoDetails/weihuoDetails?obj='+weihuo,
    })
  }

})