<template>
  <div class="shop-message-container">
      <a-button type="primary" @click="showDrawer">
          你好,{{$store.state.user.username || "请登录"}}
        </a-button>
        <a-drawer
          :title="`你好,${$store.state.user.username}`"
          placement="right"
          :closable="false"
          :visible="visible"
          :after-visible-change="afterVisibleChange"
          @close="onClose"
          class="drawer-box"
          v-if="$store.state.user.isLogin"
        >
          <p>商店名字：暂无</p>
          <p>商家地址：暂无</p>
          <p>商家电话：暂无</p>
          <a-button type="danger" class="cancellation" @click="handleClick">
            注销
          </a-button>
        </a-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    afterVisibleChange() {
    //   console.log('visible', val);
    },
    showDrawer() {
      if (this.$store.state.user.isLogin) {
        this.visible = true;
      } else {
        this.$router.push({
          name: 'Sign',
        });
      }
    },
    onClose() {
      this.visible = false;
    },
    handleClick() {
      this.$store.commit('user/cancellationUser');
      this.$router.push({
        name: 'Sign',
      });
    },
  },
};
</script>

<style scoped lang="less">
.cancellation{
  position: absolute;
  bottom: 15px;
  right: 20px;
}
</style>
