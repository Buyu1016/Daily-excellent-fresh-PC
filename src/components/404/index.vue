<template>
  <div class="not-found-container">
      <img src="/images/404.jpg" alt="Not Found">
      <RouterLink :to="{
          name: 'Statistics'
      }"
      class="position"
      >
          <a-button>Home</a-button>
      </RouterLink>
  </div>
</template>

<script>
export default {

};
</script>

<style scoped lang="less">
.not-found-container{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    ima{
        width: 100%;
        height: 100%;
    }
    .position{
        position: absolute;
        left: 50%;
        bottom: 10%;
    }
}
</style>
