<template>
<div class="fs28">
  <div class="text-999 lh70 pl20">覆盖小区信息</div>
  <div class="dis-flex jus-bt row-style br-b">
    <div class="text-333 fs28">
      覆盖小区
    </div>
    <div class="fg1 text-666 pl20">
      <input type="text" v-model="customerInfo.districtScope"
             @input="dealChange(30, 'districtScope')"
             class="w100per input-style text-right" placeholder="请输入">
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
      <input type="text" v-model="customerInfo.districtAddress"
             @input="dealChange(50, 'districtAddress')"
             class="w100per input-style text-right" placeholder="请输入详细地址,具体到门牌号">
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
      <input type="text" v-model="customerInfo.districtAreaStart"
             @blur="judegNum(customerInfo.districtAreaStart,'districtAreaStart')"
             class="w250 input-style text-center pr20" placeholder="请输入">
      <div class="">至</div>
      <input type="text" v-model="customerInfo.districtAreaEnd"
             class="w250 input-style text-center pr20" placeholder="请输入">
      <div class="text-primary">平米</div>
    </div>
  </div>
  <div class="dis-flex row-style br-b">
    <div class="">均价</div>
    <div class="fg1 dis-flex">
      <div class="fg1 pl20 pr20">
        <input type="text" v-model="customerInfo.saleAveragePrice"
               @blur="judegNum(customerInfo.saleAveragePrice,'saleAveragePrice')"
               class="w100per input-style text-right" placeholder="请输入">
      </div>
      <div class="text-primary">元/月</div>
    </div>
  </div>
  <div class="mb20">
    <div class="text-333 row-style">小区照片</div>
    <div class="bg-white p20">
      <b-upload
        :imgs="uploadImg"
        :crop="false"
        inputOfFile="file"
        :max-file-size="1024*1024*5"
        :maxWidth="1280"
        :maxLength="3"
        :compress="70"
        :headers="headers"
        @imageuploaded="(data, fileList)=>imageuploaded(data, fileList)"
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
    <md-button type="primary" @click="complete" inline>完成</md-button>
    <md-button type="primary" @click="continu" inline plain>继续添加覆盖小区</md-button>
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
  Radio, Field, FieldItem, TabPicker, Icon, DatePicker, Check, CheckGroup, CheckList, Button, Toast
} from 'mand-mobile';
import {
  BItem,
  BUpload
} from '@/components/form';

import addressData from '@/lib/address';

