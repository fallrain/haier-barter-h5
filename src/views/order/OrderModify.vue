<template xmlns:v-slot="">
  <div>
    <div class="orderEntry-header">
      <span class="orderEntry-header-name">门店：{{shopName}}</span>
      <!--<i class="iconfont icon-icon-question orderEntry-header-icon"></i>-->
    </div>
    <div class="orderEntry-header-cus">
      <span class="name mr16 name-ellipse">顾客信息：{{customerInfo.username}}</span>
      <span class="name mr16">{{customerInfo.mobile}}</span>
    </div>
    <b-fieldset
      class="mt16"
      title="收货人信息"
    >
      <div class="orderEntry-user1">
        <div>
          <div class="orderEntry-user-head">
            <span class="name mr16">收货人：{{consignee.name}}</span>
            <span class="sex mr16">{{consignee.sexCn}}</span>
            <i class="iconfont icon-dianhua mr16"></i>
            <span class="phone mr16">{{consignee.phone}}</span>
            <button
              type="button"
              class="common-btn-waring"
              @click="changeAddress(customerInfo)"
            >添加地址
            </button>
          </div>
          <p
            v-if="consignee.address"
            class="orderEntry-user-address"
          >
            {{consignee.address.provinceName}}{{consignee.address.cityName}}{{consignee.address.districtName}}{{consignee.address.street}}
          </p>
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
          @radioChange="radioChange"
        ></b-radio-item>
      </template>
    </b-item>
    <b-fieldset
      v-show="orderType"
      class="mt16"
      :title="'套购发起人：'+(multBuySponsor[0] && multBuySponsor[0].username) || ''"
      :showTitle="true"
    >
      <div>
        <div
          v-if="multBuyExceptHmc"
          class="orderEntry-multBuySponsor"
        >
          <span class="orderEntry-multBuySponsor-tips">参与人：</span>{{multBuyExceptHmc}}
        </div>
        <button
          type="button"
          class="common-btn-primary w100per"
          @click="selectSetBuyer"
        >选择套购参与人
        </button>
      </div>
    </b-fieldset>
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
            :content="item.isInstall"
            @onDel="onDelete"
            @inputChange="inputChange"
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
      title="已领优惠券："
    >
      <template
        v-slot:right=""
      >
        <div
          class="orderModify-coupon-btn-show"
          @click="showReceivedCoupons"
        >
          <span>查看</span> <i class="iconfont icon-youjiantou1"></i>
        </div>
      </template>
    </b-item>
    <b-item
      class="mt16"
      title="选择送货时间："
    >
      <template
        v-slot:right=""
      >
        <b-time-section-picker
          class="orderEntry-date1"
          slot="right"
          type="datetime"
          title="请选择日期"
          v-model="deliveryTime"
          @confirmDeliveryTime="confirmDeliveryTime"
        >
        </b-time-section-picker>
      </template>
    </b-item>
    <b-item
      v-if="orderSource !=='SGLD' && orderSource !=='YJHX'"
      class="mt16 select-activity"
      title="选择可用的购机权益活动"
      :arrow="true"
      @click.native="selectActivity"
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
    <div class="orderentry-address">
      <b-pop-address-list
        :show.sync="addressPopShow"
        :list="addressList"
        @addNew="addAddress"
        @editAddress="editAddress"
        @clickAddress="selectAddress"
      ></b-pop-address-list>
    </div>
    <b-pop
      :show.sync="multBuyPopShow"
    >
      <b-multbuy-check
        type="radio"
        title="套购发起人"
        :persons="multBuySponsor"
        v-model="multBuySponsorCheckedIds"
        @radioCheck="sponsorCheck"
        tips="套购发起人发起套购，并且统一录入用户销售订单"
      ></b-multbuy-check>
      <b-multbuy-check
        class="mt25"
        title="请选择套购参与人"
        :persons="multBuyParticipant"
        :hmicId="multBuySponsorCheckedIds"
        v-model="multBuyParticipantCheckIds"
        @allCheck="particpantAll"
        @multiCheck="particpantClick"
        tips="套购参与人可查看套购订单不需要录入订单,但是需确定订单信息正确后自主申报销量。"
        :checkAll="true"
        type="checkbox"
      ></b-multbuy-check>
    </b-pop>

    <md-dialog
      title=""
      :closable="true"
      v-model="basicDialog.open"
      :btns="basicDialog.btns"
    >
      该用户满足购机权益活动，您录单时未选权益活动，用户将无法获得购机礼品，请确定是否提交。
    </md-dialog>
    <md-dialog
      title=""
      :closable="true"
      v-model="basicDialog1.open"
      :btns="basicDialog1.btns"
    >
      该月销量闸口已关闭，你录入的该订单非本月订单，将无法拿到销量提成，请确定是否继续？
    </md-dialog>
    <md-dialog
      class="orderModify-coupon-dialog"
      :closable="false"
      v-model="couponDialog.open"
      :btns="couponDialog.btns"
    >
      <div>
        <ul
          v-if="receivedCoupons.length"
          class="orderModify-coupon-list"
        >
          <li
            class="orderModify-coupon-item"
            v-for="(item,index) in receivedCoupons"
            :key="index"
          >
            <span>{{item}}</span>
            <span class="orderModify-coupon-item-num">
              <span class="num">1</span> 张
            </span>
          </li>
        </ul>
        <div
          v-else
          class="orderModify-coupon-info"
        >
          暂无优惠券领用信息
        </div>
      </div>
    </md-dialog>
  </div>
