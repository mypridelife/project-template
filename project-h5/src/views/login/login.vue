<template>
  <div class="page">
    <group>
      <x-input
        v-model="form.phone"
        title="手机号"
        is-type="china-mobile"
        mask="999 9999 9999"
        type="number"/>
      <x-input
        v-model="form.msg"
        title="发送验证码"
        class="weui-vcode"
        type="number">
        <x-button slot="right" type="primary" mini @click.native="handleMsg">发送验证码</x-button>
      </x-input>
    </group>
    <br>
    <x-button type="primary" @click.native="handleLogin">登录</x-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        phone: '',
        msg: ''
      }
    }
  },
  methods: {
    handleMsg() {

    },
    handleLogin() {
      if (this.form.msg === '1111') {
        this.$router.push('/userInfo')
      }
    }
  }
}
</script>

<style scoped>
</style>
