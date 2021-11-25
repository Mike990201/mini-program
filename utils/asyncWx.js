export const chooseAddress=()=>{
  return new Promise((resolve,reject)=>{
    wx.chooseAddress({
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      }
    });
  })
}
export const showModel=({content})=>{
  console.log(content);
  return new Promise((resolve,reject)=>{
    wx.showModal({
      title: '提示',
      content: '请问你是否要删除',
      success :(res)=> {
        resolve(res);
      },
      fail:(res)=>{
        reject(res)
      }
    })
  })
}
export const showToast=({title})=>{
  return new Promise((resolve,reject)=>{
    wx.showToast({
      title: title,
      icon: 'none',
      success:(res)=>{
        resolve(res)
      }
    })
  })
}

export const login=()=>{
  return new Promise((resolve,reject)=>{
    wx.login({
      timeout: 1000,
      success:(result)=>{
        resolve(result);  
      },
      fail:(result)=>{
        reject(result);
      }
    })
  })
}

// export const requestPayment=(pay)=>{
//   return new Promise((resolve,reject)=>{
//     wx.requestPayment({
//         ...pay,
//         success:(result)=>{
//           resolve(result)
//         },
//         fail:(result)=>{
//           reject(result)
//         }
//     })
//   })
// }

export const requestPayment=(pay)=>{
  return new Promise((resolve,reject)=>{
   wx.requestPayment({
      ...pay,
     success: (result) => {
      resolve(result)
     },
     fail: (err) => {
       reject(err);
     }
   });
     
  })
}


