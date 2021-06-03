<template>
  <div class="current-level-container">
      <a-breadcrumb>
        <a-breadcrumb-item class="href-box">
          当前位于 <a-icon type="arrow-right" /><span> {{title}}</span>
        </a-breadcrumb-item>
      </a-breadcrumb>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped lang="less">
.current-level-container{
  .href-box{
    cursor: default;
    span{
      cursor: pointer;
    }
  }
}
</style>
