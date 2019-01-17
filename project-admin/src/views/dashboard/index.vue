<template>
    <div class="dashboard-container">
        <div style="margin-bottom:40px">
            <div class="dashboard-text">欢迎使用农产品信息采集系统管理后台</div>
            <!-- <div class="dashboard-text">用户名:{{ name }} </div>
        <div class="dashboard-text">角色:<span v-for="role in roles" :key="role">{{ role }}</span></div> -->
            <div>
                <el-row :gutter="12">
                    <el-col :span="8">
                        <el-card shadow="hover">
                            已有试题<span style="color:red">&nbsp;{{countQuestion}}&nbsp;</span>道
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover">
                            已有试卷<span style="color:red">&nbsp;{{countPaper}}&nbsp;</span>份
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover">
                            已有<span style="color:red">&nbsp;{{peopleNum}}&nbsp;</span>人参加了考试
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </div>

        <div style="margin-bottom:40px">
            <div class="dashboard-text" style="font-size:17px;">试题库<span style="color:red;">&nbsp;{{countQuestion}}&nbsp;</span>道</div>
            <div>
                <el-row :gutter="12">
                    <el-col :span="8">
                        <el-card shadow="hover">
                            单选题<span style="color:red">&nbsp;{{single}}&nbsp;</span>道
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover">
                            多选题<span style="color:red">&nbsp;{{multiple}}&nbsp;</span>道
                        </el-card>
                    </el-col>
                    <!-- <el-col :span="6">
                        <el-card shadow="hover">
                            判断题<span style="color:red">{{judgment}}</span>道
                        </el-card>
                    </el-col> -->
                    <el-col :span="8">
                        <el-card shadow="hover">
                            问答题<span style="color:red">&nbsp;{{text}}&nbsp;</span>道
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </div>

        <!-- <div class="dashboard-text" style="font-size:17px">试卷库<span style="color:red;">{{countPaper}}</span>份</div>
        <div class="container" style="margin-bottom:40px">
            <el-table :data="result" border style="width: 100%">
                <el-table-column prop="jobName" label="岗位名称" />
                <el-table-column fixed="right" prop="counts" label="份数" width="200" />
            </el-table>
            <div style="text-align:center; margin-top:10px">
                <el-pagination @current-change="handleCurrentChange" :current-page.sync="pageNum" :page-size="pageSize"
                    layout="total, prev, pager, next, jumper" :total="count">
                </el-pagination>
            </div>
        </div> -->
        <hr>
        <div>
            <div class="dashboard-text" style="font-size:17px;">最近考试记录</div>
            <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" border style="width: 100%; margin:0 20px">
                <el-table-column prop="taskId" label="序号" align="center">
                </el-table-column>
                <el-table-column prop="taskName" label="任务名称" align="center">
                </el-table-column>
                <el-table-column prop="name" label="姓名" align="center">
                </el-table-column>
                <el-table-column prop="username" label="用户名" align="center">
                </el-table-column>
                <el-table-column label="状态" align="center" class-name="status-col">
                    <template slot-scope="scope">
                    <span>
                        {{ scope.row.finishType==0? '已报名':(scope.row.finishType==1? '练习通过':(scope.row.finishType==2? '考试通过':'正式通过')) }}
                    </span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import { questionCount,paperCount,peopleCount,questionTypeCount } from "@/api/query";
    import { getList } from "@/api/examination";

    export default {
        data() {
            return {
                countQuestion: "",
                countPaper: "",
                peopleNum: "",
                single: "",
                judgment: "",
                multiple: "",
                text: "",
                pageNum: 1,
                pageSize: 5,
                pageNum1: 1,
                pageSize1: 5,
                sort: "DESC",
                orderBy: "gmt_create",
                tableData: [],
                result: [],
                count: null
            };
        },
        name: "Dashboard",
        computed: {
            ...mapGetters(["name", "roles"])
        },
        created() {
            this.queryCount();
        },
        mounted() { },

        methods: {
            //试题总数
            queryCount() {
                questionCount().then(response => {
                    if(response.data.success){
                        this.countQuestion = response.data.count;
                    }
                });
                //试卷数量
                paperCount().then(response => {
                    if(response.data.success){
                        this.countPaper = response.data.paperCount;
                    }
                });
                //考试人数
                peopleCount().then(response => {
                    if(response.data.success){
                        this.peopleNum = response.data.peopleCount;
                    }
                });
                //不同类型试题数量
                questionTypeCount().then(response => {
                    console.log(response.data);
                    if(response.data.success){
                        var array=response.data.typeList;
                        for(var i=0;i<array.length;i++){
                            if(array[i].questionType=="single"){
                                this.single = array[i].num;
                            }else if(array[i].questionType=="multiple"){
                                this.multiple = array[i].num;
                            }else if(array[i].questionType=="judgment"){
                                this.judgment = array[i].num;
                            }else if(array[i].questionType=="text"){
                                this.text = array[i].num;
                            }
                        }
                    }
                });
                //考试记录
                getList(1, 5).then(response => {
                    console.log(response);
                    if(response.data.success){
                    this.tableData=response.data.userTaskVOs.records;
                    }
                });
            },

            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                console.log(this.pageNum);
                this.queryCount();
            }
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .dashboard {
        &-container {
            margin: 30px;
        }

        &-text {
            font-size: 20px;
            line-height: 46px;
            text-align: center;
            margin-bottom: 15px;
        }
    }
</style>