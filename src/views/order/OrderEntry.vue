<template xmlns:v-slot="">
  <div>
    <div class="orderEntry-header">
      <span class="orderEntry-header-name">门店：{{shopName}}</span>
      <!--<i class="iconfont icon-icon-question orderEntry-header-icon"></i>-->
    </div>
    <!-- <b-item
      class="mt16"
      title="顾客信息："
      :value="customerString"
      v-show="haveCustomer"
    > -->
    <div class="orderEntry-header-cus" v-show="haveCustomer">
      <span class="name mr16 name-ellipse">顾客信息：{{customerInfo.username}}</span>
      <span class="name mr16">{{customerInfo.mobile}}</span>
    </div>
    <b-fieldset
      class="mt16"
      :title="title"
      :showTitle="true"
    >
      <div class="orderEntry-user1">
        <div v-if="haveConsignee">
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
          <p class="orderEntry-user-address">
            {{consignee.address.provinceName}}{{consignee.address.cityName}}{{consignee.address.districtName}}{{consignee.address.street}}
          </p>
        </div>
        <div v-else>
          <button
            type="button"
            class="common-btn-primary w100per"
            @click="addNew()"
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
          :max-date="currentDate"
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
          v-if="multBuyParticipanters"
          class="orderEntry-multBuySponsor"
        >
          <span class="orderEntry-multBuySponsor-tips">参与人：</span>{{multBuyParticipanters}}
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
      class="mt16"
      title="选择可用的购机权益活动"
      :arrow="true"
      @click.native="selectActivity"
      v-show="orderSource !=='SGLD'"
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
      @consporConfirm="consporConfirm"
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
        v-model="multBuyParticipantCheckIds"
        @allCheck="particpantAll"
        @multiCheck="particpantClick"
        noPersonTips="当前门店不存在其他直销员"
        tips="套购参与人可查看套购订单不需要录入订单,但是需确定订单信息正确后自主申报销量。"
        :checkAll="true"
        type="checkbox"
      ></b-multbuy-check>
    </b-pop>
    <md-popup v-model="addUserShow" :mask-closable="false">
      <div class="popUserAdd">
        请完善顾客信息
        <p @click="addUserClick()" class="popConfirm">确定</p>
      </div>
    </md-popup>


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
  </div>
</template>

