<template xmlns:v-slot="">
  <div>
    <div class="orderEntry-header">
      <span class="orderEntry-header-name">门店：{{shopName}}</span>
      <i class="iconfont icon-icon-question orderEntry-header-icon"></i>
    </div>
    <b-item
      class="mt16"
      title="顾客信息："
      value=""
      v-show="haveCustomer"
    >
    </b-item>
    <b-fieldset
      class="mt16"
      title="顾客信息："
    >
      <div class="orderEntry-user">
        <div v-if="haveConsignee">
          <div class="orderEntry-user-head">
            <span class="name mr16">收货人：{{consignee.name}}</span>
            <span class="sex mr16">{{consignee.sex}}</span>
            <i class="iconfont icon-dianhua mr16"></i>
            <span class="phone mr16">{{consignee.phone}}</span>
            <button
              type="button"
              class="common-btn-waring"
              @click="editAddress(customerInfo)"
            >更改地址
            </button>
          </div>
          <p class="orderEntry-user-address">
            {{consignee.address}}
          </p>
        </div>
        <div v-else>
          <button
            type="button"
            class="common-btn-primary w100per"
            @click="addAddress()"
          >添加或选择用户信息
          </button>
        </div>
      </div>
    </b-fieldset>
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
      class="mt16"
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
            @onDel="onDelete"
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
          class="common-btn-primary w100per"
          @click="addProduct()"
        >+新增产品
        </button>
      </div>
    </b-fieldset>
    <b-item
      class="mt16"
      title="选择送货时间："
    >
      <template
        v-slot:right=""
      >
        <b-date-picker
          class="orderEntry-date"
          slot="right"
          type="date"
          title="请选择日期"
          :defaultDate="deliveryTime"
          v-model="deliveryTime"
        ></b-date-picker>
      </template>
    </b-item>
    <b-item
      class="mt16"
      title="选择可用的购机权益活动"
      :arrow="true"
      @rightClick="selectActivity()"
    >
    </b-item>
    <div class="orderEntry-btns-par">
      <button
        type="button"
        class="common-submit-btn-primary"
        @click="saveTemporary()"
      >暂存草稿
      </button>
      <button
        type="button"
        class="common-submit-btn-default"
        @click="next"
      >下一步
      </button>
    </div>
    <b-pop-check-list
      :show.sync="chooseGiftPopShow"
      title="选择礼品"
      :list="giftList"
    ></b-pop-check-list>
    <b-pop-check-list
      type="radio"
      :show.sync="returnReasonPopShow"
      title="选择修改订单原因"
      :list="returnReasonList"
      v-model="returnReasonVal"
    ></b-pop-check-list>
    <div class="orderentry-address">
      <b-pop-address-list
        :show.sync="addressPopShow"
        :list="addressList"
        @addNew="addAddress"
        @editAddress="editAddress()"
      ></b-pop-address-list>
    </div>
    <b-pop
      :show.sync="multBuyPopShow"
    >
      <b-multbuy-check
        type="radio"
        title="请选择套购发起人"
        :persons="multBuySponsor"
        v-model="multBuySponsorCheckedIds"
        tips="套购发起人发起套购，并且统一录入用户销售订单"
      ></b-multbuy-check>
      <b-multbuy-check
        class="mt25"
        title="请选择套购参与人"
        :persons="multBuyParticipant"
        v-model="multBuyParticipantCheckIds"
        tips="套购参秘人可查看套头订单不需要录入订单,但是需确定确单信息正确后自主申报销量。"
        :checkAll="true"
        type="checkbox"
      ></b-multbuy-check>
    </b-pop>
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
  BPop,
  BPopAddressList,
  BPopCheckList,
  BRadioItem
} from '@/components/form';
import {
  BMultbuyCheck
} from '@/components/business';

