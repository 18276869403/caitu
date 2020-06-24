// pages/jisuanHistory/jisuanHistory.js
//获取应用实例
const app = getApp()
var qingqiu = require('../../utils/request.js')
var api = require('../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jisuan: [{
        id: 1,
        user: '镀锌板彩涂卷',
        users: '',
        name: '上海宝钢',
        price: '300',
        time: '2020.05.02'
      },
      {
        id: 2,
        user: '三级抗震盘螺',
        users: 'HRB400E 8',
        name: '上海宝钢',
        price: '300',
        time: '2020.05.02'
      },
      {
        id: 3,
        user: '镀锌板彩涂卷',
        users: '',
        name: '上海宝钢',
        price: '300',
        time: '2020.05.02'
      }
    ],
    jisuans:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getjisuanLS()
  },
  //获取计算历史
  getjisuanLS(){
    var that = this
    var data = {
      id:app.globalData.wxid,
      pageNo:1,
      pageSize:10
    }
    qingqiu.get('calculateList',data,function(res){
      console.log(res)
      if(res.success == true){
        if (res.result != null) {
          that.data.jisuans=res.result.records
          for(var i=0;i<res.result.records.length;i++){
            that.data.jisuans[i].createTime=that.data.jisuans[i].createTime.split(' ')[0]
          }
          that.setData({
            jisuans:that.data.jisuans
          })
        }else {
          wx.showToast({
            title: '暂无数据！',
            icon:'none',
            duration:2000
          })
        }
      }
    })
  },
  // 跳转到计算结果
  calculatorResult: function(e) {
    var obj =e.currentTarget.dataset.gd;
    var data = {
      id:obj.id,
      steelName:obj.steelName,
      color:obj.color,
      density:obj.density,
      wxUserId:app.globalData.wxid,
      theNameId:obj.theNameId,
      thickness:obj.thickness,
      width:obj.width,
      paint:obj.paint,
      front:obj.front,
      rear:obj.rear,
      coat:obj.coat,
      zincLayer:obj.zincLayer,
      density:obj.density,
      tonnage:obj.tonnage,
    }
    var objval = data
    qingqiu.get("faBuJiSuan",data,function(res){
      if(res.success == true){
        console.log(res)
        var res = JSON.stringify(res.result) // 获取参数价格
        objval.theNameId_dictText = obj.theNameId_dictText,
        objval = JSON.stringify(objval) // 参数值
        wx.navigateTo({
          url: '../calculatorResult/calculatorResult?obj=' + res + '&objval='+ objval,
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
  }
})