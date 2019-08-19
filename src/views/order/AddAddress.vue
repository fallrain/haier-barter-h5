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
            v-model="form.phone"
          >
        </div>
      </li>
      <li>
        <div class="addAddress-form-item">
          <label class="addAddress-form-item-name">姓名</label>
          <input
            type="text"
            class="addAddress-form-item-ipt"
            placeholder="请输入姓名"
            v-model="form.name"
          >
        </div>
      </li>
      <li>
        <div class="addAddress-form-item">
          <label class="addAddress-form-item-name">性别</label>
          <b-radio-item
            :inline="true"
            :list="sexTypes"
            v-model="form.sex"
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
            v-model="form.addressDetail"
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
            v-model="form.isDefault"
          ></md-switch>
        </div>
      </li>
    </ul>
    <b-pop-check-list
      type="radio"
      :show.sync="tagPopShow"
      :list="tagList"
      v-model="form.tag"
    ></b-pop-check-list>
    <md-tab-picker
      title="请选择"
      describe="请选择您所在的省份、城市、区县"
      large-radius
      :data="addressData"
      v-model="addressPopShow"
      @change="addressChange"
    ></md-tab-picker>
      <button class="common-bottom-button" @click="confirm()">确认</button>
  </div>
</template>

<script>
import {
  Switch,
  TabPicker
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
    BRadioItem
  },
  data() {
    return {
      form: {
        name: '',
        phone: '',
        sex: 1,
        addressDetail: '',
        isDefault: false,
        tag: []
      },
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
      // 地址标签列表
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
      addressName: ''
    };
  },
  created() {
    // 不加入双向绑定
    this.addressData = addressData;
  },
  computed: {
    tagName() {
      const tagObj = this.tagList.find(v => v.id === this.form.tag[0]);
      let name;
      if (tagObj) {
        name = tagObj.name;
      } else {
        name = '';
      }
      return name;
    }
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
    addressChange(address) {
      /* 地址change */
      const addressAy = address.options.map(v => v.label);
      this.addressName = addressAy.join('/');
    },
    confirm(){
      // window.location.href=encodeURI('/order/orderEntry?'+'address='+ '111111')
      debugger
      this.$router.go(-1);

    }
  },
  beforeRouteLeave (to, from, next) {
    debugger
      if (to.name === 'Order.OrderEntry') {
        to.query.temp = '这里是参数，选中后的地址'
      }
      console.log(to)
      console.log(from)
    next()//必须要有这个，否则无法跳转
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
