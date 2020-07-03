// pages/kucunManage/kucunManage.js
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
    zincLayerobj:[],
    qiangduarray:[],
    youqiarray:[],
    xincengarray:[],
    yansearray:[],
    kuandu:'',
    houdu:'',
    setwidth:[],
    sethoudu:[],
    gangchangname:'',
    pinmingid:'',
    cangkuindex: 0,
    multiIndex: [0, 0],
    yanseindex:0,
    multiArray: [[],[]],
    multilist:[],
    // 省市
    multiArray1: [],
    cityList:[],
    city:[],
    multiIndex1: [0, 0],
    qiangdu:['选择强度'],
    qiangduindex:0,
    youqi:['选择油漆'],
    youqiindex:0,
    xinceng:['选择镀层量'],
    xincengindex:0,
    yanse:['选择颜色'],
    yanseindex:0,
    zhengmian:['选择正面膜厚'],
    zhengmianindex:0,
    beimian:['选择背面膜厚'],
    beimianindex:0,
    zheng:[],
    fan:[],
    mohou:[],
    zhengvalue:'',
    beivalue:'',
    tuceng:'',
    imglist:[],
    bindimg:[],
    flag:true,
    select:1,
    zhengmianid:[],
    beimianid:[],
    xieyi:api.xieyi
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
  bindMultiPickerColumnChangeCity:function(e){
    console.log("携带参数",e.detail)
    var indexs = e.detail.value
    var column = e.detail.column
    var that = this
    if(column == 0){
      var data = {
        pid:that.data.cityList[indexs-1].itemValue
      }
      qingqiu.get("shi",data,function(res){
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
  kucunSubmitSuccess: function() {
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
      wxUserId:app.globalData.wxid,
      areaOneId:citylist[cityindex[0]-1].itemValue,
      areaTwoId:city[cityindex[1]-1].itemValue,
      steelName:that.data.gangchangname,
      theNameId:that.data.pinmingid,
      thickness:that.data.houdu,
      width:that.data.kuandu,
      paint:youqi,
      front:that.data.zhengmian[that.data.zhengmianindex],
      rear:that.data.beimian[that.data.beimianindex],
      coat:that.data.tuceng,
      zincLayer:that.data.xinceng[that.data.xincengindex],
      color:that.data.yanse[that.data.yanseindex],
      density:that.data.qiangdu[that.data.qiangduindex],
      tonnage:that.data.dunwei,
      upUrl:imgurl
    }
    console.log(data)
    var s = utils.yanzheng(data.areaOneId + ',请选择省|' + data.areaTwoId + ',请选择市|'+data.steelName + ',请选择钢厂|'+data.thickness + ',请输入厚度|'+data.width+',请输入宽度|'+data.paint+',请选择油漆|'+data.front+',请输入正面膜厚|'+data.rear+',请输入背面膜厚|' + data.coat+',没有匹配涂层|' + data.zincLayer + ',请选择镀层量|' + data.color +',请选择颜色|' + data.density + ',请选择强度|' +data.tonnage+',请选择吨数|'+data.upUrl + ',请上传图片')
    if(s!=0){
      wx.showToast({
        title:s,
        icon:'none',
        duration:2000
      })
      return
    }
    var v = utils.yanzhengVal(data.areaOneId + ',请选择省|' + data.areaTwoId + ',请选择市|'+data.steelName + ',请选择钢厂|'+data.theNameId+',请选择品名|'+data.paint+',请选择油漆|' + data.zincLayer + ',请选择镀层量|' + data.color +',请选择颜色|'+ data.density + ',请选择强度')
    if(v != 0){
      wx.showToast({
        title: v,
        icon:'none',
        duration:2000
      })
      return
    }
    if(that.data.select=='1'){
      wx.showToast({
        title: '请勾选用户协议！',
        icon:'none',
        duration:2000
      })
      return
    }
    qingqiu.get("faBuWeiHuo",data,function(res){
      if(res.success == true){
        setTimeout(function(){
          wx.redirectTo({
            url: '../kucunSubmitSuccess/kucunSubmitSuccess',
          })
        },1000)
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
  // 选择仓库
  regionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex1: e.detail.value
    })
  },
  // bindMultiPickerChangeCity:function(e){
  //   console.log("携带参数",e.detail)
  // },
  bindMultiPickerChange:function(e){
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
  // // 获取镀层量
  // getXC(data){
  //   var that = this
  //   console.log(data)
  //   qingqiu.get("getXC",data,function(res){
  //     console.log(res)
  //     if(res.success == true){
  //       var xinceng = ["选择镀层量"]
  //       for(let obj of res.result){
  //         xinceng.push(obj.scope)
  //       }
  //       that.setData({
  //         xinceng:xinceng
  //       })
  //     }
  //   })
  // },
  // 宽度
  getWidth(data){
    var that = this
    qingqiu.get("common",data,function(res){
      console.log(res)
      if(res.success == true){
        var qiangdu = ["选择强度"]
        var youqi = ["选择油漆"]
        // var xinceng = ["选择镀层量"]
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
        that.setData({
          setwidth:res.result.width,
          sethoudu:res.result.thickness,
          qiangdu:qiangdu,
          youqi:youqi,
          yanse:yanse,
          qiangduarray:res.result.densityList,
          youqiarray:res.result.printList,
          yansearray:res.result.colorList,
          kuandu:'',
          houdu:'',
          youqiindex:0,
          zhengvalue:'',
          beivalue:'',
          tuceng:'',
          xincengindex:0,
          yanseindex:0,
          qiangduindex:0
        })
      }
    })
  },

  
  // 选择钢厂
  bindMultiPickerColumnChange: function(e) {
    var that = this
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
    }
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
  // 彩涂品名
  caituChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      caituindex: e.detail.value
    })
  },
  // 油漆
  youqiChange: function(e) {
    var that = this
    that.setData({
      youqiindex: e.detail.value
    })
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
        console.log(mohou)
        that.setData({
          mohou:mohou,
          zheng:res.result.zheng,
          bei:res.result.bei,
          youqiindex: e.detail.value,
          xincengindex:0,
          zhengvalue:'',
          beivalue:'',
          tuceng:''
        })
      }else{
        that.setData({
          youqiindex: 0
        })
      }
    })
    // that.getXC({steelName:that.data.gangchangname,theNameId:that.data.pinmingid,text:that.data.youqi[e.detail.value]})
    that.gethoudu()
  },
  // 正背面厚度-镀层量
  gethoudu(){
    var that = this
    var data = {
      steelName:that.data.gangchangname,
      text:that.data.youqi[that.data.youqiindex],
      theNameId:that.data.pinmingid
    }
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
        that.setData({
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
  // 涂层
  tuceng: function(e) {
    this.setData({
      tuceng: e.detail.value
    })
  },
  // 镀层量
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
  // 图片上传
  imgUpload:function(){
    var that = this
    var bindimg = that.data.bindimg
    wx.chooseImage({
      count:1,
      sizeType:['compressed'],
      sourceType:['album', 'camera'],
      success:function(res){
        console.log(res)
        var tempFilePaths = res.tempFilePaths
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
            if(re.statusCode == 200){
              console.log(re)
              var data = JSON.parse(re.data)
              var imglist = that.data.imglist
              imglist.push(data.message)
              that.setData({
                imglist:imglist
              })
              console.log(that.data.imglist)
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
    var index = e.currentTarget.dataset.index
    imgs.splice(index,1)
    this.setData({
      bindimg:imgs
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