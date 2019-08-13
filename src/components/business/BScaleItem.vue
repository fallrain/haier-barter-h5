<template>
  <div class="bScaleItem">
    <div
      class="bScaleItem-head"
      :class="[isShowDetail && 'sticky']"
    >
      <span class="name">{{data.name}}</span>
      <span class="type">{{data.type}}</span>
      <div class="bScaleItem-head-right">
        <div v-if="type==='normal' || type==='success'">
          <span class="count">{{data.count}}</span>
          <i
            v-if="type==='normal'"
            class="iconfont icon-jiantou9"
            :class="[isShowDetail && 'reverse']"
            @click="showDetail(data,index)"
          ></i>
        </div>
        <div>
          <slot name="headRight"></slot>
        </div>
      </div>
    </div>
    <div
      v-show="type==='exception' || isShowDetail"
      class="bScaleItem-detail"
    >
      <ul v-if="data.detail && data.detail.length">
        <li
          class="bScaleItem-detail-item"
          v-for="(detail,index) in data.detail"
          :key="index"
        >
          <p class="bScaleItem-detail-title"><span>购买人：</span>{{detail.buyName}}</p>
          <p class="mt16"><span>购机时间：</span>{{detail.time}}</p>
          <p class="mt16"><span>录单人：</span>{{detail.orderName}}</p>
          <p
            v-if="type==='exception'"
            class="bScaleItem-detail-exception-inf mt16"
          >异常原因：{{detail.errorReason || '暂无'}}</p>
          <button
            v-if="type==='normal'"
            type="button"
            class="common-btn-primary"
            @click="barCodeClick(detail)"
          >条码申报
          </button>
          <p class="mt16" v-if="detail.tip"><span>温馨提示：</span>{{detail.tip}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BScaleItem',
  props: {
    //
    data: {
      type: Object,
      default: () => {
      }
    },
    index: {
      type: Number,
      required: true
    },
    // 类型：normal exception fail success
    type: {
      type: String,
      default: 'normal'
    }
  },
  data() {
    return {
      // 显示详情与否
      isShowDetail: false
    };
  },
  methods: {
    showDetail(item, index) {
      /* 显示详情与否 */
      this.isShowDetail = !this.isShowDetail;
      this.$emit('showDetail', {
        isShowDetail: this.isShowDetail,
        item,
        index
      });
    },
    barCodeClick(detail) {
      /* 销量申报按钮click */
      this.$emit('barCodeDeclare', detail);
    }
  }
};
</script>

<style lang="scss">
  .bScaleItem {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    border-bottom: 1px solid #EEE;
    min-height: 88px;
    padding-right: 24px;

    &:last-child {
      border: 0;
    }
  }

  .bScaleItem-head {
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 28px;
    height: 88px;

    &.sticky {
    }

    .name {
      color: #333;
    }

    .type {
      color: #999;
      margin-left: 16px;
    }
  }

  .bScaleItem-head-right {
    display: flex;
    align-items: center;
    margin-left: auto;

    .count {
      display: inline-block;
      text-align: center;
      min-width: 48px;
      height: 40px;
      line-height: 40px;
      font-size: 28px;
      border-radius: 8px;
      padding-left: 4px;
      padding-right: 4px;
      background: #1969C6;
      color: #fff;
    }

    .iconfont {
      margin-left: 16px;
      color: #BBB;

      &.reverse {
        display: inline-block;
        transform: scaleY(-1);
      }
    }
  }

  .bScaleItem-detail {
    width: 100%;
    font-size: 28px;
    color: #bbb;
    background: #FBFBFB;
    padding-left: 10px;
    padding-right: 10px;
  }

  .bScaleItem-detail-item {
    position: relative;
    padding-top: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid #eee;

    &:first-child {
      border-top: 1px solid #eee;
    }

    &:last-child {
      border-bottom: 0;
    }

    .common-btn-primary {
      position: absolute;
      bottom: 24px;
      right: 24px;
    }
  }

  .bScaleItem-detail-title {
    line-height: 40px;
    color: #666;
  }

  .bScaleItem-detail-exception-inf {
    color: #FF001F;
  }
</style>
