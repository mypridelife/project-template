<template>
  <div style="width:100%; height:100%;">
    <div style="float:left; width:12%; height:100%;padding-top:3%;padding-left:3%;">
      <el-button style="margin-bottom:15px;" @click="addQuestion(0)">单选题</el-button><br>
      <el-button style="margin-bottom:15px;" @click="addQuestion(1)">多选题</el-button><br>
      <!-- <el-button @click="addQuestion(2)" style="margin-bottom:15px;">判断题</el-button><br> -->
      <el-button style="margin-bottom:15px;" @click="addQuestion(3)">问答题</el-button>
    </div>
    <div style="float:left; width:88%; height:100%;padding-top:3%;">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="试卷描述" name="0">
          <el-form label-width="100px" style="" >
            <el-form-item label="试卷名称">
              <el-input v-model="paper.paperName" style="width:95%;" placeholder="请输入试卷名称"/>
            </el-form-item>
            <el-form-item label="试卷描述">
              <el-input v-model="paper.paperDescription" type="textarea" style="width:95%;" placeholder="请输入试卷描述"/>
            </el-form-item>
            <el-form-item label="试卷简述">
              <el-input v-model="paper.paperSummary" type="textarea" style="width:95%;" placeholder="请输入试卷简述"/>
            </el-form-item>
            <el-form-item label="试卷奖励">
              <el-input v-model="paper.paperWard" type="textarea" style="width:95%;" placeholder="请输入试卷奖励"/>
            </el-form-item>
            <el-form-item label="试卷类型">
              <el-select v-model="paper.paperType" class="filter-item" placeholder="请选择" >
                <el-option v-for="item in paperTypes" :key="item" :label="item | paperTypeFilter" :value="item"/>
              </el-select>
            </el-form-item>
          </el-form>
          <div style="text-align:center;">
            <el-button type="primary" style="margin-bottom:15px;" @click="subInfo()">保存信息</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="设置练习" name="1">
          <div style="text-align: center;">
            <h4>从左侧选择需要添加的试题类型</h4>
          </div>
          <div v-for="(question,index) in questionDto" :key="index">
            <el-form label-width="80px" style="padding-right:15px;margin:10px 15px;box-shadow: 3px 3px 5px #888888;">
              <div v-if="question.questionType!=3">
                <div style="padding:20px 15px;">
                  第{{ index+1 }}题 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ question.questionType==0?"单选题":"多选题" }}
                  <i class="el-icon-delete" style="position: absolute;right:3%;" @click="delQuestion(index)"/>
                </div>
                <el-form-item label="题干内容">
                  <el-input
                    :autosize="{ minRows: 2, maxRows: 8}"
                    v-model="question.questions.stem"
                    type="textarea"
                    placeholder="请输入判断题题干内容"/>
                </el-form-item>
                <el-form-item label="上传图片" >
                  <div @mouseenter="mous(index)">
                    <el-upload :action="url+'/oss/head/upload'" :on-success="upImg" :on-preview="handlePreviewImg" :on-remove="handleRemoveImg" :file-list="question.questions.stemImg" class="upload-demo" style="width:20%;" list-type="picture">
                      <el-button size="small" type="primary" @click="img(index)">点击上传</el-button>
                    </el-upload>
                  </div>
                </el-form-item>
                <el-form-item label="上传音频">
                  <el-upload :show-file-list="false" :action="url+'/oss/head/upload'" :on-success="upMP3" class="upload-demo" style="width:20%;" list-type="picture">
                    <el-button size="small" type="primary" @click="img(index)">点击上传</el-button>
                  </el-upload>
                  <div v-for="(mp3,index1) in question.questions.stemMp3" :key="index1">
                    <video :src="mp3.url" style="height: 60px; width: 260px;" class="avatar" controls="controls">您的浏览器不支持视频播放</video>
                    <i class="el-icon-delete" style="position: absolute;right:75%;top:65px;" @click="delMP3(index,index1)"/>
                  </div>
                </el-form-item>
                <div v-for="(option,index1) in question.questions.options" :key="index1">
                  <el-form-item :label="'选项'+charCode(index1)">
                    <el-input
                      :autosize="{ minRows: 2, maxRows: 8}"
                      v-model="option.value"
                      type="textarea"
                      placeholder="请输入判断题选项内容"/>
                    <div v-if="question.questions.options.length>2" style="margin-top: -48px;position: absolute;right: 1%;">
                      <i class="el-icon-delete" @click="delTag(index,index1)"/>
                    </div>
                  </el-form-item>
                </div>
                <div style="text-align:center" >
                  <el-button style="margin-bottom:15px;" @click="addTag(question.questions.options.length,index)">添加选项</el-button>
                  <el-button type="primary" style="margin-bottom:15px;" @click="subQuestion(index)">保存本题</el-button>
                  <!-- <el-button @click="subImg(index)" size="small" type="primary" style="margin-bottom:15px;">上传图片</el-button>
                                    <el-button @click="subMP3(index)" size="small" type="primary" style="margin-bottom:15px;">上传音频</el-button> -->
                </div>
              </div>
              <div v-if="question.questionType==3">
                <div style="padding:20px 15px;">
                  第{{ index+1 }}题&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;问答题
                  <i class="el-icon-delete" style="position: absolute;right:3%;" @click="delQuestion(index)"/>
                </div>
                <el-form-item label="题干内容">
                  <el-input
                    :autosize="{ minRows: 2, maxRows: 8}"
                    v-model="question.questions.stem"
                    type="textarea"
                    placeholder="请输入判断题题干内容"/>
                </el-form-item>
                <el-form-item label="上传图片" >
                  <div @mouseenter="mous(index)">
                    <el-upload :action="url+'/oss/head/upload'" :on-success="upImg" :on-preview="handlePreviewImg" :on-remove="handleRemoveImg" :file-list="question.questions.stemImg" class="upload-demo" style="width:20%;" list-type="picture">
                      <el-button size="small" type="primary" @click="img(index)">点击上传</el-button>
                    </el-upload>
                  </div>
                </el-form-item>
                <el-form-item label="上传音频">
                  <el-upload :show-file-list="false" :action="url+'/oss/head/upload'" :on-success="upMP3" class="upload-demo" style="width:20%;" list-type="picture">
                    <el-button size="small" type="primary" @click="img(index)">点击上传</el-button>
                  </el-upload>
                  <div v-for="(mp3,index1) in question.questions.stemMp3" :key="index1">
                    <video :src="mp3.url" style="height: 60px; width: 260px;" class="avatar" controls="controls">您的浏览器不支持视频播放</video>
                    <i class="el-icon-delete" style="position: absolute;right:75%;top:65px;" @click="delMP3(index,index1)"/>
                  </div>
                </el-form-item>
                <el-form-item label="答案类型" prop="cardStyle" >
                  <el-select v-model="question.answerType" class="filter-item" placeholder="请选择" >
                    <el-option v-for="item in answers" :key="item" :label="item | answerFilter" :value="item"/>
                  </el-select>
                </el-form-item>
                <div style="text-align:center" >
                  <el-button type="primary" style="margin-bottom:15px;" @click="subQuestion(index)">保存本题</el-button>
                </div>
              </div>
            </el-form>
          </div>
          <div style="width:100px;height:60px;"/>
          <div class="bottom-button" >
            <el-button type="primary" style="margin-bottom:15px;" @click="subQuestions()">保存试卷</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="设置考试" name="2">
          <div style="text-align: center">
            <h4>从左侧选择需要添加的试题类型</h4>
          </div>
          <div v-for="(question,index) in questionDto" :key="index">
            <el-form label-width="80px" style="padding-right:15px;margin:10px 15px;box-shadow: 3px 3px 5px #888888;">
              <div v-if="question.questionType!=3">
                <div style="padding:20px 15px;">
                  第{{ index+1 }}题&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ question.questionType==0?"单选题":"多选题" }}
                  <i class="el-icon-delete" style="position: absolute;right:3%;" @click="delQuestion(index)"/>
                </div>
                <el-form-item label="题干内容">
                  <el-input
                    :autosize="{ minRows: 2, maxRows: 8}"
                    v-model="question.questions.stem"
                    type="textarea"
                    placeholder="请输入判断题题干内容"/>
                </el-form-item>
                <el-form-item label="上传图片" >
                  <div @mouseenter="mous(index)">
                    <el-upload :action="url+'/oss/head/upload'" :on-success="upImg" :on-preview="handlePreviewImg" :on-remove="handleRemoveImg" :file-list="question.questions.stemImg" class="upload-demo" style="width:20%;" list-type="picture">
                      <el-button size="small" type="primary" @click="img(index)">点击上传</el-button>
                    </el-upload>
                  </div>
                </el-form-item>
                <el-form-item label="上传音频">
                  <el-upload :show-file-list="false" :action="url+'/oss/head/upload'" :on-success="upMP3" class="upload-demo" style="width:20%;" list-type="picture">
                    <el-button size="small" type="primary" @click="img(index)">点击上传</el-button>
                  </el-upload>
                  <div v-for="(mp3,index1) in question.questions.stemMp3" :key="index1">
                    <video :src="mp3.url" style="height: 60px; width: 260px;" class="avatar" controls="controls">您的浏览器不支持视频播放</video>
                    <i class="el-icon-delete" style="position: absolute;right:75%;top:65px;" @click="delMP3(index,index1)"/>
                  </div>
                </el-form-item>
                <div v-for="(option,index1) in question.questions.options" :key="index1">
                  <el-form-item :label="'选项'+charCode(index1)">
                    <el-input
                      :autosize="{ minRows: 2, maxRows: 8}"
                      v-model="option.value"
                      type="textarea"
                      placeholder="请输入判断题选项内容"/>
                    <div v-if="question.questions.options.length>2" style="margin-top: -48px;position: absolute;right: 1%;">
                      <i class="el-icon-delete" @click="delTag(index,index1)"/>
                    </div>
                  </el-form-item>
                </div>
                <div style="text-align:center" >
                  <el-button style="margin-bottom:15px;" @click="addTag(question.questions.options.length,index)">添加选项</el-button>
                  <el-button type="primary" style="margin-bottom:15px;" @click="subQuestion(index)">保存本题</el-button>
                </div>
              </div>
              <div v-if="question.questionType==3">
                <div style="padding:20px 15px;">
                  第{{ index+1 }}题&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;问答题
                  <i class="el-icon-delete" style="position: absolute;right:3%;" @click="delQuestion(index)"/>
                </div>
                <el-form-item label="题干内容">
                  <el-input
                    :autosize="{ minRows: 2, maxRows: 8}"
                    v-model="question.questions.stem"
                    type="textarea"
                    placeholder="请输入判断题题干内容"/>
                </el-form-item>
                <el-form-item label="上传图片" >
                  <div @mouseenter="mous(index)">
                    <el-upload :action="url+'/oss/head/upload'" :on-success="upImg" :on-preview="handlePreviewImg" :on-remove="handleRemoveImg" :file-list="question.questions.stemImg" class="upload-demo" style="width:20%;" list-type="picture">
                      <el-button size="small" type="primary" @click="img(index)">点击上传</el-button>
                    </el-upload>
                  </div>
                </el-form-item>
                <el-form-item label="上传音频">
                  <el-upload :show-file-list="false" :action="url+'/oss/head/upload'" :on-success="upMP3" class="upload-demo" style="width:20%;" list-type="picture">
                    <el-button size="small" type="primary" @click="img(index)">点击上传</el-button>
                  </el-upload>
                  <div v-for="(mp3,index1) in question.questions.stemMp3" :key="index1">
                    <video :src="mp3.url" style="height: 60px; width: 260px;" class="avatar" controls="controls">您的浏览器不支持视频播放</video>
                    <i class="el-icon-delete" style="position: absolute;right:75%;top:65px;" @click="delMP3(index,index1)"/>
                  </div>
                </el-form-item>
                <el-form-item label="答案类型" prop="cardStyle" >
                  <el-select v-model="question.answerType" class="filter-item" placeholder="请选择" >
                    <el-option v-for="item in answers" :key="item" :label="item | answerFilter" :value="item"/>
                  </el-select>
                </el-form-item>
                <div style="text-align:center" >
                  <el-button type="primary" style="margin-bottom:15px;" @click="subQuestion(index)">保存本题</el-button>
                </div>
              </div>
            </el-form>
          </div>
          <div style="width:100px;height:60px;"/>
          <div class="bottom-button" >
            <el-button type="primary" style="margin-bottom:15px;" @click="subQuestions()">保存试卷</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="设置正式题" name="3">
          <div style="text-align: center">
            <h4>从左侧选择需要添加的试题类型</h4>
          </div>
          <div v-for="(question,index) in questionDto" :key="index">
            <el-form label-width="80px" style="padding-right:15px;margin:10px 15px;box-shadow: 3px 3px 5px #888888;">
              <div v-if="question.questionType!=3">
                <div style="padding:20px 15px;">
                  第{{ index+1 }}题&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ question.questionType==0?"单选题":"多选题" }}
                  <i class="el-icon-delete" style="position: absolute;right:3%;" @click="delQuestion(index)"/>
                </div>
                <el-form-item label="题干内容">
                  <el-input
                    :autosize="{ minRows: 2, maxRows: 8}"
                    v-model="question.questions.stem"
                    type="textarea"
                    placeholder="请输入判断题题干内容"/>
                </el-form-item>
                <el-form-item label="上传图片" >
                  <div @mouseenter="mous(index)">
                    <el-upload :action="url+'/oss/head/upload'" :on-success="upImg" :on-preview="handlePreviewImg" :on-remove="handleRemoveImg" :file-list="question.questions.stemImg" class="upload-demo" style="width:20%;" list-type="picture">
                      <el-button size="small" type="primary" @click="img(index)">点击上传</el-button>
                    </el-upload>
                  </div>
                </el-form-item>
                <el-form-item label="上传音频">
                  <el-upload :show-file-list="false" :action="url+'/oss/head/upload'" :on-success="upMP3" class="upload-demo" style="width:20%;" list-type="picture">
                    <el-button size="small" type="primary" @click="img(index)">点击上传</el-button>
                  </el-upload>
                  <div v-for="(mp3,index1) in question.questions.stemMp3" :key="index1">
                    <video :src="mp3.url" style="height: 60px; width: 260px;" class="avatar" controls="controls">您的浏览器不支持视频播放</video>
                    <i class="el-icon-delete" style="position: absolute;right:75%;top:65px;" @click="delMP3(index,index1)"/>
                  </div>
                </el-form-item>
                <div v-for="(option,index1) in question.questions.options" :key="index1">
                  <el-form-item :label="'选项'+charCode(index1)">
                    <el-input
                      :autosize="{ minRows: 2, maxRows: 8}"
                      v-model="option.value"
                      type="textarea"
                      placeholder="请输入判断题选项内容"/>
                    <div v-if="question.questions.options.length>2" style="margin-top: -48px;position: absolute;right: 1%;">
                      <i class="el-icon-delete" @click="delTag(index,index1)"/>
                    </div>
                  </el-form-item>
                </div>
                <div style="text-align:center" >
                  <el-button style="margin-bottom:15px;" @click="addTag(question.questions.options.length,index)">添加选项</el-button>
                  <el-button type="primary" style="margin-bottom:15px;" @click="subQuestion(index)">保存本题</el-button>
                </div>
              </div>
              <div v-if="question.questionType==3">
                <div style="padding:20px 15px;">
                  第{{ index+1 }}题&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;问答题
                  <i class="el-icon-delete" style="position: absolute;right:3%;" @click="delQuestion(index)"/>
                </div>
                <el-form-item label="题干内容">
                  <el-input
                    :autosize="{ minRows: 2, maxRows: 8}"
                    v-model="question.questions.stem"
                    type="textarea"
                    placeholder="请输入判断题题干内容"/>
                </el-form-item>
                <el-form-item label="上传图片" >
                  <div @mouseenter="mous(index)">
                    <el-upload :action="url+'/oss/head/upload'" :on-success="upImg" :on-preview="handlePreviewImg" :on-remove="handleRemoveImg" :file-list="question.questions.stemImg" class="upload-demo" style="width:20%;" list-type="picture">
                      <el-button size="small" type="primary" @click="img(index)">点击上传</el-button>
                    </el-upload>
                  </div>
                </el-form-item>
                <el-form-item label="上传音频">
                  <el-upload :show-file-list="false" :action="url+'/oss/head/upload'" :on-success="upMP3" class="upload-demo" style="width:20%;" list-type="picture">
                    <el-button size="small" type="primary" @click="img(index)">点击上传</el-button>
                  </el-upload>
                  <div v-for="(mp3,index1) in question.questions.stemMp3" :key="index1">
                    <video :src="mp3.url" style="height: 60px; width: 260px;" class="avatar" controls="controls">您的浏览器不支持视频播放</video>
                    <i class="el-icon-delete" style="position: absolute;right:75%;top:65px;" @click="delMP3(index,index1)"/>
                  </div>
                </el-form-item>
                <el-form-item label="答案类型" prop="cardStyle" >
                  <el-select v-model="question.answerType" class="filter-item" placeholder="请选择" >
                    <el-option v-for="item in answers" :key="item" :label="item | answerFilter" :value="item"/>
                  </el-select>
                </el-form-item>
                <div style="text-align:center" >
                  <el-button type="primary" style="margin-bottom:15px;" @click="subQuestion(index)">保存本题</el-button>
                </div>
              </div>
            </el-form>
          </div>
          <div style="width:100px;height:60px;"/>
          <div class="bottom-button" >
            <el-button type="primary" style="margin-bottom:15px;" @click="subQuestions()">保存试卷</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="设置试卷规则" name="4">
          <el-form label-width="100px" style="">
            <el-form-item label="任务总时间">
              <el-input v-model="paper.paeprTime" style="width:200px;" placeholder="非必填选项"/>
              &nbsp;&nbsp;&nbsp;分
            </el-form-item>
            <el-form-item label="练习题">
              <el-input-number :min="paper.practiceAllNum>0?1:paper.practiceAllNum" :max="paper.practiceAllNum" v-model="paper.practiceNum" style="width:200px;"/>&nbsp;&nbsp;&nbsp;题
            </el-form-item>
            <el-form-item label="考试题">
              <el-input-number :min="paper.examAllNum>0?1:paper.examAllNum" :max="paper.examAllNum" v-model="paper.examNum" style="width:200px;"/>&nbsp;&nbsp;&nbsp;题
            </el-form-item>
            <el-form-item label="正式题">
              <el-input-number :min="paper.formalAllNum>0?1:paper.formalAllNum" :max="paper.formalAllNum" v-model="paper.formalNum" style="width:200px;"/>&nbsp;&nbsp;&nbsp;题
            </el-form-item>
          </el-form>
          <div style="padding-left:30px;">
            <el-button type="primary" style="width:25%;" @click="subRule()">保存规则</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { addOneQuestion, subAllQuestion, upPaper, updateRule, updateInfo } from '@/api/query'
