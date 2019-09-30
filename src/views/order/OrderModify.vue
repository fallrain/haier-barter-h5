<template xmlns:v-slot="">
  <div>
    <div class="orderEntry-header">
      <span class="orderEntry-header-name">门店：{{shopName}}</span>
      <i class="iconfont icon-icon-question orderEntry-header-icon"></i>
    </div>
    <div class="orderEntry-header-cus">
            <span class="name mr16">顾客信息:{{customerInfo.username}}</span>
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
            >更改地址
            </button>
          </div>
          <p class="orderEntry-user-address">
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
    <div class="orderEntry-header-cus" v-show="orderType">
      <button
        type="button"
        class="common-btn-primary w100per"
        @click="selectSetBuyer()"
      >选择套购发起人
      </button>
    </div>
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
  BRadioItem, BTimeSectionPicker
} from '@/components/form';
import {
  BMultbuyCheck
} from '@/components/business';
import addressData from '@/lib/address';

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
    BRadioItem,
    BTimeSectionPicker
  },
  data() {
    return {
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
      // 参与人选中id
      multBuyParticipantCheckIds: [],
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
      sourceSn: ''
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
      let ID = '';
      const obj = JSON.parse(this.$route.query.temp);
      if (obj.tel) {
        this.mobile = obj.tel;
        this.queryCustomerDefault();
      }
      if (obj.product) {
        if (!obj.product.productGroupName) {
          return;
        }
        this.orderService.generateOrderDetailId().then((res) => {
          if (res.code === 1) {
            ID = res.data;
            const pro = {};
            pro.id = ID;

            pro.deliveryTime = this.deliveryTime;
            // pro.hmcId= "A0008949"
            pro.hmcId = this.userParam.hmcId;
            pro.installTime = '1564650104445';
            pro.orderFlag = 0;
            pro.orderNo = this.orderNo;
            pro.productCategoryName = obj.product.productGroupName;
            pro.productCategoryCode = obj.product.productBrandCode;
            pro.productCode = obj.product.productCode;
            pro.productModel = obj.product.productModel;
            pro.bccPrice = obj.product.price;
            pro.productPrice = obj.product.price;
            pro.remark = '备注，记录订单创建、订单修改原因等信息';
            pro.rightId = '111111';
            pro.rightName = '八月套购权益';
            pro.storeId = this.shopId;
            pro.storeName = this.shopName;
            pro.invoiceStatus = 0;
            pro.userId = this.userParam.userId;


            this.productList.push(pro);
          } else {
            Toast.failed(res.msg);
          }
        });
        if (obj.rightsJson) {
          const right = JSON.parse(obj.rightsJson);
          if (!right.rightsName) {
            return;
          }
          this.isDetail = true;
          this.rightsList = right.rightsName.replace(/(.)(?=[^$])/g, '$1,').split(',');
        }
      }
    }
  },
  created() {
    this.addressData = addressData;
    this.orderNo = this.$route.params.orderNo;
    this.userParam = JSON.parse(localStorage.getItem('userinfo'));
    this.getData();
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
      this.deliveryTime = date;
    },
    getData() {
      this.orderService.queryOrderInfoByOrderNo({}, { orderNo: this.orderNo }).then((response) => {
        if (response.code === 1) {
          const resData = response.data;
          this.shopName = resData.storeName;
          this.consignee.name = resData.consigneeName;
          this.customerInfo.username = resData.userName;
          this.customerInfo.customerId = resData.userId;
          this.customerInfo.mobile = resData.userPhone;
          this.phone = resData.userPhone;
          this.hmcId = resData.hmcId;
          this.consignee.phone = resData.consigneePhone;
          this.consignee.sex = resData.userSex;
          this.consignee.address = {};
          this.consignee.address.provinceName = resData.dispatchProvince;
          console.log('this.consignee.address.proivinceName', this.consignee.address.provinceName);
          this.consignee.address.cityName = resData.dispatchCity;
          this.consignee.address.districtName = resData.dispatchArea;
          this.consignee.address.street = resData.dispatchAdd;
          this.buyDate = resData.buyTime;
          this.orderType = resData.orderType;
          this.deliveryTime = resData.deliveryTime;
          const dt = new Date(Date.parse(this.deliveryTime));
          const y = dt.getFullYear();
          const m = (dt.getMonth() + 1) < 10 ? `0${dt.getMonth() + 1}` : (dt.getMonth() + 1);// 获取当前月份的日期，不足10补0
          const d = dt.getDate() < 10 ? `0${dt.getDate()}` : dt.getDate();
          const h = dt.getHours() < 10 ? `0${dt.getHours()}` : dt.getHours();
          const ha = (dt.getHours() + 1) < 10 ? `0${dt.getHours() + 1}` : (dt.getHours() + 1);
          const time = `${y}-${m}-${d} ${h}:00` + `-${ha}:00`;
          this.deliveryTime = time;
          this.deliveryTime = time;
          this.createdTime = resData.createdTime;
          this.orderSource = resData.orderSource;
          this.orderFollowId = resData.id;
          this.sourceSn = resData.sourceSn;
          this.recordMode = resData.recordMode;
          this.queryUserList(resData.storeId);
          if (resData.rightsUserJson) {
            this.activityList = JSON.parse(resData.rightsUserJson).rightsUserInterestsDetailsDTO;
          }
          if (resData.orderDetailDtoList.length !== 0) {
            this.productList = resData.orderDetailDtoList;
            this.productList.forEach((item) => {
              if (item.productBrand == 'haier') {
                item.productBrandCN = '海尔';
              } else {
                item.productBrandCN = '卡萨帝';
              }
            });
          }
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
            this.getAddressName(res.data.province, res.data.city, res.data.district);
            this.consignee.address.street = res.data.address;

            this.consignee.phone = res.data.mobile;
            this.consignee.name = res.data.username;
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
    // 获取门店信息
    sponsorCheck(checkid) {

    },
    particpantAll(checkedIds) {

    },
    particpantClick(checkids) {

    },
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
        }
      });
    },
    // 暂存
    saveTemporary(type) {
      this.genarateSubInfo(1);
      if (this.orderNo !== '') {
        Toast.loading('保存中...');

        this.orderService.createOrder(this.subInfo, { orderFollowId: this.orderFollowId }).then((res) => {
          if (res.code === 1) {
            if (type === 1) {
              Toast.succeed('订单暂存成功');

              this.$router.go(-1);
            }
            if (type === 2) {
              this.$router.push({
                name: 'Order.OrderUploadInvoice',
                params: { orderNo: this.orderNo }
              });
            }
          }
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
      this.genarateSubInfo(2);
    },
    genarateSubInfo(type) {
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

      subInfo.orderNo = this.orderNo;
      subInfo.recordMode = this.recordMode;
      subInfo.hmcId = this.userParam.hmcid;
      // subInfo.hmcId = 'Z0188893'
      subInfo.storeId = this.userParam.shopId;
      // subInfo.storeId = '8800117018'
      subInfo.storeName = this.shopName;
      subInfo.userId = this.customerInfo.userId;
      subInfo.userName = this.customerInfo.username;
      subInfo.consigneeName = this.consignee.name;
      subInfo.consigneePhone = this.consignee.phone;
      subInfo.consigneeId = this.consignee.customerId;
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
      subInfo.dispatchAreaId = this.customerInfo.area;
      subInfo.dispatchArea = this.consignee.address.districtName;
      subInfo.dispatchAdd = this.consignee.address.street;
      subInfo.buyTime = this.buyDate;
      const dt = this.deliveryTime.substring(0, 16);

      subInfo.deliveryTime = dt;
      subInfo.orderType = this.orderType;
      subInfo.rightId = '';
      subInfo.rightName = '';
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
        this.$router.push({
          name: 'Order.OrderFollowActivity',
          params: { orderInfo: info }
        });
      }
    },
    selectAddress(item) {
      console.log('11111111111', item);
      this.customerInfo = item;
    },
    addAddress() {
    /* 添加新地址 */
      if (this.addressList.length === 0) {
        this.region = 'add';
        this.$router.push({
          name: 'Order.AddAddress',
          params: { region: this.region, info: JSON.stringify(this.customerInfo) }
        });
      } else {
        this.showAddressList();
      }
    },
    changeAddress(item) {
      item.userName = this.customerInfo.username;
      item.mobile = this.customerInfo.mobile;
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
      this.$router.push({
        name: 'Order.AddAddress',
        params: { region: this.region, info: JSON.stringify(info) }
      });
    },
    showAddressList() {
    /* 展示选择用户pop */
      this.addressPopShow = true;
    },
    queryUserList(storeId) {
      this.productService.userList(storeId).then((res) => {
        if (res.code === 1) {
          this.multBuySponsor = res.data;
          this.multBuyParticipant = this.multBuySponsor;
        }
      });
    },
    next() {
    /* 下一步 */
      if (this.productList.length === 0) {
        Toast.info('请选择产品');
      }
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

.orderEntry-user1 {
  background: #fff;
  padding: 0;
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

</style>
