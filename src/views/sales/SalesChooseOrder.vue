<template>
  <div>
    <div class="salesChooseOrder-header">
      <i class="iconfont icon-xinxi"></i>
      <span>如果要修改非本人录入的订单 请联系录单人进行修改</span>
    </div>
    <ul class="salesChooseOrders-list">
      <li
        class="salesChooseOrders-item"
      >
        <div class="salesChooseOrders-item-flex">
          <span class="salesChooseOrders-item-name">购买人：王大象</span>
          <span class="salesChooseOrders-item-time">购机时间：2019-06-28</span>
        </div>
        <div class="salesChooseOrders-item-flex">
          <span class="salesChooseOrders-item-time">录单人：陆梦飞</span>
          <span class="salesChooseOrders-item-money">订单金额：8,800元</span>
        </div>
      </li>
      <li
        class="salesChooseOrders-item active"
      >
        <div class="salesChooseOrders-item-flex">
          <span class="salesChooseOrders-item-name">购买人：王大象</span>
          <span class="salesChooseOrders-item-time">购机时间：2019-06-28</span>
        </div>
        <div class="salesChooseOrders-item-flex">
          <span class="salesChooseOrders-item-time">录单人：陆梦飞</span>
          <span class="salesChooseOrders-item-money">订单金额：8,800元</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SalesChooseOrder',
  data() {
    return {
      params: {
        mdId: '',
        productCode: '',
        gjTime: ''
      },
      list: [
        {
          //购买人
          yhName:''
        }
      ],
    };
  },
  methods: {
    getParams() {
      this.params = this.$route.params;
    },
    getChooseOrder() {
      this.salesService.getValidationFailureOrder({
        mdId: this.params.mdId,
        productCode: this.params.productCode,
        gjTime: this.params.gjTime
      }).then((res) => {
        if (res.code === 1) {
          const data = res.data;
          this.list = data;
        }
      });
    },
  },
  created() {
    this.getParams();
    this.getChooseOrder();
  },
};
</script>

<style scoped lang="scss">
  .salesChooseOrder {

  }

  .salesChooseOrder-header {
    font-size: 28px;
    height: 72px;
    display: flex;
    align-items: center;
    color: #F5A623;
    padding-left: 24px;
    padding-right: 24px;

    .iconfont {
      margin-right: 6px;
      font-size: 30px;
    }
  }

  .salesChooseOrders-item {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    font-size: 28px;
    min-height: 128px;
    background: #FBFBFB;
    border-left: 8px solid transparent;
    border-bottom: 1px solid #EEE;
    padding-left: 16px;
    padding-right: 24px;

    &.active {
      border-left: 8px solid #1969C6;
      background: #fff;
    }
  }

  .salesChooseOrders-item-flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    line-height: 40px;
  }

  .salesChooseOrders-item-name {
    color: #333;
  }

  .salesChooseOrders-item-money {
    color: #666;
  }

  .salesChooseOrders-item-time {
    color: #bbb;
  }
</style>
