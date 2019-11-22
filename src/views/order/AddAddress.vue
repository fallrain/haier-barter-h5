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
            v-model="customerInfo.mobile"
            v-show="region !== 'userAdd'"
            v-resetInput
          >
          <input
            type="number"
            class="addAddress-form-item-ipt"
            placeholder="请输入手机号"
            disabled="true"
            v-show="region === 'userAdd'"
            v-model="customerInfo.mobile"
            v-resetInput
          >
        </div>
      </li>
      <p class="searchResultClass" v-show="searchResultShow">
        <span class="searchTextClass">搜索暂无结果,</span><span class="searchBtnClass" @click="creatCustomer">创建信息</span>
      </p>
      <div v-show="searchEnd">
        <li>
          <div class="addAddress-form-item">
            <label class="addAddress-form-item-name">顾客姓名</label>
            <input
              type="text"
              class="addAddress-form-item-ipt"
              placeholder="请输入姓名"
              v-show="region !== 'userAdd'"
              v-model="customerInfo.username"
              @input="judgeName(customerInfo.username, 20)"
              v-resetInput
            >
            <input
              type="text"
              class="addAddress-form-item-ipt"
              placeholder="请输入姓名"
              disabled="true"
              v-show="region === 'userAdd'"
              v-model="customerInfo.username"
              v-resetInput
            >
          </div>
        </li>
      </div>
    </ul>
    <div class="consignee-class" v-show="searchEnd">
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
            type="text"
            oninput = "value=value.replace(/[^\d]/g,'')"
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
        <div class="addAddress-form-item1">
          <label class="addAddress-form-item-name w100per fs26 text-666 dis-block">详细地址</label>
          <input
            type="text"
            class="addAddress-form-item-ipt w100"
            placeholder="街道 门牌、楼层房间号等信息"
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
    <button class="common-bottom-button" @click="confirm()" v-show="searchEnd">确认</button>
    <button class="common-bottom-button" @click="search()" v-show="!searchEnd">搜索</button>
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
  name: 'AddAddress',
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
      // disabled: false,
      searchResultShow: false,
      confirmClicked: false,
      form: {
        name: '',
        phone: '',
        sex: 1,
        addressDetail: '',
        isDefault: false,
        tag: []
      },
      defaultA: [],
      customerInfo: {
        address: '',
        city: '',
        isDefault: false,
        district: '',
        id: '',
        familyItemCode: '',
        hmcId: '',
        mobile: '',
        province: '',
        sex: 1,
        userId: '',
        username: '',
        tag: []
      },
      customerInfoCreate: {
        address: '',
        city: '',
        isDefault: false,
        district: '',
        familyItemCode: '',
        hmcId: '',
        mobile: '',
        province: '',
        sex: 1,
        userId: '',
        username: '',
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
      // tagList: [],
      tag: [],
      tagList: [],
      // 地址pop显示隐藏
      addressPopShow: false,
      addressName: '',
      confirmShow: false,
      smld: false
    };
  },
  activated() {
    if (this.$route.params) {
      this.region = this.$route.params.region;
      console.log(this.region);
      if (this.region === 'add' && this.$route.params.info === '{}') {
        this.confirmShow = true;
      } else if (this.region === 'userAdd' && this.$route.params.info === '{}') {
        this.confirmShow = true;
        this.searchEnd = false;
      } else if (this.region === 'userAdd' && this.$route.params.info !== '{}') {
        this.confirmShow = true;
        this.searchEnd = true;
        this.customerInfo.username = JSON.parse(this.$route.params.info).username;
        this.customerInfo.userId = JSON.parse(this.$route.params.info).userId;
        this.customerInfo.mobile = JSON.parse(this.$route.params.info).mobile;
        if (JSON.parse(this.$route.params.info).customerId) {
          this.customerInfo.customerId = JSON.parse(this.$route.params.info).customerId;
        }
      } else {
        // this.confirmShow = false;
        this.searchEnd = true;
        if (this.region === 'add' && !JSON.parse(this.$route.params.info).address) {
          this.customerInfo.username = JSON.parse(this.$route.params.info).username;
          this.customerInfo.mobile = JSON.parse(this.$route.params.info).mobile;
          this.customerInfo.userId = JSON.parse(this.$route.params.info).userId;
          if (JSON.parse(this.$route.params.info).customerId) {
            this.customerInfo.customerId = JSON.parse(this.$route.params.info).customerId;
          }
          this.smld = true;
        } else if (this.region === 'edit') {
          console.log(JSON.parse(this.$route.params.info));
          this.customerInfo = JSON.parse(this.$route.params.info);
          // this.customerInfo.username = JSON.parse(this.$route.params.info).username;
          // this.customerInfo.mobile = JSON.parse(this.$route.params.info).mobile;
          // this.customerInfo.userId = JSON.parse(this.$route.params.info).userId;
          // this.customerInfo.consigneeUserName = JSON.parse(this.$route.params.info).consigneeUserName;
          // this.customerInfo.consigneeUserPhone = JSON.parse(this.$route.params.info).consigneeUserPhone;
          // this.customerInfo.sex = JSON.parse(this.$route.params.info).sex;
          // this.customerInfo.address = JSON.parse(this.$route.params.info).address;
          // this.customerInfo.id = JSON.parse(this.$route.params.info).id;
        } else {
          console.log(JSON.parse(this.$route.params.info));
          this.customerInfo.username = JSON.parse(this.$route.params.info).username;
          this.customerInfo.mobile = JSON.parse(this.$route.params.info).mobile;
          this.customerInfo.userId = JSON.parse(this.$route.params.info).userId;
          // this.customerInfo = JSON.parse(this.$route.params.info);
          this.customerInfo.hmcId = JSON.parse(localStorage.getItem('userinfo')).hmcid;
          // this.customerInfo.familyId = JSON.parse(this.$route.params.info).familyId;
        }
        if (this.customerInfo.familyItemCode) {
          const a = [];
          a.push(this.customerInfo.familyItemCode);
          this.customerInfo.tag = a;
        }
      }
      if (this.$route.params.info != '{}') {
        const obj = JSON.parse(this.$route.params.info);
        console.log(obj);
        this.newAddress.provinceName = JSON.parse(this.$route.params.info).consignee.provinceName;
        this.newAddress.districtName = JSON.parse(this.$route.params.info).consignee.districtName;
        this.newAddress.cityName = JSON.parse(this.$route.params.info).consignee.cityName;
        this.newAddress.regionCode = JSON.parse(this.$route.params.info).regionCode;
        this.addressName = `${this.newAddress.provinceName}/${this.newAddress.cityName}/${this.newAddress.districtName}`;
      }
    }
  },
  created() {
    // 不加入双向绑定
    this.addressData = addressData;
    this.customerInfo.hmcId = JSON.parse(localStorage.getItem('userinfo')).hmcid;
    this.customerInfo.tag = [];
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
    search() {
      // this.searchEnd = true;
      if (!(/^1[3456789]\d{9}$/.test(this.customerInfo.mobile))) {
        Toast.failed('手机格式错误');
        this.customerInfo.mobile = '';
        return;
      }
      this.productService.deafaultCustomerAddress(this.customerInfo.mobile).then((res) => {
        if (res.code === 1) {
          if (res.data) {
            this.searchResultShow = false;
            this.searchEnd = true;
            this.customerInfo.username = res.data.username;
            this.customerInfo.sex = res.data.sex;
            this.customerInfo.customerId = res.data.customerId;
            this.customerInfo.consigneeUserName = res.data.consigneeUserName;
            this.customerInfo.consigneeUserPhone = res.data.consigneeUserPhone;
            this.defaultA.push(res.data.province);
            this.defaultA.push(res.data.city);
            this.defaultA.push(res.data.district);
            this.$router.go(-1);
          } else {
            this.searchResultShow = true;
          }
        }
      });
    },
    creatCustomer() {
      this.searchEnd = true;
      this.searchResultShow = false;
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
      this.customerInfo.address = this.customerInfo.address.replace(/[\r\n]/g, '');
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
      if (this.region === 'add' || this.region === 'userAdd') {
        delete this.customerInfo.id;
        if (this.$route.params.businessScenarios != '') {
          this.customerInfo.source = this.$route.params.businessScenarios;
        }
        this.productService.addcustomerAddress(this.customerInfo, {}).then((res) => {
          if (res.code === 1) {
            Toast.succeed('地址添加成功');
            this.confirmClicked = true;
            this.$router.go(-1);
          }
        });
      } else {
        delete this.customerInfo.hmcId;
        this.productService.updateCustomerAddress(this.customerInfo, {}).then((res) => {
          if (res.code === 1) {
            Toast.succeed('地址修改成功');
            this.confirmClicked = true;
            this.$router.go(-1);
          }
        });
      }
      const newAddress = {
        provinceName: this.newAddress.provinceName,
        cityName: this.newAddress.cityName,
        areaName: this.newAddress.districtName,
        detailAddress: this.customerInfo.address,
        regionCode: this.newAddress.regionCode,
        consigneeName: this.customerInfo.consigneeUserName,
        consigneePhone: this.customerInfo.consigneeUserPhone
      };
      this.updataNewAddress(newAddress);
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
        Toast.failed('对多可输入20个字符！');
        this.customerInfo.username = strResult.slice(0, max);
      }
    },
    judgeName1(str, max) {
      const strResult = String(str);
      if (strResult.length > max) {
        Toast.failed('对多可输入20个字符！');
        this.customerInfo.consigneeUserName = strResult.slice(0, max);
      }
    },
    judgeAddress(str, max) {
      const strResult = String(str);
      if (strResult.length > max) {
        Toast.failed('对多可输入30个字符！');
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
    const obj = {
      tel: this.customerInfo.mobile,
      smld: this.smld,
      customerInfo: this.customerInfo,
      region: this.region
    };
    if (to.name === 'Order.OrderEntry' || 'Order.OrderModify') {
      to.query.temp = JSON.stringify(obj);
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
    if (this.smld) {
      if (this.confirmClicked) {
        next();// 必须要有这个，否则无法跳转
      } else {
        Toast.failed('请添加用户信息');
      }
    } else {
      next();
    }
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
  .fs26{
    font-size: 26px !important;
  }
  .text-666{
    color: #666;
  }
  .w100{
    width: 100% !important;
  }
</style>
