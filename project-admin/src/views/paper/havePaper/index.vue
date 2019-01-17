<template>
    <div>
        <div class="title-text">
            <div class="div-inline" style="padding-right:30px;color:red"><b>{{title}}</b></div>
            <!-- <div class="div-inline distance" style="color:red">{{value1}}</div> -->
            <div class="div-inline" style="margin-right: 30px">选择岗位：
                <!-- <el-select v-model="value" placeholder="请选择试题所属学科" @change="queryList">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select> -->
                <el-select v-model="value" clearable placeholder="请选择岗位进行筛选" @clear="clearSearch" @change="titleText">
                    <el-option v-for="item in options" :key="item.id" :label="item.job" :value="item.id">
                    </el-option>
                </el-select>
            </div>

            <!-- <div class="div-inline">选择岗位：
                <el-select v-model="value1" placeholder="请选择试题所属岗位" @change="queryList">
                    <el-option v-for="item in options1" :key="item.value1" :label="item.label1" :value="item.value1">
                    </el-option>
                </el-select>
            </div> -->
        </div>
        <hr>
        <div style="margin:20px;">
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="rownum" label="序号">
                </el-table-column>
                <el-table-column prop="paperName" label="试卷名称">
                </el-table-column>
                <el-table-column prop="gmtCreate" label="创建时间">
                </el-table-column>
                <el-table-column prop="objective" label="客观题数">
                </el-table-column>
                <el-table-column prop="subjective" label="主观题数">
                </el-table-column>
                <el-table-column prop="totalScore" label="总分">
                </el-table-column>
                <el-table-column prop="frequency" label="被做次数">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="text-align:center; margin-top:20px">
                <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10"
                    layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import { queryPaper } from "@/api/query";
    import { deletePaper } from "@/api/delete";
    import { queryPaperDetail } from "@/api/query";
    import { queryjobList } from "@/api/query";
    export default {
        data() {
            return {
                pageSize: 10,
                pageNum: 1,
                value: "",
                title: "",
                totalPage: null,
                testPaper: [],
                total: null,
                currentPage: 1,
                options: [],
                tableData: []
            };
        },

        created() {
            this.queryList();
            this.queryjob();
        },

        methods: {
            queryjob() {
                queryjobList(1, 10000).then(response => {
                    console.log(response);
                    this.options = response.data.result;
                });
            },

            titleText(value) {
                console.log(value);
                if (value) {
                    var obj = this.options.find(function (x) {
                        return x.id === value;
                    });
                    this.title = obj.job;
                }
                this.queryList();
            },

            handleEdit(index, row) {
                console.log(index, row);
                var id = row.id;
                console.log(id);
                queryPaperDetail(id).then(response => {
                    console.log(response);
                    window.localStorage.setItem("paperId", id);
                    this.$router.push({
                        name: "paperDetail",
                        params: { paperId: id }
                    });
                });
            },
            // handleDelete(index, row) {
            //     console.log(index, row);
            //     var id = row.id;
            //     console.log(id);
            //     deletePaper(id).then(response => {
            //         console.log(response);
            //         // location.reload();
            //         this.$notify({
            //             title: "成功",
            //             message: "删除试卷成功",
            //             type: "success",
            //             duration: 1500
            //         });
            //         this.queryList();
            //     });

            handleDelete(index, row) {
                var id = row.id;
                console.log(id);
                this.$confirm("此操作将永久删除该项, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        deletePaper(id).then(response => {
                            this.$message({
                                type: "success",
                                message: "删除成功!"
                            });
                            this.queryList();
                        });
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消删除"
                        });
                    });
            },

            queryList() {
                var pageSize = this.pageSize;
                var pageNum = this.currentPage;
                var job = this.value;
                if (job == "不限") job = "";
                queryPaper(pageSize, pageNum, job).then(response => {
                    console.log(response);
                    this.totalPage = response.data.totalPage;
                    this.total = response.data.totalNum;
                    this.tableData = response.data.testPaper;
                });
            },

            handleCurrentChange(val) {
                console.log("++++++++++++++++++++++++++++++");
                console.log(`当前页: ${val}`);
                console.log(this.currentPage);
                this.queryList();
            },

            clearSearch() {
                console.log("==================");
                this.value = "";
                this.title = "";
                this.queryList();
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