<script>
import {
  Button,
  Dialog,
  Icon,
  Popup,
  PopupTitleBar,
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
  name: 'OrderEntry',
  components: {
    [Toast.name]: Toast,
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
    [Popup.name]: Popup,
    [PopupTitleBar.name]: PopupTitleBar,
    [Button.name]: Button,
    [Icon.name]: Icon,
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
      // 是否详情模式
      isDetail: false,
      orderSource: '',
      orderInfo:{},
      sourceSn: '',
      orderFollowId: '',
      rightsList: [],
      rightsJson: '',
      // 门店名称
      shopName: '',
      recordMode: '',
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
      activityList: [
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
      addressList: [],
      // 套购pop show
      multBuyPopShow: false,
      // 套购发起人
      multBuySponsor: [],
      multBuySponsorCheckedIds: [],
      // 套购参与人
      multBuyParticipant: [],
      buyerList: [],
      // 参与人选中id
      multBuyParticipantCheckIds: [],
      orderNo: '',
      orderInfo: '',
      haveConsignee: false,
      title: '顾客信息：',
      mobile: '',
      region: '',
      handRegion: false,
      userParam: {},
      rightName: '',
      rightId: '',
      addUserShow: false,
      queryInstall: false,
      multyBuy: false,
      saveType: 1,
      isYJHX: false

    };
  },
  watch: {
    buyDate(newV, oldV) {
      console.log(this.userParam.hmcid);
      if (newV != '') {
        this.orderService.isAccordDeadline({}, {
          hmcId: this.userParam.hmcid,
          orderCrTime: newV,
          requestNoToast: true
        }).then((res) => {
          if (res.code == -1) {
            this.basicDialog1.open = true;
          }
        });
      }
    }
  },
  computed: {
    multBuyParticipanters() {
      /* 套购参与人文字 */
      const {
        multBuyParticipantCheckIds,
        multBuyParticipant
      } = this;
      let nameStr = '';
      if (multBuyParticipantCheckIds.length) {
        const names = multBuyParticipant.filter(v => multBuyParticipantCheckIds.find(id => id === v.hmcId));
        nameStr = names.map(v => v.username).join('、');
      }

      return nameStr;
    }
  },
  mounted() {

  },
  activated() {
    if (this.$route.params.customerConsigneeInfo && this.$route.params.customerConsigneeInfo.id) {
      this.orderFollowId = this.$route.params.customerConsigneeInfo.id;
      localStorage.setItem('orderFollowId', this.orderFollowId);
    }
    if (this.$route.query.temp) {
      let ID = '';
      const obj = JSON.parse(this.$route.query.temp);
      console.log(obj);
      if (obj.tel) {
        this.mobile = obj.tel;
        if (this.consignee.name) {
          if (obj.region === 'edit') {
            this.consignee.name = obj.customerInfo.consigneeUserName;
            this.consignee.phone = obj.customerInfo.consigneeUserPhone;
            this.consignee.sexCn = obj.customerInfo.sex = 1 ? '男士' : '女士';
            this.getAddressName(obj.customerInfo.province, obj.customerInfo.city, obj.customerInfo.district);
            this.consignee.address.street = obj.customerInfo.address;
          }
          this.queryCustomerAddressList();
          return;
        }
        this.queryCustomerDefault();
      }
      if (obj.product) {
        if (!obj.product.productBrandName) {
          return;
        }
        this.rightsList = [];
        this.rightsJson = '';
        this.rightName = '';
        this.rightId = '';
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
      if (obj.rightsJson) {
        const right = JSON.parse(obj.rightsJson);
        this.rightName = right.rightsName;
        this.rightId = right.rightsId;
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
    } else if (this.$route.params.region != 'hand') {
      if (localStorage.getItem('invoice') == 'true') {
        localStorage.setItem('invoice', '');
        return;
      }
      // 清空缓存组件数据
      this.productList = [];
      this.buyDate = '';
      this.deliveryTime = '';
      this.rightsList = [];
      this.customerInfo.username = this.$route.params.customerConsigneeInfo.username;
      this.customerInfo.mobile = this.$route.params.customerConsigneeInfo.mobile;
      this.customerInfo.userId = this.$route.params.customerConsigneeInfo.userId;
      this.userId = this.$route.params.customerConsigneeInfo.userId;
      this.recordMode = this.$route.params.customerConsigneeInfo.recordMode;
      this.mobile = this.customerInfo.mobile;
      this.queryCustomerDefault();
    }
  },
  created() {
    this.addressData = addressData;
    this.userParam = JSON.parse(localStorage.getItem('userinfo'));
    this.shopId = this.userParam.shopId;
    // 处理权益是否可选
    if (this.$route.params.region === 'hand') {
      this.handRegion = true;
    }
    if (this.$route.params.customerConsigneeInfo.freezeMsg) {
    	this.freezeMsg = this.$route.params.customerConsigneeInfo.freezeMsg;
      if (this.freezeMsg === 'Y') {
        this.handRegion = true;
      }
    }

    if (this.$route.params.region === 'new') {
      this.customerInfo = this.$route.params.customerConsigneeInfo;
      if (this.$route.params.customerConsigneeInfo.username) {
        this.haveCustomer = true;
      }
      this.mobile = this.$route.params.customerConsigneeInfo.mobile;
      this.queryCustomerDefault();
    }
    if (this.userParam.oldForNew === 1) {
      this.isYJHX = true;
      this.customerInfo.username = this.userParam.username;
      this.customerInfo.mobile = this.userParam.mobile;
      this.customerInfo.customerId = this.userParam.customerId;
      this.customerInfo.orderFollowId = this.userParam.orderFollowId;
      this.shopId = this.userParam.storeId;
      this.customerInfo.userId = '';
      this.haveCustomer = true;
      this.haveConsignee = false;
    }

    this.queryUserList();
    this.getUserStore();

    if (this.$route.params.customerConsigneeInfo.businessScenarios) {
      this.orderSource = this.$route.params.customerConsigneeInfo.businessScenarios;
    } else {
      this.orderSource = 'SGLD';
    }
    if (this.$route.params.customerConsigneeInfo.sourceSn) {
      this.sourceSn = this.$route.params.customerConsigneeInfo.sourceSn;
    } else {
      this.sourceSn = '';
    }
    if (this.$route.params.region === 'hand') {
      this.haveConsignee = false;
      this.haveCustomer = false;
    }
  },
  methods: {
    // 获取权益列表
    getActivityList() {
      const obj = {
        orderDetailSaveQoList :this.productList,
        orderNo:this.orderNo,
        rightsUserJson:this.rightsJson
      }
      this.rightsService.getRightsConfigInfo(obj, {}).then((res) => {
        if (res.code === 1) {
          if (res.data.length !== 0) {
            this.rightsList = res.data;
            ri.startTime = ri.startTime.substring(0,10)
            ri.endTime = ri.endTime.substring(0,10)
          }
        }
      });
    },
    isReportInstall(pro) {
      const orderDetailDtoList = [
        {
          hmcId: this.userParam.hmcid,
          storeId: this.shopId,
          productCode: pro.productCode,
          productBrand: pro.productBrand,
          productCategoryCode: pro.productCategoryCode
        }
      ];
      this.basicService.userInfo().then((res) => {
        this.orderService.isReportInstallNew({
          microCode: res.data.storeInfo.microCode,
          channel: res.data.storeInfo.schannel,
          orderDetailDtoList
        }, {}).then((res1) => {
          this.queryInstall = true;
          if (res1.msg === 'SUCCESS') {
            pro.isInstall = true;
          } else {
            pro.isInstall = false;
          }
          this.productList.push(pro);
        });
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
    addUserClick() {
      if (this.$route.params.region === 'new') {
        this.addUserShow = false;
        this.addNew(this.customerInfo);
        // this.address(this.customerInfo);
      }
    },
    indexOf(val) {
      for (let i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
      }
      return -1;
    },
    remove(val) {
      const index = this.indexOf(val);
      if (index > -1) {
        this.splice(index, 1);
      }
    },
    // 获取门店信息
    sponsorCheck(checkid) {
      // ;
      // this.multBuyParticipant = this.buyerList;
      // const temp = this.buyerList;
      // temp.forEach((v) => {
      //   if (v.hmcid === checkid) {
      //     this.multBuyParticipant.remove(v);
      //   }
      // });
    },
    particpantAll(checkedIds) {

    },
    particpantClick(checkids) {

    },
    confirmDeliveryTime(date) {
      this.deliveryTime = date;
    },
    getUserStore() {
      // this.shopId = '8800332156';
      this.productService.storeInfo(this.shopId).then((res) => {
        if (res.code === 1) {
          this.shopName = res.data.storeName;
        }
      });
    },

    // 生成订单号
    genarateOrderNum() {
      if (this.recordMode == '' || !this.recordMode) {
        this.recordMode = 'Haier';
      }
      this.orderService.generateOrderNo({}, { recordMode: this.recordMode },).then((res) => {
        if (res.code === 1) {
          this.orderNo = res.data;
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
            // if (this.haveCustomer) {
            // } else {
            if (res.data.consigneeUserName) {
              this.haveConsignee = true;
            } else {
              this.haveConsignee = false;
            }
            this.haveCustomer = true;
            this.customerInfo = res.data;
            // }
            this.title = '收件人信息';
            // this.consignee.address = res.data.province + res.data.city + res.data.district + res.data.address;
            this.getAddressName(res.data.province, res.data.city, res.data.district);
            this.consignee.address.street = res.data.address;
            this.consignee.phone = res.data.consigneeUserPhone;
            this.consignee.name = res.data.consigneeUserName;
            if (res.data.sex === 1) {
              this.consignee.sexCn = '男士';
            } else {
              this.consignee.sexCn = '女士';
            }
            this.consignee.sex = res.data.sex;
            // this.consignee.customerId = res.data.customerId;
            this.consignee.familyId = res.data.familyId;
            this.queryCustomerAddressList();
            this.genarateOrderNum();
          } else {
            // if (this.$route.params.region === 'new' || JSON.parse(this.$route.query.temp).smld) {
            //   this.addUserShow = true;
            // } else {
            //
            // }
          }
        }
      });
    },
    // 查询客户地址列表
    queryCustomerAddressList() {
      this.productService.customerAddressList(this.customerInfo.customerId).then((res) => {
        if (res.code === 1) {
          const Data = this.addressData.options;
          res.data.forEach((address) => {
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
          this.addressList = res.data;
          this.bUtil.analyzeAddressList(this.addressList);
        }
      });
    },
    // 暂存
    saveTemporary(type) {
      debugger;
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
      if (this.buyDate === '' && this.saveType == 0) {
        Toast.failed('请选择购买时间');
        return;
      }
      if (this.productList.length === 0 && this.saveType == 0) {
        Toast.failed('请选择产品');
        return;
      }
      for (let i = 0; i < this.productList.length; i++) {
        if (this.productList[i].productPrice == '' && this.saveType == 0) {
          Toast.failed('请输入产品价格');
          return;
        }
      }
      if (this.deliveryTime === '' && this.saveType === 0) {
        Toast.failed('请选择送货时间');
        return;
      }
      if (this.productList.length > 0) {
        for (let i = 0; i < this.productList.length; i++) {
          if (this.productList[i].productPrice === '') {
            Toast.failed('请输入产品价格');
            return;
          }
        }
        this.generateSubInfo(1);
      } else {
	      this.generateSubInfo(1);
      }
    },
    // 暂存
    // saveTemporary(type) {
    //   this.generateSubInfo(1);
    // },
    // 添加产品
    addProduct() {
      if (this.productList.length === 99) {
        Toast.info('最多可以录入99件产品');
        return;
      }

      /* 添加产品 */
      this.$router.push({
        name: 'Order.SearchProduct',
        params: { recordMode: this.recordMode }
      });
    },
    generateSubInfo(type) {
      if (!this.bUtil.isReportInstallFit(this.productList, this.deliveryTime) && this.saveType == 0) {
        return;
      }
      const subInfo = {};
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
      subInfo.storeId = this.shopId;
      subInfo.storeName = this.shopName;
      subInfo.userId = this.userId;
      // subInfo.userId = '123456789',
      // this.userParam.userId;
      // subInfo.userName = '张三',
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
      } else {
        if (this.rightsList.length == 0 && this.saveType == 0 && this.subInfo.orderSource != 'SGLD') {
          this.rightsService.queryOrderOptionalRights(this.subInfo, {
            pageNum: 0,
            pageSize: 10,
	          requestNoToast: true
          }).then((res) => {
            if (res.code != -1 && res.data.result.length > 0) {
              this.rightsName = res.data.result[0].rightsName;
              this.basicDialog.open = true;
            } else {
              if (this.orderNo !== '') {
                Toast.loading('保存中...');
                // if (!this.orderFollowId) {
                //   this.orderFollowId = localStorage.getItem('orderFollowId');
                // }
                this.orderService.createOrder(this.subInfo, { orderFollowId: this.orderFollowId })
                  .then((res) => {
                    if (res.code === 1) {
                      if (this.saveType === 1) {
                        Toast.succeed('订单暂存成功', 1000);
                        localStorage.setItem('confirm', 'caogao');
                        setTimeout(() => {
                          this.$router.go(-1);
                        }, 1000);
                      }
                      if (this.saveType === 0) {
                        this.$router.push({
                          name: 'Order.OrderUploadInvoice',
                          params: { orderNo: this.orderNo, orderFollowId: this.orderFollowId }
                        });
                      }
                    }
                  });
              }
            }
          });
        } else {
          if (this.orderNo !== '') {
            Toast.loading('保存中...');
            // if (!this.orderFollowId) {
            //   this.orderFollowId = localStorage.getItem('orderFollowId');
            // }
            if (this.handRegion) {
              this.orderService.createOrderForSGLD(this.subInfo, { orderFollowId: '' }).then((res) => {
                if (res.code === 1) {
                  if (this.saveType === 1) {
                    Toast.succeed('订单暂存成功', 1000);
                    localStorage.setItem('confirm', 'caogao');
                    setTimeout(() => {
                      this.$router.go(-1);
                    }, 1000);
                  }
                  if (this.saveType === 0) {
                    localStorage.setItem('orderFollowId', res.data);
                    this.$router.push({
                      name: 'Order.OrderUploadInvoice',
                      params: { orderNo: this.orderNo, orderFollowId: this.orderFollowId }
                    });
                  }
                }
              });
            } else {
              this.orderService.createOrder(this.subInfo, { orderFollowId: this.orderFollowId })
                .then((res) => {
                  if (res.code === 1) {
                    if (this.saveType === 1) {
                      Toast.succeed('订单暂存成功', 1000);
                      localStorage.setItem('confirm', 'caogao');
                      setTimeout(() => {
                        this.$router.go(-1);
                      }, 1000);
                    }
                    if (this.saveType === 0) {
                      this.$router.push({
                        name: 'Order.OrderUploadInvoice',
                        params: { orderNo: this.orderNo, orderFollowId: this.orderFollowId }
                      });
                      // this.$destroy();
                    }
                  }
                });
            }
          }
        }
      }
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
	    if (this.freezeMsg) {
		    if (this.freezeMsg == 'Y') {
			    Toast.failed('您的账户被冻结，无法选择权益');
			    return;
		    }
	    }
      this.generateSubInfo(2);
    },
    selectAddress(item) {
      this.addressPopShow = false;
      this.consignee.name = item.consigneeUserName;
      this.consignee.phone = item.consigneeUserPhone;
      this.consignee.address = item.consignee;
      this.consignee.address.street = item.address;
      this.consignee.familyId = item.id;
      if (item.sex === 1) {
        this.consignee.sexCn = '男士';
      } else {
        this.consignee.sexCn = '女士';
      }
      // // this.customerInfo = item;
      //
      // // delete this.customerInfo.consignee
    },
    addAddress() {
      // 添加新地址
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
    addNew() {
      if (!this.isYJHX && this.orderSource !== 'SGLD') {
        /* 添加顾客信息 */
        this.region = 'userAdd';
        this.$router.push({
          name: 'Order.AddAddress',
          params: {
            region: this.region,
            info: JSON.stringify(this.customerInfo),
            businessScenarios: this.orderSource
          }
        });
      } else {
        this.addAddress();
      }
    },
    changeAddress(item) {
      this.region = 'edit';
      if (this.addressList.length < 1) {
        this.region = 'add';
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
      // this.addressPopShow = false;
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
    async queryUserList() {
      const { code, data } = await this.basicService.userInfo();
      if (code === 1) {
        const {
          hmcId
        } = data;
        const user = {
          hmcId,
          username: data.username
        };
        const { code: userListCode, data: userListData } = await this.productService.userList(this.shopId);
        if (userListCode === 1) {
          if (userListData === '' || userListData === []) {
            this.multyBuy = false;
          } else {
            this.multyBuy = true;
          }
          userListData.forEach((item) => {
            if (item.hmcId === user.hmcId) {
              this.multBuySponsor.push(item);
            }
          });
          if (!this.multBuySponsor.length) {
            this.multBuySponsor.push(user);
          }
          this.multBuyParticipant = userListData.filter(v => v.hmcId !== hmcId);
        }
      }
    },
    // consporConfirm() {
    //   // this.saveTemporary(1);
    // },
    next() {
      /* 下一步 */
      this.saveType = 0;
      this.saveTemporary(2);
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
    inputChange() {
      this.rightId = '';
      this.rightName = '';
      this.rightsJson = '';
      this.rightsList = [];
    },
    // 模态框确认取消处理
    onBasicCancel() {
      this.basicDialog.open = false;
    },
    onBasicConfirm() {
      if (this.orderNo !== '') {
        Toast.loading('保存中...');
        // if (!this.orderFollowId) {
        //   this.orderFollowId = localStorage.getItem('orderFollowId');
        // }
        this.orderService.createOrder(this.subInfo, { orderFollowId: this.orderFollowId })
          .then((res) => {
            if (res.code === 1) {
              if (this.saveType === 1) {
                Toast.succeed('订单暂存成功', 1000);
                localStorage.setItem('confirm', 'caogao');
                setTimeout(() => {
                  this.$router.go(-1);
                }, 1000);
              }
              if (this.saveType === 0) {
                this.$router.push({
                  name: 'Order.OrderUploadInvoice',
                  params: { orderNo: this.orderNo, orderFollowId: this.orderFollowId }
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
    }
  },
  // beforeRouteLeave(to,from,next){
  //
  //   if(to.path === '/'){
  //     this.$router.go(-1)
  //   }
  //   next()
  // },
  beforeRouteLeave(to, from, next) {
    if (to.path === '/') { // 此处判断是如果返回上一层，你可以根据自己的业务更改此处的判断逻辑，酌情决定是否摧毁本层缓存。
      if (this.$vnode && this.$vnode.data.keepAlive) {
        if (this.$vnode.parent && this.$vnode.parent.componentInstance && this.$vnode.parent.componentInstance.cache) {
          if (this.$vnode.componentOptions) {
            const key = this.$vnode.key == null
              ? this.$vnode.componentOptions.Ctor.cid + (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '')
              : this.$vnode.key;
            const cache = this.$vnode.parent.componentInstance.cache;
            const keys = this.$vnode.parent.componentInstance.keys;
            for(let i = 0;i < keys.length;i ++){
              delete cache[keys[i]];
            }
            // if (cache[key]) {
            //   if (keys.length) {
            //     const index = keys.indexOf(key);
            //     if (index > -1) {
            //       keys.splice(index, 1);
            //     }
            //   }
            //   delete cache[key];
            // }
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
  .md-popup-box {
    z-index: 999999999 !important;
  }

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
    font-size: 28px;
    width: 100%;
    height: 80px;
    background: #fff;
    padding-left: 27px;
    padding-right: 25px;
    color: #333;
    margin-top: 20px;
    .name-ellipse{
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
    padding: 0;
  }

  .orderEntry-user-head {
    display: flex;
    align-items: center;
    padding-top: 20px;

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
      margin-top: 5px;
    }
  }

  .orderEntry-user-address {
    color: #666;
    font-size: 28px;
    line-height: 36px;
    margin-top: 28px;
    padding-bottom: 20px;
  }

  .orderEntry-date {
    width: 320px;
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

  .popUserAdd {
    text-align: center;
    font-size: 34px;
    color: #1969C6;
    width: 400px;
    height: 220px;
    background-color: white;
    border-radius: 20px;
    padding-top: 50px;
  }

  .popConfirm {
    color: #333333;
    margin-top: 50px;
    text-align: center;
    height: 70px;
    /*background-color: red;*/
    line-height: 70px;
    border-top: 1px solid lightgray;
  }

  .orderEntry-date1 {
    width: 400px;
  }

  .orderEntry-multBuySponsor {
    font-size: 24px;
    word-break: break-all;
    margin-bottom: 14px;
  }

  .orderEntry-multBuySponsor-tips {
    color: #F4A623;
  }
</style>
