<template>
  <div class="page">

    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
    >
      <div>
        <div
          v-if="hasData"
          class="page-body"
        >
          <van-cell-group
            v-for="(item,index) in records"
            :key="index"
          >
            <van-cell
              :value="item.projectName"
              class="my-cell"
              clickable
              @click="handleClick(item.id)"
            />
          </van-cell-group>
        </div>

        <div v-else>
          <van-cell
            value="暂无项目"
            class="my-cell"
          />
        </div>

        <div class="page-foot">
          <van-pagination
            v-model="currentPage"
            :page-count="pages"
            mode="simple"
            @change="handleChange"
          />
        </div>
      </div>

    </van-pull-refresh>

  </div>
</template>

<script>
import { getMaterialList } from '../../api/index.js'
export default {
  data() {
    return {
      isLoading: false,
      hasData: true,
      projectPage: {},
      records: [],
      pageSize: 5,
      currentPage: '',
      pages: 1
    }
  },
  created() {
    this.currentPage = parseInt(this.$store.state.share.indexCurrentPage)
    this.handleQuery(this.currentPage)
  },
  mounted() {
  },
  methods: {
    handleQuery(pageNo, refesh) {
      const that = this
      getMaterialList(this.pageSize, pageNo)
        .then(res => {
          console.log('getMaterialList', res.data.projectPage)
          that.projectPage = res.data.projectPage
          that.records = res.data.projectPage.records
          that.pages = res.data.projectPage.pages
          if (!that.records.length) {
            that.hasData = false
          }
          if (refesh) {
            setTimeout(() => {
              this.$toast('刷新成功')
              this.isLoading = false
            }, 500)
          }
        })
        .catch(err => {
          console.log(err)
          if (refesh) {
            this.$toast('刷新失败')
            this.isLoading = false
          }
        })
    },
    handleChange(currentPage) {
      this.handleQuery(currentPage)
    },
    onRefresh() {
      this.handleQuery(this.currentPage, 1)
    },
    handleClick(id) {
      this.$router.push({
        name: 'Leaf',
        query: {
          id
        }
      })
      this.$store.commit('SET_INDEXCURRENTPAGE', this.currentPage)
    }
  }
}
</script>

<style scoped>
.my-cell >>> .van-cell__value--alone {
  text-align: center;
  line-height: 50px;
}
.page-foot {
  margin-top: 30px;
  margin-bottom: 100px;
}
</style>
