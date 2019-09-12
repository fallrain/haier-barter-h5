<template>
  <div class="addAddress-form">
    <ul>
      <li>
        <div class="addAddress-form-item">
          <label class="addAddress-form-item-name">手机号</label>
          <input
            type="text"
            class="addAddress-form-item-ipt"
            placeholder="请输入手机号"
            v-model="customerInfo.mobile"

          >
        </div>
      </li>
      <div v-show="searchEnd">
      <li>
        <div class="addAddress-form-item">
          <label class="addAddress-form-item-name">姓名</label>
          <input
            type="text"
            class="addAddress-form-item-ipt"
            placeholder="请输入姓名"
            v-model="customerInfo.username"
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
            v-model="customerInfo.default"
          ></md-switch>
        </div>
      </li>
      </div>
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
      @change="addressChange"
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
        // customerId: '',
        isDefault: false,
        district: '',
        // familyId: '',
        familyItemCode: '',
        // hmcId: 'A0008949',
        hmcId: '',
        mobile: '',
        province: '',
        sex: 0,
        userId: '',
        source: '',
        username: '',
        tag: []
      },
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
      tagList: [
        {
          id: 1,
          name: '自己家'
        },
        {
          id: 2,
          name: '办公室'
        },
        {
          id: 3,
          name: '父母家'
        },
        {
          id: 4,
          name: '其他'
        }
      ],
      // 地址pop显示隐藏
      addressPopShow: false,
      addressName: '',
      confirmShow: false
    };
  },
  created() {
    // 不加入双向绑定
    this.addressData = addressData;
    // this.getFamilyItem()
    this.customerInfo.hmcId = JSON.parse(localStorage.getItem('userinfo')).hmcid
    if (this.$route.params) {
      this.region = this.$route.params.region;
      debugger
      if (this.region === 'add') {
        this.confirmShow = true;
      } else if (this.region === 'userAdd') {
        this.confirmShow = true;
        this.searchEnd = true;
      } else {
        this.disabled = true;
        // this.confirmShow = false;
        this.searchEnd = true;
        this.customerInfo = JSON.parse(this.$route.params.info);
        // this.customerInfo.tag = [];
        // debugger
        if(this.customerInfo.familyItemCode){
          this.customerInfo.tag = [];
          this.customerInfo.tag.push(this.customerInfo.familyItemCode)
        }

      }
    }
    // this.getFamilyItem();
  },
  computed: {
    tagName() {
      const tagObj = this.tagList.find(v => v.id === this.customerInfo.tag[0]);
      let name;
      if (tagObj) {
        name = tagObj.name;
      } else {
        name = '';
      }
      return name;
    },
  },
  methods: {
    showTags() {
      /* 地址标签显示隐藏 */
      this.tagPopShow = true;
    },
    showAddressPop() {
      /* 展示地址pop */
      this.addressPopShow = true;
    },
    search() {
      this.searchEnd = true;
      if (!(/^1[34578]\d{9}$/.test(this.customerInfo.mobile))) {
        Toast.failed('手机格式错误');
        this.customerInfo.mobile = '';
        return;
      }
      this.productService.deafaultCustomerAddress({ mobile: this.customerInfo.mobile }).then((res) => {
        if (res.code === 1) {

        } else {
          Toast.failed('暂无信息请输入');
        }
      });
    },
    addressChange(address) {
      /* 地址change */
      const addressA = address.options.map(v => v.label);
      const addressAy = address.values;
      this.customerInfo.city = addressAy[1];
      this.customerInfo.province = addressAy[0];
      this.customerInfo.district = addressAy[2];
      this.addressName = addressA.join('/');
    },
    confirm() {
      if (!(/^1[34578]\d{9}$/.test(this.customerInfo.mobile))) {
        Toast.failed('手机格式错误');
        this.customerInfo.mobile = '';
        return;
      }
      if (this.customerInfo.username === '') {
        Toast.failed('姓名不能为空');
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
        Toast.failed('地址不能为空');
        return;
      }
        debugger
      if(this.customerInfo.tag){
        const tagObj = this.tagList.find(v => v.id === this.customerInfo.tag[0]);
        if (tagObj) {
          this.customerInfo.familyItemCode = tagObj.id;
        } else {
          this.customerInfo.familyItemCode = '';
        }
        delete this.customerInfo.tag;
      }

      if (this.confirmShow) {
        this.productService.addcustomerAddress(this.customerInfo, {}).then((res) => {
          if (res.code === 1) {
            Toast.succeed('地址添加成功');
            this.$router.go(-1);
          }
        });
      } else {
        this.productService.updateCustomerAddress(this.customerInfo, {}).then((res) => {
          if (res.code === 1) {
            Toast.succeed('地址修改成功');
            this.$router.go(-1);
          }
        });
      }
    },
    // 修改地址
    updateAddress() {
      this.productService.updateCustomerAddress(this.customerInfo).then((res) => {
        debugger;
        if (res.code === 1) {

        }
      });
    },
    // 查询家庭关系数据字典
    getFamilyItem() {
      this.productService.commonTypeQuery({ type: 'FAMILY-ITEM' }).then((res) => {
        debugger;
        if (res.code === 1) {
          res.data.forEach((val) => {
            const a = {};
            a.name = val.itemName;
            a.id = val.id;
            this.tagList.push(a);
          });
        }
      });
    }

  },
  beforeRouteLeave(to, from, next) {
    debugger;
    const obj = { tel: this.customerInfo.mobile };

    if (to.name === 'Order.OrderEntry') {
      to.query.temp = JSON.stringify(obj);
    }
    next();// 必须要有这个，否则无法跳转
  },
};
</script>

<style lang="scss">
  .addAddress-form {
    background: #fff;
    padding-left: 24px;
    padding-right: 24px;
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
</style>
