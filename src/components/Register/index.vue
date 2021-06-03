<template>
  <div class="register-container">
      <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout">
        <h2>欢迎注册</h2>
        <a-form-model-item has-feedback label="UserName" prop="username">
            <a-input v-model="ruleForm.username" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="Email" prop="email">
            <a-input v-model="ruleForm.email" type="email" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="Password" prop="pass">
            <a-input v-model="ruleForm.pass" type="password" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="Confirm" prop="checkPass">
            <a-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="Age" prop="age">
            <a-input v-model.number="ruleForm.age" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="Verification" prop="code" class="code-box">
            <a-input v-model="ruleForm.code" />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="submitForm('ruleForm')">
                注册
            </a-button>
            <a-button style="margin-left: 15px" @click="resetForm('ruleForm')">
                重置
            </a-button>
            <a-button style="margin-left: 15px">
            获取验证码
            </a-button>
        </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
export default {
  data() {
    const nameReg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
    const emailReg = /^([a-zA-Z]|[0-9])(\w|-|\.)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    // 校验名字
    const validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入用户名'));
      }
      if (!nameReg.test(value)) {
        return callback(new Error('请输入正确姓名'));
      }
      return callback();
    };
    // 校验邮箱
    const validateEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请填写邮箱！'));
      }
      if (!emailReg.test(value)) {
        return callback(new Error('请填写正确邮箱地址！'));
      }
      return callback();
    };
    // 校验验证码
    const validateCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入验证码'));
      }
      return callback();
      // 验证码需要获得服务器返回的验证码进行比较,暂时搁置
    };
    // 校验密码
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次密码不同,请重新输入'));
      } else {
        callback();
      }
    };
    const checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入年龄'));
      } if (typeof value !== 'number' || value >= 100 || value <= 0) {
        return callback(new Error('请输入正确年龄'));
      } if (value > 0 && value < 18) {
        return callback(new Error('18岁以下禁止注册'));
      }
      return callback();
    };
    return {
      ruleForm: {
        username: '',
        email: '',
        pass: '',
        checkPass: '',
        age: '',
        code: '',
      },
      rules: {
        username: [{ validator: validateName, trigger: 'change' }],
        email: [{ validator: validateEmail, trigger: 'change' }],
        pass: [{ validator: validatePass, trigger: 'change' }],
        checkPass: [{ validator: validatePass2, trigger: 'change' }],
        age: [{ validator: checkAge, trigger: 'change' }],
        code: [{ validator: validateCode, trigger: 'change' }],
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
        if (valid) {
          return alert('submit!');
        }
        console.log('error submit!!');
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
.register-container{
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
    input{
        width: 100%;
        height: 100%;
        border: none;
        background: transparent;
        border-bottom: 2px solid #6979AA;
        outline: none;
        padding-left: 5px;
        color: #000;
        border-radius: 0;
        outline: none;
        &:hover{
            background: none;
        }
    }
    .code-box{
    }
}
</style>
