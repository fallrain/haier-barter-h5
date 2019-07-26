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
        <div class="addAddress-form-item">
          <label class="addAddress-form-item-name">设为默认地址</label>
          <md-switch
            v-model="form.isDefault"
          ></md-switch>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  Switch
} from 'mand-mobile';

import {
  BRadioItem
} from '@/components/form';

export default {
  name: 'AddAddress',
  components: {
    'md-switch': Switch,
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
    };
  }
};
</script>

<style lang="scss">
  .addAddress-form {
    background: #fff;
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 4px;
  }

  .addAddress-form-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    padding-left: 3px;
    padding-right: 3px;
    border-bottom: 1px solid #F5F5F5;
    font-size: 26px;
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
</style>
