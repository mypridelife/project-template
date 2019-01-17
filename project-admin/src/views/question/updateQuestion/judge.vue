<template>
    <el-form label-width="80px">
        <br>
        <br>
        <el-form label-width="80px">
            <el-form-item label="题干内容">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 8}" placeholder="请输入选择题题干内容" v-model="textarea12">
                </el-input>
            </el-form-item>
            <el-form-item label="正确答案">
                <el-radio-group v-model="radio1">
                    <el-radio :label="1">正确</el-radio>
                    <el-radio :label="2">错误</el-radio>
                </el-radio-group>
            </el-form-item>
            <div>
                <el-form-item label="题目分数">
                    <el-select v-model="value1" placeholder="请选择">
                        <el-option v-for="item in options1" :key="item.value1" :label="item.label1" :value="item.value1">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-button type="primary" @click="submitRadio1">完成编辑</el-button>
                </el-form-item>
            </div>
        </el-form>
    </el-form>
</template>
<script>
    import { queryEvery } from "@/api/query";
    import { questionUpdate } from "@/api/update";

    export default {
        data() {
            return {
                id: "",
                textarea12: "",
                radio1: null,
                questionType: "",
                jobId: "",
                options1: [
                    {
                        value1: "1",
                        label1: "1"
                    },
                    {
                        value1: "2",
                        label1: "2"
                    },
                    {
                        value1: "3",
                        label1: "3"
                    },
                    {
                        value1: "4",
                        label1: "4"
                    },
                    {
                        value1: "5",
                        label1: "5"
                    },
                    {
                        value1: "6",
                        label1: "6"
                    },
                    {
                        value1: "7",
                        label1: "7"
                    },
                    {
                        value1: "8",
                        label1: "8"
                    },
                    {
                        value1: "9",
                        label1: "9"
                    },
                    {
                        value1: "10",
                        label1: "10"
                    }
                ],
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
                    var answer = response.data.selectById.answer;
                    if (answer == "正确") {
                        answer = 1;
                    } else {
                        answer = 2;
                    }
                    this.radio1 = answer;
                    this.value1 = response.data.selectById.score;
                    this.textarea12 = response.data.selectById.question;
                    this.questionType = response.data.selectById.questionType;
                    this.jobId = response.data.selectById.jobId;
                });
            },
            submitRadio1() {
                var id = this.id;
                var questionType = this.questionType;
                var jobId = this.jobId;
                var answer = this.radio1;
                if (answer == "1") {
                    answer = "正确";
                } else if (answer == "2") {
                    answer = "错误";
                }
                var score = this.value1;
                var dry = this.textarea12;
                var question = dry;
                console.log(score);
                if (answer == "") {
                    this.$notify({
                        title: "警告",
                        message: "正确答案不能为空",
                        type: "warning"
                    });
                } else if (jobId == "") {
                    this.$notify({
                        title: "警告",
                        message: "题目所属学科不能为空",
                        type: "warning"
                    });
                } else if (score == "") {
                    this.$notify({
                        title: "警告",
                        message: "题目分值不能为空",
                        type: "warning"
                    });
                } else if (this.textarea12 == "") {
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