<template>
  <div class="">
    <div class="reportInstallDetail-head mb16">
      <div class="reportInstallDetail-head-item">
        <i class="iconfont icon-drugstore"></i>
        <span class="company">{{user.shopName}}</span>
      </div>
      <div class="reportInstallDetail-head-item">
        <i class="iconfont icon-tongxunlu"></i>
        <span class="company mr16">{{customerInfo.username}}</span>
        <span class="tel">{{customerInfo.mobile}}</span>
      </div>
    </div>
    <div class="reportInstallDetail-block mb16">
      <b-report-install-detail-head
        title="安装地址"
        :right="true"
      >
      <span
        v-if="canUpdateAddress && tag != 'detail'"
        slot="right"
        class="reportInstallDetail-right-text"
        catchtap='newAddress'
        @click="queryCustomerAddressList"
      >
        修改地址
      </span>
      </b-report-install-detail-head>
      <div class="reportInstallDetail-block-cnt">
        <div class="reportInstallDetail-ads-item">
          <label class="name">收货人：</label>
          <span class="val">{{getNewAddress.consigneeName}}</span>
        </div>
        <div class="reportInstallDetail-ads-item">
          <label class="name">联系电话：</label>
          <span class="val">{{getNewAddress.consigneePhone}}</span>
        </div>
        <div class="reportInstallDetail-ads-item">
          <label class="name">收货地址：</label>
          <span class="val">{{(getNewAddress.provinceName+
          getNewAddress.cityName+getNewAddress.areaName+getNewAddress.detailAddress) || ''}}</span>
        </div>
      </div>
    </div>
    <div class="reportInstallDetail-block mb16">
      <b-report-install-detail-head
        title="是否系统自动报装"
      >
      </b-report-install-detail-head>
      <div class="reportInstallDetail-block-cnt">
        <b-radio-item
          :disabled="!canUpdateAddress"
          :inline="true"
          :list="radiosIsReport"
          v-model="isReport"
          @radioChange="changeReport"
        ></b-radio-item>
        <div v-if="isReport===1">
          <div
            v-for="(product) in productList"
            :key="product.productModelCode"
          >
            <div class="reportInstallDetail-product-item">
              <label class="name">{{product.productModelCode}}</label>
              <div class="right">
                <b-date-picker
                  title="请选择安装时间"
                  type="custom"
                  :custom-types="['yyyy', 'MM','dd', 'hh']"
                  pattern="yyyy-MM-dd hh:00"
                  :disabled="product.dateDisabled || tag == 'detail'"
                  :default-date="new Date(product.requireServiceDate.replace(/-/g,'/'))"
                  :min-date="new Date(product.startDateTime)"
                  v-model="product.requireServiceDate"
                ></b-date-picker>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="reportInstallDetail-block mb16">
      <b-report-install-detail-head
        title="温馨提示"
      >
      </b-report-install-detail-head>
      <div class="reportInstallDetail-block-cnt">
        <div class="reportInstallDetail-tips-item">
          1.代替用户申请安装的产品在距离安装时间前24小时才会传给售后系统，传给售后系统后不可修改安装时间，若需要修改报装时间，请在距离安装时间大于24小时、在“代报装”中修改没有传给售后系统的报装信息。
        </div>
        <div class="reportInstallDetail-tips-item">
          2.请仔细核对客户信息，以免联系不上客户无法安装。
        </div>
      </div>
    </div>
    <div class="reportInstallDetail-btns-par">
      <button
        v-if="notAllSend && tag != 'detail'"
        class="reportInstallDetail-btn"
        @click="submit"
      >提交报装信息
      </button>
    </div>
    <div class="report-install-address">
      <b-pop-address-list
        :show.sync="addressPopShow"
        :isFromReportInstallDetail="true"
        :list="addressAllList"
        @addNew="addAddress"
        @editAddress="editAddress"
        @clickAddress="selectAddress"
      ></b-pop-address-list>
    </div>
  </div>
