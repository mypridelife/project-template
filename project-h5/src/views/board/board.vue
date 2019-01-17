<template>
  <div class="page">
    <keep-alive>
      <group v-model="boardInfo">
        <datetime v-model="boardInfo.startDate" format="YYYY-MM-DD" title="开始时间" @on-change="change" @on-cancel="log('cancel')" @on-confirm="onConfirm" @on-hide="log('hide', $event)" />
        <datetime v-model="boardInfo.endDate" title="结束时间" @on-change="change" @on-cancel="log('cancel')" @on-confirm="onConfirm" @on-hide="log('hide', $event)" />
      </group>
    </keep-alive>
    <br>
    <div v-for="(item,index) in cards" :key="index" class="panelClass">

      <van-panel :title="item.title">
        <div v-if="item.cardStyle">
          <div v-for="(item2,index2) in item.metrics" :key="index2" class="panel_content" @click="handleDataClick(item2)">
            <van-row type="flex" align="center" justify="space-between">
              <van-col span="7">
                <span class="metricName">{{ item2.metricName }} </span>
              </van-col>
              <van-col span="7">
                <span class="metricValue">{{ item2.metricValue }}</span>
              </van-col>
              <van-col :style="{color: getColor(item2.ringDiff)}" span="10">
                <span class="ring">{{ item2.ringDiff }}</span>
                <span class="ring">({{ item2.ringDiffPercent }})</span>
              </van-col>
            </van-row>
          </div>
        </div>

        <div v-else style="text-align:center;background-color:#fff">
          <div v-if="hasData(item.data)" >
            <v-chart :data="item.data" :width="330" :height="200">
              <v-tooltip disabled />
              <v-pie :radius="0.85" :inner-radius="0.7" series-field="name" />
              <v-legend :options="legendOptions(item)" />
            </v-chart>
          </div>
          <div v-else style="padding-top:17px;padding-bottom:17px">
            暂无数据
          </div>

        </div>
      </van-panel>
      <br>
    </div>
  </div>
</template>

<script>
import { VChart, VLine, VArea, VTooltip, VLegend, VBar, VPie, VGuide, VScale, XButton, Group, Datetime } from 'vux'
import BingTu from '@/components/bingtu'

export default {
  components: {
    VChart,
    VLine,
    VArea,
    VTooltip,
    VLegend,
    VBar,
    VPie,
    VGuide,
    VScale,
    XButton,
    Datetime,
    Group,
    BingTu
  },
  inject: ['reload'],
  data() {
    return {
      boardInfo: {
        startDate: this.$store.state.board.startDate,
        endDate: this.$store.state.board.endDate,
        boardId: this.$store.state.board.boardId,
        password: this.$store.state.board.password
      },
      metricInfo: {
        startDate: '',
        endDate: '',
        metricId: ''
      },
      cards: this.$store.state.board.board.cards
    }
  },
  computed: {
    getColor() {
      return function(val) {
        if (val < 0) {
          return 'OrangeRed'
        } else if (val > 0) {
          return 'SeaGreen'
        } else if (val == 0) {
          return 'DodgerBlue'
        }
      }
    },
    hasData() {
      return function(val) {
        var has = false
        for (var i = 0; i < val.length; i++) {
          if (val[i].percent !== 0) {
            has = true
          }
        }
        // console.log('has', has)

        return has
      }
    },
    legendOptions() {
      return function(value) {
        return {
          position: 'right',
          itemFormatter(val) {
            return val + '  ' + JSON.parse(value.map)[val]
          }
        }
      }
    }

  },
  watch: {

  },
  mounted() {
    // this.setDate()
  },
  methods: {
    setDate() {
      this.$nextTick(() => {
        console.log(this.$store.state.board.endDate)
        // this.boardInfo.startDate = this.$store.state.board.endDate
        // this.boardInfo.endDate = this.$store.state.board.endDate
      })
    },
    handleQuery() {
      this.$store.dispatch('GetBoard', this.boardInfo).then(() => {
        this.cards = this.$store.state.board.board.cards
        this.reload()
      })
    },
    handleDataClick(item2) {
      this.metricInfo.metricId = item2.metricId
      this.metricInfo.startDate = this.boardInfo.startDate
      this.metricInfo.endDate = this.boardInfo.endDate

      this.$store.dispatch('GetMetricHistory', this.metricInfo).then(() => {
        this.$router.push({
          name: 'Details'
        })
      })
    },
    log(str1, str2 = '') {
      console.log(str1, str2)
    },
    change(value) {
      console.log('change', value)
    },
    onConfirm(val) {
      console.log('on-confirm arg', val)
      this.$store.commit('SET_StartDate', this.boardInfo.startDate)
      this.$store.commit('SET_EndDate', this.boardInfo.endDate)
      this.handleQuery()
    }

  }
}
</script>
<style scoped>
.panel_content {
  padding: 20px;
}
.metricName {
  font-size: 0.8em;
  margin-bottom: 0.6em;
}
.metricValue {
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 0.6em;
}
.ring {
  font-size: 0.8em;
  font-weight: bold;
}
.woyebuzhidaogaiqishenmemingzi {
  background-color: #17c295;
  background-color: #f7b55e;
  background-color: #f2725e;
  background-color: #4da9eb;
}
</style>
