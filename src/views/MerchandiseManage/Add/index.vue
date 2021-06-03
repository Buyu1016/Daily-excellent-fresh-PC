<template>
  <div class="add-container">
      <a-progress :percent="percent" class="percent" />
      <div class="stage">
        <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout">
          <div class="stage-one" v-show="!progress">
            <h2>填写商品基本信息</h2>
            <a-form-model-item has-feedback label="副标题" prop="title">
              <a-input v-model="ruleForm.title" />
            </a-form-model-item>
            <a-form-model-item has-feedback label="商品描述">
              <a-input v-model="ruleForm.desction" />
            </a-form-model-item>
            <a-form-model-item has-feedback label="商品类目">
              <a-input-group compact>
              <a-select v-if="this.$store.state.shopMessage.shopTypeAll.data"
                        style="width: 100%"
                        :default-value="1"
                        @change="changeType">
                <a-select-option v-for="item in this.$store.state.shopMessage.shopTypeAll.data"
                                :key="item.id"
                                :value="item.id">
                  {{item.name}}
                </a-select-option>
              </a-select>
            </a-input-group>
            </a-form-model-item>
            <a-form-model-item has-feedback label="商品标签" prop="name">
              <a-select
                        mode="tags"
                        style="width: 100%"
                        placeholder="标签"
                        @change="handleChange"
              >
                <a-select-option value="包邮">
                  包邮
                </a-select-option>
                <a-select-option value="48小时内发货">
                  48小时内发货
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </div>
          <div class="stage-two" v-show="progress">
            <h2>填写商品销售信息</h2>
            <a-form-model-item has-feedback label="商品价格" prop="price" required>
              <a-input v-model="ruleForm.price" />
            </a-form-model-item>
            <a-form-model-item has-feedback label="商品折扣价" prop="price_off" required>
              <a-input type="text" v-model="ruleForm.price_off" />
            </a-form-model-item>
            <a-form-model-item has-feedback label="商品单位" prop="unit" required>
              <a-input v-model="ruleForm.unit" />
            </a-form-model-item>
            <a-form-model-item has-feedback label="商品状态">
              <a-select
                label-in-value
                :default-value="{ key: 1 }"
                @change="handleStatusChange"
              >
                <a-select-option :value="1">
                  上架
                </a-select-option>
                <a-select-option :value="0">
                  下架
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item has-feedback label="商品库存量" prop="inventory" required>
              <a-input v-model.number="ruleForm.inventory" />
            </a-form-model-item>
            <a-form-model-item has-feedback label="上传商品图片" required>
              <a-upload
                :action="`https://mallapi.duyiedu.com/upload/images?appkey=${$store.state.user.appkey}`"
                list-type="picture-card"
                :file-list="fileList"
                @preview="handlePreview"
                @change="handleFileChange"
                name='avatar'
              >
                <div v-if="fileList.length < 8">
                  <a-icon type="plus" />
                  <div class="ant-upload-text">
                    上传
                  </div>
                </div>
              </a-upload>
              <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                <img alt="example" style="width: 100%" :src="previewImage" />
              </a-modal>
            </a-form-model-item>
          </div>
          <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="handleClick('next')" v-if="!progress">
              下一步
            </a-button>
            <div v-if="progress">
              <a-button type="primary" @click="handleClick('back')" style="marginRight: 20px">
                上一步
              </a-button>
              <a-button type="primary" @click="submitForm('ruleForm')">
                提交
              </a-button>
            </div>
          </a-form-model-item>
        </a-form-model>
      </div>
  </div>
</template>

<script>
import shopMessage from '@/api/shopMessage';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  data() {
    const checkText = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入内容'));
      }
      return callback();
    };
    return {
      percent: 0,
      ruleForm: {
        title: '',
        desction: '',
        price: '',
        price_off: '',
        unit: '',
        inventory: '',
      },
      rules: {
        title: [{ validator: checkText, trigger: 'change' }],
        price: [{ validator: checkText, trigger: 'change' }],
        price_off: [{ validator: checkText, trigger: 'change' }],
        unit: [{ validator: checkText, trigger: 'change' }],
        inventory: [{ validator: checkText, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
      currentType: 1,
      tag: [],
      progress: false,
      status: 1,
      previewVisible: false,
      previewImage: '',
      fileList: [],
      images: [],
      banC_items: false,
      updatedLock: true,
    };
  },
  created() {
    this.$store.dispatch('shopMessage/setStateShopTypeAll', {
      appkey: this.$store.state.user.appkey,
    });
  },
  methods: {
    async submitForm() {
      if (this.images.length > 0) {
        if (this.images.indexOf(false) !== -1) {
          this.$message.error('正在上传商品图片,请等待上传后再进行提交');
          return false;
        }
      }
      if (this.ruleForm.unit
          && this.ruleForm.inventory
          && this.ruleForm.price
          && this.images.length > 0) {
        const submitShopMessage = {
          appkey: this.$store.state.user.appkey,
          title: this.ruleForm.title,
          desc: this.ruleForm.desction,
          category: this.currentType,
          tags: this.tag,
          price: this.ruleForm.price,
          price_off: this.ruleForm.price_off,
          unit: this.ruleForm.unit,
          status: this.status,
          images: this.images,
          inventory: this.ruleForm.inventory,
        };
        this.percent += 50;
        shopMessage.postShopMessage(submitShopMessage).then((resp) => {
          console.log(resp);
        }).catch((error) => {
          console.log(error);
        });
        await this.$store.dispatch('shopMessage/setStateData', {
          appkey: this.$store.state.user.appkey,
        });
        this.$router.push({ name: 'List' });
        this.$message.success('新增商品成功!');
        return true;
      }
      this.$message.error('请填写完整商品销售信息');
      return false;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    changeType(value) {
      this.currentType = value;
    },
    handleChange(value) {
      this.tag = value;
    },
    handleClick(value) {
      if (value === 'next') {
        if (this.tag.length && this.ruleForm.title) {
          this.percent += 50;
          this.progress = !this.progress;
          return;
        }
        this.$message.error('请填写完整商品基本信息');
      } else if (value === 'back') {
        this.percent -= 50;
        this.progress = !this.progress;
      }
    },
    handleStatusChange(value) {
      this.status = value.key;
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      const newFile = file;
      if (!newFile.url && !newFile.preview) {
        newFile.preview = await getBase64(newFile.originFileObj);
      }
      this.previewImage = newFile.url || newFile.preview;
      this.previewVisible = true;
    },
    handleFileChange({ fileList }) {
      this.fileList = fileList;
      const newArr = this.fileList.map((item) => {
        if (item.response) {
          if (item.response.status === 'success') {
            return item.response.data.url;
          }
        }
        return false;
      });
      this.images = newArr;
    },
  },
};
</script>

<style scoped lang="less">
.add-container{
  text-align: center;
  .percent{
    width: 80%;
  }
  .stage{
    padding-top: 50px;
    h2{
      display: inline-block;
      transform: translateX(-50%);
    }
    div{
      text-align: center;
    }
  }
}
</style>
