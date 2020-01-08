<template>
  <div ref="addForm" class="addAddress-form">
    <ul class="address-back">
      <li>
        <div class="addAddress-form-item">
          <label class="addAddress-form-item-name">顾客手机号</label>
          <input
            type="number"
            class="addAddress-form-item-ipt"
            placeholder="请输入手机号"
            disabled="true"
            v-model="customerInfo.mobile"
            v-resetInput
          >
        </div>
      </li>
      <li>
        <div class="addAddress-form-item">
          <label class="addAddress-form-item-name">顾客姓名</label>
          <input
            type="text"
            class="addAddress-form-item-ipt"
            placeholder="请输入姓名"
            disabled="true"
            v-model="customerInfo.username"
            v-resetInput
          >
        </div>
      </li>
    </ul>
    <div class="consignee-class">
      <li>
        <div class="addAddress-form-item">
          <label class="addAddress-form-item-name">收货人姓名</label>
          <input
            type="text"
            class="addAddress-form-item-ipt"
            placeholder="请输入姓名"
            v-model="customerInfo.consigneeUserName"
            @input="judgeName1(customerInfo.consigneeUserName, 20)"
            v-resetInput
          >
        </div>
      </li>
      <li>
        <div class="addAddress-form-item">
          <label class="addAddress-form-item-name">收货人手机号</label>
          <input
            type="number"
            class="addAddress-form-item-ipt"
            placeholder="请输入手机号"
            v-model="customerInfo.consigneeUserPhone"
            v-resetInput
          >
        </div>
      </li>
      <li>
        <div class="addAddress-form-item">
          <label class="addAddress-form-item-name">性别</label>
          <b-radio-item
            :inline="true"
            :list="sexTypes"
            v-model="customerInfo.sex"
            @radioChange="radioChange"
          ></b-radio-item>
        </div>
      </li>
      <li class="addAddress-form-item-address">
        <b-item
          title="地址"
          :arrow="true"
          :value="addressName"
          @rightClick="showAddressPop"
          iconClass="icon-dingwei"
          placeholder="选择省/市/区(县)"
        ></b-item>
      </li>
      <li>
        <div class="addAddress-form-item">
          <label class="addAddress-form-item-name">详细地址</label>
          <input
            type="text"
            class="addAddress-form-item-ipt"
            placeholder="省道 门牌、楼层房间号等信息"
            v-model="customerInfo.address"
            @input="judgeAddress(customerInfo.address, 30)"
            v-resetInput
          >
        </div>
      </li>
      <li>
        <b-item
          title="该地址与用户关系"
          :arrow="true"
          :value="tagName"
          @rightClick="showTags"
        ></b-item>
      </li>
      <li>
        <div class="addAddress-form-item">
          <label class="addAddress-form-item-name">设为默认地址</label>
          <md-switch
            v-model="customerInfo.isDefault"
          ></md-switch>
        </div>
      </li>
    </div>
    <b-pop-check-list
      type="radio"
      :show.sync="tagPopShow"
      :list="tagList"
      v-model="customerInfo.tag"
    ></b-pop-check-list>
    <md-tab-picker
      title="请选择"
      describe="请选择您所在的省份、城市、区县"
      large-radius
      :data="addressData"
      v-model="addressPopShow"
      @change="addressChange"
      :default-value="defaultA"
    ></md-tab-picker>
    <button class="common-bottom-button" @click="confirm()">确认</button>
  </div>
</template>

<script>
import {
  Switch,
  TabPicker,
  Toast
} from 'mand-mobile';

import {
  BItem,
  BPopCheckList,
  BRadioItem
} from '@/components/form';

import addressData from '@/lib/address';
import {
  mapMutations
} from 'vuex';

