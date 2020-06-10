// pages/pingouDetails/pingouDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // entertype为0，从首页进入
    // entertype为1，从我的页面进入
    entertype: 0,
     type: 1, //进行中
    // type:2,//匹配中
    // type:3,//已完成
    pgid:'',
    pgxxlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var pgxx=JSON.parse(options.obj)
    this.data.pgid=pgxx.id
    this.setData({
      pgxx:pgxx
    })
    this.selectpingouxx()
    console.log(pgxx)
  },
  // 获取参与拼购信息
  selectpingouxx(){
    var that = this
    var data = {
      gbId:that.data.pgid
    }
  qingqiu.get('groupBuyingCanYuZhu',data,function(res){
    console.log(res)
    if(res.success == true){
      if (res.result != null) {
        that.data.pgxxlist=res.result.records
        for(var i=0;i<res.result.records.length;i++){
          that.data.pgxxlist[i].createTime=that.data.pgxxlist[i].createtime.split(' ')[0]
        }
        console.log(that.data.pgxxlist)
        that.setData({
          pgxxlist:that.data.pgxxlist
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
  // 参与拼购
  joinPingou: function() {
    wx.navigateTo({
      url: '../joinPingou/joinPingou',
    })
  },
  // 跳转海报页面
  post: function() {
    wx.navigateTo({
      url: '../post/post',
    })
  },
  // 跳转到成功页面
  submitSuccess:function(){
    wx.navigateTo({
      url: '../submitSuccess/submitSuccess',
    })
  }
})