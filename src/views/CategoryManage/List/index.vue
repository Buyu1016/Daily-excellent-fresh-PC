<template>
  <div class="category-manage-container">
    <div class="add-btn">
      <RouterLink :to="{
        name: 'CategoryAdd'
      }">
         <a-button type="primary">
          新增类目
         </a-button>
      </RouterLink>
    </div>
      <a-table :columns="columns" :data-source="data">
        <span slot="items" slot-scope="items">
          <a-tag v-for="(item, index) in items" :key="index">
            {{item}}
          </a-tag>
        </span>
      </a-table>
  </div>
</template>

<script>
const columns = [
  {
    title: '类目序列',
    dataIndex: 'id',
  },
  {
    title: '类目名称',
    dataIndex: 'name',
  },
  {
    title: '子类目',
    dataIndex: 'c_items',
    slots: { title: 'items' },
    scopedSlots: { customRender: 'items' },
  },
];

export default {
  data() {
    return {
      data: [],
      columns,
    };
  },
  async created() {
    await this.$store.dispatch('shopMessage/setStateShopTypeAll', {
      appkey: this.$store.state.user.appkey,
    });
    this.data = this.$store.state.shopMessage.shopTypeAll.data.map((item, index) => ({
      key: index,
      ...item,
    }));
  },
};
</script>

<style scoped lang="less">
.category-manage-container {
  width: 100%;
  height: 100%;
  .add-btn{
    height: 40px;
    margin-left: 20px;
  }
}
</style>
