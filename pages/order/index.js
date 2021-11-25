import {request} from "../../request/request";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs:[
            {
                id:0,
                value:"全部",
                isActive:true
            },
            {
                id:1,
                value:"待付款",
                isActive:false
            },
            {
                id:2,
                value:"待发货",
                isActive:false
            },
            {
                id:3,
                value:"退款/退货",
                isActive:false
            }
        ],
        orders:[]
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
    onShow: function (options) {
        const token=wx.getStorageSync('token');
        if(!token){
            wx.navigateTo({
              url: '../auth/index',
            })
            return;
        }
        const page=getCurrentPages();
        const CurrentPage=page[page.length-1];
        const {type}=CurrentPage.options;
        this.changeTitleByIndex(type-1);
        this.getOrders(type);
    },
     // 根据标题索引来激活选中 标题数组
    changeTitleByIndex(index){
        var tabs=this.data.tabs;
        tabs.forEach((v,i)=>{
            i===index?v.isActive=true:v.isActive=false;
        })
        this.setData({
            tabs
        })
    },
    TabsItemChange(e){
        const {index}=e.detail;
        this.changeTitleByIndex(index);
        this.getOrders(index+1);
    },
    async getOrders(type){
        const res=await request({url:"/my/orders/all",data:{type}})
        this.setData({
            orders:res.orders.map(v=>({...v,create_time_cn:(new Date(v.create_time*1000).toLocaleString())}))
            // orders:res.orders.map(v=>{...v,create_time_cn:(new Date(v.create_time*1000).toLocaleString())}))
            // orders: res.orders.map(v=>({...v,create_time_cn:(new Date(v.create_time*1000).toLocaleString())}))
        })
    }
})