export default {
  filters: {
    answerFilter(answer) {
      const answerMap = {
        0: '文字',
        1: '语音',
        2: '图片',
        3: '文件',
        4: '视频'
      }
      return answerMap[answer]
    },
    paperTypeFilter(paperType) {
      const paperTypeMap = {
        0: '问卷',
        1: '答卷'
      }
      return paperTypeMap[paperType]
    }
  },
  data() {
    return {
      activeName: '0',
      url: '',
      paperId: '',
      // answers: ["0", "1",'2','3','4'],
      answers: ['0', '1', '2', '4'],
      paperTypes: ['0', '1'],
      questionDto: [],
      paper: [],
      paperId: localStorage.getItem('paperId'),
      ccc: 65,
      oneIndex: null
    }
  },

  created() {
    this.url = localStorage.getItem('url')
    this.handleClick()
  },

  methods: {
    charCode(index) {
      return String.fromCharCode(this.ccc + index)
    },
    // 移除图片
    handleRemoveImg(file, fileList) {
      console.log(fileList)
      console.log(this.oneIndex)
      console.log(this.questionDto)
      this.questionDto[this.oneIndex].questions.stemImg = fileList
    },
    handlePreviewImg(file) {
      console.log(file)
    },
    // 鼠标划过事件
    mous(index) {
      this.oneIndex = index
    },
    // 上传图片
    upImg(file) {
      console.log(file)
      this.questionDto[this.oneIndex].questions.stemImg.push(file)
    },
    // 保存ID
    img(index) {
      this.oneIndex = index
      console.log(index)
    },
    // 删除音频
    delMP3(index, index1) {
      this.questionDto[index].questions.stemMp3.splice(index1, 1)
    },
    handlePreviewMP3(file) {
      console.log(file)
    },
    // 上传音频
    upMP3(file) {
      console.log('111111', file)
      console.log('111111', this.questionDto)
      this.questionDto[this.oneIndex].questions.stemMp3.push(file)
    },
    // 切换模块
    handleClick() {
      this.paperId = localStorage.getItem('paperId')
      upPaper(this.paperId).then((res) => {
        this.paperId = res.data.paperQuestionVO.paper.id
        if (res.data.success) {
          if (this.activeName == 0) {
            this.paper = res.data.paperQuestionVO.paper
            if (this.paper.paperType == 0) {
              this.paper.paperType = '问卷'
            } else if (this.paper.paperType == 1) {
              this.paper.paperType = '答卷'
            }
          } else if (this.activeName == 1) {
            this.questionDto = res.data.paperQuestionVO.practiceQuestions
            for (var i = 0; i < this.questionDto.length; i++) {
              if (this.questionDto[i].answerType == 0) {
                this.questionDto[i].answerType = '文字'
              } else if (this.questionDto[i].answerType == 1) {
                this.questionDto[i].answerType = '语音'
              } else if (this.questionDto[i].answerType == 2) {
                this.questionDto[i].answerType = '图片'
              } else if (this.questionDto[i].answerType == 3) {
                this.questionDto[i].answerType = '文件'
              } else if (this.questionDto[i].answerType == 4) {
                this.questionDto[i].answerType = '视频'
              }
            }
          } else if (this.activeName == 2) {
            var arrory = res.data.paperQuestionVO.examQuestions
            for (var i = 0; i < arrory.length; i++) {
              if (arrory[i].answerType == 0) {
                arrory[i].answerType = '文字'
              } else if (arrory[i].answerType == 1) {
                arrory[i].answerType = '语音'
              } else if (arrory[i].answerType == 2) {
                arrory[i].answerType = '图片'
              } else if (arrory[i].answerType == 3) {
                arrory[i].answerType = '文件'
              } else if (arrory[i].answerType == 4) {
                arrory[i].answerType = '视频'
              }
            }
            this.questionDto = arrory
          } else if (this.activeName == 3) {
            var arrory = res.data.paperQuestionVO.formalQuestions
            for (var i = 0; i < arrory.length; i++) {
              if (arrory[i].answerType == 0) {
                arrory[i].answerType = '文字'
              } else if (arrory[i].answerType == 1) {
                arrory[i].answerType = '语音'
              } else if (arrory[i].answerType == 2) {
                arrory[i].answerType = '图片'
              } else if (arrory[i].answerType == 3) {
                arrory[i].answerType = '图片'
              } else if (arrory[i].answerType == 4) {
                arrory[i].answerType = '视频'
              }
            }
            this.questionDto = arrory
          } else if (this.activeName == 4) {
            this.paper = res.data.paperQuestionVO.paper
          }
        } else {
          this.$message({
            title: '失败',
            message: '获取试卷信息失败',
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    // 添加选项
    addTag(extent, index) {
      var a = this.charCode(extent)
      var tab = {
        optionId: this.charCode(extent),
        value: ''
      }
      this.questionDto[index].questions.options.push(tab)
      console.log(this.questionDto)
    },
    // 删除选项
    delTag(index, index1) {
      this.questionDto[index].questions.options.splice(index1, 1)
      console.log(this.questionDto)
    },
    // 删除试题
    delQuestion(index) {
      this.questionDto.splice(index, 1)
      console.log(this.questionDto)
    },
    // 添加试题
    addQuestion(index) {
      console.log(index)
      var question = {
        answerType: '',
        questionId: '',
        questionType: index,
        questions: {
          stem: '',
          stemImg: [],
          // stemMp3:[{url:'http://hzhj.oss-cn-beijing.aliyuncs.com/file/2182a76624e94c6185b323e6d03bc6b1.mp3'}],
          stemMp3: [],
          stemVideo: [],
          stemFile: [],
          options: [{ optionId: 'A', value: '' }, { optionId: 'B', value: '' }]
        }
      }
      this.questionDto.push(question)
    },
    // 保存试题
    subQuestion(index) {
      console.log(this.questionDto[index])
      if (this.questionDto[index].answerType == '文字') {
        this.questionDto[index].answerType = 0
      } else if (this.questionDto[index].answerType == '语音') {
        this.questionDto[index].answerType = 1
      } else if (this.questionDto[index].answerType == '图片') {
        this.questionDto[index].answerType = 2
      } else if (this.questionDto[index].answerType == '图片') {
        this.questionDto[index].answerType = 3
      } else if (this.questionDto[index].answerType == '视频') {
        this.questionDto[index].answerType = 4
      }
      addOneQuestion(this.questionDto[index]).then((res) => {
        if (res.data.success) {
          this.questionDto[index] = res.data.questionListVO
          // this.handleClick();
          this.$message({
            title: '成功',
            message: '保存成功',
            type: 'success',
            duration: 2000
          })
        } else {
          this.$message({
            title: '失败',
            message: '保存失败',
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    // 保存试卷
    subQuestions() {
      console.log(this.questionDto)
      var questionId = []
      for (var i = 0; i < this.questionDto.length; i++) {
        if (this.questionDto[i].questionId != '') {
          questionId.push(this.questionDto[i].questionId)
        }
      }
      console.log(questionId)
      if (questionId.length != 0) {
        console.log(questionId)
        var paperDto = {
          paperId: this.paperId,
          phaseType: this.activeName - 1,
          questionId: questionId
        }
        subAllQuestion(paperDto).then((res) => {
          console.log(res)
          if (res.data.success) {
            this.$message({
              title: '成功',
              message: '保存成功',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$message({
              title: '失败',
              message: '保存失败',
              type: 'error',
              duration: 2000
            })
          }
        })
      } else {
        this.$message({
          title: '警告',
          message: '请先添加并保存试题',
          type: 'warning',
          duration: 2000
        })
      }
    },
    // 修改试卷规则
    subRule() {
      if (this.paper.practiceNum == 0 || this.paper.examNum == 0 || this.paper.formalNum == 0) {
        this.$message({
          title: '警告',
          message: '试题数量不能为0',
          type: 'warning',
          duration: 2000
        })
      } else {
        this.paper.paperId = this.paper.id
        updateRule(this.paper).then((res) => {
          console.log(res)
          if (res.data.success) {
            this.$message({
              title: '成功',
              message: '保存成功',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$message({
              title: '失败',
              message: '保存失败',
              type: 'error',
              duration: 2000
            })
          }
        })
      }
    },
    // 修改试卷信息
    subInfo() {
      if (this.paper.paperName == '' || this.paper.paperName == null) {
        this.$message({
          title: '警告',
          message: '请输入试卷名称',
          type: 'warning',
          duration: 2000
        })
      } else {
        if (this.paper.paperType == '问卷') {
          console.log('123')
          this.paper.paperType = 0
        } else if (this.paper.paperType == '答卷') {
          this.paper.paperType = 1
        }
        this.paper.paperId = this.paper.id
        updateInfo(this.paper).then((res) => {
          console.log(res)
          if (res.data.success) {
            this.$message({
              title: '成功',
              message: '保存成功',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$message({
              title: '失败',
              message: '保存失败',
              type: 'error',
              duration: 2000
            })
          }
        })
      }
    }
  }
}
</script>
<style scoped>
.bottom-button {
    position: fixed;
    /* z-index: 500; */
    bottom: 0px;
    width: 100%;
    text-align:center;
    margin-left: -7%;
    /* background-color: #F7F7FA; */
    background-color: #FFF;
}
</style>
