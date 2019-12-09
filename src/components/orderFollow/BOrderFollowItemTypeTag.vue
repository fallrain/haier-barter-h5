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
export default {
  name: 'BOrderFollowItemTypeTag',
  props: {
    /* 来源类型 */
    businessScenarios: {
      type: String
    }
  },
  computed: {
    orderTypeMap() {
      /* 获取订单类型名称和class */
      return {
        YZZJ: {
          name: '一站筑家',
          className: 'orderFollowItem-type-tag-yzzj'
        },
        YJHX: {
          name: '以旧换新',
          className: 'orderFollowItem-type-tag-yjhx'
        },
        ADJ: {
          name: '爱获客',
          className: 'orderFollowItem-type-tag-adj'
        },
        SMLD: {
          name: '扫码录单',
          className: 'orderFollowItem-type-tag-smld'
        },
        SGLD: {
          name: '手工录单',
          className: 'orderFollowItem-type-tag-sgld'
        },
        RC: {
          name: '认筹',
          className: 'orderFollowItem-type-tag-rc'
        },
        YYFW: {
          name: '预约服务',
          className: 'orderFollowItem-type-tag-adj'
        }
      }[this.businessScenarios];
    },
  },
  methods: {
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
    height: 40px;
    line-height: 40px;
    color: #fff;
    font-size: 24px;
    text-align: center;
    background: red;
    transform: rotateZ(-40deg);
    margin-top: 26px;
    margin-left: -46px;
  }

  .orderFollowItem-type-tag-yzzj {
    background: #29ab91;
  }

  .orderFollowItem-type-tag-yjhx {
    background: #4a90e2;
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
