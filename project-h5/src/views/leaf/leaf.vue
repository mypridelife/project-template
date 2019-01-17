<template>
  <div class="page">

    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
    >

      <div>

        <div v-if="hasData" class="page-body">
          <van-cell-group
            v-for="(item,index) in records"
            :key="index"
          >
            <van-cell
              :value="item.boardName"
              class="my-cell"
              clickable
              @click="handleClick(item.id)"
            />
          </van-cell-group>
        </div>

        <div v-else>
          <van-cell
            value="暂无页面"
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
import { getBoardList } from '../../api/leaf.js'
export default {
  data() {
    return {
      isLoading: false,
      hasData: true,
      boardPage: {},
      records: [],
      pageSize: 10,
      currentPage: 1,
      pages: 1,
      projectId: this.$route.query.id
    }
  },
  mounted() {
    this.$nextTick(() => {
      const page = parseInt(this.$store.state.share.leafCurrentPage)
      this.handleQuery(page)
    })
    this.$store.commit('SET_BOARDTITLE', '页面列表')
  },
  methods: {
    handleQuery(pageNo, refesh) {
      const that = this
      getBoardList(this.pageSize, pageNo, this.projectId)
        .then(res => {
          console.log('getBoardList', res.data)
          that.boardPage = res.data.boardPage
          that.records = res.data.boardPage.records
          that.pages = res.data.boardPage.pages
          that.currentPage = pageNo
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
        name: 'Board',
        params: {
          id
        }
      })
      this.$store.commit('SET_LEAFCURRENTPAGE', this.currentPage)
    }
  }
}
</script>

<style scoped>
.my-cell >>> .van-cell__value--alone {
  /* text-align: center; */
  line-height: 30px;
}
.page-foot {
  margin-top: 30px;
  margin-bottom: 100px;
}
</style>
