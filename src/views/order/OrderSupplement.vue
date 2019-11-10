<template xmlns:v-slot="">
  <div>
    <div class="orderConfirm-no">
      <span class="orderConfirm-p">订单号：</span>
      <p class="orderConfirm-s">{{orderData.orderNo}}</p>
    </div>
    <b-item
      class="mt16"
      title="门店："
      :value="orderData.storeName"
    >
    </b-item>
    <div class="orderEntry-header-cus">
      <span class="name mr16">顾客信息:{{orderData.userName}}</span>
      <span class="name mr16">{{orderData.userPhone}}</span>
    </div>

    <div class="orderEntry-user">
      <div>
        <div class="orderEntry-user-head">
          <span class="name mr16">收货人：{{orderData.consigneeName}}</span>
          <span class="sex mr16">{{consignee.sexCn}}</span>
          <i class="iconfont icon-dianhua mr16"></i>
          <span class="phone mr16">{{orderData.consigneePhone}}</span>

        </div>
        <p class="orderEntry-user-address">
         {{orderData.dispatchProvince}}{{orderData.dispatchCity}}{{orderData.dispatchArea}}{{orderData.dispatchAdd}}
        </p>
      </div>
    </div>
    <b-item
      class="mt16"
      title="购买日期："
      :value="orderData.createdTime"
    >
    </b-item>
    <b-item
      class="mt16"
      title="订单类型："
      :value="orderData.orderTypeCn"
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
            :content="item.installTime != ''"
          >
          </b-order-product-confirm>
          <b-order-product
            class="mb20"
            v-for="(item,index) in supplementProductList"
            :key="index"
            :data="item"
            :index="index"
            :content="isInstall"
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
      title="送货时间："
      :value="orderData.deliveryTime"
    >
    </b-item>
    <b-item
      class="mt16"
      title="选择可用的购机权益活动"
      :arrow="true"
      @rightClick="selectActivity()"
    >
    </b-item>
    <b-activity-list
      :data="rightsList"
      :isDetail="isDetail"
    ></b-activity-list>
    <div class="orderEntry-btns-par">
      <button
        type="button"
        class="common-submit-btn-primary"
        @click="saveTemporary(1)"
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
  BRadioItem, BTimeSectionPicker,BOrderProductConfirm
} from '@/components/form';
import {
  BMultbuyCheck
} from '@/components/business';

