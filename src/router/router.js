import Login from '@/components/Login/index.vue';
import Sign from '@/components/Sign/index.vue';
import Register from '@/components/Register/index.vue';
import Retrieve from '@/components/RetrievePassword/index.vue';
import Statistics from '@/views/StatisticsManage/index.vue';
import Merchandise from '@/views/MerchandiseManage/index.vue';
import List from '@/views/MerchandiseManage/List/index.vue';
import Add from '@/views/MerchandiseManage/Add/index.vue';
import Edit from '@/views/MerchandiseManage/Edit/index.vue';
import Order from '@/views/OrderManage/index.vue';
import Coupon from '@/views/CouponManage/index.vue';
import Poster from '@/views/PosterManage/index.vue';
import User from '@/views/UserManage/index.vue';
import Recommend from '@/views/RecommendManage/index.vue';
import Service from '@/views/ServiceManage/index.vue';
import Main from '@/components/Main/index.vue';
import CategoryList from '@/views/CategoryManage/List/index.vue';
import CategoryAdd from '@/views/CategoryManage/Add/index.vue';
import NotFound from '@/components/404/index.vue';

export default [{
  name: 'Login',
  path: '/login',
  component: Login,
  children: [
    {
      name: 'Sign',
      path: 'sign',
      component: Sign,
    },
    {
      name: 'Register',
      path: 'register',
      component: Register,
    },
    {
      name: 'Retrieve',
      path: 'retrieve',
      component: Retrieve,
    },
  ],
},
{
  name: 'Main',
  path: '/',
  component: Main,
  redirect: {
    name: 'Statistics',
  },
  children: [
    {
      name: 'Statistics',
      path: 'statistics',
      component: Statistics,
      meta: {
        title: '数据总览',
      },
    },
    {
      name: 'Merchandise',
      path: 'merchandise',
      component: Merchandise,
      redirect: {
        name: 'List',
      },
    },
    {
      name: 'List',
      path: 'merchandise/list',
      component: List,
      meta: {
        title: '商品列表',
      },
    },
    {
      name: 'Add',
      path: 'merchandise/add',
      component: Add,
      meta: {
        title: '添加商品',
      },
    },
    {
      name: 'Edit',
      path: 'merchandise/edit/:id',
      component: Edit,
      meta: {
        title: '编辑商品',
      },
    },
    {
      name: 'Order',
      path: 'order',
      component: Order,
      meta: {
        title: '订单管理',
      },
    },
    {
      name: 'Coupon',
      path: 'coupon',
      component: Coupon,
      meta: {
        title: '优惠券管理',
      },
    },
    {
      name: 'Poster',
      path: 'poster',
      component: Poster,
      meta: {
        title: '广告位管理',
      },
    },
    {
      name: 'User',
      path: 'user',
      component: User,
      meta: {
        title: '用户管理',
      },
    },
    {
      name: 'Recommend',
      path: 'recommend',
      component: Recommend,
      meta: {
        title: '推荐商品管理',
      },
    },
    {
      name: 'Service',
      path: 'service',
      component: Service,
      meta: {
        title: '售后客服管理',
      },
    },
    {
      name: 'CategoryList',
      path: 'category/list',
      component: CategoryList,
      meta: {
        title: '类目列表',
      },
    },
    {
      name: 'CategoryAdd',
      path: 'category/add',
      component: CategoryAdd,
      meta: {
        title: '新增类目',
      },
    },
  ],
},
{
  name: '404',
  path: '*',
  component: NotFound,
},
];
