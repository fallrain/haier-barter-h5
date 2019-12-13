<template>
	<div>
		<div class="bt2-houseApply-card">
			<p class="bt2-houseApply-card-title">一站筑家信息</p>
			<ul class="bt2-houseApply-card-cnt">
				<!-- <li class="bt2-houseApply-card-item uni-column"><span class="bt2-houseApply-card-item-star">*</span>
					<text class="bt2-houseApply-card-item-name-long">筑家负责人</text>
					<input class="uni-input-areaName" placeholder-style="color:#999999;line-height:56px;font-size:32px" placeholder="请输入筑家负责人"
					 v-model="name" @blur="nameEnd()" v-reset-input />
				</li> -->
				<li class="bt2-houseApply-card-item uni-column"><span class="bt2-houseApply-card-item-star">*</span>
					<text class="bt2-houseApply-card-item-name-long">筑家店名</text>
					<input class="uni-input-areaName" placeholder-style="color:#999999;line-height:56px;font-size:32px" placeholder="如:一站筑家左岸风度店"
					 v-model="blockName" @blur="blockEnd()" v-reset-input />
				</li>
				<li class="bt2-houseApply-card-item"><span class="bt2-houseApply-card-item-star">*</span>
					<text class="bt2-houseApply-card-item-name-long">筑家类型</text></li>
				<li class="bt2-houseApply-card-item-mult bt2-houseApply-card-item">
					<b-multrow-radio :list="sampleRoomTypeList" :checkedId.sync="sampleRoomIds"></b-multrow-radio>
				</li>
				<li class="bt2-houseApply-card-item uni-column"><span class="bt2-houseApply-card-item-star">*</span>
					<text class="bt2-houseApply-card-item-name-long">样板间面积</text>
					<input class="uni-input" placeholder-style="color:#999999;line-height:56px;font-size:32px" placeholder="请输入房屋面积"
					 v-model="roomArea" @blur="areaEnd()" type="digit" v-reset-input />
					<p class="bt2-houseApply-card-item-unit">平米</p>
				</li>
				<li class="bt2-houseApply-card-item uni-column">
					<span class="bt2-houseApply-card-item-star">*</span>
					<text class="bt2-houseApply-card-item-name-long">详细地址</text>
					<input class="uni-input-local" placeholder-style="color:#999999;line-height:56px;font-size:32px" maxlength="20"
					 @blur="coverEnd()" v-model="localName" placeholder="请选择地区" v-reset-input />
					<div @click="toggleTab()" class="pickerClass"></div>
					<w-picker mode="region" :defaultVal="defaultVal" @confirm="onConfirm" ref="picker" themeColor="#4A90E2"></w-picker>
				</li>
				<li class="bt2-houseApply-card-item uni-column">
					<text class="bt2-houseApply-card-item-name"></text>
					<input class="uni-input-address" placeholder-style="color:#999999;line-height:56px;font-size:32px" placeholder="请输入详细地址,具体到门牌号"
					 v-model="address" @blur="addressEnd()" v-reset-input /></li>
				<li class="bt2-houseApply-card-item uni-column"><span class="bt2-houseApply-card-item-star">*</span>
					<text class="bt2-houseApply-card-item-name-long">样板间租金</text>
					<input class="uni-input" placeholder-style="color:#999999;line-height:56px;font-size:32px" placeholder="请输入租金"
					 v-model="rent" @blur="rentEnd()" type="digit" v-reset-input />
					<p class="bt2-houseApply-card-item-unit">元/月</p>
				</li>
				<li class="bt2-houseApply-card-item uni-column"><span class="bt2-houseApply-card-item-star">*</span><text class="bt2-houseApply-card-item-name-long">租赁日期</text>
					<div class="uni-list-cell-db-start">
						<picker mode="date" :value="dateS" :start="startDateS" :end="endDateS" @change="bindDateChangeS">
							<div class="uni-input-timee1"> {{dateS}}</div>
						</picker>
					</div>
					<input class="uni-input-time" placeholder-style="color:#999999;line-height:56px;font-size:32px" placeholder="开始日期"
					 @click="startTimeSelect()" v-model="startTime" v-reset-input />
					<p style="margin-left: 20px;">至</p>
					<div class="uni-list-cell-db-end">
						<picker mode="date" :value="dateE" :start="startDateE" :end="endDateE" @change="bindDateChangeE">
							<div class="uni-input-timee"> {{dateE}}</div>
						</picker>
					</div><input class="uni-input-time" placeholder-style="color:#999999;line-height:56px;font-size:32px"
					 placeholder="结束日期" @click="endTimeSelect()" v-model="endTime" v-reset-input />
				</li>
				<li class="bt2-houseApply-card-item"><span class="bt2-houseApply-card-item-star">*</span>
					<text class="bt2-houseApply-card-item-name-long">入驻产业</text></li>
				<li class="bt2-houseApply-card-item-mult bt2-houseApply-card-item">
					<b-multrow-checkbox :list="items3" :checkedIds.sync="industryIds" :checkboxChange1="checkboxChange"></b-multrow-checkbox>
				</li>

			</ul>
			<div class="mt16" v-for="(industry,index) in checkedIndustry" :key="index">
				<ul class="bt2-houseApply-card-cnt">
					<li class="bt2-houseApply-card-item"> {{industry.name}}区域照片</li>
					<ss-upload-image :url="url" :file-list="fileMap[industry.id]" :name="imgName" :formData="industry" @on-success="onSuccess"
					 @on-error="onError" @on-remove="onRemove" />
				</ul>
			</div>
		</div>
		<div class="bt2-houseApply-btn">
			<p class="bt2-houseApply-btn-p" @click="nextPage()">下一步</p>
		</div>
		<div class="uni-list" v-show="pickerStartShow">
			<div class="uni-list-cell">
				<div class="uni-list-cell-db">
					<picker mode="date" :value="dateS" :start="startDateS" :end="endDateS" @change="bindDateChangeS">
						<div class="uni-input"> {{dateS}}</div>
					</picker>
				</div>
			</div>
		</div>
		<div class="uni-list" v-show="pickerEndShow">
			<div class="uni-list-cell">
				<div class="uni-list-cell-db">
					<picker mode="date" :value="dateE" :start="startDateE" :end="endDateE" @change="bindDateChangeE">
						<div class="uni-input"> {{dateE}}</div>
					</picker>
				</div>
			</div>
		</div>
		<uni-popup :show="middle" type="middle" @hidePopup="hidePopup" button-mode="right" :h5-top="h5top">
			<div class="popupView">
				<p class="popupView-u">一站筑家负责人负责一站筑家小区客户，客户扫描活动二维码，进入筑家负责人的用户跟进</p>
				<p class="popupView-b" @click="hidePopup">知道了</p>
			</div>
		</uni-popup>
		<uni-popup :show="alert" type="middle" mode="fixed" :msg=alertMsg @hidePopup="hidePopupAlert" :h5-top="h5top"></uni-popup>
	</div>
