import basicService from '@/services/basic';

const util = {
  commonGet({ key, service }) {
    /* 公共获取数据字典 */
    // key：localStorage名称 service获取数据的服务名
    const localStorageKey = `common.${key}`;
    const localStorageTimeKey = `common.${key}.time`;
    const local = window.localStorage.getItem(localStorageKey);
    // 缓存超过6点之后更新
    if (local) {
      let time = window.localStorage.getItem(localStorageTimeKey);
      if (time) {
        // getTime防止ios下bug
        time *= 1;
        const curTime = new Date();
        let validTime = true;
        if (curTime.getTime() - time * 1 > 3600 * 1000 * 24 || (curTime.getHours() >= 6 && new Date(time).getHours() < 6)) {
          validTime = false;
        }
        if (validTime) {
          return Promise.resolve(JSON.parse(local));
        }
      }
    }
    return basicService[service]().then(({ code, data }) => {
      if (code === 1) {
        window.localStorage.setItem(localStorageKey, JSON.stringify(data));
        window.localStorage.setItem(localStorageTimeKey, `${new Date().getTime()}`);
      }
      return data || [];
    });
  }
};

function getBrandType() {
  /* 品牌类型 */
  return [
    {
      label: '000',
      name: '海尔'
    },
    {
      label: '051',
      name: '卡萨帝'
    },
    {
      label: '089',
      name: '统帅'
    }
  ];
}

function getGiftType() {
  /* 礼品类型 */
  return [
    {
      label: 'jfmall',
      name: '海贝积分'
    },
    {
      label: 'casarte',
      name: '卡萨帝积分'
    },
    {
      label: 'entity',
      name: '实物礼品（包含占预算的卡券）'
    },
    {
      label: 'virtual',
      name: '虚拟礼品（包括尊享卡和不占预算卡券）'
    }
  ];
}

function getGivingGiftType() {
  /* 赠送礼品类型 */
  return [
    {
      label: 'designated',
      name: '指定礼品'
    },
    {
      label: 'fixed',
      name: '固定积分'
    },
    {
      label: 'ratio',
      name: '比例积分'
    },
    {
      label: 'honorCard',
      name: '尊享卡'
    },
    {
      label: 'washerInsure',
      name: '桶脏险'
    }
  ];
}

function getIndustryGroupOptions() {
  /* 获取全部产品组 */
  return util.commonGet({
    key: 'industryGroup',
    service: 'industryGroup'
  });
}

function getIndustryList() {
  /* 获取全部产业 */
  return util.commonGet({
    key: 'industryList',
    service: 'industryList'
  });
}

function getMicroList() {
  /* 获取全部小微 */
  return util.commonGet({
    key: 'microList',
    service: 'microList'
  });
}

function getSceneTypeList() {
  /* 获取全部认筹活动 */
  return util.commonGet({
    key: 'sceneTypeList',
    service: 'sceneTypeList'
  });
}

function getRightsType() {
  /* 权益类型 */
  return [
    {
      label: 'single',
      name: '单品'
    },
    {
      label: 'sets',
      name: '套购'
    },
  ];
}

function getVirtualGiftTypeList() {
  /* 获取虚拟卡 */
  return util.commonGet({
    key: 'virtualGiftType',
    service: 'virtualGiftType'
  });
}

function getActivityOptions() {
  return util.commonGet({
    key: 'activityType',
    service: 'activityType'
  });
}

export {
  getActivityOptions,
  getBrandType,
  getGiftType,
  getGivingGiftType,
  getIndustryGroupOptions,
  getIndustryList,
  getMicroList,
  getRightsType,
  getVirtualGiftTypeList,
  getSceneTypeList
};
