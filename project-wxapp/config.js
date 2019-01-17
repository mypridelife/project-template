/**
 * 小程序配置文件
 */
// var host = "http://yapi.hzhengji.cn/mock/66";
// var host = "https://gather-api.g-fms.com";
let host = version();

function version() {
  console.log('envVersion', __wxConfig.envVersion);
  let version = __wxConfig.envVersion;
  switch (version) {
    case 'develop':
      return 'https://dev-gather-api.hzhengji.cn';
      break;
    case 'trial':
      return 'https://pre-gather-api.hzhengji.cn';
      break;
    case 'release':
      return 'https://nong-api.dc-p.cn.cn';
      break;
    default:
      return 'https://pre-gather-api.hzhengji.cn';
  }
}

var config = {
  host,
  login: `${host}/wechat/login`,
  without: `${host}/task/without/list`, //获取未报名任务
  signup: `${host}/task/signup/list`, //获取已报名未完成任务
  finished: `${host}/task/finished/list`, //获取已完成任务
  exam: `${host}/paper/questionList`, //获取试题
  prictiseList: `${host}/paper/prictiseList`, //获取练习题
  examList: `${host}/paper/examList`, //获取考试题
  answer: `${host}/answer/question`, //提交本题答案
  submit: `${host}/answer/submit`, //交卷
  practice: `${host}/answer/practice`, //判断是否做过练习题
  taskSignup: `${host}/task/signup`, //报名

  //   upload: "http://192.168.0.168:8081/oss/head/upload",
  upload: `${host}/oss/head/upload`,
  answerDetail: `${host}/paper/answerDetail` //获取答题详情
};
module.exports = config;
