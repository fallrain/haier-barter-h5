<template>
  <div class="fs28">
    <div class="text-999 lh70 pl20">门店基础信息</div>
    <div class="br-b">
      <b-item
        title="筑家负责人"
        :arrow="true"
        :value="customerInfo.adminName"
        @rightClick="choosePerson"
        placeholder="选择一站筑家负责人"
      ></b-item>
    </div>
    <div class="dis-flex row-style br-b">
      <div class="">手机号码</div>
      <div class="fg1 pl20 pr20">
        <input type="number" v-model="customerInfo.adminPhone" class="w100per input-style text-right" placeholder="请输入">
      </div>
    </div>
    <div class="dis-flex row-style br-b">
      <div class="">筑家店名</div>
      <div class="fg1 pl20 pr20">
        <input type="text" v-model="customerInfo.shopName"
               @input="dealChange"
               class="w100per input-style text-right" placeholder="请输入">
      </div>
    </div>
    <div class="text-999 lh70 pl20">一站筑家信息</div>
    <!--  <div class="dis-flex jus-bt row-style br-b">-->
    <!--    <div class="text-333">-->
    <!--      筑家店名-->
    <!--    </div>-->
    <!--    <div class="fg1 text-666 pl20">-->
    <!--      <input type="text" class="w100per input-style" v-model="customerInfo.adminName" placeholder="如：一站筑家左岸风度店">-->
    <!--    </div>-->
    <!--  </div>-->
    <div class="">
      <div class="text-333 br-b row-style">筑家类型</div>
      <div class="row-style br-b">
        <md-radio name="1" v-model="customerInfo.roomType" label="毛坯房" inline />
        <md-radio name="2" v-model="customerInfo.roomType" label="精装房" inline />
        <md-radio name="3" v-model="customerInfo.roomType" label="品牌联盟" inline />
        <md-radio name="4" v-model="customerInfo.roomType" label="底商门脸房" inline />
      </div>
    </div>
    <div class="dis-flex row-style br-b">
      <div class="">样板间面积</div>
      <div class="fg1 dis-flex">
        <div class="fg1 pl20 pr20">
          <input type="text" v-model="customerInfo.roomArea" @blur="judegNum(customerInfo.roomArea,'roomArea')"
                 class="w100per input-style text-right" placeholder="请输入">
        </div>
        <div class="text-primary">平米</div>
      </div>
    </div>
    <div class="br-b">
      <b-item
        title="地址"
        :arrow="true"
        :value="customerInfo.provinceCityArea"
        @rightClick="showAddressPop"
        iconClass="icon-dingwei"
        placeholder="选择省/市/区(县)"
      ></b-item>
      <div class="pl120 row-style">
        <input type="text" v-model="customerInfo.roomAddress" class="w100per input-style text-right" placeholder="请输入详细地址,具体到门牌号">
      </div>
    </div>
    <div class="dis-flex row-style br-b">
      <div class="">样板间租金</div>
      <div class="fg1 dis-flex">
        <div class="fg1 pl20 pr20">
          <input type="number" v-model="customerInfo.rentAmount" @blur="judegNum(customerInfo.rentAmount,'rentAmount')"
                 class="w100per input-style text-right" placeholder="请输入">
        </div>
        <div class="text-primary">元/月</div>
      </div>
    </div>
    <div class="dis-flex row-style br-b">
      <div class="w200">租赁时间</div>
      <div class="fg1 dis-flex">
        <input type="text" v-model="customerInfo.rentStartTime" @click="timeShow(1)"
               class="w250 input-style text-center pr20" placeholder="开始日期">
        <div class="">至</div>
        <input type="text" v-model="customerInfo.rentEndTime" @click="timeShow(2)"
               class="w250 input-style text-center pr20" placeholder="结束日期">
        <md-icon class="mt10" name="calendar" size="lg"></md-icon>
      </div>
    </div>
    <div class="">
      <div class="text-333 br-b row-style">入驻产业</div>
      <div class="row-style br-b clear">
        <md-check-list
          v-model="indeustryCode"
          iconPosition="left"
          :options="industryList"
          inline
        />
      </div>
    </div>
    <div class="mb20">
      <div class="text-333 row-style">样板间区域照片</div>
      <div class="bg-white p20">
        <b-wx-upload
          :imgs="uploadImg"
          :maxLength="3"
          @imageuploaded="(data)=>imageuploaded(data, uploadImg, '0')"
          :uploadFn="uploadImgFn"
          @delFun="(index)=>delImg(index,uploadImg)"
          @errorhandle="uploadError"
        >
        </b-wx-upload>
      </div>
    </div>
    <div v-for="(item, index) in indeustryChoosed" :key="index" class="mb20">
      <div class="text-333 row-style">{{item.label}}区域照片</div>
      <div class="bg-white p20">
        <b-upload
          :imgs="uploadImg1[item.value]"
          :maxLength="3"
          @imageuploaded="(data)=>imageuploaded(data, uploadImg1[item.value], item)"
          :uploadFn="uploadImgFn"
          @delFun="(index1)=>delImg(index1, uploadImg1[item.value], item)"
          @errorhandle="uploadError"
        >
        </b-upload>
      </div>
    </div>
    <div class="ph20 mt16">
      <md-button type="primary" @click="nextPage">下一步</md-button>
    </div>
    <md-date-picker
      ref="datePicker"
      type="custom"
      v-model="isDatePickerShow"
      :custom-types="['yyyy', 'MM','dd']"
      :min-date="minDate"
      :max-date="maxDate"
      :default-date="currentDate"
      @confirm="onDatePickerInitialed"
    ></md-date-picker>
    <md-date-picker
      ref="datePicker1"
      type="custom"
      v-model="isDatePickerShow1"
      :custom-types="['yyyy', 'MM','dd']"
      :min-date="minDate1"
      :max-date="maxDate1"
      :default-date="currentDate"
      @confirm="onDatePickerInitialed1"
    ></md-date-picker>
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
    [Button.name]: Button,
    BItem,
    BUpload,
    BWxUpload
  },
  data() {
    return {
      isChange: false,
      uploadUrl: '/api/file/simpleUpload',
      headers: {
        Authorization: ''
      },
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
    if (this.$route.params.userInfo) {
      this.customerInfo.imageUrlSaveVOList = [];
      this.customerInfo.adminId = this.$route.params.userInfo.hmcId;
      this.customerInfo.adminName = this.$route.params.userInfo.username;
    }
    if (this.$route.params.id) { // 修改信息
      this.isChange = true;
      this.id = this.$route.params.id;
      this.getInformation(this.id);
    } else {
      this.isChange = false;
    }
  },
  created() {
    this.headers.Authorization = `Bearer  ${localStorage.getItem('acces_token')}`;
    this.addressData = addressData;
    this.getIndustryList();
  },
  computed: {
    ...mapState('haierHouse', ['choosedLeader']),
  },
  watch: {
    indeustryCode(val) {
      this.indeustryChoosed = [];
      this.indeustryName = [];
      this.indeustryCode.forEach((item) => {
        this.industryList.forEach((i) => {
          if (item === i.value) {
            this.indeustryChoosed.push(i);
            this.indeustryName.push(i.label);
          }
        });
      });
    }
  },
  methods: {
    getInformation(id) {
      this.haierhouseService.queryShopAndDistrict({}, {
        id
      }).then((res) => {
        if (res.code === 1) {
          res.data.rentStartTime = res.data.rentStartTime.split(' ')[0];
          res.data.rentEndTime = res.data.rentEndTime.split(' ')[0];
          this.customerInfo = res.data;
          this.indeustryCode = this.customerInfo.industryCodeScope.split(',');
          this.indeustryName = this.customerInfo.industryNameScope.split(',');
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
    choosePerson() {
      this.$router.push({
        name: 'Haierhouse.ChoosePerson',
        params: {}
      });
    },
    showAddressPop() {
      /* 展示地址pop */
      this.addressPopShow = true;
    },
    addressChange(address) {
      const addressName = address.options;
      this.customerInfo.provinceCityArea = addressName[0].label + addressName[1].label + addressName[2].label;
    },
    timeShow(index) {
      if (index === 1) {
        this.isDatePickerShow = true;
      } else {
        this.isDatePickerShow1 = true;
      }
    },
    onDatePickerInitialed() {
      this.customerInfo.rentStartTime = this.$refs.datePicker.getFormatDate('yyyy/MM/dd');
      this.minDate1 = new Date(this.customerInfo.rentStartTime);
    },
    onDatePickerInitialed1() {
      this.customerInfo.rentEndTime = this.$refs.datePicker1.getFormatDate('yyyy/MM/dd');
      this.maxDate = new Date(this.customerInfo.rentEndTime);
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
    // 下一步
    nextPage() {
      if (this.customerInfo.adminName === '' || !this.customerInfo.adminName) {
        Toast.failed('请选择筑家负责人');
        return;
      }
      if (this.customerInfo.adminPhone === '' || !this.customerInfo.adminPhone) {
        Toast.failed('请输入筑家负责人手机号');
        return;
      }
      if (this.customerInfo.shopName === '' || !this.customerInfo.shopName) {
        Toast.failed('请输入筑家店名');
        return;
      }
      if (this.customerInfo.roomType === '' || !this.customerInfo.roomType) {
        Toast.failed('请选择样板间类型');
        return;
      }
      if (this.customerInfo.roomArea === '' || !this.customerInfo.roomArea) {
        Toast.failed('请输入样板间面积');
        return;
      }
      if (this.customerInfo.provinceCityArea === '' || !this.customerInfo.provinceCityArea) {
        Toast.failed('请选择地区');
        return;
      }
      if (this.customerInfo.roomAddress === '' || !this.customerInfo.roomAddress) {
        Toast.failed('请输入详细地址');
        return;
      }
      if (this.customerInfo.rentAmount === '' || !this.customerInfo.rentAmount) {
        Toast.failed('请输入租金');
        return;
      }
      if (this.customerInfo.rentStartTime === '' || !this.customerInfo.rentStartTime) {
        Toast.failed('请选择开始日期');
        return;
      }
      if (this.customerInfo.rentEndTime === '' || !this.customerInfo.rentEndTime) {
        Toast.failed('请选择结束日期');
        return;
      }
      if (this.indeustryChoosed.length === 0) {
        Toast.failed('请选择产业');
      }
      this.customerInfo.industryCodeScope = this.indeustryCode.join(',');
      this.customerInfo.industryNameScope = this.indeustryName.join(',');

      if (!(/^1[3456789]\d{9}$/.test(this.customerInfo.adminPhone))) {
        Toast.failed('手机格式错误');
        this.customerInfo.adminPhone = '';
        return;
      }
      console.log(this.customerInfo);
      if (this.isChange) {
        this.customerInfo.id = this.id;
      }
      this.haierhouseService.addShopInfo({
        hmcId: JSON.parse(localStorage.getItem('userinfo')).hmcid,
        ...this.customerInfo
      }, {}).then((res) => {
        console.log(res);
        if (res.code === 1) {
          this.id = res.data;
          if (this.isChange) {
            this.customerInfo.id = this.id;
            this.$router.push({
              name: 'Haierhouse.HaierhouseAreaInfo',
              params: { customerInfo: this.customerInfo }
            });
          } else {
            this.$router.push({
              name: 'Haierhouse.HaierhouseAreaInfo',
              query: { shopId: this.id }
            });
          }
        }
      });
    },
    judegNum(num, key) {
      debugger;
      if (!this.testStr(num) || num > 100000) {
        this.customerInfo[key] = '';
        Toast.failed('请输入正确的数值，最大数值为100000且小数点后两位');
      } console.log(this.testStr(num));
    },
    testStr(num) {
      const reg = /^(\d+)(.\d{0,2})?$/;
      return reg.test(num);
    },
    dealChange() {
      if (this.customerInfo.shopName.length > 30) {
        Toast.failed('筑家店名最多输入30个字符');
        this.customerInfo.shopName = this.customerInfo.shopName.substring(0, 30);
      }
    },
    uploadImgFn(mediaId) {
      return this.haierhouseService.simpleUpload({
        mediaId
      });
    },
    imageuploaded(data, fileList, item) {
      const itemImg = {};
      if (data.code === 1) {
        if (item === '0') { // 样板间照片
          itemImg.imageType = this.customerInfo.roomType;
          itemImg.imageUrl = data.data;
        } else { // 产业照片
          itemImg.imageType = item.value;
          itemImg.imageUrl = data.data;
        }
        this.customerInfo.imageUrlSaveVOList.push(itemImg);
      }
      fileList.push(data.data);
    },
    delImg(index, fileList, item) {
      debugger;
      let imgType = '';
      if (item === '0') {
        imgType = '1';
      } else {
        imgType = item.value;
      }
      this.customerInfo.imageUrlSaveVOList.forEach((item, index) => {
        if (item.imageType === imgType) {
          this.customerInfo.imageUrlSaveVOList.splice(index, 1);
        }
      });
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
