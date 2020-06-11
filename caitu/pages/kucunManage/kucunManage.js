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
    setwidth:[],
    sethoudu:[],
    // multiArray: [['钢厂', '广州宝钢', '上海宝钢', '浙江宝钢'], ['彩涂品名', '镀铝锌卷', '镀铝锌彩涂卷', '镀铝锌']],
    multiArray: [[],[]],
    multilist:[],
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
    // 省市
    multiArray1: [],
    cityList:[],
    city:[],
    multiIndex1: [0, 0],
    qiangdu:['选择强度'],
    youqi:['选择油漆'],
    xinceng:['选择锌层'],
    yanse:['选择颜色'],
    zheng:[],
    fan:[]
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
        for(let obj of res.result){
          names.push(obj.itemText)
        }
        var multiArray1 = [names,[]]
        that.setData({
          multiArray1:multiArray1,
          cityList:res.result
        })
        qingqiu.get("shi",{pid:110000},function(res){
          if(res.success == true){
            var cityname = []
            for(let obj of res.result){
              cityname.push(obj.itemText)
            }
            var multiArray1 = "multiArray1[1]"
            that.setData({
              [multiArray1]:cityname,
              city:res.result
            })
          }
        })
      }
    })
  },
  // 省份触发事件
  bindMultiPickerColumnChangeCity:function(e){
    console.log("携带参数",e.detail)
    var indexs = e.detail.value
    var column = e.detail.column
    var that = this
    if(column == 0){
      var data = {
        pid:that.data.cityList[indexs].itemValue
      }
      qingqiu.get("shi",data,function(res){
        console.log(res)
        if(res.success == true){
            var cityname = []
            for(let obj of res.result){
              cityname.push(obj.itemText)
            }
            var multiArray1 = "multiArray1[1]"
            var multiIndex1 = [indexs,0]
            that.setData({
              [multiArray1]:cityname,
              city:res.result,
              multiIndex1:multiIndex1
            })
        }
      })
    }else{
      var multiIndex1 = "multiIndex1[1]"
      this.setData({
        [multiIndex1]: indexs,
      })
    }
  },
  // 钢厂
  getstell(){
    var that = this
    qingqiu.get("stell",null,function(res){
      var list = res.result;
      var names = [];
      for(let obj of list){
        if(names.length<0){
          // names.push("钢厂")
        }
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
            // if
            names.push(obj.theNameId_dictText)
          }
          var multiArray = "multiArray[1]"
          that.setData({
            [multiArray]:names,
            multilist:res.result.records
          })
        }
      })
    })
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
  bindMultiPickerChangeCity:function(e){
    console.log("携带参数",e.detail)
  },
  bindMultiPickerChange:function(e){
    console.log("携带参数",e.detail.value)
    var that = this
    var multiName = that.data.multiArray[that.data.multiIndex[0]]
    var data = {
      steelName:multiName[e.detail.value[0]],
      theNameId:that.data.multilist[e.detail.value[1]].theNameId
    }
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
        console.log(qiangdu)
        console.log(youqi)
        console.log(xinceng)
        console.log(yanse)
      }
    })
  },
  // 选择钢厂
  bindMultiPickerColumnChange: function(e) {
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
          var multiIndex = [indexs,0]
          console.log(multiIndex)
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
  houdu: function(e) {
    this.setData({
      houdu: e.detail.value
    })
  },
  retReg:function(e){
    if(!this.data.sethoudu.length>0){
      wx.showToast({
        title: '请选择钢厂',
        icon:'none',
        duration:2000
      })
      this.setData({
        houdu:''
      })
      return
    }
    var minhoudu = this.data.sethoudu[0]
    var maxhoudu = this.data.sethoudu[1]
    if(e.detail.value>minhoudu&&e.detail.value<maxhoudu){
      this.setData({
        houdu:e.detail.value
      })
    }else{
      wx.showToast({
        title: '数值范围在'+minhoudu+'~'+maxhoudu,
        icon:'none',
        duration:2000
      })
      this.setData({
        houdu:''
      })
    }
  },
  // 宽度
  kuandu: function(e) {
    this.setData({
      kuandu: e.detail.value
    })
  },
  // 宽度最小值限制
  minReg:function(e){
    if(!this.data.setwidth.length>0){
      wx.showToast({
        title: '请选择钢厂',
        icon:'none',
        duration:2000
      })
      this.setData({
        kuandu:''
      })
      return
    }
    debugger
    var width = Number(e.detail.value) 
    var minwidth = Number(this.data.setwidth[0])
    var maxwidth = Number(this.data.setwidth[1])
    if(width > minwidth && width < maxwidth){
      this.setData({
        kuandu: e.detail.value
      })
    }else{
      this.setData({
        kuandu: ''
      })
      wx.showToast({
        title: '宽度在'+minwidth + "~" + maxwidth+'之间',
        icon:'none',
        duration:2000
      })
      return
    }
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
    var that = this
    if(e.detail.value == 0){
      wx.showToast({
        title: '请选择油漆',
        icon:'none',
        duration:2000
      })
      return
    }
    var data = {
      subentryId:that.data.youqiarray[e.detail.value-1].subentryId,
      text:that.data.youqi[e.detail.value]
    }
    qingqiu.get("commonPrint",data,function(res){
      if(res.success == true){
        that.setData({
          zheng:res.result.zheng,
          bei:res.result.bei
        })
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