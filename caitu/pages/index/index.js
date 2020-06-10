//index.js
//获取应用实例
const app = getApp()
const qingqiu = require('../../utils/request.js')
const api = require('../../utils/config.js')
Page({
  data: {
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
    bannerImg: [{
        id: 1,
        bannerimg: '../image/banner.png'
      },
      {
        id: 2,
        bannerimg: '../image/banner.png'
      },
      {
        id: 3,
        bannerimg: '../image/banner.png'
      }
    ],
    // qiugouList: [{
    //     id: 1,
    //     weight: '1200',
    //     name: '镀锌板彩涂卷',
    //     bianhao: '112hh',
    //     guige: '厚0.5/宽1000',
    //     color: '非标'
    //   },
    //   {
    //     id: 2,
    //     weight: '1200',
    //     name: '镀锌板彩涂镀锌板彩涂卷镀锌板彩涂卷卷',
    //     bianhao: '112hh',
    //     guige: '厚0.5/宽1000',
    //     color: '非标'
    //   }
    // ],
    pingouList:[],
    // pingouList: [{
    //     id: 1,
    //     weight: '1200',
    //     name: '镀锌板彩涂镀锌板彩涂卷镀锌板彩涂卷卷',
    //     bianhao: '112hh',
    //     guige: '厚0.5/宽1000',
    //     color: '非标',
    //     img: '../image/top.png'
    //   },
    //   {
    //     id: 2,
    //     weight: '1200',
    //     name: '镀锌板彩涂镀锌板彩涂卷镀锌板彩涂卷卷',
    //     bianhao: '112hh',
    //     guige: '厚0.5/宽1000',
    //     color: '非标',
    //     img: '../image/top1.png'
    //   },
    //   {
    //     id: 3,
    //     weight: '1200',
    //     name: '镀锌板彩涂镀锌板彩涂卷镀锌板彩涂卷卷',
    //     bianhao: '112hh',
    //     guige: '厚0.5/宽1000',
    //     color: '非标',
    //     img: '../image/top.png'
    //   }
    // ],
    weihuolist:[],
    // zixunList: [{
    //     id: 1,
    //     name: '宝山地区致良知学习会',
    //     content: '聚是一团火，散是满天星，共读一本书，幸福一家人，温暖一座城。',
    //     date: '2020.03.06',
    //     img: '../image/zixun.png'
    //   },
    //   {
    //     id: 2,
    //     name: '宝山地区致良知学习会',
    //     content: '宝钢中央研究院分析测试研究中心通过了中国合格评定国家认可委员会（CNAS）评审考核。',
    //     date: '2020.03.06',
    //     img: '../image/zixun1.png'
    //   }
    // ],
    zixunList:[],
    isAuto:0
  },
  onLoad: function() {
     //获得dialog组件
    this.dialog = this.selectComponent("#dialog");
    this.chushihuashouquan()
    this.getInfo()
    this.getpingou()
    this.getzixun()
    this.getweihuo()
  },
  // 获取拼购信息
  getpingou(){
    var that = this
    var data = {
      pageNo:1,
      pageSize:3
    }
    qingqiu.get('initGroupBuying',data,function(res){
      if(res.success == true){
        if (res.result != null) {
          that.data.pingouList=res.result.records
          // for(var i=0;i<res.result.records.length;i++){
          //   that.data.weihuolist[i].upUrl=api.baseUrl+api.viewUrl+that.data.weihuolist[i].upUrl
          // }
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
          for(var i=0;i<res.result.records.length;i++){
            that.data.weihuolist[i].upUrl=api.baseUrl+api.viewUrl+that.data.weihuolist[i].upUrl
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
      console.log(res)
      if(res.success == true){
        if (res.result != null) {
          that.data.zixunList=res.result.records
          for(var i=0;i<res.result.records.length;i++){
            that.data.zixunList[i].createTime=that.data.zixunList[i].createTime.split(' ')[0]
            that.data.zixunList[i].upUrl=api.baseUrl+api.viewUrl+that.data.zixunList[i].upUrl
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
          console.log(that.dialog)
          if(that.data.isAuto==0){
            that.dialog.showDialog();
          }
          that.setData({
            isAuto:1
          })
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.login({
            success: function(res) {
              var code = res.code
              wx.getUserInfo({
                lang: 'zh_CN',
                success(res) {
                  // debugger
                  const userInfo = res.userInfo
                  var data = {
                    code: code,
                    picUrl: userInfo.avatarUrl,
                    sex: userInfo.gender,
                    wxNc: userInfo.nickName,
                  }
                  qingqiu.get("getKeyInfo", data, function(re) {
                    console.log(re)
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
          wx.showToast({
            title: '未授权',
            icon:'none',
            duration:1000
          })
          return
        }
      }
    })
  },
  hall: function() {
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
  qiugouDetails: function() {
    wx.navigateTo({
      url: '../qiugouDetails/qiugouDetails',
    })
  },
  //跳转到拼购详情页面
  pingouDetails: function() {
    wx.navigateTo({
      url: '../pingouDetails/pingouDetails',
    })
  },
  //跳转到尾货信息页面
  weihuoDetails: function() {
    wx.navigateTo({
      url: '../weihuoDetails/weihuoDetails',
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