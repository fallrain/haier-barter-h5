<template>
  <div class="">
    <div class="reportInstallDetail-head mb16">
      <div class="reportInstallDetail-head-item">
        <i class="iconfont icon-drugstore"></i>
        <span class="company">{{user.shopName}}</span>
      </div>
      <div class="reportInstallDetail-head-item">
        <i class="iconfont icon-tongxunlu"></i>
        <span class="company mr16">{{user.userName}}</span>
        <span class="tel">{{user.mobile}}</span>
      </div>
    </div>
    <div class="reportInstallDetail-block mb16">
      <b-report-install-detail-head
        title="安装地址"
        :right="true"
      >
      <span
        v-if="canUpdateAddress"
        slot="right"
        class="reportInstallDetail-right-text"
        catchtap='newAddress'
        @click="shwAddressList"
      >
        {{addressList.length?'修改地址':'新增地址'}}
      </span>
      </b-report-install-detail-head>
      <div class="reportInstallDetail-block-cnt">
        <div class="reportInstallDetail-ads-item">
          <label class="name">收货人：</label>
          <span class="val">{{addressList[0].trueName}}</span>
        </div>
        <div class="reportInstallDetail-ads-item">
          <label class="name">联系电话：</label>
          <span class="val">{{addressList[0].mobile}}</span>
        </div>
        <div class="reportInstallDetail-ads-item">
          <label class="name">收货地址：</label>
          <span class="val">{{(addressList[0].provinceName+
          addressList[0].cityName+addressList[0].areaName+addressList[0].detailAddress) || ''}}</span>
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
                  :disabled="product.dateDisabled"
                  :default-date="new Date(product.requireServiceDate)"
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
        v-if="notAllSend"
        class="reportInstallDetail-btn"
        @click="submit"
      >提交报装信息
      </button>
    </div>
    <div class="report-install-address">
      <b-pop-address-list
        :show.sync="addressPopShow"
        :list="addressList"
      ></b-pop-address-list>
    </div>
  </div>
</template>
<script>
import {
  BReportInstallDetailHead
} from '@/components/business';

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
      user: {
        userId: '',
        userName: '',
        mobile: '',
        shopName: ''
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
      addressList: [{
        name: '张三',
        phone: '15000000000',
        address: '山东省青岛市崂山区海尔路1号左岸风度小区12号楼1单元801户',
        tagName: '自己家'
      },
      {
        name: '李四',
        phone: '15000000000',
        address: '山东省青岛市崂山区海尔路1号左岸风度小区12号楼1单元801户',
        tagName: '办公室'
      },
      {
        name: '王二',
        phone: '15000000000',
        address: '山东省青岛市崂山区海尔路1号左岸风度小区12号楼1单元801户',
        tagName: '父母家'
      },
      {
        name: '尼古拉斯赵四',
        phone: '15000000000',
        address: '山东省青岛市崂山区海尔路1号左岸风度小区12号楼1单元801户',
        tagName: '其他'
      },
      {
        name: '莱桑尼丝铁柱',
        phone: '15000000000',
        address: '山东省青岛市崂山区海尔路1号左岸风度小区12号楼1单元801户',
        tagName: '其他'
      },
      {
        name: '罗伯特英子',
        phone: '15000000000',
        address: '山东省青岛市崂山区海尔路1号左岸风度小区12号楼1单元801户',
        tagName: '其他'
      }],
      orderNo: '',
      productListTemp: [],
      flowStatus: '', // 待报装、已报装。。。。
      canUpdateAddress: false, // 是否可修改地址
      itemIndex: undefined, // 待修改的列表序号
      addStatus: '', // 是否是手动录单，此参数与录单员参数名保持一致
      // 选择收货人列表pop show
      addressPopShow: false,
      // 收货人地址pop列表
    };
  },
  created() {
    this.setUserInfo();
    this.getProductList();
  },
  methods: {
    setUserInfo() {
      /* 设置订单用户信息 */
      const option = this.$route.query;
      const userInfo = {
        shopName: option.shopName || '',
        addStatus: option.addStatus || '', // 是否到标签页面，上页返回的状态
        workFlowId: option.workFlowId || '',
        userId: option.userId || '',
        userName: option.userName || '',
        mobile: option.mobile || '',
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
      // this.addressList = [{
      //   mobile: userInfo.mobile
      // }];
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
              trueName: data[0].customerName,
              provinceName: data[0].provinceName,
              mobile: data[0].phoneNumber,
              cityName: data[0].cityName,
              areaName: data[0].districtName,
              detailAddress: data[0].address
            };
            this.user.shopName = data[0].storeName || '';
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
            const curDate = new Date();
            // 开始时间开始取接口传回时间（配送时间+4小时或者第二天10天）和今天的时间相比更晚的值
            if (v.requireServiceDate && new Date(v.requireServiceDate) > curDate) {
              // obj.startDateTime = v.requireServiceDate;//2019-06-13暂时去掉，改为只用当前时间作为开始时间
            } else {
              obj.startDateTime = new Date(curDate * 1 + 3600 * 1000).toString();
            }
            return obj;
          });
          this.canUpdateAddress = canUpdateAddress;
          this.addressList[0] = {
            ...this.addressList[0],
            ...newAddress
          };
          this.productList = productList;
          this.productListTemp = data;
        }
      });
    },
    submit() {
      /* 提交报装信息 */
      const { isReport, productList, addressList, productListTemp } = this;
      const fillAddresList = productList.filter(v => v.requireServiceDate);
      const errorTimeIndex = productList.findIndex(v => v.sendStatus < '2' && new Date(v.requireServiceDate) < new Date(v.startDateTime));
      const valid = this.bUtil.valid([
        {
          ruleFun() {
            const address = addressList[0];
            return address && address.trueName && address.mobile && address.provinceName && address.cityName && address.areaName && address.detailAddress;
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
      if (isReport) {
        if (valid()) {
          const reportInstallInfo = productListTemp.map((product, index) => {
            const data = {
              ...product,
              // requireServiceDate: productList[index].requireServiceDate + ':00',
              requireServiceDate: (`${productList[index].requireServiceDate}:00`).substr(0, 19),
              customerName: addressList[0].trueName,
              phoneNumber: addressList[0].mobile,
              provinceName: addressList[0].provinceName,
              cityName: addressList[0].cityName,
              districtName: addressList[0].areaName,
              address: addressList[0].detailAddress,
              regionCode: addressList[0].regionCode,
              // todo hmcId 需要接口获取
              hmcId: 'a000894',
              isReportInstall: isReport
            };
            if (!addressList[0].regionCode) {
              data.regionCode = product.regionCode;
            }
            return data;
          });
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
                // 成功后传回要删除的list下标
                if (this.data.itemIndex !== undefined) {
                  sessionStorage.setStorageSync('reportInstallList.itemIndex', this.data.itemIndex);
                }
                this.$mBack();
              }
            });
          });
        }
      } else {
        this.$mBack();
      }
    },
    shwAddressList() {
      /* 展示选择用户pop */
      this.addressPopShow = true;
    },
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
