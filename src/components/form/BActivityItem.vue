<template>
  <div class="activity-item-bg" >
    <!--<div v-show="!hasData">-->
      <!--<p>暂无权益活动可选</p>-->
    <!--</div>-->
    <div >
    <div class="activity-gift">
      <i class="iconfont icon-liwu activity-gift-img"/>
      <span class="activity-gift-title">{{getData.rightsName}}</span>
    </div>
    <div class="activity-common-line activity-common-text activity-reason-text" v-if="getData.reason && isFinish">
      不可参与原因：{{getData.reason}}
    </div>
    <div class="activity-common-line activity-common-text">活动品牌：{{getData.rightsBrand}}</div>
    <div class="activity-common-line activity-common-text">试用范围：{{getData.rightsProductCategory}}</div>
    <div class="activity-common-line activity-common-text">
      活动日期：<span class="activity-data-text">{{getData.activityStartDate}}至{{getData.activityEndDate}}</span>
    </div>
      <div class="activity-common-line activity-item activity-common-top activity-common-border" @click="setShowConfig">
        <span class="activity-tip-text activity-count-remain">查看礼品</span>
        <span class="icon iconfont icon-jiantou9 activity-tip-img activity-count-remain"
              :class="{'activity-tip-img-transform': isShowConfig}"></span>
      </div>
    <div v-for="(item,index) in getData.configList"
         :key="index" v-show="isShowConfig">
      <div class="activity-common-line activity-common-border activity-common-top activity-item">
        <div class="activity-item">
          <span class="activity-name-icon">满</span>
          <span class="activity-common-text activity-common-left activity-common-product">{{item.giftName}}</span>
        </div>
        <span class="activity-common-text activity-common-left">共<span
          class="activity-type-text">{{item.rightsGiftTotal}}</span>份，剩余<span class="activity-count-remain">{{item.rightsGiftSurplus}}</span>份</span>
      </div>
      <div class="activity-common-line activity-item activity-item-gift">
        <span class="activity-name-icon">赠</span>
        <span class="activity-common-text activity-common-left activity-item-gift-desc">{{item.giftName}}</span>
        <!--<span class="activity-common-text activity-common-left activity-data-text activity-check-gift">查看推荐礼品</span>-->
      </div>
      <!--<div>-->
        <!--<div class="activity-recommend-gift">-->
          <!--<div class="activity-recommend-gift-pop"/>-->
          <!--<div class="activity-recommend-gift-text">111111111</div>-->
          <!--<div class="activity-recommend-gift-text">2222222</div>-->
        <!--</div>-->
      <!--</div>-->
    </div>
    <div class="activity-common-line activity-item activity-common-top activity-common-border" @click="setShowLimit">
      <span class="activity-tip-text activity-count-remain">其他限制</span>
      <span class="icon iconfont icon-jiantou9 activity-tip-img activity-count-remain"
            :class="{'activity-tip-img-transform': isShowLimit}"></span>
    </div>
    <div v-if="isShowLimit">
      <div class="activity-common-line activity-common-text" v-for="(limit,index) in getData.limitList">{{index}}{{limit.msg}}</div>
      <!--<div class="activity-common-line activity-common-text">2、奥V给弄额</div>-->
      <!--<div class="activity-common-line activity-common-text">3、奥V给弄额</div>-->
      <!--<div class="activity-common-line activity-common-text">4、奥V给弄额</div>-->
    </div>
    <img class="activity-img" v-if="isFinish && !hasData" src="../../assets/images/orderFollow-up/activity-img.png"/>
    <div class="activity-number" v-if="!isFinish">
      <span class="activity-number-minus activity-number-common" @click="minusCount" v-show="!getData.minesGray">-</span>
      <span class="activity-number-minus activity-number-common-no" v-show="getData.minesGray">-</span>

      <span class="activity-number-count">{{getData.selectedNum}}</span>
      <span class="activity-number-add activity-number-common" @click="addCount" v-show="!getData.addGray">+</span>
      <span class="activity-number-add activity-number-common-no" v-show="getData.addGray">+</span>
    </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'BActivityItem',
  data() {
    return {
      isShowLimit: false,
      isShowConfig: false
    };
  },
  props: {
    getData: {
      title: '',
      reason: '',
      brand: '',
      scope: '',
      data: '',
      data2: '',
      type: '',
      count: {
        type: Number,
        default: () => 0
      },
      product: {
        type: Array,
        default: () => [{
          name: '',
          gift: '',
          count: '',
          remain: '',
        }]
      }
    },
    isFinish: false,
    hasData: false,

  },

  methods: {
    setShowLimit() {
      this.isShowLimit = !this.isShowLimit;
      if (this.isShowLimit) {
        this.$emit('showLimit', this.getData);
      }
    },
    setShowConfig() {
      this.isShowConfig = !this.isShowConfig;
      if (this.isShowConfig) {
        this.$emit('showConfig', this.getData);
      }
    },
    minusCount() {
      this.$emit('minusCount', this.getData);
    },
    addCount() {
      this.$emit('addCount', this.getData);
    },
  },
  watch: {
    getData(newVal, oldVal) {
      this.data = newVal;
    }
  }
};
</script>

