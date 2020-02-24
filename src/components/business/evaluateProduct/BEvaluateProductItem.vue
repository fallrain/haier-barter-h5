<template>
  <li @click="toDetail(data)" class="bEvaluateProductItem">
    <div v-if="checkMode" class="bEvaluateProductItem-check" @click="selectItem">
      <i v-show="isChecked" class="iconfont icon-duihao"></i>
    </div>
    <div class="bEvaluateProductItem-cnt">
      <div class="bEvaluateProductItem-cnt-person mb22">
        <span class="name mr16">{{data.userName}}</span>
        <!--<span class="mr16">先生</span>-->
        <span>
          <i class="iconfont icon-dianhua mr16"></i>
          <a :href="'tel:'+data.userPhone" @click="recordCall(data)">{{data.userPhone}}</a>
        </span>
      </div>
      <div class="bEvaluateProductItem-cnt-price mb22">
        <span class="name">{{data.industryName}}</span>
        <span class="price">￥{{data.totalPrice}}</span>
      </div>
      <div class="c-container">
        <div class="bEvaluateProductItem-cnt-time">
          <i class="iconfont icon-shizhong"></i>
          {{data.crTime}}
        </div>
        <div class="cliclMore">查看沟通记录</div>
      </div>
    </div>
    <div class="bEvaluateProductItem-btn-par">
      <span class="bEvaluateProductItem-tips">{{orderStatusFilter(data)}}</span>
      <!--<button
        type="button"
        class="common-btn-primary"
      >促成交
      </button>-->
    </div>
  </li>
</template>

<script>
export default {
  name: "BEvaluateProductItem",
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
    orderStatus() {}
  },
  methods: {
    selectItem(e) {
      /* 选中本item */
      e.stopPropagation();
      this.$emit("update:isChecked", !this.isChecked);
      this.$emit("onChecked", !this.isChecked);
    },
    toDetail(item) {
      wx.miniProgram.navigateTo({
        url: `/pages/message/valuationInfo/valuationInfo?odlfornewdbId=${item.id}`
      });
    },
    orderStatusFilter({ orderStatus }) {
      /* 订单转状态筛选 */
      const orderStatusMap = {
        0: "未成交",
        1: "已成交"
      };
      // const orderSourceMap = {
      //   DB: '兑呗',
      //   YLH: '易理货'
      // };
      const name = orderStatusMap[orderStatus] || "";
      //  if (orderSourceMap[orderSource]) {
      //   name += `（${orderSourceMap[orderSource]}）`;
      // }
      return name;
    },
    recordCall(item) {
      /* 记录以旧换新打电话 */
      const { id } = item;
      this.campaignService.recordFrequency({
        id,
        type: 1
      });
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
  border-bottom: 1px solid #d9d9d9;
  word-break: break-all;
}

.bEvaluateProductItem-cnt {
  width: 480px;
  // max-width: 100%;
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
    color: #1969c6;
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
    color: #1969c6;
  }
}
.c-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.bEvaluateProductItem-cnt-time {
  line-height: 1;
  font-size: 28px;
  color: #1969c6;

  .iconfont {
    font-size: 28px;
    margin-right: 18px;
    color: #bbb;
  }
}
.cliclMore {
  color: #1969c6;
  font-size: 28rpx;
}
.bEvaluateProductItem-btn-par {
  margin-left: auto;
  text-align: right;
}

.bEvaluateProductItem-tips {
  font-size: 20px;
  color: #29ab91;
}
</style>
