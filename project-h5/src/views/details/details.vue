<template>
  <div class="page">

    <div>
      <van-panel title="数据" class="panelTitle1">
        <div class="panel_content">
          <van-row>
            <van-col span="6"><div class="metricTitle">指标名称</div></van-col>
            <van-col span="18" ><div style="font-size: 1em;">{{ metric.metricName }}</div></van-col>
          </van-row>
          <van-row type="flex" align="center" justify="space-between">
            <!-- <van-col span="6">
              <div class="metricTitle">指标名称</div>
            </van-col> -->
            <van-col span="8">
              <div class="metricTitle">指标值</div>
            </van-col>
            <van-col span="1" />
            <van-col span="5" align='right'>
              <div class="metricTitle">环比</div>
            </van-col>
            <van-col span="3" />
            <van-col span="7" align='right'>
              <div class="metricTitle">周同比</div>
            </van-col>
          </van-row>
          <van-row type="flex" align="center" justify="space-between">
            <!-- <van-col span="5">
              <div class="metricName">{{ metric.metricName }}</div>
            </van-col> -->
            <van-col span="8">
              <div class="metricValue">{{ metric.metricValue }}
                <!-- <span v-if="metric.metricUnit">({{metric.metricUnit}})</span> -->
              </div>
            </van-col>
            <van-col span="1" />
            <van-col :style="{color: getColor(metric.ringDiff)}" span="5" align='right'>
              <div class="ring">
                <span>{{ metric.ringDiff }}</span>
                <span>({{ metric.ringDiffPercent }})</span>
              </div>
            </van-col>
            <van-col span="3" />
            <van-col :style="{color: getColor(metric.weekDiff)}" span="7" align='right'>
              <div class="ring">
                <span>{{ metric.weekDiff }}</span>
                <span>({{ metric.weekDiffPercent }})</span>
              </div>
            </van-col>
          </van-row>
        </div>
      </van-panel>
      <br>

      <van-panel title="走势" class="panelTitle2">
        <div>
          <Zhe :data-source="metric.metricHistory" :metric="metric" style="text-align:center" />
        </div>
      </van-panel>

      <br>

      <van-panel title="明细" class="panelTitle3">

        <van-list
          v-model="loading"
          :finished="finished"
        >

          <van-cell
            v-for="item in metricTable"
            :key="item.data"
            :title="item.data"
            :value="item.value"
          />
        </van-list>

      </van-panel>

    </div>

  </div>
</template>

<script>
import Zhe from '@/components/zhexiantu'

export default {
  components: {
    Zhe
  },
  data() {
    return {
      loading: false,
      finished: true,
      metric: this.$store.state.details.metric

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
    metricTable() {
      return this.$store.state.details.metric.metricHistory.reverse()
    }
  },
  mounted() {
    this.$store.state.board.boardName = this.metric.metricName
  },
  methods: {
  }
}
</script>

<style scoped>
.panel_content {
  padding: 20px;
  word-wrap:break-word;
  word-spacing:normal;
}
/* .panelTitle1 {
  font-size: 1em;
}
.panelTitle2 {
  font-size: 0.4em;
} */
.metricTitle {
  font-size: 1em;
  /*text-align: center;*/
  margin-bottom: 1em;
}
.metricName {
  font-size: 0.8em;
  /*text-align: center;*/
}
.metricValue {
  font-size: 1.2em;
  font-weight: bold;
  /*text-align: center;*/
}
.ring {
  font-size: 0.7em;
  font-weight: bold;
  /*text-align: center;*/
}
</style>
