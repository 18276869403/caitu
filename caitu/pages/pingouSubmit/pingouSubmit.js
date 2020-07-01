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
    xincengarray: ['选择镀层量', '100', '1001', '1002', '1003'],
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
    xinceng:['选择镀层量'],
    yanse:['选择颜色'],
    zhengmian:['选择正面膜厚'],
    zhengmianindex:0,
    beimian:['选择背面膜厚'],
    beimianindex:0,
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
    jsqglist:[],
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
        that.data.xinceng=['选择镀层量']
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
  
// 正背面厚度-镀层量
gethuodu(){
  var that = this
  var data = {
    steelName:that.data.multiName,
    text:that.data.youqiname,
    theNameId:that.data.thenameid
  }
  that.data.zhengmian=['选择正面膜厚']
  that.data.beimian=['选择背面膜厚']
  that.data.xinceng=['选择镀层量']
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
      }
      that.setData({
        zhengmian:that.data.zhengmian,
        beimian:that.data.beimian,
        xinceng:that.data.xinceng
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
      front:that.data.zhengmian[that.data.zhengmianindex],
      rear:that.data.beimian[that.data.beimianindex],
      coat:that.data.tuceng,
      zincLayer:that.data.xinceng[that.data.xincengindex],
      color:that.data.yanse[that.data.yanseindex],
      density:that.data.qiangdu[that.data.qiangduindex],
      deadline:that.data.date,
      tonnage:that.data.dunwei,
    }
    if(that.data.select=='1')
    {
      wx.showToast({
        title: '请勾选用户协议！',
        icon:'none',
        duration:2000
      })
      return
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
    var s = utils.yanzheng(data.areaOneId + ',请选择省|' + data.areaTwoId + ',请选择市|' + data.steelName + ',请选择钢厂|' + data.theNameId + ',请选择品名|' + data.thickness + ',请输入厚度|' + data.width + ',请输入宽度|' + data.paint + ',请选择油漆|' + data.front + ',请输入正面膜厚|' + data.rear + ',请输入背面膜厚|' + data.coat + ',没有涂层参数|' + data.zincLayer + ',请选择镀层量|' + data.color + ',请选择颜色|' + data.density + ',请选择强度|' + data.deadline + ',请选择截止时间|' + data.tonnage + ',请选择吨数')
    if(s != 0){
      wx.showToast({
        title: s,
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
    var dataobj = data
    qingqiu.get("faBuPinGou",data,function(res){
      if(res.success == true){
        dataobj.id = res.result.askid
        dataobj.haibaotype = 1
        if(res.result.inventoryListVoList.length == 0){
          dataobj.theName = that.data.multiArray[1][that.data.multiIndex[1]]
          dataobj = JSON.stringify(dataobj)
          wx.redirectTo({
            url: '../post/post?obj=' + dataobj,
          })
        }else{ 
          var pipeilist=res.result.inventoryListVoList
          var ppsj = JSON.stringify(pipeilist)
          dataobj.theName = that.data.multiArray[1][that.data.multiIndex[1]]
          dataobj = JSON.stringify(dataobj)
          wx.redirectTo({
            url: '../submitSuccess/submitSuccess?obj='+ppsj+"&dataobj="+dataobj+'&objtype=' + '1',
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
          if(res.result.records==''){
            names.push('选择品名')
          }
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
    that.gethuodu()
    // that.getXC(data)
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
 
  // 涂层
  tuceng: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
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