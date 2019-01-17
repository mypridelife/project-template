// pages/finish/index.js
import { signup, finished } from "../../config";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    ready: "back",
    current: "",
    paperList: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    const from = options.from;
    if (from == "finish") {
      console.log("finish");

      this.setData({
        current: "finish"
      });
      this.handleQuery2();
    } else {
      console.log("enroll");
      this.setData({
        current: "enroll"
      });
      this.handleQuery();
    }
  },

  handleQuery() {
    var _this = this;
    wx.request({
      url: signup,
      data: {
        uId: wx.getStorageSync("uid")
      },
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log("singup", res);
        _this.setData({
          paperList: res.data.paperList
        });
      }
    });
  },
  handleQuery2() {
    var _this = this;
    wx.request({
      url: finished,
      data: {
        uId: wx.getStorageSync("uid")
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success(res) {
        console.log("finished", res);
        _this.setData({
          paperList: res.data.paperList
        });
      }
    });
  },
  toExam(val) {
    console.log("paper", val.currentTarget.dataset.paper);
    const paper = val.currentTarget.dataset.paper;
    const paperJson = JSON.stringify(paper);
    const from = "finsih";
    //任务介绍页
    wx.navigateTo({
      url: `/pages/task/task?paper=${paperJson}&from=${from}`
    });
  },
  toDetail(val) {
    console.log("paper", val.currentTarget.dataset.paper);
    const paperId = val.currentTarget.dataset.paper.paperId;
    //答题详情
    wx.navigateTo({
      url: `/pages/details/details?paperId=${paperId}`
    });
  },
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
  onUnload: function() {
    if (this.data.ready === "back") {
      wx.reLaunch({
        url: "/pages/index/index"
      });
    } else {
    }
  },

  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
    if (detail.key === "finish") {
      this.handleQuery2();
    } else {
      this.handleQuery();
    }
  },

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
  onShareAppMessage: function() {},
  handleHistory() {
    wx.navigateTo({
      url: "/pages/details/details"
    });
  }
});
