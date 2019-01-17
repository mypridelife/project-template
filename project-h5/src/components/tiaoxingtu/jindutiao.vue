<template>
  <div ref="eleid" class="chart-wrapper">
    <canvas :id="eleId" />
  </div>
</template>
<script>
const F2 = require('@antv/f2/lib/index') // 引入 F2
require('@antv/f2/lib/interaction/pie-select') // 引入饼图选中交互

var fontSize = 24 * (window.innerWidth / 375); // 字体适配不同屏幕
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
        
      })
      this.chart.source(this.data, {
         y: {
            max: 100,
            min: 0
          }
      })
      this.chart.legend(false);
      this.chart.axis(false);
      this.chart.tooltip(false);
      console.log(this.chart._attrs.data[0].y)
      this.chart.coord('polar', {
        transposed: true,
        innerRadius: 0.8,
        radius: 0.85
      });

      this.chart.guide().arc({
        start: [0, 0],
        end: [1, 99.98],
        top: false,
        style: {
          lineWidth: 20,
          stroke: '#ccc'
        }
      });
      this.chart.guide().text({
        position: ['50%', '50%'],
        content: this.chart._attrs.data[0].y+'%',
        style: {
          fontSize: fontSize,
          fill: '#1890FF'
        }
      });
      this.chart.interval().position('x*y').size(20).animate({
        appear: {
          duration: 1200,
          easing: 'cubicIn'
        }
      });
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
