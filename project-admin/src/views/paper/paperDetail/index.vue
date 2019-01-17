<template>
    <div>
        <div style="text-align: center; font-size:20px; margin-top: 20px">
            <span>试卷预览</span>
        </div>
        <div style="text-align: center; margin-top: 20px;">
            <div style="font-size:15px;  display:inline; padding-right: 20px">
                <span>{{paperName}}</span>
            </div>
            <!-- <el-tag>限时{{testTime}}分钟</el-tag> -->
            <span style="font-size: 15px">答题时间：</span>
            <el-input-number v-model="testTime" controls-position="right" @change="handleChange9" :min="60" :max="180"></el-input-number>
            <span style="font-size: 15px">分钟</span>
            &nbsp;&nbsp;&nbsp;&nbsp;<el-button type="primary" @click="timeUpdate">只修改考试时间</el-button>
        </div>
        <hr>
        <div style="text-align: center; font-size:20px; margin-top: 20px">
            <span>客观题部分</span>
        </div>
        <div>
            <div v-for="(question, index) in single" :key="question.id" style="margin:10px auto">
                <el-card class="box-card">
                    <div>
                        <div slot="header" class="clearfix">
                            <span>{{index+1}}.{{question.question.dry}}</span>
                            <el-button style="float: right; padding: 3px 0px 3px 15px" type="text" @click="singleUpdate(question.id)">编辑</el-button>
                        </div>
                        <div class="text item">
                            {{"A："+question.question.option1}}
                        </div>
                        <div class="text item">
                            {{"B："+question.question.option2}}
                        </div>
                        <div class="text item">
                            {{"C："+question.question.option3}}
                        </div>
                        <div class="text item">
                            {{"D："+question.question.option4}}
                        </div>
                        <div style="">
                            <el-tag type="danger">{{"正确答案："+question.answer}}</el-tag>
                            <el-tag>{{question.score+"分"}}</el-tag>
                        </div>
                    </div>
                </el-card>
            </div>
            <el-dialog title="单选题编辑修改" :visible.sync="dialogFormVisible">
                <el-form :model="single1" label-width="100px">
                    <el-form-item label="题干内容" prop="dry">
                        <el-input type="textarea" v-model="single1.dry" placeholder="题干内容"></el-input>
                    </el-form-item>
                    <el-form-item label="选项A" prop="option1">
                        <el-input type="textarea" v-model="single1.option1" placeholder="选项A"></el-input>
                    </el-form-item>
                    <el-form-item label="选项B" prop="option2">
                        <el-input type="textarea" v-model="single1.option2" placeholder="选项B"></el-input>
                    </el-form-item>
                    <el-form-item label="选项C" prop="option3">
                        <el-input type="textarea" v-model="single1.option3" placeholder="选项C"></el-input>
                    </el-form-item>
                    <el-form-item label="选项D" prop="option4">
                        <el-input type="textarea" v-model="single1.option4" placeholder="选项D"></el-input>
                    </el-form-item>
                </el-form>
                <el-form :model="form" label-width="100px">
                    <el-form-item label="正确答案">
                        <el-radio-group v-model="form.answer">
                            <el-radio :label="1">A</el-radio>
                            <el-radio :label="2">B</el-radio>
                            <el-radio :label="3">C</el-radio>
                            <el-radio :label="4">D</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <div>
                        <el-form-item label="">
                            <el-button @click="cancel()">取 消</el-button>
                            <el-button type="primary" @click="submitRadio">确定</el-button>
                        </el-form-item>
                    </div>
                </el-form>
            </el-dialog>
        </div>
        <div>
            <div v-for="(question, index) in multiple" :key="question.id" style="margin-top:10px">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>{{single.length+index+1}}.{{question.question.dry}}</span>
                        <el-button style="float: right; padding: 3px 0px 3px 15px" type="text" @click="multipleUpdate(question.id)">编辑</el-button>

                    </div>
                    <div class="text item">
                        {{"A："+question.question.option1}}
                    </div>
                    <div class="text item">
                        {{"B："+question.question.option2}}
                    </div>
                    <div class="text item">
                        {{"C："+question.question.option3}}
                    </div>
                    <div class="text item">
                        {{"D："+question.question.option4}}
                    </div>
                    <div class="text item">
                        {{"E："+question.question.option5}}
                    </div>
                    <div class="text item">
                        {{"F："+question.question.option6}}
                    </div>
                    <div style="padding-bottom:0px">
                        <el-tag type="danger">{{"正确答案："+question.answer}}</el-tag>
                        <el-tag>{{question.score+"分"}}</el-tag>
                    </div>
                </el-card>
            </div>
            <el-dialog title="多选题编辑修改" :visible.sync="dialogFormVisibleduo">
                <el-form :model="multiple1" label-width="100px">
                    <el-form-item label="题干内容" prop="dry">
                        <el-input type="textarea" v-model="multiple1.dry" placeholder="题干内容"></el-input>
                    </el-form-item>
                    <el-form-item label="选项A" prop="option1">
                        <el-input type="textarea" v-model="multiple1.option1" placeholder="选项A"></el-input>
                    </el-form-item>
                    <el-form-item label="选项B" prop="option2">
                        <el-input type="textarea" v-model="multiple1.option2" placeholder="选项B"></el-input>
                    </el-form-item>
                    <el-form-item label="选项C" prop="option3">
                        <el-input type="textarea" v-model="multiple1.option3" placeholder="选项C"></el-input>
                    </el-form-item>
                    <el-form-item label="选项D" prop="option4">
                        <el-input type="textarea" v-model="multiple1.option4" placeholder="选项D"></el-input>
                    </el-form-item>
                    <el-form-item label="选项E" prop="option5">
                        <el-input type="textarea" v-model="multiple1.option4" placeholder="选项D"></el-input>
                    </el-form-item>
                    <el-form-item label="选项F" prop="option6">
                        <el-input type="textarea" v-model="multiple1.option4" placeholder="选项D"></el-input>
                    </el-form-item>
                </el-form>
                <el-form :model="formM" label-width="100px">
                    <el-form-item label="正确答案">
                        <el-checkbox-group v-model="formM.answer">
                            <el-checkbox label="A"></el-checkbox>
                            <el-checkbox label="B"></el-checkbox>
                            <el-checkbox label="C"></el-checkbox>
                            <el-checkbox label="D"></el-checkbox>
                            <el-checkbox label="E"></el-checkbox>
                            <el-checkbox label="F"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <div>
                        <el-form-item label="">
                            <el-button @click="cancelM()">取 消</el-button>
                            <el-button type="primary" @click="submitCheck">确定</el-button>
                        </el-form-item>
                    </div>
                </el-form>
            </el-dialog>
        </div>
        <div>
            <div v-for="(question, index) in judgment" :key="question.id" style="margin-top:10px">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>{{single.length+multiple.length+index+1}}.{{question.question}}</span>
                        <el-button style="float: right; padding: 3px 0px 3px 15px" type="text" @click="judgeUpdate(question.id)">编辑</el-button>

                    </div>
                    <div>
                        <el-tag type="danger">{{"正确答案："+question.answer}}</el-tag>
                        <el-tag>{{question.score+"分"}}</el-tag>
                    </div>
                </el-card>
            </div>
            <el-dialog title="判断题编辑修改" :visible.sync="dialogFormVisiblepan">
                <el-form :model="formJ" label-width="100px">
                    <el-form-item label="题干内容" prop="question">
                        <el-input type="textarea" v-model="formJ.question" placeholder="题干内容"></el-input>
                    </el-form-item>
                    <el-form-item label="正确答案">
                        <el-radio-group v-model="formJ.answer">
                            <el-radio :label="1">正确</el-radio>
                            <el-radio :label="2">错误</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <div>
                        <el-form-item label="">
                            <el-button @click="cancelJ()">取 消</el-button>
                            <el-button type="primary" @click="submitRadio1">确定</el-button>
                        </el-form-item>
                    </div>
                </el-form>
            </el-dialog>

        </div>
        <div style="text-align: center; font-size:20px; margin-top: 20px">
            <span>主观题部分</span>
        </div>
        <div v-for="(question, index) in text" :key="question.id" style="margin-top:10px;">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>{{single.length+multiple.length+judgment.length+index+1}}.{{question.question}}</span>
                    <el-button style="float: right; padding: 3px 0px 3px 15px" type="text" @click="textUpdate(question.id)">编辑</el-button>

                </div>
                <div>
                    <el-tag type="danger">{{"正确答案：主观题无标准正确答案"}}</el-tag>
                    <el-tag>{{question.score+"分"}}</el-tag>
                </div>
            </el-card>
        </div>
        <el-dialog title="问答题编辑修改" :visible.sync="dialogFormVisiblewen">
            <el-form :model="formT" label-width="100px">
                <el-form-item label="题干内容" prop="question">
                    <el-input type="textarea" v-model="formT.question" placeholder="题干内容"></el-input>
                </el-form-item>
                <div>
                    <el-form-item label="">
                        <el-button @click="cancelT()">取 消</el-button>
                        <el-button type="primary" @click="submitText">确定</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    import { queryPaperDetail } from "@/api/query";
    import { deleteQuestion } from "@/api/query";
    import { queryEvery } from "@/api/query";
    import { paperUpdate } from "@/api/update";
    export default {
        data() {
            return {
                id: "",
                paperName: "",
                testTime: "", //考试时间
                single: [],
                multiple: [],
                judgment: [],
                text: [],
                thisPaper: "", //试卷内容

                dialogFormVisible: false,
                dialogFormVisibleduo: false,
                dialogFormVisiblepan: false,
                dialogFormVisiblewen: false,
                form: {},
                single1: {},

                formM: {},
                multiple1: {},

                formJ: {},
                formT: {}
            };
        },

        created() {
            console.log(this.$route.params.paperId);

            this.id = this.$route.params.paperId;
            this.id = window.localStorage.getItem("paperId");
            this.queryPaper();
        },
        mounted() { },

        methods: {
            queryPaper() {
                var id = this.id;
                var that = this;
                queryPaperDetail(id).then(response => {
                    var testContent = response.data.testPaper.testContent;
                    var testTime = response.data.testPaper.testTime;
                    testContent = JSON.parse(testContent);
                    console.log("=-=-=-=-=-=-=-=-=");
                    console.log(response.data);
                    console.log(response.data.testPaper);
                    this.thisPaper = response.data.testPaper.testContent;
                    console.log(testContent);
                    var single = testContent.single;
                    var multiple = testContent.multiple;
                    var judgment = testContent.judgment;
                    var text = testContent.text;
                    that.paperName = response.data.paperName;
                    that.testTime = testTime;
                    for (var i = 0; i < single.length; i++) {
                        single[i].question = JSON.parse(single[i].question);
                    }
                    // var multiple = testContent.multiple;
                    for (var i = 0; i < multiple.length; i++) {
                        multiple[i].question = JSON.parse(multiple[i].question);
                    }
                    // var judgment = testContent.judgment;
                    // for (var i = 0; i < judgment.length; i++) {
                    //   judgment[i].question = JSON.parse(judgment[i].question);
                    // }
                    // var text = testContent.text;
                    // for (var i = 0; i < text.length; i++) {
                    //   text[i].question = JSON.parse(text[i].question);
                    // }
                    that.single = single;
                    that.multiple = testContent.multiple;
                    that.judgment = testContent.judgment;
                    that.text = testContent.text;
                    console.log(single);
                    console.log(multiple);
                    console.log(judgment);
                    console.log(text);
                });
            },

            singleUpdate(row) {
                console.log(row);
                // this.$router.push({
                //     name: "updateSingle",
                //     params: { questionId: row }
                // });
                queryEvery(row).then(response => {
                    console.log(response.data);
                    var selectById = response.data.selectById;
                    var question = JSON.parse(response.data.selectById.question);
                    selectById.question = question;
                    var answer = response.data.selectById.answer;
                    if (answer == "A") {
                        selectById.answer = 1;
                    } else if (answer == "B") {
                        selectById.answer = 2;
                    } else if (answer == "C") {
                        selectById.answer = 3;
                    } else {
                        selectById.answer = 4;
                    }
                    this.single1 = question;
                    this.form = selectById;
                    console.log(this.single);
                    console.log(this.form);
                    this.dialogFormVisible = true;
                });
            },

            multipleUpdate(row) {
                console.log(row);
                queryEvery(row).then(response => {
                    console.log(response.data);
                    var selectById = response.data.selectById;
                    var question = JSON.parse(response.data.selectById.question);
                    selectById.question = question;
                    var answer = response.data.selectById.answer;
                    answer = answer.split("");
                    console.log(answer);
                    selectById.answer = answer;
                    this.multiple1 = question;
                    this.formM = selectById;
                    console.log(this.multiple);
                    console.log(this.formM);
                    this.dialogFormVisibleduo = true;
                });
                // this.$router.push({
                //     name: "updateMultiple",
                //     params: { questionId: row }
                // });
            },
            textUpdate(row) {
                console.log(row);
                queryEvery(row).then(response => {
                    console.log(response.data);
                    var selectById = response.data.selectById;
                    this.formT = selectById;
                    console.log(this.formT);
                    this.dialogFormVisiblewen = true;
                });
            },
            judgeUpdate(row) {
                console.log(row);
                queryEvery(row).then(response => {
                    console.log(response.data);
                    var selectById = response.data.selectById;
                    var answer = response.data.selectById.answer;
                    if (answer == "正确") {
                        answer = 1;
                    } else {
                        answer = 2;
                    }
                    selectById.answer = answer;
                    this.formJ = selectById;
                    console.log(this.formJ);
                    this.dialogFormVisiblepan = true;
                });
            },

            submitRadio() {
                console.log(this.single1);
                console.log(this.form);
                var form = this.form;
                var id = form.id;
                var questionType = form.questionType;
                var jobId = form.jobId;
                var radio = "";
                var textarea = this.textarea;
                if (form.answer == "1") {
                    radio = "A";
                } else if (form.answer == "2") {
                    radio = "B";
                } else if (form.answer == "3") {
                    radio = "C";
                } else if (form.answer == "4") {
                    radio = "D";
                }
                var answer = radio;
                form.answer = answer;
                var score = form.score;
                var question = this.single1;
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
                        message: "题目所属岗位不能为空",
                        type: "warning"
                    });
                } else if (score == "") {
                    this.$notify({
                        title: "警告",
                        message: "题目分值不能为空",
                        type: "warning"
                    });
                } else if (question.dry == "") {
                    this.$notify({
                        title: "警告",
                        message: "题干不能为空",
                        type: "warning"
                    });
                } else if (
                    question.option1 == "" ||
                    question.option2 == "" ||
                    question.option3 == "" ||
                    question.option4 == ""
                ) {
                    this.$notify({
                        title: "警告",
                        message: "题目选项不能为空",
                        type: "warning"
                    });
                } else {
                    paperUpdate(this.testTime, this.thisPaper, this.id, form).then(
                        response => {
                            console.log(response.data);
                            this.dialogFormVisible = false;
                            this.queryPaper();
                            this.$notify({
                                title: "成功",
                                message: "试卷修改成功",
                                type: "success"
                            });
                        }
                    );
                }
            },
            timeUpdate() {
                paperUpdate(this.testTime, this.thisPaper, this.id, "").then(response => {
                    console.log(this.testTime);
                    console.log(this.thisPaper);
                    console.log(this.id);
                    console.log(response.data);
                    this.queryPaper();
                    this.$notify({
                        title: "成功",
                        message: "时间修改成功",
                        type: "success"
                    });
                });
            },

            submitCheck() {
                console.log(this.multiple1);
                console.log(this.formM);
                var formM = this.formM;
                var id = formM.id;
                var questionType = formM.questionType;
                var jobId = formM.jobId;
                var answer = formM.answer;
                answer = answer.join(".");
                formM.answer = answer;
                var score = this.value1;
                var question = this.multiple1;
                var score = formM.score;
                console.log(score);
                if (this.formM.answer.length < 2) {
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
                } else if (question.dry == "") {
                    this.$notify({
                        title: "警告",
                        message: "题干不能为空",
                        type: "warning"
                    });
                } else if (
                    question.option1 == "" ||
                    question.option2 == "" ||
                    question.option3 == "" ||
                    question.option4 == "" ||
                    question.option5 == "" ||
                    question.option6 == ""
                ) {
                    this.$notify({
                        title: "警告",
                        message: "题目选项不能为空",
                        type: "warning"
                    });
                } else {
                    paperUpdate(this.testTime, this.thisPaper, this.id, formM).then(
                        response => {
                            console.log(response.data);
                            this.dialogFormVisibleduo = false;
                            this.queryPaper();
                            this.$notify({
                                title: "成功",
                                message: "试卷修改成功",
                                type: "success"
                            });
                        }
                    );
                }
            },

            submitRadio1() {
                var formJ = this.formJ;
                var id = formJ.id;
                var questionType = formJ.questionType;
                var jobId = formJ.jobId;
                var answer = formJ.answer;
                if (answer == "1") {
                    answer = "正确";
                } else if (answer == "2") {
                    answer = "错误";
                }
                formJ.answer = answer;
                var score = formJ.score;
                var dry = formJ.question;
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
                        message: "题目所属岗位不能为空",
                        type: "warning"
                    });
                } else if (score == "") {
                    this.$notify({
                        title: "警告",
                        message: "题目分值不能为空",
                        type: "warning"
                    });
                } else if (question == "") {
                    this.$notify({
                        title: "警告",
                        message: "题干不能为空",
                        type: "warning"
                    });
                } else {
                    paperUpdate(this.testTime, this.thisPaper, this.id, formJ).then(
                        response => {
                            console.log(response.data);
                            this.dialogFormVisiblepan = false;
                            this.queryPaper();
                            this.$notify({
                                title: "成功",
                                message: "试卷修改成功",
                                type: "success"
                            });
                        }
                    );
                }
            },

            submitText() {
                var formT = this.formT;
                var id = formT.id;
                var questionType = formT.questionType;
                var jobId = formT.jobId;
                var score = formT.score;
                var dry = formT.question;
                var question = dry;
                var answer = "";
                console.log(score);
                if (score == "") {
                    this.$notify({
                        title: "警告",
                        message: "题目分值不能为空",
                        type: "warning"
                    });
                } else if (question == "") {
                    this.$notify({
                        title: "警告",
                        message: "题干不能为空",
                        type: "warning"
                    });
                } else {
                    paperUpdate(this.testTime, this.thisPaper, this.id, formT).then(
                        response => {
                            console.log(response.data);
                            this.dialogFormVisiblewen = false;
                            this.queryPaper();
                            this.$notify({
                                title: "成功",
                                message: "试卷修改成功",
                                type: "success"
                            });
                        }
                    );
                }
            },

            handleChange9(value) {
                console.log(value);
            },

            cancel() {
                this.dialogFormVisible = false;
            },

            cancelM() {
                this.dialogFormVisibleduo = false;
            },
            cancelJ() {
                this.dialogFormVisiblepan = false;
            },
            cancelT() {
                this.dialogFormVisiblewen = false;
            }
        }
    };
</script>
<style scoped>
    .box-card {
        width: 60%;
        margin: 0 auto;
    }

    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both;
    }
</style>