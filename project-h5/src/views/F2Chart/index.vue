<template>
  <div class="page">
    <Zhe :data-source="dataZhe" style="text-align:center" />
    <bing-tu :data="data" style="text-align:center" />
    <tiao-xing :data="data" style="text-align:center" />
    <!-- <div style="text-align:center;background-color:#fff">
      <v-chart :data="data" :width="330" :height="260">
        <v-tooltip disabled />
        <v-pie :radius="0.85" series-field="name" />
        <v-legend :options="legendOptions" />
      </v-chart>
    </div> -->

  </div>
</template>

<script>
import Zhe from '@/components/zhexiantu'
import tiaoxingtu from '@/components/tiaoxingtu'
import BingTu from '@/components/bingtu'

export default {
  components: {
    Zhe,
    BingTu,
    tiaoxingtu
  },
  data() {
    return {
      title: '标题',
      Zhuwidth: 300,
      Zhuheight: 260,
      //   dataVux: [
      //     { date: '2017-07-20', value: 83 },
      //     { date: '2017-07-21', value: 111 },
      //     { date: '2017-07-22', value: 57 },
      //     { date: '2017-07-23', value: 100 }
      //   ],
      dataZhe: [
        { data: 'Sports', value: 275 },
        { data: 'Strategy', value: 115 },
        { data: 'Action', value: 150 }
      ],
      //   legendOptions: {
      //     position: 'right',
      //     itemFormatter(val) {
      //       return val + '  ' + map[val]
      //     }
      //   },
      //   yOptions: {
      //     formatter(val) {
      //       return val * 100 + '%'
      //     }
      //   },
      data: [
        {
          name: '芳华',
          percent: 0.4,
          a: '1'
        }, {
          name: '妖猫传',
          percent: 0.2,
          a: '1'
        }, {
          name: '机器之血',
          percent: 0.18,
          a: '1'
        }, {
          name: '心理罪',
          percent: 0.15,
          a: '1'
        }, {
          name: '寻梦环游记',
          percent: 0.05,
          a: '1'
        }, {
          name: '其他',
          percent: 0.02,
          a: '1'
        }
      ]

    //   data: [{
    //     const: 'const',
    //     type: '交通出行',
    //     money: 51.39
    //   }, {
    //     const: 'const',
    //     type: '饮食',
    //     money: 356.68
    //   }, {
    //     const: 'const',
    //     type: '生活日用',
    //     money: 20.00
    //   }, {
    //     const: 'const',
    //     type: '住房缴费',
    //     money: 116.53
    //   }]

    }
  },
  mounted() {
  }
}
</script>

<style scoped lang="less">
</style>
