<template>
  <div id="app">
    <div id="left">
      <Main @changeWidth="handleClick" />
    </div>
    <div :class="{
      main: true,
      mainChange: collapsed
    }">
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import Main from '@/components/Main/index.vue';

export default {
  data() {
    return {
      collapsed: false,
    };
  },
  components: {
    Main,
  },
  methods: {
    handleClick(data) {
      this.collapsed = data;
    },
  },
};
</script>

<style lang="less">
   .main {
    position: absolute;
    top: 50px;
    left: 200px;
    padding: 10px 10px;
    width: 89.6%;
    height: 94.7%;
    overflow-y: auto;
    transition: left 0.3s,width 0.3s;
    &.mainChange{
      left: 80px;
      width: 95.8%;
    }
    .content {
      width: 100%;
      height: 100vh;
    }
  }

</style>
