<template>
  <div>
    <ol class="bCheckbox-list" v-for="(item,index) in data" :key="index">
      <li
        class="bCheckbox-item"
      >
        <div class="bCheckbox-item-detail-cnt" >
          <p class="bActivityList-activity-name" @click="giftShowClick(item)">{{item.rightName}}
            <span class="state-class-1" v-show="item.receivingStatus === -1">已删除</span>
            <span class="state-class-1" v-show="item.receivingStatus === 1">在途</span>
            <span class="state-class-2" v-show="item.receivingStatus === 2">已激活</span>
            <span class="state-class-3" v-show="item.receivingStatus === 3">已领取 </span>
            <span class="state-class-4" v-show="item.receivingStatus === 4">已过期</span>
            <span class="state-class-5" v-show="item.receivingStatus === 5">缺货</span>
            <span class="state-class-6" v-show="item.receivingStatus === 6">已发送</span>
            <span class="state-class-7" v-show="item.receivingStatus === 7">48小时之后激活</span>
            <i class="iconfont icon-xialaactive-copy gift-line" v-show="item.giftShow"></i>
            <i class="iconfont icon-jiantou9 gift-line" v-show="!item.giftShow"></i>
          </p>
        </div>
      </li>
      <!--v-show="item.giftShow"-->
      <div  class="gift-class" v-show="item.giftShow">
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
    margin-bottom: 10px;
    /*width: 700px;*/
    p{
      line-height: 80px;
    }
  }

  .bCheckbox-list {
  }

  .bCheckbox-item {
    display: flex;
    align-items: center;
    height: 80px;
    border-bottom: 1px dashed #D0D0D0;
    background-color: white;
  }


  .bActivityList-activity-num-par {
    margin-left: auto;
    font-size: 24px;
    color: #666;
    margin-right: 30px;
  }

  .bCheckbox-item-detail-cnt {
    border-left: 6px solid #1969C6;
    padding-left: 25px;
    padding-top: 10px;

  }
  .gift-class{
    background-color: #F8F8F8;
    height: 170px;
    color: #999999;
    font-size: 26px;
    padding: 24px;
  }
  .gift-line{
    position: absolute;
    right: 40px;
  }
  .state-class-1{
    padding: 8px;
    background-color: #27AA91;
    color: white;
    font-size: 24px;
    border-radius: 4px;
  }
  .state-class-2{
    padding: 8px;
    background-color: #27AA91;
    color: white;
    font-size: 24px;
    border-radius: 4px;
  }
  .state-class-3{
    padding: 8px;
    background-color: #27AA91;
    color: white;
    font-size: 24px;
    border-radius: 4px;
  }
  .state-class-4{
    padding: 8px;
    background-color: #27AA91;
    color: white;
    font-size: 24px;
    border-radius: 4px;
  }
  .state-class-5{
    padding: 8px;
    background-color: #27AA91;
    color: white;
    font-size: 24px;
    border-radius: 4px;
  }
  .state-class-6{
    padding: 8px;
    background-color: #27AA91;
    color: white;
    font-size: 24px;
    border-radius: 4px;
  }
  .state-class-7{
    padding: 8px;
    background-color: #27AA91;
    color: white;
    font-size: 24px;
    border-radius: 4px;
  }


</style>
