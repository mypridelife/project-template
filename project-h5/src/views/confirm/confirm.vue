<template>
  <div class="page">
    <van-dialog v-model="show" :before-close="beforeClose" show-cancel-button>
      <van-field v-model="boardInfo.password" type="password" label="密码" placeholder="请输入密码" />
    </van-dialog>
    <van-panel v-if="shixiao" style="text-align: center; padding-bottom: 20px;">
      <div>
        页面已失效 。。。
      </div>
    </van-panel>
  </div>
</template>

<script>
import { isVerify } from '@/api/confirm.js'
import { formatDate } from '@/utils/formatDate.js'
import { setZuijin, getZuijin } from '@/utils/often.js'
export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      boardInfo: {
        startDate: formatDate(new Date(), 'yyyy-MM-dd'),
        endDate: formatDate(new Date(), 'yyyy-MM-dd'),
        boardId: this.id,
        password: ''
      },
      show: false,
      shixiao: false,
      zuijinArr: []
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.zuijinArr = getZuijin()
    })
    this.handleVerify()
  },
  methods: {
    handleVerify() {
      isVerify(this.id).then((res) => {
        console.log('password required?', res.data)
        if (res.data.msg === 0) {
          this.$store.dispatch('GetBoard', this.boardInfo).then(() => {
            this.handleArr()
            this.$router.push({
              name: 'Board'
            })
          })
        } else if (res.data.msg === -1) {
        //   this.shixiao = true
          this.$router.push({
            name: '404'
          })
        } else if (res.data.msg === 1) {
          if (this.findPassword(this.id)) {
            this.boardInfo.password = this.findPassword(this.id)
            console.log('拿到密码')
            // setTimeout(this.$store.dispatch('GetBoard', this.boardInfo), 500)
            this.$store.dispatch('GetBoard', this.boardInfo)
              .then(() => {
                if (localStorage.getItem('msg') == 0) {
                  this.$toast('密码错误')

                  this.show = true
                  this.boardInfo.password = ''
                } else {
                  console.log(this.$route.fullPath)
                  this.handleArr()
                  this.$router.push({
                    name: 'Board'
                  })
                }

                this.show = false
              })
          } else {
            console.log('没有拿到密码')

            this.show = true
          }
        } else {
          console.log('password required?', res.data)
        }
      })
    },
    handleArr() {
      var often = {
        id: this.id,
        url: this.$route.fullPath,
        title: this.$store.state.board.boardName,
        password: this.$store.state.board.password,
        startDate: this.$store.state.board.startDate,
        endDate: this.$store.state.board.endDate
      }
      var repeat = false
      //   console.log('often', often)

      if (this.zuijinArr.length >= 4) { // 长度为4
        for (var i = 0; i < this.zuijinArr.length; i++) {
          if (often.url === this.zuijinArr[i].url) {
            repeat = true
            this.zuijinArr[i] = this.often// 重复，覆盖掉
          }
        }
        if (!repeat) { // 无重复
          this.zuijinArr.pop()// 删除最后一个元素
          this.zuijinArr.unshift(
            often
          )// 存入data
        }
      } else {
        for (var j = 0; j < this.zuijinArr.length; j++) {
          if (often.url === this.zuijinArr[j].url) {
            repeat = true
            this.zuijinArr[i] = this.often
          }
        }
        if (!repeat) {
          this.zuijinArr.unshift(
            often
          )// 存入data
        }
        setZuijin(this.zuijinArr)
      }
    },
    async beforeClose(action, done) {
      if (action === 'confirm') {
        await this.$store.dispatch('GetBoard', this.boardInfo)
        if (localStorage.getItem('msg') == 0) {
          this.$toast('密码错误')
          this.boardInfo.password = ''
          done(false)
        } else {
          console.log(this.$route.fullPath)
          this.handleArr()
          this.$router.push({
            name: 'Board'
          })
          done()
        }
      } else {
        // this.$router.push({
        //   name: '404'
        // })
        // this.$router.go(-2)
        this.$router.push({
          name: 'Board'
        })
        done()
      }
    },
    findPassword(val) {
      console.log(val)
      console.log(this.zuijinArr)
      var have = false
      for (var i = 0; i < this.zuijinArr.length; i++) {
        if (val === this.zuijinArr[i].id) {
          have = true
          return this.zuijinArr[i].password
        }
      }
      if (!have) {
        return false
      }
    }
  }
}
</script>

<style scoped>
</style>
