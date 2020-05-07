const HouseServiceEntry = () => import('@/views/houseservice/HouseServiceEntry');// 入户服务
const ChooseUser = () => import('@/views/houseservice/ChooseUser');// 选择入户服务人员
const AddServiceUser = () => import('@/views/houseservice/AddServiceUser');// 新建入户服务
const CheckPlan = () => import('@/views/houseservice/CheckPlan');// 查看入户服务订单
const ChooseAddress = () => import('@/views/houseservice/ChooseAddress');// 请求入户入地址信息
const CompleteUserInfor = () => import('@/views/houseservice/CompleteUserInfor');// 完善入户服务资料
const SearchProduct = () => import('@/views/houseservice/SearchProduct');// 产品查询
const CompleteFamilyInfor = () => import('@/views/houseservice/CompleteFamilyInfor');// 完善用户小区住宅信息
const CompleteServiceStory = () => import('@/views/houseservice/CompleteServiceStory');// 完善入户服务故事
const AddNewProduct = () => import('@/views/houseservice/AddNewProduct');// 新增家电信息
const SearchAccompanying = () => import('@/views/houseservice/SearchAccompanying');// 搜索随行参与人
const ServiceEvaluate = () => import('@/views/houseservice/ServiceEvaluate');// 评价页面
const HouseStoreDetailEntry = () => import('@/views/houseservice/HouseStoreDetailEntry');//入戶故事詳情
const HouseServiceDetail = () => import('@/views/houseservice/HouseServiceDetail');//入戶詳情

const prefix = '/houseservice';
const module = 'Houseservice';
const data = [
  {
    path: `${prefix}/houseServiceEntry`,
    name: `${module}.HouseServiceEntry`,
    component: HouseServiceEntry,
    meta: {
      title: '入户服务首页',
    }
  },
  {
    path: `${prefix}/chooseUser`,
    name: `${module}.ChooseUser`,
    component: ChooseUser,
    meta: {
      title: '入户服务选择用户',
    }
  },
  {
    path: `${prefix}/addServiceUser/`,
    name: `${module}.AddServiceUser`,
    component: AddServiceUser,
    meta: {
      title: '创建新用户入户',
    }
  },
  {
    path: `${prefix}/checkPlan`,
    name: `${module}.CheckPlan`,
    component: CheckPlan,
    meta: {
      title: '查看入户服务订单',
    }
  },
  {
    path: `${prefix}/completeUserInfor`,
    name: `${module}.CompleteUserInfor`,
    component: CompleteUserInfor,
    meta: {
      title: '完善入户服务资料',
    }
  },
  {
    path: `${prefix}/searchProduct`,
    name: `${module}.SearchProduct`,
    component: SearchProduct,
    meta: {
      title: '产品列表查询',
    }
  },
  {
    path: `${prefix}/searchAccompanying`,
    name: `${module}.SearchAccompanying`,
    component: SearchAccompanying,
    meta: {
      title: '搜索同行参与人',
    }
  },
  {
    path: `${prefix}/chooseAddress`,
    name: `${module}.ChooseAddress`,
    component: ChooseAddress,
    meta: {
      title: '请求入户入地址信息',
    }
  },
  {
    path: `${prefix}/completeFamilyInfor`,
    name: `${module}.CompleteFamilyInfor`,
    component: CompleteFamilyInfor,
    meta: {
      title: '完善用户小区住宅信息',
    }
  },
  {
    path: `${prefix}/addNewProduct`,
    name: `${module}.AddNewProduct`,
    component: AddNewProduct,
    meta: {
      title: '新增家电产品',
    }
  },
  {
    path: `${prefix}/completeServiceStory`,
    name: `${module}.CompleteServiceStory`,
    component: CompleteServiceStory,
    meta: {
      title: '完善入户服务故事',
    }
  },
  {
    path: `${prefix}/serviceEvaluate`,
    name: `${module}.ServiceEvaluate`,
    component: ServiceEvaluate,
    meta: {
      title: '评价页面',
    }
  },
  {
    path: `${prefix}/houseStoreDetailEntry`,
    name: `${module}.HouseStoreDetailEntry`,
    component: HouseStoreDetailEntry,
    meta: {
      title: '入戶故事詳情页面',
    }
  },
  {
    path: `${prefix}/houseServiceDetail`,
    name: `${module}.HouseServiceDetail`,
    component: HouseServiceDetail,
    meta: {
      title: '入戶詳情页面',
    }
  },
];

export default data;
