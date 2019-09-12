<template>
  <div>
    <div class="order-commit-status">
      <i class="iconfont icon-duihao1  order-commit-status-img"></i>
      <span class="order-commit-status-text">订单提交成功</span>
    </div>
    <div class="order-commit-id">订单编号：</div>
    <div class="order-commit-id">创建时间：</div>
    <div class="orderEntry-btns-par">
      <button
        type="button"
        class="common-submit-btn-primary"
      >查看订单列表
      </button>
      <button
        type="button"
        class="common-submit-btn-default"
        @click="orderFollow()"
      >查看订单跟进
      </button>
    </div>
    <!--<div class="order-commit-tip">-->
      <!--<span class="order-commit-tip-text">记录用户特征,方便精准服务及二次购买</span>-->
      <!--<i class="iconfont icon-wenhao order-commit-tip-img"></i>-->
    <!--</div>-->
    <!--<b-user-tag-->
      <!--v-for="(item,index) in dataList"-->
      <!--:key="index"-->
      <!--:getData.sync="item"-->
      <!--:unusefulCount.sync="unusefulCount"-->
      <!--:usefulCount.sync="usefulCount"></b-user-tag>-->
    <!--<router-link :to="routerData[9].path">-->
      <!--<button class="order-commit-add-tag">+新建用户标签</button>-->
    <!--</router-link>-->
    <!--<button class="order-commit-save-tag">保存用户标签</button>-->
  </div>
</template>

<script>

import {
  BUserTag
} from '@/components/form';
import routerData from '@/router/routerData';

export default {
  name: 'OrderFollowCommitResult',
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
                {
                  content: '50后',
                  isChecked: true
                }, {
                  content: '60后',
                  isChecked: false
                }, {
                  content: '70后',
                  isChecked: false
                }, {
                  content: '80后',
                  isChecked: false
                }, {
                  content: '90后',
                  isChecked: false
                }, {
                  content: '00后',
                  isChecked: false
                }
              ]
        }
      ],
      usefulCount: {
        count: 666,
        isChecked: false
      },
      unusefulCount: {
        count: 222,
        isChecked: false
      },
      routerData: routerData.data
    };
  },
  methods: {
    orderFollow() {
      this.$router.replace('/')
      // this.$router.push({
      //   name: 'Order.OrderFollowSearch'
      // })
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === 'Order.OrderConfirm') {
        this.orderFollow()
    }
    next();// 必须要有这个，否则无法跳转
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

</style>
