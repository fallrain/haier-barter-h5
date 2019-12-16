<template>
<div class="fs28">
  <div class="text-999 lh70 pl20">一站筑家信息</div>
  <div class="dis-flex jus-bt row-style br-b">
    <div class="text-333">
      筑家店名
    </div>
    <div class="fg1 text-666 pl20">
      <input type="text" class="w100per input-style" placeholder="如：一站筑家左岸风度店">
    </div>
  </div>
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
        <input type="number" v-model="customerInfo.roomArea" class="w100per input-style text-right" placeholder="请输入">
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
      <input type="text" class="w100per input-style text-right" placeholder="请输入详细地址,具体到门牌号">
    </div>
  </div>
  <div class="dis-flex row-style br-b">
    <div class="">样板间租金</div>
    <div class="fg1 dis-flex">
      <div class="fg1 pl20 pr20">
        <input type="number" v-model="customerInfo.roomArea" class="w100per input-style text-right" placeholder="请输入">
      </div>
      <div class="text-primary">元/月</div>
    </div>
  </div>
  <div class="dis-flex row-style br-b">
    <div class="w200">租赁时间</div>
    <div class="fg1 dis-flex">
      <input type="text" v-model="customerInfo.rentStartTime" @click="timeShow(1)"
             class="w250 input-style text-right pr20" placeholder="请输入">
      <div class="">至</div>
      <input type="text" v-model="customerInfo.rentEndTime" @click="timeShow(2)"
             class="w250 input-style text-right pr20" placeholder="请输入">
      <md-icon name="calendar" size="lg"></md-icon>
    </div>
  </div>
  <div class="">
    <div class="text-333 br-b row-style">入驻产业</div>
    <div class="row-style br-b">
      <md-radio name="1" v-model="customerInfo.roomType" label="毛坯房" inline />
      <md-radio name="2" v-model="customerInfo.roomType" label="精装房" inline />
      <md-radio name="3" v-model="customerInfo.roomType" label="品牌联盟" inline />
      <md-radio name="4" v-model="customerInfo.roomType" label="底商门脸房" inline />
    </div>
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
  Radio, Field, FieldItem, TabPicker, Icon, DatePicker
} from 'mand-mobile';
import {
  BItem
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
    BItem,
  },
  data() {
    return {
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
        adminId: '00011682',
        adminName: '张三',
        adminPhone: '12154545',
        roomType: '03',
        roomArea: '',
        provinceCityArea: '',
        roomAddress: '',
        rentAmount: 35000,
        rentStartTime: '',
        rentEndTime: '',
        industryCodeScope: '01,02,03',
        industryNameScope: '家中机,厨电,热水器',
        imageUrlSaveVOList: [
          {
            imageType: '01',
            imageUrl: '../../01.png'
          },
          {
            imageType: '02',
            imageUrl: '../../02.png'
          }
        ]
      },
      sampleRoomTypeList: [{
        id: '1',
        name: '毛坯样板间'
      },
      {
        id: '2',
        name: '精装样板间',
      },
      {
        id: '3',
        name: '品牌联盟'
      },
      {
        id: '4',
        name: '新社区店'
      }
      ], // 样板间类型
    };
  },
  created() {
    this.addressData = addressData;
  },
  computed: {
    ...mapState('haierHouse', ['choosedLeader']),
    // 初始化产业多选框数组
    checkedIndustry() {
      const checkedIndustryTemp = this.industryIds.map((v) => {
        const checkedItem = this.items3.find(item => item.id === v);
        return {
          id: v,
          name: checkedItem ? checkedItem.name : ''
        };
      });
      checkedIndustryTemp.length && (checkedIndustryTemp.unshift({
        id: 'ybj',
        name: '样板间'
      }));
      return checkedIndustryTemp;
    }
  },
  methods: {
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
    showMessage() {
      this.middle = true;
    },
    toggleTab() {
      this.$refs.picker.show();
    },
    onConfirm(val) {
      console.log(val);
      this.localName = val.result;
    },
    genFileMap() {
      let temp = [];
      const a = [{
        id: 'ybj',
        name: '样板间',
        imgs: []
      }];
      temp = a.concat(this.items3);

      // 模拟延时请求,动态添加上传数据保存的list
      // setTimeout(() => {
      temp.forEach((v) => {
        this.$set(this.fileMap, v.id, []);
      });
      // });
    },
    // 获取产业列表
    getIndustryList() {
      this.hGet('buildHouse/proGrpList', {}).then((data) => {
        if (data) {
          data.data.forEach((v) => {
            const temp = {
              id: v.productCode,
              name: v.productName,
              imgs: []
            };
            this.items3.push(temp);
          });

          this.genFileMap();
        }
      });
    },
    getChangeList() {
      this.hGet('buildHouse/shopBuildHouse', {
        id: this.shopId
      }).then((data) => {
        if (!data.data) {
          uni.showToast({
            title: '请求失败',
            duration: 4000,
            icon: 'none'
          });
          return;
        }
        debugger;
        this.info = data.data;
        this.name = data.data.constructionDirector;
        this.localName = data.data.provinceCityArea;
        this.blockName = data.data.buildAreaName;
        this.tel = data.data.phoneNumber;
        this.sampleRoomIds = data.data.templateType;
        this.roomArea = data.data.area;
        this.address = data.data.address;
        this.rent = data.data.rent;
        this.startTime = data.data.leaseBegin;
        this.endTime = data.data.leaseEnd;
        const indus = JSON.parse(data.data.inIndustryPic);
        const temp = [];
        const img = [];
        indus.forEach((ind) => {
          temp.push(ind.id);
          const a = {
            id: ind.id,
            imgs: ind.imgs
          };
          img.push(a);
        });
        temp.shift();
        this.industryIds = temp;
        for (let i = 0; i < img.length; i++) {
          for (const key in this.fileMap) {
            if (img[i].id == key) {
              this.fileMap[key] = img[i].imgs;
            }
          }
        }
      });
    },
    array_contain(array, obj) {
      for (let i = 0; i < array.length; i++) {
        if (array[i] == obj) // 如果要求数据类型也一致，这里可使用恒等号===
        { return true; }
      }
      return false;
    },
    removeByValue(arr, val) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
          arr.splice(i, 1);
          break;
        }
      }
    },
    // 图片上传
    onSuccess({
      data,
      fileList
    }) {
      if (!data) {
        this.alertMsg = data.msg;
        this.alert = true;
      } else {
        console.log(data);
        fileList.push(data.data.imageUrl);
      }
    },
    onError(err) {
      this.toastShow(err);
    },
    onRemove({
      index,
      fileList
    }) {
      fileList.splice(index, 1);
    },
    nameEnd() {},
    blockEnd() {},
    addressEnd() {},
    startTimeSelect() {
      this.pickerStartShow = true;
    },
    endTimeSelect() {},
    hidePopup() {
      this.middle = false;
    },
    hidePopupAlert() {
      this.alert = false;
    },
    // 显示弹窗
    toastShow(title) {

    },
    // 下一步
    nextPage() {
      if (this.blockName === '') {
        this.toastShow('请输入筑家店名');
        return;
      }
      if (this.sampleRoomIds.length === 0) {
        this.toastShow('请选择筑家类型');
        return;
      }
      if (this.roomArea === '') {
        this.toastShow('请输入样板间面积');
        return;
      }
      if (this.localName === '') {
        this.toastShow('请选择地区');
        return;
      }
      if (this.address === '') {
        this.toastShow('请输入详细地址');
        return;
      }
      if (this.rent === '') {
        this.toastShow('请输入租金');
        return;
      }
      if (this.startTime === '') {
        this.toastShow('请选择开始日期');
        return;
      }
      if (this.endTime === '') {
        this.toastShow('请选择结束日期');
        return;
      }
      if (this.industryIds.length === 0) {
        this.toastShow('请选择产业');
      }
    }
  }
};
</script>
<style scoped lang="scss">
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
</style>
