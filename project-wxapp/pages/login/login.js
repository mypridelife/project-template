// pages/login/login.js
import {
  login
} from '../../config';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    optionsT2: '',
    visible1: false,
    cancle: false,
    q: {}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 页面跳转逻辑
  onLoad: function(options) {
    var that = this
    var options = options
    that.setData({
      q: JSON.stringify(options)
    })
    console.log(that.data.q)
    if (JSON.stringify(options) == '{}') {
      const uid = wx.getStorageSync('uid')
      if (uid) {
        console.log('已授权', uid)
        wx.redirectTo({
          url: `/pages/index/index`
          // url: `/pages/exam/exam`
        })
      } else {
        console.log('未授权')
      }
    } else {
      const optionT = options.q
      var arr = optionT.split('')
      that.setData({
        optionsT2: arr[arr.length - 1]
      })
      const paperid = that.data.optionsT2
      console.log('数据', paperid)
      wx.setStorageSync('paperid', paperid)
      const uid = wx.getStorageSync('uid')
      if (uid) {
        wx.redirectTo({
          // url: `/pages/index/index`
          url: `/pages/exam/exam?paperid=${paperid}`
        })
        console.log('已授权')

        // this.getFlowId(uid);
      } else {
        console.log('未授权')
      }
    }
    // }

    // console.log(options)
    // if (options == null) {

    // } else {

    // }

    // if (wx.getStorageSync("userData")) {
    //   console.log("已授权");

    //   wx.redirectTo({
    //      url: "/pages/index/index"

    //   });
    // } else {
    //   console.log("未授权");
    // }
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
  onShareAppMessage: function() {},
  handleOk() {
    console.log('拒绝')
    this.setData({
      visible1: false
    })
  },
  getUserInfo: function(e) {
    var that = this
    wx.login({
      success: function(res) {
        const userRes = e.detail
        console.log('getUserInfo', userRes)
        const encryptedData = userRes.encryptedData
        const iv = userRes.iv
        wx.request({
          url: login,
          //   url: "https://pp.hzhengji.cn/wx/api/rest/v2.0/login",
          //   url: "http://192.168.0.168:8081/wechat/login",
          method: 'GET',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            code: res.code,
            encryptedData: encryptedData,
            iv: iv
          },
          // 服务端的回调
          success: function(result) {
            if (!result.data) {
              console.log('拒绝授权', result)
              that.setData({
                visible1: true
              })
            } else {
              console.log('后台返回', result)
              wx.setStorageSync('userData', result.data.user)
              wx.setStorageSync('uid', result.data.user.id)
              console.log('q值', that.data.q)
              const paperid = wx.getStorageSync('paperid')
              if (that.data.q == '{}') {
                wx.redirectTo({
                  url: '/pages/index/index'
                })
              } else {
                wx.redirectTo({
                  url: `/pages/exam/exam?paperid=${paperid}`
                })

              }
              return
            }
          }
        })
        //   }
        // });
      }
    })
  }
})
