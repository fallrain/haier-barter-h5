import Nav from '@/views/Nav';
import orderRoutes from '@/router/order';
import salesRoutes from '@/router/sales';
import reportInstallRoutes from '@/router/reportInstall';
import activityRoutes from '@/router/activity';
import evaluateProductRoutes from '@/router/evaluateProduct';

const data = [
  ...orderRoutes,
  ...salesRoutes,
  ...reportInstallRoutes,
  ...activityRoutes,
  ...reportInstallRoutes,
  ...evaluateProductRoutes
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
