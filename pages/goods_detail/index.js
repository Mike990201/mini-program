/* 
1 发送请求获取数据 
2 点击轮播图 预览大图
  1 给轮播图绑定点击事件
  2 调用小程序的api  previewImage  
3 点击 加入购物车
  1 先绑定点击事件
  2 获取缓存中的购物车数据 数组格式 
  3 先判断 当前的商品是否已经存在于 购物车
  4 已经存在 修改商品数据  执行购物车数量++ 重新把购物车数组 填充回缓存中
  5 不存在于购物车的数组中 直接给购物车数组添加一个新元素 新元素 带上 购买数量属性 num  重新把购物车数组 填充回缓存中
  6 弹出提示
4 商品收藏
  1 页面onShow的时候  加载缓存中的商品收藏的数据
  2 判断当前商品是不是被收藏 
    1 是 改变页面的图标
    2 不是 。。
  3 点击商品收藏按钮 
    1 判断该商品是否存在于缓存数组中
    2 已经存在 把该商品删除
    3 没有存在 把商品添加到收藏数组中 存入到缓存中即可
 */
import {request} from "../../request/request";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsObj:{},
        isCollect:false
    },
    GoodsInfo:{},
    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function () {
        const page=getCurrentPages();
        const CurrentPage=page[page.length-1];
        const {options}=CurrentPage;
        var {goods_id}=options
        this.getGoodsDetail(goods_id);
    },
    async getGoodsDetail(goods_id){
        const goodsObj=await request({url:"/goods/detail",data:{goods_id}});
        this.GoodsInfo=goodsObj;
        let collect=wx.getStorageSync('collect') || [];
        let isCollect=collect.some(v=>{return v.goods_id===this.GoodsInfo.goods_id})
        this.setData({
            goodsObj:{
                goods_name:goodsObj.goods_name,
                goods_price:goodsObj.goods_price,
                //iphone手机不能浏览.webp格式图片需要转换  0
                goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
                pics:goodsObj.pics
            },
            isCollect
        })
        // console.log(this.data.goodsObj)
    },
    swiperChange(e){
        var current=e.currentTarget.dataset.url;
        const url=this.GoodsInfo.pics.map(v=>v.pics_mid);
        wx.previewImage({
          urls: url,
          current:current
        })
    },
    //1 先绑定点击事件
    bindCartAdd(e){ 
        //  2 获取缓存中的购物车数据 数组格式 
        var cart=wx.getStorageSync("cart") || [];
        //3 先判断 当前的商品是否已经存在于 购物车
        // var index=-1;
        // for(let i=0;i<cart.length;i++){
        //    if(cart[i].goods_id===this.GoodsInfo.goods_id){
        //      index=1;
        //      console.log("执行了");
        //    }else{
        //      index=-1;
        //    }
        // }
        console.log(this.GoodsInfo);
        var index= cart.findIndex((v,i)=>{
         return v.goods_id==this.GoodsInfo.goods_id;
        })
        
       // 5 不存在于购物车的数组中 直接给购物车数组添加一个新元素 新元素 带上 购买数量属性 num  重新把购物车数组 填充回缓存中
        if(index==-1){
            this.GoodsInfo.num = 1;
            this.GoodsInfo.checked=true;
            cart.push(this.GoodsInfo);
         //4 已经存在 修改商品数据  执行购物车数量++ 重新把购物车数组 填充回缓存中
        }else{
            cart[index].num++;
            console.log("num也执行了");
        }
        wx.setStorageSync('cart', cart);
       // 6 弹出提示
       wx.showToast({
         title: '加入成功',
         icon:'success',
         //mask表示防止一直点击
         mask:true
       })
    },
    handleCollect(e){
      let Collect=wx.getStorageSync('collect') || [];
      let Index=Collect.findIndex(v=>{return v.goods_id===this.GoodsInfo.goods_id});
      console.log(Index);
      let isCollect=this.data.isCollect;
      //表示已加入了收藏
      if(Index!==-1){
        Collect.splice(Index,1);
          isCollect=false;
          wx.showToast({
            title: '取消收藏',
            icon:"success",
            mask:true
          })
      }else{
        Collect.push(this.GoodsInfo);
          isCollect=true;
          wx.showToast({
            title: '收藏成功',
            icon:"success",
            mask:true
          })
      }
      wx.setStorageSync('collect', Collect);
      this.setData({
        isCollect
      })
    }
})