<style scoped>
  .activity-item-bg {
    position: relative;
    margin-top: 16px;
    margin-right: 24px;
    margin-left: 24px;
    background: #fff;
    padding-top: 30px;
    padding-right: 24px;
    padding-bottom: 20px;
    padding-left: 24px;
    border-radius: 15px;
    margin-bottom: 40px;
  }

  .activity-gift {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .activity-gift-img {
    font-size: 40px;
    color: #f5a623;
  }

  .activity-gift-title {
    font-size: 28px;
    color: #333;
    margin-left: 15px;
    display: block;
    word-break:normal;
    width:400px;
    white-space:pre-wrap;
    word-wrap : break-word ;
    overflow: hidden ;
  }

  .activity-common-text {
    word-break:break-all;
    width: 600px;
    font-size: 24px;
    color: #666;
  }

  .activity-common-left {
    margin-left: 20px;
  }

  .activity-common-top {
    padding-top: 16px;
  }

  .activity-common-line {
    margin-top: 16px;
    margin-left: 5px;
  }

  .activity-common-border {
    border-top: 1px solid #F5F5F5;

  }

  .activity-data-text {
    color: #1969C6;
  }

  .activity-reason-text {
    color: #FF001F;
    width: 500px;
  }

  .activity-type-text {
    color: #f5a623;
  }

  .activity-count-remain {
    color: #1969C6;
  }

  .activity-name-icon {
    width: 38px;
    height: 38px;
    border: 2px solid #F5A623;
    border-radius: 10px;
    background: #fff;
    color: #F5A623;
    font-size: 24px;
    padding-top: 2px;
    padding-right: 5px;
    padding-bottom: 2px;
    padding-left: 7px;
  }

  .activity-btn {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
  }

  .activity-img {
    position: absolute;
    width: 133px;
    height: 101px;
    right: 40px;
    top: 16px
  }

  .activity-number {
    position: absolute;
    right: 24px;
    top: 24px;
    display: flex;
  }

  .activity-number-add {
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
  }

  .activity-number-minus {
    border-bottom-left-radius: 4px;
    border-top-left-radius: 4px;
  }

  .activity-number-count {
    height: 48px;
    border-bottom: 1px solid #BBB;
    border-top: 1px solid #BBB;
    font-size: 28px;
    color: #333;
    text-align: center;
    padding-top: 2px;
    padding-left: 27px;
    padding-right: 27px;
  }

  .activity-number-common {
    width: 48px;
    height: 48px;
    border: 1px solid #BBB;
    font-size: 28px;
    color: #333;
    width: 48px;
    height: 48px;
    text-align: center;
  }
  .activity-number-common-no {
    width: 48px;
    height: 48px;
    border: 1px solid #BBB;
    font-size: 28px;
    color: #bbb;
    width: 48px;
    height: 48px;
    text-align: center;
  }

  .activity-common-product {
    width: 366px;
  }

  .activity-item {
    display: flex;
    justify-content: space-between;
  }

  .activity-item-gift {
    display: flex;
  }

  .activity-item-gift-desc {
    flex-grow: 1;
    word-break: break-all;
  }

  .activity-check-gift {
    width: 144px;
    flex-shrink: 0;
  }

  .activity-recommend-gift {
    position: relative;
    background: #F4F9FE;
    margin-top: 22px;
    padding: 26px 17px 26px 17px;
  }

  .activity-recommend-gift-pop {
    position: absolute;
    right: 65px;
    top: -26px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 16px;
    border-color: transparent transparent #F4F9FE transparent;
  }

  .activity-recommend-gift-text {
    font-size: 24px;
    color: #999;
  }

  .activity-tip-text {
    font-size: 28px;
  }

  .activity-tip-img {
    font-size: 36px;
  }

  .activity-tip-img-transform {
    transform: scaleY(-1);
  }
</style>
