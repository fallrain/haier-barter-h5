<template xmlns:v-slot="">
  <div>
    <!--    头部用户基本信息-->
    <header>
      <img src="@/assets/images/houseServicer/head.png" alt="">
      <div class="right-content">
        <div class="user-info">
          <div>
            <span class="">{{this.customerInfo.userName}}</span>
            <span v-show="this.customerInfo.userSex === 0">先生</span>
            <span v-show="this.customerInfo.userSex === 1">小姐</span>
          </div>
          <div class="mobile">
            {{this.customerInfo.userPhone}}
            <span class="icon iconfont icon-dianhua"></span>
          </div>
        </div>
        <!--        <div class="focus-tag">-->
        <!--          <span class="focused">已关注海之友</span>-->
        <!--          <span class="focused">已关注卡萨帝</span>-->
        <!--        </div>-->
      </div>
    </header>
    <!--    表单信息-->
    <div class="content-infor">
      <div class="fs30 mt24 mb22 ml25 text-333">入户服务计划详情</div>
      <b-item
        class="br-b text-666 pinpai"
        title="品牌"
        placeholder="请选择或输入品牌"
        :value="brandName"
        :arrow="true"
        @rightClick="chooseBrand"
      >
      </b-item>
      <b-item
        class="br-b text-666"
        title="产品类别"
        placeholder="请选择产品类别"
        :value="productGroup"
        :arrow="true"
        @rightClick="chooseProductType()"
      >
      </b-item>
      <div class="bg-white ph24">
        <div class="addAddress-form-item">
          <label class="addAddress-form-item-name text-333">购买渠道</label>
          <b-radio-item
            :inline="true"
            :list="buyChanl"
            v-model="productInfo.buyingChannel"
            @radioChange="radioChange"
          ></b-radio-item>
        </div>
      </div>
      <div class="product-item br-b fs28">
        <label class="text-333">产品购买价格</label>
        <div class="address-form-item">
          <input
            class="text-333 br-n fs28"
            type="number"
            placeholder="请输入产品购买价格"
            v-model="productInfo.price"
            @blur="judegNum"
          >
        </div>
      </div>
      <b-item
        class="br-b"
        title="购买日期"
      >
        <template
          v-slot:right=""
        >
          <b-date-picker
            class="product-date"
            slot="right"
            type="date"
            title="请选择购买日期"
            :defaultDate="productInfo.purchaseDate"
            v-model="productInfo.purchaseDate"
            :max-date="currentDate"
          ></b-date-picker>
        </template>
      </b-item>
      <div class="product-item br-b fs28">
        <label class="text-333">维修次数</label>
        <div class="address-form-item">
          <input class="text-333 br-n fs28"
                 type="text"
                 v-model="productInfo.frequency"
                 @keyup="dealNum($event)"
                 placeholder="请填写维修次数(可不填写)"
          >
        </div>
      </div>
      <div class="img-upload br-b">
        <div class="text-333 mb16">产品图片</div>
        <!--<b-upload
            :imgs="productInfo.img"
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
        </b-upload>-->
        <b-wx-upload
          :imgs="productInfo.picUrlList"
          :maxLength="3"
          @imageuploaded="(data)=>imageuploaded(data, productInfo.picUrlList)"
          @delFun="(index)=>delImg(index,productInfo.picUrlList)"
          :uploadFn="uploadImgFn"
          @errorhandle="uploadError"
        >
        </b-wx-upload>
      </div>
      <div class="br-b family-tag-area">
        <label class="fs28 text-333">用户使用感受</label>
        <div class="tagList">
          <span :class="['family-tag',assessmentV.some(v => v===i) && 'familyTagActive']"
                @click="clickFamilyTag(i)"
                v-for="(i, index) in assessmentList" :key="index">{{i}}
          </span>
          <span class="add-family-tag" @click="addLabel">+ 新建标签</span>
        </div>
      </div>
    </div>
    <!--    底部按钮-->
    <footer
      class="completeFamilyInfor-footer"
    >
      <button
        type="button"
        class="common-submit-btn-primary mr16"
        @click="dealCancle"
      >取消
      </button>
      <button
        type="button"
        class="common-submit-btn-default"
        @click="dealSave"
      >保存
      </button>
    </footer>
    <b-pop-check-list
      type="radio"
      :show.sync="tagPopShow"
      :list="brandList"
      v-model="brandV"
      @itemClick="showAddOtherBrand"
    ></b-pop-check-list>
    <b-pop-check-list
      type="radio"
      :show.sync="tagPopShow1"
      :list="productGroupName"
      v-model="productGroupV"
    ></b-pop-check-list>
    <md-dialog
      title="新建标签"
      :closable="true"
      v-model="basicDialog.open"
      :btns="basicDialog.btns"
    >
      <input
        type="text"
        class="dialog-input"
        placeholder="请输入标签名"
        v-model="addLabelValue"
      >
    </md-dialog>
    <md-dialog
      title="其他品牌"
      :closable="true"
      v-model="addOtherBrandDialog.open"
      :btns="addOtherBrandDialog.btns"
    >
      <input
        type="text"
        class="dialog-input"
        placeholder="请输入其他牌品名"
        maxLength="10"
        v-model="otherBrandNameTemp"
        v-noSpace
      >
    </md-dialog>
  </div>
