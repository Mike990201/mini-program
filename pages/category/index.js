// pages/category/index.js
import {request} from "../../request/request";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        leftMenuList:[],
        rightContent:[],
        currentIndex:0
    },
    Cates:[],
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const Cates=wx.getStorageSync('cates');
        if(!Cates){
            this.getCates();
        }else{
            if(Date.now()-Cates.time>1000 * 10){
                this.getCates();
            }else{
                this.Cates=Cates.data;
                let leftMenuList=this.Cates.map(v=>v.cat_name);
                let rightContent=this.Cates[0].children
                this.setData({
                    leftMenuList,
                    rightContent
                })
            }
        }
    }
    ,
    async getCates(){
        // request({url:"/categories"})
        // .then(result=>{
        //     this.Cates=result.data.message;
        //     wx.setStorageSync('cates', {time:Date.now(),data:this.Cates});
        //     let leftMenuList=this.Cates.map(v=>v.cat_name);
        //     let rightContent=this.Cates[0].children
        //     this.setData({
        //         leftMenuList,
        //         rightContent
        //     })
        // })
        const res=await request({url:"/categories"})
        this.Cates=res;
        wx.setStorageSync('cates', {time:Date.now(),data:this.Cates});
        let leftMenuList=this.Cates.map(v=>v.cat_name);
        let rightContent=this.Cates[0].children
        this.setData({
            leftMenuList,
            rightContent
        })
    },
    handleItemTap(e){
        var {index}=e.currentTarget.dataset;
        let rightContent=this.Cates[index].children
        this.setData({
            currentIndex:index,
            rightContent
        })
    }
})