</template>
<script>
import ssUploadImage from '@/components/ss-upload-image/ss-upload-image.vue';
import UniIcon from '@/components/uni-icon/uni-icon.vue';
import calendar from '@/components/uni-calendar/uni-calendar';
import uniPopup from '@/components/uni-popup/uni-popup';
import wPicker from '@/components/w-picker/w-picker.vue';
import BMultrowCheckbox from '../../components/common/BMultrowCheckbox';
import BMultrowRadio from '../../components/common/BMultrowRadio';
import BItem from '../../components/common/BItem';
import {
  mapState
}

  from 'vuex';

export default {

  name: 'HaierHouseApply',
  components: {
    BItem,
    BMultrowCheckbox,
    BMultrowRadio,
    ssUploadImage,
    UniIcon,
    calendar,
    uniPopup,
    wPicker
  },

  data() {
    return {
      imgName: 'file',
      url: `${this.envConfig.domain}buildHouse/uploadImage`,
      // url: 'http://hzytest.haier.com/builtHouse/buildHouse/uploadImage',
      h5top: true,
      fileList: [],
      blockName: '',
      localName: '',
      hmcid: '',
      shopId: '',
      defaultVal: [0, 0, 0],
      current: 1,
      name: '',
      tel: '',
      roomArea: '',
      rent: '',
      address: '',
      middle: false,
      alert: false,
      pickerStartShow: false,
      pickerEndShow: false,
      dateS: '',
      dateE: '',
      startDateS: '',
      startDateE: '',
      endDateS: '',
      endDateE: '',
      startTime: '',
      endTime: '',
      alertMsg: '',
      industryIds: [],
      industryList: [],
      dataItem: [],
      info: {},
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
      sampleRoomIds: '', // 选中的样板间类型
      fileMap: {},
      resID: '',
      items3: [],
    };
  },
  onLoad(option) {
    // alert(option.id)
    debugger;
    this.hmcid = option.hmcid;
    this.getIndustryList();
    if (option.shopId) {
      this.shopId = option.shopId;
      this.getChangeList();
    }

    if (this.industryIds.length > 0) {
      const item = {
        id: '0',
        name: '样板间',
        imgs: []
      };
      this.industryList.push(item);
    }
    for (var i = 0; i < this.industryIds.length; i++) {
      this.items3.forEach((item) => {
        if (this.industryIds[i] == item.id) {
          this.industryList.push(item);
        }
      });
    }
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
    // chooseLeader() {
    // 	//选择负责人
    // 	uni.navigateTo({
    // 		url: '/pages/haierHouse/ChooseLeader'
    // 	});
    // },
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
    radioChange(data) {},
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
    // 多选框选中
    checkboxChange(data) {
      if ((data.value.length == 1) && (this.industryList.length == 0)) {
        const item = {
          id: 'ybj',
          name: '样板间',
          imgs: []
        };
        this.industryList.push(item);
      }
      this.dataItem = this.industryList;
      this.industryList = [];
      const temp = [];
      for (var i = 0; i < data.value.length; i++) {
        this.items3.forEach((item) => {
          if (data.value[i] == item.id) {
            temp.push(item);
          }
          if (!this.array_contain(this.dataItem, item)) {
            this.dataItem.push(item);
          }
        });
      }
      if (temp.length == 0) {
        return;
      }

      if (data.detail.value.length === 1) {
        this.industryList.push(this.dataItem[0]);
      }

      for (var i = 0; i < temp.length;
        i++) {
        this.dataItem.forEach((item) => {
          if (temp[i].id == item.id) {
            this.industryList.push(item);
          }
        });
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

    telEnd() {
      if (!/^1[34578]\d{9}$/.test(this.tel)) {
        this.alert = true;
        this.tel = '';
        this.alertMsg = '请输入正确的手机号';
      }
    },
    nameEnd() {},
    blockEnd() {},
    areaEnd() {
				 if (parseFloat(this.roomArea) === 0) {
					 this.toastShow('面积不能为零');
					 this.roomArea = '';
				 }
    },
    addressEnd() {},
    rentEnd() {
      if (parseFloat(this.rent) === 0) {
					 this.toastShow('租金不能为零');
					 this.rent = '';
				 }
    },
    startTimeSelect() {
      this.pickerStartShow = true;
    },
    endTimeSelect() {},
    bindDateChangeS(e) {
      this.startTime = e.target.value;
      if (this.endTime == '') {
        return;
      }
      if (this.CompareDate(this.startTime, this.endTime)) {
        uni.showModal({
          title: '提示',
          content: '结束日期必须大于开始日期',
          success(res) {
            if (res.confirm) {} else if (res.cancel) {}
          }
        });
        this.endTime = '';
      }
    },
    bindDateChangeE(e) {
      this.endTime = e.target.value;
      if (this.CompareDate(this.startTime, this.endTime)) {
        uni.showModal({
          title: '提示',
          content: '结束日期必须大于开始日期',
          success(res) {
            if (res.confirm) {} else if (res.cancel) {}
          }
        });
        this.endTime = '';
      }
    },
    CompareDate(d1, d2) {
      return ((new Date(d1.replace(/-/g, '\/'))) >= (new Date(d2.replace(/-/g, '\/'))));
    },
    hidePopup() {
      this.middle = false;
    },
    hidePopupAlert() {
      this.alert = false;
    },
    // 显示弹窗
    toastShow(title) {
      uni.showToast({
        title,
        duration: 3000,
        icon: 'none'
      });
    },
    // 下一步
    nextPage() {
      // 非空判断
      // if (this.name === '') {
      // 	this.toastShow('请输入筑家负责人')
      // 	return
      // }
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
        return;
      }

      const LIST = [];
      const industry = [];
      if (this.fileMap !== {}) {
        for (let i = 0; i < this.checkedIndustry.length; i++) {
          for (const key in this.fileMap) {
            if (this.checkedIndustry[i].id == key) {
              const aa = {
                id: key,
                name: this.checkedIndustry[i].name,
                imgs: this.fileMap[key]
              };
              // this.checkedIndustry[i].imgs = this.fileMap[key]
              industry.push(this.checkedIndustry[i].name);
              LIST.push(aa);
            }
          }
        }
      }
      if (industry.length > 0) {
        industry.shift();
      }
      const param = {
        createBy: this.hmcid,
        // createBy: 'Z0000001',
        constructionDirector: this.name,
        provinces: this.localName,
        buildAreaName: this.blockName,
        phoneNumber: this.tel,
        templateType: this.sampleRoomIds,
        area: this.roomArea,
        address: this.address,
        rent: this.rent,
        leaseBegin: this.startTime,
        leaseEnd: this.endTime,
        inIndustry: JSON.stringify(industry),
        inIndustryPic: JSON.stringify(LIST)
      };
      this.info.constructionDirector = this.name,
      this.info.provinces = this.localName,
      this.info.buildAreaName = this.blockName,
      this.info.phoneNumber = this.tel,
      this.info.templateType = this.sampleRoomIds,
      this.info.area = this.roomArea,
      this.info.address = this.address,
      this.info.rent = this.rent,
      this.info.leaseBegin = this.startTime,
      this.info.leaseEnd = this.endTime,
      this.info.inIndustry = JSON.stringify(industry),
      this.info.inIndustryPic = JSON.stringify(LIST);
      debugger;
      uni.navigateTo({
        url: `/pages/haierHouse/HaierHouseApplySecondPage?info=${JSON.stringify(this.info)}&hmcid=${this.hmcid}&shopId=${this.shopId}`,
      });
    }
  }
};
</script>
<style scoped lang="scss">
	.uni-input {
		// background-color: aquamarine;
		margin-left: 50px !important;
		font-size: 32px;
		width: 300px !important;
	}

	.uni-input-time {
		margin-left: 50px !important;
		font-size: 28px;
		width: 162px;
	}

	.uni-input-time1 {
		margin-left: 50px !important;
		font-size: 28px;
		width: 200px !important;
	}

	.uni-input-picker {
		margin-left: 10px !important;
		font-size: 32px;
		width: 150px
	}

	.popupView {
		height: 250px;
		width: 500px;
		border-radius: 8px;
		background-color: #FFFFFF;
	}

	.popupView-u {
		text-align: left;
		width: 420px;
		margin-left: 40px;
		margin-top: 24px;
		color: #000000;
		font-size: 32px;
		height: 120px;
		margin-bottom: 16px;
	}

	.popupView-b {
		text-align: center;
		width: 500px;
		margin-top: 24px;
		color: #4A90E2;
		font-size: 30px;
		height: 88px;
		line-height: 88px;
		margin-bottom: 0;
		border-top: 1px solid #DFDFDF;
	}

	.uni-list-cell-db-start {
		position: absolute;
		left: 150px;
		width: 100px;
		z-index: 100;
	}

	.uni-list-cell-db-end {
		position: absolute;
		right: 150px;
		width: 100px;
		z-index: 100;
	}

	.pickerClass {
		position: absolute;
		width: 450px;
		margin-left: 160px;
		height: 80px;
		z-index: 10
	}
</style>
