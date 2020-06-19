//index.js
//获取应用实例
const app = getApp()
const qingqiu = require('../../utils/request.js')
const api = require('../../utils/config.js')
Page({
  data: {
    viewUrl:api.viewUrl,
    msgList: [{
        id: "1",
        title: "编号100*0239发布求购"
      },
      {
        id: "2",
        title: "编号101*0237发布求购"
      },
      {
        id: "3",
        title: "编号102*0237发布求购"
      }
    ],
    bannerImg: [],
    qiugouList: [],
    pingouList:[],
    weihuolist:[],
    zixunList:[],
    isAuto:0
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    this.onShow()
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000);
  },
  onShow: function() {
     //获得dialog组件
    this.dialog = this.selectComponent("#dialog");
    this.setData({
      userId:app.globalData.wxid
    })
    this.chushihuashouquan()
    this.getqiugou()
    this.getbanner()
    this.getpingou()
    this.getzixun()
    this.getweihuo()
  },
  // 获取广告
  getbanner(){
    var that = this
    qingqiu.get("initBanners",null,function(res){
      if(res.success == true){
        for(let obj of res.result.records){
          obj.upUrl = that.data.viewUrl + obj.upUrl
        }
        that.setData({
          bannerImg:res.result.records
        })
      }
    })
  },
  // 求购信息
  getqiugou(){
    var that = this
    qingqiu.get("initAskToBuy",null,function(res){
      console.log('求购信息',res)
      if(res.success == true){
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
        that.setData({
          qiugouList:res.result.records
        })
      }else{
        wx.showToast({
          title: res.message,
          icon:'none',
          duration:1000
        })
      }
    })
  },
  // 获取拼购信息
  getpingou(){
    var that = this
    var data = {
      pageNo:1,
      pageSize:3
    }
    qingqiu.get('initGroupBuying',data,function(res){
      console.log('获取拼购信息',res)
      if(res.success == true){
        if (res.result != null) {
          that.data.pingouList=res.result.records
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
          console.log(that.data.pingouList)
          that.setData({
            pingouList:that.data.pingouList
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
  getweihuo(){
    var that = this
    var data = {
      pageNo:1,
      pageSize:3
    }
    qingqiu.get('initInventory',data,function(res){
      if(res.success == true){
        if (res.result != null) {
          that.data.weihuolist=res.result.records
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
            that.data.weihuolist[i].upUrl=that.data.weihuolist[i].upUrl.split(',')
          }
          console.log(that.data.weihuolist)
          that.setData({
            weihuolist:that.data.weihuolist
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
  // 获取最新资讯
  getzixun(){
    var that = this
    var data = {
      pageNo:1,
      pageSize:3
    }
    qingqiu.get('initInformation',data,function(res){
      console.log('最新资讯信息',res)
      if(res.success == true){
        if (res.result != null) {
          that.data.zixunList=res.result.records
          for(var i=0;i<res.result.records.length;i++){
            that.data.zixunList[i].createTime=that.data.zixunList[i].createTime.split(' ')[0]
            that.data.zixunList[i].upUrl= that.data.viewUrl +that.data.zixunList[i].upUrl
          }
          console.log(that.data.zixunList)
          that.setData({
            zixunList:that.data.zixunList
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
  // 初始化数据
  getInfo(){
    var that = this
    qingqiu.get("init",null,function(res){
      console.log(res)
    })
  },
  // 初始化授权
  chushihuashouquan:function(){
    var that = this
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          that.dialog.hideDialog();
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.login({
            success: function(res) {
              var code = res.code
              wx.getUserInfo({
                lang: 'zh_CN',
                success(res) {
                  const userInfo = res.userInfo
                  var data = {
                    code: code,
                    picUrl: userInfo.avatarUrl,
                    sex: userInfo.gender,
                    wxNc: userInfo.nickName,
                  }
                  console.log(data)
                  qingqiu.get("getKeyInfo", data, function(re) {
                    console.log('获取个人信息',re)
                    app.globalData.wxid = re.result.wxUser.id
                    app.globalData.openid = re.result.openId
                    app.globalData.wxState = re.result.wxUser.autoState
                    app.globalData.gender = re.result.wxUser.sex
                  }, 'post')
                }
              })
            }
          })
        } else {
          that.dialog.showDialog()
          return
        }
      }
    })
  },
  hall: function(e) {
    var id=e.currentTarget.dataset.id
    app.globalData.dtid=id
    if(id==1){
      app.globalData.dtid=1
    }
    if(id==2){
      app.globalData.dtid=2
    }
    if(id==3){
      app.globalData.dtid=3
    }
    console.log(app.globalData.dtid)
    wx.switchTab({
      url: '../hall/hall'
    })
  },
  // 跳转到计算器页面
  calculator: function() {
    wx.navigateTo({
      url: '../calculator/calculator',
    })
  },
  // 跳转到认证信息页面
  renzhengInfo: function() {
    this.hideModal1()
    wx.navigateTo({
      url: '../renzhengInfo/renzhengInfo',
    })
  },
  // 跳转到求购发布页面
  qiugouSubmit: function() {
    if(app.globalData.wxState == 0){
      wx.showModal({
        title: '提示',
        content:'您未认证，请前往认证',
        cancelText:'取消',
        showCancel:true,
        confirmText:'确定',
        success:function(res){
          if(res.confirm){
            // 跳转到我的信息页面
            wx.navigateTo({
              url: '../myInfo/myInfo',
            })
          }else if(res.cancel){
            return
          }
        }
      })
    }else{
      wx.navigateTo({
        url: '../qiugouSubmit/qiugouSubmit',
      })
    }
  },
  // 跳转到拼购发布页面
  pingouSubmit: function() {
    if(app.globalData.wxState == 0){
      wx.showModal({
        title: '提示',
        content:'您未认证，请前往认证',
        cancelText:'取消',
        showCancel:true,
        confirmText:'确定',
        success:function(res){
          if(res.confirm){
            // 跳转到我的信息页面
            wx.navigateTo({
              url: '../myInfo/myInfo',
            })
          }else if(res.cancel){
            return
          }
        }
      })
    }else{
      wx.navigateTo({
        url: '../pingouSubmit/pingouSubmit',
      })
    }
  },
  // 跳转到库存管理页面
  kucunManage: function() {
    if(app.globalData.wxState == 0){
      wx.showModal({
        title: '提示',
        content:'您未认证，请前往认证',
        cancelText:'取消',
        showCancel:true,
        confirmText:'确定',
        success:function(res){
          if(res.confirm){
            // 跳转到我的信息页面
            wx.navigateTo({
              url: '../myInfo/myInfo',
            })
          }else if(res.cancel){
            return
          }
        }
      })
    }else{
      wx.navigateTo({
        url: '../kucunManage/kucunManage',
      })
    }
  },
  // 跳转到求购详情页面
  qiugouDetails: function(e) {
    var obj=e.currentTarget.dataset.item
    var qiugou = JSON.stringify(obj); 
    wx.navigateTo({
      url: '../qiugouDetails/qiugouDetails?obj='+qiugou,
    })
  },
  //跳转到拼购详情页面
  pingouDetails: function(e) {
    var obj =e.currentTarget.dataset.pingou;
    var pgxx = JSON.stringify(obj);
    wx.navigateTo({
      url: '../pingouDetails/pingouDetails?obj='+pgxx,
    })
  },
  //跳转到尾货信息页面
  weihuoDetails: function(e) {
    var obj =e.currentTarget.dataset.weihuo;
    var whxx = JSON.stringify(obj);
    wx.navigateTo({
      url: '../weihuoDetails/weihuoDetails?obj='+whxx,
    })
  },
  // 跳转到更多咨询页面
  zixunMore: function() {
    wx.navigateTo({
      url: '../zixunMore/zixunMore',
    })
  },
  // 弹窗显示
  showModal1: function() {
    this.setData({
      hasMask: true
    })
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation

    animation.opacity(0).rotateX(-100).step();
    this.setData({
      animationData: animation.export(),
      showModalStatus1: true
    })
    setTimeout(function() {
      animation.opacity(1).rotateX(0).step();
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
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