export default {
  name: 'ChooseAddress',
  components: {
    'md-switch': Switch,
    'md-tab-picker': TabPicker,
    BPopCheckList,
    BItem,
    BRadioItem,
    Toast
  },

  data() {
    return {
      searchResultShow: false,
      confirmClicked: false,
      defaultA: [],
      form: {
        name: '',
        phone: '',
        sex: 1,
        addressDetail: '',
        isDefault: false,
        tag: []
      },
      customerInfo: {
        address: '',
        city: '',
        consigneeUserName: '',
        consigneeUserPhone: '',
        isDefault: false,
        district: '',
        id: '',
        familyItemCode: '',
        hmcId: '',
        mobile: '',
        province: '',
        sex: null,
        userId: '',
        username: '',
        source: '',
        tag: []
      },
      newAddress: {
        provinceName: '',
        districtName: '',
        cityName: '',
        regionCode: ''
      },
      subCustomerInfo: {},
      searchEnd: false,
      // 订单类型单选
      sexTypes: [
        {
          key: 1,
          value: '男'
        },
        {
          key: 2,
          value: '女'
        }
      ],
      // 地址标签pop show
      tagPopShow: false,
      region: '',
      // 地址标签列表
      tag: [],
      tagList: [],
      // 地址pop显示隐藏
      addressPopShow: false,
      addressName: '',
    };
  },
  activated() {
    debugger;
    if (this.$route.params) {
      this.region = this.$route.params.region;
      if (this.region === 'edit') {
        this.customerInfo = this.$route.params.customerInfo;
        this.addressName = `${this.customerInfo.consignee.provinceName}/
          ${this.customerInfo.consignee.cityName}/
          ${this.customerInfo.consignee.districtName}`;
      } else if (this.region === 'add') {
        this.customerInfo.mobile = this.$route.params.customerInfo.userPhone;
        this.customerInfo.username = this.$route.params.customerInfo.userName;
        this.customerInfo.hmcId = this.$route.params.customerInfo.servicerId;
        this.customerInfo.customerId = this.$route.params.customerInfo.customerId;
      }
      this.customerInfo.source = 'SMLD';
    }
  },
  created() {
    // 不加入双向绑定
    this.addressData = addressData;
    this.getFamilyItem();
  },
  computed: {
    tagName() {
      if (this.customerInfo.tag) {
        const tagObj = this.tagList.find(v => v.id === this.customerInfo.tag[0]);
        let name;
        if (tagObj) {
          name = tagObj.name;
        } else {
          name = '';
        }
        return name;
      }
      return '';
    },
  },
  methods: {
    ...mapMutations([
      'updataNewAddress'
    ]),
    showTags() {
      /* 地址标签显示隐藏 */
      this.tagPopShow = true;
    },
    showAddressPop() {
      /* 展示地址pop */
      this.addressPopShow = true;
    },
    radioChange(val) {
      this.customerInfo.sex = val;
    },
    addressChange(address) {
      /* 地址change */
      const addressA = address.options.map(v => v.label);
      const addressAy = address.values;
      const addressName = address.options;
      this.customerInfo.city = addressAy[1];
      this.customerInfo.province = addressAy[0];
      this.customerInfo.district = addressAy[2];
      this.newAddress.cityName = addressName[1].label;
      this.newAddress.provinceName = addressName[0].label;
      this.newAddress.districtName = addressName[2].label;
      this.newAddress.regionCode = addressAy[0] + addressAy[1] + addressAy[2];
      this.addressName = addressA.join('/');
    },
    confirm() {
      if (!(/^1[3456789]\d{9}$/.test(this.customerInfo.mobile))) {
        Toast.failed('手机号格式错误');
        this.customerInfo.mobile = '';
        return;
      }
      if (this.customerInfo.username === '' || !this.customerInfo.username) {
        Toast.failed('顾客姓名不能为空');
        return;
      }
      if (this.customerInfo.consigneeUserName === '' || !this.customerInfo.consigneeUserName) {
        Toast.failed('收货人姓名不能为空');
        return;
      }
      if (this.customerInfo.consigneeUserPhone === '' || !this.customerInfo.consigneeUserPhone) {
        Toast.failed('收货人手机号不能为空');
        return;
      }
      if (!(/^1[3456789]\d{9}$/.test(this.customerInfo.consigneeUserPhone))) {
        Toast.failed('手机号格式错误');
        this.customerInfo.consigneeUserPhone = '';
        return;
      }
      if (this.customerInfo.province === '') {
        Toast.failed('省份不能为空');
        return;
      }
      if (this.customerInfo.city === '') {
        Toast.failed('城市不能为空');
        return;
      }
      if (this.customerInfo.district === '') {
        Toast.failed('地区不能为空');
        return;
      }
      if (this.customerInfo.address === '') {
        Toast.failed('详细地址不能为空');
        return;
      }
      console.log(this.customerInfo);
      if (this.customerInfo.consignee) {
        delete this.customerInfo.consignee;
      }
      if (this.customerInfo.tag) {
        const tagObj = this.tagList.find(v => v.id === this.customerInfo.tag[0]);
        if (tagObj) {
          this.customerInfo.familyItemCode = tagObj.id;
        } else {
          this.customerInfo.familyItemCode = '';
        }
        delete this.customerInfo.tag;
      }
      if (this.region === 'add') {
        delete this.customerInfo.id;
        this.productService.addcustomerAddress(this.customerInfo, {}).then((res) => {
          if (res.code === 1) {
            Toast.succeed('地址添加成功');
            this.confirmClicked = true;
            this.$router.go(-1);
          }
        });
      } else if (this.region === 'edit') {
        delete this.customerInfo.hmcId;
        delete this.customerInfo.source;
        delete this.customerInfo.familyC;
        this.productService.updateCustomerAddress(this.customerInfo, {}).then((res) => {
          if (res.code === 1) {
            Toast.succeed('地址修改成功');
            this.confirmClicked = true;
            this.$router.go(-1);
          }
        });
      }
      // const newAddress = {
      //   provinceName: this.newAddress.provinceName,
      //   cityName: this.newAddress.cityName,
      //   areaName: this.newAddress.districtName,
      //   detailAddress: this.customerInfo.address,
      //   regionCode: this.newAddress.regionCode,
      //   consigneeName: this.customerInfo.consigneeUserName,
      //   consigneePhone: this.customerInfo.consigneeUserPhone
      // };
      // this.updataNewAddress(newAddress);
    },
    // 修改地址
    // 查询家庭关系数据字典
    getFamilyItem() {
      this.productService.commonTypeQuery('FAMILY-ITEM').then((res) => {
        if (res.code === 1) {
          res.data.forEach((val) => {
            const a = {};
            a.name = val.itemName;
            a.id = val.id;
            this.tagList.push(a);
          });
        }
      });
    },
    stopScrolling(event) {
      event.preventDefault();
    },
    judgeName(str, max) {
      const strResult = String(str);
      if (strResult.length > max) {
        Toast.failed('最多可输入20个字符！');
        this.customerInfo.username = strResult.slice(0, max);
      }
    },
    judgeName1(str, max) {
      const strResult = String(str);
      if (strResult.length > max) {
        Toast.failed('最多可输入20个字符！');
        this.customerInfo.consigneeUserName = strResult.slice(0, max);
      }
    },
    judgeAddress(str, max) {
      const strResult = String(str);
      if (strResult.length > max) {
        Toast.failed('最多可输入30个字符！');
        this.customerInfo.address = strResult.slice(0, max);
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      console.log(this.$refs);
      // this.$refs.addForm.addEventListener('touchmove', this.stopScrolling, false);
    });
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === 'Houseservice.AddServiceUser') {
      to.params.addressState = this.confirmClicked;
    }
    this.$destroy();
    next();
  },
};
</script>

