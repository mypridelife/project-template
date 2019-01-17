<template>
    <div>
        <div class="title-text">
            <div class="div-inline distance" style="color:red;"><b>{{title}}</b></div>
        </div>
        <div>
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">

                <el-tab-pane label="单选题" name="first">
                    <el-form label-width="80px">
                        <el-form-item label="题干内容">
                            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 8}" placeholder="请输入选择题选项内容"
                                v-model="textarea">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="选项A">
                            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 8}" placeholder="请输入选择题选项内容"
                                v-model="textarea1">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="选项B">
                            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 8}" placeholder="请输入选择题选项内容"
                                v-model="textarea2">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="选项C">
                            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 8}" placeholder="请输入选择题选项内容"
                                v-model="textarea3">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="选项D">
                            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 8}" placeholder="请输入选择题选项内容"
                                v-model="textarea4">
                            </el-input>
                        </el-form-item>
                        <!-- <el-form-item label="正确答案">
                            <el-radio-group v-model="radio">
                                <el-radio :label="1">A</el-radio>
                                <el-radio :label="2">B</el-radio>
                                <el-radio :label="3">C</el-radio>
                                <el-radio :label="4">D</el-radio>
                            </el-radio-group>
                        </el-form-item> -->
                        <div>
                            <!-- <el-form-item label="题目分数">
                                <el-select v-model="value1" placeholder="请选择">
                                    <el-option v-for="item in options1" :key="item.value1" :label="item.label1" :value="item.value1">
                                    </el-option>
                                </el-select>
                            </el-form-item> -->
                            <el-form-item label="">
                                <el-button type="primary" @click="submitRadio">完成编辑</el-button>
                            </el-form-item>
                        </div>
                    </el-form>
                </el-tab-pane>

                <el-tab-pane label="多选题" name="second">
                    <el-form label-width="80px">
                        <el-form-item label="题干内容">
                            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 8}" placeholder="请输入多选题选项内容"
                                v-model="textarea5">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="选项A">
                            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 8}" placeholder="请输入多选题选项内容"
                                v-model="textarea6">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="选项B">
                            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 8}" placeholder="请输入多选题选项内容"
                                v-model="textarea7">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="选项C">
                            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 8}" placeholder="请输入多选题选项内容"
                                v-model="textarea8">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="选项D">
                            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 8}" placeholder="请输入多选题选项内容"
                                v-model="textarea9">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="选项E">
                            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 8}" placeholder="请输入多选题选项内容"
                                v-model="textarea10">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="选项F">
                            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 8}" placeholder="请输入多选题选项内容"
                                v-model="textarea11">
                            </el-input>
                        </el-form-item>
                        <!-- <el-form-item label="正确答案">
                            <el-checkbox-group v-model="checkList">
                                <el-checkbox label="A"></el-checkbox>
                                <el-checkbox label="B"></el-checkbox>
                                <el-checkbox label="C"></el-checkbox>
                                <el-checkbox label="D"></el-checkbox>
                                <el-checkbox label="E"></el-checkbox>
                                <el-checkbox label="F"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item> -->
                        <div>
                            <!-- <el-form-item label="题目分数">
                                <el-select v-model="value2" placeholder="请选择">
                                    <el-option v-for="item in options2" :key="item.value2" :label="item.label2" :value="item.value2">
                                    </el-option>
                                </el-select>
                            </el-form-item> -->
                            <el-form-item label="">
                                <el-button type="primary" @click="submitCheck">完成编辑</el-button>
                            </el-form-item>
                        </div>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="判断题" name="third">
                    <el-form label-width="80px">
                        <el-form-item label="题干内容">
                            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 8}" placeholder="请输入判断题题干内容"
                                v-model="textarea12">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="选项A">
                            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 8}" placeholder="请输入判断题选项内容"
                                v-model="textarea1">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="选项B">
                            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 8}" placeholder="请输入判断题选项内容"
                                v-model="textarea2">
                            </el-input>
                        </el-form-item>
                        <!-- <el-form-item label="正确答案">
                            <el-radio-group v-model="radio1">
                                <el-radio :label="1">正确</el-radio>
                                <el-radio :label="2">错误</el-radio>
                            </el-radio-group>
                        </el-form-item> -->
                        <div>
                            <!-- <el-form-item label="题目分数">
                                <el-select v-model="value3" placeholder="请选择">
                                    <el-option v-for="item in options3" :key="item.value3" :label="item.label3" :value="item.value3">
                                    </el-option>
                                </el-select>
                            </el-form-item> -->
                            <el-form-item label="">
                                <el-button type="primary" @click="submitRadio1">完成编辑</el-button>
                            </el-form-item>
                        </div>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="问答题" name="fourth">
                    <el-form label-width="80px">
                        <el-form-item label="题干内容">
                            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 8}" placeholder="请输入问答题题干内容"
                                v-model="textarea13">
                            </el-input>
                        </el-form-item>
                        <div>
                            <!-- <el-form-item label="题目分数">
                                <el-select v-model="value4" placeholder="请选择">
                                    <el-option v-for="item in options4" :key="item.value4" :label="item.label4" :value="item.value4">
                                    </el-option>
                                </el-select>
                            </el-form-item> -->
                            <el-form-item label="">
                                <el-button type="primary" @click="submitText">完成编辑</el-button>
                            </el-form-item>
                        </div>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
    import { enterQuestion } from "@/api/enter";
    import { queryjobList } from "@/api/query";
    export default {
        data() {
            return {
                activeName: "first",
                options: [],
                title: "",
                value: "",
                jobParams: "",
                pageSize: 10000,
                currentPage: 1,

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
                value1: "",

                options2: [
                    {
                        value2: "1",
                        label2: "1"
                    },
                    {
                        value2: "2",
                        label2: "2"
                    },
                    {
                        value2: "3",
                        label2: "3"
                    },
                    {
                        value2: "4",
                        label2: "4"
                    },
                    {
                        value2: "5",
                        label2: "5"
                    },
                    {
                        value2: "6",
                        label2: "6"
                    },
                    {
                        value2: "7",
                        label2: "7"
                    },
                    {
                        value2: "8",
                        label2: "8"
                    },
                    {
                        value2: "9",
                        label2: "9"
                    },
                    {
                        value2: "10",
                        label2: "10"
                    }
                ],
                value2: "",

                options3: [
                    {
                        value3: "1",
                        label3: "1"
                    },
                    {
                        value3: "2",
                        label3: "2"
                    },
                    {
                        value3: "3",
                        label3: "3"
                    },
                    {
                        value3: "4",
                        label3: "4"
                    },
                    {
                        value3: "5",
                        label3: "5"
                    },
                    {
                        value3: "6",
                        label3: "6"
                    },
                    {
                        value3: "7",
                        label3: "7"
                    },
                    {
                        value3: "8",
                        label3: "8"
                    },
                    {
                        value3: "9",
                        label3: "9"
                    },
                    {
                        value3: "10",
                        label3: "10"
                    }
                ],
                value3: "",

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

                textarea: "",
                textarea1: "",
                textarea2: "",
                textarea3: "",
                textarea4: "",

                textarea5: "",
                textarea6: "",
                textarea7: "",
                textarea8: "",
                textarea9: "",
                textarea10: "",
                textarea11: "",

                textarea12: "",

                textarea13: "",

                radio: "",
                radio1: "",

                checkList: []
            };
        },

        created() {
            // this.queryjob();
        },

        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },

            titleText(value) {
                console.log(value);
                var obj = this.options.find(function (x) {
                    return x.id === value;
                });
                this.title = obj.job;
            },

            // queryjob() {
            //     console.log(this.pageSize);
            //     queryjobList(this.currentPage, this.pageSize, this.jobParams).then(
            //         response => {
            //             console.log(response);
            //             this.options = response.data.result;
            //         }
            //     );
            // },

            //新建单选题
            submitRadio() {
                var that = this;
                var type = ""; //问题类型
                var radio = that.radio; //问题答案
                var value = that.value; //岗位类型
                var value1 = that.value1; //分值
                var activeName = that.activeName;
                if (radio == "1") {
                    radio = "A";
                } else if (radio == "2") {
                    radio = "B";
                } else if (radio == "3") {
                    radio = "C";
                } else if (radio == "4") {
                    radio = "D";
                }
                if (activeName == "first") {
                    type = "0";
                } else if (activeName == "second") {
                    type = "1";
                } else if (activeName == "third") {
                    type = "2";
                } else if (activeName == "fourth") {
                    type = "4";
                }
                console.log(radio);
                console.log(value);
                console.log(value1);
                console.log(type);
                var question = {
                    dry: that.textarea,
                    option1: that.textarea1,
                    option2: that.textarea2,
                    option3: that.textarea3,
                    option4: that.textarea4
                };
                console.log(question);
                if (radio == "") {
                    this.$notify({
                        title: "警告",
                        message: "正确答案不能为空",
                        type: "warning"
                    });
                } else if (value == "") {
                    this.$notify({
                        title: "警告",
                        message: "题目所属岗位不能为空",
                        type: "warning"
                    });
                } else if (value1 == "") {
                    this.$notify({
                        title: "警告",
                        message: "题目分值不能为空",
                        type: "warning"
                    });
                } else if (that.textarea == "") {
                    this.$notify({
                        title: "警告",
                        message: "题干不能为空",
                        type: "warning"
                    });
                } else if (
                    that.textarea1 == "" ||
                    that.textarea2 == "" ||
                    that.textarea3 == "" ||
                    that.textarea4 == ""
                ) {
                    that.$notify({
                        title: "警告",
                        message: "题目选项不能为空",
                        type: "warning"
                    });
                } else {
                    enterQuestion(value, question, radio, type, value1).then(response => {
                        console.log(response);
                        // that.activeName = "first";
                        that.textarea = "",
                            that.textarea1 = "",
                            that.textarea2 = "",
                            that.textarea3 = "",
                            that.textarea4 = "",
                            that.radio = "",
                            that.value1 = "",
                            that.$notify({
                                title: "成功",
                                message: "试题录入成功",
                                type: "success"
                            });
                    });
                }
            },

            //新建多选题
            submitCheck() {
                var that = this;
                var type = ""; //题目类型
                var value = that.value; //岗位类型
                var value2 = that.value2; //题目分值
                var checkList = that.checkList; //题目答案
                var textarea5 = that.textarea5;
                var textarea6 = that.textarea6;
                var textarea7 = that.textarea7;
                var textarea8 = that.textarea8;
                var textarea9 = that.textarea9;
                var textarea10 = that.textarea10;
                var textarea11 = that.textarea11; //题目内容
                var activeName = that.activeName;
                if (activeName == "first") {
                    type = "0";
                } else if (activeName == "second") {
                    type = "1";
                } else if (activeName == "third") {
                    type = "2";
                } else if (activeName == "fourth") {
                    type = "4";
                }
                var question = {
                    dry: that.textarea5,
                    option1: that.textarea6,
                    option2: that.textarea7,
                    option3: that.textarea8,
                    option4: that.textarea9,
                    option5: that.textarea10,
                    option6: that.textarea11
                };
                var value1 = value2;
                var radio = checkList;
                console.log(radio);
                radio = radio.join(".");
                console.log(radio);
                if (that.checkList.length < 2) {
                    this.$notify({
                        title: "警告",
                        message: "正确答案不能少于两个",
                        type: "warning"
                    });
                } else if (value == "") {
                    this.$notify({
                        title: "警告",
                        message: "题目所属岗位不能为空",
                        type: "warning"
                    });
                } else if (that.value2 == "") {
                    this.$notify({
                        title: "警告",
                        message: "题目分值不能为空",
                        type: "warning"
                    });
                } else if (that.textarea5 == "") {
                    this.$notify({
                        title: "警告",
                        message: "题干不能为空",
                        type: "warning"
                    });
                } else if (
                    that.textarea6 == "" ||
                    that.textarea7 == "" ||
                    that.textarea8 == "" ||
                    that.textarea9 == "" ||
                    that.textarea10 == "" ||
                    that.textarea11 == ""
                ) {
                    this.$notify({
                        title: "警告",
                        message: "题目选项不能为空",
                        type: "warning"
                    });
                } else {
                    enterQuestion(value, question, radio, type, value1).then(response => {
                        console.log(response);
                        that.textarea6 = "";
                        that.textarea7 = "";
                        that.textarea8 = "";
                        that.textarea9 = "";
                        that.textarea10 = "";
                        that.textarea11 = "";
                        that.textarea5 = "";
                        that.checkList = [];
                        that.value2 = "";
                        that.$notify({
                            title: "成功",
                            message: "试题录入成功",
                            type: "success"
                        });
                    });
                }
            },

            //新建判断题
            submitRadio1() {
                var that = this;
                var type = ""; //题目类型
                var value = that.value; //岗位类型
                var textarea12 = that.textarea12; //判断题题目
                var radio1 = that.radio1; //判断题答案
                var value3 = that.value3; //题目分数
                var activeName = this.activeName;
                if (activeName == "first") {
                    type = "0";
                } else if (activeName == "second") {
                    type = "1";
                } else if (activeName == "third") {
                    type = "2";
                } else if (activeName == "fourth") {
                    type = "4";
                }
                if (radio1 == "1") {
                    radio1 = "正确";
                } else if (radio1 == "2") {
                    radio1 = "错误";
                }
                var question = textarea12;
                var value1 = value3;
                var radio = radio1;
                console.log(radio);
                if (radio1 == "") {
                    this.$notify({
                        title: "警告",
                        message: "正确答案不能为空",
                        type: "warning"
                    });
                } else if (value == "") {
                    this.$notify({
                        title: "警告",
                        message: "题目所属岗位不能为空",
                        type: "warning"
                    });
                } else if (value3 == "") {
                    this.$notify({
                        title: "警告",
                        message: "题目分值不能为空",
                        type: "warning"
                    });
                } else if (that.textarea12 == "") {
                    this.$notify({
                        title: "警告",
                        message: "题干不能为空",
                        type: "warning"
                    });
                } else {
                    enterQuestion(value, question, radio, type, value1).then(response => {
                        console.log(response);
                        that.textarea12 = "";
                        that.radio1 = "";
                        that.value3 = "";
                        that.$notify({
                            title: "成功",
                            message: "试题录入成功",
                            type: "success"
                        });
                    });
                }
            },

            //新建问答题
            submitText() {
                var that = this;
                var type = ""; //题目类型
                var value = that.value; //岗位类型
                var textarea13 = that.textarea13; //问答题题目
                var value4 = that.value4; //题目分数
                var activeName = that.activeName;
                if (activeName == "first") {
                    type = "0";
                } else if (activeName == "second") {
                    type = "1";
                } else if (activeName == "third") {
                    type = "2";
                } else if (activeName == "fourth") {
                    type = "4";
                }
                var question = textarea13;
                var value1 = value4;
                var radio = "";
                if (value == "") {
                    this.$notify({
                        title: "警告",
                        message: "题目所属岗位不能为空",
                        type: "warning"
                    });
                } else if (value4 == "") {
                    this.$notify({
                        title: "警告",
                        message: "题目分值不能为空",
                        type: "warning"
                    });
                } else if (that.textarea13 == "") {
                    this.$notify({
                        title: "警告",
                        message: "题干不能为空",
                        type: "warning"
                    });
                } else {
                    enterQuestion(value, question, radio, type, value1).then(response => {
                        console.log(response);
                        that.textarea13 = "";
                        that.value4 = "";
                        that.$notify({
                            title: "成功",
                            message: "试题录入成功",
                            type: "success"
                        });
                    });
                }
            }
        }
    };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .title-text {
        font-size: 15px;
        margin: 20px;
        text-align: center;
    }

    .div-inline {
        display: inline;
    }

    .distance {
        margin-right: 100px;
    }
</style>