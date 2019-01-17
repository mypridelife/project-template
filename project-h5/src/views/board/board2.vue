<template>
  <div class="page">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
    >
      <div>
        <div v-if="notfound">页面未找到</div>

        <div v-if="!notfound">
          <keep-alive>
            <div class="panel-class">
              <group v-model="boardInfo">
                <datetime
                  v-model="boardInfo.startDate"
                  :end-date="dateTime"
                  format="YYYY-MM-DD"
                  title="选择日期"
                  @on-confirm="timeSelected"
                />
              </group>
            </div>
          </keep-alive>
          <!-- <br>

          <van-panel class="panel-class">
            <div slot="header">
              开启自动刷新排行榜
              <van-switch
                v-model="tableIntervalOn"
                size="24px"
                @change="change"
              />
            </div>
          </van-panel> -->

          <br>

          <div
            v-for="(item,index) in cards"
            :key="index"
          >
            <van-panel
              :title="!item.displayTitle?item.title:''"
              class="panel-class"
            >
              <!-- <div :class="!item.displayTitle?'myTable':'myTable1'">
                <span>更多</span>
              </div> -->

              <van-loading
                v-if="item.cardStyle=='3'&&formLoading&&item.metrics[0].autoRefresh!='否'"
                :class="!item.displayTitle?'myTable':'myTable1'"
              />
              <div
                :class="!item.displayTitle?'myTable':'myTable1'"
                @click="formAll(item)"
              ><span>{{ item.cardStyle=='2'?'更多':(item.cardStyle=='3'&&item.metrics[0].autoRefresh!='否'?(!formLoading?'更多':''):(item.cardStyle=='2'||item.cardStyle=='3'?'更多':'')) }}</span></div>
              <!-- <div class="myTable" @click="formAll(item)"><span>{{item.cardStyle=='2'?'更多':(item.cardStyle=='3'?(!formLoading?'更多':''):'')}}</span></div> -->
              <!-- <van-cell
            id="myCell"
            :title="!item.displayTitle?item.title:''"
            :value="item.cardStyle=='2'?'更多':(item.cardStyle=='3'?'更多':'')"
            @click.native="formAll(item)"
          /> -->
              <div
                v-if="item.cardStyle=='3'"
                style="padding: 0px 10px 10px 10px;overflow-x: auto;font-size:0.8em;"
              >
                <div v-if="!(item.metrics[0].tableData==null)">
                  <x-table
                    :cell-bordered="false"
                    :content-bordered="false"
                  >
                    <thead>
                      <tr>
                        <!-- <th style="padding: 0 10px 0 10px;width:18%;background-color:#f0f0f0;font-weight: 100;">序号</th> -->
                        <th style="padding: 0 10px 0 10px;width:10%;background-color:#f0f0f0;font-weight: 100;" />
                        <th
                          v-for="(item1,index1) in item.metrics[0]['tableFields']"
                          :key="'rank1_'+index1"
                          style="padding: 0 10px 0 10px;background-color:#f0f0f0;font-weight: bold;text-align:right;"
                        >{{ item1.fieldName!=''?item1.fieldName:item1.field }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item2,index2) in item.metrics[0]['tableData']"
                        :key="'rank2_'+index2"
                        :style="index2 %2==1?'background-color:#F5F5F5':'background-color:#fff'"
                      >
                        <td style="padding: 0 10px 0 10px;width:20%;font-weight: 100;">
                          <div v-if="item.metrics[0].sortValue=='正序'">
                            {{ index2=='0'?'😄':(index2=='1'?'😊':index2=='2'?'🙂':index2+1) }}
                          </div>
                          <div v-if="item.metrics[0].sortValue=='倒序'">
                            {{ index2=='0'?'😱':(index2=='1'?'😭':index2=='2'?'😰':index2+1) }}
                          </div>
                        </td>
                        <td
                          v-for="(item1,index1) in item.metrics[0]['tableFields']"
                          :key="'rank3_'+index1"
                          style="padding: 0 10px 0 10px;width:40%;text-align:right;"
                        >
                          {{ item2[item1.field] | sub }}
                        </td>
                      <!-- <td
                        style="padding: 0 10px 0 10px;width:50%;text-align:right;"
                      >
                        {{ item2.NAME }}
                      </td>
                      <td
                        style="padding: 0 10px 0 10px;width:40%;text-align:right;"
                      >
                        {{ item2.top }}
                      </td> -->
                      </tr>
                    </tbody>
                  </x-table>
                </div>

                <div v-else style="padding-top:17px;padding-bottom:17px;text-align:center">
                  暂无数据
                </div>

              </div>

              <div v-if="item.cardStyle=='2'">
                <div v-if="!(item.metrics[0].tableData==null)">
                  <div style="padding: 0px 10px 10px 10px; overflow-x: auto;font-size:0.8em;">
                    <x-table
                      :cell-bordered="false"
                      :content-bordered="false"
                      style="padding: 0px 20px 0px 0px;"
                    >
                      <thead>
                        <tr>
                          <th
                            v-for="(item1,index1) in item.metrics[0]['tableFields']"
                            :key="index1"
                            style="padding: 0 10px 0 10px;background-color:#f0f0f0;font-weight: bold;"
                          >
                            <div style="width:140px;">{{ item1.fieldName!=''?item1.fieldName:item1.field }}</div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(item2,index2) in item.metrics[0]['tableData']"
                          :key="index2"
                          :style="index2 %2==1?'background-color:#F5F5F5':'background-color:#fff'"
                        >
                          <td
                            v-for="(item1,index1) in item.metrics[0]['tableFields']"
                            :key="index1"
                            style="padding: 0 10px 0 10px;"
                          >
                            <div style="width:140px;">{{ item2[item1.field] | sub }}</div>
                          </td>
                        </tr>
                      </tbody>
                    </x-table>
                  </div>
                </div>
                <div v-else style="padding-top:17px;padding-bottom:17px;text-align:center">暂无数据</div>

              </div>

              <div v-if="item.cardStyle=='0'">
                <div
                  v-if="item.metrics.length"
                  style="padding: 20px 20px 20px 20px;"
                >
                  <van-row
                    type="flex"
                    align="center"
                    justify="space-between"
                  >
                    <van-col
                      span="10"
                      align="left"
                    >
                      <div class="metricTitle">名称</div>
                    </van-col>
                    <van-col span="1" />
                    <van-col
                      span="6"
                      align="right"
                    >
                      <div class="metricTitle">数值</div>
                    </van-col>
                    <van-col span="1" />
                    <van-col
                      span="6"
                      align="right"
                    >
                      <div
                        class="metricTitle"
                        @click="proportions"
                      >
                        <div v-if="proportion=='周同比'">
                          周同比/<a style="font-weight: 100;font-size:0.5em;">环比</a>
                        </div>
                        <div v-if="proportion=='环比'">
                          <a style="font-weight: 100;font-size:0.5em;">周同比</a>/环比
                        </div>
                      </div>
                    </van-col>
                  </van-row>
                </div>
                <div v-else style="padding-top:17px;padding-bottom:17px">暂无数据</div>

                <div
                  v-for="(item2,index2) in item.metrics"
                  :key="index2"
                  class="panel_content"
                  @click="handleDataClick(item2)"
                >
                  <van-row
                    type="flex"
                    align="center"
                    justify="center"
                  >
                    <van-col
                      span="10"
                      align="left"
                    >
                      <span class="metricName">{{ item2.metricName }}</span>
                    </van-col>
                    <van-col span="1" />
                    <van-col
                      span="6"
                      align="right"
                    >
                      <span class="metricValue">
                        {{ item2.metricValue }}
                        <!-- <span v-if="item2.metricUnit">({{item2.metricUnit}})</span> -->
                      </span>
                    </van-col>
                    <van-col span="1" />
                    <van-col
                      v-if="proportion=='环比'"
                      :style="{color: getColor(item2.ringDiff)}"
                      span="6"
                      align="right"
                    >
                      <span class="ring">{{ item2.ringDiff }}</span>
                      <br>
                      <span class="ring">{{ item2.ringDiffPercent }}</span>
                    </van-col>
                    <!-- <van-col span="1"/> -->
                    <van-col
                      v-if="proportion=='周同比'"
                      :style="{color: getColor(item2.weekDiff)}"
                      span="6"
                      align="right"
                    >
                      <span class="ring">{{ item2.weekDiff }}</span>
                      <br>
                      <span class="ring">{{ item2.weekDiffPercent }}</span>
                    </van-col>
                  </van-row>
                </div>
              </div>

              <div
                v-if="item.cardStyle=='1'"
                style="text-align:center;background-color:#fff"
              >
                <div v-if="hasData(item.data)">
                  <bing-tu
                    :data="item.data"
                    style="text-align:center"
                  />
                  <!-- <v-chart :data="item.data" :width="330" :height="200">
                <v-tooltip disabled />
                <v-pie :radius="0.85" :inner-radius="0.7" series-field="name" />
                <v-legend :options="legendOptions(item)" />
              </v-chart>-->
                </div>
                <!-- <div v-else style="padding-top:17px;padding-bottom:17px">暂无数据</div> -->
              </div>

              <div
                v-if="item.cardStyle=='4'"
                style="background-color:#fff;padding-bottom:10px;"
              >
                <van-row
                  type="flex"
                  justify="space-between"
                  style="font-size:14px;padding-bottom:8px;"
                >
                  <van-col
                    span="18"
                    style="padding-left:4%;"
                  >
                    起止:{{ item.dateInterval }}
                  </van-col>
                  <van-col
                    span="6"
                    align="right"
                    style="padding-right:4%;"
                  >
                    剩余:<a style="color:red;">{{ item.residueDay }}</a>天
                  </van-col>
                </van-row>
                <div
                  v-for="(item1,index1) in item.metrics"
                  :key="index1"
                  style="height: 60px;"
                >
                  <div style="text-align: left;font-size:14px;padding-left:4%;width:40%;position: absolute;padding-top: 28px;">
                    {{ item1.expectVos[0].state }}:{{ item1.expectVos[0].value+"/" }}{{ item1.expectVos[1].value }}
                  </div>
                  <div style="margin-top: -20px;margin-bottom: -20px;">
                    <tiaoxing
                      :data="item1.expectVos"
                      style="text-align:right;"
                    />
                  </div>
                  <div
                    style="font-size:14px;position: absolute;z-index: 9999;margin-top: -15px;width:96%;text-align: right;"
                    @click="getMetric(item1)"
                  >
                    {{ item1.expectVos[0].percent+'%' }}
                  </div>
                </div>
              </div>
              <!-- <div v-if="item.cardStyle=='4'" style="text-align:center;background-color:#fff">
            <div v-for="(item1,index1) in item.metrics" :key="index1">
              <div style="float:left;text-align: left;font-size:10px;padding-left:5%;width:150px;" ><a class="round" style="color:#17c295;">●</a>{{item1.expectVos[0].exValue+" "+item1.expectVos[0].unit}}</div>
              <div style="float:left;font-size:10px;padding-left:6%;" ><a class="round" style="color:#4da9eb;">●</a>{{item1.expectVos[0].value+" "+item1.expectVos[0].unit}}</div>
              <jindu :data="item1.expectVos" style="text-align:center"/>
            </div>
          </div> -->
            </van-panel>
            <br>
          </div>
        </div>
      </div>
    </van-pull-refresh>

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
import tiaoxingtu from '@/components/tiaoxingtu'

