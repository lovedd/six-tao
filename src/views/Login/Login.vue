<template>
  <div class="login">
    <div class="logo">
      <h1>weleome to six-tao</h1>
    </div>
    <form action="">
      <div class="item">
        <label for="userName">账号：</label>
        <input type="text" placeholder="Username" v-model="userName" id="userName"/>
      </div>
      <div class="item">
        <label for="userPwd">密码：</label>
        <input type="userPwd" placeholder="userPwd" v-model="userPwd" id="userPwd"/>
      </div>
      <div class="item err-tip" v-show="errTip">
        <label>提示：</label>
        <span>{{errTip}}</span>
      </div>
    </form>
    <div class="btn-wraper">
      <button id="loginButton" @click="login">登录</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      userName: '',
      userPwd: '',
      errTip: ''
    }
  },
  methods: {
    login () {
      if (!this.userName || !this.userPwd) {
        this.errTip = '用户名和密码不能为空'
        return
      }
      this.errTip = ''
      let queryObj = {
        userName: this.userName,
        userPwd: this.userPwd
      }
      axios.post('/api/users/login', queryObj).then(res => {
        let data = (res && res.data) || {}
        if (data.code === '000') {
          let result = data.result || {}
          this.$store.commit('LOG_IN', {userName: result.userName})
          if (this.$route.query.redirect) {
            this.$router.push(this.$route.query.redirect)
          } else {
            this.$router.push('/')
          }
        } else {
          alert(`err:${data.msg || '系统错误'}`)
        }
      })
    }
  }
}
</script>

<style scoped>
  .login {
    font-size: 12px;
    position: fixed;
    width: 300px;
    height: 240px;
    background-color: lightcyan;
    border-radius: 10px;
    padding: 10px 20px 10px 10px;
    margin-top: -120px;
    margin-left: -150px;
    top: 50%;
    left: 50%;
  }
  .item {
    display: flex;
    align-items: center;
    margin-top: 20px
  }
  .item label {
    width: 60px;
    font-size: 1.2em;
  }
  .item input {
    flex: 1;
    height: 40px;
    line-height: 40px;
  }
  .btn-wraper {
    display: flex;
    justify-content: center;
  }
  .err-tip {
    margin-top: 5px;
    color: red;
  }
  #loginButton {
    width: 100px;
    color: #85592e;
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
    background: yellow;
    border-radius: 5px;
    border: 1px solid gray;
    font-size: 1.2em;
  }
  .logo {
    text-align: center;
  }
</style>
