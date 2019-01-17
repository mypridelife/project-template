// pages/task/task.js
const { $Message } = require("../../dist/base/index");
const { $Toast } = require("../../dist/base/index");

import { taskSignup, practice } from "../../config";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    paper: {},
    visible1: false,
    practise: false,
    cancle: false,
    from: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("选择的任务", options);
    console.log("选择的任务", options.paper);
    console.log("from", options.from);
    const paper = JSON.parse(options.paper);
    const from = options.from;
    if (from === "index") {
      this.setData({
        from: true
      });
    } else {
      this.setData({
        from: false
      });
    }
    this.setData({
      paper: paper
    });
  },

  tip: function(msg, type) {
    $Message({
      content: msg,
      type: type
    });
  },
  handleEnroll(val) {
    var that = this;
    const paperId = val.currentTarget.dataset.paperid;
    console.log(
      "报名传过去的",
      "uid:",
      wx.getStorageSync("uid"),
      "paperId:",
      paperId
    );

    wx.request({
      url: taskSignup,
      method: "POST",
      data: {
        uId: wx.getStorageSync("uid"),
        paperId: paperId
      },
      header: {
        "content-type": "application/x-www-form-urlencoded" // 默认值
      },
      success(res) {
        if (res.statusCode === 200 && res.data.success) {
          that.tip("报名成功", "success");
          that.setData({
            from: false
          });
        } else {
          that.tip("报名失败", "error");
        }
      }
    });
  },
  handleStart(val) {
    var that = this;
    const paperid = val.currentTarget.dataset.paperid;

    wx.request({
      url: practice,
      method: "POST",
      data: {
        uId: wx.getStorageSync("uid"),
        paperId: paperid
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log("练习过", res.data);

        if (res.data.finishType === 0) {
          $Toast({
            content: "您未通过练习题，3秒钟之后开始练习题",
            type: "loading",
            duration: 3
          });
          setTimeout(() => {
            wx.navigateTo({
              url: `/pages/practise/practise?paperid=${paperid}`
            });
          }, 3000);
          //   that.setData({
          //     practise: true
          //   });
        } else if (res.data.finishType === 1) {
          $Toast({
            content: "您已通过练习题，3秒钟之后开始考试题",
            type: "loading",
            duration: 3
          });
          setTimeout(() => {
            wx.navigateTo({
              url: `/pages/beforeExam/beforeExam?paperid=${paperid}`
            });
          }, 3000);
        } else if (res.data.finishType === 2) {
          $Toast({
            content: "您已通过考试题，3秒钟之后开始正式题",
            type: "loading",
            duration: 3
          });
          setTimeout(() => {
            wx.navigateTo({
              url: `/pages/exam/exam?paperid=${paperid}`
            });
          }, 3000);
        } else {
        }
      }
    });
  },
  handleOk() {
    console.log("拒绝");
    this.setData({
      visible1: false
    });
  },
  handleOk2(val) {
    var that = this;
    const paperid = val.currentTarget.dataset.paperid;
    wx.navigateTo({
      url: `/pages/practise/practise?paperid=${paperid}`
    });
    that.setData({
      practise: false
    });
  },
  //   getUserInfo: function(e) {
  //     var that = this;
  //     const paperid = e.currentTarget.dataset.paperid;
  //     if (wx.getStorageSync("userData")) {
  //       console.log("已授权");

  //       wx.navigateTo({
  //         url: `/pages/chooseExam/chooseExam?paperid=${paperid}`
  //       });
  //     } else {
  //       console.log("未授权");
  //       wx.login({
  //         success: function(res) {
  //           const userRes = e.detail;
  //           console.log("getUserInfo", userRes);
  //           const encryptedData = userRes.encryptedData;
  //           const iv = userRes.iv;
  //           wx.request({
  //             // url: login,
  //             url: "https://pp.hzhengji.cn/wx/api/rest/v2.0/login",
  //             method: "GET",
  //             header: {
  //               "Content-Type": "application/json"
  //             },
  //             data: {
  //               code: res.code,
  //               encryptedData: encryptedData,
  //               iv: iv
  //             },
  //             //服务端的回调
  //             success: function(result) {
  //               if (!result.data) {
  //                 console.log("拒绝授权", result);
  //                 that.setData({
  //                   visible1: true
  //                 });
  //               } else {
  //                 console.log("后台返回", result);
  //                 wx.setStorageSync("userData", result.data);
  //                 wx.setStorageSync("wechat", result.data.wechat);
  //                 wx.setStorageSync("uid", result.data.uid);
  //                 wx.navigateTo({
  //                   url: `/pages/chooseExam/chooseExam?paperid=${paperid}`
  //                 });
  //                 return;
  //               }
  //             }
  //           });
  //           //   }
  //           // });
  //         }
  //       });
  //     }
  //   },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
