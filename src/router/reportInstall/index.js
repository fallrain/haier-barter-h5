const ReportInstallList = () => import(/* webpackChunkName: "ReportInstallList" */ '@/views/reportInstall/ReportInstallList');
const ReportInstallDetail = () => import(/* webpackChunkName: "ReportInstallDetail" */ '@/views/reportInstall/ReportInstallDetail');

const prefix = '/reportInstall';
const module = 'ReportInstall';
const data = [
  {
    path: `${prefix}/reportInstallList`,
    name: `${module}.ReportInstallList`,
    component: ReportInstallList,
    meta: {
      title: '代报装列表'
    }
  },
  {
    path: `${prefix}/reportInstallDetail`,
    name: `${module}.ReportInstallDetail`,
    component: ReportInstallDetail,
    meta: {
      title: '代报装详情'
    }
  }
];

export default data;