<style lang="scss">
  .consignee-class {
    margin-top: 20px;
    background: #fff;
    padding-left: 24px;
    padding-right: 24px;
  }

  .address-back {
    padding-left: 24px;
    padding-right: 24px;
    background: #fff;
  }

  .addAddress-form {

    padding-bottom: 4px;

    .bItem-item {
      padding-left: 0;
      padding-right: 0;
    }

    .bItem-item-right-val,
    .bItem-item-title {
      font-size: 26px;
      color: #666;
    }

    .md-tab-picker {
      .md-tabs-content {

        .md-scroll-view {
          overflow: scroll;
        }
      }
    }
  }

  .addAddress-form-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    padding-left: 3px;
    padding-right: 3px;
    border-bottom: 1px solid #F5F5F5;
    font-size: 28px;
    color: #666;
  }

  .addAddress-form-item-ipt {
    width: 380px;
    border: 0;
    background: transparent;
    text-align: right;
  }

  .addAddress-form-item-name {

  }

  .addAddress-form-item-address {
    .icon-dingwei {
      color: #1969C6;
      font-size: 40px;
    }
  }

  .searchResultClass {
    text-align: center;
    height: 100px;
    font-size: 32px;
    color: #666666;
    padding: 30px;

    .searchBtnClass {
      color: #1969C6;
    }
  }

</style>
