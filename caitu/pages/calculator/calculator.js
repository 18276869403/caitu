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
    select:1,
    xieyi:'哇彩兔用户管理细则\
    声明\
    《哇彩兔用户管理细则》（以下简称“本细则”）是哇彩兔平台（以下简称"本平台"）在《哇彩兔平台交易总则》的基础上向您就本平台服务等相关事宜所发出的告知，请您仔细阅读《哇彩兔平台交易总则》及本细则，您点击"同意并继续"按钮后，《哇彩兔平台交易总则》及本细则即构成对双方有约束力的法律文件。\
    第一章 总则\
    第一条为规范本平台交易活动，根据《中华人民共和国民法总则》、《中华人民共和国合同法》等法律、法规、政策及商务主管部门的有关规定，参照中华人民共和国国家标准 《大宗货物电子交易规范》（GB/T18769-2003）及《哇彩兔平台交易总则》，制定本细则。\
    第二条本平台根据公平原则及诚实信用原则，依托本平台网站（www.caituno1.com），运用安全、高效、便捷、先进的电子商务信息技术，为本平台会员提供钢材货物的匹配、管理、交易及相关信息服务。\
    第三条本细则适用于本平台内用户的注册及管理。\
    第四条本平台有权依据本细则调整用户注册及管理的具体操作流程及要求。\
    第二章 账号注册\
    第五条用户须具备以下条件：\
    1、具有完全民事行为能力的自然人；\
    2、使用经过实名认证的本人移动电话号码向本平台提交注册申请。\
    第六条用户的权利：\
    1、获得本平台提供的仅限于本平台使用的用户账号及密码；\
    2、享受本平台提供的各项服务；\
    3、本平台规定用户可享有的其他权利。\
    第七条 用户的义务：\
    1、遵守国家法律、法规、政策、商业道德、各类合同及本平台各项规则等的规定，接受本平台的监督与管理，配合本平台的工作；\
    2、严格按本平台各项规则履行网站使用过程中的各项义务，并对自身的所有行为承担法律后果。\
    3、就用户向本平台提供的证件、签名、印鉴、文件等各种资料的真实性、合法性、有效性承担相应法律后果；如有变更，应及时联系本平台客服进行修改（客服热线：13004192210），并承担因未及时通知本平台作相应变更而导致的法律后果。\
    4、妥善保管账号及密码，并自行承担保管责任；\
    5、维护本平台声誉，协助本平台处理各种突发或异常事件；\
    6、承担发布虚假或带有误导性质的信息引起的一切后果；\
    7、其他在本平台应尽的义务及责任。\
    第八条用户知悉并认可：本平台可以通过邮件、短信及电话等形式，向在本平台注册的用户发送货物信息、促销活动等告知信息。\
    第三章 注册信息和隐私保护\
    第九条你帐号的所有权归哇彩兔，使用权归你。你按注册页面引导填写信息，阅读并同意本协议且完成全部注册程序后，即可获得注册帐号并成为用户。你应提供及时、详尽及准确的个人资料，并不断更新注册资料，符合及时、详尽准确的要求。所有原始键入的资料将引用为注册资料。如果因注册信息不真实或更新不及时而引发的相关问题，由你自行承担相应的责任。\
    第十条你应当通过真实身份信息认证注册帐号，且你提交的帐号名称、头像、简介等注册信息中不得出现违法和不良信息， 经公司审核， 如存在上述情况，哇彩兔将不予注册; 同时，在注册后， 如发现你以虚假信息骗取帐号名称注册，或其帐号头像、简介等注册信息存在违法和不良信息的，哇彩兔有权不经通知单方采取限期改正、暂停使用、注销登记、收回等措施。\
    第十一条你帐号包括帐户名称和密码，账户名称作为你有效的身份凭证之一，你可使用手机号和密码登录。\
    第十二条你不应将其帐号、密码转让、出售或出借予他人使用，若你授权他人使用帐户，应对被授权人在该帐户下发生所有行为负全部责任。由于你其他账户使用信息，仅当依法律法规、司法裁定或经哇彩兔同意，并符合哇彩兔规定的用户帐号转让流程的情况下，方可进行帐号的转让。\
    第十三条因你个人原因导致的帐号信息遗失,如需找回帐号信息，请按照帐号找回要求提供相应的信息，并确保提供的信息合法真实有效，若提供的信息不符合要求，无法通过安全验证，哇彩兔有权拒绝提供帐号找回服务;若帐号的唯一凭证不再有效，哇彩兔有权拒绝支持帐号找回。例如手机号二次出售，哇彩兔可拒绝支持帮助找回原手机号绑定的帐号。\
    第十四条在需要终止使用帐号服务时，符合以下条件的，你可以申请注销你的帐号:\
    (1)	你仅能申请注销你本人的帐号，并依照哇彩兔的流程进行注销\
    (2)	你仍应对你在注销帐号前且使用的行为承担相应责任，同时哇彩兔仍可保存你注销前的相关信息;\
    (3)	注销成功后，帐号信息、个人身份信息、交易记录、会员权益等将无法恢复或提供。\
    第十五条你知悉并授权，哇彩兔尽在必须的情况下使用或关联公司同步你的信息，以为你提供更好的服务。\
    第十六条为更好地向你提供服务，你同意哇彩兔通过短信、小程序通知等形式向你发送相关商业性服务信息。\
    第四章 用户管理\
    第十七条用户可通过用户账号查询本平台公示的各类信息，如需进行货物交易，须申请会员认证、会员关联或商家入驻。用户完成会员认证或会员关联后与本平台发生的一切交易及管理行为全部视为会员行为。\
    第十八条用户进行会员认证的，相关申请流程及注意事项详见《哇彩兔会员管理细则》。\
    第十九条用户有权向本站申请注销用户账户。申请注销时，用户应按本平台的相应线上系统流程进行申请，并应确保账户内相关业务活动已经完全履行完毕，不存在后续任何争议，且账户内无任何遗留款项；注销申请经本平台审核同意的，本平台将注销用户账户，届时用户与平台基于各项协议的合同关系即终止。\
    第二十条用户账户注销后，本平台没有义务为用户保留或向用户披露用户账户中的任何信息，也没有义务向用户或第三方转发任何用户未曾阅读或发送过的信息，本平台将不会再收集、使用或共享与该账户相关的个人信息。本平台对用户账户注销前的已经留存的信息，仍需按照有关法律法规的规定及监管部门的要求进行保存，且在该依法保存的时间内有权机关仍有权依法查询。\
    第五章 免责声明\
    第二十一条本平台在现有技术水平及条件下维护平台服务的稳定性及安全性；但对于本平台不能及时预见、及时发现及防范的法律、技术以及其他风险，包括但不限于因自然灾害、社会事件等不可抗力及黑客攻击、计算机病毒、通信线路故障等因素导致的服务中断、数据丢失以及其他的损失及风险，本平台不承担由此引起的法律责任及经济损失。\
    第二十二条本平台可以在发生本细则第十五条所涉情形时采取对某种商品暂停交易或暂停本平台交易的决定，恢复交易时间以本平台公告为准，恢复交易时以暂停交易前最终记录的数据作为有效交易数据。对因上述原因本平台采取暂停交易引起的损失，本平台不承担任何赔偿责任。\
    第二十三条若用户认为本平台涉及的作品、表演、录音录像制品，侵犯了用户的信息网络传播权或者删除、改变了用户的权利管理电子信息的，用户有权书面通知本平台，要求本平台删除该作品、表演、录音录像制品，或者断开与该作品、表演、录音录像制品的链接。 书面通知应当包含下列内容：\
    1、用户的身份信息（包括但不限于用户姓名、身份证、联系方式及地址等）；\
    2、要求删除或者断开链接的作品、表演、录音录像制品的名称及网络地址；\
    3、要求删除或断开链接的理由及证明作品、表演、录音录像制品存在侵权的相关材料；\
    4、关于内容真实性的声明：“本人保证，本通知中所述信息是充分、真实、准确的，若本通知内容不完全属实，本人将承担由此产生的一切法律后果”；\
    5、签署用户的有效签章。\
    本平台收到用户的书面通知后删除该作品、表演、录音录像制品，或者断开与该作品、表演、录音录像制品的链接的，视为本平台已经尽到了合理的义务，本平台不承担任何其他赔偿责任。\
    第二十四条本平台重视对用户保密信息的维护，但因本细则第十五条所涉情况或其他非本平台原因引起的用户保密信息泄露，本平台不承担任何赔偿责任。\
    第二十五条本平台不对外提供担保。\
    第六章 信息发布及管理\
    第二十六条本平台网站用于公布平台规则、公告、交易货物行情及其它统计资料及信息。\
    第二十七条电话、传真、信函、电子邮件、手机短信及本平台网站的公告及通知均为本平台向用户传递信息的有效途径。对于已经发出的信息均视为向用户的有效送达。\
    第二十八条本平台根据本细则做出的各种决定、规则调整等，均通过本平台网站对外公布，除另有规定外，自公布之日起生效。\
    第七章 违约与违规处理\
    第二十九条用户对其账号在本平台的一切行为承担全部法律后果。\
    第三十条对违约或违反本平台有关规定的用户，本平台有权视情节轻重对其进行警告、暂停或关闭用户账号，并在有关网站及媒体上进行公告。违规行为涉嫌犯罪的，本平台有权采取移交司法机关并追究刑事责任等措施。通过上述措施不足以弥补本平台损失的， 本平台有权通过法律途径进一步追究用户的责任。\
    第三十一条用户对于交易过程中接触到的本平台商业秘密承担保密义务，用户不得泄露或非法使用本平台商业秘密。用户泄漏或非法使用商业秘密的，应承担由此引起的一切法律后果；涉嫌犯罪的，本平台有权采取移交司法机关并追究刑事责任等措施。\
    第八章 附则\
    第三十二条用户点击本细则下方的"同意并继续"按钮即视为用户完全接受本细则，在点击之前请用户再次确认已知悉并完全理解本细则的全部内容。用户点击同意本细则的，即视为用户确认自己具有享受本站服务的行为能力，能够独立承担法律后果。\
    第三十三条本平台有权根据法律、法规、政策、交易习惯、客观条件等对本细则进行修订，并按修订后的细则进行管理。\
    第三十四其它以本平台名义发布的制度、办法、规定等均属本细则不可分割的部分。\
    第三十五条本细则自2020年6月28日起颁布实施。\
    第三十六条本细则的解释权在法律规定的范围内归上海尾易网络信息服务有限公司所有。\
    '
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
        xincengPrice:data.xinceng
      })
      this.bindchushihua(data.steelName,data.theNameId_dictText)
      this.getWidth({steelName:data.steelName,theNameId:data.theNameId})
      this.getXC({steelName:data.steelName,theNameId:data.theNameId,text:data.paint})
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
            xincengindex:0
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
          flag:false
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
    that.gethuodu()
  },
  // 正背面厚度-镀层量
