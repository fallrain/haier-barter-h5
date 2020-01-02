<template>
  <li
    @click="toDetail(data)"
    class="bEvaluateProductItem"
  >
    <div
      v-if="checkMode"
      class="bEvaluateProductItem-check"
      @click="selectItem"
    >
      <i
        v-show="isChecked"
        class="iconfont icon-duihao"
      ></i>
    </div>
    <div class="bEvaluateProductItem-cnt">
      <div class="bEvaluateProductItem-cnt-person mb22">
        <span class="name mr16">{{data.userName}}</span>
        <!--<span class="mr16">先生</span>-->
        <span>
          <i class="iconfont icon-dianhua mr16"></i>
          <a :href="'tel:'+data.userPhone">{{data.userPhone}}</a>
        </span>
      </div>
      <div class="bEvaluateProductItem-cnt-price mb22">
        <span class="name">{{data.industryName}}</span>
        <span class="price">￥{{data.totalPrice}}</span>
      </div>
      <div class="bEvaluateProductItem-cnt-time">
        <i class="iconfont icon-shizhong"></i>{{data.crTime}}
      </div>
    </div>
    <!--<div class="bEvaluateProductItem-btn-par">
      &lt;!&ndash;<span class="bEvaluateProductItem-tips">{{orderStatusFilter(data)}}</span>&ndash;&gt;
      &lt;!&ndash;<button
        type="button"
        class="common-btn-primary"
      >促成交
      </button>&ndash;&gt;
    </div>-->
  </li>
</template>

<script>
export default {
  name: 'BEvaluateProductItem',
  props: {
    // 订单数据
    data: {
      type: Object
    },
    // 选择模式
    checkMode: {
      type: Boolean,
      default: false
    },
    // 是否选中
    isChecked: {
      type: Boolean,
      default: false
    }
  },
  filters: {
    orderStatus() {

    }
  },
  methods: {
    selectItem(e) {
      /* 选中本item */
      e.stopPropagation();
      this.$emit('update:isChecked', !this.isChecked);
      this.$emit('onChecked', !this.isChecked);
    },
    toDetail(item) {
      wx.miniProgram.navigateTo({
        url: `/pages/message/valuationInfo/valuationInfo?odlfornewdbId=${item.id}`
      });
    },
    orderStatusFilter({ orderStatus, orderSource }) {
      /* 订单转状态筛选 */
      const orderStatusMap = {
        0: '未成交',
        1: '已成交'
      };
      const orderSourceMap = {
        DB: '兑呗',
        YLH: '易理货'
      };
      let name = orderStatusMap[orderStatus] || '';
      if (orderSourceMap[orderSource]) {
        name += `（${orderSourceMap[orderSource]}）`;
      }
      return name;
    }
  }
};
</script>

<style lang="scss">
  .bEvaluateProductItem {
    display: flex;
    align-items: center;
    padding-top: 32px;
    padding-bottom: 32px;
    border-bottom: 1px solid #D9D9D9;
    word-break: break-all;
  }

  .bEvaluateProductItem-cnt {
    // width: 480px;
    max-width: 100%;
    overflow: hidden;
    flex-grow: 1;
    flex-shrink: 0;
  }

  .bEvaluateProductItem-cnt-person {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    color: #333;
    font-size: 28px;
    & > .name {
      font-size: 36px;
    }

    .iconfont {
      font-size: 32px;
      color: #1969C6;
    }

    a {
      color: #333;
    }
  }

  .bEvaluateProductItem-cnt-price {
    line-height: 1;
    font-size: 28px;

    & > .name {
      color: #666;
      margin-right: 18px;
    }

    & > .price {
      color: #1969C6;
    }
  }

  .bEvaluateProductItem-cnt-time {
    line-height: 1;
    font-size: 28px;
    color: #1969C6;

    .iconfont {
      font-size: 28px;
      margin-right: 18px;
      color: #bbb;
    }
  }

  .bEvaluateProductItem-btn-par {
    margin-left: auto;
    text-align: right;
  }

  .bEvaluateProductItem-tips {
    font-size: 20px;
    color: #29AB91;
  }
</style>
