import Nav from '@/views/Nav';
import orderRoutes from '@/router/order';
import salesRoutes from '@/router/sales';
import reportInstallRoutes from '@/router/reportInstall';
import activityRoutes from '@/router/activity';
import evaluateProductRoutes from '@/router/evaluateProduct';
import haierhouseRoutes from '@/router/haierhouse';
import houseServiceRoutes from '@/router/houseservice';

const data = [
  ...orderRoutes,
  ...salesRoutes,
  ...reportInstallRoutes,
  ...activityRoutes,
  ...evaluateProductRoutes,
  ...haierhouseRoutes,
  ...houseServiceRoutes
];
if (process.env.NODE_ENV !== 'production') {
  data.unshift({
    path: '/nav',
    name: 'Nav',
    component: Nav,
    meta: {
      title: '导航'
    }
  });
}
export default { data };
