<template>
    <div class="common-container">
        <div class="header">
            <el-input @input="queryjob" style="width: 200px;" class="filter-item" placeholder="岗位名称" v-model="jobParams">
            </el-input>
            <el-button class="filter-item" type="primary" icon="search" @click="queryjob">搜索</el-button>
            <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
        </div>
        <br>
        <div class="container">
            <el-table :data="jobList" border style="width: 100%">
                <el-table-column prop="job" label="岗位名称" />
                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <br>
        <div class="foot">
            <el-pagination :current-page.sync="currentPage" :page-sizes="[10,20,30,50]" :page-size.sync="pageSize"
                :total="count" layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
                @current-change="queryjob" />
        </div>
        <div class="dialog">
            <el-dialog :visible.sync="dialogFormVisible" :title="title">
                <el-form ref="ruleForm" :model="dialogForm" :rules="rules">
                    <el-row>
                        <el-col :span="24">
                            <el-form-item prop="jobName">
                                <el-input v-model="dialogForm.jobName" placeholder="请输入岗位名称" />
                            </el-form-item>
                        </el-col>
                    </el-row>

                </el-form>

                <div slot="footer" class="dialog-footer">
                    <el-button @click="handleCancle('ruleForm')">取 消</el-button>
                    &nbsp;
                    &nbsp;
                    <el-button type="primary" @click="handleSubmit('ruleForm')">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import { queryjobList } from "@/api/query";
    import { jobDelete } from "@/api/query";
    import { jobCreate } from "@/api/query";

    export default {
        data() {
            return {
                title: "增加岗位",
                pageSize: 10,
                totalPage: 1,
                currentPage: 1,
                dialogFormVisible: false,
                count: 0,
                jobParams: "",

                rules: {
                    jobName: [
                        { required: true, message: "请填写岗位名称", trigger: "blur" }
                    ]
                },

                dialogForm: {
                    jobId: "",
                    jobName: ""
                },

                jobList: [] // 岗位
            };
        },
        computed: {},
        watch: {},
        created() {
            this.queryjob();
        },
        methods: {
            // 增删查改
            queryjob() {
                console.log(this.pageSize);
                queryjobList(this.currentPage, this.pageSize, this.jobParams).then(
                    response => {
                        console.log(response);
                        this.jobList = response.data.result;
                        this.totalPage = parseInt(response.data.totalPage);
                        this.count = parseInt(response.data.count);
                    }
                );
            },
            handleSizeChange(val) {
                console.log(val);
                this.pageSize = val;
                this.queryjob();
                // queryjob().then(
                //     response => {
                //         this.jobList = response.data.result;
                //         this.count = parseInt(response.data.count);
                //     }
                // );
            },
            handleSubmit(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        console.log(this.dialogForm.jobName);
                        jobCreate(this.dialogForm.jobName).then(response => {
                            if (!response.data.success) {
                                this.$message.error("该岗位名称已存在");
                            } else {
                                this.$message({
                                    message: "操作成功",
                                    type: "success"
                                });
                                this.dialogFormVisible = false;
                                this.$refs[formName].resetFields();
                                this.queryjob();
                            }
                        });
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            },
            handleDelete(row) {
                this.$confirm("此操作将永久删除该项, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        jobDelete(row.id).then(response => {
                            this.$message({
                                type: "success",
                                message: "删除成功!"
                            });
                            this.queryjob(this.currentPage);
                            if (this.count % 10 === 1 && this.currentPage !== 1) {
                                console.log(this.count);
                                this.currentPage--;
                                this.queryjob();
                            }
                        });
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消删除"
                        });
                    });
            },

            handleAdd() {
                this.dialogFormVisible = true;
            },
            handleCancle(formName) {
                this.dialogFormVisible = false;
                this.$refs[formName].resetFields();
                this.queryjob();
            }
        }
    };
</script>

<style scoped>
    .common-container {
        padding: 40px 45px 20px 50px;
        margin-bottom: 10px;
    }

    .myinput>>>.el-input__inner {
        width: 30%;
    }
</style>