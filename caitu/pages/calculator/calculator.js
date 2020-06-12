// pages/calculator/calculator.js
const app = getApp()
const qingqiu = require('../../utils/request.js')
const api = require('../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zheng:[],
    mohou:[],
    bei:[],
    qiangduarray:[],
    youqiarray:[],
    xincengarray:[],
    yansearray:[],
    setwidth:[],
    sethoudu:[],
    multiIndex: [0, 0],
    qiangdu:['选择强度'],
    qiangduindex:0,
    youqi:['选择油漆'],
    youqiindex:0,
    xinceng:['选择锌层'],
    xincengindex:0,
    yanse:['选择颜色'],
    yanseindex:0,
    multiArray: [],
    multilist:[],
    setwidth:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getstell()
  },
  // 钢厂
  getstell(){
    var that = this
    qingqiu.get("stell",null,function(res){
      var list = res.result;
      var names = [];
      var pnames = [];
      for(let obj of list){
        if(names.length == 0){
          names.push("选择钢厂")
        }
        if(pnames.length == 0){
          pnames.push("选择品名")
        }
        names.push(obj.name);
      }
      var multiArray=[names,[]];
      that.setData({
        multiArray:multiArray
      })
      qingqiu.get("theName",{name:'宝山钢铁'},function(res){
        if(res.success == true){
          for(let obj of res.result.records){
            pnames.push(obj.theNameId_dictText)
          }
          var multiArray = "multiArray[1]"
          that.setData({
            [multiArray]:pnames,
            multilist:res.result.records
          })
        }
      })
    })
  },
  bindMultiPickerChange:function(e){
    console.log("携带参数",e.detail.value)
    var that = this
    var multiName = that.data.multiArray[[0]]
    var data = {
      steelName:multiName[e.detail.value[0]],
      theNameId:that.data.multilist[e.detail.value[1]-1].theNameId
    }
    that.setData({
      gangchangname:data.steelName,
      pinmingid:data.theNameId
    })
    that.getWidth(data)
  },
  // 宽度
  getWidth(data){
    var that = this
    qingqiu.get("common",data,function(res){
      console.log(res)
      if(res.success == true){
        var qiangdu = that.data.qiangdu
        var youqi = that.data.youqi
        var xinceng = that.data.xinceng
        var yanse = that.data.yanse
        for(let obj of res.result.densityList){
          qiangdu.push(obj.context)
        }
        for(let obj of res.result.printList){
          youqi.push(obj.context)
        }
        for(let obj of res.result.zinclayerList){
          xinceng.push(obj.context)
        }
        for(let obj of res.result.colorList){
          yanse.push(obj.context)
        }
        that.setData({
          setwidth:res.result.width,
          sethoudu:res.result.thickness,
          qiangdu:qiangdu,
          youqi:youqi,
          xinceng:xinceng,
          yanse:yanse,
          qiangduarray:res.result.densityList,
          youqiarray:res.result.printList,
          xincengarray:res.result.zinclayerList,
          yansearray:res.result.colorList
        })
      }
    })
  },
  // 选择钢厂
  bindMultiPickerColumnChange: function(e) {
    var that = this
    var indexs = e.detail.value;
    //picker发送选择改变，携带值为 (2) [1, 0]
    if(e.detail.column == 0){
      console.log(that.data.multiArray[0][indexs])
      var data = {
        name:that.data.multiArray[0][indexs]
      }
      qingqiu.get("theName",data,function(res){
        console.log(res)
        if(res.success == true){
          var names = []
          for(let obj of res.result.records){
            if(names.length == 0){
              names.push('选择品名')
            }
            names.push(obj.theNameId_dictText)
          }
          var multiArray = "multiArray[1]"
          var multiIndex = [indexs,0]
          that.setData({
            [multiArray]:names,
            multiIndex:multiIndex,
            multilist:res.result.records
          })
        }
      })
    }else{
      var multiIndex = "multiIndex[1]"
      this.setData({
        [multiIndex]: indexs,
      })
      console.log(that.data.multiIndex)
    }
  },
  // 厚度
  houdu: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      houdu: e.detail.value
    })
  },
  // 宽度
  kuandu: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      kuandu: e.detail.value
    })
  },
  // 宽度最小值限制
  minReg:function(e){
    // if(e.detail.value<this.data.width[0]&&e.detail.value>this.data.width[1]){
    //   wx.showToast({
    //     title: '宽度在'+this.data.width[0] + "~" + this.data.width[1],
    //     icon:'none',
    //     duration:2000
    //   })
    //   return
    // }
  },
  // 油漆
  youqiChange: function(e) {
    var that = this
    // if(!that.data.youqi.length>0){
    //   wx.showToast({
    //     title: '请选择钢厂',
    //     icon:'none',
    //     duration:2000
    //   })
    //   return
    // }
    // if(e.detail.value == 0){
    //   wx.showToast({
    //     title: '请选择油漆',
    //     icon:'none',
    //     duration:2000
    //   })
    //   return
    // }
    var data = {
      subentryId:that.data.youqiarray[e.detail.value-1].subentryId,
      text:that.data.youqi[e.detail.value]
    }
    qingqiu.get("commonPrint",data,function(res){
      console.log(res)
      if(res.success == true){
        var mohou = [res.result.zhengId]
        mohou.push(res.result.beiId)
        console.log(mohou)
        that.setData({
          mohou:mohou,
          zheng:res.result.zheng,
          bei:res.result.bei
        })
        this.setData({
          youqiindex: e.detail.value
        })
      }else{
        // wx.showToast({
        //   title: res.message,
        //   icon:'none',
        //   duration:2000
        // })
      }
    })
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
  // 被动涂层
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
  //吨位
  dunwei: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      dunwei: e.detail.value
    })
  },
  // 跳转到计算结果页面
  calculatorResult: function() {
    wx.navigateTo({
      url: '../calculatorResult/calculatorResult',
    })
  },
  // 选择规格 弹窗显示
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
  //选择规格 弹窗关闭
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