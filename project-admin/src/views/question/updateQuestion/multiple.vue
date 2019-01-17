<template>

    <el-form label-width="80px">
        <br>
        <br>
        <el-form-item label="题干内容">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 8}" placeholder="请输入选择题题干内容" v-model="textarea5">
            </el-input>
        </el-form-item>
        <el-form-item label="选项A">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 8}" placeholder="请输入选择题题干内容" v-model="textarea6">
            </el-input>
        </el-form-item>
        <el-form-item label="选项B">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 8}" placeholder="请输入选择题题干内容" v-model="textarea7">
            </el-input>
        </el-form-item>
        <el-form-item label="选项C">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 8}" placeholder="请输入选择题题干内容" v-model="textarea8">
            </el-input>
        </el-form-item>
        <el-form-item label="选项D">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 8}" placeholder="请输入选择题题干内容" v-model="textarea9">
            </el-input>
        </el-form-item>
        <el-form-item label="选项E">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 8}" placeholder="请输入选择题题干内容" v-model="textarea10">
            </el-input>
        </el-form-item>
        <el-form-item label="选项F">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 8}" placeholder="请输入选择题题干内容" v-model="textarea11">
            </el-input>
        </el-form-item>
        <el-form-item label="正确答案">
            <el-checkbox-group v-model="checkList">
                <el-checkbox label="A"></el-checkbox>
                <el-checkbox label="B"></el-checkbox>
                <el-checkbox label="C"></el-checkbox>
                <el-checkbox label="D"></el-checkbox>
                <el-checkbox label="E"></el-checkbox>
                <el-checkbox label="F"></el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <div>
            <el-form-item label="题目分数">
                <el-select v-model="value1" placeholder="请选择">
                    <el-option v-for="item in options1" :key="item.value1" :label="item.label1" :value="item.value1">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="">
                <el-button type="primary" @click="submitCheck">完成编辑</el-button>
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
                textarea5: "",
                textarea6: "",
                textarea7: "",
                textarea8: "",
                textarea9: "",
                textarea10: "",
                textarea11: "",
                checkList: [],
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
                    var question = JSON.parse(response.data.selectById.question);
                    answer = answer.split("");
                    this.checkList = answer;
                    console.log(answer);
                    this.value1 = response.data.selectById.score;
                    this.textarea5 = question.dry;
                    this.questionType = response.data.selectById.questionType;
                    this.jobId = response.data.selectById.jobId;
                    this.textarea6 = question.option1;
                    this.textarea7 = question.option2;
                    this.textarea8 = question.option3;
                    this.textarea9 = question.option4;
                    this.textarea10 = question.option5;
                    this.textarea11 = question.option6;
                });
            },
            submitCheck() {
                var id = this.id;
                var questionType = this.questionType;
                var jobId = this.jobId;
                var answer = this.checkList;
                answer = answer.join(".");
                var score = this.value1;
                var question = {
                    dry: this.textarea5,
                    option1: this.textarea6,
                    option2: this.textarea7,
                    option3: this.textarea8,
                    option4: this.textarea9,
                    option5: this.textarea10,
                    option6: this.textarea11
                };
                console.log(score);
                if (this.checkList.length < 2) {
                    this.$notify({
                        title: "警告",
                        message: "正确答案不能少于两个",
                        type: "warning"
                    });
                } else if (jobId == "") {
                    this.$notify({
                        title: "警告",
                        message: "题目所属岗位不能为空",
                        type: "warning"
                    });
                } else if (score == "") {
                    this.$notify({
                        title: "警告",
                        message: "题目分值不能为空",
                        type: "warning"
                    });
                } else if (this.textarea5 == "") {
                    this.$notify({
                        title: "警告",
                        message: "题干不能为空",
                        type: "warning"
                    });
                } else if (
                    this.textarea6 == "" ||
                    this.textarea7 == "" ||
                    this.textarea8 == "" ||
                    this.textarea9 == "" ||
                    this.textarea10 == "" ||
                    this.textarea11 == ""
                ) {
                    this.$notify({
                        title: "警告",
                        message: "题目选项不能为空",
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