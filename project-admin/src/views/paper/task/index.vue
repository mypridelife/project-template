<template>
    <div class="app-container calendar-list-container">
        <div style="padding-bottom:20px;">
            <el-input style="width: 200px;" class="filter-item" placeholder="任务名称" v-model="taskName" />
            <el-button class="filter-item" type="primary" icon="search" @click="handleFilter">搜索</el-button>
            <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="edit" @click="handleCreate">添加</el-button>
        </div>

        <el-table v-loading="listLoading" :key="list" :data="taskList" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 99%">

        <el-table-column align="center" label="序号">
            <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
            </template>
        </el-table-column>

        <el-table-column align="center" label="任务名称">
            <template slot-scope="scope">
            <span>
                {{ scope.row.taskName }}
            </span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="任务简介">
            <template slot-scope="scope">
            <span>
                {{ scope.row.taskSummary }}
            </span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="任务奖励">
            <template slot-scope="scope">
            <span>
                {{ scope.row.taskWard }}
            </span>
            </template>
        </el-table-column>

        <el-table-column align="center" label="创建时间">
            <template slot-scope="scope">
            <span>{{ confirmDate(scope.row.gmtCreate) }}</span>
            </template>
        </el-table-column>

        <el-table-column label="状态" align="center" class-name="status-col">
            <template slot-scope="scope">
            <el-tag :type="scope.row.taskType==1?'primary':'info'">{{ scope.row.taskType==0? '未发布':(scope.row.taskType==1? '发布':'过期') }}</el-tag>
            </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="400">
            <template slot-scope="scope">
                <el-button size="small" type="success" @click="handleUpdate(scope.row)">编辑
                </el-button>
                <el-button size="small" type="info" @click="paper(scope.row)">试卷
                </el-button>
                <el-button v-if="scope.row.taskType==1" size="small" type="draft" :disabled="scope.row.taskType==2" @click="handleWithdraw(scope.row)">撤回
                </el-button>
                <el-button v-if="scope.row.taskType!=1 || scope.row.taskType==2" size="small" type="primary" :disabled="scope.row.taskType==2" @click="handleRelease(scope.row)">发布
                </el-button>
                <el-button size="small" type="danger" @click="delTask(scope.row)">删除
                </el-button>
                <!-- <el-button size="small" type="danger" @click="taskLink(scope.row)">链接
                </el-button>
                <el-button size="small" type="danger" @click="taskCode(scope.row)">二维码
                </el-button> -->
            </template>
        </el-table-column>

        </el-table>
        <div v-show="!listLoading" style="padding-top:20px;">
            <el-pagination @size-change="handleSizeChange" :current-page.sync="pageNum" @current-change="handleCurrentChange" :page-sizes="[10,20,30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"/>
        </div>

        <el-dialog :title="dialogStatus==0?'创建':'编辑'" :visible.sync="dialogFormVisible">
            <el-form :model="form" ref="form" :rules="rules" label-width="100px">
                <el-form-item label="任务名称" prop="taskName">
                    <el-input v-model="form.taskName" placeholder="请输任务名称"/>
                </el-form-item>
                <el-form-item label="任务介绍" prop="taskDescription">
                    <el-input type="textarea" v-model="form.taskDescription" placeholder="请输任务介绍"/>
                </el-form-item>
                <el-form-item label="任务简介" prop="taskSummary">
                    <el-input type="textarea" v-model="form.taskSummary" placeholder="请输任务简介"/>
                </el-form-item>
                <el-form-item label="任务奖励" prop="taskWard">
                    <el-input v-model="form.taskWard" placeholder="请输任务奖励"/>
                </el-form-item>
                <el-form-item label="开始时间"  prop="startTime">
                    <el-date-picker v-model="form.startTime" type="date" placeholder="请选择日期" :picker-options="pickerOptions0"></el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间" prop="endTime">
                    <el-date-picker v-model="form.endTime" type="date" placeholder="请选择日期" :picker-options="pickerOptions1"></el-date-picker>
                </el-form-item>


            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel('form')">取 消</el-button>
                <el-button v-if="dialogStatus==0" type="primary" @click="create('form')">确 定</el-button>
                <el-button v-else type="primary" @click="update('form')">修 改</el-button>
            </div>
        </el-dialog>

    </div>
