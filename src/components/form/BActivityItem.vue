<template>
  <div class="activity-item-bg">
    <div class="activity-gift">
      <i class="iconfont icon-liwu activity-gift-img"/>
      <span class="activity-gift-title">{{getData.title}}</span>
    </div>
    <div class="activity-common-line activity-common-text">活动品牌：{{getData.brand}}</div>
    <div class="activity-common-line activity-common-text">试用范围：{{getData.scope}}</div>
    <div class="activity-common-line activity-common-text">
      活动日期：<span class="activity-data-text">{{getData.data}}</span>
    </div>
    <div class="activity-common-line activity-common-text">
      用户可兑换日期：<span class="activity-data-text">{{getData.data2}}</span>
    </div>
    <div class="activity-common-line activity-common-text">
      礼品类型：<span class="activity-type-text">{{getData.type}}</span>
    </div>
    <div v-for="(item,index) in getData.product"
         :key="index">
      <div class="activity-common-line activity-common-border activity-common-top">
        <span class="activity-name-icon">购</span>
        <span class="activity-common-text activity-common-left">{{item.name}}</span>
      </div>
      <div class="activity-common-line">
        <span class="activity-name-icon">送</span>
        <span class="activity-common-text activity-common-left">{{item.gift}}</span>
      </div>
      <div class="activity-common-line">
        <span class="activity-name-icon">量</span>
        <span class="activity-common-text activity-common-left">共<span
          class="activity-type-text">{{item.count}}</span>份，剩余<span class="activity-count-remain">{{item.remain}}</span>份</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BActivityItem',
  props: {
    getData: {
      title: '',
      brand: '',
      scope: '',
      data: '',
      data2: '',
      type: '',
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

  }
};
</script>

<style scoped>
  .activity-item-bg {
    margin-top: 16px;
    margin-right: 24px;
    margin-left: 24px;
    background: #fff;
    padding-top: 30px;
    padding-right: 24px;
    padding-bottom: 16px;
    padding-left: 24px;
    border-radius: 10px;
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
  }

  .activity-common-text {
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

  .activity-type-text {
    color: #f5a623;
  }

  .activity-count-remain {
    color: #1969C6;
  }

  .activity-name-icon {
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

</style>
