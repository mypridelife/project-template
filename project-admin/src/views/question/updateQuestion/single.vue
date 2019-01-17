<template>
    <el-form label-width="80px">
        <br>
        <br>
        <el-form-item label="题干内容">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 8}" placeholder="请输入选择题题干内容" v-model="textarea">
            </el-input>
        </el-form-item>
        <el-form-item label="选项A">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 8}" placeholder="请输入选择题题干内容" v-model="textarea1">
            </el-input>
        </el-form-item>
        <el-form-item label="选项B">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 8}" placeholder="请输入选择题题干内容" v-model="textarea2">
            </el-input>
        </el-form-item>
        <el-form-item label="选项C">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 8}" placeholder="请输入选择题题干内容" v-model="textarea3">
            </el-input>
        </el-form-item>
        <el-form-item label="选项D">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 8}" placeholder="请输入选择题题干内容" v-model="textarea4">
            </el-input>
        </el-form-item>
        <el-form-item label="正确答案">
            <el-radio-group v-model="radio">
                <el-radio :label="1">A</el-radio>
                <el-radio :label="2">B</el-radio>
                <el-radio :label="3">C</el-radio>
                <el-radio :label="4">D</el-radio>
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
                <el-button type="primary" @click="submitRadio">完成编辑</el-button>
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
                textarea: "",
                textarea1: "",
                textarea2: "",
                textarea3: "",
                textarea4: "",
                radio: null,
                questionType: "",
                subjectId: "",
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
            console.log(this.questionId);
            this.queryQuestion();
        },

        methods: {
            queryQuestion() {
                var id = this.id;
                queryEvery(id).then(response => {
                    console.log(response.data);
                    var answer = response.data.selectById.answer;
                    var question = JSON.parse(response.data.selectById.question);
                    if (answer == "A") {
                        this.radio = 1;
                    } else if (answer == "B") {
                        this.radio = 2;
                    } else if (answer == "C") {
                        this.radio = 3;
                    } else {
                        this.radio = 4;
                    }
                    this.value1 = response.data.selectById.score;
                    this.textarea = question.dry;
                    this.questionType = response.data.selectById.questionType;
                    this.subjectId = response.data.selectById.subjectId;
                    this.textarea1 = question.option1;
                    this.textarea2 = question.option2;
                    this.textarea3 = question.option3;
                    this.textarea4 = question.option4;
                });
            },
            submitRadio() {
                var id = this.id;
                var questionType = this.questionType;
                var subjectId = this.subjectId;
                var radio = this.radio;
                var textarea = this.textarea;
                if (radio == "1") {
                    radio = "A";
                } else if (radio == "2") {
                    radio = "B";
                } else if (radio == "3") {
                    radio = "C";
                } else if (radio == "4") {
                    radio = "D";
                }
                var answer = radio;
                var score = this.value1;
                var question = {
                    dry: this.textarea,
                    option1: this.textarea1,
                    option2: this.textarea2,
                    option3: this.textarea3,
                    option4: this.textarea4
                };
                console.log(score);
                if (answer == "") {
                    this.$notify({
                        title: "警告",
                        message: "正确答案不能为空",
                        type: "warning"
                    });
                } else if (subjectId == "") {
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
                } else if (textarea == "") {
                    this.$notify({
                        title: "警告",
                        message: "题干不能为空",
                        type: "warning"
                    });
                } else if (
                    this.textarea1 == "" ||
                    this.textarea2 == "" ||
                    this.textarea3 == "" ||
                    this.textarea4 == ""
                ) {
                    this.$notify({
                        title: "警告",
                        message: "题目选项不能为空",
                        type: "warning"
                    });
                } else {
                    questionUpdate(
                        id,
                        subjectId,
                        question,
                        answer,
                        questionType,
                        score
                    ).then(response => {
                        console.log(response.data);
                        this.$notify({
                            title: "成功",
                            message: "试题修改成功",
                            type: "success"
                        });
                    });
                }
            }
        }
    };
</script>