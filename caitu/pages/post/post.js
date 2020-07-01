// pages/post/post.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:{},
    shareImgSrc:'',
    shareImgPath:'',
    screenWidth:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if(options.obj!=undefined){
      var item = JSON.parse(options.obj)
      // 海报类型: 0/求购,1/拼购,2/尾货
      if(item.haibaotype == 0){
        wx.setNavigationBarTitle({ title: '求购海报' })
      }else if(item.haibaotype == 1){
        wx.setNavigationBarTitle({ title: '拼购海报' })
      }else{
        wx.setNavigationBarTitle({ title: '尾货海报' })
      }
      this.setData({
        item:item
      })
    }
    wx.getImageInfo({
      src: '../image/haibaobeijing.png',
      success: function (res) {
        console.log(res)
        that.setData({
          shareImgSrc: '../../' + res.path
        });
      }
    })
    wx.getImageInfo({
      src: '../image/erweima.png',
      success: function (res) {
        console.log(res)
        that.setData({
          shareImgPath: '../../' + res.path
        });
      }
    })
     //获取用户设备信息，屏幕宽度
     wx.getSystemInfo({
      success: res => {
        that.setData({
          screenWidth: res.screenWidth
        })
        console.log('宽度',that.data.screenWidth)
      }
    })
  },

  // 按钮分享
  onShareAppMessage:function(res){
    var that = this
    var obj = JSON.stringify(that.data.item)
    return {
      title: '分享',
      path: '/pages/post/post?obj=' + obj,
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    var context = wx.createCanvasContext('share')
    context.setStrokeStyle("#00ff00")
    context.setLineWidth(1)
    context.stroke()
    context.draw(false, this.getTempFilePath)
  },

  // 获取临时路径
  getTempFilePath: function () {
    wx.canvasToTempFilePath({
      canvasId: 'share',
      success: (res) => {
        this.setData({
          shareTempFilePath: res.tempFilePath
        })
      }
    })
  },

   //保存至相册
   saveImageToPhotosAlbum: function () {
    var that = this;
    var item = that.data.item
     var unit = that.data.screenWidth / 375
     //2. canvas绘制文字和图片
     const ctx = wx.createCanvasContext('share');
     var bgImgPath = that.data.shareImgSrc;
  //这里是把页面上的数据写入到画布里，具体的坐标需要各位自行调整
     ctx.drawImage(bgImgPath, 0, 0, 375, 580);
     ctx.drawImage(that.data.shareImgPath, 280, 480, 80, 80);
     this.drawTextCss(ctx,{x:50,y:70,color:'rgba(51, 51, 51, 1)',size:30,text:item.theName,bold:true})
    //  ctx.fillText('' + item.theName, 50, 70)
     ctx.setFontSize(17)
     ctx.setFillStyle('rgba(51, 51, 51, 1)')
     ctx.fillText('厚度：' + item.thickness, 50, 110)
     ctx.fillText('宽度：' + item.width, 50, 144);
     ctx.fillText('颜色：' + item.color, 50, 178);
     ctx.fillText('吨数：' + item.tonnage,  50, 212, 145, 280);
     ctx.fillText('钢厂: ' + item.steelName,  50, 246, 145, 280);
     ctx.stroke()
     ctx.draw(false, function() {
       // 3. canvas画布转成图片
       wx.canvasToTempFilePath({
         x: 0,
         y: 0,
         width: 375,
         height: 580,
         destWidth: 375,
         destHeight: 580,
         canvasId: 'share',
         success: function (res) {
           console.log(res);
           that.setData({
             shareImgSrc: res.tempFilePath
           })
           if (!res.tempFilePath) {
             wx.showModal({
               title: '提示',
               content: '图片绘制中，请稍后重试',
               showCancel: false
             })
           }
           //4. 当用户点击分享到朋友圈时，将图片保存到相册
           wx.saveImageToPhotosAlbum({
             filePath: that.data.shareImgSrc,
             success(res) {
               console.log(res);
               wx.showModal({
                 title: '图片保存成功',
                 content: '图片成功保存到相册了，去发圈噻~',
                 showCancel: false,
                 confirmText: '好哒',
                 confirmColor: '#72B9C3',
                 success: function (res) {
                   if (res.confirm) {
                     console.log('用户点击确定');
                   }
                   that.setData({
                     canvasHidden: true
                   })
                 }
               })
             }
           })
         },
         fail: function (res) {
           console.log(res)
         }
       })
     });
   },

   drawTextCss:function(ctx,obj){
    console.log('渲染文字')
    ctx.save();
    ctx.setFillStyle(obj.color);
    ctx.setFontSize(obj.size);
    if (obj.bold) {
        console.log('字体加粗')
        ctx.fillText(obj.text, obj.x, obj.y - 0.5);
        ctx.fillText(obj.text, obj.x - 0.5, obj.y);
    } 
    ctx.fillText(obj.text, obj.x, obj.y);
    // if (obj.bold) {
    //     ctx.fillText(obj.text, obj.x, obj.y + 0.5);
    //     ctx.fillText(obj.text, obj.x + 0.5, obj.y);
    // }
    ctx.restore();
   },

  /**
   * 绘制多行文本，考虑到内容过多可能会显示不全，这里增加一个函数
   */
  drawText: function (ctx, str, leftWidth, initHeight, titleHeight, canvasWidth) {
    var lineWidth = 0;
    var lastSubStrIndex = 0; //每次开始截取的字符串的索引
    for (let i = 0; i < str.length; i++) {
      lineWidth += ctx.measureText(str[i]).width;
      if (lineWidth > canvasWidth) {
        ctx.fillText(str.substring(lastSubStrIndex, i), leftWidth, initHeight); //绘制截取部分
        initHeight += 16; //16为字体的高度
        lineWidth = 0;
        lastSubStrIndex = i;
        titleHeight += 30;
      }
      if (i == str.length - 1) { //绘制剩余部分
        ctx.fillText(str.substring(lastSubStrIndex, i + 1), leftWidth, initHeight);
      }
    }
    // 标题border-bottom 线距顶部距离
    titleHeight = titleHeight + 10;
    return titleHeight
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const that = this;
    wx.downloadFile({
      url: that.data.shareImgSrc,
      success: function (res) {
        that.data.shareImgSrc = res.tempFilePath
      }, fail: function (res) {
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
 
})