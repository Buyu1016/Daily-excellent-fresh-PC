<template>
  <div class="list-container">
      <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout">
        <a-form-model-item has-feedback label="类目序列" prop="id">
          <a-input v-model.number="ruleForm.id"/>
        </a-form-model-item>
        <a-form-model-item has-feedback label="主类目名称" prop="name">
          <a-input v-model="ruleForm.name"/>
        </a-form-model-item>
        <a-form-model-item has-feedback label="子类目">
          <a-select
                    mode="tags"
                    style="width: 100%"
                    placeholder="标签"
                    @change="handleChange">
          </a-select>
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="submitForm('ruleForm')">
            提交
          </a-button>
          <a-button style="margin-left: 10px" @click="resetForm('ruleForm')">
            重置
          </a-button>
        </a-form-model-item>
      </a-form-model>
  </div>
</template>

<script>
import category from '@/api/category';

export default {
  data() {
    const checkNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入内容'));
      } if (typeof value !== 'number') {
        return callback(new Error('输入内容应为数字'));
      }
      return callback();
    };
    const checkText = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入内容'));
      }
      return callback();
    };
    return {
      ruleForm: {
        id: '',
        name: '',
      },
      rules: {
        id: [{ validator: checkNumber, trigger: 'change' }],
        name: [{ validator: checkText, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
      c_items: [],
    };
  },
  methods: {
    async submitForm() {
      if (this.ruleForm.id && this.ruleForm.name) {
        const submitMessage = {
          appkey: this.$store.state.user.appkey,
          id: this.ruleForm.id,
          name: this.ruleForm.name,
          c_items: this.c_items,
        };
        console.log(submitMessage);
        await category.getCategoryAdd(submitMessage).then((resp) => {
          console.log(resp);
          this.$message.success('新添成功');
        }).catch((err) => {
          this.$message.success(`新添失败，原因--${err}--`);
        });
        await this.$store.dispatch('shopMessage/setStateShopTypeAll', {
          appkey: this.$store.state.user.appkey,
        });
        this.$router.push({
          name: 'CategoryList',
        });
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleChange(value) {
      this.c_items = value;
    },
  },
};
</script>

<style scoped lang="less">
.list-container{
  width: 100%;
  height: 100%;
}
</style>
