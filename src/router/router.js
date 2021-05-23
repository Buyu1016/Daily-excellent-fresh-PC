import Home from '@/views/MessageManage/index.vue';
import Merchandise from '@/views/MerchandiseManage/index.vue';
import Order from '@/views/OrderManage/index.vue';
import Coupon from '@/views/CouponManage/index.vue';
import Poster from '@/views/PosterManage/index.vue';
import User from '@/views/UserManage/index.vue';
import Recommend from '@/views/RecommendManage/index.vue';
import Service from '@/views/ServiceManage/index.vue';

export default [{
  name: 'Home',
  path: '/',
  component: Home,
},
{
  name: 'Merchandise',
  path: '/merchandise',
  component: Merchandise,
},
{
  name: 'Order',
  path: '/order',
  component: Order,
},
{
  name: 'Coupon',
  path: '/coupon',
  component: Coupon,
},
{
  name: 'Poster',
  path: '/poster',
  component: Poster,
},
{
  name: 'User',
  path: '/user',
  component: User,
},
{
  name: 'Recommend',
  path: '/recommend',
  component: Recommend,
},
{
  name: 'Service',
  path: '/service',
  component: Service,
},
];
