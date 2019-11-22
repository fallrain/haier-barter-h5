<template>
  <div>
    <ol
      class="bCheckbox-list"
      v-for="(item,index) in data"
      :key="index"
    >
      <li
        class="bCheckbox-item"
        @click="giftShowClick(item)"
      >
        <div class="bCheckbox-item-detail-cnt">
          <p class="bActivityList-activity-name">
            {{item.rightName}}
          </p>
        </div>
        <span class="bActivityList-activity-state state-class-8" v-show="item.receivingStatus === -1">已删除</span>
        <span class="bActivityList-activity-state state-class-1" v-show="item.receivingStatus === 1">在途</span>
        <span class="bActivityList-activity-state state-class-2" v-show="item.receivingStatus === 2">已激活</span>
        <span class="bActivityList-activity-state state-class-3" v-show="item.receivingStatus === 3">已领取 </span>
        <span class="bActivityList-activity-state state-class-4" v-show="item.receivingStatus === 4">已过期</span>
        <span class="bActivityList-activity-state state-class-5" v-show="item.receivingStatus === 5">缺货</span>
        <span class="bActivityList-activity-state state-class-6" v-show="item.receivingStatus === 6">已发送</span>
        <span class="bActivityList-activity-state state-class-7" v-show="item.receivingStatus === 7">48小时之后激活</span>
        <i class="iconfont icon-xialaactive-copy gift-line" v-show="item.giftShow"></i>
        <i class="iconfont icon-jiantou9 gift-line" v-show="!item.giftShow"></i>
      </li>
      <!--v-show="item.giftShow"-->
      <div class="gift-class" v-show="item.giftShow">
        <p>购机权益：{{item.rightInfo}}</p>
        <p>礼品有效兑换期：{{item.startTime}}至{{item.endTime}}</p>
        <p v-show="item.giftType === 'jfmall'">礼品类型：海贝积分</p>
        <p v-show="item.giftType === 'casarte'">礼品类型：卡萨帝积分</p>
        <p v-show="item.giftType === 'entity'">礼品类型：实物礼品</p>
        <p v-show="item.giftType === 'virtual'">礼品类型：尊享卡</p>
      </div>
    </ol>
  </div>
</template>
<script>
export default {
  name: 'BActivityList',
  props: {
    // 是否详情模式
    isDetail: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => []
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  methods: {
    checkboxClick(index) {
      const i = this.value.findIndex(v => index === v);
      if (i === -1) {
        this.value.push(index);
      } else {
        this.value.splice(i, 1);
      }
      this.$emit('input', this.value);
    },
    chooseGiftClick(item) {
      this.$emit('chooseGift', item);
    },
    giftShowClick(item) {
      this.$set(item, 'giftShow', !item.giftShow);
    }
  }
};
</script>
<style lang="scss">
  .bCheckbox-icon {
    font-size: 40px;
    color: #479FE3;
    margin-right: 25px;

    &.icon-duoxuankuang {
      color: #D0D0D0;
    }
  }

  .bActivityList-activity-name {
    font-size: 28px;
    line-height: 1;
    color: #333;
    margin-top: 5px;
    margin-bottom: 5px;
    width: 500px;
    word-break: break-all;
  }

  .bCheckbox-list {
  }

  .bCheckbox-item {
    position: relative;
    display: flex;
    align-items: center;
    min-height: 80px;
    max-height: 160px;
    overflow: hidden;
    border-bottom: 1px dashed #D0D0D0;
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: white;
  }


  .bActivityList-activity-num-par {
    margin-left: auto;
    font-size: 24px;
    color: #666;
    margin-right: 30px;
  }

  .bCheckbox-item-detail-cnt {
    max-height: 140px;
    overflow: auto;
    border-left: 6px solid #1969C6;
    padding-left: 25px;
  }

  .gift-class {
    background-color: #F8F8F8;
    height: 170px;
    color: #999999;
    font-size: 26px;
    padding: 24px;
  }

  .gift-line {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 30px;
    font-size: 22px;
  }

  .bActivityList-activity-state {
    position: absolute;
    top: 50%;
    right: 66px;
    transform: translateY(-50%);
    padding: 8px;
    font-size: 18px;
    border-radius: 4px;
    color: #fff;
  }

  .state-class-1 {
    background-color: #F4A528;
  }

  .state-class-2 {
    background-color: #27AA91;
  }

  .state-class-3 {
    background-color: #4B90E0;
  }

  .state-class-4 {
    background-color: #BBBBBB;
  }

  .state-class-5 {
    background-color: #EF5A4B;
  }

  .state-class-6 {
    background-color: #1D69C4;
  }

  .state-class-7 {
    background-color: #666666;
  }

  .state-class-8 {
    background-color: #FF001F;
  }


</style>
