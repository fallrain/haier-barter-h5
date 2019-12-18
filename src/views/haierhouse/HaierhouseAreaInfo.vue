<template>
<div class="fs28">
  <div class="text-999 lh70 pl20">覆盖小区信息</div>
  <div class="dis-flex jus-bt row-style br-b">
    <div class="text-333">
      覆盖小区
    </div>
    <div class="fg1 text-666 pl20">
      <input type="text" v-model="customerInfo.districtName" class="w100per input-style">
    </div>
  </div>
  <div class="br-b">
    <b-item
      title="详细地址"
      :arrow="true"
      :value="customerInfo.provinceCityArea"
      @rightClick="showAddressPop"
      iconClass="icon-dingwei"
      placeholder="选择省/市/区(县)"
    ></b-item>
    <div class="pl120 row-style">
      <input type="text" v-model="customerInfo.districtAddress" class="w100per input-style text-right" placeholder="请输入详细地址,具体到门牌号">
    </div>
  </div>
  <div class="mt16">
    <div class="text-333 br-b row-style">小区户型</div>
    <div class="row-style br-b clear">
      <md-check-list
        v-model="houseTypeV"
        iconPosition="left"
        :options="houseType"
        inline
      />
    </div>
  </div>
  <div class="dis-flex row-style br-b">
    <div class="">小区面积</div>
    <div class="fg1 dis-flex">
      <input type="text" v-model="customerInfo.districtAreaStart" @click="timeShow(1)"
             class="w250 input-style text-center pr20" placeholder="请输入">
      <div class="">至</div>
      <input type="text" v-model="customerInfo.districtAreaEnd" @click="timeShow(2)"
             class="w250 input-style text-center pr20" placeholder="请输入">
      <div class="text-primary">平米</div>
    </div>
  </div>
  <div class="dis-flex row-style br-b">
    <div class="">均价</div>
    <div class="fg1 dis-flex">
      <div class="fg1 pl20 pr20">
        <input type="number" v-model="customerInfo.saleAveragePrice"
               class="w100per input-style text-right" placeholder="请输入">
      </div>
      <div class="text-primary">元/月</div>
    </div>
  </div>
  <div class="mb20">
    <div class="text-333 row-style">小区照片</div>
    <div class="bg-white p20">
      <b-upload
        :crop="false"
        inputOfFile="file"
        :max-file-size="1024*1024*5"
        :maxWidth="1280"
        :maxLength="3"
        :compress="70"
        :headers="headers"
        @imageuploaded="(data, fileList)=>imageuploaded(data, fileList, '0')"
        extensions="png,jpg,jpeg,gif"
        :url="uploadUrl"
        :multiple-size="1"
        @delFun="delImg"
        @errorhandle="uploadError"
      >
      </b-upload>
    </div>
  </div>
  <div class="bottom-btn">
    <md-button type="primary" inline>完成</md-button>
    <md-button type="primary" inline plain>继续添加覆盖小区</md-button>
  </div>
  <md-tab-picker
    title="请选择"
    describe="请选择您所在的省份、城市、区县"
    large-radius
    :data="addressData"
    v-model="addressPopShow"
    @change="addressChange"
    :default-value="defaultA"
  ></md-tab-picker>
</div>
</template>
<script>
import {
  Radio, Field, FieldItem, TabPicker, Icon, DatePicker, Check, CheckGroup, CheckList,Button
} from 'mand-mobile';
import {
  BItem,
  BUpload
} from '@/components/form';

import addressData from '@/lib/address';

export default {
  name: 'HaierhouseApply',
  components: {
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [Radio.name]: Radio,
    [TabPicker.name]: TabPicker,
    [Icon.name]: Icon,
    [DatePicker.name]: DatePicker,
    [Check.name]: Check,
    [CheckGroup.name]: CheckGroup,
    [CheckList.name]: CheckList,
    [Button .name]: Button ,
    BItem,
    BUpload
  },
  data() {
    return {
      addressName: '',
      // 地址pop显示隐藏
      addressPopShow: false,
      defaultA: [],
      uploadUrl: '/api/file/simpleUpload',
      headers: {
        Authorization: ''
      },
      customerInfo: {
        id: '',
        districtName: '',
        provinceCityArea: '',
        districtAddress: '',
        districtScope: '',
        layoutType: '',
        districtAreaStart: '',
        districtAreaEnd: '',
        saleAveragePrice: '',
        imageUrlSaveVOList: [
          {
            imageType: '',
            imageUrl: ''
          }
        ]
      },
      houseType: [
      ],
      houseTypeV: []
    };
  },
  created() {
    this.addressData = addressData;
    this.headers.Authorization = `Bearer  ${localStorage.getItem('acces_token')}`;
    // 家庭户型字典
    this.productService.commonTypeQuery('HOUSETYPE_ITEM').then((res) => {
      if (res.code === 1) {
        res.data.forEach((item) => {
          item.value = item.id;
          item.label = item.itemName;
        })
        this.houseType = res.data;
      }
    });
  },
  computed: {
  },
  methods: {
    getHouseType() {

    },
    showAddressPop() {
      /* 展示地址pop */
      this.addressPopShow = true;
    },
    addressChange(address) {
      const addressName = address.options;
      this.customerInfo.provinceCityArea = addressName[0].label + addressName[1].label + addressName[2].label;
    },
    imageuploaded(data, fileList, item) {
      const itemImg = {};
      if (data.code === 1) {
        itemImg.imageType = item.value;
        itemImg.imageUrl = data.data;
      }
      fileList.push(data.data);
    },
    delImg(index, fileList) {
      fileList.splice(index, 1);
    },
    uploadError(res) {
      /* 上传错误 */
      const errorObj = {
        'FILE IS TOO LARGER MAX FILE IS': '图片最大不能超过5M'
      };
      for (const p in errorObj) {
        if (new RegExp(p).test(res)) {
          Toast.failed(errorObj[p]);
          return;
        }
      }
      Toast.failed(res || '上传失败');
    }
  }
};
</script>
<style lang="scss">
  .clear {
    clear: both;
    overflow: hidden;
  }
  .bottom-btn{
    background: #fff;
    padding: 20px;
    button{
      width: 50%;
    }
  }
  .md-check-list .md-cell-item{
    float: left !important;
    margin-right: 20px !important;
  }
  .md-cell-item-body:before {
    border-bottom: none!important;
  }
  .md-icon{
    line-height: 80px;
  }
  .icon-dingwei,.iconfont{
    color: #1969C6 !important;
  }
  .row-style{
    padding: 0 24px;
    line-height: 80px;
    background: #fff;
  }
  .input-style{
    border: none;
    line-height: 80px;
  }
  .jus-bt{
    justify-content: space-between;
  }
  .fg1{
    flex-grow: 1;
  }
  .br-b{
    border-bottom: 1px solid #eee;
  }
  .fs28{
    font-size: 28px;
  }
  .text-right{
    text-align: right;
  }
  .text-333{
    color: #333;
  }
  .text-666{
    color: #666;
  }
  .text-999{
    color: #999;
  }
  .text-primary{
    color: #1969C6;
  }
  .lh40{
    line-height: 40px;
  }
  .lh70{
    line-height: 70px;
  }
  .p20{
    padding: 20px;
  }
  .pl20{
    padding-left: 20px!important;
  }
  .pr20{
    padding-right: 20px!important;
  }
  .pl120{
    padding-left: 120px!important;
  }
  .w200{
    width: 200px;
  }
  .w250{
    width: 250px;
  }
  .bg-white{
    background: #fff;
  }
</style>
