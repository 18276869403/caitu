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
    viewUrl:api.viewUrl,
    mohouStatus:0,
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
    xinceng: ['选择镀层量'],
    xincengindex: 0,
    yanse: ['选择颜色'],
    yanseindex: 0,
    zhengmian:['选择正面膜厚'],
    zhengmianindex:0,
    beimian:['选择背面膜厚'],
    beimianindex:0,
    multiArray: [],
    multilist: [],
    setwidth: [],
    front:'',
    gangchanglist:[],
    gangchangname:'',
    itemobj:[],
    steel:{},
    zincLayerobj:'',
    zhengmianobj:'',
    beimianobj:'',
    zhengmianid:[],
    beimianid:[],
    select:1,
    tucengprice:'',
    xieyi:api.xieyi
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.mohouStatus != undefined){
      this.setData({
        mohouStatus:options.mohouStatus
      })
    }
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
        gangchangname:data.steelName, 
        xincengPrice:data.xinceng,
        tucengprice:data.tuceng
      })
      this.bindchushihua(data.steelName,data.theNameId_dictText)
      this.getWidth({steelName:data.steelName,theNameId:data.theNameId})
      this.gethuodu({steelName:data.steelName,theNameId:data.theNameId,text:data.paint})
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
  // 钢厂选择事件
  bindMultiPickerChange: function (e) {
    console.log("携带参数", e.detail.value)
    if(e.detail.value == 0 && e.detail.column == 0){
      wx.showToast({
        title: '请选择钢厂',
        icon:'none'
      })
      return
    }
    if(e.detail.value == 0 && e.detail.column == 1){
      wx.showToast({
        title: '请选择品名',
        icon:'none'
      })
      return
    }
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
    console.log(data)
    qingqiu.get("common", data, function (res) {
      console.log(res)
      if (res.success == true) {
        var qiangduindex = 0
        var yanseindex = 0
        var youqiindex = 0
        var itemdata = that.data.itemobj
        var qiangdu = ["选择强度"]
        var youqi = ["选择油漆"]
        var yanse = ["选择颜色"]
        for(let obj of res.result.densityList){
          qiangdu.push(obj.context)
        }
        for(let obj of res.result.printList){
          youqi.push(obj.context)
        }
        for(let obj of res.result.colorList){
          yanse.push(obj.context)
        }
        if(that.data.flag != true){
          that.setData({
            zhengvalue:'',
            beivalue:'',
            tuceng:'',
            xincengindex:0,
            zhengmianindex:0,
            beimianindex:0
          })
        }else{
          qiangduindex = utils.getArrIndex(qiangdu,itemdata.density)
          yanseindex = utils.getArrIndex(yanse,itemdata.color)
          youqiindex = utils.getArrIndex(youqi,itemdata.paint)
          if(youqiindex != -1){
            that.getyouqi(res.result.printList[youqiindex-1].subentryId,itemdata.paint)
          }
        }
        that.setData({
          steel:res.result.steel,
          setwidth:res.result.width,
          sethoudu:res.result.thickness,
          qiangdu:qiangdu,
          qiangduindex:qiangduindex==-1?0:qiangduindex,
          youqi:youqi,
          youqiindex:youqiindex==-1?0:youqiindex,
          yanse:yanse,
          yanseindex:yanseindex==-1?0:yanseindex,
          qiangduarray:res.result.densityList,
          youqiarray:res.result.printList,
          yansearray:res.result.colorList,
          flag:false,
        })
      }
    })
  },

  // 获取镀层量
  // getXC:function(data){
  //   var that = this
  //   var itemdata = that.data.itemobj
  //   var xincengindex = 0
  //   qingqiu.get("getXC",data,function(res){
  //     console.log('镀层量',res)
  //     if(res.success == true){
  //       var xinceng = ['选择镀层量']
  //       for(let obj of res.result){
  //         xinceng.push(obj.scope)
  //       }
  //       console.log('长度',itemdata.length)
  //       if(itemdata != null && itemdata!=undefined && itemdata.length != 0){
  //         xincengindex = utils.getArrIndex(xinceng,itemdata.zincLayer)
  //         that.setData({
  //           xincengindex:xincengindex==-1?0:xincengindex,
  //         })
  //       }else{
  //         that.setData({ xincengindex:xincengindex })
  //       }
  //       that.setData({
  //         xinceng:xinceng,
  //         zincLayerobj:res.result
  //       })
  //     }
  //   })
  // },
  // 获取油漆信息
  getyouqi(name,value){
    var that = this
    var data = {
      subentryId:name,
      text:value
    }
    qingqiu.get("commonPrint",data,function(res){
      console.log(res)
      if(res.success == true){
        if(res.result.zhengId == 0 || res.result.bei == 0){
          wx.showToast({
            title: '该油漆没有正/背面膜厚',
            icon:'none',
            duration:2000
          })
          return
        }
        var mohou = [res.result.zhengId]
        mohou.push(res.result.beiId)
        that.setData({
          mohou:mohou,
          zheng:res.result.zheng,
          bei:res.result.bei,
        })
      }
    })
  },
  // 选择钢厂
  bindMultiPickerColumnChange: function (e) {
    var that = this
    var column = e.detail.column
    var indexs = e.detail.value;
    if(column == 0 && indexs == 0){
      wx.showToast({
        title: '请选择钢厂',
        icon:'none'
      })
      return
    }
    if(column == 1 && indexs == 0){
      wx.showToast({
        title: '请选择品名',
        icon:'none'
      })
      return
    }
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
    that.setData({
      youqiindex: e.detail.value
    })
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
    console.log(data)
    qingqiu.get("commonPrint", data, function (res) {
      console.log(res)
      if (res.success == true) {
        var mohou = [res.result.zhengId]
        mohou.push(res.result.beiId)
        that.setData({
          mohou: mohou,
          zheng: res.result.zheng,
          bei: res.result.bei,
          zhengvalue:'',
          beivalue:'',
          tuceng:''
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
    // that.getXC({steelName:that.data.gangchangname,theNameId:that.data.pinmingid,text:that.data.youqi[e.detail.value]})
    var data = {
      steelName:that.data.gangchangname,
      text:that.data.youqi[that.data.youqiindex],
      theNameId:that.data.pinmingid
    }
    that.gethuodu(data)
  },
  // 正背面厚度-镀层量
gethuodu(data){
  var that = this
  // var data = {
  //   steelName:that.data.gangchangname,
  //   text:that.data.youqi[that.data.youqiindex],
  //   theNameId:that.data.pinmingid
  // }
  that.data.zhengmian=['选择正面膜厚']
  that.data.beimian=['选择背面膜厚']
  that.data.xinceng=['选择镀层量']
  that.data.zincLayerobj=[]
  that.data.zhengmianobj=[]
  that.data.beimianobj=[]
  that.data.zhengmianid=[]
  that.data.beimianid=[]
  var text=data.text
  console.log(data)
  qingqiu.get("getXC",data,function(res){
    console.log(res)
    if(res.success == true){
      for(let obj of res.result.zlist){
        that.data.zhengmian.push(obj.scope)
        that.data.zhengmianobj.push(obj.price)
        that.data.zhengmianid.push(obj.id)
      }
      for(let obj1 of res.result.blist){
        that.data.beimian.push(obj1.scope)
        that.data.beimianobj.push(obj1.price)
        that.data.beimianid.push(obj1.id)
      }
      for(let obj2 of res.result.xclist){
        that.data.xinceng.push(obj2.scope)
        that.data.zincLayerobj.push(obj2.price)
      }
      if(that.data.itemobj!=''){
        that.data.zhengmianindex = utils.getArrIndex(that.data.zhengmian,that.data.itemobj.front)=='-1'?'0':utils.getArrIndex(that.data.zhengmian,that.data.itemobj.front)
        that.data.beimianindex = utils.getArrIndex(that.data.beimian,that.data.itemobj.rear)=='-1'?'0':utils.getArrIndex(that.data.beimian,that.data.itemobj.rear)
        that.data.xincengindex = utils.getArrIndex(that.data.xinceng,that.data.itemobj.zincLayer)=='-1'?'0':utils.getArrIndex(that.data.xinceng,that.data.itemobj.zincLayer)
      }
      debugger
      that.setData({
        zhengmianindex:1,
        beimianindex:1,
        xincengindex:1,
        zhengmian:that.data.zhengmian,
        beimian:that.data.beimian,
        xinceng:that.data.xinceng,
        zincLayerobj:that.data.zincLayerobj,
        zhengmianobj:that.data.zhengmianobj,
        beimianobj:that.data.beimianobj,
        zhengmianid:that.data.zhengmianid,
        beimianid:that.data.beimianid
      })
      if(that.data.mohouStatus == 0){
        var dataobj = {}
        if(that.data.zhengmian.length > 0){dataobj.zheng = that.data.zhengmian[1]}else{ 
          wx.showToast({
            title: '该油漆没有正面膜厚',
            icon:'none',
            duration:2000
          })
          return
        }
        if(that.data.beimian.length > 0){ dataobj.bei = that.data.beimian[1]}else{
          wx.showToast({
            title: '该油漆没有背面膜厚',
            icon:'none',
            duration:2000
          })
          return
        }
        if(that.data.zhengmianid.length > 0){dataobj.zhengId = that.data.zhengmianid[0]}
        if(that.data.beimianid.length > 0){dataobj.beiId = that.data.beimianid[0]}
        if(that.data.youqi.length > 0){dataobj.text = that.data.youqi[that.data.youqiindex]}
      }
        if(dataobj!=undefined){
          that.getmohou(dataobj)
        }else{
          var data = {
            zheng:that.data.zhengmian[that.data.zhengmianindex],
            bei:that.data.beimian[that.data.beimianindex],
            zhengId:that.data.zhengmianid[that.data.zhengmianindex],
            beiId:that.data.beimianid[that.data.beimianindex],
            text:text
          }
          that.getmohou(data)
        }
    }
  })
},
  // 膜厚
  getmohou(data){
    var that = this
    console.log(data)
    qingqiu.get("commonMoHou",data,function(res){
      if(res.success == true){
        that.data.tuceng=res.result.context
        that.data.tucengprice=res.result.price
        that.setData({
          tuceng:that.data.tuceng,
          tucengprice:that.data.tucengprice
        })
        console.log(that.data.tuceng)
      }
    })
  },
  // 正面
  zhengmianChange: function(e) {
    var that=this
    that.data.zhengmianindex=0
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      zhengmianindex: e.detail.value
    })
    var data = {
      zheng:that.data.zhengmian[that.data.zhengmianindex]=='选择正面膜厚'?'':that.data.zhengmian[that.data.zhengmianindex],
      bei:that.data.beimian[that.data.beimianindex]=='选择背面膜厚'?'':that.data.beimian[that.data.beimianindex],
      zhengId:that.data.zhengmianid[that.data.zhengmianindex-1]==undefined?'':that.data.zhengmianid[that.data.zhengmianindex-1],
      beiId:that.data.beimianid[that.data.beimianindex-1]==undefined?'':that.data.beimianid[that.data.beimianindex-1],
      text:that.data.youqi[that.data.youqiindex]
    }
    console.log(data)
    that.getmohou(data)
  },
  // 背面
  beimianChange: function(e) {
    var that=this
    that.data.beimianindex=''
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      beimianindex: e.detail.value
    })
    var data = {
      zheng:that.data.zhengmian[that.data.zhengmianindex]=='选择正面膜厚'?'':that.data.zhengmian[that.data.zhengmianindex],
      bei:that.data.beimian[that.data.beimianindex]=='选择背面膜厚'?'':that.data.beimian[that.data.beimianindex],
      zhengId:that.data.zhengmianid[that.data.zhengmianindex-1]==undefined?'':that.data.zhengmianid[that.data.zhengmianindex-1],
      beiId:that.data.beimianid[that.data.beimianindex-1]==undefined?'':that.data.beimianid[that.data.beimianindex-1],
      text:that.data.youqi[that.data.youqiindex]
    }
    console.log(data)
    that.getmohou(data)
  },
  // 被动涂层
  tuceng: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      tuceng: e.detail.value
    })
  },
  // 镀层量
  xincengCancel:function(){
    if(this.data.youqiindex == 0){
      wx.showToast({
        title: '请选择油漆',
        icon:'none',
        duration:2000
      })
      return
    }
  },
  // 镀层量
  xincengChange: function (e) {
    if(this.data.youqiindex == 0){
      wx.showToast({
        title: '请选择油漆',
        icon:'none',
        duration:2000
      })
      return
    }
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
    var youqi = that.data.youqi[that.data.youqiindex]
    var data = {
      wxId:app.globalData.wxid,
      steelName:that.data.gangchangname,
      theNameId:that.data.pinmingid,
      thickness:that.data.houdu,
      width:that.data.kuandu,
      paint:youqi,
      front:that.data.zhengmian[that.data.zhengmianindex]+'|'+that.data.zhengmianobj[that.data.zhengmianindex-1],
      rear:that.data.beimian[that.data.beimianindex]+'|'+that.data.beimianobj[that.data.beimianindex-1],
      coat:that.data.tuceng+'|'+that.data.tucengprice,
      zincLayer:that.data.xinceng[that.data.xincengindex]+'|'+that.data.zincLayerobj[that.data.xincengindex-1],
      color:that.data.yanse[that.data.yanseindex],
      density:that.data.qiangdu[that.data.qiangduindex],
      tonnage:that.data.dunwei,
      backup1:that.data.steel.pricingPrice
    }
    console.log(data)
    var s = utils.yanzheng(data.steelName + ',请选择钢厂|'+data.theNameId+',请选择品名|'+data.thickness + ',请输入厚度|'+data.width+',请输入宽度|'+data.paint+',请选择油漆|' +  data.color +',请选择颜色|' + data.density + ',请选择强度|' +data.tonnage+',请选择吨数')
    if(s!=0){
      wx.showToast({
        title:s,
        icon:'none',
        duration:2000
      })
      return
    }
    var v = utils.yanzhengVal(data.steelName + ',请选择钢厂|'+data.theNameId+',请选择品名|'+data.paint+',请选择油漆|' + data.zincLayer + ',请选择镀层量|' + data.color +',请选择颜色|'+ data.density + ',请选择强度'+data.front+',请输入正面膜厚|'+data.rear+',请输入背面膜厚|' + data.coat+',请输入涂层|')
    if(v != 0){
      wx.showToast({
        title: v,
        icon:'none',
        duration:2000
      })
      return
    }
    if(that.data.xincengindex==0)
    {
      wx.showToast({
        title:'请选择镀层量',
        icon:'none',
        duration:2000
      })
      return
    }
    if(that.data.select=='1')
    {
      wx.showToast({
        title:'请勾选用户协议！',
        icon:'none',
        duration:2000
      })
      return
    }
    console.log(data)
    qingqiu.get("faBuJiSuan",data,function(res){
      console.log(res)
      if(res.success == true){
        var objval = res.result.calculateVoId
        wx.redirectTo({
          url: '../calculatorResult/calculatorResult?obj=' + objval,
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
//改变选框状态(免责协议)
change: function(e) {
  var that = this
  //得到选中状态
  var select = e.currentTarget.dataset.xid
  if (select == "1") {
    var stype = "2"

  } else {
    var stype = "1"
  }
  //赋值
  that.setData({
    select: stype
  })

},
// 服务规则页面显示
showModal2: function() {
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
    showModalStatus2: true
  })
  setTimeout(function() {
    animation.opacity(1).rotateX(0).step();
    this.setData({
      animationData: animation.export()
    })
  }.bind(this), 200)
},
//服务规则页面关闭
hideModal2: function() {
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
      showModalStatus2: false
    })
  }.bind(this), 200)
},
})