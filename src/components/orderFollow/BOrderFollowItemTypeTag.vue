<template>
  <div
    v-if="orderTypeMap"
    class="orderFollowItem-type-tag-wrap"
  >
    <div
      class="orderFollowItem-type-tag"
      :class="[orderTypeMap.className]"
    >{{orderTypeMap.name}}</div>
  </div>
</template>

<script>
import merge from 'deepmerge';

export default {
  name: 'BOrderFollowItemTypeTag',
  props: {
    // 业务场景数据
    scenarioList: {
      type: Array,
      default: () => []
    },
    /* 来源类型 */
    businessScenarios: {
      type: String
    }
  },
  data() {
    return {
      localOrderTypeMap: {
        YZZJ: {
          name: '一站筑家',
          className: 'orderFollowItem-type-tag-yzzj'
        },
        YJHX: {
          name: '以旧换新',
          className: 'orderFollowItem-type-tag-yjhx'
        },
        ADJ: {
          name: '认筹预约',
          className: 'orderFollowItem-type-tag-adj'
        },
        PT: {
          name: '拼团',
          className: 'orderFollowItem-type-tag-adj'
        },
        MS: {
          name: '秒杀',
          className: 'orderFollowItem-type-tag-adj'
        },
        HD_PLUS: {
          name: '活动PLUS',
          className: 'orderFollowItem-type-tag-adj'
        },
        SMLD: {
          name: '扫码录单',
          className: 'orderFollowItem-type-tag-smld'
        },
        SGLD: {
          name: '手动录单',
          className: 'orderFollowItem-type-tag-sgld'
        },
        RC: {
          name: '认筹',
          className: 'orderFollowItem-type-tag-rc'
        },
        YYFW: {
          name: '预约服务',
          className: 'orderFollowItem-type-tag-adj'
        },
        JKHXJ_RC: {
          name: '健康焕新',
          className: 'orderFollowItem-type-tag-yjhx'
        },
        CASARTE_QZGK: {
          name: '卡萨帝潜客',
          className: 'orderFollowItem-type-tag-ksdqk'
        }
      }
    };
  },
  watch: {
    scenarioList: {
      handler() {
        this.loadLocalOrderTypeMap();
      },
      deep: true,
      immediate: true
    }

  },
  computed: {
    orderTypeMap() {
      /* 获取订单类型名称和class */
      return this.localOrderTypeMap[this.businessScenarios];
    },
  },
  methods: {
    loadLocalOrderTypeMap() {
      const map = {};
      this.scenarioList.forEach((item) => {
        map[item.itemCode] = { name: item.itemName };
      });
      this.localOrderTypeMap = merge(this.localOrderTypeMap, map);
    }
  }
};
</script>

<style lang="scss">
  .orderFollowItem-type-tag-wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 160px;
    height: 120px;
    overflow: hidden;
    margin-right: 160px;
  }

  .orderFollowItem-type-tag {
    width: 200px;
    height: 32px;
    line-height: 32px;
    color: #fff;
    font-size: 20px;
    text-align: center;
    background: red;
    transform: rotateZ(-45deg);
    margin-top: 26px;
    margin-left: -52px;
  }

  .orderFollowItem-type-tag-yzzj {
    background: #29ab91;
  }

  .orderFollowItem-type-tag-yjhx {
    background: #4a90e2;
  }
  .orderFollowItem-type-tag-ksdqk {
    background: #4a90e2;
    font-size: 18px;
  }
  .orderFollowItem-type-tag-adj {
    background: #F05B4B;
  }

  .orderFollowItem-type-tag-smld {
    background: #4a90e2;
  }

  .orderFollowItem-type-tag-sgld {
    background: #4a90e2;
  }

  .orderFollowItem-type-tag-rc {
    background: #F5A623;
  }
</style>
