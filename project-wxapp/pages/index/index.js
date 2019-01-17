import { without } from "../../config";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    current: "index",
    active1: [],
    paperList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(wx.getStorageSync("userData"));
    this.setData({
      current: "index"
    });
    this.handleQuery();
  },
  onShow() {
    this.onLoad();
    // getCurrentPages().length()=1
    // while (getCurrentPages().length > 1) {
    //   getCurrentPages().pop();
    // }
    // console.log(getCurrentPages());
  },
  handleChange({ detail }) {
    console.log("current", detail.key);
    const toUrl = detail.key;
    if (toUrl === "index") {
    } else {
      wx.navigateTo({
        url: `/pages/${toUrl}/${toUrl}`
      });
      this.setData({
        current: detail.key
      });
    }
  },
  //   getUserInfo: function(detail) {
  //     var that = this;
  //     const toUrl = detail.key;
  //     if (wx.getStorageSync("userData")) {
  //       console.log("已授权");
  //     } else {
  //       console.log("未授权");
  //       wx.login({
  //         success: function(res) {
  //           //获取用户信息
  //           wx.getUserInfo({
  //             success: function(userRes) {
  //               wx.setStorageSync("userInfo", userRes.userInfo);
  //               //发起网络请求
  //               wx.request({
  //                 // url: login,
  //                 url: "https://pp.hzhengji.cn/wx/api/rest/v2.0/login",
  //                 method: "GET",
  //                 header: {
  //                   "Content-Type": "application/json"
  //                 },
  //                 data: {
  //                   code: res.code,
  //                   encryptedData: userRes.encryptedData,
  //                   iv: userRes.iv
  //                 },
  //                 //服务端的回调
  //                 success: function(result) {
  //                   if (!result.data) {
  //                     that.setData({
  //                       visible1: true
  //                     });
  //                   } else {
  //                     console.log("后台返回", result);
  //                     wx.setStorageSync("userData", result.data);
  //                     wx.setStorageSync("wechat", result.data.wechat);
  //                     wx.setStorageSync("uid", result.data.uid);

  //                     wx.navigateTo({
  //                       url: `/pages/${toUrl}/${toUrl}`
  //                     });
  //                     this.setData({
  //                       current: detail.key
  //                     });
  //                     return;
  //                   }
  //                 }
  //               });
  //             }
  //           });
  //         }
  //       });
  //     }
  //   },
  onChange(event) {
    const { key } = event.currentTarget.dataset;
    this.setData({
      [key]: event.detail
    });
  },
  handleQuery() {
    var _this = this;
    console.log("传过去的uid", wx.getStorageSync("uid"));
    wx.request({
      url: without,
      data: {
        uId: wx.getStorageSync("uid")
      },
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log("paperList", res);
        _this.setData({
          paperList: res.data.paperList
        });
      }
    });
  },
  toUserInfo() {
    //个人信息页
    wx.navigateTo({
      url: "/pages/user/user"
    });
  },
  toExam(val) {
    console.log("paper", val.currentTarget.dataset.paper);
    const paper = val.currentTarget.dataset.paper;
    const paperJson = JSON.stringify(paper);
    const from = "index";
    //任务介绍页
    wx.navigateTo({
      url: `/pages/task/task?paper=${paperJson}&from=${from}`
    });
  },
  toHistory() {
    //历史任务页
    wx.navigateTo({
      url: "/pages/finish/finish"
    });
  },
  toIndex() {
    //首页
    wx.redirectTo({
      url: "/pages/index/index"
    });
  }
});