</template>

<script>
import {
  Dialog,
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
  BRadioItem,
  BTimeSectionPicker
} from '@/components/form';
import {
  BMultbuyCheck
} from '@/components/business';
import addressData from '@/lib/address';

export default {
  name: 'OrderModify',
  components: {
    Toast,
    [Dialog.name]: Dialog,
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
    BTimeSectionPicker
  },
  data() {
    return {
      rightsName: '',
      basicDialog: { // 模态框  提示选择购机权益活动
        open: false,
        btns: [
          {
            text: '取消',
            handler: this.onBasicCancel,
          },
          {
            text: '确认提交',
            handler: this.onBasicConfirm,
          },
        ],
      },
      basicDialog1: { // 模态框  提示销量闸口
        open: false,
        btns: [
          {
            text: '取消',
            handler: this.onBasicCancel1,
          },
          {
            text: '确定',
            handler: this.onBasicConfirm1,
          },
        ],
      },
      // 模态框:已领优惠券
      couponDialog: {
        open: false,
        btns: [
          {
            text: '确定',
            handler: this.couponDialogConfirm,
          },
        ],
      },
      // 是否详情模式
      isDetail: false,
      // 门店名称
      shopName: '',
      haveCustomer: false,
      currentDate: new Date(),
      pattern: 'yyyy-MM-dd hh:mm',
      customerString: '',
      // 收货人信息
      consignee: {},
      customerInfo: {},
      // 订单类型单选
      orderTypes: [
        {
          key: 0,
          value: '单品'
        },
        {
          key: 1,
          value: '套购'
        }
      ],
      // 订单类型
      orderType: 0,
      // 购机时间
      buyDate: '',
      subInfo: {},
      // /送货时间
      deliveryTime: '',
      // 产品列表
      productList: [],
      // 活动列表
      rightsList: [
        // {
        //   id: 1,
        //   activityName: '6月场景套权益昆明小微',
        //   inf: '满10000元送7500积分',
        //   num: 33
        // },
        // {
        //   id: 2,
        //   activityName: '6月场景套权益昆明小微',
        //   inf: '满10000元送7500积分',
        //   num: 21
        // }
      ],
      handRegion: false,
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
      addressList: [],
      // 套购pop show
      multBuyPopShow: false,
      // 套购发起人
      multBuySponsor: [],
      multBuySponsorCheckedIds: [],
      // 套购参与人
      multBuyParticipant: [],
      // 参与人选中id
      multBuyParticipantCheckIds: [],
      multBuyExceptHmc: '', // 套购参与人除去直销员本人
      multBuyExceptHmcId: '', // 套购参与人除去直销员本人
      orderNo: '',
      title: '顾客信息：',
      mobile: '',
      region: '',
      hmcId: '',
      rightsList: [],
      subInfo: {},
      rightsJson: '',
      userParam: {},
      orderSource: '',
      orderFollowId: '',
      recordMode: '',
      sourceSn: '',
      queryInstall: false,
      isInstall: false,
      // 保存类型，1:暂存 0:下一步
      saveType: 1,
      isProduct: false,
      isProductList: [],
      // 已领优惠券
      receivedCoupons: [],
    };
  },
  computed: {},
  watch: {
    buyDate(newV, oldV) {
      this.orderService.isAccordDeadline({}, {
        hmcId: this.userParam.hmcid,
        orderCrTime: newV,
        requestNoToast: true
      }).then((res) => {
        if (res.code == -1) {
          this.basicDialog1.open = true;
        }
      });
    },
    multBuyParticipantCheckIds(val) {
      console.log(val);
      const arr = [];
      for (let i = 0; i < this.multBuyParticipant.length; i++) {
        for (let j = 0; j < val.length; j++) {
          if (val[j] == this.multBuyParticipant[i].hmcId && val[j] !== this.multBuySponsorCheckedIds[0]) {
            arr.push(this.multBuyParticipant[i].username);
          }
        }
      }
      if (arr.length > 0) {
        this.multBuyExceptHmc = arr.join('、');
      }
      if (val.length == 0) {
        this.multBuyExceptHmc = '';
      }
    }
  },
  mounted() {
    //
    //    if(this.$route.query){
    // const address = this.$route.query.temp
    //   console.log('tag', address)
    //    }
  },
  activated() {
    if (this.$route.query.temp) {
      let ID = '';
      const obj = JSON.parse(this.$route.query.temp);
      if (obj.tel) {
        if (obj.region === 'edit') {
          this.consignee.name = obj.customerInfo.consigneeUserName;
          this.consignee.phone = obj.customerInfo.consigneeUserPhone;
          this.consignee.sexCn = obj.customerInfo.sex = 1 ? '男士' : '女士';
          this.getAddressName(obj.customerInfo.province, obj.customerInfo.city, obj.customerInfo.district);
          this.consignee.address.street = obj.customerInfo.address;
        }
        this.queryCustomerAddressList();
      }
      if (obj.rightsJson) {
        const right = JSON.parse(obj.rightsJson);
        const rightsPro = JSON.parse(obj.rightsJson).rightName.split(',');

        this.rightsJson = obj.rightsJson;
        this.isDetail = true;
        if (rightsPro.length > 0 && rightsPro[0] !== '') {
          this.getActivityList();
        } else {
          this.rightsList = [];
          this.rightsJson = '';
          this.rightName = '';
          this.rightId = '';
        }
      } else {
        this.rightsList = [];
        this.rightsJson = '';
        this.rightName = '';
        this.rightId = '';
      }
      if (obj.product) {
        if (!obj.product.productGroupName) {
          return;
        }
        this.rightsList = [];
        this.rightsJson = '';
        this.rightName = '';
        this.rightId = '';
        this.isProduct = true;
        this.isProductList = this.$route.params.productList;
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
    this.addressData = addressData;
    this.orderNo = this.$route.params.orderNo;
    if (this.$route.params.orderFollowId) {
      this.orderFollowId = this.$route.params.orderFollowId;
    } else {
      Toast.failed('异常：待办id为空');
      return;
    }
    if (this.$route.params.freezeMsg) {
      if (this.$route.params.freezeMsg == 'Y') {
        this.handRegion = true;
      }
    }
    if (this.$route.params.orderFollowId) {
      this.orderFollowId = this.$route.params.orderFollowId;
    } else if (!this.$route.params.orderFollowId && this.$route.params.region === 'continue') {
      Toast.failed('异常：待办id为空');
      return;
    } else {
      this.orderFollowId = localStorage.getItem('orderFollowId');
    }
    // if (this.$route.params.freezeMsg) {
    //   if (this.$route.params.freezeMsg == 'Y') {
    //     this.handRegion = true;
    //   }
    // }
    this.userParam = JSON.parse(localStorage.getItem('userinfo'));
    if (this.orderNo) {
      this.getData();
    }
  },
  methods: {
    showReceivedCoupons() {
      /* 查看已领取的优惠券 */
      const hasFridge = this.productList.find(v => v.productCategoryCode === 'AA');
      if (hasFridge) {
        const userPhone = this.customerInfo.mobile;
        if (!userPhone) {
          this.$dialog.alert({
            content: '请添加顾客'
          });
          return;
        }
        this.orderService.queryAdjCouponInfo({
          userPhone
        }).then(({ code, data }) => {
          if (code === 1) {
            this.couponDialog.open = true;
            this.receivedCoupons = data[0].service.split(',') || [];
          }
        });
      } else {
        this.$dialog.alert({
          content: '暂无可用消费券'
        });
      }
    },
    // 获取权益列表
    getActivityList() {
      const obj = {
        orderDetailSaveQoList: this.productList,
        orderNo: this.orderNo,
        rightsUserJson: this.rightsJson
      };
      this.rightsService.getRightsConfigInfo(obj, {}).then((res) => {
        if (res.code === 1) {
          if (res.data.length !== 0) {
            this.rightsList = res.data;
            this.rightsList.forEach((ri) => {
              ri.startTime = ri.startTime.substring(0, 10);
              ri.endTime = ri.endTime.substring(0, 10);
            });
          }
        }
      });
    },
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
      let time = date;
      time = time.substring(0, 10).replace(/-/g, '/');
      const deT = new Date(time).getTime();
      let buytime = this.buyDate;
      buytime = buytime.substring(0, 10).replace(/-/g, '/');
      const buyT = new Date(buytime).getTime();
      if (deT < buyT) {
        Toast.info('送货时间不能早于购买时间');
        this.deliveryTime = '';
        return;
      }
      this.deliveryTime = date;
    },
    isReportInstall(pro, index) {
      const orderDetailDtoList = [
        {
          hmcId: this.userParam.hmcid,
          storeId: this.userParam.shopId,
          productCode: pro.productCode,
          productBrand: pro.productBrand,
          productCategoryCode: pro.productCategoryCode
        }
      ];
      this.orderService.isReportInstallNew({
        microCode: this.microCode,
        channel: this.channel,
        orderDetailDtoList
      }, {}).then((res) => {
        this.queryInstall = true;
        if (res.msg == 'SUCCESS') {
          pro.isInstall = true;
        } else {
          pro.isInstall = false;
        }
        console.log(this.productList);
        if (typeof (index) !== 'undefined') {
          this.productList[index].isInstall = pro.isInstall;
        } else {
          this.productList.push(pro);
          this.isProduct = true;
        }
        console.log(this.productList);
      });
    },
    getData() {
      this.orderService.queryOrderInfoByOrderNo({}, { orderNo: this.orderNo }).then((response) => {
        if (response.code === 1) {
          const resData = response.data;
          this.shopName = resData.storeName;
          this.rightId = resData.rightId;
          this.rightsJson = resData.rightsUserJson;

          this.rightName = resData.rightName;
          this.consignee.name = resData.consigneeName;
          this.customerInfo.username = resData.userName;
          this.customerInfo.customerId = resData.userId;
          this.customerInfo.mobile = resData.userPhone;
          this.customerInfo.familyId = resData.id;

          this.mobile = resData.userPhone;
          this.phone = resData.userPhone;
          this.hmcId = resData.hmcId;
          this.microCode = resData.microCode;
          this.channel = resData.channel;
          this.consignee.phone = resData.consigneePhone;
          this.consignee.sex = resData.userSex;
          this.consignee.address = {};
          this.consignee.address.provinceName = resData.dispatchProvince;
          this.consignee.address.cityName = resData.dispatchCity;
          this.consignee.address.districtName = resData.dispatchArea;
          this.consignee.address.street = resData.dispatchAdd;
          this.buyDate = resData.buyTime;
          this.orderType = resData.orderType;
          this.deliveryTime = resData.deliveryTime.replace(/-/g, '/');
          const dt = new Date(Date.parse(this.deliveryTime));
          const y = dt.getFullYear();
          const m = (dt.getMonth() + 1) < 10 ? `0${dt.getMonth() + 1}` : (dt.getMonth() + 1);// 获取当前月份的日期，不足10补0
          const d = dt.getDate() < 10 ? `0${dt.getDate()}` : dt.getDate();
          const h = dt.getHours() < 10 ? `0${dt.getHours()}` : dt.getHours();
          const ha = (dt.getHours() + 1) < 10 ? `0${dt.getHours() + 1}` : (dt.getHours() + 1);
          const time = `${y}-${m}-${d} ${h}:00` + `-${ha}:00`;
          this.deliveryTime = time;
          this.createdTime = resData.createdTime;
          this.orderSource = resData.orderSource;
          // this.orderFollowId = resData.id;
          this.sourceSn = resData.sourceSn;
          this.recordMode = resData.recordMode;
          this.queryUserList(resData.storeId);
          this.multBuySponsor = [
            {
              hmcId: resData.coupleSponsor,
              username: resData.coupleSponsorName
            }
          ]; // 套购发起人赋值
          this.multBuyParticipant = resData.mayEditCoupleOrderName.split(','); // 套购参与人赋值
          this.multBuyParticipantCheckIds = resData.mayEditCoupleOrderId.split(','); // 套购参与人赋值
          console.log(this.multBuyParticipant);
          console.log(this.multBuyParticipantCheckIds);
          // 套购参与人中去除直销员信息
          const hmc_index = resData.mayEditCoupleOrderId.split(',').indexOf(resData.coupleSponsor);
          const arr = resData.mayEditCoupleOrderName.split(',');
          arr.splice(hmc_index, 1);
          this.multBuyExceptHmc = arr.join('、');
          this.multBuyExceptHmcId = resData.mayEditCoupleOrderId.split(',').splice(hmc_index, 1);
          console.log(this.multBuyExceptHmc);
          if (!this.isProduct) {
            if (resData.orderDetailDtoList.length !== 0) {
              this.productList = resData.orderDetailDtoList;
              this.productList.forEach((item, index) => {
                if (item.installTime) {
                  item.isInstall = true;
                } else {
                  this.isReportInstall(item, index);
                }
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
          } else {
            this.productList = this.isProductList.concat(this.productList);
          }
          if (!this.isDetail) {
            if (resData.rightsUserJson) {
              this.rightsJson = resData.rightsUserJson;
              this.getActivityList();
            }
          }
          this.queryCustomerDefault();
        }
      });
    },
    getAddressName(province, city, district) {
      this.consignee.address = {};
      const Data = this.addressData.options;

      Data.forEach((p) => {
        if (province === p.value) {
          this.consignee.address.provinceName = p.label;
          p.children.options.forEach((c) => {
            if (city === c.value) {
              this.consignee.address.cityName = c.label;
              c.children.options.forEach((d) => {
                if (district === d.value) {
                  this.consignee.address.districtName = d.label;
                }
              });
            }
          });
        }
      });
    },
    // 查询客户信息及默认地址
    queryCustomerDefault() {
      this.productService.deafaultCustomerAddress(this.mobile).then((res) => {
        if (res.code === 1) {
          if (res.data !== null) {
            this.customerInfo = res.data;
            this.consignee.familyId = res.data.familyId;
            if (res.data.sex === 1) {
              this.consignee.sexCn = '男士';
            } else {
              this.consignee.sexCn = '女士';
            }
            this.consignee.sex = res.data.sex;
            this.consignee.customerId = res.data.customerId;
            this.queryCustomerAddressList();
          }
        }
      });
    },
    sponsorCheck(checkid) {

    },
    particpantAll(checkedIds) {

    },
    particpantClick(checkids) {

    },
    // 获取门店信息
    getUserStore() {
      // this.shopId = '8800332156';
      this.shopId = this.userParam.shopId;
      this.productService.storeInfo(this.shopId).then((res) => {
        if (res.code === 1) {
          this.shopName = res.data.storeName;
        }
      });
    },

    // 查询客户地址列表
    queryCustomerAddressList() {
      this.productService.customerAddressList(this.customerInfo.customerId).then((res) => {
        if (res.code === 1) {
          this.addressList = res.data;
          const Data = this.addressData.options;
          this.addressList.forEach((address) => {
            address.consignee = {};
            Data.forEach((p) => {
              if (address.province === p.value) {
                address.consignee.provinceName = p.label;
                p.children.options.forEach((c) => {
                  if (address.city === c.value) {
                    address.consignee.cityName = c.label;
                    c.children.options.forEach((d) => {
                      if (address.district === d.value) {
                        address.consignee.districtName = d.label;
                      }
                    });
                  }
                });
              }
            });
          });
          this.bUtil.analyzeAddressList(this.addressList);
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
      if (!this.customerInfo.mobile) {
        Toast.failed('请添加顾客信息');
        return;
      }
      if (!this.consignee.phone || this.consignee.phone == '') {
        Toast.failed('请添加收货信息');
        return;
      }
      // 下一步需要验证
      if (this.saveType === 0) {
        if (this.buyDate === '') {
          Toast.failed('请选择购买时间');
          return;
        }
        if (this.productList.length === 0) {
          Toast.failed('请选择产品');
          return;
        }
        for (let i = 0; i < this.productList.length; i++) {
          if (this.productList[i].productPrice == '') {
            Toast.failed('请输入产品价格');
            return;
          }
        }
        if (this.deliveryTime === '') {
          Toast.failed('请选择送货时间');
          return;
        }
      }

      let time = this.deliveryTime;
      time = time.substring(0, 10).replace(/-/g, '/');
      const deT = new Date(time).getTime();
      let buytime = this.buyDate;
      buytime = buytime.substring(0, 10).replace(/-/g, '/');
      const buyT = new Date(buytime).getTime();
      if (deT < buyT) {
        Toast.info('送货时间不能早于购买时间');
        this.deliveryTime = '';
        return;
      }
      if (this.productList.length > 0) {
        for (let i = 0; i < this.productList.length; i++) {
          if (this.productList[i].productPrice === '') {
            Toast.failed('请输入产品价格');
            return;
          }
        }
      }
      this.generateSubInfo(1);
    },
    // 添加产品
    addProduct() {
      if (this.productList.length === 99) {
        Toast.info('最多可以录入99件产品');
        return;
      }
      /* 添加产品 */
      this.$router.push({
        name: 'Order.SearchProduct',
        params: {
          orderNo: this.orderNo,
          productList: this.productList,
          recordMode: this.recordMode
        }
      });
    },
    inputChange() {
      this.rightId = '';
      this.rightName = '';
      this.rightsJson = '';
      this.rightsList = [];
    },
    selectActivity() {
      if (this.productList.length === 0) {
        Toast.info('请选择产品');
        return;
      }

      for (let i = 0; i < this.productList.length; i++) {
        if (this.productList[i].productPrice === '') {
          Toast.failed('请输入产品价格');
          return;
        }
      }
      /* 选择活动 */
      this.generateSubInfo(2);
    },
    async generateSubInfo(type) {
      /* 生成订单信息 */
      /*
          * @type 1:生成订单信息并保存 2：生成订单信息并跳转选择权益界面，查询权益
          *
          * */
      if (!this.bUtil.isReportInstallFit(this.productList, this.deliveryTime) && this.saveType == 0) {
        return;
      }
      const subInfo = {};
      // multBuyParticipantCheckIds
      // if (this.multBuySponsorCheckedIds.length) {
      //   subInfo.coupleSponsor = this.multBuySponsorCheckedIds[0];
      //   const obj = this.multBuySponsor.find(v => v.hmcId === this.multBuySponsorCheckedIds[0]);
      //   subInfo.coupleSponsorName = obj.username;
      // } else {
      //   subInfo.coupleSponsor = '';
      //   subInfo.mayEditCoupleOrderId = '';
      // }
      if (this.multBuySponsor.length > 0) {
        subInfo.coupleSponsor = this.multBuySponsor[0].hmcId;
        subInfo.coupleSponsorName = this.multBuySponsor[0].username;
      } else {
        subInfo.coupleSponsor = '';
        subInfo.mayEditCoupleOrderId = '';
      }
      // multBuySponsor
      const part = [];
      const partId = this.multBuyParticipantCheckIds;
      if (partId.length) {
        const index = partId.indexOf(this.multBuySponsor[0].hmcId);
        if (index > -1) {
          partId.splice(index, 1);
        }
        // subInfo.mayEditCoupleOrderId = this.multBuyParticipantCheckIds.join(',');
        partId.forEach((val) => {
          const obj = this.multBuyParticipant.find(v => v.hmcId === val);
          if (obj) {
            part.push(obj.username);
          }
          // subInfo.mayEditCoupleOrderName = part.join(',');
        });
        // this.multBuyParticipantCheckIds.push(this.multBuySponsor[0].hmcId);
      }
      if (partId.indexOf(this.multBuySponsor[0].hmcId) < 0) {
        partId.push(this.multBuySponsor[0].hmcId);
        part.push(this.multBuySponsor[0].username);
      }
      if (this.rightsJson) {
        const tempJson = JSON.parse(this.rightsJson);
        if (tempJson.rightsUserInterestsDetailsDTO.length === 0) {
          this.rightsJson = '';
        }
      }

      subInfo.mayEditCoupleOrderId = partId.join(',');
      subInfo.mayEditCoupleOrderName = part.join(',');
      subInfo.orderNo = this.orderNo;
      subInfo.recordMode = this.recordMode;
      subInfo.hmcId = this.userParam.hmcid;
      // subInfo.hmcId = 'Z0188893'
      subInfo.storeId = this.userParam.shopId;
      // subInfo.storeId = '8800117018'
      subInfo.storeName = this.shopName;
      subInfo.userId = this.customerInfo.userId;
      subInfo.userName = this.customerInfo.username;
      subInfo.userSex = this.consignee.sex;
      subInfo.consigneeName = this.consignee.name;
      subInfo.consigneePhone = this.consignee.phone;
      subInfo.consigneeId = this.consignee.familyId;
      subInfo.microCode = this.customerInfo.microCode;
      subInfo.microName = this.customerInfo.microName;
      subInfo.channel = this.customerInfo.channel;
      subInfo.channelName = this.customerInfo.channelName;
      // subInfo.userPhone = '18675647364',
      subInfo.userPhone = this.customerInfo.mobile;
      subInfo.dispatchProvinceId = this.customerInfo.province;
      subInfo.dispatchProvince = this.consignee.address.provinceName;
      subInfo.dispatchCityId = this.customerInfo.city;
      subInfo.dispatchCity = this.consignee.address.cityName;
      subInfo.dispatchAreaId = this.customerInfo.district;
      subInfo.dispatchArea = this.consignee.address.districtName;
      subInfo.dispatchAdd = this.consignee.address.street;
      subInfo.buyTime = this.buyDate;
      const dt = this.deliveryTime.substring(0, 16);
      subInfo.deliveryTime = dt;
      subInfo.orderType = this.orderType;
      subInfo.rightId = this.rightId;
      subInfo.rightName = this.rightName;
      subInfo.giftId = '';
      subInfo.giftName = '';
      subInfo.orderStatus = 0;
      subInfo.orderFlag = 0;// 订单标示，0-正常 1-换货 2-退货 订单来源，
      subInfo.orderSource = this.orderSource; // 1-扫码录单 2-手动录单 3-智慧触点认筹录单
      subInfo.sourceSn = this.sourceSn; // 来源编码，记录来源ID
      subInfo.remark = ''; // 备注，记录订单创建、订单修改原因等信息
      subInfo.rightsUserJson = this.rightsJson;

      subInfo.orderDetailSaveQoList = this.productList;
      this.subInfo = subInfo;
      if (type === 2) {
        const info = JSON.stringify(this.subInfo);
        /* 选择活动 */
        // this.$router.push({
        //   name: 'Order.OrderFollowActivity',
        //   params: { orderInfo: info }
        // });
        this.$router.push({
          name: 'Order.OrderRights',
          params: { orderInfo: info }
        });
        // this.$router.push({
        //   name: 'Order.ResidueGift',
        // });
      } else {
        // 检查重复录单
        const { code, msg } = await this.orderService.checkRepeatCreateOrder(this.subInfo);
        if (code === 1) {
          this.submitOrder();
        } else {
          Dialog.confirm({
            content: msg,
            confirmText: '确认提交',
            onConfirm: () => {
              this.submitOrder();
            }
          });
        }
      }
    },
    submitOrder() {
      /* 提交订单 */
      const orderSource = this.subInfo.orderSource;
      if (this.rightsList.length === 0 && this.saveType === 0 && orderSource !== 'SGLD' && orderSource !== 'YJHX') {
        this.rightsService.queryOrderOptionalRights(this.subInfo, {
          pageNum: 0,
          pageSize: 10,
          requestNoToast: true
        })
          .then((res) => {
            if (res.code === 1 && res.data.result.length > 0) {
              this.rightsName = res.data.result[0].rightsName;
              this.basicDialog.open = true;
            } else {
              if (this.orderNo !== '') {
                // if (!this.orderFollowId) {
                //   this.orderFollowId = localStorage.getItem('orderFollowId');
                // }
                this.orderService.createOrder(this.subInfo, { orderFollowId: this.orderFollowId })
                  .then((createOrderRes) => {
                    if (createOrderRes.code === 1) {
                      if (this.saveType === 1) {
                        Toast.succeed('订单暂存成功');
                        this.$router.replace({
                          name: 'Order.OrderFollowSearch',
                          params: {}
                        });
                        // this.$router.go(-1);
                      }
                      if (this.saveType === 0) {
                        localStorage.setItem('orderFollowId', this.orderFollowId);
                        this.$router.push({
                          name: 'Order.OrderUploadInvoice',
                          params: {
                            orderNo: this.orderNo,
                            subInfo: this.subInfo
                          }
                        });
                      }
                    }
                  });
              }
            }
          });
      } else {
        if (this.orderNo !== '') {
          // if (!this.orderFollowId) {
          //   this.orderFollowId = localStorage.getItem('orderFollowId');
          // }
          this.orderService.createOrder(this.subInfo, { orderFollowId: this.orderFollowId })
            .then((res) => {
              if (res.code === 1) {
                if (this.saveType === 1) {
                  Toast.succeed('订单暂存成功');
                  localStorage.setItem('confirm', 'caogao');
                  // this.$router.go(-1);
                  this.$router.replace({
                    name: 'Order.OrderFollowSearch',
                    params: {}
                  });
                }
                if (this.saveType === 0) {
                  this.$router.push({
                    name: 'Order.OrderUploadInvoice',
                    params: {
                      orderNo: this.orderNo,
                      subInfo: this.subInfo
                    }
                  });
                  // this.$destroy();
                }
              }
            });
        }
      }
    },
    selectAddress(item) {
      debugger;
      this.customerInfo.province = item.province;
      this.customerInfo.city = item.city;
      this.customerInfo.district = item.district;
      // 修改收货人地址
      this.consignee.address.provinceName = item.consignee.provinceName;
      this.consignee.address.cityName = item.consignee.cityName;
      this.consignee.address.districtName = item.consignee.districtName;
      this.consignee.address.street = item.address;
      this.consignee.customerId = item.customerId;
      this.consignee.name = item.consigneeUserName;
      this.consignee.phone = item.consigneeUserPhone;
      this.consignee.familyId = item.id;
      this.consignee.sex = item.sex;
      if (item.sex == 1) {
        this.consignee.sexCn = '男士';
      } else if (item.sex == 2) {
        this.consignee.sexCn = '女士';
      }
      // this.customerInfo = item;
    },
    addAddress() {
      /* 添加新地址 */
      this.region = 'add';
      this.$router.push({
        name: 'Order.AddAddress',
        params: {
          region: this.region,
          info: JSON.stringify(this.customerInfo),
          businessScenarios: this.orderSource
        }
      });
    },
    changeAddress(item) {
      item.username = this.customerInfo.username;
      item.mobile = this.customerInfo.mobile;
      item.familyId = this.customerInfo.familyId;
      this.region = 'edit';
      if (this.addressList.length < 1) {
        this.$router.push({
          name: 'Order.AddAddress',
          params: {
            region: this.region,
            info: JSON.stringify(item)
          }
        });
      } else {
        this.showAddressList();
      }
    },
    editAddress(info) {
      console.log(this.addressPopShow);
      delete info.familyC;
      info.username = this.customerInfo.username;
      info.mobile = this.customerInfo.mobile;
      delete info.familyC;
      this.region = 'edit';
      this.$router.push({
        name: 'Order.AddAddress',
        params: {
          region: this.region,
          info: JSON.stringify(info)
        }
      });
    },
    showAddressList() {
      /* 展示选择用户pop */
      this.addressPopShow = true;
    },
    queryUserList(storeId) {
      this.basicService.userInfo().then((res) => {
        const user = {
          hmcId: res.data.hmcId,
          username: res.data.username
        };
        this.productService.userList(storeId).then((res) => {
          if (res.code === 1) {
            console.log(res);
            this.multBuyParticipant = res.data;
            res.data.forEach((item, index) => {
              if (item.hmcId == this.hmcId) {
                // this.multBuySponsor.push(item);
                this.multBuyParticipant.splice(index, 1);
              }
            });
            if (this.multBuySponsor.length == 0) {
              this.multBuySponsor.push(user);
            }
            this.multBuyParticipant = res.data;
          }
        });
      });
    },
    next() {
      /* 下一步 */
      this.saveTemporary(0);
    },
    saveOrder() {

    },
    onDelete(index) {
      this.productList.splice(index, 1);
      this.rightsList = [];
      this.rightsJson = '';
      this.rightName = '';
      this.rightId = '';
    },
    // 模态框确认取消处理
    onBasicCancel() {
      this.basicDialog.open = false;
    },
    onBasicConfirm() {
      if (this.orderNo !== '') {
        // if (!this.orderFollowId) {
        //   this.orderFollowId = localStorage.getItem('orderFollowId');
        // }
        this.orderService.createOrder(this.subInfo, { orderFollowId: this.orderFollowId })
          .then((res) => {
            if (res.code === 1) {
              if (this.saveType === 1) {
                Toast.succeed('订单暂存成功');
                localStorage.setItem('confirm', 'caogao');
                this.$router.replace({
                  name: 'Order.OrderFollowSearch',
                  params: {}
                });
                // this.$router.go(-1);
              }
              if (this.saveType === 0) {
                this.$router.push({
                  name: 'Order.OrderUploadInvoice',
                  params: {
                    orderNo: this.orderNo,
                    subInfo: this.subInfo
                  }
                });
              }
            }
          });
      }
      this.basicDialog.open = false;
    },
    onBasicCancel1() {
      this.basicDialog1.open = false;
      this.$router.go(-1);
    },
    onBasicConfirm1() {
      this.basicDialog1.open = false;
    },
    couponDialogConfirm() {
      this.couponDialog.open = false;
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.path === '/order/OrderConfirm') {
      next(false);
      if (this.$router.go(-4) === 'order.OrderModify') {
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

            for (let i = 0; i < keys.length; i++) {
              delete cache[keys[i]];
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

  .orderEntry-header-cus {
    display: flex;
    align-items: center;
    width: 100%;
    height: 80px;
    background: #fff;
    padding-left: 27px;
    padding-right: 25px;
    color: #333;
    margin-top: 20px;

    .name-ellipse {
      width: 36vw;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }

  .orderEntry-header-name {
    font-size: 28px;
  }

  .orderEntry-header-icon {
    font-size: 32px;
  }

  .orderEntry-user1 {
    background: #fff;
    padding: 24px;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .orderEntry-user-head {
    display: flex;
    align-items: center;

    .name {
      color: #333;
      font-size: 28px;
      width: 32vw;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
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

  .orderEntry-multBuySponsor {
    font-size: 24px;
    word-break: break-all;
    margin-bottom: 14px;
  }

  .orderEntry-multBuySponsor-tips {
    color: #F4A623;
  }

  .select-activity {
    border-bottom: 0.5px solid #F8F8F8;
  }
</style>
