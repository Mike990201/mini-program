/* 
1 用户上滑页面 滚动条触底 开始加载下一页数据
  1 找到滚动条触底事件  微信小程序官方开发文档寻找
  2 判断还有没有下一页数据
    1 获取到总页数  只有总条数
      总页数 = Math.ceil(总条数 /  页容量  pagesize)
      总页数     = Math.ceil( 23 / 10 ) = 3
    2 获取到当前的页码  pagenum
    3 判断一下 当前的页码是否大于等于 总页数 
      表示 没有下一页数据

  3 假如没有下一页数据 弹出一个提示
  4 假如还有下一页数据 来加载下一页数据
    1 当前的页码 ++
    2 重新发送请求
    3 数据请求回来  要对data中的数组 进行 拼接 而不是全部替换！！！
2 下拉刷新页面
  1 触发下拉刷新事件 需要在页面的json文件中开启一个配置项
    找到 触发下拉刷新的事件
  2 重置 数据 数组 
  3 重置页码 设置为1
  4 重新发送请求
  5 数据请求回来 需要手动的关闭 等待效果

 */
import {request} from "../../request/request";
Page({
    /**
     * 页面的初始数据
     */
    data: {
        tabs:[
            {
                id:0,
                value:"综合",
                isActive:true
            },
            {
                id:1,
                value:"销量",
                isActive:false
            },
            {
                id:2,
                value:"价格",
                isActive:false
            }
        ],
        GoodsList:[]
    },
    QueryParmas:{
        query:"",
        cid:"",
        pagenum:1,
        pagesize:10
    },
    //总页数
    totalPage:1,
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options.query);
        this.QueryParmas.cid=options.cid || "";
        this.QueryParmas.query=options.query || "";
        this.getGoodsList();
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
    },
    async getGoodsList(e){
        const res=await request({url:"/goods/search",data:this.QueryParmas});
        this.totalPage=Math.ceil(res.total/this.QueryParmas.pagesize);
        this.setData({
            GoodsList:[...this.data.GoodsList,...res.goods]
        })
        wx.stopPullDownRefresh({
          success: (res) => {},
        })
    },
    onReachBottom(e){
        if(this.QueryParmas.pagenum>=this.totalPage){
            // console.log("没有下一页数据");
            wx.showToast({
              title: '我也是有底线的！',
            })
        }else{
            this.QueryParmas.pagenum++;
            this.getGoodsList();
        }
    },
    onPullDownRefresh(e){
        //清空数组
        this.setData({
            GoodsList:[]
        })
        //页码为1
        this.QueryParmas.pagenum=1;
        //重新获取数据
        this.getGoodsList();
    }
})