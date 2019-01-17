<template>
  <div class="common-container">
    <!-- <div
      style="text-align: right; font-size: 15px ; margin: 20px"
      class="header"
    >
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="input"
        @input="searchRecord"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="searchRecord"
        ></el-button>
      </el-input>
    </div> -->
    <el-table v-loading="listLoading" :key="list" :data="tableData" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 99%">

        <el-table-column align="center" label="序号">
            <template slot-scope="scope">
            <span>{{ scope.row.taskId }}</span>
            </template>
        </el-table-column>

        <el-table-column align="center" label="任务名称">
            <template slot-scope="scope">
            <span>
                {{ scope.row.taskName }}
            </span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="姓名">
            <template slot-scope="scope">
            <span>
                {{ scope.row.name }}
            </span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="用户名">
            <template slot-scope="scope">
            <span>
                {{ scope.row.username }}
            </span>
            </template>
        </el-table-column>

        <el-table-column label="状态" align="center" class-name="status-col">
            <template slot-scope="scope">
              <span>
                {{ scope.row.finishType==0? '已报名':(scope.row.finishType==1? '练习通过':(scope.row.finishType==2? '考试通过':'正式通过')) }}
            </span>
            <!-- <el-tag :type="scope.row.finishType==1?'primary':'info'">{{ scope.row.finishType==0? '未发布':(scope.row.finishType==1? '发布':'过期') }}</el-tag> -->
            </template>
        </el-table-column>

        <!-- <el-table-column align="center" label="操作" width="400">
            <template slot-scope="scope">
            </template>
        </el-table-column> -->
      </el-table>
      <div v-show="!listLoading" style="padding-top:20px;">
          <el-pagination @size-change="handleSizeChange" :current-page.sync="pageNum" @current-change="handleCurrentChange" :page-sizes="[10,20,30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"/>
      </div>
  </div>
</template>

<script>
import { getList } from "@/api/examination";
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      input: "",
      multipleSelection: [],
      pageNum:1,
      pageSize:10,
      downloadLoading: false,
      list: null,
      total: null,
      listLoading: true,
    };
  },

  created() {
    this.getExaminationList();
  },
  mounted() {},

  methods: {
    //获取记录列表
    getExaminationList() {
      getList(this.pageNum, this.pageSize).then(response => {
        console.log(response);
        this.listLoading=false;
        if(response.data.success){
          this.tableData=response.data.userTaskVOs.records;
          this.pageNum=response.data.userTaskVOs.pages;
          this.pageSize=response.data.userTaskVOs.size;
          this.total=response.data.userTaskVOs.total;
        }
      });
    },
    //更换数据量
    handleSizeChange(val) {
        this.pageSize=val;
        this.pageNum=1;
        this.getExaminationList();
    },
    //更换数据页数
    handleCurrentChange(val) {
        this.pageSize=10;
        this.pageNum=val;
        this.getExaminationList();
    },

  }
};
</script>


<style scoped>
.common-container {
  padding: 40px 45px 20px 50px;
  margin-bottom: 10px;
}
</style>