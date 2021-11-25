import {request} from "../../request/request"
import {login} from "../../utils/asyncWx"
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    async  bindGetUserInfo(e){
        try {
           //console.log(e);
         // 1 获取用户信息
         const {encryptedData,rawData,iv,signature}=e.detail;
         // 2 获取小程序 登录成功  后的code值
         const {code}=await login();
         const loginParams={encryptedData,rawData,iv,signature,code};
        // 3 发送请求 获取token值
        // const token = await request ({url:"/users/wxlogin",data:loginParams,method:"post"});
        let token = await request({url:"/users/wxlogin",data:loginParams,method:"POST"});  //取token值
        if (token==null){
            //token是null,为了教程学习能继续,暂时使用教程评论中提供的token的代码,
            token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo";
            //经测试,上述token值可用.能最终取到订单号
        }
       // 4 把token 存入缓存中，同时跳转回上一个页面
        wx.setStorageSync('token',token);
       wx.navigateBack({
         delta: 1
       });
        } catch (error) {
          console.log(error);
        }
       }
})