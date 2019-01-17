const watch = require('../../utils/watch.js')

const {
  $Message
} = require('../../dist/base/index')
const {
  $Toast
} = require('../../dist/base/index')
const {
  exam,
  answer,
  upload,
  submit,
  prictiseList
} = require('../../config')

const recorderManager = wx.getRecorderManager()

const innerAudioContext1 = wx.createInnerAudioContext()
const innerAudioContext2 = wx.createInnerAudioContext()
const innerAudioContext3 = wx.createInnerAudioContext()


import {
  $init,
  $digest
} from '../../utils/common.util';
import regeneratorRuntime from '../../utils/runtime';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    question: {},
    stemMp3: [],
    stemImg: [],
    paperId: '',
    questionLists: [], // 获取的所有题目
    questionT: {}, // 当页的题目
    options: [],
    current: 1, // 当前页
    total: 1, // 总页数
    nextButton: false,
    danxuan: false,
    duoxuan: false,
    panduan: false,
    zhuguan: false,
    zhuguan1: false, // 语音
    zhuguan2: false, // 视频
    zhuguan3: false, // 图片
    zhuguan4: false, // 文件
    candidateAnswer: '', // 单选答案
    candidateAnswerArr: [], // 多选答案
    candidateAnswerText: '', // 文字答案
    candidateAnswerMp3: '', // 语音答案
    hasCandidateAnswerMp3: '未录音',
    candidateAnswerImg: [], // 图片答案
    imgUrl: [],
    mp3Url: '',
    videoUrl: '',
    candidateAnswerLocation: {
      address: '',
      latitude: '',
      longitude: '',
      name: ''
    },
    candidateAnswerFile: '', // 文件答案
    candidateAnswerVideo: '', // 视频答案
    visible2: false,
    hasNext: true,
    hidddenVideo: true

    // play: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.paperid, 'aaaaaaaaaaaaaaaaaaaaaaaaaaa')

    this.setData({
      paperId: options.paperid
    })
    this.handleQuery()
    watch.setWatcher(this)
    $init(this)
  },

  /**
   * 提示
   */
  tip: function(msg, type) {
    $Message({
      content: msg,
      type: type
    })
  },
  audioPlay: function() {
    const stemMp3 = this.data.stemMp3
    for (var i = 0; i < stemMp3.length; i++) {
      console.log('点击', stemMp3[i])

      innerAudioContext3.src = this.data.stemMp3[i]
    innerAudioContext3.play()
    innerAudioContext3.onPlay(() => {

      })
 }
  },
  audioPlay1: function() {
    console.log(this.data.stemMp3)
    innerAudioContext3.src = this.data.stemMp3
    innerAudioContext3.pause()

  },
  /**
   * 分页
   */
  // 示例音频

  // 提交答案
  handleStorage() {
    var that = this
    return new Promise((resolve, reject) => {
      // 存入数据库

      wx.request({
        url: answer,
        data: {
          questionId: that.data.questionT.questionId,
          paperId: that.data.paperId,
          uid: wx.getStorageSync('uid'),
          phaseType: 0,
          answerDetail: {
            candidateAnswer: that.data.candidateAnswer,
            candidateAnswerArr: that.data.candidateAnswerArr,
            candidateAnswerText: that.data.candidateAnswerText,
            mp3Url: that.data.mp3Url,
            imgUrl: that.data.imgUrl,
            videoUrl: that.data.videoUrl,
            candidateAnswerLocation: that.data.candidateAnswerLocation
          }
        },
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          console.log('存入数据库', res)
          if (res.data.success) {
            that.tip('答案符合要求', 'success')
            that.setData({
              current: that.data.current + 1,
              candidateAnswer: '',
              candidateAnswerArr: [], // 多选答案
              candidateAnswerText: '', // 文字答案
              candidateAnswerMp3: '', // 语音答案
              hasCandidateAnswerMp3: '未录音',
              candidateAnswerImg: [], // 图片答案
              imgUrl: [],
              mp3Url: '',
              videoUrl: that.data.videoUrl,
              candidateAnswerLocation: {}
              // candidateAnswerFile: "", //文件答案
              // candidateAnswerVideo: "" //视频答案
            })
            that.setData({
              questionT: that.data.questionLists[that.data.current - 1]
            })
            that.setData({
              options: that.data.questionT.question.options
            })
            that.setData({
              stemImg: that.data.questionT.question.stemImg
            })
            that.setData({
              stemMp3: that.data.questionT.question.stemMp3
            })
            resolve()
          } else {
            that.tip('答案不符合要求', 'error')
            resolve()
          }
        },
        fail(error) {
          console.log(error)
          that.tip('未知错误', 'error')
        }
      })
    })
  },
  handleOss() {
    var that = this
    return new Promise((resolve, reject) => {
      if (
        that.data.questionT.questionType === 3 &&
        that.data.questionT.answerType === 2
      ) {
        console.log('图片存oss')
        //存入oss、获取到url
        if (that.data.candidateAnswerImg.length !== 0) {
          var length = 0
          for (const img of that.data.candidateAnswerImg) {
            wx.uploadFile({
              url: upload,
              filePath: img,
              name: 'file',
              method: 'POST',
              success(res) {
                if (res.statusCode === 200) {
                  length++
                  console.log('图片路径', JSON.parse(res.data))
                  that.data.imgUrl.push(JSON.parse(res.data).url)
                  console.log('imgurlarr', that.data.imgUrl)
                  if (length === that.data.candidateAnswerImg.length) {
                    console.log(
                      '原始数组长度',
                      that.data.candidateAnswerImg.length
                    )
                    resolve()
                  }
                } else {
                  $Toast({
                    content: '上传失败，请稍后再试',
                    type: 'false',
                    duration: 1
                  })
                }
              },
              fail(err) {
                console.log(err)
                resolve()
              }
            })
          }
        } else {
          resolve()
        }
      } else if (
        that.data.questionT.questionType === 3 &&
        that.data.questionT.answerType === 1
      ) {
        console.log('语音存oss')

        wx.uploadFile({
          url: upload,
          filePath: that.data.candidateAnswerMp3,
          name: 'file',
          method: 'POST',
          success(res) {
            console.log('存入oss', JSON.parse(res.data).url)
            that.setData({
              mp3Url: JSON.parse(res.data).url
            })
            resolve()
          },
          fail(err) {
            console.log(err)
            resolve()
          }
        })
      } else if (
        that.data.questionT.questionType === 3 &&
        that.data.questionT.answerType === 4
      ) {
        console.log('视频存oss')

        wx.uploadFile({
          url: upload,
          filePath: that.data.candidateAnswerVideo,
          name: 'file',
          method: 'POST',
          success(res) {
            console.log('存入oss', res.data)
            that.setData({
              videoUrl: JSON.parse(res.data).url
            })
            resolve()
          },
          fail(err) {
            console.log(err)
            resolve()
          }
        })
      } else {
        resolve()
      }
    })
  },
  async handleChange(val) {
    var that = this
    var current = val.currentTarget.dataset.current
    console.log(current, '1111111111111111')
    if (current < this.data.total) {
      $Toast({
        content: '加载中',
        type: 'loading',
        duration: 0
      })
      await that.handleOss()
      await that.handleStorage()
      $Toast.hide()
    } else {}
  },
  /**
   * 获取题目文字
   */
  handleQuery: function() {
    var that = this
    console.log('uid', wx.getStorageSync('uid'))

    wx.request({
      url: prictiseList,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        uId: wx.getStorageSync('uid'),
        paperId: that.data.paperId
      },
      method: 'POST',
      success(res) {
        if (res.statusCode === 200 && res.data.success) {
          console.log('questionLists', res.data)
          that.setData({
            questionLists: res.data.questionLists
          })
          that.setData({
            questionT: that.data.questionLists[that.data.current - 1]
          })
          console.log('questionT', that.data.questionT)
          that.setData({
            options: that.data.questionT.question.options
          })
          that.setData({
            stemImg: that.data.questionT.question.stemImg

          })
          that.setData({
            // stemMp3: that.data.questionT.question.stemMp3[0]
            stemMp3: that.data.questionT.question.stemMp3

          })
          console.log(' 示例音频', that.data.stemMp3)
          console.log('stemImg', that.data.stemImg)
          that.setData({
            total: that.data.questionLists.length
          })
          if (that.data.current >= that.data.questionLists.length) {
            that.setData({
              nextButton: true,
              hasNext: false
            })
         }
        } else {
          that.tip('网络错误', 'error')
        }
      },
      fail(error) {
        console.log(error)
        that.tip('未知错误', 'error')
      }

    })

  },

  /**
   * 播放题目
   */
  playQuestion: function(val) {
    var that = this
    var temp = val.currentTarget.dataset.question
    if (temp !== '') {
      var src =
        'http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=5&text=' + temp
      console.log('题目音源：', src)

      if (src === '') {
        that.tip('获取音源失败！', 'error')
        return;
      } else {
        innerAudioContext1.src = src
        innerAudioContext1.play()
        // innerAudioContext1.onPlay(() => {
        //   that.setData({
        //     play: true
        //   })
        // })
        // innerAudioContext1.onEnded(() => {
        //   that.setData({
        //     play: false
        //   })
        // })
        innerAudioContext1.onError(res => {
          that.tip('播放题目失败！', 'error')
        })
      }
    } else {
      that.tip('获取题目失败！', 'error')
    }
  },

  /**
   * 单选题选择事件
   */
  handleRadioChange(val) {
    this.setData({
      candidateAnswer: val.currentTarget.dataset.name
    })
    console.log('选中的', this.data.candidateAnswer)
  },
  /**
   * 多选题
   */
  handleCheckboxChange(event) {
    // const { value } = event.currentTarget.dataset;
    this.setData({
      candidateAnswerArr: event.detail
    })
    console.log('多选答案', this.data.candidateAnswerArr)
  },
  toggle(event) {
    const {
      name
    } = event.currentTarget.dataset
    const checkbox = this.selectComponent(`.checkboxes-${name}`)
    checkbox.toggle()
  },
  noop() {},
  /**
   * 主观题
   */

  handleTextChange({
    detail = {}
  }) {
    console.log('输入的值', detail.detail.value)
    this.setData({
      candidateAnswerText: detail.detail.value
    })
  },
  touchStart: function() {
    console.log('touchStart....')
    this.startRecordMp3()
  },

  touchEnd: function() {
    console.log('touchEnd....')
    this.stopRecord()
  },

  /**
   * 停止播放题目
   */
  // stopQuestion() {
  //   var that = this
  //   innerAudioContext1.pause()
  //   innerAudioContext1.onPause((res) => {
  //     that.setData({
  //       play: false
  //     })
  //   })
  // },

  /**
   * 开始录音
   */
  startRecordMp3: function() {
    var that = this
    recorderManager.start({
      format: 'mp3'
    })
    recorderManager.onError(function() {
      that.tip('录音失败！', 'error')
    })
  },

  /**
   * 停止录音
   */
  stopRecord: function() {
    var that = this
    recorderManager.stop()
    recorderManager.onStop(function(res) {
      that.setData({
        candidateAnswerMp3: res.tempFilePath
      })
      console.log('音频答案', res.tempFilePath)
      that.tip('录音完成！')
    })
  },

  /**
   * 播放录音
   */
  playRecord: function() {
    var that = this
    console.log(this.data.candidateAnswerMp3)

    if (this.data.candidateAnswerMp3 == '') {
      that.tip('请先录音！', 'warning')
      return;
    }
    innerAudioContext2.src = this.data.candidateAnswerMp3
    innerAudioContext2.play()
    innerAudioContext2.onError(res => {
      that.tip('播放录音失败！', 'error')
    })
  },

  /**
   * 删除录音答案
   */
  handleDelete: function() {
    var that = this
    that.setData({
      candidateAnswerMp3: ''
    })
    that.tip('已删除', 'success')
  },

  /**
   *上传图片
   */
  uploadImg() {
    console.log('已上传', this.data.candidateAnswerImg)

    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], // 可选择性开放访问相册、相机
      success: res => {
        const images = this.data.candidateAnswerImg.concat(res.tempFilePaths)
        // 限制最多只能留下5张照片
        this.data.candidateAnswerImg =
          images.length <= 5 ? images : images.slice(0, 5)
        $digest(this)
      }
    })
  },
  removeImage(e) {
    const idx = e.target.dataset.idx
    this.data.candidateAnswerImg.splice(idx, 1)
    $digest(this)
  },

  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images = this.data.candidateAnswerImg
    wx.previewImage({
      current: images[idx], // 当前预览的图片
      urls: images // 所有要预览的图片
    })
  },
  submitImg() {
    wx.uploadFile({
      url: upload, // 此处换上你的接口地址
      filePath: this.data.candidateAnswerImg,
      name: 'img',
      header: {
        'Content-Type': 'multipart/form-data',
        accept: 'application/json',
        Authorization: 'Bearer ..' // 若有token，此处换上你的token，没有的话省略
      },
      formData: {
        user: 'test' // 其他额外的formdata，可不写
      },
      success: function(res) {
        var data = res.data
        console.log('data')
      },
      fail: function(res) {
        console.log('fail')
      }
    })
  },

  /**
   * 视频
   */
  uploadVideo() {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success(res) {
        console.log(res.tempFilePath)
        that.setData({
          candidateAnswerVideo: res.tempFilePath
        })
      }
    })
  },
  removeVideo() {
    this.setData({
      candidateAnswerVideo: ''
    })
  },
  submitVideo() {},
  /**
   * 文件
   */
  uploadFile() {
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success(res) {
        console.log(res.tempFilePath)
      }
    })
  },
  removeFile() {},
  submitFile() {},
  /**
   * 位置
   */
  uploadLocation() {
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        that.setData({
          'candidateAnswerLocation.longitude': res.longitude,
          'candidateAnswerLocation.latitude': res.latitude
        })
        console.log('当前位置', that.data.candidateAnswerLocation)
      }
    })
    this.selectedClick()
  },
  // 选择位置
  selectedClick: function() {
    // 设置权限
    // wx.openSetting({
    //   success: function(res) {
    //     console.log(res);

    // 选择位置
    var that = this
    wx.chooseLocation({
      success: function(res) {
        console.log('选择位置', res)
        that.setData({
          'candidateAnswerLocation.longitude': res.longitude,
          'candidateAnswerLocation.latitude': res.latitude,
          'candidateAnswerLocation.name': res.name,
          'candidateAnswerLocation.address': res.address
        })
        console.log('当前位置', that.data.candidateAnswerLocation)
        // 打开位置
        // wx.openLocation({
        //   latitude: res.latitude,
        //   longitude: res.longitude,
        //   name: res.name,
        //   address: res.address
        // });
      }
    })
    //   }
    // });
  },
  removeLocation() {
    this.setData({
      candidateAnswerLocation: {}
    })
  },
  submitLocation() {},
  /**
   * 交卷
   */
  async handleSubmit() {
    var that = this
    await that.handleOss()
    //存入数据库
    wx.request({
      url: answer,
      data: {
        questionId: that.data.questionT.questionId,
        paperId: that.data.paperId,
        uid: wx.getStorageSync('uid'),
        phaseType: 0,
        answerDetail: {
          candidateAnswer: that.data.candidateAnswer,
          candidateAnswerArr: that.data.candidateAnswerArr,
          candidateAnswerText: that.data.candidateAnswerText,
          mp3Url: that.data.mp3Url,
          imgUrl: that.data.imgUrl,
          videoUrl: that.data.videoUrl,
          candidateAnswerLocation: that.data.candidateAnswerLocation
        }
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log('存入数据库', res)
        if (res.data.success) {
          that.tip('答案符合要求', 'success')
          that.setData({
            visible2: true
          })
          that.setData({
            hidddenVideo: false
          })
        } else {
          that.tip('答案不符合要求', 'error')
        }
      },
      fail(error) {
        console.log(error)
        that.tip('未知错误', 'error')
      }
    })
  },
  handleClose2() {
    this.setData({
      hidddenVideo: true
    })
    this.setData({
      visible2: false
    })
  },
  handleNavigate() {
    var that = this
    const paperId = this.data.paperId
    wx.request({
      url: submit,
      data: {
        paperId: that.data.paperId,
        uId: wx.getStorageSync('uid'),
        phaseType: 0
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success(res) {
        console.log('交卷', res.data)
        that.setData({
          visible2: false
        })
        $Toast.hide()
        $Toast({
          content: '恭喜通过练习，3秒开始考试题',
          type: 'success'
        })
        setTimeout(() => {
          $Toast.hide()
          wx.redirectTo({
            url: `/pages/beforeExam/beforeExam?paperid=${paperId}`,
            success() {}
          })
        }, 3000)
        // that.tip("已交卷", "success");
      }
    })
  },

  watch: {
    questionT: function(n, o) {
      this.setData({
        danxuan: false,
        duoxuan: false,
        panduan: false,
        zhuguan: false,
        zhuguan0: false,
        zhuguan1: false,
        zhuguan2: false,
        zhuguan3: false,
        zhuguan4: false,
        zhuguan5: false
      })

      console.log('questionT新值', n)
      if (n.questionType === 0) {
        this.setData({
          danxuan: true
        })
      } else if (n.questionType === 1) {
        this.setData({
          duoxuan: true
        })
      } else if (n.questionType === 3) {
        if (n.answerType === 0) {
          this.setData({
            zhuguan0: true
          })
        } else if (n.answerType === 1) {
          this.setData({
            zhuguan1: true
          })
        } else if (n.answerType === 2) {
          this.setData({
            zhuguan2: true
          })
        } else if (n.answerType === 3) {
          this.setData({
            zhuguan3: true
          })
        } else if (n.answerType === 4) {
          this.setData({
            zhuguan4: true
          })
        } else if (n.answerType === 5) {
          this.setData({
            zhuguan5: true
          })
        }
      }
    },
    current: function(n) {
      console.log(this.data.total)
      if (n >= this.data.total) {
        this.setData({
          nextButton: true,
          hasNext: false
        })
      }
    },
    total: function(n) {
      console.log(n)
      console.log(this.data.current)

      if (n <= this.data.current) {
        this.setData({
          nextButton: true
        })
      }
    },
    candidateAnswerMp3: function(n) {
      if (n !== '') {
        this.setData({
          hasCandidateAnswerMp3: '已录音'
        })
        console.log(this.data.hasCandidateAnswerMp3)
      } else {
        this.setData({
          hasCandidateAnswerMp3: '未录音'
        })
      }
    }
  }
})
