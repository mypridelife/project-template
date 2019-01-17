<template>
  <div style="width:100%;height:100%;font-size:0.8em;padding-top:10px; background-color: #f2f3f8;">

    <!--表格-->
    <div v-if="formShow" >
      <van-panel>
        <div style="padding: 0px 10px 10px 10px; overflow-x: auto;">
          <x-table :cell-bordered="false" :content-bordered="false" >
            <thead>
              <tr>
                <th
                  v-for="(item1,index1) in fields"
                  :key="index1"
                  style="padding: 0 10px 0 10px;background-color:#f0f0f0;font-weight: bold;"
                >
                  <div style="width:140px;">{{ item1.fieldName!=''?item1.fieldName:item1.field }}</div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item2,index2) in lists"
                :key="index2"
                :style="index2 %2==1?'background-color:#F5F5F5':'background-color:#fff'"
              >
                <td
                  v-for="(item1,index1) in fields"
                  :key="index1"
                  style="padding: 0 10px 0 10px;"
                >
                  <div style="width:140px;">{{ item2[item1.field] }}</div>
                </td>
              </tr>
            </tbody>
          </x-table>
        </div>
        <div style="padding: 0px 10px 10px 10px;">
          <van-button size="large" @click="formBack()">返回</van-button>
        </div>
      </van-panel>
    </div>

    <!--排行榜-->
    <div v-if="leaderShow">
      <van-panel>
        <div style="padding: 0px 10px 10px 10px; overflow-x: auto;">
          <x-table id="myTable" :cell-bordered="false" :content-bordered="false">
            <thead>
              <tr>
                <th style="padding: 0 10px 0 10px;width:20%;background-color:#f0f0f0;font-weight: bold;">序号</th>
                <th
                  v-for="(item1,index1) in fields"
                  :key="index1"
                  style="padding: 0 10px 0 10px;background-color:#f0f0f0;width:40%;font-weight: bold;"
                >{{ item1.fieldName!=''?item1.fieldName:item1.field }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item2,index2) in lists"
                :key="index2"
                :style="index2 %2==1?'background-color:#F5F5F5':'background-color:#fff'"
              >
                <td style="padding: 0 10px 0 10px;width:20%;">{{ index2+1 }}</td>
                <td
                  v-for="(item1,index1) in fields"
                  :key="index1"
                  style="padding: 0 10px 0 10px;width:40%;"
                >{{ item2[item1.field] }}</td>
              </tr>
            </tbody>
          </x-table>
        </div>
        <div style="padding: 0px 10px 10px 10px;">
          <van-button size="large" @click="formBack()">返回</van-button>
        </div>
      </van-panel>
    </div>
  </div>
</template>

<script>
import {
  dateFormat,
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
  Group,
  Datetime
} from 'vux'
import BingTu from '@/components/bingtu'

import { Toast } from 'vant'

import { isVerify } from '@/api/confirm.js'
import { setZuijin, getZuijin } from '@/utils/often.js'
import { getRank } from '@/api/board'
import { XTable } from 'vux'

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
    Toast,
    BingTu,
    XTable
  },
  inject: ['reload'],
  data() {
    return {
      id: localStorage.getItem('id'),
      formShow: false,
      leaderShow: false,
      fields: {},
      lists: {},
      $board: {},
      $tableCards: []
    }
  },
  created() {
    this.formAll()
  },
  mounted() {
  },
  methods: {
    formAll() {
      console.log(localStorage.getItem('tables'))
      if (localStorage.getItem('tables') == '2') {
        this.formShow = true
        this.leaderShow = false
      } else if (localStorage.getItem('tables') == '3') {
        this.leaderShow = true
        this.formShow = false
      }
      var metricId = localStorage.getItem('metricId')
      var endDate = localStorage.getItem('endDate')
      getRank(metricId, endDate).then(response => {
        console.log(response.data)
        this.fields = response.data.fields
        this.lists = response.data.list
      })
    },
    formBack() {
      this.$router.push({ name: 'Board', params: { id: this.id }})
    }
  }
}
</script>
<style scoped>
.panel-class {
  box-shadow: 3px 3px 5px #888888;
}
.panel-class >>> .van-cell__value {
  color: #4da9eb;
  text-align: right;
}
.panel_content {
  padding: 0px 20px 10px 20px;
  word-wrap: break-word;
  word-spacing: normal;
}
.metricTitle {
  font-size: 0.8em;
  font-weight: bold;
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
  font-size: 0.7em;
  font-weight: bold;
}
.weui-cell {
  padding-top: 2px;
  padding-bottom: 2px;
  font-size: 0.8em;
}
.woyebuzhidaogaiqishenmemingzi {
  background-color: #17c295;
  background-color: #f7b55e;
  background-color: #f2725e;
  background-color: #4da9eb;
}
/* #myTable >>> .vux-table th {
    font-weight: bold;
} */
</style>
