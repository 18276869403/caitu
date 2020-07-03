// pages/kucunDetails/kucunDetails.js
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
    flag:true,
    qiangduarray:[],
    youqiarray:[],
    xincengarray:[],
    yansearray:[],
    setwidth:[],
    sethoudu:[],
    kuandu:'',
    houdu:'',
    gangchangname:'',
    pinmingid:'',
    cangkuindex: 0,
    multiIndex: [0, 0, 0],
    // region: ['省', '市', '区'],
    multiIndex1:[0,0],
    multiArray1:[],
    multiArray: [[],[]],
    multilist:[],
    cityList:[],
    city:[],
    zhengvalue:'',
    youqi:['选择油漆'],
    youqiindex: 0,
    qiangdu:['选择强度'],
    qiangduindex: 0,
    xinceng:['选择锌层'],
    xincengindex: 0,
    yanse:['选择颜色'],
    zhengmian:['选择正面膜厚'],
    zhengmianindex:0,
    beimian:['选择背面膜厚'],
    beimianindex:0,
    yanseindex: 0,
    zheng:[],
    fan:[],
    mohou:[],
    zhengvalue:'',
    beivalue:'',
    tuceng:'',
    imglist:[],
    bindimg:[],
    kcid:'',
    zhengmianid:[],
    beimianid:[],
    select:1,
    xieyi:api.xieyi,
    itemobj:{}
    // multiArray: [
    //   ['选择钢厂', '广州宝钢', '上海宝钢', '浙江宝钢'],
    //   ['选择彩涂品', '镀铝锌卷', '镀铝锌彩涂卷', '镀铝锌']
    // ],
    // youqiarray: ['选择油漆', 'PE', 'PE1', 'PE2', 'PE3'],
    // zhengmianarray: ['选择正面膜厚', '正面25μ', '正面25μ1', '正面25μ2', '正面25μ3'],
    // beimianarray: ['选择背面膜厚', '选择膜厚', '选择膜厚1', '选择膜厚2', '选择膜厚3'],
    // xincengarray: ['选择锌层', '100', '1001', '1002', '1003'],
    // yansearray: ['选择颜色', '标准', '标准1', '标准2', '标准3'],
    // qiangduarray: ['选择强度', 'TS250GD+AZ', 'TS250GD+AZ1', 'TS250GD+AZ11', 'TS250GD+AZ111'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAddress()
    this.getstell()
    if(options.obj != null){
      this.getkuncun(options.obj)
      this.setData({
        kcid:options.obj
      })
    }else{
      this.getkuncun(this.data.kcid)
    }
  },

  // 获取市索引
  getshiindex(pid,areaTwoId_dictText){
    var that = this
    console.log(pid,areaTwoId_dictText)
    qingqiu.get("shi",{pid:pid},function(res){
      console.log(res)
      if(res.success == true){
        var cityname = []
        for(let obj of res.result){
          if(cityname.length==0){
            cityname.push("选择市")
          }
          cityname.push(obj.itemText)
        }
        var multiArray1 = "multiArray1[1]"
        that.setData({
          [multiArray1]:cityname,
          city:res.result
        })
        var multiIndex1_2 = utils.getArrIndex(cityname,areaTwoId_dictText)
        if(multiIndex1_2 != -1){
          var multiIndex1 = "multiIndex1[1]"
          that.setData({
            [multiIndex1]:multiIndex1_2
          })
        }
      }
    })
  },
  // 获取品名索引
  getpmindex(name,data){
    var that = this
    var theName = data
    var pnames = ['选择品名']
    qingqiu.get("theName",{name:name},function(res){
      console.log(res)
      if(res.success == true){
        for(let obj of res.result.records){
          pnames.push(obj.theNameId_dictText)
        }
        var multiArray = "multiArray[1]"
        that.setData({
          [multiArray]:pnames,
          multilist:res.result.records
        })
        var index = utils.getArrIndex(pnames,theName)
        var theNameId = res.result.records[index-1].theNameId
        if(index != -1){
          var multiIndex = "multiIndex[1]"
          that.setData({
            [multiIndex]:index
          })
        }
        var data = {
          steelName:name,
          theNameId:theNameId
        }
        that.setData({
          gangchangname:name,
          pinmingid:data.theNameId
        })
        that.getWidth(data)
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

  // 获取库存信息
  getkuncun(id){
    var that = this
    var bindimg = []
    var imglist = []
    var data = {
      invenId:id
    }
    qingqiu.get("selectInventById",data,function(res){
      console.log('库存详情',res.result[0])
      if(res.success == true){
        var data = res.result[0]
        if(data.upUrl.indexOf(',') !=  -1){
          data.upUrl = data.upUrl.split(',')
          for(let obj of data.upUrl){
            bindimg.push(api.viewUrl + obj)
            imglist.push(obj)
          }
        }else{
          bindimg.push(api.viewUrl + data.upUrl)
          imglist.push(data.upUrl)
        }
        // 获取省
        var multiIndex1_1 = utils.getArrIndex(that.data.multiArray1[0],data.areaOneText)
        if(multiIndex1_1 != -1){
          var multiIndex1 = "multiIndex1[0]"
          that.setData({
            [multiIndex1]:multiIndex1_1
          })
        }
        console.log(that.data.cityList)
        console.log(multiIndex1_1)
        var pid = that.data.cityList[multiIndex1_1-1].itemValue
        // 市
        that.getshiindex(pid,data.areaTwoText)
        var multiIndex_1 = utils.getArrIndex(that.data.multiArray1[0],data.areaTwoText)
        if(multiIndex_1 != -1){
          var multiIndex = "multiIndex[0]"
          that.setData({
            [multiIndex]:multiIndex_1
          })
        }
        // 钢厂
        var gcid = utils.getArrIndex(that.data.multiArray[0],data.steelName)
        if(gcid != -1){
          var multiIndex = "multiIndex[0]"
          that.setData({
            [multiIndex]:gcid
          })
        }
        // 品名
        that.getpmindex(data.steelName,data.theNameText)
        that.setData({
          itemobj:data,
          bindimg:bindimg,
          imglist:imglist,
          houdu:data.thickness,
          kuandu:data.width,
          zhengvalue:data.front,
          beivalue:data.rear,
          tuceng:data.coat,
          dunwei:data.tonnage
        })
        that.gethoudu({steelName:data.steelName,theNameId:data.theNameId,text:data.paint})
      }else{
        wx.showToast({
          title: res.message,
          icon:'none',
          duration:1000
        })
      }
    })
  },
  // 获取省
  getAddress(){
    var that = this
    qingqiu.get("shengFen",null,function(res){
      if(res.success == true){
        var names = []
        for(let obj of res.result){
          if(names.length==0){
            names.push("选择省")
          }
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
              if(cityname.length==0){
                cityname.push("选择市")
              }
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

  // 钢厂
  getstell(){
    var that = this
    qingqiu.get("stell",null,function(res){
      var list = res.result;
      var names = [];
      var pnames = []
      for(let obj of list){
        if(names.length==0){
          names.push("选择钢厂")
        }
        if(pnames.length==0){
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



  // 跳转到成功页面
  kucunSubmitSuccess: function () {
    var that = this
    var cityindex = that.data.multiIndex1
    var citylist = that.data.cityList
    var city = that.data.city
    var youqi = that.data.youqi[that.data.youqiindex]
    var imgurl = ''
    for (let obj of that.data.imglist){
      if(imgurl == ''){
        imgurl = obj
      }else{
        imgurl = imgurl + ',' + obj
      }
    }
    var data = {
      id:that.data.kcid,
      wxUserId:app.globalData.wxid,
      areaOneId:citylist[cityindex[0]-1].itemValue,
      areaTwoId:city[cityindex[1]-1].itemValue,
      steelName:that.data.gangchangname,
      theNameId:that.data.pinmingid,
      thickness:that.data.houdu,
      width:that.data.kuandu,
      paint:youqi,
      front:that.data.zhengvalue,
      rear:that.data.beivalue,
      coat:that.data.tuceng,
      zincLayer:that.data.xinceng[that.data.xincengindex],
      color:that.data.yanse[that.data.yanseindex],
      density:that.data.qiangdu[that.data.qiangduindex],
      tonnage:that.data.dunwei,
      upUrl:imgurl
    }
    console.log(data)
    var s = utils.yanzheng(data.areaOneId + ',请选择省|' + data.areaTwoId + ',请选择市|'+data.steelName + ',请选择钢厂|'+data.theNameId+',请选择品名|'+data.thickness + ',请输入厚度|'+data.width+',请输入宽度|'+data.paint+',请选择油漆|'+data.front+',请输入正面膜厚|'+data.rear+',请输入背面膜厚|' + data.coat+',请输入涂层|' + data.zincLayer + ',请选择锌层|' + data.color +',请选择颜色|' + data.density + ',请选择强度|' +data.tonnage+',请选择吨数|'+data.upUrl + ',请上传图片')
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
    if(that.data.select!=2){
      wx.showToast({
        title: '请勾选用户协议',
        icon:'none',
        duration:2000
      })
      return
    }
    qingqiu.get("updateInventById",data,function(res){
      console.log(res)
      if(res.success == true){
        wx.showToast({
          title: '保存成功',
          icon:'success',
          duration:2000
        })
        setTimeout(function(){
          that.onLoad()
        },1000)
      }else{
        wx.showToast({
          title: res.message,
          icon:'none',
          duration:2000
        })
        return
      }
    },'put')
  },

  bindMultiPickerChangeCity:function(e){
  },

  // 省份触发事件
  bindMultiPickerColumnChangeCity:function(e){
    var indexs = e.detail.value
    var column = e.detail.column
    var that = this
    if(column == 0){
      var data = {
        pid:that.data.cityList[indexs-1].itemValue
      }
      qingqiu.get("shi",data,function(res){
        if(res.success == true){
            var cityname = []
            for(let obj of res.result){
              if(cityname.length==0){
                cityname.push("选择市")
              }
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

  // 选择仓库
  RegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  // 选择钢厂
  bindMultiPickerChange: function (e) {
    var multiName = this.data.multiArray[[0]]
    var data = {
      steelName:multiName[e.detail.value[0]],
      theNameId:this.data.multilist[e.detail.value[1]-1].theNameId
    }
    this.setData({
      gangchangname:data.steelName,
      pinmingid:data.theNameId
    })
    this.getWidth(data)
  },

  // 获取锌层
  getXC:function(data){
    var that = this
    var itemdata = that.data.itemobj
    console.log('数据',itemdata)
    var xincengindex = 0
    qingqiu.get("getXC",data,function(res){
      console.log('锌层',res)
      if(res.success == true){
        var xinceng = ['选择锌层']
        for(let obj of res.result){
          xinceng.push(obj.scope)
        }
        console.log(itemdata)
        if(itemdata != null && itemdata != undefined){
          console.log(itemdata.zincLayer)
          console.log(xinceng)
          xincengindex = utils.getArrIndex(xinceng,itemdata.zincLayer)
          console.log(xincengindex)
          that.setData({
            xincengindex:xincengindex==-1?0:xincengindex,
          })
        }else{
          that.setData({ xincengindex:xincengindex })
        }
        that.setData({
          xinceng:xinceng,
          zincLayerobj:res.result
        })
      }
    })
  },

  // 宽度
  getWidth(data){
    var that = this
    qingqiu.get("common",data,function(res){
      console.log(res)
      if(res.success == true){
        var qiangduindex = 0
        // var xincengindex = 0
        var yanseindex = 0
        var youqiindex = 0
        var itemdata = that.data.itemobj
        console.log(itemdata)
        var qiangdu = ["选择强度"]
        var youqi = ["选择油漆"]
        // var xinceng = ["选择锌层"]
        var yanse = ["选择颜色"]
        for(let obj of res.result.densityList){
          qiangdu.push(obj.context)
        }
        for(let obj of res.result.printList){
          youqi.push(obj.context)
        }
        // for(let obj of res.result.zinclayerList){
        //   if(obj.scopeBelow == obj.scopeUp){
        //     xinceng.push(obj.scopeBelow)
        //     continue
        //   }
        //   xinceng.push(obj.scopeBelow+"~"+obj.scopeUp)
        // }
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
          // xincengindex = utils.getArrIndex(xinceng,itemdata.zincLayer)
          yanseindex = utils.getArrIndex(yanse,itemdata.color)
          youqiindex = utils.getArrIndex(youqi,itemdata.paint)
          console.log(youqiindex)
          if(youqiindex != -1){
            console.log(res.result.printList)
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
          // xinceng:xinceng,
          // xincengindex:xincengindex==-1?0:xincengindex,
          yanse:yanse,
          yanseindex:yanseindex==-1?0:yanseindex,
          qiangduarray:res.result.densityList,
          youqiarray:res.result.printList,
          xincengarray:res.result.zinclayerList,
          yansearray:res.result.colorList,
          flag:false,
        })
      }
    })
  },
  // 选择钢厂
  bindMultiPickerColumnChange: function(e) {
    var that = this
    var column = e.detail.column
    var indexs = e.detail.value;
    if(column == 0){
      var data = {
        name:that.data.multiArray[0][indexs]
      }
      qingqiu.get("theName",data,function(res){
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
          console.log(that.data.multilist)
        }
      })
    }else{
      var multiIndex = "multiIndex[1]"
      this.setData({
        [multiIndex]: indexs,
      })
    }
  },

  // 彩涂品名
  caituChange: function (e) {
    this.setData({
      caituindex: e.detail.value
    })
  },

  // 厚度焦点
  houdufocus:function(){
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
  },

  // 厚度
  houdu: function(e) {
    this.setData({
      houdu: e.detail.value
    })
  },

  retReg:function(e){
    var minhoudu = this.data.sethoudu[0]
    var maxhoudu = this.data.sethoudu[1]
    if(minhoudu > maxhoudu){
      wx.showToast({
        title: '该品名没有厚度，请联系管理员',
        icon:'none',
        duration:2000
      })
      this.setData({
        houdu:''
      })
      return
    }
    if(e.detail.value>=minhoudu&&e.detail.value<=maxhoudu){
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
      return
    }
  },

  // 宽度焦点
  widthfocus:function(){
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
  },
  // 宽度
  kuandu: function(e) {
    this.setData({
      kuandu: e.detail.value
    })
  },
  // 宽度最小值限制
  minReg:function(e){
    var width = Number(e.detail.value) 
    var minwidth = Number(this.data.setwidth[0])
    var maxwidth = Number(this.data.setwidth[1])
    if(minwidth > maxwidth){
      wx.showToast({
        title: '该品名没有宽度，请联系管理员',
        icon:'none',
        duration:2000
      })
      this.setData({
        kuandu:''
      })
      return
    }
    if(width >= minwidth && width <= maxwidth){
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

  // 油漆
  youqiChange: function (e) {
    var that = this
    if(!that.data.youqi.length>0){
      wx.showToast({
        title: '请选择钢厂',
        icon:'none',
        duration:2000
      })
      return
    }
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
        var mohou = [res.result.zhengId]
        mohou.push(res.result.beiId)
        that.setData({
          mohou:mohou,
          zheng:res.result.zheng,
          bei:res.result.bei,
          youqiindex: e.detail.value
        })
      }else{
        that.setData({
          youqiindex: 0
        })
      }
    })
    that.setData({
      tuceng: ''
    })
    var data = {
      steelName:that.data.gangchangname,
      text:that.data.youqi[e.detail.value],
      theNameId:that.data.pinmingid
    }
    that.gethoudu(data)
  },
  // 正背面厚度-镀层量
  gethoudu(data){
    var that = this
    // var data = {
    //   steelName:that.data.gangchangname,
    //   text:that.data.youqi[that.data.youqiindex],
    //   theNameId:that.data.pinmingid
    // }
    that.data.zhengmian=['选择正面膜厚']
    that.data.beimian=['选择背面膜厚']
    that.data.xinceng=['选择镀层量']
    that.data.zhengmianid=[]
    that.data.beimianid=[]
    console.log(data)
    qingqiu.get("getXC",data,function(res){
      if(res.success == true){
        for(let obj of res.result.zlist){
          that.data.zhengmian.push(obj.scope)
          that.data.zhengmianid.push(obj.id)
        }
        for(let obj1 of res.result.blist){
          that.data.beimian.push(obj1.scope)
          that.data.beimianid.push(obj1.id)
        }
        for(let obj2 of res.result.xclist){
          that.data.xinceng.push(obj2.scope)
        }
        if(that.data.itemobj!=''){
          that.data.zhengmianindex = utils.getArrIndex(that.data.zhengmian,that.data.itemobj.front)=='-1'?'0':utils.getArrIndex(that.data.zhengmian,that.data.itemobj.front)
          that.data.beimianindex = utils.getArrIndex(that.data.beimian,that.data.itemobj.rear)=='-1'?'0':utils.getArrIndex(that.data.beimian,that.data.itemobj.rear)
          that.data.xincengindex = utils.getArrIndex(that.data.xinceng,that.data.itemobj.zincLayer)=='-1'?'0':utils.getArrIndex(that.data.xinceng,that.data.itemobj.zincLayer)
        }
        that.setData({
          zhengmianindex:that.data.zhengmianindex,
          beimianindex:that.data.beimianindex,
          xincengindex:that.data.xincengindex,
          zhengmian:that.data.zhengmian,
          beimian:that.data.beimian,
          xinceng:that.data.xinceng,
          zhengmianid:that.data.zhengmianid,
          beimianid:that.data.beimianid
        })
        console.log(that.data.zhengmian)
        console.log(that.data.beimian)
        console.log(that.data.xinceng)
      }
    })
  },
 // 膜厚
 getmohou(data){
  var that = this
  qingqiu.get("commonMoHou",data,function(res){
    if(res.success == true){
      that.data.tuceng=res.result.context
      that.setData({
        tuceng:that.data.tuceng
      })
      console.log(that.data.tuceng)
    }
  })
},
  // 正面膜厚
  zhengmianChange:function(e){
    var that=this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      zhengmianindex: e.detail.value
    })
    var data={
      zheng:that.data.zhengmian[that.data.zhengmianindex]=='选择正面膜厚'?'':that.data.zhengmian[that.data.zhengmianindex],
      bei:that.data.beimian[that.data.beimianindex]=='选择背面膜厚'?'':that.data.beimian[that.data.beimianindex],
      zhengId:that.data.zhengmianid[that.data.zhengmianindex-1]==undefined?'':that.data.zhengmianid[that.data.zhengmianindex-1],
      beiId:that.data.beimianid[that.data.beimianindex-1]==undefined?'':that.data.beimianid[that.data.beimianindex-1],
      text:that.data.youqi[that.data.youqiindex]
    }
    that.getmohou(data)
  },
  // 背面膜厚
  beimianChange:function(e){
    var that=this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      beimianindex: e.detail.value
    })
    var data={
      zheng:that.data.zhengmian[that.data.zhengmianindex]=='选择正面膜厚'?'':that.data.zhengmian[that.data.zhengmianindex],
      bei:that.data.beimian[that.data.beimianindex]=='选择背面膜厚'?'':that.data.beimian[that.data.beimianindex],
      zhengId:that.data.zhengmianid[that.data.zhengmianindex-1]==undefined?'':that.data.zhengmianid[that.data.zhengmianindex-1],
      beiId:that.data.beimianid[that.data.beimianindex-1]==undefined?'':that.data.beimianid[that.data.beimianindex-1],
      text:that.data.youqi[that.data.youqiindex]
    }
    that.getmohou(data)
  },

  // 锌层
  xincengChange: function (e) {
    this.setData({
      xincengindex: e.detail.value
    })
  },
  // 颜色
  yanseChange: function (e) {
    this.setData({
      yanseindex: e.detail.value
    })
  },
  //强度
  qiangduChange: function (e) {
    this.setData({
      qiangduindex: e.detail.value
    })
  },
   // 吨位
   dunwei: function(e) {
    this.setData({
      dunwei: e.detail.value
    })
  },
  // 图片上传
  imgUpload:function(){
    var that = this
    var bindimg = []
    wx.chooseImage({
      count:1,
      sizeType:['compressed'],
      sourceType:['album', 'camera'],
      success:function(res){
        var tempFilePaths = res.tempFilePaths
        var bindimg = that.data.bindimg
        console.log(tempFilePaths[0])
        bindimg.push(tempFilePaths[0])
        that.setData({
          bindimg:bindimg
        })
        wx.uploadFile({
          url: api.upload,
          filePath: tempFilePaths[0],
          header: {
            "Content-Type": "multipart/form-data"
          },
          formData: {
            method: 'POST' //请求方式
          },
          name: 'file',
          success:function(re){
            console.log(re)
            if(re.statusCode == 200){
              var data = JSON.parse(re.data)
              var imglist = that.data.imglist
              imglist.push(data.message)
              console.log(data.message)
              that.setData({
                imglist:imglist
              })
            }else{
              wx.showToast({
                title: re.errMsg,
                icon:'none',
                duration:1000
              })
            }
          }
        })
      }
    })
  },
  // 删除图片
  delimg:function(e){
    var imgs = this.data.bindimg
    var imgurl = this.data.imglist
    var index = e.currentTarget.dataset.index
    imgs.splice(index,1)
    imgurl.splice(index,1)
    this.setData({
      bindimg:imgs,
      imglist:imgurl
    })
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