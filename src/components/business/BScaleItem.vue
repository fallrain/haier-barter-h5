<template>
  <div class="bScaleItem">
    <div class="bScaleItem-head">
      <span class="name">{{data.name}}</span>
      <span class="type">{{data.type}}</span>
      <div class="bScaleItem-head-right">
        <span class="count">{{data.count}}</span>
        <i
          class="iconfont icon-jiantou9"
          @click="showDetail"
        ></i>
      </div>
    </div>
    <div
      v-show="isShowDetail"
      class="bScaleItem-detail"
    >
      <ul v-if="data.detail && data.detail.length">
        <li
          class="bScaleItem-detail-item"
          v-for="(detail,index) in data.detail"
          :key="index"
        >
          <p class="bScaleItem-detail-title"><span>购买人：</span>{{detail.buyName}}</p>
          <p><span>购机时间：</span>{{detail.time}}</p>
          <p><span>录单人：</span>{{detail.orderName}}</p>
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
    }
  },
  data() {
    return {
      // 显示详情与否
      isShowDetail: false
    };
  },
  methods: {
    showDetail() {
      /* 显示详情与否 */
      this.isShowDetail = !this.isShowDetail;
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
    padding-top: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid #eee;

    &:first-child {
      border-top: 1px solid #eee;
    }

    &:last-child {
      border-bottom: 0;
    }
  }

  .bScaleItem-detail-title {
    line-height: 40px;
    color: #666;
  }
</style>
