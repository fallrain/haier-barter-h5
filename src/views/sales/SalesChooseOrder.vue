<template>
  <div>
    <div class="salesChooseOrders-dialog">
      <b-order-dialog
        :dialogContent="dialogContent"
        :isOpen.sync="isOpen"
        v-show="isOpen"></b-order-dialog>
    </div>
    <div class="salesChooseOrder-header">
      <i class="iconfont icon-xinxi"></i>
      <span>如果要修改非本人录入的订单 请联系录单人进行修改</span>
    </div>
    <ul class="salesChooseOrders-list">
      <li
        class="salesChooseOrders-item"
        v-for="(itemInfo,index) in list"
        :key="index"
        @click="itemClick(itemInfo,index)"
        :class="{'active': index == clickNo}"
      >
        <div class="salesChooseOrders-item-flex">
          <span class="salesChooseOrders-item-name">购买人：{{itemInfo.yhName}}</span>
          <span class="salesChooseOrders-item-time">购机时间：{{itemInfo.gjTime}}</span>
        </div>
        <div class="salesChooseOrders-item-flex">
          <span class="salesChooseOrders-item-time">录单人：{{itemInfo.hmcName}}</span>
          <span class="salesChooseOrders-item-money">订单金额：{{itemInfo.orderTotalPrice}}元</span>
        </div>
      </li>
    </ul>
    <div class="salesChooseOrders-btn">
      <button class="salesChooseOrders-confirm"
              @click="confirm">确定
      </button>
    </div>
  </div>
</template>

<script>
  import {
    BOrderDialog
  } from '@/components/form';
export default {
  name: 'SalesChooseOrder',
  components: {
    BOrderDialog
  },
  data() {
    return {
      params: {
        mdId: '',
        productCode: '',
        gjTime: ''
      },
      //联网获取的数据
      list: [
        {
          //购买人
          yhName: '',
          //录单人
          hmcName: '',
          //购机时间
          gjTime: '',
          //订单金额
          orderTotalPrice: '',
        }
      ],
      // 判断点击的是哪条item
      clickNo: -1,
      // 弹框显示的内容&&是否需要显示
      dialogContent: {
        title: '',
        content: '请联系录单人处理',
        leftText: '',
        rightText: '知道了',
        leftColor: '',
        rightColor: ''
      },
      isOpen: false,
      //暂存点击的item信息
      itemInfo: {
        //购买人
        yhName: '',
        //录单人
        hmcName: '',
        //购机时间
        gjTime: '',
        //订单金额
        orderTotalPrice: '',
      },
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
    itemClick(itemInfo, index) {
      this.clickNo = index;
      this.itemInfo = itemInfo;
      this.dialogContent.content = "请联系录单人" + itemInfo.hmcName + "处理";
    },
    confirm() {
      //TODO 添加是否录单人的判断
      if (false) {
        this.isOpen = !this.isOpen;
      } else {
        this.$router.push({
          name: 'Order.OrderEntry',
          params: {
            ...this.itemInfo
          }
        });
      }
    },
  },
  created() {
    this.getParams();
    this.getChooseOrder();
  },
};
</script>

<style lang="scss">
  .salesChooseOrder {

  }

  .salesChooseOrders-dialog {
    .order-dialog-content {
      text-align: center;
    }
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

  .salesChooseOrders-confirm {
    position: absolute;
    width: calc(100% - 48px);
    height: 84px;
    bottom: 40px;
    right: 24px;
    left: 24px;
    border-radius: 8px;
    background: #1969C6;
    color: #fff;
    font-size: 34px;
  }

  .salesChooseOrders-btn {
    position: flex;
  }
</style>
