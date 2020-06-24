// pages/calculator/calculator.js
const app = getApp()
const qingqiu = require('../../utils/request.js')
const api = require('../../utils/config.js')
const utils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zheng: [],
    mohou: [],
    flag:true,
    bei: [],
    qiangduarray: [],
    youqiarray: [],
    xincengarray: [],
    yansearray: [],
    setwidth: [],
    zhengvalue: '',
    beivalue:'',
    sethoudu: [],
    multiIndex: [0, 0],
    qiangdu: ['选择强度'],
    qiangduindex: 0,
    youqi: ['选择油漆'],
    youqiindex: 0,
    xinceng: ['选择锌层'],
    xincengindex: 0,
    yanse: ['选择颜色'],
    yanseindex: 0,
    multiArray: [],
    multilist: [],
    setwidth: [],
    front:'',
    gangchanglist:[],
    gangchangname:'',
    itemobj:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.obj)
    if(options.obj != "null"){
      var data = JSON.parse(options.obj)
      console.log(data)
      this.setData({
        itemobj:data,
        houdu:data.thickness,
        kuandu:data.width,
        zhengvalue:data.front,
        beivalue:data.rear,
        tuceng:data.coat,
        dunwei:data.tonnage,
        pinmingid:data.theNameId,
        gangchangname:data.steelName
      })
      this.bindchushihua(data.steelName,data.theNameId_dictText)
      this.getWidth({steelName:data.steelName,theNameId:data.theNameId})
    }else{
      this.getstell()
    }
  },
  // 绑定初始值
  bindchushihua(steetName,theNameId_dictText){
    var that = this
    qingqiu.get("stell",null,function(res){
      var list = res.result;
      var names = [];
      var pnames = [];
      for (let obj of list) {
        if (names.length == 0) {
          names.push("选择钢厂")
        }
        if (pnames.length == 0) {
          pnames.push("选择品名")
        }
        names.push(obj.name);
      }
      var multiArray = [names, []];
      var multiIndex0 = "multiIndex[0]"
      var mulIndex1 = utils.getArrIndex(names,steetName)
      that.setData({
        multiArray: multiArray,
        [multiIndex0]:mulIndex1
      })
      qingqiu.get("theName", {
        name: steetName
      }, function (res) {
        if (res.success == true) {
          for (let obj of res.result.records) {
            pnames.push(obj.theNameId_dictText)
          }
          var multiArray = "multiArray[1]"
          var multiIndex1 = "multiIndex[1]"
          var muIndex1 = utils.getArrIndex(pnames,theNameId_dictText)
          that.setData({
            [multiArray]: pnames,
            multilist: res.result.records,
            [multiIndex1]:muIndex1
          })
        }
      })
    })
  },
  // 钢厂
  getstell() {
    var that = this
    qingqiu.get("stell", null, function (res) {
      var list = res.result;
      var names = [];
      var pnames = [];
      for (let obj of list) {
        if (names.length == 0) {
          names.push("选择钢厂")
        }
        if (pnames.length == 0) {
          pnames.push("选择品名")
        }
        names.push(obj.name);
      }
      var multiArray = [names, []];
      that.setData({
        multiArray: multiArray,
      })
      qingqiu.get("theName", {
        name: '宝山钢铁'
      }, function (res) {
        if (res.success == true) {
          for (let obj of res.result.records) {
            pnames.push(obj.theNameId_dictText)
          }
          var multiArray = "multiArray[1]"
          that.setData({
            [multiArray]: pnames,
            multilist: res.result.records
          })
        }
      })
    })
  },
  bindMultiPickerChange: function (e) {
    console.log("携带参数", e.detail.value)
    var that = this
    var multiName = that.data.multiArray[[0]]
    var data = {
      steelName: multiName[e.detail.value[0]],
      theNameId: that.data.multilist[e.detail.value[1] - 1].theNameId
    }
    that.setData({
      gangchangname: data.steelName,
      pinmingid: data.theNameId
    })
    that.getWidth(data)
  },
  // 宽度
  getWidth(data) {
    var that = this
    qingqiu.get("common", data, function (res) {
      console.log(res)
      if (res.success == true) {
        var qiangduindex = 0
        var xincengindex = 0
        var yanseindex = 0
        var youqiindex = 0
        var itemdata = that.data.itemobj
        var qiangdu = ["选择强度"]
        var youqi = ["选择油漆"]
        var xinceng = ["选择锌层"]
        var yanse = ["选择颜色"]
        for(let obj of res.result.densityList){
          qiangdu.push(obj.context)
        }
        for(let obj of res.result.printList){
          youqi.push(obj.context)
        }
        for(let obj of res.result.zinclayerList){
          if(obj.scopeBelow == obj.scopeUp){
            xinceng.push(obj.scopeBelow)
            continue
          }
          xinceng.push(obj.scopeBelow+"~"+obj.scopeUp)
        }
        for(let obj of res.result.colorList){
          yanse.push(obj.context)
        }
        if(that.data.flag != true){
          that.setData({
            kuandu:'',
            houdu:'',
            zhengvalue:'',
            beivalue:'',
            tuceng:'',
            dunwei:''
          })
        }else{
          qiangduindex = utils.getArrIndex(qiangdu,itemdata.density)
          xincengindex = utils.getArrIndex(xinceng,itemdata.zincLayer)
          yanseindex = utils.getArrIndex(yanse,itemdata.color)
          youqiindex = utils.getArrIndex(youqi,itemdata.paint)
          console.log(youqi)
          console.log(youqiindex)
          if(youqiindex != -1){
            that.getyouqi(res.result.printList[youqiindex-1].subentryId,itemdata.paint)
          }
        }
        that.setData({
          setwidth:res.result.width,
          sethoudu:res.result.thickness,
          qiangdu:qiangdu,
          qiangduindex:qiangduindex==-1?0:qiangduindex,
          youqi:youqi,
          youqiindex:youqiindex==-1?0:youqiindex,
          xinceng:xinceng,
          xincengindex:xincengindex==-1?0:xincengindex,
          yanse:yanse,
          yanseindex:yanseindex==-1?0:yanseindex,
          qiangduarray:res.result.densityList,
          youqiarray:res.result.printList,
          xincengarray:res.result.zinclayerList,
          zincLayerobj:res.result.zinclayerList,
          yansearray:res.result.colorList,
          flag:false
        })
      }
    })
  },

  // 获取油漆信息
  getyouqi(name,value){
    var that = this
    var data = {
      subentryId:name,
      text:value
    }
    qingqiu.get("commonPrint",data,function(res){
      if(res.success == true){
        var mohou = [res.result.zhengId]
        mohou.push(res.result.beiId)
        that.setData({
          mohou:mohou,
          zheng:res.result.zheng,
          bei:res.result.bei
        })
      }
    })
  },
  
  // 选择钢厂
  bindMultiPickerColumnChange: function (e) {
    var that = this
    var column = e.detail.column
    var indexs = e.detail.value;
    if (column == 0) {
      var data = {
        name: that.data.multiArray[0][indexs]
      }
      qingqiu.get("theName", data, function (res) {
        if (res.success == true) {
          var names = []
          for (let obj of res.result.records) {
            if (names.length == 0) {
              names.push('选择品名')
            }
            names.push(obj.theNameId_dictText)
          }
          var multiArray = "multiArray[1]"
          var multiIndex = [indexs, 0]
          that.setData({
            [multiArray]: names,
            multiIndex: multiIndex,
            multilist: res.result.records
          })
          console.log(that.data.multilist)
        }
      })
    } else {
      var multiIndex = "multiIndex[1]"
      this.setData({
        [multiIndex]: indexs,
      })
    }
  },
  // 厚度焦点
  houdufocus: function () {
    if (!this.data.sethoudu.length > 0) {
      wx.showToast({
        title: '请选择钢厂',
        icon: 'none',
        duration: 2000
      })
      this.setData({
        houdu: ''
      })
      return
    }
  },
  // 厚度
  houdu: function (e) {
    this.setData({
      houdu: e.detail.value
    })
  },
  // 厚度失去焦点
  retReg: function (e) {
    var minhoudu = this.data.sethoudu[0]
    var maxhoudu = this.data.sethoudu[1]
    if (minhoudu > maxhoudu) {
      wx.showToast({
        title: '该品名没有厚度，请联系管理员',
        icon: 'none',
        duration: 2000
      })
      this.setData({
        houdu: ''
      })
      return
    }
    if (e.detail.value >= minhoudu && e.detail.value <= maxhoudu) {
      this.setData({
        houdu: e.detail.value
      })
    } else {
      wx.showToast({
        title: '数值范围在' + minhoudu + '~' + maxhoudu,
        icon: 'none',
        duration: 2000
      })
      this.setData({
        houdu: ''
      })
      return
    }
  },
  // 宽度焦点
  widthfocus: function () {
    if (!this.data.setwidth.length > 0) {
      wx.showToast({
        title: '请选择钢厂',
        icon: 'none',
        duration: 2000
      })
      this.setData({
        kuandu: ''
      })
      return
    }
  },
  // 宽度
  kuandu: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      kuandu: e.detail.value
    })
  },
  // 宽度最小值限制
  minReg: function (e) {
    var width = Number(e.detail.value)
    var minwidth = Number(this.data.setwidth[0])
    var maxwidth = Number(this.data.setwidth[1])
    if (minwidth > maxwidth) {
      wx.showToast({
        title: '该品名没有宽度，请联系管理员',
        icon: 'none',
        duration: 2000
      })
      this.setData({
        kuandu: ''
      })
      return
    }
    if (width >= minwidth && width <= maxwidth) {
      this.setData({
        kuandu: e.detail.value
      })
    } else {
      this.setData({
        kuandu: ''
      })
      wx.showToast({
        title: '宽度在' + minwidth + "~" + maxwidth + '之间',
        icon: 'none',
        duration: 2000
      })
      return
    }
  },
  // 油漆
  youqiChange: function (e) {
    var that = this
    if (!that.data.youqi.length > 0) {
      wx.showToast({
        title: '请选择钢厂',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (e.detail.value == 0) {
      wx.showToast({
        title: '请选择油漆',
        icon: 'none',
        duration: 2000
      })
      return
    }
    var data = {
      subentryId: that.data.youqiarray[e.detail.value - 1].subentryId,
      text: that.data.youqi[e.detail.value]
    }
    qingqiu.get("commonPrint", data, function (res) {
      console.log(res)
      if (res.success == true) {
        var mohou = [res.result.zhengId]
        mohou.push(res.result.beiId)
        console.log(mohou)
        that.setData({
          mohou: mohou,
          zheng: res.result.zheng,
          bei: res.result.bei
        })
        that.setData({
          youqiindex: e.detail.value
        })
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  // 正面焦点
  zhengfocus: function () {
    var that = this
    if (!that.data.youqi.length > 0) {
      wx.showToast({
        title: '请选择钢厂',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (!that.data.mohou.length > 0) {
      wx.showToast({
        title: '请选择油漆',
        icon: 'none',
        duration: 2000
      })
      that.setData({
        zhengvalue: ''
      })
      return
    }
  },
  // 正面
  zhengmianChange: function (e) {
    this.setData({
      zhengvalue: e.detail.value
    })
  },

  // 正面失去焦点
  zhengmian: function (e) {
    var that = this
    var value = e.detail.value
    var minvalue = that.data.zheng[0]
    var maxvalue = that.data.zheng[1]
    if (minvalue > maxvalue) {
      wx.showToast({
        title: '该油漆下没有正面膜厚，请联系管理员',
        icon: 'none',
        duration: 2000
      })
      that.setData({
        zhengvalue: ''
      })
      return
    }
    if (value >= minvalue && value <= maxvalue) {
      var index = 0
      var data = {
        zheng: value == '' ?0 : value,
        zhengId: that.data.mohou[index],
        bei: that.data.beivalue == '' ? 0 : that.data.zhengvalue
      }
      qingqiu.get("commonMoHou", data, function (res) {
        console.log('正面膜厚',res)
        if (res.success == true) {
          that.setData({
            zhengvalue: value,
            tuceng: res.message
          })
        }
      })
    } else {
      wx.showToast({
        title: '数值在' + minvalue + "~" + maxvalue,
        icon: 'none',
        duration: 2000
      })
      that.setData({
        zhengvalue: ''
      })
      return
    }
  },
  // 背面焦点
  beifocus: function () {
    var that = this
    if (!that.data.youqi.length > 0) {
      wx.showToast({
        title: '请选择钢厂',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (!that.data.mohou.length > 0) {
      wx.showToast({
        title: '请选择油漆',
        icon: 'none',
        duration: 2000
      })
      that.setData({
        zhengvalue: ''
      })
      return
    }
  },
  // 背面
  beimianChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      beivalue: e.detail.value
    })
  },
  // 背面失去焦点
  beimian:function(e){
    var that = this
    var value = e.detail.value
    var minvalue = that.data.bei[0]
    var maxvalue = that.data.bei[1]
    if(minvalue > maxvalue){
      wx.showToast({
        title: '该油漆下没有背面膜厚，请联系管理员',
        icon:'none',
        duration:2000
      })
      that.setData({
        beivalue:''
      })
      return
    }
    if(value>=minvalue&&value<=maxvalue){
      var index = 1
      var data = {
        zheng:that.data.zhengvalue==''?0:that.data.zhengvalue,
        beiId:that.data.mohou[index],
        bei:value
      }
      qingqiu.get("commonMoHou",data,function(res){
        if(res.success == true){
          that.setData({
            beivalue:value,
            tuceng:res.message
          })
        }
      })
    }else{
      wx.showToast({
        title: '数值在'+minvalue+"~"+maxvalue,
        icon:'none',
        duration:2000
      })
      that.setData({
        beivalue:''
      })
      return
    }
  },

  // 被动涂层
  tuceng: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      tuceng: e.detail.value
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
  //吨位
  dunwei: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      dunwei: e.detail.value
    })
  },
  // 跳转到计算结果页面
  calculatorResult: function () {
    var that = this
    if(that.data.xincengindex==0)
    {
      wx.showToast({
        title:'请选择锌层',
        icon:'none',
        duration:2000
      })
      return
    }
    var youqi = that.data.youqi[that.data.youqiindex]
    var data = {
      wxId:app.globalData.wxid,
      steelName:that.data.gangchangname,
      theNameId:that.data.pinmingid,
      thickness:that.data.houdu,
      width:that.data.kuandu,
      paint:youqi,
      front:that.data.zhengvalue,
      rear:that.data.beivalue,
      coat:that.data.tuceng,
      zincLayer:that.data.xinceng[that.data.xincengindex]+'-'+that.data.zincLayerobj[that.data.xincengindex-1].price,
      color:that.data.yanse[that.data.yanseindex],
      density:that.data.qiangdu[that.data.qiangduindex],
      tonnage:that.data.dunwei,
    }
    console.log(data)
    var s = utils.yanzheng(data.areaOneId + ',请选择省|' + data.areaTwoId + ',请选择市|'+data.steelName + ',请选择钢厂|'+data.theNameId+',请选择品名|'+data.thickness + ',请输入厚度|'+data.width+',请输入宽度|'+data.paint+',请选择油漆|'+data.front+',请输入正面膜厚|'+data.rear+',请输入背面膜厚|' + data.coat+',请输入涂层|' +  data.color +',请选择颜色|' + data.density + ',请选择强度|' +data.tonnage+',请选择吨数')
    if(s!=0){
      wx.showToast({
        title:s,
        icon:'none',
        duration:2000
      })
      return
    }
    var v = utils.yanzhengVal(data.areaOneId + ',请选择省|' + data.areaTwoId + ',请选择市|'+data.steelName + ',请选择钢厂|'+data.theNameId+',请选择品名|'+data.paint+',请选择油漆|' + data.zincLayer + ',请选择锌层|' + data.color +',请选择颜色|'+ data.density + ',请选择强度')
    if(v != 0){
      wx.showToast({
        title: v,
        icon:'none',
        duration:2000
      })
      return
    }
    var objval = data
    console.log(data)
    qingqiu.get("faBuJiSuan",data,function(res){
      console.log(res)
      if(res.success == true){
        var obj = JSON.stringify(res.result)
        objval.theNameId_dictText = that.data.multiArray[1][that.data.multiIndex[1]],
        objval.zincLayer = that.data.xinceng[that.data.xincengindex]
        objval = JSON.stringify(objval) 
        wx.navigateTo({
          url: '../calculatorResult/calculatorResult?obj=' + obj + '&objval='+ objval,
        })
      }else{
        wx.showToast({
          title: res.message,
          icon:'none',
          duration:2000
        })
        return
      }
    },'post')
  },
  // 选择规格 弹窗显示
  showModal1: function () {
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
    setTimeout(function () {
      animation.opacity(1).rotateX(0).step();
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //选择规格 弹窗关闭
  hideModal1: function () {
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
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus1: false
      })
    }.bind(this), 200)
  },

})