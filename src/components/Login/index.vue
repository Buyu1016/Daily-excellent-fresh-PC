<template>
  <div class="login-container">
      <div class="img">
          <div class="content">
            <p>欢迎来到每日优鲜</p>
          </div>
          <img src="/images/login.jpg" alt="">
      </div>
      <div class="login">
        <!-- <Sign /> -->
        <Router-view></Router-view>
      </div>
  </div>
</template>

<script>
export default {
};
</script>

<style scoped lang="less">
.login-container{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    .login{
        width: 30%;
        height: 100%;
        background: transparent;
        position: absolute;
        top: 0;
        right: 0;
    }
    .img{
        width: 100%;
        height: 100%;
        position: relative;
        .content{
            position: absolute;
            display: inline-block;
            top: 40%;
            left: 100px;
            font-size: 50px;
            font-weight: 100;
            color: #6979AA;
            text-shadow: 2px 2px 2px rgb(250, 255, 255);
            p{
                margin: 0;
            }
        }
        img{
            width: 100%;
            height: 100%;
        }
    }
}
</style>
