/* 
1 点击 “+” 触发tap点击事件
  1 调用小程序内置的 选择图片的 api
  2 获取到 图片的路径  数组
  3 把图片路径 存到 data的变量中
  4 页面就可以根据 图片数组 进行循环显示 自定义组件
2 点击 自定义图片 组件
  1 获取被点击的元素的索引
  2 获取 data中的图片数组
  3 根据索引 数组中删除对应的元素
  4 把数组重新设置回data中
3 点击 “提交”
  1 获取文本域的内容 类似 输入框的获取
    1 data中定义变量 表示 输入框内容
    2 文本域 绑定 输入事件 事件触发的时候 把输入框的值 存入到变量中 
  2 对这些内容 合法性验证
  3 验证通过 用户选择的图片 上传到专门的图片的服务器 返回图片外网的链接
    1 遍历图片数组 
    2 挨个上传
    3 自己再维护图片数组 存放 图片上传后的外网的链接
  4 文本域 和 外网的图片的路径 一起提交到服务器 前端的模拟 不会发送请求到后台。。。 
  5 清空当前页面
  6 返回上一页 
 */
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs:[
            {
                id:0,
                value:"体验问题",
                isActive:true
            },
            {
                id:1,
                value:"商品、商家投诉",
                isActive:false
            }
        ],
        ImgPaths:[],
        TextValue:""
    },
    ImgUploads:[],
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
    handleChooseImg(e){
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success:(res)=>{
            // tempFilePath可以作为img标签的src属性显示图片
                const tempFilePaths = res.tempFilePaths;
                this.setData({
                    ImgPaths:[...this.data.ImgPaths,...tempFilePaths]
                    // ImgPaths:tempFilePaths
                })
            }
            })
    },
    handleRemoveImg(e){
        const {index}=e.currentTarget.dataset;
        let {ImgPaths}=this.data;
        ImgPaths.splice(index,1);
        this.setData({
            ImgPaths
        })
    },
    bindFormText(e){
        const {value}=e.detail;
        this.setData({
            TextValue:value
        })
    },
    handleSummit(e){
        let {TextValue,ImgPaths}=this.data;
        //判断是否空数值
        if(!TextValue.trim()){
            wx.showToast({
              title: '没有输入任何内容',
              icon:"none"
            })
            return
        }
        
        //判断是否连图片一起上传
        if(ImgPaths.length!==0){
            wx.showLoading({
              title: '正在上传中',
              mask:true
            })
            ImgPaths.forEach((v,i)=>{
                wx.uploadFile({
                  filePath: v,
                  name: 'name',
                //   url: 'https://imgchr.com/i/MjaXxU',
                url: 'https://img.coolcr.cn/api/upload',
                  success:(result)=>{
                      let url=result.cookies[0];
                      this.ImgUploads.push(url);
                      //表示图片上传完成
                      if(i==ImgPaths.length-1){
                        wx.hideLoading()
                        console.log("把文本的内容和外网的图片数组 提交到后台中");
                          this.setData({
                              ImgPaths:[],
                              TextValue:""
                          })
                          wx.navigateBack({
                              delta:1
                          })
                      }
                  }
                })
            })
        }else{
            wx.hideLoading();
            console.log("只上传了文字");
            this.setData({
                TextValue:""
            })
            wx.navigateBack({
                delta:1
            })
        }
        //  3 验证通过 用户选择的图片 上传到专门的图片的服务器 返回图片外网的链接
    }
})