import { Toast } from 'vant'

import { isVerify } from '@/api/confirm.js'
import { setZuijin, getZuijin } from '@/utils/often.js'
import {
  getBoard,
  getForms,
  getFormAll,
  getRank,
  getTables
} from '@/api/board'
import { XTable } from 'vux'

export default {
  name: 'Board',
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
    tiaoxingtu,
    XTable
  },
  inject: ['reload'],
  filters: {
    sub: function(value) {
      value = String(value)
      if (value.length > 7) {
        return value.substring(0, 7) + '...'
      } else {
        return value
      }
    }
  },
  // props: {
  //   id: {
  //     type: String,
  //     default: ''
  //   }
  // },

  // filter: {
  //   ellipsis (value) {
  //     if (!value) return ''
  //     if (value.length > 1) {
  //       return value.slice(0,1) + '...'
  //     }
  //     return value
  //   }
  // },
  data() {
    return {
      id: this.$route.params.id,
      proportion: '周同比',
      dateTime: '',
      loading: false,
      show: false,
      formShow: false,
      leaderShow: false,
      formLoading: false,
      shixiao: false,
      notfound: false,
      boardInfo: {
        startDate: this.$store.state.share.startDate,
        endDate: this.$store.state.share.endDate,
        boardId: '',
        password: ''
      },
      metricInfo: {
        startDate: '',
        endDate: '',
        metricId: ''
      },
      cards: [],
      // cards2: [],
      // $rank: [],
      // rank2: [],
      fields: {},
      lists: {},
      $board: {},
      $tableCards: [],
      isLoading: false,
      tableIntervalOn: true
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
    $route(to, from) {
      this.id = to.params.id
      this.initParam()
      this.initBoard()
    }
  },
  created() {
    this.initParam()
    this.dateToString(new Date())
  },
  mounted() {
    // 初始化最近列表，应该放到根页面
    this.$nextTick(() => {
      this.zuijinArr = getZuijin()
    })
    this.initBoard()
  },
  methods: {
    dateToString: function(date) {
      var year = date.getFullYear()
      var month = (date.getMonth() + 1).toString()
      var day = (date.getDate() - 1).toString()
      if (month.length == 1) {
        month = '0' + month
      }
      if (day.length == 1) {
        day = '0' + day
      }
      this.dateTime = year + '-' + month + '-' + day
    },
    getMetric(item) {
      // console.log(item)
      // console.log(item.metricId)
      this.metricInfo.metricId = item.metricId
      this.metricInfo.startDate = this.boardInfo.startDate
      this.metricInfo.endDate = this.boardInfo.endDate

      this.$store.dispatch('GetMetricHistory', this.metricInfo).then(() => {
        this.$router.push({
          name: 'Details'
        })
      })
    },
    proportions() {
      if (this.proportion == '环比') {
        this.proportion = '周同比'
      } else {
        this.proportion = '环比'
      }
    },
    formBack() {
      this.formShow = false
      this.leaderShow = false
    },
    formAll(item) {
      var tables = ''
      if (item.cardStyle == '2') {
        this.formShow = true
        tables = 2
      } else if (item.cardStyle == '3') {
        this.leaderShow = true
        tables = 3
      }
      console.log(item.metrics[0].metricId)
      var metricId = item.metrics[0].metricId
      localStorage.setItem('tables', tables)
      localStorage.setItem('id', this.id)
      localStorage.setItem('metricId', metricId)
      localStorage.setItem('endDate', this.boardInfo.endDate)
      this.$router.push('/tables')
      // getRank(metricId, this.boardInfo.endDate).then(response => {
      //   console.log(response.data);
      //   this.fields = response.data.fields;
      //   this.lists = response.data.list;
      // });
    },
    yestoday() {
      return new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
    },
    initParam() {
      // 初始化参数
      if (!this.$store.state.share.startDate) {
        const yst = dateFormat(this.yestoday(), 'YYYY-MM-DD')
        this.$store.state.share.startDate = yst
        this.$store.state.share.endDate = yst
      }
      this.boardInfo.startDate = this.$store.state.share.startDate
      this.boardInfo.endDate = this.$store.state.share.endDate
      this.boardInfo.boardId = this.id
    },
    initBoard() {
      Toast.loading({
        mask: true,
        message: '加载中...'
      })

      const start = this.boardInfo.startDate
      const end = this.boardInfo.endDate
      const that = this
      getBoard(
        this.boardInfo.startDate,
        this.boardInfo.endDate,
        this.boardInfo.boardId,
        this.boardInfo.password
      )
        .then(res => {
          if (res.data.success === false) {
            that.notfound = true
            Toast.clear()
            return false
          }

          that.notfound = false

          console.log(res)
          that.$board = res.data
          that.cards = that.$board.cards

          // 筛选出表格排行榜类型的card
          const tableCards = []
          for (let index = 0; index < that.$board.cards.length; index++) {
            const element = that.$board.cards[index]
            if (element.cardStyle == '2' || element.cardStyle == '3') {
              tableCards.push(element)
            }
          }
          that.$tableCards = tableCards

          that.boardInfo.startDate = start
          that.boardInfo.endDate = end
          that.$store.commit('SET_BOARDTITLE', res.data.boardName)

          // that.getForm();
          that.$nextTick(function() {
            // 浏览记录
            that.handleViewHistory()
            // 初始化表格、排行榜
            that.reloadTables()
            that.tableInterval()
          })
          that.loading = false
          Toast.clear()
        })
        .catch(error => {
          console.log(error)

          that.loading = false
          Toast.clear()
        })
    },
    reloadTables() {
      this.formLoading = true
      if (this.$tableCards.length == 0) return
      const mids = this.$tableCards.map(function(item) {
        return item.metrics[0]['metricId']
      })
      // //批量获取表格数据
      // getFormAll(mids, this.endDate).then(response => {
      //   console.log(response.data);

      //   //更新表格
      //   for (let index = 0; index < this.cards.length; index++) {
      //     const element = this.cards[index];
      //     if(element.cardStyle == '2' || element.cardStyle == '3'){
      //       if(response.data[element.cardId]){
      //           this.cards[index] = response.data[element.cardId]
      //       }
      //     }
      //   }
      // });

      const that = this

      this.$tableCards.forEach(function(item) {
        getFormAll(item.cardId, that.boardInfo.endDate).then(response => {
          console.log('刷新', response.data)

          // 更新表格
          for (let index = 0; index < that.cards.length; index++) {
            const element = that.cards[index]
            if (element.cardStyle == '2' || element.cardStyle == '3') {
              if (element.cardId == response.data.cardVo.cardId) {
                // that.cards[index] = response.data.cardVo
                that.cards[index]['metrics'][0]['tableFields'] =
                  response.data.cardVo['metrics'][0]['tableFields']
                that.cards[index]['metrics'][0]['tableData'] =
                  response.data.cardVo['metrics'][0]['tableData']
              }
            }
          }
          // setTimeout(function () {
          //   that.formLoading = false;
          // },5000);
          that.formLoading = false
        })
      })
    },
    refreshTable() {
      this.formLoading = true
      if (this.$tableCards.length == 0) return
      const mids = this.$tableCards.map(function(item) {
        return item.metrics[0]['metricId']
      })

      const that = this

      this.$tableCards.forEach(function(item) {
        getFormAll(item.cardId, that.boardInfo.endDate).then(response => {
          // 更新表格
          for (let index = 0; index < that.cards.length; index++) {
            const element = that.cards[index]
            if (element.cardStyle == '3' && element.metrics[0].autoRefresh != '否') {
              console.log('需要自动刷新的', element.cardId)

              if (element.cardId == response.data.cardVo.cardId) {
                // that.cards[index] = response.data.cardVo
                that.cards[index]['metrics'][0]['tableFields'] =
                  response.data.cardVo['metrics'][0]['tableFields']
                that.cards[index]['metrics'][0]['tableData'] =
                  response.data.cardVo['metrics'][0]['tableData']
              }
            }
          }
          that.formLoading = false
        })
      })
    },
    timeSelected(val) {
      console.log('timeselected', val)
      // console.log(this.$store.state.share.startDate)

      this.$store.state.share.startDate = val
      this.$store.state.share.endDate = val

      this.boardInfo.startDate = val
      this.boardInfo.endDate = val
      this.initBoard()
      this.reload()
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
    handleViewHistory() {
      var often = {
        id: this.id,
        url: this.$route.fullPath,
        title: this.$board.boardName,
        password: this.$board.boardName
      }
      var repeat = false
      for (var j = 0; j < this.zuijinArr.length; j++) {
        if (often.url === this.zuijinArr[j].url) {
          repeat = true
          break
        }
      }
      if (!repeat) {
        this.zuijinArr.unshift(often)
      }
      setZuijin(this.zuijinArr)
    },
    onRefresh() {
      this.initBoard()
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 1000)
    },
    tableInterval() {
      // if (this.tableIntervalOn) {
      if (window.tableInterval) {
        clearInterval(window.tableInterval)
      }
      window.tableInterval = setInterval(this.refreshTable, 5000)
    },
    change(val) {
      console.log(val)
      console.log(this.tableIntervalOn)
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
.myTable {
  font-size: 14px;
  right: 4%;
  margin-top: -30px;
  float: right;
  position: relative;
  color: #4da9eb;
}
.myTable1 {
  font-size: 14px;
  right: 4%;
  text-align: right;
  color: #4da9eb;
  line-height: 40px;
  margin-top: -20px;
  position: relative;
  background-color: #fff;
  margin-left: 4%;
}
.round {
  width: 16px;
  height: 16px;
  display: inline-block;
  text-decoration: none;
}
/* .round:hover{color:blue;text-decoration:none} */
</style>
