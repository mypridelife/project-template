const getUserInfo = function(e) {
  var that = this;
  const paperid = e.currentTarget.dataset.paperid;
  if (wx.getStorageSync("userData")) {
    console.log("已授权");

    wx.redirectTo({
      url: "/pages/index/index"
    });
  } else {
    console.log("未授权");
    wx.login({
      success: function(res) {
        const userRes = e.detail;
        console.log("getUserInfo", userRes);
        const encryptedData = userRes.encryptedData;
        const iv = userRes.iv;
        wx.request({
          // url: login,
          url: "https://pp.hzhengji.cn/wx/api/rest/v2.0/login",
          method: "GET",
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          data: {
            code: res.code,
            encryptedData: encryptedData,
            iv: iv
          },
          //服务端的回调
          success: function(result) {
            if (!result.data) {
              console.log("拒绝授权", result);
              that.setData({
                visible1: true
              });
            } else {
              console.log("后台返回", result);
              wx.setStorageSync("userData", result.data);
              wx.setStorageSync("wechat", result.data.wechat);
              wx.setStorageSync("uid", result.data.uid);
              wx.navigateTo({
                url: `/pages/chooseExam/chooseExam?paperid=${paperid}`
              });
              return;
            }
          }
        });
        //   }
        // });
      }
    });
  }
};
module.exports = {
  getUserInfo
};
