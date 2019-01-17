<template>
    <div>
        <div style="margin:20px 0">
            <!-- <div class="select div-inline">岗位类别：
                <el-select v-model="value" clearable placeholder="请选择岗位进行筛选" @change="titleText" @clear="clearSearch">
                    <el-option v-for="item in options" :key="item.id" :label="item.job" :value="item.id">
                    </el-option>
                </el-select>
            </div> -->
            <div class="div-inline" v-if="show">
                <div style="color:red;text-align:center"><b>{{titleJob1}} {{whatQuestion}} - 共{{total}}道</b></div>
            </div>
        </div>
        <div>
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="单选题" name="first">
                    <div v-for="(question,index) in questions" :key="index" style="display:inline-block;">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <div style="position: absolute;">{{index+1}}.{{question.questions.stem}}</div>
                                <el-button style="float: right; padding: 3px 0px 3px 15px" type="text" @click="singleUpdate(question.questionId)">编辑</el-button>
                                <el-button style="float: right; padding: 3px 15px" type="text" @click="questionDelete(question.questionId)">删除</el-button>
                            </div>
                            <div v-for="(question1,index1) in question.questions.options" :key="index1" class="text item">
                                {{question1.optionId+"："+question1.value}}
                            </div>
                            <!-- <div class="text item">
                                {{"B："+question.questions.options[1].value}}
                            </div>
                            <div class="text item">
                                {{"C："+question.questions.options[2].value}}
                            </div>
                            <div class="text item">
                                {{"D："+question.questions.options[3].value}}
                            </div> -->
                            <!-- <div>
                                <el-tag type="danger">{{"正确答案："+question.answer}}</el-tag>
                                <el-tag>{{question.score+"分"}}</el-tag>
                            </div> -->
                        </el-card>
                    </div>
                    <div style="text-align:center; margin-top:20px">
                        <el-pagination :current-page.sync="currentPage" :page-sizes="[6, 12, 18, 24]" :page-size.sync="pageSize"
                            :total="total" layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
                            @current-change="handleCurrentChange" />
                    </div>
                    <el-dialog title="单选题编辑修改" :visible.sync="dialogFormVisible">
                        <el-form :model="single" label-width="100px">
                            <el-form-item label="题干内容" prop="dry">
                                <el-input type="textarea" v-model="single.dry" placeholder="题干内容"></el-input>
                            </el-form-item>
                            <el-form-item label="选项A" prop="option1">
                                <el-input type="textarea" v-model="single.option1" placeholder="选项A"></el-input>
                            </el-form-item>
                            <el-form-item label="选项B" prop="option2">
                                <el-input type="textarea" v-model="single.option2" placeholder="选项B"></el-input>
                            </el-form-item>
                            <el-form-item label="选项C" prop="option3">
                                <el-input type="textarea" v-model="single.option3" placeholder="选项C"></el-input>
                            </el-form-item>
                            <el-form-item label="选项D" prop="option4">
                                <el-input type="textarea" v-model="single.option4" placeholder="选项D"></el-input>
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
                                <el-form-item label="题目分数" prop="score">
                                    <el-select v-model="form.score" placeholder="请选择">
                                        <el-option v-for="item in optionsCore" :key="item.value1" :label="item.label1"
                                            :value="item.value1">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="">
                                    <el-button @click="cancel()">取 消</el-button>
                                    <el-button type="primary" @click="submitRadio">确定</el-button>
                                </el-form-item>
                            </div>
                        </el-form>

                        <!-- <el-form-item label="选项C" prop="roleDept">
                                    <el-input v-model="form.deptName" placeholder="选项C" @focus="handleDept()" readonly></el-input>
                                    <el-input type="hidden" v-model="form.roleDeptId"></el-input>
                                </el-form-item> -->

                        <!-- <div slot="footer" class="dialog-footer">
                                <el-button @click="cancel('form')">取 消</el-button>
                                <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
                                <el-button v-else type="primary" @click="update('form')">修 改</el-button>
                            </div> -->
                    </el-dialog>
                </el-tab-pane>

                <el-tab-pane label="多选题" name="second">
                    <div v-for="(question,index) in questions" :key="index" style="display:inline-block">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <div style="position: absolute;">{{index+1}}.{{question.questions.stem}}</div>
                                <el-button style="float: right; padding: 3px 0px 3px 15px" type="text" @click="multipleUpdate(question.questionId)">编辑</el-button>
                                <el-button style="float: right; padding: 3px 15px" type="text" @click="questionDelete(question.questionId)">删除</el-button>
                            </div>
                            <div v-for="(question1,index1) in question.questions.options" :key="index1" class="text item">
                                {{question1.optionId+"："+question1.value}}
                            </div>
                        </el-card>
                    </div>

                    <div style="text-align:center; margin-top:20px">
                        <el-pagination :current-page.sync="currentPage" :page-sizes="[6, 12, 18, 24]" :page-size.sync="pageSize"
                            :total="total" layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
                            @current-change="handleCurrentChange" />
                    </div>

                    <el-dialog title="多选题编辑修改" :visible.sync="dialogFormVisibleduo">
                        <el-form :model="multiple" label-width="100px">
                            <el-form-item label="题干内容" prop="dry">
                                <el-input type="textarea" v-model="multiple.dry" placeholder="题干内容"></el-input>
                            </el-form-item>
                            <el-form-item label="选项A" prop="option1">
                                <el-input type="textarea" v-model="multiple.option1" placeholder="选项A"></el-input>
                            </el-form-item>
                            <el-form-item label="选项B" prop="option2">
                                <el-input type="textarea" v-model="multiple.option2" placeholder="选项B"></el-input>
                            </el-form-item>
                            <el-form-item label="选项C" prop="option3">
                                <el-input type="textarea" v-model="multiple.option3" placeholder="选项C"></el-input>
                            </el-form-item>
                            <el-form-item label="选项D" prop="option4">
                                <el-input type="textarea" v-model="multiple.option4" placeholder="选项D"></el-input>
                            </el-form-item>
                            <el-form-item label="选项E" prop="option5">
                                <el-input type="textarea" v-model="multiple.option4" placeholder="选项D"></el-input>
                            </el-form-item>
                            <el-form-item label="选项F" prop="option6">
                                <el-input type="textarea" v-model="multiple.option4" placeholder="选项D"></el-input>
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
                                <el-form-item label="题目分数" prop="score">
                                    <el-select v-model="formM.score" placeholder="请选择">
                                        <el-option v-for="item in optionsCore" :key="item.value1" :label="item.label1"
                                            :value="item.value1">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="">
                                    <el-button @click="cancelM()">取 消</el-button>
                                    <el-button type="primary" @click="submitCheck">确定</el-button>
                                </el-form-item>
                            </div>
                        </el-form>
                    </el-dialog>
                </el-tab-pane>
                <!-- <el-tab-pane label="判断题" name="third">
                    <div v-for="(question,index) in questions" :key="index" style="display:inline-block">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <div style="position: absolute;">{{index+1}}.{{question.questions.stem}}</div>
                                <el-button style="float: right; padding: 3px 0px 3px 15px" type="text" @click="multipleUpdate(question.questionId)">编辑</el-button>
                                <el-button style="float: right; padding: 3px 15px" type="text" @click="questionDelete(question.questionId)">删除</el-button>
                            </div>
                            <div v-for="(question1,index1) in question.questions.options" :key="index1" class="text item">
                                {{question1.optionId+"："+question1.value}}
                            </div>
                        </el-card>
                    </div>
                    
                    <div style="text-align:center; margin-top:20px">
                        <el-pagination :current-page.sync="currentPage" :page-sizes="[6, 12, 18, 24]" :page-size.sync="pageSize"
                            :total="total" layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
                            @current-change="handleCurrentChange" />
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
                                <el-form-item label="题目分数">
                                    <el-select v-model="formJ.score" placeholder="请选择">
                                        <el-option v-for="item in optionsCore" :key="item.value1" :label="item.label1"
                                            :value="item.value1">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="">
                                    <el-button @click="cancelJ()">取 消</el-button>
                                    <el-button type="primary" @click="submitRadio1">确定</el-button>
                                </el-form-item>
                            </div>
                        </el-form>
                    </el-dialog>
                </el-tab-pane> -->

                <el-tab-pane label="问答题" name="fourth">
                    <div v-for="(question,index) in questions" :key="index" style="display:inline-block">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <div style="position: absolute;">{{index+1}}.{{question.questions.stem}}</div>
                                <el-button style="float: right; padding: 3px 0px 3px 15px" type="text" @click="textUpdate(question.questionId)">编辑</el-button>
                                <el-button style="float: right; padding: 3px 15px" type="text" @click="questionDelete(question.questionId)">删除</el-button>
                            </div>
                            <!-- <div>
                                <el-tag type="danger">{{"正确答案：主观题无标准答案"}}</el-tag>
                                <el-tag>{{question.score+"分"}}</el-tag>
                            </div> -->
                        </el-card>
                    </div>

                    <div style="text-align:center; margin-top:20px">
                        <el-pagination :current-page.sync="currentPage" :page-sizes="[6, 12, 18, 24]" :page-size.sync="pageSize"
                            :total="total" layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
                            @current-change="handleCurrentChange" />
                    </div>

                    <el-dialog title="问答题编辑修改" :visible.sync="dialogFormVisiblewen">
                        <el-form :model="formT" label-width="100px">
                            <el-form-item label="题干内容" prop="question">
                                <el-input type="textarea" v-model="formT.question" placeholder="题干内容"></el-input>
                            </el-form-item>
                            <div>
                                <el-form-item label="题目分数">
                                    <el-select v-model="formT.score" placeholder="请选择">
                                        <el-option v-for="item in options4" :key="item.value4" :label="item.label4"
                                            :value="item.value4">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="">
                                    <el-button @click="cancelT()">取 消</el-button>
                                    <el-button type="primary" @click="submitText">确定</el-button>
                                </el-form-item>
                            </div>
                        </el-form>
                    </el-dialog>

                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
    import { queryQuestion } from "@/api/query";
    import { deleteQuestion } from "@/api/query";
    import { queryjobList } from "@/api/query";
    import { queryEvery } from "@/api/query";
    import { questionUpdate } from "@/api/update";
    export default {
        data() {
            return {
                activeName: "first",
                whatQuestion: "单选题",
                show: true,
                questions: [],
                options: [],
                value: "", //岗位类别
                currentPage: 1,
                pageSize: 6,
                totalPage: "",
                total: null,
                titleJob: "",
                titleJob1: "",
                dialogFormVisible: false,
                dialogFormVisibleduo: false,
                dialogFormVisiblepan: false,
                dialogFormVisiblewen: false,
                form: {},
                single: {},

                formM: {},
                multiple: {},

                formJ: {},
                formT: {},
                optionsCore: [
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
                ]
            };
        },

        created() {
            this.queryList();
            // this.queryjob();
        },
        mounted() { },

        methods: {
            queryList() {
                var that = this;
                var subjectId = that.value;
                var questionType = that.activeName;
                var pageNum = that.currentPage;
                var pageSize = that.pageSize;

                // console.log(value)
                // var obj = this.options.find(function (x) {
                //     return x.id === value
                // })
                // this.title = obj.job;

                if (questionType == "first") {
                    questionType = "0";
                } else if (questionType == "second") {
                    questionType = "1";
                } else if (questionType == "third") {
                    questionType = "2";
                } else if (questionType == "fourth") {
                    questionType = "4";
                }
                queryQuestion(questionType, pageNum, pageSize).then(
                    response => {
                        console.log("****************");
                        console.log(response.data.testQuestions);
                        this.totalPage = response.data.testQuestions.pages;
                        this.total = response.data.testQuestions.total;
                        this.questions = response.data.testQuestions.records;
                        // if (questionType == "0" || questionType == "1") {
                        //     for (var i = 0; i < questions.length; i++) {
                        //         questions[i].question = JSON.parse(questions[i].question);
                        //     }
                        // }
                        // that.questions = questions;
                        // console.log(that.questions);
                    }
                );
            },

            submitRadio() {
                console.log(this.single);
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
                var score = form.score;
                var question = this.single;
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
                    questionUpdate(id, jobId, question, answer, questionType, score).then(
                        response => {
                            console.log(response.data);
                            this.dialogFormVisible = false;
                            this.queryList();
                            this.$notify({
                                title: "成功",
                                message: "试题修改成功",
                                type: "success"
                            });
                        }
                    );
                }
            },

            submitCheck() {
                console.log(this.multiple);
                console.log(this.formM);
                var formM = this.formM;
                var id = formM.id;
                var questionType = formM.questionType;
                var jobId = formM.jobId;
                var answer = formM.answer;
                answer = answer.join(".");
                var score = this.value1;
                var question = this.multiple;
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
                    questionUpdate(id, jobId, question, answer, questionType, score).then(
                        response => {
                            console.log(response.data);
                            this.dialogFormVisibleduo = false;
                            this.queryList();
                            this.$notify({
                                title: "成功",
                                message: "修改成功",
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
                    questionUpdate(id, jobId, question, answer, questionType, score).then(
                        response => {
                            console.log(response.data);
                            this.dialogFormVisiblepan = false;
                            this.queryList();
                            this.$notify({
                                title: "成功",
                                message: "修改成功",
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
                    questionUpdate(id, jobId, question, answer, questionType, score).then(
                        response => {
                            console.log(response.data);
                            this.dialogFormVisiblewen = false;
                            this.queryList();
                            this.$notify({
                                title: "成功",
                                message: "修改成功",
                                type: "success"
                            });
                        }
                    );
                }
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
            },

            handleSizeChange(val) {
                console.log(val);
                this.pageSize = val;
                this.queryList();
            },

            handleClick(tab, event) {
                var activeName = this.activeName;
                console.log(tab, event);
                console.log("==================");
                console.log(activeName);
                if (activeName == "first") {
                    this.whatQuestion = "单选题";
                } else if (activeName == "second") {
                    this.whatQuestion = "多选题";
                } else if (activeName == "third") {
                    this.whatQuestion = "判断题";
                } else if (activeName == "fourth") {
                    this.whatQuestion = "问答题";
                }
                this.currentPage = 1;
                this.queryList();
            },
            handleCurrentChange(val) {
                console.log("++++++++++++++++++++++++++++++");
                console.log(`当前页: ${val}`);
                console.log(this.currentPage);
                this.queryList();
            },

            singleUpdate(row) {
                console.log(row);
                this.$message({
                    title: '成功',
                    message: '暂无功能',
                    type: 'warning',
                    duration: 2000
                })
                // this.$router.push({
                //     name: "updateSingle",
                //     params: { questionId: row }
                // });
                // queryEvery(row).then(response => {
                //     console.log(response.data);
                //     var selectById = response.data.selectById;
                //     var question = JSON.parse(response.data.selectById.question);
                //     selectById.question = question;
                //     var answer = response.data.selectById.answer;
                //     if (answer == "A") {
                //         selectById.answer = 1;
                //     } else if (answer == "B") {
                //         selectById.answer = 2;
                //     } else if (answer == "C") {
                //         selectById.answer = 3;
                //     } else {
                //         selectById.answer = 4;
                //     }
                //     this.single = question;
                //     this.form = selectById;
                //     console.log(this.single);
                //     console.log(this.form);
                //     this.dialogFormVisible = true;
                // });
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
                    this.multiple = question;
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
                this.$message({
                    title: '成功',
                    message: '暂无功能',
                    type: 'warning',
                    duration: 2000
                })
                // queryEvery(row).then(response => {
                //     console.log(response.data);
                //     var selectById = response.data.selectById;
                //     this.formT = selectById;
                //     console.log(this.formT);
                //     this.dialogFormVisiblewen = true;
                // });
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

            titleText(value) {
                console.log(value);
                if (value) {
                    var obj = this.options.find(function (x) {
                        return x.id === value;
                    });
                    this.titleJob = obj.job;
                    this.titleJob1 = obj.job + " - "
                    // this.show = false;
                    // this.show1 = true;
                    this.queryList();
                }
            },

            clearSearch() {
                console.log("==================");
                this.value = "";
                this.titleJob = "";
                this.titleJob1 = ""
                // this.show = true;
                this.queryList();
            },
            questionDelete(row) {
                this.$message({
                    title: '成功',
                    message: '暂无功能',
                    type: 'warning',
                    duration: 2000
                })
                // this.$confirm("此操作将永久删除该项, 是否继续?", "提示", {
                //     confirmButtonText: "确定",
                //     cancelButtonText: "取消",
                //     type: "warning"
                // }).then(() => {
                //         deleteQuestion(row).then(response => {
                //             this.$message({
                //                 type: "success",
                //                 message: "删除成功!"
                //             });
                //             this.queryList();
                //         });
                //     })
                //     .catch(() => {
                //         this.$message({
                //             type: "info",
                //             message: "已取消删除"
                //         });
                //     });
            },

        }
    };
</script>

<style scoped>
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

    .box-card {
        width: 550px;
        margin-left: 20px;
    }

    .select {
        margin-left: 20px;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .div-inline {
        display: inline;
    }
</style>