<template>
  <div ref="addForm" class="addAddress-form">
    <div
      v-show="!searchEnd"
      class="addAddress-search-head"
    >
      <div class="addAddress-search-par">
        <label class="addAddress-search-name">老顾客搜索</label>
        <b-search-input
          v-model="customerInfo.consigneeUserPhone"
          @search="search('')"
          placeholder="请输入老顾客手机号"
        >
        <span
          class="addAddress-search-btn"
          @click="search('')"
        >搜索</span>
        </b-search-input>
      </div>
      <b-warm-tips
        :tips="warmTips"
      ></b-warm-tips>
    </div>
    <!--<ul
      class="address-back"
      v-show="searchEnd"
    >
      <li>
        <div class="addAddress-form-item">
          <label class="addAddress-form-item-name">顾客手机号</label>
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
    </ul>-->
    <!-- <p
       class="searchResultClass"
       v-show="searchResultShow"
     >
       <span class="searchTextClass">搜索暂无结果,</span><span class="searchBtnClass" @click="creatCustomer">创建信息</span>
     </p>-->
    <ul class="consignee-class" v-show="searchEnd">
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
            oninput="value=value.replace(/[^\d]/g,'')"
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
      <!--20200429，去掉该地址与用户关系-->
      <!--<li>
        <b-item
          title="该地址与用户关系"
          :arrow="true"
          :value="tagName"
          @rightClick="showTags"
        ></b-item>
      </li>-->
      <li>
        <div class="addAddress-form-item">
          <label class="addAddress-form-item-name">设为默认地址</label>
          <md-switch
            v-model="customerInfo.isDefault"
          ></md-switch>
        </div>
      </li>
    </ul>

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
      v-if="addressPopShow"
      @change="addressChange"
      :default-value="defaultAddress"
    ></md-tab-picker>
    <button class="common-bottom-button" @click="confirm()" v-show="searchEnd">确认</button>
    <!--<button class="common-bottom-button" @click="search()" v-show="!searchEnd">搜索</button>-->
    <button class="common-bottom-button" @click="creatCustomer" v-show="!searchEnd">创建新顾客</button>
    <md-dialog
      title="顾客不存在"
      :closable="true"
      v-model="noCustomerDialog.open"
      :btns="noCustomerDialog.btns"
    >
      该手机号不存在，是否为手机号
      <span class="common-haier-blue">{{customerInfo.consigneeUserPhone}}</span>
      创建新顾客？
    </md-dialog>
  </div>
</template>

