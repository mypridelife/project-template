<template>
  <div id="app">
    <div v-if="titleChange" >
      <van-nav-bar :title="$store.state.board.boardTitle" style="background-color: #35495E" fixed>
        <van-icon slot="left" name="wap-nav" color="#fff" size=" 1.3em" @click="handleVisible" />
        <van-icon slot="right" color="#fff" @click="allScreen">全屏</van-icon>
      </van-nav-bar>
      <van-popup v-model="show" :overlay="true" position="left" style="width:50%;height:100%">
        <div>
          <van-cell-group style="position:static">
            <van-cell :value="userName" title="最近访问" style="background-color: #35495E;color:#fff" />
          </van-cell-group>
        </div>
        <div>
          <van-cell-group v-for="(item,index) in zuijinArr" :key="index">
            <van-cell :value="item.title" @click="handleHistory(item.url)" />
          </van-cell-group>
        </div>
      </van-popup>
    </div>

    <div v-if="!titleChange" style="z-index: 9999;  position: fixed; right: 0px; top: 50px;">
      <van-button type="default" style="border-radius: 50px;background-color: #f0f0f0" @click="backAll">退出</van-button>
    </div>
    <div id="routerBody" :style="titleChange?'':'margin-top:0px;'">

      <router-view v-if="isRouterAlive" />

    </div>
  </div>
</template>

<script>
import { getZuijin } from '@/utils/often'
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      zuijinArr: [],
      show: false,
      isRouterAlive: true,
      //   boardName: this.$store.state.board.boardName,
      titleChange: true,
      userName: window.localStorage.getItem('userName')
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.handleArr()
    })
  },

  methods: {
    backAll() {
      this.titleChange = true
    //       var elem=document;
    // if(elem.webkitCancelFullScreen){
    //     elem.webkitCancelFullScreen();
    // }else if(elem.mozCancelFullScreen){
    //     elem.mozCancelFullScreen();
    // }else if(elem.cancelFullScreen){
    //     elem.cancelFullScreen();
    // }else if(elem.exitFullscreen){
    //     elem.exitFullscreen();
    // }else{

    // }
    },
    allScreen() {
      this.titleChange = false
      // var docE = document.documentElement;
      // if (docE.requestFullScreen) {
      //     docE.requestFullScreen();
      // } else if (docE.mozRequestFullScreen) {
      //     docE.mozRequestFullScreen();
      // } else if (docE.webkitRequestFullScreen) {
      //     docE.webkitRequestFullScreen();
      // }
      // var iw = window.innerWidth;
      //   if(iw != innerWidthTmp){
      //       if(iw>window.innerHeight)orientation = 90;
      //       else orientation = 0;
      //       //调用转屏事件
      //       screenOrientationEvent();
      //       innerWidthTmp = iw;
      //   }
    },
    handleArr() {
      this.zuijinArr = getZuijin()
    },
    handleBack() {
      this.$router.go(-1)
    },
    reload() {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    },
    reload2() {
      console.log('==')

      this.titleChange = false
      this.$nextTick(() => {
        this.titleChange = true
      })
    },
    handleVisible() {
      console.log(getZuijin())
      this.handleArr()
      if (this.show) {
        this.show = false
      } else {
        this.show = true
      }
    },
    handleHistory(val) {
      console.log(val)
      this.$router.replace({
        path: val
      })
      this.show = false
      //   this.reload()
      //   this.reload2()
    //   this.boardName = this.$store.state.board.boardName
    }

  }
}
</script>
<style lang="less">
#routerBody {
  margin: 1em;
  margin-top: 70px;
}
.van-nav-bar__title {
  font-weight: bold;
  font-size: 1em;
  color: #fff;
}

</style>

