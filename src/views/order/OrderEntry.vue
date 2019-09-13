<template xmlns:v-slot="">
  <div>
    <div class="orderEntry-header">
      <span class="orderEntry-header-name">门店：{{shopName}}</span>
      <i class="iconfont icon-icon-question orderEntry-header-icon"></i>
    </div>
    <!-- <b-item
      class="mt16"
      title="顾客信息："
      :value="customerString"
      v-show="haveCustomer"
    > -->
    <div class="orderEntry-header-cus"  v-show="haveCustomer">
            <span class="name mr16">顾客信息:{{customerInfo.username}}</span>
            <span class="name mr16">{{customerInfo.mobile}}</span>
    </div>
    <b-fieldset
      class="mt16"
      :title="title"
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
              @click="changeAddress(customerInfo)"
            >更改地址
            </button>
          </div>
          <p class="orderEntry-user-address">
            {{customerInfo.address}}
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
          type="datetime"
          title="请选择日期"
          :pattern="pattern"
          :defaultDate="deliveryTime"
          :min-date="currentDate"
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
        @addNew="addNew"
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
        title="请选择套购发起人"
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
      currentDate: new Date(),
      pattern: 'yyyy-MM-dd hh:mm',
      customerString: '',
      // 收货人信息
      consignee: {
        /* name: '',
              sex: '男士',
              phone: '15067543689' */
      },
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
      orderType: 2,
      // 购机时间
      buyDate: '',
      subInfo: {},
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
      buyerList:[],
      // 参与人选中id
      multBuyParticipantCheckIds: [],
      orderNo: '',
      haveConsignee: false,
      title: '顾客信息：',
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
      var ID = ''
      const obj = JSON.parse(this.$route.query.temp);
      if (obj.tel) {
        this.mobile = obj.tel;
        this.queryCustomerDefault();
      }
      if (obj.product) {
        debugger
        if(!obj.product.productBrandName){
          return
        }
        this.orderService.qenerateOrderDetailId().then((res) => {
          if (res.code === 1) {
            ID = res.data;
            var pro = {}
            pro.id = ID
              // debugger
            pro.deliveryTime = this.deliveryTime
            // pro.hmcId= "A0008949"
            pro.hmcId = this.userParam.hmcid
            pro.installTime='1564650104445'
            pro.orderFlag = 0
            pro.orderNo=this.orderNo
            pro.productCategoryName =  obj.product.productGroupName
            pro.productCategoryCode = obj.product.productBrandCode
            pro.productCode = obj.product.productCode
            pro.productModel = obj.product.productModel
            pro.bccPrice = obj.product.price
            pro.productPrice = obj.product.price
            pro.remark = "备注，记录订单创建、订单修改原因等信息"
            pro.rightId =  "111111"
            pro.rightName=  "八月套购权益"
            pro.storeId = this.shopId
            pro.storeName =  this.shopName
    	    	pro.invoiceStatus =  0
            // pro.userId = '123456789'
             pro.userId = this.customerInfo.userId
          // debugger
        this.productList.push(pro);
            // debugger
          } else {
            Toast.failed(res.msg);
          }
        });

      }
    }
  },
  created() {
    this.userParam = JSON.parse(localStorage.getItem('userinfo'));
    this.shopId = this.userParam.shopId;
    this.getUserStore()
    if(this.$route.params.region === 'hand'){
      this.haveConsignee = false
      this.haveCustomer = false
      return
    }
    debugger
      this.customerInfo.username = this.$route.params.customerConsigneeInfo.userName
      this.customerInfo.mobile = this.$route.params.customerConsigneeInfo.mobile
      this.mobile = this.customerInfo.mobile
      this.queryUserList()
      this.queryCustomerDefault();
      this.getUserStore();

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
    indexOf (val) {
      for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
      }
      return -1;
    },
    remove (val) {
      var index = this.indexOf(val);
      if (index > -1) {
        this.splice(index, 1);
      }
    },
    // 获取门店信息
    sponsorCheck(checkid) {
      debugger;
      this.multBuyParticipant = this.buyerList
      var temp = this.buyerList
      temp.forEach(v => {
        if(v.hmcid === checkid){
            this.multBuyParticipant.remove(v)
        }

      })

    },
    particpantAll(checkedIds) {

    },
    particpantClick(checkids) {

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
      this.productService.deafaultCustomerAddress(this.mobile).then((res) => {
        if (res.code === 1) {
          if (res.data !== null) {
            this.haveConsignee = true;
            if( this.haveCustomer){
            }else {
              this.haveCustomer = true;
              this.customerInfo = res.data;
            }
            this.title = '收件人信息：';
            this.consignee.address = res.data.province + res.data.city + res.data.district + res.data.address;
            this.consignee.phone = res.data.mobile;
            this.consignee.name = res.data.username;
            this.consignee.sex = res.data.sex;
            this.consignee.customerId = res.data.customerId;
            this.queryCustomerAddressList();
            this.genarateOrderNum();
          }
        }
      });
    },
    // 查询客户地址列表
    queryCustomerAddressList() {
      this.productService.customerAddressList(this.customerInfo.customerId).then((res) => {
        if (res.code === 1) {
          this.addressList = res.data;
        }
      });
    },
    // 暂存
    saveTemporary() {
      const subInfo = {};
      // multBuyParticipantCheckIds
      if (this.multBuySponsorCheckedIds.length) {
        subInfo.coupleSponsor = this.multBuySponsorCheckedIds[0];
         const obj = this.multBuySponsor.find(v => v.hmcId === this.multBuySponsorCheckedIds[0])
       subInfo.coupleSponsorName = obj.username;
      }else{
        subInfo.coupleSponsor = ''
        subInfo.mayEditCoupleOrderId = '';
      }

      var part = []
      if(this.multBuyParticipantCheckIds.length){
        subInfo.mayEditCoupleOrderId = this.multBuyParticipantCheckIds.join(',');
        this.multBuyParticipantCheckIds.forEach(val => {
          const obj = this.multBuyParticipant.find(v => v.hmcId === val)
          if(obj){
             part.push(obj.username)
          }
          subInfo.mayEditCoupleOrderName = part.join(',')
        });
      }else{
        subInfo.mayEditCoupleOrderName = ''
        subInfo.mayEditCoupleOrderId= ''
      }



      subInfo.orderNo = this.orderNo
      subInfo.recordMode = 'Haier'
      // subInfo.hmcId = 'A0008949'
      subInfo.hmcId = this.userParam.hmcid
      subInfo.storeId = this.shopId
      subInfo.storeName = this.shopName
      subInfo.userId = this.customerInfo.userId
      // subInfo.userId = '123456789',
      // this.userParam.userId;
      // subInfo.userName = '张三',
      subInfo.userName = this.customerInfo.username;
      subInfo.consigneeName = this.consignee.name
      subInfo.consigneePhone = this.consignee.phone
      subInfo.consigneeId = this.consignee.customerId
      subInfo.microCode = this.customerInfo.microCode
      subInfo.microName = this.customerInfo.microName
      subInfo.channel = this.customerInfo.channel
      subInfo.channelName = this.customerInfo.channelName
      // subInfo.userPhone = '18675647364',
      subInfo.userPhone = this.customerInfo.mobile;
      subInfo.dispatchProvinceId = this.customerInfo.province
      subInfo.dispatchProvince = ''
      subInfo.dispatchCityId = this.customerInfo.city
      subInfo.dispatchCity = ''
      subInfo.dispatchAreaId = this.customerInfo.area
      subInfo.dispatchArea = ''
      subInfo.dispatchAdd = this.customerInfo.address
      subInfo.buyTime = this.buyDate
      subInfo.deliveryTime = this.deliveryTime
      subInfo.orderType = this.orderType
      // subInfo.coupleSponsor = '',
      // subInfo.coupleSponsorName = '',
      // subInfo.mayEditCoupleOrderId = '',
      // subInfo.mayEditCoupleOrderName = '',
      subInfo.rightId = ''
      subInfo.rightName = ''
      subInfo.giftId = ''
      subInfo.giftName = ''
      subInfo.orderStatus = 0
      subInfo.orderFlag = 0// 订单标示，0-正常 1-换货 2-退货 订单来源，
      subInfo.orderSource = 'SGLD' // 1-扫码录单 2-手动录单 3-智慧触点认筹录单
      subInfo.sourceSn = '' // 来源编码，记录来源ID
      subInfo.remark = '' // 备注，记录订单创建、订单修改原因等信息
      subInfo.rightsUserJson = ''
      subInfo.orderDetailDtoList = this.productList;
      this.subInfo = subInfo;

      if (this.orderNo !== '') {
        this.orderService.createOrder(subInfo, { orderFollowId: '' }).then((res) => {
          Toast.succeed(res.msg);
          this.$router.push({
            name: 'Order.OrderUploadInvoice',
            params: { orderNo: this.orderNo }
          });
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
    selectAddress(item) {
      // debugger;
      console.log('11111111111', item);
      this.customerInfo = item;
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
    addNew(item) {
      this.region = 'userAdd';
      this.$router.push({
        name: 'Order.AddAddress',
        params: { region: this.region, info: JSON.stringify(item) }
      });
    },
    changeAddress(item) {
      this.region = 'edit';
      if (this.addressList.length < 1) {
        this.$router.push({
          name: 'Order.AddAddress',
          params: { region: this.region, info: JSON.stringify(item) }
        });
      } else {
        this.showAddressList();
      }
    },
    editAddress(info) {
      this.region = 'edit';
      debugger
      this.$router.push({
        name: 'Order.AddAddress',
        params: { region: this.region, info: JSON.stringify(info) }
      });
    },
    showAddressList() {
      /* 展示选择用户pop */
      this.addressPopShow = true;
    },
    queryUserList() {
      this.productGroup = '111';
      this.productService.userList(this.shopId).then((res) => {
        if (res.code === 1) {
          this.multBuySponsor = res.data;
          this.multBuyParticipant = this.multBuySponsor;
          this.buyerList = res.data
        }
      });
    },
    consporConfirm(){
      this.saveTemporary();
    },
    next() {
      /* 下一步 */
      // todo 单品、套购值待定
      if (this.orderType === 1) {
        // 展示套购发起人
        this.multBuyPopShow = true;
      }else {
        this.saveTemporary()
        this.$router.push({
          name: 'Order.OrderUploadInvoice',
          params: { orderNo: this.orderNo }
        });
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
