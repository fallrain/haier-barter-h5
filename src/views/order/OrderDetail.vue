<template xmlns:v-slot="">
  <div style="padding-bottom: 72px;">
    <div class="orderConfirm-no">
      <span class="orderConfirm-p">订单号：</span>
      <p class="orderConfirm-s">{{orderNo}}</p>
    </div>
    <!-- <div class="orderEntry-header">
      <span class="orderEntry-header-name">门店：{{shopName}}</span>
    </div> -->
    <b-item
      class="mt16"
      title="门店："
      :value="shopName"
    >
    </b-item>
    <div class="orderEntry-header-cus">
      <span class="name mr16">顾客信息:{{username}}</span>
      <span class="name mr16">{{phone}}</span>
    </div>

    <div class="orderEntry-user">
      <div>
        <div class="orderEntry-user-head">
          <span class="name mr16">收货人：{{consignee.name}}</span>
          <span class="sex mr16">{{consignee.sexCn}}</span>
          <i class="iconfont icon-dianhua mr16"></i>
          <span class="phone mr16">{{consignee.phone}}</span>

        </div>
        <p class="orderEntry-user-address">
          {{consignee.address}}
        </p>
      </div>
    </div>
    <b-item
      class="mt16"
      title="购买日期："
      :value="buyDate"
    >
    </b-item>
    <b-item
      class="mt16"
      title="订单类型："
      :value="orderType"
    >
    </b-item>
    <b-fieldset
      class="mt16"
      title="用户购买的产品"
    >
      <div>
        <ul>
          <b-order-product-confirm
            class="mb20"
            v-for="(item,index) in productList"
            :key="index"
            :data="item"
            :index="index"
            :content="item.installTime"
          >
          </b-order-product-confirm>
        </ul>
      </div>
    </b-fieldset>
    <b-item
      class="mt16"
      title="送货时间："
      :value="deliveryTime"
    >
    </b-item>
    <b-fieldset
      class="mt16 orderEntry-rights-fieldset"
      title="已选择的权益"
      :headBtmLine="true"
    >
      <div>
        <b-activity-list
          :isDetail="isDetail"
          :data="activityList"
          v-model="choosedActivitys"
        ></b-activity-list>
      </div>
    </b-fieldset>
    <div class="orderEntry-btns-par2">
      <!--<button-->
        <!--type="button"-->
        <!--class="common-submit-btn-primary"-->
        <!--@click="changeOrder"-->
      <!--&gt;返回修改草稿-->
      <!--</button>-->
      <button
        type="button"
        class="common-submit-btn-default1"
        @click="next"
      >确认
      </button>
    </div>
  </div>
</template>

<script>
import {
  Toast
} from 'mand-mobile';
import {
  BActivityList,
  BDatePicker,
  BFieldset,
  BItem,
  BOrderProduct,
  BOrderProductConfirm,
  BPop,
  BPopAddressList,
  BPopCheckList,
  BRadioItem
} from '@/components/form';

import {
  BMultbuyCheck
} from '@/components/business';