gethuodu(){
  var that = this
  var data = {
    steelName:that.data.gangchangname,
    text:that.data.youqi[that.data.youqiindex],
    theNameId:that.data.pinmingid
  }
  that.data.zhengmian=['选择正面膜厚']
  that.data.beimian=['选择背面膜厚']
  that.data.xinceng=['选择镀层量']
  that.data.zincLayerobj=[]
  console.log(data)
  qingqiu.get("getXC",data,function(res){
    if(res.success == true){
      for(let obj of res.result.zlist){
        that.data.zhengmian.push(obj.scope)
      }
      for(let obj1 of res.result.blist){
        that.data.beimian.push(obj1.scope)
      }
      for(let obj2 of res.result.xclist){
        that.data.xinceng.push(obj2.scope)
        that.data.zincLayerobj.push(obj2.price)
      }
      that.setData({
        zhengmian:that.data.zhengmian,
        beimian:that.data.beimian,
        xinceng:that.data.xinceng,
        zincLayerobj:that.data.zincLayerobj
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
        that.data.tuceng=res.message
        that.setData({
          tuceng:that.data.tuceng
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
      zheng:that.data.zhengmianindex,
      bei:that.data.beimianindex,
      zhengId:that.data.zid,
      beiId:that.data.bid
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
      zheng:that.data.zhengmianindex,
      bei:that.data.beimianindex,
      zhengId:that.data.zid,
      beiId:that.data.bid
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
    var youqi = that.data.youqi[that.data.youqiindex]
    var data = {
      wxId:app.globalData.wxid,
      steelName:that.data.gangchangname,
      theNameId:that.data.pinmingid,
      thickness:that.data.houdu,
      width:that.data.kuandu,
      paint:youqi,
      front:that.data.zhengmian[that.data.zhengmianindex],
      rear:that.data.beimian[that.data.beimianindex],
      coat:that.data.tuceng,
      zincLayer:that.data.xinceng[that.data.xincengindex]+'|'+that.data.zincLayerobj[that.data.xincengindex-1],
      color:that.data.yanse[that.data.yanseindex],
      density:that.data.qiangdu[that.data.qiangduindex],
      tonnage:that.data.dunwei,
      backup1:that.data.steel.pricingPrice
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
    var v = utils.yanzhengVal(data.areaOneId + ',请选择省|' + data.areaTwoId + ',请选择市|'+data.steelName + ',请选择钢厂|'+data.theNameId+',请选择品名|'+data.paint+',请选择油漆|' + data.zincLayer + ',请选择镀层量|' + data.color +',请选择颜色|'+ data.density + ',请选择强度')
    if(v != 0){
      wx.showToast({
        title: v,
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