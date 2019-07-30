<template>
  <div>
    <div class="order-commit-status">
      <i class="iconfont icon-duihao1  order-commit-status-img"></i>
      <span class="order-commit-status-text">订单提交成功</span>
    </div>
    <div class="order-commit-id">订单编号：T20190612000128</div>
    <div class="order-commit-id">创建时间：T20190612000128</div>
    <div class="orderEntry-btns-par">
      <button
        type="button"
        class="common-submit-btn-primary"
      >查看订单列表
      </button>
      <button
        type="button"
        class="common-submit-btn-default"
      >查看订单跟进
      </button>
    </div>
    <div class="order-commit-tip">
      <span class="order-commit-tip-text">记录用户特征,方便精准服务及二次购买</span>
      <i class="iconfont icon-wenhao order-commit-tip-img"></i>
    </div>
    <b-user-tag
      v-for="(item,index) in dataList"
      :key="index"
      :getData="item"
      :unusefulCount="unusefulCount"
      :usefulCount="usefulCount"
    ></b-user-tag>
    <button class="order-commit-add-tag">+新建用户标签</button>
    <button class="order-commit-save-tag">保存用户标签</button>
  </div>
</template>

<script>

import {
  BUserTag
} from '@/components/form';

export default {
  name: 'orderFollowCommitResult',
  components: {
    BUserTag
  },
  data() {
    return {
      dataList: [
        {
          title: '年龄层次',
          tagList:
              [
                '50后', '60后', '70后', '80后', '90后', '00后'
              ]
        }
      ],
      show: [0, 0, 0, 0, 0],
      usefulCount: 666,
      unusefulCount: 222
    };
  }
};
</script>


<style scoped lang="scss">
  .order-commit-status {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 48px;
    margin-bottom: 48px;
  }

  .order-commit-status-img {
    color: #29ab91;
    font-size: 72px;
  }

  .order-commit-status-text {
    font-size: 34px;
    color: #333;
    font-weight: bold;
    margin-left: 18px;
  }

  .order-commit-id {
    font-size: 28px;
    color: #666;
    display: flex;
    justify-content: center;
    margin-bottom: 16px;
  }

  .orderEntry-btns-par {
    display: flex;
    flex-wrap: nowrap;
    padding: 24px;
    margin-top: 36px;

    .common-submit-btn-primary {
      margin-right: 24px;
    }
  }

  .order-commit-tip {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    margin-top: 24px;
    margin-right: 24px;
    margin-left: 24px;
    padding-right: 24px;
    padding-left: 24px;
    background: #fff;
    border: 1px;
    border-radius: 8px;
  }

  .order-commit-tip-text {
    font-size: 28px;
    color: #333;
  }

  .order-commit-tip-img {
    color: #3078CC;
    font-size: 32px;
  }

  .order-commit-add-tag {
    width: calc(100% - 48px);
    height: 60px;
    margin-top: 16px;
    margin-right: 24px;
    margin-left: 24px;
    border: 1px solid #F5A623;
    border-radius: 8px;
    background: #fff;
    color: #F5A623;
    font-size: 24px;
  }

  .order-commit-save-tag {
    width: calc(100% - 48px);
    height: 60px;
    margin-top: 16px;
    margin-right: 24px;
    margin-left: 24px;
    border-radius: 8px;
    background: #F5A623;
    color: #fff;
    font-size: 24px;
  }

  .order-commit-tag-child-btn {
    width: calc(25% - 19px);
    height: 48px;
    border: 1px solid #D0D0D0;
    border-radius: 8px;
    background: #fff;
    margin-top: 16px;
    color: #666;
    font-size: 24px;
    margin-right: 25px;

    &:nth-child(4n) {
      margin-right: 0;
    }
  }

</style>