</template>
<script>
import {
  BReportInstallDetailHead
} from '@/components/business';

import addressData from '@/lib/address';

import {
  mapGetters,
  mapMutations
} from 'vuex';

import {
  BPopAddressList,
  BRadioItem
} from '@/components/form';
import {
  Dialog
} from 'mand-mobile';
import BDatePicker from '../../components/form/BDatePicker';

export default {
  name: 'ReportInstallDetail',
  components: {
    BDatePicker,
    BRadioItem,
    BPopAddressList,
    BReportInstallDetailHead
  },
  data() {
    return {
      parentPage: '', // 是否从
      hmcid: '',
      user: {
        userId: '',
        mobile: '',
        shopName: '',
        regionCode: '',
      },
      // 顾客信息
      customerInfo: {
        mobile: '',
        username: '',
      },
      radiosIsReport: [
        {
          key: 1,
          value: '是',
        },
        {
          key: 0,
          value: '否'
        }
      ],
      isReport: 1, // 是否代报装
      notAllSend: true, // 没有全发送
      productList: [],
      addressAllList: [],
      orderNo: '',
      productListTemp: [],
      flowStatus: '', // 待报装、已报装。。。。
      canUpdateAddress: false, // 是否可修改地址
      itemIndex: undefined, // 待修改的列表序号
      addStatus: '', // 是否是手动录单，此参数与录单员参数名保持一致
      tag: '',
      // 选择收货人列表pop show
      addressPopShow: false,
      // 收货人地址pop列表
      region: '',
      // 是否从ReportInstallList跳转过来
      isFromList: true
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.addressData = addressData;
      vm.setUserInfo();
      vm.isFromList = !!(from.name === 'ReportInstall.ReportInstallList');
      vm.getProductList();
    });
  },
  methods: {
    ...mapMutations([
      'updataNewAddress'
    ]),
    changeReport(isReport) {
      this.isReport = isReport;
    },
    setUserInfo() {
      /* 设置订单用户信息 */
      const option = this.$route.query;
      const userInfo = {
        shopName: option.shopName || '',
        addStatus: option.addStatus || '', // 是否到标签页面，上页返回的状态
        workFlowId: option.workFlowId || '',
        userId: option.userId || '',
        orderNo: option.orderNo || '',
        orderId: option.orderId || ''
      };
      this.user = userInfo;
      this.addStatus = option.addStatus || false;
      this.itemIndex = option.itemIndex || undefined;
      this.flowStatus = option.flowStatus;
      // 已经报装 报装异常不可修改地址
      this.canUpdateAddress = !!(option.flowStatus !== '1' && option.flowStatus !== '2');
      this.parentPage = option.parentPage;
      this.tag = option.tag;
    },
    getProductList() {
      /* 获取产品列表 */
      this.reportInstallService.queryReportInstallByOrderNo({
        orderNo: this.user.orderNo
      }).then((res) => {
        if (res.code === 1) {
          const data = res.data;
          // sendStatus 0-暂存、1-未发送、2-发送成功、3-发送失败'
          // 没有全发送成功
          this.notAllSend = !!(data.find(v => (v.sendStatus === '0' || v.sendStatus === '1')));
          let newAddress = {};
          if (data[0]) {
            data[0].isReportInstall && (this.isReport = data[0].isReportInstall * 1);
            newAddress = {
              provinceName: data[0].provinceName,
              cityName: data[0].cityName,
              areaName: data[0].districtName,
              detailAddress: data[0].address,
              regionCode: data[0].regionCode,
              consigneeName: data[0].consigneeName,
              consigneePhone: data[0].consigneePhone
            };
            this.user.shopName = data[0].storeName || '';
            this.user.regionCode = data[0].regionCode;
            this.customerInfo.username = data[0].customerName;
            this.customerInfo.mobile = data[0].phoneNumber;
            this.customerInfo.userId = data[0].userId;
            this.hmcid = data[0].hmcid;
          }
          let canUpdateAddress = true;
          const productList = data.map((v) => {
            // 有已经发送成功的，就不可修改地址
            canUpdateAddress = canUpdateAddress && v.sendStatus < '2';
            const obj = {
              productModelCode: v.productModelCode,
              requireServiceDate: v.requireServiceDate ? v.requireServiceDate.substring(0, 16) : '',
              // 已经提报HCC不可修改
              dateDisabled: (v.sendStatus !== '0' && v.sendStatus !== '1'),
              sendStatus: v.sendStatus
            };
            const deliveryTime = new Date(v.deliveryTime.replace(/-/g, '/'));
            // 开始时间开始取接口传回时间（配送时间+4小时或者第二天10天）和今天的时间相比更晚的值
            // obj.startDateTime = v.requireServiceDate;//2019-06-13暂时去掉，改为只用当前时间作为开始时间
            let startDateTime;
            if (deliveryTime.getHours() >= 16) {
              const nextDay = new Date(new Date().getTime() + 24 * 3600 * 1000);
              startDateTime = new Date(`${nextDay.getFullYear()}/${nextDay.getMonth() + 1}/${nextDay.getDate()} 00:00`);
            } else {
              startDateTime = new Date(deliveryTime.getTime() + 4 * 3600 * 1000);
            }
            const curDate = new Date();
            if (startDateTime.getTime() < curDate.getTime()) {
              startDateTime = new Date(deliveryTime.getTime() + 3600 * 1000);
            }
            obj.startDateTime = startDateTime;
            return obj;
          });
          this.canUpdateAddress = canUpdateAddress;
          this.isFromList && (this.updataNewAddress(newAddress));
          this.productList = productList;
          this.productListTemp = data;
        }
      });
    },
    submit() {
      /* 提交报装信息 */
      const {isReport, productList, productListTemp} = this;
      const fillAddresList = productList.filter(v => v.requireServiceDate);
      const errorTimeIndex = productList.findIndex(v => v.sendStatus < '2' && new Date(v.requireServiceDate) < new Date(v.startDateTime));
      const valid = this.bUtil.valid([
        {
          ruleFun: () => {
            const address = this.getNewAddress;
            return address && address.consigneeName && address.consigneePhone && address.provinceName && address.cityName && address.areaName && address.detailAddress;
          },
          message: '请完善安装地址'
        },
        {
          ruleFun() {
            return fillAddresList.length === productList.length;
          },
          message: '请为所有产品填写安装时间'
        },
        {
          ruleFun() {
            return errorTimeIndex < 0;
          },
          message: `第${errorTimeIndex + 1}个产品安装时间不正确`
        }
      ]);
      if (valid()) {
        const reportInstallInfo = productListTemp.map((product, index) => {
          const data = {
            ...product,
            // requireServiceDate: productList[index].requireServiceDate + ':00',
            requireServiceDate: (`${productList[index].requireServiceDate}:00`).substr(0, 19),
            customerName: this.getNewAddress.consigneeName,
            phoneNumber: this.getNewAddress.consigneePhone,
            provinceName: this.getNewAddress.provinceName,
            cityName: this.getNewAddress.cityName,
            districtName: this.getNewAddress.areaName,
            address: this.getNewAddress.detailAddress,
            regionCode: this.getNewAddress.regionCode,
            isReportInstall: isReport,
            hmcid: this.hmcid
          };
          if (!this.getNewAddress.regionCode) {
            data.regionCode = product.regionCode;
          }
          return data;
        });
          // if (!this.bUtil.isReportInstallFit(this.productList, this.deliveryTime)) {
          //   return;
          // }
        this.reportInstallService.agentReportInstall({
          reportInstallInfo
        }).then((res) => {
          if (res.code !== 1) {
            return;
          }
          Dialog.succeed({
            title: '成功',
            content: '报装成功',
            confirmText: '确定',
            onConfirm: () => {
              //用来判断是否刷新代报装列表页面 如果reportInstallList.itemIndex有值就刷新
              sessionStorage.setItem('reportInstallList.itemIndex', 1);
              this.$mBack();
            }
          });
        });
      }
    },
    editAddress(info) {
      this.addressPopShow = false;
      // info.username = this.user.userName;
      // info.mobile = this.user.mobile;
      this.region = 'edit';
      this.$router.push({
        name: 'Order.AddAddress',
        params: { region: this.region, info: JSON.stringify(info) }
      });
    },
    selectAddress(item) {
      const newAddress = {
        provinceName: item.consignee.provinceName,
        cityName: item.consignee.cityName,
        areaName: item.consignee.districtName,
        detailAddress: item.address,
        regionCode: item.regionCode,
        consigneeName: item.consigneeUserName,
        consigneePhone: item.consigneeUserPhone
      };
      this.updataNewAddress(newAddress);
      this.addressPopShow = false;
    },
    addAddress() {
      // 添加新地址
      this.region = 'add';
      this.$router.push({
        name: 'Order.AddAddress',
        params: { region: this.region, info: JSON.stringify(this.customerInfo) }
      });
    },
    // 查询客户地址列表
    queryCustomerAddressList() {
      this.productService.customerAddressListForCustomerTel(this.customerInfo.mobile).then((res) => {
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
          this.addressAllList = res.data;
          this.addressPopShow = true;
        }
      });
    },
  },
  computed: {
    ...mapGetters([
      'getNewAddress'
    ]),
  }
};
</script>
<style lang="scss">

  .reportInstallDetail-head {
    padding: 24px;
    background: #fff;
  }

  .reportInstallDetail-head-item {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }

  .reportInstallDetail-head-item:last-child {
    margin-bottom: 0;
  }

  .reportInstallDetail-head-item .iconfont {
    font-size: 36px;
    color: #1969C6;
    margin-right: 16px;
  }

  .reportInstallDetail-head-item .company {
    font-size: 32px;
    color: #333;
  }

  .reportInstallDetail-head-item .name {
    font-size: 28px;
    color: #666;
  }

  .reportInstallDetail-head-item .tel {
    font-size: 28px;
    color: #999;
  }

  .reportInstallDetail-right-text {
    color: #1969C6;
    font-size: 28px;
  }

  .reportInstallDetail-block {
    background: #fff;
    padding: 24px;
  }

  .reportInstallDetail-block-cnt {
    margin-top: 24px;

  }

  .reportInstallDetail-ads-item {
    font-size: 28px;
    margin-top: 16px;
  }

  .reportInstallDetail-ads-item:first-child {
    margin-top: 0;
  }

  .reportInstallDetail-ads-item .name {
    color: #666;
  }

  .reportInstallDetail-ads-item .val {
    color: #999;
  }

  .reportInstallDetail-block-cnt .b2-radio-par {
    margin-right: 160px;
  }

  .reportInstallDetail-product-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;
  }

  .reportInstallDetail-product-item .name {
    font-size: 28px;
    color: #666;
  }

  .reportInstallDetail-product-item .right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 360px;
    flex-shrink: 0;
    font-size: 28px;
    color: #666;
  }

  .reportInstallDetail-product-item .right .iconfont {
    margin-left: 16px;
    color: #1969C6;
  }

  .reportInstallDetail-tips-item {
    margin-top: 16px;
    font-size: 28px;
    line-height: 48px;
    color: #999;
  }

  .reportInstallDetail-tips-item:first-child {
    margin-top: 0;
  }

  .reportInstallDetail-btns-par {
    padding-left: 24px;
    padding-right: 24px;
    margin-top: 16px;
    text-align: center;
    margin-bottom: 24px;
  }

  .reportInstallDetail-btn {
    width: 100%;
    background: #1969C6;
    color: #fff;
    font-size: 34px;
    height: 84px;
    border-radius: 8px;
  }

  .reportInstallDetail-product-item-disabled {
    color: #999;
  }

  .report-install-address {
    .md-popup-mask {
      top: 0;
    }
  }

</style>