<script>
import {
  Dialog,
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
import BSearchInput from '../../components/business/BSearchInput';
import BWarmTips from '../../components/form/BWarmTips';

export default {
  name: 'AddAddress',
  components: {
    BWarmTips,
    BSearchInput,
    'md-dialog': Dialog,
    'md-switch': Switch,
    'md-tab-picker': TabPicker,
    BPopCheckList,
    BItem,
    BRadioItem
  },

  data() {
    return {
      // disabled: false,
      confirmClicked: false,
      form: {
        name: '',
        phone: '',
        sex: 1,
        addressDetail: '',
        isDefault: false,
        tag: []
      },
      // 默认地址
      defaultAddress: [],
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
      smld: false,
      // 温馨提示
      warmTips: [
        '新顾客请点击底部创建按钮进行创建；',
        '老顾客可输入客户手机号搜索，将自动跳出顾客信息'
      ],
      // 手机号无对应顾客对话框
      noCustomerDialog: {
        open: false,
        btns: [
          {
            text: '重新搜索',
            handler: this.closeCreatCustomerDialog,
          },
          {
            text: '创建新顾客',
            handler: this.dialogCreatCustomer,
          },
        ],
      },
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
        this.customerInfo.consigneeUserPhone = JSON.parse(this.$route.params.info).mobile;
        if (JSON.parse(this.$route.params.info).customerId) {
          this.customerInfo.customerId = JSON.parse(this.$route.params.info).customerId;
        }
      } else {
        // this.confirmShow = false;
        this.searchEnd = true;
        if (this.region === 'add' && !JSON.parse(this.$route.params.info).address) {
          this.customerInfo.username = JSON.parse(this.$route.params.info).username;
          this.customerInfo.consigneeUserPhone = JSON.parse(this.$route.params.info).mobile;
          this.customerInfo.userId = JSON.parse(this.$route.params.info).userId;
          if (JSON.parse(this.$route.params.info).customerId) {
            this.customerInfo.customerId = JSON.parse(this.$route.params.info).customerId;
          }
          this.smld = true;
        } else if (this.region === 'edit') {
          console.log(JSON.parse(this.$route.params.info));
          this.customerInfo = JSON.parse(this.$route.params.info);
          // this.customerInfo.username = JSON.parse(this.$route.params.info).username;
          // this.customerInfo.consigneeUserPhone = JSON.parse(this.$route.params.info).mobile;
          // this.customerInfo.userId = JSON.parse(this.$route.params.info).userId;
          // this.customerInfo.consigneeUserName = JSON.parse(this.$route.params.info).consigneeUserName;
          // this.customerInfo.consigneeUserPhone = JSON.parse(this.$route.params.info).consigneeUserPhone;
          // this.customerInfo.sex = JSON.parse(this.$route.params.info).sex;
          // this.customerInfo.address = JSON.parse(this.$route.params.info).address;
          // this.customerInfo.id = JSON.parse(this.$route.params.info).id;
        } else {
          console.log(JSON.parse(this.$route.params.info));
          this.customerInfo.username = JSON.parse(this.$route.params.info).username;
          this.customerInfo.consigneeUserPhone = JSON.parse(this.$route.params.info).mobile;
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
      if (this.$route.params.info !== '{}') {
        const obj = JSON.parse(this.$route.params.info);
        // 默认地址
        this.setAddressPickerVal({
          ...obj,
          regionCode: obj.regionCode,
          provinceName: obj.consignee && obj.consignee.provinceName,
          cityName: obj.consignee && obj.consignee.cityName,
          districtName: obj.consignee && obj.consignee.districtName,
        });
      }
    }
    // 无地址信息，就用定位
    if (!this.defaultAddress.length) {
      this.getCurAddress();
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
    getCurAddress() {
      /* 获取坐标 */
      wx.getLocation({
        type: 'wgs84',
        success: (res) => {
          this.getAddressCode(res);
        }
      });
    },
    getAddressCode({ longitude, latitude }) {
      this.orderService.getLocationByBaiduMap({
        longitude,
        latitude,
      }).then(({ code, data }) => {
        if (code === 1) {
          const {
            proCode,
            cityCode,
            regionCode
          } = data;
          // 为customerInfo添加值
          this.customerInfo.province = proCode;
          this.customerInfo.city = cityCode;
          this.customerInfo.district = regionCode;
          // picker添加值
          this.setAddressPickerVal({
            province: proCode,
            city: cityCode,
            district: regionCode,
            regionCode: `${proCode}${cityCode}${regionCode}`,
            provinceName: data.province,
            cityName: data.city,
            districtName: data.district,
          });
        }
      });
    },
    setAddressPickerVal(obj) {
      /* 设置地址选择的值 */
      // newAddress更新store用
      this.newAddress.provinceName = obj.provinceName || '';
      this.newAddress.districtName = obj.districtName || '';
      this.newAddress.cityName = obj.cityName || '';
      this.newAddress.regionCode = obj.regionCode || '';
      // 设置picker的选中值
      // code和名字必须有，任何一个没有清空
      if (obj.province && obj.city && obj.district && obj.provinceName && obj.cityName && obj.districtName) {
        this.defaultAddress = [obj.province, obj.city, obj.district];
        this.addressName = `${obj.provinceName}/${obj.cityName}/${obj.districtName}`;
      } else {
        this.defaultAddress = [];
        this.addressName = '';
      }
    },
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
      if (!(/^1[3456789]\d{9}$/.test(this.customerInfo.consigneeUserPhone))) {
        Toast.failed('手机格式错误');
        this.customerInfo.consigneeUserPhone = '';
        return;
      }
      this.productService.deafaultCustomerAddress(this.customerInfo.consigneeUserPhone).then((res) => {
        if (res.code === 1) {
          if (res.data) {
            this.searchEnd = true;
            this.customerInfo.username = res.data.username;
            this.customerInfo.sex = res.data.sex;
            this.customerInfo.customerId = res.data.customerId;
            this.customerInfo.consigneeUserName = res.data.consigneeUserName;
            this.customerInfo.consigneeUserPhone = res.data.consigneeUserPhone;
            this.defaultAddress.push(res.data.province);
            this.defaultAddress.push(res.data.city);
            this.defaultAddress.push(res.data.district);
            this.$router.go(-1);
          } else {
            this.noCustomerDialog.open = true;
          }
        }
      });
    },
    creatCustomer() {
      this.searchEnd = true;
    },
    closeCreatCustomerDialog() {
      /* 重新搜索 */
      this.noCustomerDialog.open = false;
      this.customerInfo.consigneeUserPhone = '';
    },
    dialogCreatCustomer() {
      /* 无顾客对话框创建顾客 */
      this.noCustomerDialog.open = false;
      this.creatCustomer();
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
      if (!this.customerInfo.consigneeUserName) {
        Toast.failed('收货人姓名不能为空');
        return;
      }
      if (!this.customerInfo.consigneeUserPhone) {
        Toast.failed('收货人手机号不能为空');
        return;
      }
      if (!(/^1[3456789]\d{9}$/.test(this.customerInfo.consigneeUserPhone))) {
        Toast.failed('请填写正确的手机号');
        this.customerInfo.consigneeUserPhone = '';
        return;
      }
      /* if (this.customerInfo.username === '' || !this.customerInfo.username) {
            Toast.failed('顾客姓名不能为空');
            return;
          } */
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
      // 现在顾客手机号姓名默认为收货人手机号和姓名
      this.customerInfo.username = this.customerInfo.consigneeUserName;
      this.customerInfo.mobile = this.customerInfo.consigneeUserPhone;

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
        if (this.$route.params.businessScenarios !== '') {
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
      tel: this.customerInfo.consigneeUserPhone,
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

    border-bottom: 1px solid #F5F5F5;
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

  .fs26 {
    font-size: 26px !important;
  }

  .text-666 {
    color: #666;
  }

  .w100 {
    width: 100% !important;
  }

  .addAddress-search-par {
    display: flex;
    align-items: center;
    font-size: 28px;
    background: #fff;

    .bSearchInput-wrap {
      border: 1px solid #ddd;
    }
  }

  .addAddress-search-head {
    .bWarmTips {
      margin-top: 12px;
    }
  }

  .addAddress-search-name {
    color: #666;
    flex-shrink: 0;
    padding-left: 24px;
  }

  .addAddress-search-btn {
    color: #1969C6;
  }
</style>
