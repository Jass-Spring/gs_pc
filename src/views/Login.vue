<template>
  <div class="login-container">
    <div class="login-form">
      <Form :model="userForm" :rules="userRule" ref="user-form">
        <input-item
          v-model="userForm.userName"
          :validate-rule="'userName'"
          :input-type="'text'"
          :place-holder="'账号'"
          :left-icon="'ios-person-outline'">
        </input-item>

        <input-item
          v-model="userForm.password"
          :validate-rule="'password'"
          :input-type="'password'"
          :place-holder="'账号'"
          :left-icon="'ios-lock-outline'">
        </input-item>

        <FormItem>
          <Button type="primary" :loading="isLogining" @click="login">
            <span v-if="!logining">登录</span>
            <span v-else>登录中...</span>
          </Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import {
  loginAPI
} from '../api/User.js'
import InputItem from '../components/InputItem.vue'

export default {
  data () {
    return {
      isLogining: false,
      userForm: {
        userName: 'chengong1',
        password: '123456789'
      },
      userRule: {
        userName: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs['user-form'].validate(async valid => {
        if (valid) {
          this.isLogining = true

          await this.$utils.sleep(1000)
          const { data: res } = await loginAPI(this.userForm)

          if (res.success) {
            console.log(res)
            sessionStorage.setItem('token', ' bearer ' + res.data.token)
            this.$router.push('/home')
          }

          this.isLogining = false
        } else {
          this.$message.error('请输入账号和密码！')
        }
      })
    }
  },
  components: {
    'input-item': InputItem
  }
}
</script>

<style lang="less" scoped>
.login-container {
  height: 100%;
  position: relative;
  background-color: #eee;

  .login-form {
    top: 50%;
    left: 50%;
    width: 400px;
    position: absolute;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 30px;
    padding-bottom: 0;
    border-radius: 4px;

    .ivu-form {
      .ivu-form-item {
        margin-bottom: 30px;
        text-align: center;
      }
    }
  }
}
</style>