</template>

<script>
import {
  Button,
  Dialog,
  Field,
  FieldItem,
  Icon,
  Popup,
  PopupTitleBar,
  Radio,
  Tag,
  Toast
} from 'mand-mobile';
import {
  BDatePicker,
  BItem,
  BPopCheckList,
  BRadioItem,
  BWxUpload
} from '@/components/form';

export default {
  name: 'AddNewProduct',
  components: {
    [Toast.name]: Toast,
    BDatePicker,
    BItem,
    BPopCheckList,
    BRadioItem,
    BWxUpload,
    [Popup.name]: Popup,
    [PopupTitleBar.name]: PopupTitleBar,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [Radio.name]: Radio,
    [Tag.name]: Tag,
    [Dialog.name]: Dialog,
  },
  data() {
    return {
      uploadUrl: '/api/file/simpleUpload',
      currentDate: new Date(),
      imageList: {
        reader0: []
      },
      buyChanl: [
        {
          key: 0,
          value: '线上平台'
        },
        {
          key: 1,
          value: '线下平台'
        }
      ],
      basicDialog: {
        open: false,
        btns: [
          {
            text: '取消',
            handler: this.onBasicCancel,
          },
          {
            text: '确定',
            handler: this.onBasicConfirm,
          },
        ],
      },
      addOtherBrandDialog: {
        open: false,
        brandId: [],
        btns: [
          {
            text: '取消',
            handler: () => { this.addOtherBrandDialog.open = false; }
          },
          {
            text: '确定',
            handler: this.onAddOtherBrandDialogConfirm,
          },
        ],
      },
      addLabelValue: '',
      assessmentList: [],
      assessmentV: [],
      productInfo: {
        brandItemCode: '',
        buyingChannel: 0,
        categoryItemCode: '',
        customerFamilyId: null,
        customerId: null,
        frequency: null,
        groupAppraiseCode: '',
        havePicture: false,
        picUrlList: [],
        // id: 0, 删除的时候用到
        name: '',
        price: null,
        purchaseDate: ''
      },
      tagPopShow: false,
      tagPopShow1: false,
      customerInfo: {},
      brandList: [], // 品牌列表
      brandV: [],
      productGroupName: [], // 产品组列表
      productGroupV: [],
      // 其他品牌品牌名
      otherBrandName: '',
      // 其他品牌品牌名缓存
      otherBrandNameTemp: '',
    };
  },
  computed: {
    brandName() {
      if (this.brandV) {
        const tagObj = this.brandList.find(v => v.itemCode === this.brandV[0]);
        let name;
        if (tagObj) {
          const brandItemCode = tagObj.itemCode;
          this.productInfo.brandItemCode = brandItemCode;
          // 其他品牌的时候取 otherBrandName
          if (brandItemCode !== '9999') {
            name = tagObj.name;
          } else {
            name = this.otherBrandName;
          }
        } else {
          name = '';
        }
        return name;
      }
      return '';
    },
    productGroup() {
      if (this.productGroupV || this.productInfo.categoryItemCode) {
        const tagObj = this.productGroupName.find(v => v.id === this.productGroupV[0])
            || this.productGroupName.find(v => v.groupCode === this.productInfo.categoryItemCode);
        let name;
        if (tagObj) {
          this.productInfo.categoryItemCode = tagObj.groupCode;
          name = tagObj.name;
        } else {
          name = '';
        }
        return name;
      }
      return '';
    }
  },
  created() {
    if (this.$route.params.customerInfo) {
      this.customerInfo = this.$route.params.customerInfo;
      const brandList = this.$route.params.BRANDList;
      this.brandList = brandList.map(v => ({
        ...v,
        id: v.itemCode
      }));
      this.$route.params.productGroupName.forEach((item) => {
        item.name = item.groupName;
      });
      this.productGroupName = this.$route.params.productGroupName;
      // 编辑
      if (this.$route.params.productInfo) {
        this.productInfo = this.$route.params.productInfo;
        // this.productInfo.buyingChannel = this.$route.params.productInfo.buyingChannel.toString();
        this.productInfo.purchaseDate = this.bUtil.formatDate(this.$route.params.productInfo.purchaseDate, 'yyyy-MM-dd');
        this.productInfo.havePicture = false;
        const {
          brandName,
          brandItemCode,
          img,
          groupAppraiseCode
        } = this.productInfo;
        // 下拉选中
        this.brandV = [brandItemCode];
        // 其他品牌的时候需要给otherBrandName赋值做缓存
        if (brandItemCode === '9999') {
          this.otherBrandName = brandName;
          this.otherBrandNameTemp = brandName;
        }
        if (img) {
          this.productInfo.picUrlList = img;
        } else {
          this.productInfo.picUrlList = [];
        }

        if (groupAppraiseCode) {
          this.assessmentV = groupAppraiseCode.split(',');
        }

        this.regio = 'edit';
        console.log(this.productInfo);
      }
    }
    // 用户评价字典
    this.productService.commonTypeQuery('group_appraise_code').then((res) => {
      if (res.code === 1) {
        const arr = [];
        res.data.forEach((item) => {
          arr.push(item.itemName);
        });
        this.assessmentList = arr;
      }
    });
  },
  methods: {
    radioChange(val) {
      this.productInfo.buyingChannel = val;
    },
    dealNum(e) {
      const flag = new RegExp('^[1-9]([0-9])*$').test(e.target.value);
      if (!flag) {
        Toast.failed('请输入正整数');
        this.productInfo.frequency = '';
      }
    },
    chooseBrand() {
      /* 选择品牌显示隐藏 */
      this.tagPopShow = true;
    },
    chooseProductType() {
      /* 选择产品类别显示隐藏 */
      this.tagPopShow1 = true;
    },
    // 取消
    dealCancle() {
      this.$router.go(-1);
    },
    // 保存
    dealSave() {
      if (this.productInfo.brandItemCode === '') {
        Toast.failed('请选择品牌！');
        return;
      }
      if (this.productInfo.categoryItemCode === '') {
        Toast.failed('请选择产品类别！');
        return;
      }
      if (this.productInfo.buyingChannel === '') {
        Toast.failed('请选择购买渠道！');
        return;
      }
      if (this.productInfo.price === null) {
        Toast.failed('请输入产品价格！');
        return;
      }
      if (this.productInfo.purchaseDate === '') {
        Toast.failed('请选择购买日期！');
        return;
      }
      // 其他品牌的时候传额外传brandName字段，代表一个自定义品牌
      if (this.productInfo.brandItemCode === '9999') {
        this.productInfo.brandName = this.brandName;
      }
      this.productInfo.name = this.brandName + this.productGroup;
      this.productInfo.customerFamilyId = this.customerInfo.customerInfoId;
      this.productInfo.customerId = this.customerInfo.customerId;
      this.productInfo.groupAppraiseCode = this.assessmentV.join(',');
      if (this.customerInfo.id) { // 更改已完善家电信息状态
        this.houseService.completeAppliance({
          planId: this.customerInfo.id
        }).then((res) => {
          if (res.code === 1) {
          }
        });
      }
      delete this.productInfo.img;
      this.basicService.saveHouseHold(this.productInfo, {}).then((res) => {
        if (res.code === 1) {
          if (this.regio === 'edit') {
            Toast.succeed('产品修改成功');
          } else {
            Toast.succeed('产品添加成功');
          }
          setTimeout(() => {
            this.$router.go(-1);
          }, 800);
        }
      });
    },
    uploadImgFn(mediaId) {
      return this.basicService.uploadByMediaId({}, {
        mediaId
      });
    },
    imageuploaded(data, fileList) {
      Toast.hide();
      if (data.code === 1) { // 上传成功
        fileList.push(data.data);
        this.productInfo.havePicture = true;
        // this.productInfo.picUrlList.push(data.data);
      }
    },
    delImg(index, fileList) {
      // this.productInfo.picUrlList.splice(index, 1);
      fileList.splice(index, 1);
    },
    uploadError(res) {
      console.log(res);
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
    // 家庭标签选择
    clickFamilyTag(i) {
      if (this.assessmentV.indexOf(i) > -1) {
        this.assessmentV.forEach((item, index) => {
          if (item == i) {
            this.assessmentV.splice(index, 1);
          }
        });
      } else {
        this.assessmentV.push(i);
      }
      // if (state) {
      //   this.$refs.tagJudges[indexNum].classList.add('familyTagActive');
      // } else {
      //   this.$refs.tagJudges[indexNum].classList.remove('familyTagActive');
      // }
    },
    addLabel() {
      this.basicDialog.open = true;
    },
    onBasicConfirm() {
      if (this.addLabelValue !== '') {
        if (this.assessmentList.indexOf(this.addLabelValue) > -1) {
          Toast.failed('该标签已经存在请重新输入');
          this.addLabelValue = '';
          return;
        }
        this.assessmentList.push(this.addLabelValue);

        this.basicDialog.open = false;
      }
    },
    onBasicCancel() {
      this.basicDialog.open = false;
    },
    judegNum() {
      if (!this.testStr(this.productInfo.price) || this.productInfo.price > 10000000) {
        this.productInfo.price = '';
        Toast.failed('请输入正确的数值，最大数值为1000000且小数点后两位');
      }
    },
    testStr(num) {
      const reg = /^(\d+)(.\d{0,2})?$/;
      return reg.test(num);
    },
    showAddOtherBrand(ids) {
      /* 展示添加其他品牌弹出框 */
      if (ids[0] === '9999') {
        this.tagPopShow = false;
        this.addOtherBrandDialog.brandId = ids;
        // 重置为之前已经确定的品牌名
        this.otherBrandNameTemp = this.otherBrandName;
        this.addOtherBrandDialog.open = true;
      }
    },
    onAddOtherBrandDialogConfirm() {
      /* 输入其他品牌名后的操作 */
      if (this.otherBrandNameTemp) {
        if (this.otherBrandNameTemp.length > 10) {
          this.$toast.failed('品牌名不能超过10个字符');
          return;
        }
        this.addOtherBrandDialog.open = false;
        // 输入后才算选了brandV
        this.brandV = this.addOtherBrandDialog.brandId;
        this.otherBrandName = this.otherBrandNameTemp;
      } else {
        this.$toast.failed('请输入品牌名');
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === 'Houseservice.CompleteFamilyInfor') {
      to.query.tabState = 2;
      this.$destroy();
    }
    next();
  },
};
</script>
<style lang="scss" scoped>
  .dialog-input {
    display: block;
    width: 100%;
    padding: 0 24px;
    border: 1px solid #ddd;
    height: 60px;
    line-height: 46px;
    border-radius: 8px;
    font-size: 26px;
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

  header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 191px;
    background: #fff;
    padding: 27px 24px;

    img {
      width: 144px;
      height: 144px;
      border-radius: 50%;
    }

    .right-content {
      flex-grow: 1;
      padding: 4px 0 0 26px;

      .user-info {
        display: flex;
        justify-content: space-between;

        span:nth-child(1) {
          font-size: 30px;
          color: #333;
          margin-right: 30px;
        }

        span:nth-child(2) {
          font-size: 28px;
          color: #999999;
        }

        span:nth-child(3) {
          font-size: 28px;
          color: #999999;
        }

        .mobile {
          height: 48px;
          line-height: 48px;
          background: #4A90E2;
          border-radius: 24px;
          padding: 0 24px 0 60px;
          color: #fff;
          position: relative;

          span {
            color: #fff;
            position: absolute;
            left: 20px;
            top: 3px;
          }
        }
      }
    }

    .focus-tag {
      margin-top: 28px;

      .focused {
        height: 48px;
        line-height: 48px;
        color: #F5A623;
        border: 1px solid #F5A623;
        border-radius: 24px;
        margin-right: 16px;
        padding: 0 18px;
        font-size: 26px;
      }
    }
  }

  .content-infor {
    padding-bottom: 152px;
    color: #666;
    font-size: 28px;

    .product-item {
      height: 74px;
      line-height: 74px;
      background: #fff;
      font-size: 28px;
      padding-left: 24px;
      padding-right: 24px;
      display: flex;
      justify-content: space-between;

      input {
        text-align: right;
        width: 370px;
      }
    }

    .product-date {
      width: 300px;
    }

    .family-tag-area {
      padding: 20px 24px 4px;
      background: #fff;
      font-size: 24px;

      .tagList {
        .familyTagActive {
          color: #1969C6;
          border-color: #1969C6 !important;
        }

        margin-top: 24px;

        .family-tag {
          line-height: 36px;
          padding: 0 17px;
          border: 1px solid #D0D0D0;
          border-radius: 8px;
          margin-right: 16px;
          margin-bottom: 16px;
          display: inline-block;
        }

        .add-family-tag {
          line-height: 36px;
          padding: 0 17px;
          border: 1px dashed #D0D0D0;
          border-radius: 8px;
          margin-right: 16px;
          margin-bottom: 16px;
          display: inline-block;
        }
      }
    }
  }

  .bItem-item-right-val {
    font-size: 26px;
    color: #666;
  }

  .md-field {
    padding: 0;

    .md-field-item-content {
      min-height: 74px !important;
      padding: 0 24px;
      display: flex;
      justify-content: space-between;

      .md-field-item-title {
        font-size: 26px !important;
        color: #666;
      }

      .md-field-item-control {
        text-align: right;
        font-size: 28px !important;
        color: #666;
      }
    }

    .md-field-item-content > .md-field-item-title {
      font-size: 28px !important;
    }
  }

  footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 24px;
    background: #fff;

    .md-example-section {
      display: flex;
      justify-content: space-between;

      button {
        width: 48%;
        height: 84px;
      }
    }

  }

  .img-upload {
    position: relative;
    overflow: hidden;
    background: #fff;
    padding: 10px 24px;
  }

  .md-example-child-reader .image-reader-list .image-reader-item.add {
    background: #EBEBEB !important;
  }

  .md-example-child-reader {
    overflow: hidden;

    .image-reader-list {
      float: left;
      width: 100%;

      .image-reader-item {
        position: relative;
        float: left;
        width: 23.5%;
        padding-bottom: 23.5%;
        margin-bottom: 2%;
        margin-right: 2%;
        background: #fff;
        box-shadow: 0 5px 20px rgba(197, 202, 213, .25);
        box-sizing: border-box;
        list-style: none;
        border-radius: 4px;
        background-size: cover;
        overflow: hidden;

        &:nth-of-type(4n) {
          margin-right: 0;
        }

        &.add {
          .md-icon {
            position: absolute;
            top: 40%;
            left: 50%;
            transform: translate(-50%, -50%);
            opacity: .5;
          }

          p {
            position: absolute;
            top: 50%;
            left: 0;
            width: 100%;
            margin-top: 15px;
            font-size: 22px;
            color: #CCC;
            text-align: center;
          }
        }

        .image-reader-item-del {
          position: absolute;
          top: 0;
          right: 0;
          z-index: 3;
          opacity: .8;

          .md-icon-close {
            font-size: 24px;
          }
        }
      }
    }
  }

  .pinpai {
    position: relative;
  }

  .pinpaitmpl {
    // position: absolute;
  }

  .ph24 {
    padding: 0 24px;
  }

  .bg-white {
    background: #fff;
  }

  .br-b {
    border-bottom: 1px solid #f5f5f5;
  }

  .br-n {
    border: none;
  }

  .mt2 {
    margin-top: 2px;
  }

  .mt5 {
    margin-top: 5px;
  }

  .mt24 {
    margin-top: 24px;
  }

  .ml25 {
    margin-left: 25px;
  }

  .ml10 {
    margin-left: 10px;
  }

  .mbn {
    margin-bottom: 0 !important;
  }

  .lh36 {
    line-height: 36px;
  }

  .fs30 {
    font-size: 30px;
  }

  .fs24 {
    font-size: 24px;
  }

  .fs26 {
    font-size: 26px;
  }

  .fs28 {
    font-size: 28px;
  }

  .fs34 {
    font-size: 34px;
  }

  .icon-color {
    color: #4A90E2;
  }

  .text-333 {
    color: #333333;
  }

  .text-666 {
    color: #666666;
  }

  .text-ccc {
    color: #CCCCCC;
  }

  .text-primary {
    color: #1969C6;
  }

  .text-bold {
    font-weight: bold;
  }
</style>
