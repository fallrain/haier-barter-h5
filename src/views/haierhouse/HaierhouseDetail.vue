<template>
  <div class="fs28">
    <div class="text-999 lh70 pl20">门店基础信息</div>
    <div class="br-b">
      <b-item
        title="筑家负责人"
        :value="customerInfo.adminName"
      ></b-item>
    </div>
    <div class="br-b">
      <b-item
        title="手机号码"
        :value="customerInfo.adminPhone"
      ></b-item>
    </div>
    <div class="br-b">
      <b-item
        title="筑家店名"
        :value="customerInfo.shopName"
      ></b-item>
    </div>
    <div class="text-999 lh70 pl20">一站筑家信息</div>
    <div class="">
      <b-item
        title="筑家类型"
        :value="roomTypeName"
      ></b-item>
      <!--<div class="row-style br-b">
        <md-radio name="1" v-model="customerInfo.roomType" label="毛坯房" inline />
        <md-radio name="2" v-model="customerInfo.roomType" label="精装房" inline />
        <md-radio name="3" v-model="customerInfo.roomType" label="品牌联盟" inline />
        <md-radio name="4" v-model="customerInfo.roomType" label="底商门脸房" inline />
      </div>-->
    </div>
    <div class="br-b">
      <b-item
        title="样板间面积"
        :value="customerInfo.roomArea+'平米'"
      ></b-item>
    </div>
    <div class="br-b">
      <b-item
        title="地址"
        :value="customerInfo.provinceCityArea"
        iconClass="icon-dingwei"
      ></b-item>
      <div class="">
        <b-item
          title=""
          :value="customerInfo.roomAddress"
        ></b-item>
      </div>
    </div>
    <div class="dis-flex row-style br-b">
      <b-item
        title="样板间租金"
        :value="customerInfo.rentAmount+'元/月'"
      ></b-item>
    </div>
    <div class="dis-flex row-style br-b">
      <div class="w200">租赁时间</div>
      <div class="fg1 dis-flex">
        <span class="w250 input-style text-center pr20">{{customerInfo.rentStartTime}}</span>
        <div class="">至</div>
        <span class="w250 input-style text-center pr20">{{customerInfo.rentEndTime}}</span>
        <md-icon class="mt10" name="calendar" size="lg"></md-icon>
      </div>
    </div>
    <div class="">
      <b-item
        title="入驻产业"
        :value="customerInfo.industryNameScope"
      ></b-item>
    </div>
    <div class="mb20">
      <div class="text-333 row-style">样板间区域照片</div>
      <div class="bg-white p20">
        <span v-show="uploadImg.length === 0" class="" style="color: #ec3334">无</span>
        <div class="bUpload-preshow" v-for="(item, index) in uploadImg" :key="index">
          <img :src="item" alt="" class="">
        </div>
      </div>
    </div>
    <div v-for="(item, index) in indeustryChoosed" :key="index" class="mb20">
      <div class="text-333 row-style">{{item.label}}区域照片
      </div>
      <div class="bg-white p20">
        <span v-show="uploadImg1[item.value].length === 0" class="" style="color: #ec3334">无</span>
        <div class="bUpload-preshow" v-for="(item1, index1) in uploadImg1[item.value]" :key="index1">
          <img :src="item1" alt="" class="">
        </div>
      </div>
    </div>
    <div class="ph20 mt16">
      <md-button type="primary" @click="backPage">返回</md-button>
    </div>
  </div>
</template>
<script>
import {
  mapState
} from 'vuex';
import {
  Toast, Radio, Field, FieldItem, TabPicker, Icon, DatePicker, Check, CheckGroup, CheckList, Button
} from 'mand-mobile';
import {
  BItem,
  BUpload,
  BWxUpload
} from '@/components/form';

import addressData from '@/lib/address';

