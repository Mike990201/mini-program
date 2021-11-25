/* 
1 输入框绑定 值改变事件 input事件
  1 获取到输入框的值
  2 合法性判断 
  3 检验通过 把输入框的值 发送到后台
  4 返回的数据打印到页面上
2 防抖 （防止抖动） 定时器  节流 
  0 防抖 一般 输入框中 防止重复输入 重复发送请求
  1 节流 一般是用在页面下拉和上拉 
  1 定义全局的定时器id
 */
import {request} from "../../request/request";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goods:[],
        isShow:false,
        InpValue:""
    },
    TimeID:-1,
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        
    },
    handleInput(e){
        clearTimeout(this.TimeID);
        const {value}=e.detail;
        // let isShow=this.data.isShow;
        // let goods=this.data.goods;
        if(!value.trim()){
            //值不合法
           this.setData({
               goods:[],
               isShow:false
           })
            return;
        }
        this.TimeID=setTimeout(()=>{
            this.qsearch(value);
        },1000)
        this.setData({
            isShow:true
        })
    },
    async qsearch(query){
        const res=await request({url:"/goods/qsearch",data:{query}})
        this.setData({
            goods:res
        })
    },
    handleBtn(e){
        this.setData({
            InpValue:"",
            goods:[],
            isShow:false
        })
    }
})