export default {
  name: 'OrderSupplement',
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
    BRadioItem,
    BTimeSectionPicker,BOrderProductConfirm
  },
  data() {
    return {
      // 是否详情模式
      isDetail: false,
      orderData: {},
      customerString: '',
      // 收货人信息
      consignee: {},
      customerInfo: {},

      // 产品列表
      productList: [],
      supplementProductList:[],
      // 活动列表
      // 选中的活动id
      choosedActivitys: [],
      // 选择礼品pop显示隐藏
      chooseGiftPopShow: false,
      // pop礼品列表
      giftList: [
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

      ],
      // 套购pop show
      multBuyPopShow: false,
      // 套购发起人
      multBuySponsor: [

      ],
      multBuySponsorCheckedIds: [],
      // 套购参与人
      multBuyParticipant: [
      ],
      // 参与人选中id
      multBuyParticipantCheckIds: [],
      orderNo: '',
      title: '顾客信息：',
      mobile: '',
      region: '',
      hmcId: '',
      rightsList: [],
      consignee: {},
      subInfo: {},
      rightsJson: '',
      orderFollowId: '',
      recordMode: '',
      sourceSn: '',
      queryInstall: false,
      isInstall: false,
      saveType: 1
    };
  },
  computed: {},
  activated() {
    if (this.$route.query.temp) {
      debugger;
      let ID = '';
      const obj = JSON.parse(this.$route.query.temp)
      if (obj.rightsJson) {
        this.rightsJson = obj.rightsJson;
        debugger;
        const right = JSON.parse(obj.rightsJson);

        this.rightName = right.rightsName;
        this.rightId = right.rightsId;
        const rightsPro = JSON.parse(obj.rightsJson).rightsUserInterestsDTO;
        if (!rightsPro.length) {
          return;
        }
        this.isDetail = true;
        this.rightsList = rightsPro;
      }
      debugger
      if (obj.product) {
        if (!obj.product.productGroupName) {
          return;
        }
        this.orderService.generateOrderDetailId().then((res) => {
          if (res.code === 1) {
            ID = res.data;
            const pro = {};
            pro.id = ID;
            pro.bccPrice = obj.product.price;
            pro.industryName = obj.product.industryName;
            pro.industryCode = obj.product.industryCode;
            pro.productBrand = obj.product.productBrandCode;
            pro.productCategoryCode = obj.product.productGroup;
            pro.productCategoryName = obj.product.productGroupName;
            pro.productCode = obj.product.productCode;
            pro.productModel = obj.product.productModel;
            pro.installTime = '';
            pro.bccPrice = obj.product.price;
            pro.productPrice = '';
            pro.invoiceStatus = 0;
            this.isReportInstall(pro);
          }
        });
      }
    }
  },
  created() {
    this.orderNo = this.$route.params.orderNo;
    this.orderFollowId = this.$route.params.orderFollowId;
    debugger
    this.getData();
  },
  methods: {
    radioChange(val) {
      this.orderType = val;
    },
    selectSetBuyer() {
      this.multBuyPopShow = true;
    },
    consporConfirm() {
      this.multBuyPopShow = false;
    },
    confirmDeliveryTime(date) {
      this.orderData.deliveryTime = date;
    },
    isReportInstall(pro) {
      this.supplementProductList.push(pro);
      const orderDetailInfo = [
        { hmcId: this.orderData.hmcId,
          storeId: this.orderData.storeId,
          productModel: pro.productModel }
      ];
      this.orderService.isReportInstallNew({ orderDetailInfo }, {}).then((res) => {
        this.queryInstall = true;
        if (res.code === 1) {
          this.isInstall = true;
          // if (res.msg === 'SUCCESS') {
          //   this.isInstall = true;
          // } else {
          //   this.isInstall = false;
          // }
        } else {
        }
      });
    },
    getData() {
      this.orderService.queryOrderInfoByOrderNo({}, { orderNo: this.orderNo }).then((response) => {
        if (response.code === 1) {
          const resData = response.data;
          this.orderData = response.data;
          if(this.orderData.orderType === 1){
            this.orderData.orderTypeCn = '单品'
          }else {
            this.orderData.orderTypeCn = '套购'
          }
          if (this.orderData.userSex === 1) {
            this.consignee.sexCn = '男士';
          } else {
            this.consignee.sexCn = '女士';
          }
          if (resData.rightsUserJson) {
            this.rightsList = JSON.parse(resData.rightsUserJson).rightsUserInterestsDTO;
          }
          if (resData.orderDetailDtoList.length !== 0) {
            this.productList = resData.orderDetailDtoList;
            this.productList.forEach((item) => {
              if (item.installTime !== '') {
                this.isInstall = true;
              }
              if (item.productBrand == '000') {
                item.productBrandCN = '海尔';
              } else if(item.productBrand == '051'){
                item.productBrandCN = '卡萨帝';
              }else if(item.productBrand == '089'){
                item.productBrandCN = '统帅';
              }else {
                item.productBrandCN = '其他'
              }
            });
          }
        }
      });
    },
    // 暂存
    saveTemporary(type) {
      if (type === 1) {
        this.saveType = 1;
      } else {
        this.saveType = 0;
      }
      this.generateSubInfo(1);
    },
    // 添加产品
    addProduct() {
      /* 添加产品 */
      this.$router.push({
        name: 'Order.SearchProduct',
      });
    },
    selectActivity() {
      if (this.productList.length === 0 && this.supplementProductList.length === 0) {
        Toast.info('请选择产品');
        return;
      }
      for (let i = 0; i < this.supplementProductList.length; i++) {
        if (this.supplementProductList[i].productPrice === '') {
          Toast.failed('请输入产品价格');
          return;
        }
      }
      /* 选择活动 */
      this.generateSubInfo(2);
    },

    generateSubInfo(type) {
      if (!this.bUtil.isReportInstallFit(this.supplementProductList, this.orderData.deliveryTime)) {
        return;
      }

      const subInfo = {};
      // multBuyParticipantCheckIds
      if (this.multBuySponsorCheckedIds.length) {
        subInfo.coupleSponsor = this.multBuySponsorCheckedIds[0];
        const obj = this.multBuySponsor.find(v => v.hmcId === this.multBuySponsorCheckedIds[0]);
        subInfo.coupleSponsorName = obj.username;
      } else {
        subInfo.coupleSponsor = '';
        subInfo.mayEditCoupleOrderId = '';
      }

      const part = [];
      if (this.multBuyParticipantCheckIds.length) {
        subInfo.mayEditCoupleOrderId = this.multBuyParticipantCheckIds.join(',');
        this.multBuyParticipantCheckIds.forEach((val) => {
          const obj = this.multBuyParticipant.find(v => v.hmcId === val);
          if (obj) {
            part.push(obj.username);
          }
          subInfo.mayEditCoupleOrderName = part.join(',');
        });
      } else {
        subInfo.mayEditCoupleOrderName = '';
        subInfo.mayEditCoupleOrderId = '';
      }
      subInfo.orderNo = this.orderData.orderNo;
      subInfo.recordMode = this.orderData.recordMode;
      subInfo.hmcId = this.orderData.hmcid;
      // subInfo.hmcId = 'Z0188893'
      subInfo.storeId = this.orderData.storeId;
      // subInfo.storeId = '8800117018'
      subInfo.storeName = this.orderData.storeName;
      subInfo.userId = this.orderData.userId;
      subInfo.userName = this.orderData.username;
      subInfo.userSex = this.orderData.userSex;
      subInfo.consigneeName = this.orderData.consigneeName;
      subInfo.consigneePhone = this.orderData.consigneePhone;
      subInfo.consigneeId = this.orderData.consigneeId;
      subInfo.microCode = this.orderData.microCode;
      subInfo.microName = this.orderData.microName;
      subInfo.channel = this.orderData.channel;
      subInfo.channelName = this.orderData.channelName;
      // subInfo.userPhone = '18675647364',
      subInfo.userPhone = this.orderData.userPhone;
      subInfo.dispatchProvinceId = this.orderData.dispatchProvinceId;
      subInfo.dispatchProvince = this.orderData.dispatchProvince;
      subInfo.dispatchCityId = this.orderData.dispatchCityId;
      subInfo.dispatchCity = this.orderData.dispatchCity;
      subInfo.dispatchAreaId = this.orderData.dispatchAreaId;
      subInfo.dispatchArea = this.orderData.dispatchArea;
      subInfo.dispatchAdd = this.orderData.dispatchAdd;
      subInfo.buyTime = this.orderData.createdTime;
      const dt = this.orderData.deliveryTime.substring(0, 16);
      subInfo.deliveryTime = dt;
      subInfo.orderType = this.orderData.orderType;
      subInfo.rightId = this.rightId;
      subInfo.rightName = this.rightName;
      subInfo.giftId = '';
      subInfo.giftName = '';
      subInfo.orderStatus = 0;
      subInfo.orderFlag = 0;// 订单标示，0-正常 1-换货 2-退货 订单来源，
      subInfo.orderSource = this.orderData.orderSource; // 1-扫码录单 2-手动录单 3-智慧触点认筹录单
      subInfo.sourceSn = this.orderData.sourceSn; // 来源编码，记录来源ID
      subInfo.remark = ''; // 备注，记录订单创建、订单修改原因等信息
      subInfo.rightsUserJson = this.rightsJson;
      subInfo.orderDetailSaveQoList = this.supplementProductList.concat(this.productList);
      this.subInfo = subInfo;

      if (type === 2) {
        const info = JSON.stringify(this.subInfo);
        /* 选择活动 */
        this.$router.push({
          name: 'Order.OrderFollowActivity',
          params: { orderInfo: info }
        });
      } else {
        if (this.orderNo !== '') {
          Toast.loading('保存中...');
          const sub = {}
          sub.orderDetailSaveQoList = this.supplementProductList;
          sub.rightsUserJson = this.rightsJson
          sub.rightName = this.rightName
          sub.rightId = this.rightId
          this.orderService.supplementOrderSubmit(sub, { orderFollowId: this.orderFollowId })
            .then((res) => {
              if (res.code === 1) {
                if (this.saveType === 1) {
                  Toast.succeed('订单暂存成功');
                  this.$router.go(-1);
                }
                if (this.saveType === 0) {
                  this.$router.push({
                    name: 'Order.OrderUploadInvoice',
                    params: { orderNo: this.orderNo }
                  });
                }
              }
            });
        }
      }
    },
    next() {
      /* 下一步 */
      if (this.productList.length === 0) {
        Toast.info('请选择产品');
      }
      this.saveType = 0;
      this.saveTemporary(2);
    },
    saveOrder() {

    },
    onDelete(index) {
      this.productList.splice(index, 1);
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.path === '/order/OrderConfirm') {
      next(false);
      if (this.$router.go(-4) === 'order.OrderSupplement') {
        this.$router.go(-5);
      } else {
        this.$router.go(-4);
      }
      return;
    }

    if (to.path === '/') { // 此处判断是如果返回上一层，你可以根据自己的业务更改此处的判断逻辑，酌情决定是否摧毁本层缓存。
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
    }
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

  .orderEntry-header-name {
    font-size: 28px;
  }

  .orderEntry-header-icon {
    font-size: 32px;
  }

  .orderEntry-user {
    background: #fff;
    margin-top: 16px;
    padding: 24px;
  }

  .orderEntry-user-head {
    display: flex;
    align-items: center;
    padding-top: 10px;

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

  .orderEntry-date1 {
    width: 400px !important;
  }
  .orderEntry-date {
    width: 260px;
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
  .orderEntry-user1 {
    background: #fff;
    padding: 0;
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
      /*width: 520px;*/
      flex-shrink: 0;
    }

    .orderConfirm-s {
      height: 80px;
      line-height: 80px;
      position: absolute;
      right: 24px;
    }
  }
</style>
