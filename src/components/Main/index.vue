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
        <CurrentLevel :title="$router.currentRoute.meta.title" />
      </div>
      <div class="user-box">
        <ShopMessage />
      </div>
    </div>
    <a-menu
      :default-selected-keys="[routerUrl]"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
      class="home-list"
      :selectedKeys="[routerUrl]"
    >
        <a-menu-item key="Statistics">
            <RouterLink :to="{
              name: 'Statistics'
            }">
              <a-icon type="bar-chart" />
              <span>数据总览</span>
            </RouterLink>
        </a-menu-item>
        <a-sub-menu key="2">
            <span slot="title"><a-icon type="shop" /><span>商品管理</span></span>
            <a-menu-item key="List">
              <RouterLink :to="{
                name: 'List'
              }">
                <a-icon type="profile" />
                <span>商品列表</span>
              </RouterLink>
            </a-menu-item>
            <a-menu-item key="Add">
              <RouterLink :to="{
                name: 'Add'
              }">
                <a-icon type="plus-square" />
                <span>添加商品</span>
              </RouterLink>
            </a-menu-item>
        </a-sub-menu>
        <a-menu-item key="Order">
            <RouterLink :to="{
              name: 'Order'
            }">
                <a-icon type="profile" />
                <span>订单管理</span>
           </RouterLink>
        </a-menu-item>
      <a-menu-item key="Coupon">
          <RouterLink :to="{
              name: 'Coupon'
          }">
              <a-icon type="barcode" />
              <span>优惠券管理</span>
          </RouterLink>
      </a-menu-item>
      <a-menu-item key="Poster">
        <RouterLink :to="{
            name: 'Poster'
        }" >
            <a-icon type="notification" />
            <span>广告位管理</span>
        </RouterLink>
      </a-menu-item>
      <a-menu-item key="User">
        <RouterLink :to="{
            name: 'User'
        }">
            <a-icon type="user" />
            <span>用户管理</span>
        </RouterLink>
      </a-menu-item>
      <a-menu-item key="Recommend">
        <RouterLink :to="{
            name: 'Recommend'
        }">
            <a-icon type="shopping-cart" />
            <span>推荐商品管理</span>
        </RouterLink>
      </a-menu-item>
      <a-menu-item key="Service">
        <RouterLink :to="{
            name: 'Service'
        }">
            <a-icon type="interaction" />
            <span>售后客服管理</span>
        </RouterLink>
      </a-menu-item>
       <a-sub-menu key="9">
            <span slot="title"><a-icon type="shop" /><span>类目管理</span></span>
            <a-menu-item key="CategoryList">
              <RouterLink :to="{
                name: 'CategoryList'
              }">
                <a-icon type="profile" />
                <span>类目列表</span>
              </RouterLink>
            </a-menu-item>
            <a-menu-item key="CategoryAdd">
              <RouterLink :to="{
                name: 'CategoryAdd'
              }">
                <a-icon type="plus-square" />
                <span>添加类目</span>
              </RouterLink>
            </a-menu-item>
        </a-sub-menu>
    </a-menu>
    <div :class="{
      content: true,
      contentExpand: collapsed,
    }">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import CurrentLevel from '@/components/CurrentLevel/index.vue';
import ShopMessage from '@/components/ShopMessage/index.vue';

export default {
  components: {
    ShopMessage,
    CurrentLevel,
  },
  data() {
    return {
      collapsed: false,
      title: '商品列表',
      listArray: ['商品详情'],
    };
  },
  computed: {
    routerUrl() {
      return this.$route.name;
    },
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
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
      float: right;
      margin-right: 25px;
    }
  }
  .home-list{
    height: 100%;
  }
  .content{
    width: 89.5vw;
    height: calc(100% - 50px);
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
    margin: 50px 0 0 200px;
    transition: all 0.3s;
    overflow-y: auto;
    padding: 10px 0px 0px 0px;
    &.contentExpand{
      width: 95.7vw;
      margin-left: 80px;
    }
  }
}
</style>