export default {
  name: 'OrderModify',
  components: {
    BActivityList,
    BDatePicker,
    BFieldset,
    BItem,
    BMultbuyCheck,
    BOrderProduct,
    BPop,
    BPopAddressList,
    BPopCheckList,
    BRadioItem,
    BOrderProductConfirm
  },
  data() {
    return {
      // 是否详情模式
      isDetail: true,
      // 门店名称
      shopName: '新华百货老大楼',

      // 收货人信息
      consignee: {
        /* name: '',
                sex: '男士',
                phone: '15067543689' */
      },
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
      orderType: 2,
      // 购机时间
      buyDate: '',
      // 产品列表
      productList: [],
      // 活动列表
      activityList: [

      ],
      // 选中的活动id
      choosedActivitys: [],
      // 选择礼品pop显示隐藏
      chooseGiftPopShow: false,
      // pop礼品列表
      giftList: [
      ],
      orderNo: '',
      createdTime: '',
      deliveryTime: '',
      customerString: '',
      username: '',
      phone: ''
    };
  },
  computed: {},
  created() {
    this.orderNo = this.$route.params.orderNo;
    this.getData();
  },
  methods: {
    getData() {
      this.orderService.queryOrderInfoByOrderNo({}, { orderNo: this.orderNo }).then((response) => {
        if (response.code === 1) {
          const resData = response.data;
          this.shopName = resData.storeName;
          this.consignee.name = resData.consigneeName;
          this.username = resData.userName;
          this.phone = resData.userPhone;
          this.consignee.phone = resData.consigneePhone;
          this.consignee.sex = resData.userSex;
          if (resData.userSex === 1) {
            this.consignee.sexCn = '男士';
          } else {
            this.consignee.sexCn = '女士';
          }
          this.consignee.address = resData.dispatchProvince + resData.dispatchCity + resData.dispatchArea + resData.dispatchAdd;
          this.buyDate = resData.buyTime;
          if (resData.orderType === 0) {
            this.orderType = '单品';
          } else {
            this.orderType = '套购';
          }
          this.deliveryTime = resData.deliveryTime.replace(/-/g, '/');
          const dt = new Date(Date.parse(this.deliveryTime));
          const y = dt.getFullYear();
          const m = dt.getMonth() + 1;
          const d = dt.getDate();
          const h = dt.getHours();
          const ha = h + 1;

          const time = `${y}-${m}-${d} ${h}:00` + `-${ha}:00`;
          this.deliveryTime = time;
          this.createdTime = resData.createdTime;
          this.orderNo = resData.orderNo;
          // if (resData.rightsUserJson) {
          //   const str = JSON.parse(resData.rightsUserJson);
          //
          //   this.activityList = str.rightsUserInterestsDTO;
          // }
          if (resData.rightName != '' && resData.rightName) {
            this.activityList = resData.rightName.split(',');
          }
          if (resData.orderDetailDtoList.length !== 0) {
            this.productList = resData.orderDetailDtoList;
            this.productList.forEach((item) => {
              if (item.productBrand == '000') {
                item.productBrandCN = '海尔';
              } else if (item.productBrand == '051') {
                item.productBrandCN = '卡萨帝';
              } else if (item.productBrand == '089') {
                item.productBrandCN = '统帅';
              } else {
                item.productBrandCN = '其他';
              }
            });
          }
        }
      });
    },


    next() {
      // /* 下一步 */
      // this.orderService.createOrderSubmit({}, { orderNo: this.orderNo }).then((res) => {
      //   if (res.code === 1) {
      //     Toast.succeed(res.msg);
      //   }
      // });
      // this.$router.push({
      //   name: 'Order.OrderFollowCommitResult',
      //
      // });
      this.$router.go(-1);
    },
    // changeOrder(){
    //   this.$router.push({
    //     name: 'Order.OrderModify',
    //     param:{orderNo:this.orderNo}
    //   });
    // },
    saveOrder() {

    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.$vnode && this.$vnode.data.keepAlive) {
      if (this.$vnode.parent && this.$vnode.parent.componentInstance && this.$vnode.parent.componentInstance.cache) {
        if (this.$vnode.componentOptions) {
          const key = this.$vnode.key == null
            ? this.$vnode.componentOptions.Ctor.cid + (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '')
            : this.$vnode.key;
          const cache = this.$vnode.parent.componentInstance.cache;

          const keys = this.$vnode.parent.componentInstance.keys;
          if (cache[key]) {
            if (keys.length) {
              const index = keys.indexOf(key);
              if (index > -1) {
                keys.splice(index, 1);
              }
            }
            delete cache[key];
          }
        }
      }
    }
    this.$destroy();
    next();
  },
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
    background: #fff;
    padding: 24px;
    margin-top: 16px;
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

  .orderEntry-rights-fieldset {
    .b-fieldset-legend-left {
      font-size: 28px;
      color: #333;
    }

    .b-fieldset-legend-right {
      font-size: 24px;
      color: #1969C6;
    }
  }

  .orderEntry-rights-fieldset-more {
    margin-top: 20px;
    color: #1969C6;
    font-size: 24px;
    text-align: center;
  }

  .orderentry-address {
    .md-popup-mask {
      top: 0;
    }
  }

  .orderConfirm-no {
    color: #1969C6;
    font-size: 28px;
    height: 80px;
    display: flex;

    .orderConfirm-p {
      height: 80px;
      line-height: 80px;
      padding-left: 25px;
      width: 450px;
      flex-shrink: 0;
    }

    .orderConfirm-s {
      height: 80px;
      line-height: 80px;
    }
  }
  .orderEntry-header-cus{
    display: flex;
    align-items: center;

    width: 100%;
    height: 80px;
    background: #fff;
    padding-left: 27px;
    padding-right: 25px;
    color: #333;
    margin-top: 20px;
  }
  .orderEntry-btns-par2 {
    width: 100%;
    position: relative;
    padding-top: 10px;
    background: #fff;
  }
  .common-submit-btn-default1{
    height: 84px;
    font-size: 34px;
    border-radius: 8px;
    color: #fff;
    background: #1969C6;
    width: 90%;
    margin-left: 5%;
    margin-bottom: 20px;
    /*position: absolute;*/
    bottom: 20px;
  }
</style>
