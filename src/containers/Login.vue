<template>
    <div class="login">
        <div class="login-box">
            <div class="form-item">
                <label>账号:</label>
                <input v-model="form.username" type="text" placeholder="请输入手机号">
            </div>
            <div class="form-item">
                <label>密码:</label>
                <input type="password" v-model="form.password" placeholder="请输入密码">
            </div>
            <div class="form-item">
                <button class="login-btn" type="primary" @click="doLogin('reg')">注册</button>
                <button class="login-btn" type="primary" @click="doLogin('login')">登录</button>
            </div>
        </div>
    </div>
</template>

<script>
// 引入需要文件或模块
import { API } from "./config.js";
import axios from "axios";

export default {
  name: "login",
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    //登录或注册操作
    doLogin(state) {
      //一系列验证
      if (this.form.username == "") {
        alert("请输入手机号");
        return;
      } else {
        let res = /^1\d{10}$/;
        if (res.test(this.form.username)) {
        } else {
          alert("手机号格式错误！");
          return;
        }
      }
      if (this.form.password == "") {
        alert("请输入密码");
        return;
      }

      //根据state进行登录或者注册请求，以及各种返回提示
      let url = `${API}/${state}`;
      if (state == "login") {
        axios
          .get(url, { params: { ...this.form } })
          .then(res => {
            if (res.data.code == "success") {
              alert("登录成功");
            } else if (res.data.code == "fail") {
              alert("用户名或密码不正确");
            }
          })
          .catch(err => {
            alert("登录失败");
          });
      } else if (state == "reg") {
        axios
          .post(url, { ...this.form })
          .then(res => {
            if (res.data.code == "success") {
              alert("注册成功");
            } else if (res.data.code == "fail") {
              alert("用户已存在");
            }
          })
          .catch(err => {
            alert("注册失败");
          });
      }
    }
  }
};
</script>

<style scoped lang="less">
body {
  height: 100%;
  width: 100%;
}
.login {
  display: flex;
  width: 100%;
  height: 100%;
  background:url(http://img3.imgtn.bdimg.com/it/u=3511934672,1023621695&fm=26&gp=0.jpg);
  background-size:100% 100%; 
  text-align: center;
  justify-content: center;
  .login-box {
    width: 300px;
    height: 150px;
    padding: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -75px;
    margin-left: -150px;
    .form-item {
        margin-bottom:10px;
      label {
        font-family: "楷体";
        font-size: 20px
      }
      input {
        border-radius: 3px;
        width: 200px;
        height: 30px;
      }
      button {
          font-size: 18px;
          background-color:palevioletred;
          border:none;
          border-radius: 3px;
      }
    }
  }
}
</style>

