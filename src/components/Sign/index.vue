<template>
  <div class="sign-container">
    <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout">
        <h2>欢迎登录</h2>
        <a-form-model-item has-feedback label="Email" prop="email">
            <a-input v-model="ruleForm.email" type="email" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="Password" prop="pass">
            <a-input v-model="ruleForm.password" type="password" />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <div class="btn-box">
            <a-button type="primary" @click="submitForm('ruleForm')">
            登录
            </a-button>
            <a-button style="margin-left: 10px" @click="resetForm('ruleForm')">
                重置
            </a-button>
            <!-- <RouterLink :to="{
                path: 'https://mallapi.duyiedu.com/login/#/register'
            }">
                <a-button style="margin-left: 10px">
                    注册
                </a-button>
            </RouterLink> -->
            <a href="https://mallapi.duyiedu.com/login/#/register">
              <a-button style="margin-left: 10px">
                    注册
                </a-button>
            </a>
            <!-- <RouterLink :to="{
                name: 'Retrieve'
            }">
                <a-button style="margin-left: 10px">
                    找回密码
                </a-button>
            </RouterLink> -->
        </div>
        </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import user from '@/api/user';

export default {
  data() {
    const emailReg = /^([a-zA-Z]|[0-9])(\w|-|\.)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    const checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请填写邮箱！'));
      }
      if (!emailReg.test(value)) {
        return callback(new Error('请填写正确邮箱地址！'));
      }
      return callback();
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请填写正确密码！'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    return {
      ruleForm: {
        password: '',
        email: '',
      },
      rules: {
        password: [{ validator: validatePass, trigger: 'change' }],
        email: [{ validator: checkEmail, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) { // 成功提交
          user.userLogin(this.ruleForm).then((resp) => {
            this.$store.commit('user/setMessage', resp);
            if (this.$store.state.user.isLogin) {
              this.$router.push({
                name: 'Statistics',
              });
            }
          }).catch((error) => {
            console.log(error);
          });
          return true;
        }
        return false;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};

</script>

<style scoped lang="less">
form{
    width: 100%;
    box-sizing: border-box;
    padding: 20px 0px 0px 10%;
    border-radius:10px;
    position: absolute;
    top: 40%;
    left: 45%;
    transform: translate(-50%,-50%);
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 2px 2px 5px 0px rgba(85, 84, 84, 0.8);
    h2{
        display: flex;
        margin-right: 10%;
        justify-content: center;
    }
    div{
        margin-bottom: 20px;
        height: 40px;
        line-height: 30px;
        label{
            float: left;
            width: 70px;
            height: 100%;
        }
        input{
            width: 100%;
            height: 100%;
            border: none;
            background: transparent;
            border-bottom: 2px solid #6979AA;
            padding-left: 5px;
            color: #000;
            border-radius: 0;
            outline: none;
            &.ant-input,&.ant-input:hover{
              background-color: transparent;
            }
        }
    }
    .btn-box{
        width: 350px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0px 0px 0px -60px;
    }
}
</style>
