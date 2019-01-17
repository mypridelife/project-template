const watch = require("../../utils/watch.js");

const { $Message } = require("../../dist/base/index");

const { answerDetail } = require("../../config");

const innerAudioContext2 = wx.createInnerAudioContext();

import { $init, $digest } from "../../utils/common.util";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    paperId: "",
    current: 1,
    questionLists: [], //获取的所有题目
    candidateAnswer: "", //单选答案
    candidateAnswerArr: [], //多选答案
    candidateAnswerText: "", //文字答案
    candidateAnswerMp3: "", //语音答案
    hasCandidateAnswerMp3: "未录音",
    candidateAnswerImg: [], //图片答案
    candidateAnswerFile: "", //文件答案
    candidateAnswerVideo: "", //视频答案
    visible2: false
    // play: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      paperId: options.paperId
    });
    this.handleQuery();
    watch.setWatcher(this);
    $init(this);
  },

  /**
   * 提示
   */
  tip: function(msg, type) {
    $Message({
      content: msg,
      type: type
    });
  },

  /**
   * 获取题目文字
   */
  handleQuery: function() {
    var that = this;

    wx.request({
      url: answerDetail,
      method: "POST",
      data: {
        paperId: that.data.paperId,
        uId: wx.getStorageSync("uid")
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log("questionLists", res.data);
        that.setData({
          questionLists: res.data.questionLists
        });
        console.log(that.data.questionLists);
      },
      fail(error) {
        console.log(error);
      }
    });
  },

  /**
   * 播放录音
   */
  playRecord: function(val) {
    var that = this;
    const src = val.currentTarget.dataset.candidateanswermp3;
    console.log(val);
    console.log(src);

    if (src) {
      innerAudioContext2.src = src;
      innerAudioContext2.play();
    } else {
      that.tip("音频文件为空", "warning");
      return;
    }
    innerAudioContext2.onError(res => {
      that.tip("播放录音失败！", "error");
    });
  },

  /**
   *上传图片
   */

  handleImagePreview(e) {
    const idx = e.target.dataset.idx;
    console.log(e.target);

    const images = this.data.candidateAnswerImg;
    wx.previewImage({
      current: images[idx], //当前预览的图片
      urls: images //所有要预览的图片
    });
  },
  watch: {}
});
