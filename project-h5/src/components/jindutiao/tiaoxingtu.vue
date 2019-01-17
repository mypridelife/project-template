<template>
  <div ref="eleid" class="chart-wrapper">
    <canvas :id="eleId"/>
    <!-- <div style="text-align: center;width: 100px;height: 72px;vertical-align: middle;">
      <p id="number" ref="number" style="font-size: 28px;margin: 10px 10px 5px;font-weight: bold;"/>
      <p id="name" ref="name" style="font-size: 12px;margin: 0;"/>
    </div> -->
  </div>
</template>
<script>
const F2 = require('@antv/f2/lib/index') // 引入 F2
require('@antv/f2/lib/interaction/pie-select') // 引入饼图选中交互

export default {
  name: 'tiaoxingtu',
  date() {
    return {
      chart: {}
    }
  },
  props: {
    data: {
      type: Array,
      default: () => {
        return [
        ]
      }
    },
  },
  computed: {
    eleId() {
      return `tiaoxingtu${this._uid}`
    }
  },
  watch: {
  },
  mounted() {
    this.$nextTick(() => {
      this.chart = new F2.Chart({
        id: this.eleId,
        pixelRatio: window.devicePixelRatio,
        height:60,
        width: 200
      })
      this.chart.source(this.data, {
        percent: {
          min: 0,
          formatter: function formatter(val) {
            return (val * 100).toFixed(0) + '%';
          }
        }
      })
      this.chart.legend(false);
      this.chart.axis(false);
      this.chart.tooltip(false);
      this.chart.coord({
        transposed: true,
      })
      this.chart.interval().position('state*percent').color('explain',["#4da9eb","#EBEBEB"]).adjust('stack').size(15);
      // this.chart.interval().position('label*value').color('type', [ '#17c295', '#4da9eb' ]).adjust({
      //   type: 'dodge',
      //   marginRatio: 1
      // }).size(12);
      this.chart.render();
    })
  },
  methods: {
  }
}
</script>
<style lang="less">
.chartBody {
  background-color: rgb(255, 255, 255);
}
</style>
