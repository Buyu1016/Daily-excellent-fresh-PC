<template>
  <div class="shop-list-container">
      <a-table :columns="columns" :data-source="data" :pagination="pageConfig" tableLayout="-">
        <a slot="name" slot-scope="text">{{ text }}</a>
        <span slot="category" slot-scope="category">
          <a-tag :color="category.length > 2 ? 'pink' : 'cyan' ">
            {{category}}
          </a-tag>
        </span>
        <span slot="tags" slot-scope="tags">
          <a-tag
            v-for="(type, index) in tags"
            :key="index"
            :color="type === 'loser' ? 'volcano' : type.length > 2 ? 'geekblue' : 'green'"
          >
            {{ type.toUpperCase() }}
          </a-tag>
        </span>
        <span slot="operation" slot-scope="text, operation">
          <a-button type="primary" style="marginRight:10px" @click="changeMessage(operation)">
            编辑
          </a-button>
          <a-button type="danger" @click="deleteMessage(operation)">
            删除
          </a-button>
        </span>
      </a-table>
  </div>
</template>

<script>
import shopMessage from '@/api/shopMessage';

const columns = [
  {
    // 绑定data的数据
    title: '商品序列',
    dataIndex: 'id',
  },
  {
    title: '商品标题',
    dataIndex: 'title',
  },
  {
    title: '商品描述',
    dataIndex: 'desc',
  },
  {
    title: '类目',
    dataIndex: 'categoryName',
    slots: { title: 'category' },
    scopedSlots: { customRender: 'category' },
  },
  {
    title: '预售价',
    dataIndex: 'price',
  },
  {
    title: '折扣价',
    dataIndex: 'price_off',
  },
  {
    title: '标签',
    dataIndex: 'tags',
    slots: { title: 'tags' },
    scopedSlots: { customRender: 'tags' },
  },
  {
    title: '限购量',
    dataIndex: 'inventory',
  },
  {
    title: '状态',
    dataIndex: 'status',
    customRender(text, record) {
      return record.status === 1 ? '上架' : '下架';
    },
  },
  {
    title: '操作',
    dataIndex: 'operation',
    slots: { title: 'operation' },
    scopedSlots: { customRender: 'operation' },
    align: 'center',
  },
];

export default {
  data() {
    return {
      columns,
      pageConfig: {
        showQuickJumper: true,
        hideOnSinglePage: true,
        pageSize: 15,
      },
    };
  },
  props: {
    data: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  methods: {
    changeMessage(value) {
      if (!value.id) {
        return this.$message.error('该商品无id，无法进入该商品的编辑页面');
      }
      return this.$router.push({
        name: 'Edit',
        params: {
          id: value.id,
        },
      });
    },
    deleteMessage(value) {
      const myThis = this;
      this.$confirm({
        title: `你确定要删除--${value.title}--这件商品吗?`,
        okText: '确认',
        cancelText: '取消',
        centered: true,
        onOk() {
          shopMessage.deleteShop({
            id: value.id,
            appkey: value.appkey,
          }).then(() => {
            myThis.$store.dispatch('shopMessage/setStateData', { appkey: value.appkey });
            myThis.$message.success('删除成功');
          }).catch((error) => {
            myThis.$message.error(`删除失败，请稍后再次尝试操作--错误原因：${error}--`);
          });
        },
        onCancel() {},
      });
    },
  },
};
</script>

<style lang="less">
.shop-list-container{
  width: 100%;
  height: 100%;
}
</style>
