//引入用来请求的方法
import {request} from "../../request/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
      swiperList:[],
      navList:[],
      FloorList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success:(e)=>{
    //       var {message}=e.data;
    //       this.setData({
    //       swiperList: e.data.message
    //     })
    //     console.log(this.data.swiperList);
    //   }
    // })
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },
  getSwiperList:function(){
    request({url:"/home/swiperdata"})
    .then(result =>{
        var message=result;
        this.setData({
            swiperList:message
        })
    })
  }
  ,
  getCateList:function(){
      request({url:"/home/catitems"})
      .then(result=>{
          var message=result;
          this.setData({
              navList:message
              
          })
      })
  },
  getFloorList:function(){
    request({url:"/home/floordata"})
    .then(result=>{
        var message=result;
        // message.product_list.forEach((v,i)=>{
        //   console.log(v)
        // })
        for(let i=0;i<message.length;i++){
            message[i].product_list.forEach((v,i)=>{
              var data=JSON.stringify(v)
              data=data.replace(/goods_list/g,'goods_list/index')
              data=JSON.parse(data)
              v.navigator_url=data.navigator_url
            })
        }
        // console.log(message[0].product_list);
        this.setData({
          FloorList:message
        })
    })
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})