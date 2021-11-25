// pages/collect/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs:[
            {
                id:0,
                value:"商品收藏",
                isActive:true
            },
            {
                id:1,
                value:"品牌收藏",
                isActive:false
            },
            {
                id:2,
                value:"店铺收藏",
                isActive:false
            },
            {
                id:3,
                value:"浏览器足迹",
                isActive:false
            }
        ],
        collect:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
        const collect=wx.getStorageSync('collect');
        this.setData({
            collect
        })
    },
    TabsItemChange(e){
        const {index}=e.detail;
        var tabs=this.data.tabs;
        tabs.forEach((v,i)=>{
            i===index?v.isActive=true:v.isActive=false;
        })
        this.setData({
            tabs
        })
    }
})