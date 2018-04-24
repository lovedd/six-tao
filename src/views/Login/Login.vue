<template>
  <div class="login">
    <div class="logo">
      <h1>weleome to six-tao</h1>
    </div>
    <form action="">
      <div class="item">
        <label for="userName">账号：</label>
        <input type="text" placeholder="Username" v-model="userName" id="userName" required="required"/>
      </div>
      <div class="item">
        <label for="userPwd">密码：</label>
        <input type="userPwd" placeholder="userPwd" v-model="userPwd" id="userPwd" required="required"/>
      </div>
      <div class="btn-wraper">
        <button id="loginButton" @click="login">登录</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      userName: '',
      userPwd: ''
    }
  },
  methods: {
    login () {
      if (!this.userName || !this.userPwd) {
        return
      }
      let queryObj = {
        userName: this.userName,
        userPwd: this.userPwd
      }
      axios.post('/api/users/login', queryObj).then(res => {
        let data = (res && res.data) || {}
        if (data.code === '000') {
          let result = data.result || {}
          alert(`${result.userName}, welcome to six-tao`)
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
