<template>
  <el-form label-width="80px">
    <br>
    <br>
    <el-form-item label="题干内容">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 8}"
        placeholder="请输入选择题题干内容"
        v-model="textarea13"
      >
      </el-input>
    </el-form-item>
    <div>
      <el-form-item label="题目分数">
        <el-select
          v-model="value4"
          placeholder="请选择"
        >
          <el-option
            v-for="item in options4"
            :key="item.value4"
            :label="item.label4"
            :value="item.value4"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-button
          type="primary"
          @click="submitText"
        >完成编辑</el-button>
      </el-form-item>
    </div>
  </el-form>
</template>
<script>
import { queryEvery } from "@/api/query";
import { questionUpdate } from "@/api/update";

export default {
  data() {
    return {
      id: "",
      textarea13: "",
      questionType: "",
      jobId: "",
      options4: [
        {
          value4: "5",
          label4: "5"
        },
        {
          value4: "10",
          label4: "10"
        },
        {
          value4: "15",
          label4: "15"
        },
        {
          value4: "20",
          label4: "20"
        },
        {
          value4: "25",
          label4: "25"
        }
      ],
      value4: "",
      value1: ""
    };
  },

  created() {
    console.log(this.$route.params.questionId);
    this.id = this.$route.params.questionId;
    this.queryQuestion();
  },

  methods: {
    queryQuestion() {
      var id = this.id;
      queryEvery(id).then(response => {
        console.log(response.data);
        this.jobId = response.data.selectById.jobId;
        this.value4 = response.data.selectById.score;
        this.textarea13 = response.data.selectById.question;
        this.questionType = response.data.selectById.questionType;
      });
    },
    submitText() {
      var id = this.id;
      var questionType = this.questionType;
      var jobId = this.jobId;
      var score = this.value4;
      var dry = this.textarea13;
      var question = dry;
      var answer = "";
      console.log(score);
      if (score == "") {
        this.$notify({
          title: "警告",
          message: "题目分值不能为空",
          type: "warning"
        });
      } else if (this.textarea13 == "") {
        this.$notify({
          title: "警告",
          message: "题干不能为空",
          type: "warning"
        });
      } else {
        questionUpdate(id, jobId, question, answer, questionType, score).then(
          response => {
            console.log(response.data);
            this.$notify({
              title: "成功",
              message: "修改成功",
              type: "success"
            });
          }
        );
      }
    }
  }
};
</script>
                    