export default {
  name: 'HaierhouseDetail',
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
    [Button.name]: Button,
    BItem,
  },
  data() {
    return {
      isFirst: true,
      isChange: false,
      reviewImageScope: '',
      addressName: '',
      // 地址pop显示隐藏
      addressPopShow: false,
      defaultA: [],
      isDatePickerShow: false,
      isDatePickerShow1: false,
      minDate: new Date('2013/9/9'),
      maxDate: new Date('2020/9/9'),
      currentDate: new Date(),
      minDate1: new Date('2013/9/9'),
      maxDate1: new Date('2020/9/9'),
      currentDate1: new Date(),
      customerInfo: {
        adminId: '',
        adminName: '',
        adminPhone: '',
        roomType: '',
        roomArea: '',
        provinceCityArea: '',
        roomAddress: '',
        rentAmount: '',
        rentStartTime: '',
        rentEndTime: '',
        industryCodeScope: '',
        industryNameScope: '',
        imageUrlSaveVOList: [
        ]
      },
      industryList: [],
      indeustryCode: [],
      indeustryName: [],
      indeustryChoosed: [],
      uploadImg: [],
      uploadImg1: {
        I_BX: [],
        I_KT: [],
        I_XYJ: [],
        I_CHUD: [],
        I_DS: [],
        I_JS: [],
        I_RSQ: [],
        I_SHJD: [],
      }
    };
  },
  activated() {
    if (this.$route.query.id) {
      // 数据清空
      this.uploadImg = [];
      this.uploadImg1 = {
        I_BX: [],
        I_KT: [],
        I_XYJ: [],
        I_CHUD: [],
        I_DS: [],
        I_JS: [],
        I_RSQ: [],
        I_SHJD: []
      };
      this.isChange = true;
      this.id = this.$route.query.id;
      this.getInformation(this.id);
    }
  },
  created() {
    this.addressData = addressData;
    this.getIndustryList();
  },
  computed: {
    ...mapState('haierHouse', ['choosedLeader']),
    roomTypeName() {
      const type = this.customerInfo.roomType;
      let name = '';
      switch (type) {
        case '1':
          name = '毛坯房';
          break;
        case '2':
          name = '精装房';
          break;
        case '3':
          name = '品牌联盟';
          break;
        case '4':
          name = '底商门脸房';
          break;
      }
      return name;
    }
  },
  methods: {
    getInformation(id) {
      this.haierhouseService.queryShopAndDistrict({}, {
        id
      }).then((res) => {
        debugger;
        if (res.code === 1) {
          res.data.rentStartTime = res.data.rentStartTime.split(' ')[0];
          res.data.rentEndTime = res.data.rentEndTime.split(' ')[0];
          this.customerInfo = res.data;
          this.reviewImageScope = res.data.reviewImageScope;
          this.indeustryName = res.data.industryNameScope.split(',');
          this.indeustryCode = res.data.industryCodeScope.split(',');
          this.indeustryChoosed = [];
          this.indeustryCode.forEach((item, index) => {
            const itemObj = {
              label: this.indeustryName[index],
              value: item,
              isRefuse: false
            };
            if (this.reviewImageScope) {
              if (this.reviewImageScope.split(',').indexOf(item) > -1) {
                itemObj.isRefuse = true;
              }
            }
            this.indeustryChoosed.push(itemObj);
          });
          console.log(this.indeustryChoosed);
          this.customerInfo.imageUrlSaveVOList = res.data.decoModelImageUrlDTOList;
          res.data.decoModelImageUrlDTOList.forEach((item) => {
            if (item.imageType.indexOf('_') > -1) {
              this.uploadImg1[item.imageType].push(item.imageUrl);
            } else {
              this.uploadImg.push(item.imageUrl);
            }
          });
        }
      });
    },
    // 获取产业列表
    getIndustryList() {
      this.basicService.queryIndustry().then((res) => {
        if (res.code === 1) {
          res.data.forEach((item) => {
            item.value = item.industryCode;
            item.label = item.industryName;
          });
          this.industryList = res.data;
        }
      });
    },
    backPage() {
      this.$router.go(-1);
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$destroy();
    next();
  }
};
</script>
<style lang="scss">
  .bUpload-preshow {
    position: relative;
    width: 200px;
    height: 200px;
    margin-right: 20px;
    justify-content: space-between;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .md-cell-item-content{
    font-size: 28px;
  }
  .bg-white{
    background: #fff;
  }
  .clear {
    clear: both;
    overflow: hidden;
  }
  .md-check-list .md-cell-item{
    float: left !important;
    margin-right: 20px !important;
  }
  .md-icon{
    line-height: 80px;
  }
  .icon-dingwei{
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
  .pv20{
    padding: 20px 0;
  }
  .ph20{
    padding: 0 20px;
  }
  .mt10{
    margin-top: 10px;
  }
  .w200{
    width: 200px;
  }
  .w250{
    width: 250px;
  }
</style>
