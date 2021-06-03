<template>
  <div class="list-container">
      <div class="search">
        搜索商品：
        <div class="shopType">
          <a-select style="width: 100%" :default-value="0" @change="handleChange">
            <a-select-option :value="0">
              全部类目
            </a-select-option>
            <a-select-option v-for="item in typeTotals.data" :key="item.id" :value="item.id">
              {{item.name}}
            </a-select-option>
          </a-select>
        </div>
        <div class="shopName">
          <a-input-search
            placeholder="商品关键字"
            enter-button="搜索"
            @search="searchName"
          />
        </div>
        <RouterLink class="addShops" :to="{
          name: 'Add'
        }">
          <a-button>新增商品</a-button>
        </RouterLink>
      </div>
      <div class="shopList">
        <ShopList :data="data" />
      </div>
  </div>
</template>

<script>
import ShopList from '@/components/ShopList/index.vue';

export default {
  components: {
    ShopList,
  },
  data() {
    return {
      // input搜索框内容
      inputContent: '',
      // 当前位于哪个类目
      thisType: 0,
    };
  },
  computed: {
    data() {
      return this.$store.state.shopMessage.data;
    },
    typeTotals() {
      return this.$store.state.shopMessage.shopTypeAll;
    },
  },
  created() {
    this.getData();
  },
  methods: {
    searchName(value) {
      // 传递进来的为input内容
      this.inputContent = value;
      console.log(this.thisType, this.inputContent);
    },
    handleChange(value) {
      // 传递进来的为当前选中类别的id值
      this.thisType = value;
    },
    getData() {
      this.$store.dispatch('shopMessage/setStateData', { appkey: this.$store.state.user.appkey });
    },
  },
};
</script>

<style scoped lang="less">
@height: 40px;
.list-container{
  box-sizing: border-box;
  padding: 0px 10px;
  .search{
    width: 100%;
    height: @height;
    line-height: @height;
    font-size: 14px;
    display: flex;
    align-items: center;
    .addShops{
      display: inline-block;
    }
    .shopType,.shopName{
      display: inline-block;
      margin-right: 20px;
    }
    .shopName{
      display: flex;
      align-items: center;
    }
  }
  .shopList{
    width: 100%;
    height: calc(100% - @height);
    padding: 0 0 10px 0;
  }
}
</style>