export default {
  name: 'OrderEntry',
  components: {
    Toast,
    BActivityList,
    BDatePicker,
    BFieldset,
    BItem,
    BMultbuyCheck,
    BOrderProduct,
    BPop,
    BPopAddressList,
    BPopCheckList,
    BRadioItem
  },
  data() {
    return {
      // 是否详情模式
      isDetail: true,
      // 门店名称
      shopName: '',
      haveCustomer: false,
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
      // /送货时间
      deliveryTime: '',
      // 产品列表
      productList: [],
      // 活动列表
      activityList: [
        {
          id: 1,
          activityName: '6月场景套权益昆明小微',
          inf: '满10000元送7500积分',
          num: 33
        },
        {
          id: 2,
          activityName: '6月场景套权益昆明小微',
          inf: '满10000元送7500积分',
          num: 21
        }
      ],
      // 选中的活动id
      choosedActivitys: [],
      // 选择礼品pop显示隐藏
      chooseGiftPopShow: false,
      // pop礼品列表
      giftList: [
        {
          id: 1,
          name: '1.双立人厨房六件套（价值 7000积分）',
          checkedIds: []
        },
        {
          id: 2,
          name: '2.婴儿料理机（价值 6000积分）',
          checkedIds: []
        }
      ],
      // 退货原因pop show
      returnReasonPopShow: false,
      // pop 退货原因
      returnReasonList: [
        {
          id: 1,
          name: '换货'
        },
        {
          id: 2,
          name: '录单错误'
        },
        {
          id: 3,
          name: '信息填写错误'
        },
        {
          id: 4,
          name: '其他原因',
          reason: '',
          placeholder: '请输入您的订单修改原因'
        }
      ],
      // 选中的原因id 数组
      returnReasonVal: [],
      // 选择收货人列表pop show
      addressPopShow: false,
      // 收货人地址pop列表
      addressList: [
        // {
        //   name: '张三',
        //   phone: '15000000000',
        //   address: '山东省青岛市崂山区海尔路1号左岸风度小区12号楼1单元801户',
        //   tagName: '自己家'
        // },
        // {
        //   name: '李四',
        //   phone: '15000000000',
        //   address: '山东省青岛市崂山区海尔路1号左岸风度小区12号楼1单元801户',
        //   tagName: '办公室'
        // },
        // {
        //   name: '王二',
        //   phone: '15000000000',
        //   address: '山东省青岛市崂山区海尔路1号左岸风度小区12号楼1单元801户',
        //   tagName: '父母家'
        // },
        // {
        //   name: '尼古拉斯赵四',
        //   phone: '15000000000',
        //   address: '山东省青岛市崂山区海尔路1号左岸风度小区12号楼1单元801户',
        //   tagName: '其他'
        // },
        // {
        //   name: '莱桑尼丝铁柱',
        //   phone: '15000000000',
        //   address: '山东省青岛市崂山区海尔路1号左岸风度小区12号楼1单元801户',
        //   tagName: '其他'
        // },
        // {
        //   name: '罗伯特英子',
        //   phone: '15000000000',
        //   address: '山东省青岛市崂山区海尔路1号左岸风度小区12号楼1单元801户',
        //   tagName: '其他'
        // }
      ],
      // 套购pop show
      multBuyPopShow: false,
      // 套购发起人
      multBuySponsor: [
        {
          id: 1,
          name: '陆梦飞',
          industry: '冰箱'
        },
        {
          id: 2,
          name: '大飞哥',
          industry: '彩电'
        },
        {
          id: 3,
          name: '贾老板',
          industry: '打怪兽'
        },
        {
          id: 4,
          name: '蟹老板',
          industry: '蟹黄包'
        }
      ],
      multBuySponsorCheckedIds: [],
      // 套购参与人
      multBuyParticipant: [
        {
          id: 1,
          name: '陆梦飞',
          industry: '冰箱'
        },
        {
          id: 2,
          name: '大飞哥',
          industry: '彩电'
        },
        {
          id: 3,
          name: '贾老板',
          industry: '打怪兽'
        },
        {
          id: 4,
          name: '蟹老板',
          industry: '蟹黄包'
        }
      ],
      // 参与人选中id
      multBuyParticipantCheckIds: [],
      orderNo: '',
      haveConsignee: false,
      mobile: '',
      region: '',
      userParam: {}
    };
  },
  computed: {},
  mounted() {
    //
    //    if(this.$route.query){
    // const address = this.$route.query.temp
    //   console.log('tag', address)
    //    }
  },
  activated() {
    if (this.$route.query.temp) {
      const obj = JSON.parse(this.$route.query.temp);
      if (obj.tel) {
        this.mobile = obj.tel;
        this.queryCustomerDefault();
      }
      if (obj.product) {
        this.productList.push(obj.product);
      }
    }
  },
  created() {
    if (localStorage.getItem('userinfo')) {
      this.userParam = localStorage.getItem('userinfo');
      this.shopId = this.userParam.shopId;
      this.mobile = this.userParam.mobile;
      this.queryCustomerDefault();
      this.queryCustomerAddressList();
      this.getUserStore();
    }
    this.genarateOrderNum();
  },
  methods: {
    //  haveConsignee() {
    //   /* 存在收货人信息 */
    //   return this.consignee && JSON.stringify(this.consignee) !== '{}';
    // },
    // chooseGift() {
    //   /* 选择礼品 */
    //   this.chooseGiftPopShow = true;
    // },
    // 获取门店信息
    getUserStore() {
      this.shopId = '999999999';
      this.productService.storeInfo(this.shopId).then((res) => {
        if (res.code === 1) {
          this.shopName = '';
        }
      });
    },

    // 生成订单号
    genarateOrderNum() {
      this.orderService.generateOrderNo({}, { recordMode: 'Haier' },).then((res) => {
        if (res.code === 1) {
          this.orderNo = res.data;
        } else {
          Toast.failed(res.msg);
        }
      });
    },
    // 查询客户信息及默认地址
    queryCustomerDefault() {
      const a = {
        address: 'string',
        city: 'string',
        customerId: 0,
        district: 'string',
        familyItemCode: 'string',
        groupCompositionCode: 'string',
        id: 0,
        isDefault: true,
        mobile: 'string',
        province: 'string',
        userId: 'string',
        username: 'string'
      };
      this.addressList.push(a);
      this.productService.deafaultCustomerAddress(this.mobile).then((res) => {
        if (res.code === 1) {
          if (res.data !== null) {
            this.haveConsignee = true;
            this.haveCustomer = true;
            this.customerInfo = res.data;
            this.consignee.address = res.data.province + res.data.city + res.data.district + res.data.address;
            this.consignee.phone = res.data.mobile;
            this.consignee.name = res.data.username;
            this.consignee.sex = res.data.sex;
            this.consignee.customerId = res.data.customerId;
          }
        }
      });
    },
    // 查询客户地址列表
    queryCustomerAddressList() {
      this.productService.customerAddressList(this.consignee.customerId).then((res) => {
        if (res.code === 1) {
          this.addressList = res.data;
        }
      });
    },
    // 暂存
    saveTemporary() {
      if (this.orderNo !== '') {
        this.orderService.createOrder().then((res) => {


        });
      }
    },
    // 添加产品
    addProduct() {
      /* 添加产品 */
      this.$router.push({
        name: 'Order.SearchProduct',
      });
    },
    selectActivity() {
      /* 选择活动 */
      this.$router.push({
        name: 'Order.OrderFollowActivity',
      });
    },
    addAddress() {
      /* 添加用户信息 */
      if (this.addressList.length === 0) {
        this.region = 'add';

        this.$router.push({
          name: 'Order.AddAddress',
          params: { region: this.region, info: '' }
        });
      } else {
        this.showAddressList();
      }
    },
    editAddress(item) {
      this.region = 'edit';
      this.$router.push({
        name: 'Order.AddAddress',
        params: { region: this.region, info: item }
      });
    },
    showAddressList() {
      /* 展示选择用户pop */
      this.addressPopShow = true;
    },
    next() {
      /* 下一步 */
      // todo 单品、套购值待定
      if (this.orderType === 2) {
        // 展示套购发起人
        this.multBuyPopShow = true;
      }
    },
    saveOrder() {

    },
    onDelete(index) {
      this.productList.splice(index, 1);
    }
  }
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
      color: #EE534F;
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

</style>
