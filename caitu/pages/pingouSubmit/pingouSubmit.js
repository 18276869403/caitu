// pages/pingouSubmit/pingouSubmit.js
const app = getApp()
const qingqiu = require('../../utils/request.js')
const api = require('../../utils/config.js')
const utils = require('../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    date: '请选择日期',
    multiIndex: [0, 0],
    jiaohuoindex: 0,
    region: ['省', '市', '区'],
    youqiindex: 0,
    // youqiarray: ['选择油漆', 'PE', 'PE1', 'PE2', 'PE3'],
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
    index:{gangchang:0,pingming:0},
    multiArray: [[],[]],
    multilist:[],
    cityList:[],
    city:[],
    multiArray1: [],
    multiIndex1: [0, 0],
    setwidth:[],
    sethoudu:[],
    mohou:'',
    qiangdu:['选择强度'],
    youqi:['选择油漆'],
    xinceng:['选择锌层'],
    yanse:['选择颜色'],
    subentryId:[],
    pricingPrice:'',
    zid:'',
    bid:'',
    youqiname:'',
    youqiid:'',
    fabulist:[],
    multiName:'',
    thenameid:'',
    houdu:'',
    width:'',
    kuandu:'',
    yqid:'',
    tuceng:'',
    dunwei:'',
    indexs:'',
    shiid:'',
    pipeilist:[],
    bei:'',
    multiNames:[],
    zheng:'',
    shid:'',
    zhou:'',
    qipiliang:'',
    flag:true,
    type:'',
    bhou:'',
    jsqglist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if(options.objindex!=''&&options.objindex!=undefined){
      this.data.type=options.objindex
    }
    if(options.obj!=''&&options.obj!=undefined&&options.obj!='undefined'){
    this.data.jsqglist=JSON.parse(options.obj)
    console.log(this.data.jsqglist)
    var houdu=this.data.jsqglist.thickness
    var kuandu=this.data.jsqglist.width
    var zhengmianChange=this.data.jsqglist.front
    var beimianChange=this.data.jsqglist.rear
    var tuceng=this.data.jsqglist.coat
    var dunwei=this.data.jsqglist.tonnage
    this.setData({
      jsqglist:this.data.jsqglist,
      houdu:houdu,
      kuandu:kuandu,
      zhengmianChange:zhengmianChange,
      beimianChange:beimianChange,
      tuceng:tuceng,
      dunwei:dunwei
    })
    this.bindchushihua(this.data.jsqglist.steelName,this.data.jsqglist.theNameId_dictText)
    this.getWidth({steelName:this.data.jsqglist.steelName,theNameId:this.data.jsqglist.theNameId})
    }else{
    this.getstell()
    }
    this.getAddress()
  },
  // 绑定初始值
  bindchushihua(steetName,theNameId_dictText){
    var that=this
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
      that.data.multiName=multiArray[0][mulIndex1]
      that.setData({
        multiArray: multiArray,
        [multiIndex0]:mulIndex1
      })
      qingqiu.get("theName", {
        name: steetName
      }, function (res) {
        if (res.success == true) {
          var pnamesid=[]
          for (let obj of res.result.records) {
            pnames.push(obj.theNameId_dictText)
            pnamesid.push(obj.theNameId)
          }
          var multiArray = "multiArray[1]"
          var multiIndex1 = "multiIndex[1]"
          var muIndex1 = utils.getArrIndex(pnames,theNameId_dictText)
          that.data.thenameid=pnamesid[muIndex1-1]
          that.setData({
            [multiArray]: pnames,
            multilist: res.result.records,
            [multiIndex1]:muIndex1
          })
        }
      })
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
  // 获取省
  getAddress(){
    var that = this
    qingqiu.get("shengFen",null,function(res){
      console.log(res)
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
  // 省份触发事件
  bindMultiPickerColumnsChange:function(e){
    console.log("携带参数",e.detail)
    var indexs = e.detail.value
    var column = e.detail.column
    var that = this
    if(column == 0){
      that.data.indexs=that.data.cityList[indexs-1].itemValue
      // that.data.shiid=indexs
      var data = {
        pid:that.data.cityList[indexs-1].itemValue
      }
      qingqiu.get("shi",data,function(res){
        console.log(res)
        if(res.success == true){
            var cityname = []
            var cityid = []
            for(let obj of res.result){
              if(cityname.length==0){
                cityname.push("选择市")
              }
              cityname.push(obj.itemText)
              cityid.push(obj.itemValue)
            }
            var multiArray1 = "multiArray1[1]"
            var multiIndex1 = [indexs,0]
            that.setData({
              [multiArray1]:cityname,
              city:res.result,
              multiIndex1:multiIndex1
            })
            that.data.shiid=cityid[multiIndex1[1]]
        }
      })
    }else{
      var multiIndex1 = "multiIndex1[1]"
      this.setData({
        [multiIndex1]: indexs,
      })
    }
  },
  bindMultiPickerChangeone(e){
    console.log("携带参数",e.detail.value)
    var that = this
    that.data.shid=e.detail.value[1]
    that.data.multiName = that.data.multiArray[0][e.detail.value[0]]
    that.data.multiNames = that.data.multiArray[e.detail.value[1]]
    that.data.thenameid = that.data.multilist[e.detail.value[1]-1].theNameId
    var data = {
      steelName:that.data.multiName,
      theNameId:that.data.thenameid
    }
    console.log(data)
    this.getWidth(data)
  },
  // 通过信息
  getWidth(data){
    var that = this
    qingqiu.get("common",data,function(res){
      console.log(res)
      if(res.success == true){
        var qiangduindex = 0
        // var xincengindex = 0
        var yanseindex = 0
        var youqiindex = 0
        var itemdata = that.data.jsqglist
        that.data.qiangdu=['选择强度']
        // that.data.youqi=['选择油漆']
        that.data.xinceng=['选择锌层']
        that.data.yanse=['选择颜色']
        that.data.pricingPrice=res.result.steel==null?'':res.result.steel.pricingPrice
        for(let obj of res.result.densityList){
          that.data.qiangdu.push(obj.context)
        }
        for(let obj of res.result.printList){
          that.data.youqi.push(obj.context)
          that.data.subentryId.push(obj.subentryId)
        }
        // for(let obj of res.result.zinclayerList){
        //   if(obj.scopeBelow == obj.scopeUp){
        //     that.data.xinceng.push(obj.scopeBelow)
        //     continue
        //   }
        //   that.data.xinceng.push(obj.scopeBelow+"~"+obj.scopeUp)
        // }
        for(let obj of res.result.colorList){
          that.data.yanse.push(obj.context)
        }
        if(that.data.type == ''){
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
            that.data.zhengmianindex=itemdata.front
            that.data.beimianindex=itemdata.rear
            qiangduindex = utils.getArrIndex(that.data.qiangdu,itemdata.density)
            // xincengindex = utils.getArrIndex(that.data.xinceng,itemdata.zincLayer)
            yanseindex = utils.getArrIndex(that.data.yanse,itemdata.color)
            youqiindex = utils.getArrIndex(that.data.youqi,itemdata.paint)
            that.getyouqi(that.data.youqi[youqiindex].subentryId,itemdata.paint)
            that.getXC({text:itemdata.paint,steelName:that.data.jsqglist.steelName,theNameId:that.data.jsqglist.theNameId})
          }
        }
        that.setData({
          getWidth:res.result.width,
          setwidth:res.result.width,
          sethoudu:res.result.thickness,
          qiangdu:that.data.qiangdu,
          youqi:that.data.youqi,
          // xinceng:that.data.xinceng,
          yanse:that.data.yanse,
          pricingPrice:that.data.pricingPrice,
          qiangduindex:qiangduindex==-1?0:qiangduindex,
          youqiindex:youqiindex==-1?0:youqiindex, 
          // xincengindex:xincengindex==-1?0:xincengindex,
          yanseindex:yanseindex==-1?0:yanseindex,
          flag:false
        })
      }
    })
  },
  // 油漆点击获取
  // bindMultiPickerChangetwo(e){
  //   console.log("携带参数",e.detail.value)
  //   var that = this
  //   var youqiname = that.data.youqi[e.detail.value]
  //   var youqiid =that.data.subentryId[e.detail.value]
  //   this.setData({
  //     youqi:youqiname
  //   })
  //   console.log(youqiname)
  //   var data = {
  //     text:youqiname,
  //     subentryId:youqiid
  //   }
  //   console.log(data)
  //   that.gethuodu(data)
  // },
  
// 正背面厚度
  gethuodu(){
    var that = this
    var data = {
      text:that.data.youqiname,
      subentryId:that.data.youqiid
    }
    console.log(data)
    qingqiu.get("commonPrint",data,function(res){
      if(res.success == true){
        that.data.zhou=res.result.zheng
        that.data.bhou=res.result.bei
        that.data.zid=res.result.zhengId
        that.data.bid=res.result.beiId
        that.setData({
          zhou:that.data.zhou,
          bhou:that.data.bhou,
        })
        console.log(that.data.zhou)
        console.log(that.data.bhou)
        var data = {
          zheng:that.data.zhengmianindex=='0'?'':that.data.zhengmianindex,
          bei:that.data.beimianindex=='0'?'':that.data.beimianindex,
          zhengId:that.data.zid,
          beiId:that.data.bid
        }
        console.log(data)
        that.getmohou(data)
      }
    })
  },
  // 膜厚
  getmohou(data){
    var that = this
    qingqiu.get("commonMoHou",data,function(res){
      if(res.success == true){
        that.data.tuceng=res.message
        that.setData({
          tuceng:that.data.tuceng
        })
        console.log(that.data.tuceng)
      }
    })
  },
  // 钢厂
  getstell(){
    var that = this
    qingqiu.get("stell",null,function(res){
      var list = res.result;
      var names = [];
      var pnames = [];
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
  // 跳转到发布成功页面
  submitSuccess: function() {
    var that = this
    var data={
      wxUserId:app.globalData.wxid,
      areaOneId:that.data.indexs,
      areaTwoId:that.data.shiid,
      steelName:that.data.multiName,
      theNameId:that.data.thenameid,
      thickness:that.data.houdu,
      width:that.data.kuandu,
      paint:that.data.youqi[that.data.youqiindex],
      front:that.data.zhengmianindex,
      rear:that.data.beimianindex,
      coat:that.data.tuceng,
      zincLayer:that.data.xinceng[that.data.xincengindex],
      color:that.data.yanse[that.data.yanseindex],
      density:that.data.qiangdu[that.data.qiangduindex],
      deadline:that.data.date,
      tonnage:that.data.dunwei,
    }
    if(Number(that.data.dunwei)>Number(that.data.pricingPrice))
    {
      wx.showToast({
        title: '需求吨数不能大于最低起批量',
        icon:'none',
        duration:2000
      })
      return
    }
    var s = utils.yanzheng(data.areaOneId + ',请选择省|' + data.areaTwoId + ',请选择市|' + data.steelName + ',请选择钢厂|' + data.theNameId + ',请选择品名|' + data.thickness + ',请输入厚度|' + data.width + ',请输入宽度|' + data.paint + ',请选择油漆|' + data.front + ',请输入正面膜厚|' + data.rear + ',请输入背面膜厚|' + data.coat + ',没有涂层参数|' + data.zincLayer + ',请选择锌层|' + data.color + ',请选择颜色|' + data.density + ',请选择强度|' + data.deadline + ',请选择截止时间|' + data.tonnage + ',请选择吨数')
    if(s != 0){
      wx.showToast({
        title: s,
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
    console.log(data)
    var dataobj = data
    qingqiu.get("faBuPinGou",data,function(res){
      if(res.success == true){
        console.log(res)
        if(res.result.records.length == 0){
          dataobj.theName = that.data.multiArray[1][that.data.multiIndex[1]]
          dataobj = JSON.stringify(dataobj)
          wx.navigateTo({
            url: '../post/post?obj=' + dataobj,
          })
        }else{ 
          var pipeilist=res.result.records
          var ppsj = JSON.stringify(pipeilist)
          app.globalData.haibaitype = 1
          dataobj.theName = that.data.multiArray[1][that.data.multiIndex[1]]
          dataobj = JSON.stringify(dataobj)
          wx.navigateTo({
            url: '../submitSuccess/submitSuccess?obj='+ppsj+"&dataobj="+dataobj,
          })
        }
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
  // 交货地
  regionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex1: e.detail.value
    })
  },
  // 选择钢厂
  // bindMultiPickerChange: function(e) {
  //   console.log('picker发送选择改变，携带值为', e.detail.value)
  //   this.setData({
  //     multiIndex: e.detail.value
  //   })
  // },
  // 选择钢厂
  bindMultiPickerChanges: function(e) {
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
            if(names.length == 0){
              names.push('选择品名')
            }
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
        [multiIndex]: indexs
      })
      console.log(that.data.multiIndex)
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
  houdu: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
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
    if(e.detail.value>=minhoudu&&e.detail.value<=maxhoudu||e.detail.value<=minhoudu&&e.detail.value>=maxhoudu){
      this.setData({
        houdu:e.detail.value
      })
    }else{
      wx.showToast({
        title: '厚度范围在'+minhoudu+'~'+maxhoudu,
        icon:'none',
        duration:2000
      })
      this.setData({
        houdu:''
      })
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
  kuandu: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
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
    if(width >= minwidth && width <= maxwidth||width <= minwidth && width >= maxwidth){
      this.setData({
        kuandu: e.detail.value
      })
    }else{
      this.setData({
        kuandu: ''
      })
      wx.showToast({
        title: '宽度范围在'+minwidth + "~" + maxwidth,
        icon:'none',
        duration:2000
      })
      return
    }
  },
  // 油漆
  youqiChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var that=this
    // this.setData({
    //   youqi: e.detail.value
    // })
    that.data.yqid=e.detail.value
    that.data.youqiname = that.data.youqi[e.detail.value]
    that.data.youqiid =that.data.subentryId[e.detail.value-1]
    var data = {
      subentryId:that.data.youqiid,
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
      }
    })
    that.setData({
      youqiindex: e.detail.value,
      youqi:that.data.youqi, 
      youqiindex:e.detail.value
    })
    var data={
      text:that.data.youqiname,
      theNameId:that.data.thenameid,
      steelName:that.data.multiName
    }
    // that.gethuodu()
    that.getXC(data)
  },
  // 获取锌层
  getXC(data){
    var that=this
    qingqiu.get("getXC",data,function(res){
      console.log(res)
      if(res.success == true){
        that.data.xinceng=['选择锌层']
        for(let obj of res.result){
          that.data.xinceng.push(obj.scope)
        }
        var xincengindex=utils.getArrIndex(that.data.xinceng,that.data.jsqglist.zincLayer)
        that.setData({
          xinceng: that.data.xinceng,
          xincengindex:xincengindex==-1?0:xincengindex,
        })
      }
    })
  },
  // 正面焦点
  zhengfocus:function(){
    var that = this
    if(!that.data.setwidth.length>0){
      wx.showToast({
        title: '请选择钢厂',
        icon:'none',
        duration:2000
      })
      return
    }
    if(!that.data.yqid > 0){
      wx.showToast({
        title: '请选择油漆',
        icon:'none',
        duration:2000
      })
      that.setData({
        zhengmianChange:''
      })
      return
    }
  },
  // 正面
  zhengmianChange: function(e) {
    var that=this
    that.data.zhengmianindex=''
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      zhengmianindex: e.detail.value
    })
    var data = {
      zheng:that.data.zhengmianindex,
      bei:that.data.beimianindex,
      zhengId:that.data.zid,
      beiId:that.data.bid
    }
    console.log(data)
    that.gethuodu()
    // that.getmohou(data)
  },
  // 正面失去焦点
  zhengmian:function(e){
    var that = this
    var value = e.detail.value
    console.log(that.data.zheng)
    var minvalue = that.data.zhou[0]
    var maxvalue = that.data.zhou[1]
    if(minvalue > maxvalue){
      wx.showToast({
        title: '该油漆下没有正面膜厚，请联系管理员',
        icon:'none',
        duration:2000
      })
      that.setData({
        zhengmianChange:''
      })
      return
    }
    if(value>=minvalue&&value<=maxvalue||value<=minvalue&&value>=maxvalue){
      that.setData({
        zhengmianChange: e.detail.value
      })
    }else{
      if(minvalue!=undefined&&maxvalue!=undefined){
        wx.showToast({
          title: '数值在'+minvalue+"~"+maxvalue,
          icon:'none',
          duration:2000
        })
      }
      
      that.setData({
        zhengmianChange:''
      })
      return
    }
  },
  // 背面焦点
  beifocus:function(){
    var that = this
    if(!that.data.setwidth.length>0){
      wx.showToast({
        title: '请选择钢厂',
        icon:'none',
        duration:2000
      })
      return
    }
    if(!that.data.yqid > 0){
      wx.showToast({
        title: '请选择油漆',
        icon:'none',
        duration:2000
      })
      that.setData({
        beimianChange:''
      })
      return
    }
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
      zheng:that.data.zhengmianindex,
      bei:that.data.beimianindex,
      zhengId:that.data.zid,
      beiId:that.data.bid
    }
    console.log(data)
    that.gethuodu()
    // that.getmohou(data)
  },
  // 背面失去焦点
  beimian:function(e){
    var that = this
    var value = e.detail.value
    var minvalue = that.data.bhou[0]
    var maxvalue = that.data.bhou[1]
    if(minvalue > maxvalue){
      wx.showToast({
        title: '该油漆下没有背面膜厚，请联系管理员',
        icon:'none',
        duration:2000
      })
      that.setData({
        beimianChange:''
      })
      return
    }
    if(value>=minvalue&&value<=maxvalue||value<=minvalue&&value>=maxvalue){
      that.setData({
        beimianChange:e.detail.value
      })
    }else{
      if(minvalue!=undefined&&maxvalue!=undefined){
        wx.showToast({
        title: '数值在'+minvalue+"~"+maxvalue,
        icon:'none',
        duration:2000
      })
      }
      that.setData({
        beimianChange:''
      })
      return
    }
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
  // 截止时间
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
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