// pages/submitSuccess/submitSuccess.js

const api = require('../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    viewUrl:api.viewUrl,
    // 求购发布成功
    type: 0,
    // 拼购发布成功
    // type: 1,
    weihuoList: [{
        id: 1,
        number: '111',
        name: '镀锌板彩涂卷',
        bianhao: 'hz11',
        guige: '0.5/宽1000',
        yanse: '非标',
        xinceng: '100',
        weight: '120',
        cangku: '浙江'
      },
      {
        id: 1,
        number: '111',
        name: '镀锌板彩涂卷',
        number: 'hz1111',
        bianhao: 'hz11',
        guige: '0.5/宽1000',
        yanse: '非标',
        xinceng: '100',
        weight: '120',
        cangku: '浙江'
      }
    ],
    pipeilist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.pipeilist=JSON.parse(options.obj)
    for(let obj of this.data.pipeilist){
      var str = obj.id.toString()
      if(str.length < 10){
        var str1 = ''
        for(let i=0;i<10-str.length;i++){
          str1 += 0
        }
        obj.backup1 = str1 + str
      }
    }
    for(var i=0;i<this.data.pipeilist.length;i++){
      this.data.pipeilist[i].upUrl=this.data.pipeilist[i].upUrl.split(',')[0]
    }
    this.setData({
      pipeilist:this.data.pipeilist
    })
  },
  // 海报页面
  post: function() {
    wx.navigateTo({
      url: '../post/post',
    })
  },
  // 服务规则页面显示
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
      this.hideModal1()
    }.bind(this), 1000)
  },
  //服务规则页面关闭
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