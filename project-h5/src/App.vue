<template>
  <div id="app">
    <div>
      <van-nav-bar title="标题" style="background-color: #35495E" fixed>
        <van-icon slot="left" color="#fff" name="wap-nav" size=" 1.3em" @click="handleVisible" />
      </van-nav-bar>
      <van-popup v-model="show" :overlay="true" position="left" style="width:50%;height:100%">
        <div>
          <van-cell-group style="position:static">
            <van-cell title="菜单" style="background-color: #35495E;color:#fff" />
          </van-cell-group>
        </div>
      </van-popup>
    </div>

    <div id="body-wrapper">
      <router-view v-if="isRouterAlive" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      show: false,
      isRouterAlive: true
    }
  },
  mounted() {
  },
  methods: {
    handleVisible() {
      this.show = !this.show
    },
    reload() {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    }
  }
}
</script>
<style lang="less">
#body-wrapper {
  margin: 1em;
  margin-top: 70px;
}
.van-nav-bar__title {
  font-weight: bold;
  font-size: 1em;
  color: #fff;
}
</style>

