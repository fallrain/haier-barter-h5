<template xmlns:v-slot="">
  <div>
    <div class="orderEntry-header">
      <span class="orderEntry-header-name">门店：{{shopName}}</span>
      <i class="iconfont icon-icon-question orderEntry-header-icon"></i>
    </div>
    <div class="orderEntry-user mt16">
      <div class="orderEntry-user-head">
        <span class="name mr16">收货人：王永力</span>
        <span class="sex mr16">男士</span>
        <i class="iconfont icon-dianhua mr16"></i>
        <span class="phone mr16">13884970216</span>
        <button
          type="button"
          class="common-btn-waring"
        >更改地址
        </button>
      </div>
      <p class="orderEntry-user-address">
        默认地址：山东省青岛市市南区劲松七路左岸风
        度小区12号楼2单元602
      </p>
    </div>
    <b-item
      class="mt16"
      title="购买日期："
    >
      <template
        v-slot:right=""
      >
        <b-date-picker
          class="orderEntry-date"
          slot="right"
          type="date"
          title="请选择日期"
          :defaultDate="buyDate"
          v-model="buyDate"
        ></b-date-picker>
      </template>
    </b-item>
    <b-item
      class="mt16"
      title="订单类型："
    >
      <template v-slot:right="">
        <b-radio-item
          :inline="true"
          :list="orderTypes"
          v-model="orderType"
        ></b-radio-item>
      </template>
    </b-item>
    <b-fieldset
      title="用户购买的产品"
    >
      <div>
        <ul>
          <b-order-product
            class="mb20"
            v-for="(item,index) in productList"
            :key="index"
            :data="item"
            :index="index"
            :content="item.isReport"
          >
            <template
              v-slot:default
            >
              <p class="orderEntry-reportInf">
                该产品需代报装,请选择安装时间
              </p>
            </template>
          </b-order-product>
        </ul>
        <button
          type="button"
          class="common-btn-primary"
        >新增产品
        </button>
      </div>
    </b-fieldset>
  </div>
</template>

<script>
import {
  BDatePicker,
  BFieldset,
  BItem,
  BOrderProduct,
  BRadioItem
} from '@/components/form';

export default {
  name: 'OrderEntry',
  components: {
    BDatePicker,
    BFieldset,
    BItem,
    BOrderProduct,
    BRadioItem
  },
  data() {
    return {
      // 门店名称
      shopName: '新华百货老大楼',
      // 订单类型单选
      orderTypes: [
        {
          key: 1,
          value: '单品'
        },
        {
          key: 2,
          value: '套购'
        }
      ],
      // 订单类型
      orderType: 1,
      // 购机时间
      buyDate: '',
      // 产品列表
      productList: [
        {
          name: '海尔/空调，KFR-35G',
          price: '',
          isReport: true
        },
        {
          name: '海尔/空调，KFR-35G',
          price: '',
        },
        {
          name: '海尔/空调，KFR-35G',
          price: '',
          isReport: true
        }
      ]
    };
  },
  methods: {}
};
</script>

<style lang="scss">
  .orderEntry-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 80px;
    background: #fff;
    padding-left: 27px;
    padding-right: 25px;
    color: #1969C6;
  }

  .orderEntry-header-name {
    font-size: 28px;
  }

  .orderEntry-header-icon {
    font-size: 32px;
  }

  .orderEntry-user {
    padding: 26px;
    background: #fff;
  }

  .orderEntry-user-head {
    display: flex;
    align-items: center;

    .name {
      color: #333;
      font-size: 28px;
    }

    .sex {
      color: #333;
      font-size: 24px;
    }

    .icon-dianhua {
      font-size: 32px;
      color: #1969C6;
    }

    .phone {
      color: #1969C6;
      font-size: 28px;
    }

    .common-btn-waring {
      margin-left: auto;
    }
  }

  .orderEntry-user-address {
    color: #666;
    font-size: 28px;
    line-height: 36px;
    margin-top: 28px;
  }

  .orderEntry-date {
    width: 320px;
  }

  .orderEntry-reportInf {
    color: #3078CC;
    font-size: 24px;
  }
</style>