</template>
<script>
    import { taskList,getTask,updateTask,addTask,selectByTaskName,releaseTask,setPaper,getByName,getByIdAndName,deleteTask } from "@/api/task";
    export default {
        data() {
            return {
                pickerOptions0: {//结束时间不能大于开始时间
                    disabledDate: (time) => {
                        if (this.form.endTime) {
                            return time.getTime() > new Date(this.form.endTime).getTime();
                        }else{//还没有选择结束时间的时候，让他只能选择今天之后的时间包括今天
                            return time.getTime() < Date.now() - 8.64e7
                        } 
     
                    }
                },
                pickerOptions1: {
                    disabledDate: (time) => {
                        if(this.form.startTime){
                          return time.getTime() < new Date(this.form.startTime).getTime() - 1*24*60*60*1000;//可以选择同一天
                        }
                    }
                },
                pageNum:1,
                pageSize:10,
                taskName:'',
                taskList:[],
                form:{},
                list: null,
                total: null,
                listLoading: true,
                dialogStatus: 0,
                dialogFormVisible: false,
                rules: {
                    taskName: [{required: true,message: "请输任务名称",trigger: "blur"}],
                    taskDescription: [{required: true,message: "请输任务介绍",trigger: "blur"}],
                    taskSummary: [{required: true,message: "请输任务简介",trigger: "blur"}],
                    taskWard: [{required: true,message: "请输任务奖励",trigger: "blur"}],
                    startTime: [{required: true,message: "请输任务奖励",trigger: "blur"}],
                    endTime: [{required: true,message: "请输任务奖励",trigger: "blur"}],
                },
            };
        },

        created() {
            this.getTaskList();
        },

        methods: {
            //时间转换
            confirmDate(v){
                var endvalue = new Date(v)
                var Y = endvalue.getFullYear() + '-';
                var M = (endvalue.getMonth()+1 < 10 ? '0'+(endvalue.getMonth()+1) : endvalue.getMonth()+1)+ '-';
                var D = (endvalue.getDate()+1 < 10 ? '0'+(endvalue.getDate()) : endvalue.getDate());
                return Y+M+D;
            },
            //获取任务列表
            getTaskList(){
                taskList(this.pageNum,this.pageSize).then((res) => {
                    console.log(res)
                    this.listLoading=false;
                    if(res.data.success){
                        this.pageSize=res.data.taskList.size;
                        this.pageNum=res.data.taskList.pages;
                        this.total=res.data.taskList.total;
                        this.taskList=res.data.taskList.records;
                    }
              })
            },
            //任务模糊搜索
            handleFilter(){
                console.log(this.taskName);
                selectByTaskName(this.pageNum,this.pageSize,this.taskName).then((res) => {
                    console.log(res)
                    if(res.data.success){
                        this.taskList=res.data.taskList.records;
                        this.pageSize=res.data.taskList.size;
                        this.pageNum=res.data.taskList.pages;
                        this.total=res.data.taskList.total;
                    }
              })
            },
            //显示添加弹框
            handleCreate(){
                this.dialogStatus=0;
                this.dialogFormVisible=true;
                this.form={};
            },
            //更换数据量
            handleSizeChange(val) {
                this.pageSize=val;
                this.pageNum=1;
                this.getTaskList();
            },
            //更换数据页数
            handleCurrentChange(val) {
                this.pageSize=10;
                this.pageNum=val;
                this.getTaskList();
            },
            //获取任务详情
            handleUpdate(row){
                console.log(row.id)
                if(row.taskType==1){
                    this.$message({
                        title: '失败',
                        message: '请先撤回该任务，在进行编辑',
                        type: 'error',
                        duration: 2000
                    })
                }else{
                    getTask(row.id).then((res) => {
                        console.log(res)
                        if(res.data.success){
                            this.dialogStatus=1;
                            this.dialogFormVisible=true;
                            this.form=res.data.task;
                        }else{
                            this.$message({
                                title: '失败',
                                message: '获取任务详情失败',
                                type: 'error',
                                duration: 2000
                            })
                        }
                  })
                }
            },
            //关闭按钮
            cancel(formName){
                this.dialogFormVisible=false;
                this.$refs[formName].resetFields();
            },
            //创建任务
            create(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        getByName(this.form.taskName).then((res) => {
                            console.log(res)
                            if(res.data.success){
                                addTask(this.form).then((res) => {
                                    console.log(res)
                                    if(res.data.success){
                                        this.dialogFormVisible=false;
                                        this.getTaskList();
                                        this.$message({
                                            title: '成功',
                                            message: '修改成功',
                                            type: 'success',
                                            duration: 2000
                                        })
                                    }else{
                                        this.$message({
                                            title: '失败',
                                            message: '修改失败',
                                            type: 'error',
                                            duration: 2000
                                        })
                                    }
                                })
                            }else{
                                this.$message({
                                    title: '失败',
                                    message: '任务名称已经存在',
                                    type: 'error',
                                    duration: 2000
                                })
                            }
                        })
                        
                    }
                });
            },
            //更新任务
            update(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        getByIdAndName(this.form.id,this.form.taskName).then((res) => {
                            console.log(res)
                            if(res.data.success){
                                updateTask(this.form).then((res) => {
                                    console.log(res)
                                    if(res.data.success){
                                        this.dialogFormVisible=false;
                                        this.getTaskList();
                                        this.$message({
                                            title: '成功',
                                            message: '修改成功',
                                            type: 'success',
                                            duration: 2000
                                        })
                                    }else{
                                        this.$message({
                                            title: '失败',
                                            message: '修改失败',
                                            type: 'error',
                                            duration: 2000
                                        })
                                    }
                                })
                            }else{
                                this.$message({
                                    title: '失败',
                                    message: '任务名称已经存在',
                                    type: 'error',
                                    duration: 2000
                                })
                            }
                        })
                        
                    }
                });
            },
            //试卷
            paper(row){
                if(row.taskType==1){
                    this.$message({
                        title: '失败',
                        message: '请先撤回该任务，在进行编辑',
                        type: 'error',
                        duration: 2000
                    })
                }else{
                    setPaper(row.id).then((res) => {
                        console.log(res)
                        if(res.data.success){
                            localStorage.setItem('paperId',res.data.paperQuestionVO.paper.id);
                            this.$router.push('/enterPaper')
                        }else{
                            this.$message({
                                title: '失败',
                                message: '查询失败',
                                type: 'error',
                                duration: 2000
                            })
                        }
                    })
                }
            },
            //任务撤回
            handleWithdraw(row){
                this.$confirm(
                    '此操作将改变任务的状态为未发布(任务名称:' + row.taskName + '), 是否继续?',
                    '提示',
                    {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }
                ).then(() => {
                    releaseTask(row.id,0).then((res) => {
                        console.log(res)
                        if(res.data.success){
                            this.getTaskList();
                            this.$message({
                                title: '成功',
                                message: '撤回成功',
                                type: 'success',
                                duration: 2000
                            })
                        }
                    })
                })
            },
            //任务发布
            handleRelease(row){
                this.$confirm(
                    '此操作将改变任务的状态为未发布(任务名称:' + row.taskName + '), 是否继续?',
                    '提示',
                    {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }
                ).then(() => {
                    releaseTask(row.id,1).then((res) => {
                        console.log(res)
                        if(res.data.success){
                            this.getTaskList();
                            this.$message({
                                title: '成功',
                                message: '发布成功',
                                type: 'success',
                                duration: 2000
                            })
                        }else{
                            this.$message({
                                title: '失败',
                                message: '发布失败，请查看任务信息',
                                type: 'error',
                                duration: 2000
                            })
                        }
                    })
                })
            },
            //删除任务
            delTask(row){
                deleteTask(row.id).then((res) => {
                    console.log(res)
                    if(res.data.success){
                        this.getTaskList();
                        this.$message({
                            title: '成功',
                            message: '删除成功',
                            type: 'success',
                            duration: 2000
                        })
                    }else{
                        this.$message({
                            title: '失败',
                            message: '删除失败',
                            type: 'error',
                            duration: 2000
                        })
                    }
                })
            },
            //链接
            taskLink(row){
                this.$message({
                    title: '成功',
                    message: '暂无功能',
                    type: 'warning',
                    duration: 2000
                })
            },
            //二维码
            taskCode(row){
                this.$message({
                    title: '成功',
                    message: '暂无功能',
                    type: 'warning',
                    duration: 2000
                })
            },
        }
    };
</script>
<style scoped>
.bottom-button {
    position: fixed;
    /* z-index: 500; */
    bottom: 0px;
    width: 100%;
    text-align:center;
    margin-left: -7%;
    /* background-color: #F7F7FA; */
    background-color: #FFF;
}
</style>