export default {
  name: 'HaierhouseAreaInfo',
  components: {
    Toast,
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [Radio.name]: Radio,
    [TabPicker.name]: TabPicker,
    [Icon.name]: Icon,
    [DatePicker.name]: DatePicker,
    [Check.name]: Check,
    [CheckGroup.name]: CheckGroup,
    [CheckList.name]: CheckList,
    [Button.name]: Button,
    BItem,
    BUpload
  },
  data() {
    return {
      shopId: '',
      isChange: false,
      areaIndex: 0,
      decoModelDistrictInfoDTOList: [],
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
        ]
      },
      houseType: [
      ],
      houseTypeV: [],
      houseTypeN: [],
      uploadImg: []
    };
  },
  activated() {
    debugger;
    if (this.$route.params.customerInfo) {
      this.isChange = true;
      this.shopId = this.$route.params.customerInfo.id;
      if (this.$route.params.customerInfo.decoModelDistrictInfoDTOList.length > 0) {
        this.decoModelDistrictInfoDTOList = this.$route.params.customerInfo.decoModelDistrictInfoDTOList;
        this.customerInfo = this.decoModelDistrictInfoDTOList[0];
        this.houseTypeV[0] = this.customerInfo.layoutType;
        this.uploadImg = [];
        if (this.customerInfo.decoModelImageUrlDTOList.length > 0) {
          this.customerInfo.decoModelImageUrlDTOList.forEach((item) => {
            this.uploadImg.push(item.imageUrl);
          });
        }
      }
    } else {
      this.isChange = false;
      this.customerInfo.shopId = this.$route.query.shopId;
      this.shopId = this.$route.query.shopId;
    }
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
        });
        this.houseType = res.data;
      }
    });
  },
  watch: {
    houseTypeV(val) {
      this.houseTypeN = [];
      val.forEach((item) => {
        this.houseType.forEach((item1) => {
          if (item1.value === item) {
            this.houseTypeN.push(item1.label);
          }
        });
      });
    }
  },
  methods: {
    dealChange(num, key) {
      if (this.customerInfo[key].length > num) {
        Toast.failed(`最多输入${num}个字符`);
        this.customerInfo[key] = this.customerInfo.districtScope.substring(0, num);
      }
    },
    judegNum(num, key) {
      debugger;
      if (!this.testStr(num) || num > 100000) {
        this.customerInfo[key] = '';
        Toast.failed('请输入正确的数值，最大数值为100000且小数点后两位');
      } else if (this.customerInfo.districtAreaStart > this.customerInfo.districtAreaEnd) {
        Toast.failed('小区区间范围有误，开始数值应大于结束数值')
      }
    },
    testStr(num) {
      const reg = /^(\d+)(.\d{0,2})?$/;
      return reg.test(num);
    },
    showAddressPop() {
      /* 展示地址pop */
      this.addressPopShow = true;
    },
    addressChange(address) {
      const addressName = address.options;
      this.customerInfo.provinceCityArea = addressName[0].label + addressName[1].label + addressName[2].label;
    },
    imageuploaded(data, fileList) {
      const itemImg = {};
      if (data.code === 1) {
        itemImg.imageType = 0;
        itemImg.imageUrl = data.data;
      }
      if (!this.customerInfo.imageUrlSaveVOList) {
        this.customerInfo.imageUrlSaveVOList = [];
      }
      this.customerInfo.imageUrlSaveVOList.push(itemImg);
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
    },
    complete() {
      if (!this.confirm()) {
        return;
      }
      console.log(this.customerInfo);
      if (!this.isChange) {
        delete this.customerInfo.id;
      } else {
        this.customerInfo.id = this.id;
      }
      this.haierhouseService.addDistrictInfo(this.customerInfo, {}).then((res) => {
        if (res.code === 1) {
          this.$router.push({
            name: 'Haierhouse.HaierhouseEntry'
          });
        }
      });
    },
    continu() {
      if (!this.confirm()) {
        return;
      }
      this.haierhouseService.addDistrictInfo(this.customerInfo, {}).then((res) => {
        if (res.code === 1) {
          // this.$router.go(0);
          if (this.isChange) {
            this.areaIndex++;
            console.log(this.decoModelDistrictInfoDTOList);
            console.log(this.areaIndex);
            if (this.areaIndex < this.decoModelDistrictInfoDTOList.length) {
              this.customerInfo = this.decoModelDistrictInfoDTOList[this.areaIndex];
              this.houseTypeV[0] = this.customerInfo.layoutType;
              this.uploadImg = [];
              if (this.customerInfo.decoModelImageUrlDTOList.length > 0) {
                this.customerInfo.decoModelImageUrlDTOList.forEach((item) => {
                  this.uploadImg.push(item.imageUrl);
                });
                console.log(this.uploadImg);
              }
              return;
            }
          }
          this.customerInfo = {
            id: '',
            shopId: this.shopId,
            districtName: '',
            provinceCityArea: '',
            districtAddress: '',
            districtScope: '',
            layoutType: '',
            districtAreaStart: '',
            districtAreaEnd: '',
            saleAveragePrice: '',
            imageUrlSaveVOList: [
            ]
          };
          this.houseTypeV = [];
          this.uploadImg = [];
        }
      });
    },
    confirm() {
      if (this.customerInfo.districtScope === '' || !this.customerInfo.districtScope) {
        Toast.failed('请输入小区名称');
        return false;
      }
      if (this.customerInfo.provinceCityArea === '' || !this.customerInfo.provinceCityArea) {
        Toast.failed('请输入地址');
        return false;
      }
      if (this.customerInfo.districtAddress === '' || !this.customerInfo.districtAddress) {
        Toast.failed('请输入地址');
        return false;
      }
      if (this.houseTypeV.length === 0) {
        Toast.failed('请选择户型');
        return false;
      }
      this.customerInfo.layoutType = this.houseTypeV.join(',');

      if (this.customerInfo.districtAreaStart === '' || !this.customerInfo.districtAreaStart) {
        Toast.failed('请输入小区面积范围');
        return false;
      }
      if (this.customerInfo.districtAreaEnd === '' || !this.customerInfo.districtAreaEnd) {
        Toast.failed('请输入小区面积范围');
        return false;
      }
      if (this.customerInfo.saleAveragePrice === '' || !this.customerInfo.saleAveragePrice) {
        Toast.failed('请输入小区均价');
        return false;
      }
      return true;
    }
  },
  beforeRouteLeave(to, from, next) {
    debugger;
    if (to.name === 'Haierhouse.HaierhouseApply') {
      // to.name = 'Haierhouse.HaierhouseEntry';
      this.$router.push({
        name: 'Haierhouse.HaierhouseEntry'
      });
    }
    if (this.$vnode && this.$vnode.data.keepAlive) {
      if (this.$vnode.parent && this.$vnode.parent.componentInstance && this.$vnode.parent.componentInstance.cache) {
        if (this.$vnode.componentOptions) {
          const key = this.$vnode.key == null
            ? this.$vnode.componentOptions.Ctor.cid + (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '')
            : this.$vnode.key;
          const cache = this.$vnode.parent.componentInstance.cache;
          const keys = this.$vnode.parent.componentInstance.keys;
          if (to.name === 'Haierhouse.HaierhouseEntry') {
            keys.forEach((k, index) => {
              if (cache[k]) {
                delete cache[k];
              }
            });
          } else if (to.name === 'Haierhouse.HaierhouseApply') {
            keys.forEach((k) => {
              if (cache[k]) {
                delete cache[k];
              }
            });
            this.$router.push({
              name: 'Haierhouse.HaierhouseEntry'
            });
          }
        }
      }
    }
    this.$destroy();
    next();
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
    font-size: 28px;
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
