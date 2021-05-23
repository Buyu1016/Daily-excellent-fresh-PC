<template>
  <div class="home-container">
    <div :class="{
                'header-box': true,
                'narrow-box': collapsed
              }">
      <a-button
              ref="clickBtn"
              class="click-btn"
              type="primary"
              style="margin-bottom: 16px"
              @click="toggleCollapsed">
        <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
      </a-button>
      <div class="breadcrumb-div">
        <a-breadcrumb>
        <a-breadcrumb-item href="">
          <a-icon type="shop" />
          <span>商品管理</span>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          添加商品
        </a-breadcrumb-item>
      </a-breadcrumb>
      </div>
      <div class="user-box">
        <a-button type="primary" @click="showDrawer">
          你好,CodeGorgeous
        </a-button>
        <a-drawer
          title="你好,CodeGorgeous"
          placement="right"
          :closable="false"
          :visible="visible"
          :after-visible-change="afterVisibleChange"
          @close="onClose"
          class="drawer-box"
        >
          <p>商店名字：暂无</p>
          <p>商家地址：暂无</p>
          <p>商家电话：暂无</p>
          <a-button type="danger" class="cancellation">
            注销
          </a-button>
        </a-drawer>
      </div>
    </div>
    <a-menu
      :default-selected-keys="['1']"
      :default-open-keys="['sub1']"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
      class="home-list"
    >
        <a-menu-item key="1">
            <RouterLink :to="{
              name: 'Home'
            }">
              <a-icon type="bar-chart" />
              <span>数据总览</span>
            </RouterLink>
        </a-menu-item>
        <a-sub-menu key="sub1">
            <span slot="title"><a-icon type="shop" /><span>商品管理</span></span>
            <a-menu-item key="1.1">
              <a-icon type="shop" />
              <span>添加商品</span>
            </a-menu-item>
            <a-menu-item key="1.2">
            下架商品
            </a-menu-item>
            <a-menu-item key="1.3">
            编辑商品
            </a-menu-item>
        </a-sub-menu>
        <a-menu-item key="2">
           <RouterLink :to="{name: 'Order'}">
                <a-icon type="profile" />
                <span>订单管理</span>
           </RouterLink>
        </a-menu-item>
      <a-menu-item key="3">
          <RouterLink :to="{
              name: 'Coupon'
          }">
              <a-icon type="barcode" />
              <span>优惠券管理</span>
          </RouterLink>
      </a-menu-item>
      <a-menu-item key="4">
        <RouterLink :to="{
            name: 'Poster'
        }" >
            <a-icon type="notification" />
            <span>广告位管理</span>
        </RouterLink>
      </a-menu-item>
      <a-menu-item key="5">
        <RouterLink :to="{
            name: 'User'
        }">
            <a-icon type="user" />
            <span>用户管理</span>
        </RouterLink>
      </a-menu-item>
      <a-menu-item key="6">
        <RouterLink :to="{
            name: 'Recommend'
        }">
            <a-icon type="shopping-cart" />
            <span>推荐商品管理</span>
        </RouterLink>
      </a-menu-item>
      <a-menu-item key="7">
        <RouterLink :to="{
            name: 'Service'
        }">
            <a-icon type="interaction" />
            <span>售后客服管理</span>
        </RouterLink>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>

export default {
  data() {
    return {
      collapsed: false,
      visible: false,
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
      this.$emit('changeWidth', this.collapsed);
    },
    afterVisibleChange(val) {
      console.log('visible', val);
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
  },
};
</script>
<style scoped lang="less">
@import "~@/styles/var.less";
.home-container{
  width: 200px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  .header-box{
    width: 89.5vw;
    height: 50px;
    position: absolute;
    box-sizing: border-box;
    margin-left: 200px;
    padding: 5px 10px;
    transition: all 0.2s linear;
    border-bottom: 1px solid @gray;
    &.narrow-box{
      width: 95.7vw;
      margin-left: 80px;
    }
    .breadcrumb-div{
      display: inline-block;
      margin-left: 20px;
    }
    .user-box{
      display: inline-block;
      float: right;
      margin-right: 25px;
    }
  }
  .home-list{
    height: 100%;
  }
}
.cancellation{
  position: absolute;
  bottom: 15px;
  right: 20px;
}
</style>
