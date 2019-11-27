<template>
  <div class="activityDetail">
    <div class="activity-detail-container">
      <div class="activityDetail-detail-title-bg">
        <img src="@/assets/images/activity/detail-example.png" alt="">
      </div>
      <activity-name-time
        title="海尔国潮家电节|海尔智慧厨房"
        startDate="2019-06-01"
        endDate="2019-06-18"
        address="青岛市崂山区海尔路10号海尔专卖店"
      ></activity-name-time>
      <div class="activityDetail-detail-title-bg">
        <img src="@/assets/images/activity/detail-example.png" alt="">
      </div>
      <div class="activity-detail-tip">
        活动说明
      </div>
      <div class="activity-detail-content">
        <span class="activity-detail-content-text">
          预存20元购买认筹券，活动当天现场可享受5重好礼;<br>
          一重礼：入场超值 礼品（鲁花1.25L花生油）<br>
          二重礼：累计消费2000抵100，满10000抵1000<br>
          三重礼：购买单品满1999元，获10-200元不等红包一个<br>
          四重礼：凡现场购物，凭发票9.9元超值秒杀<br>
          五重礼：消费满4000元，获幸运大转盘一次100%中将<br>
        </span>
      </div>
      <div class="activity-detail-tip">
        联系人
      </div>
      <div class="activity-detail-content">
        <div class="activity-detail-content1">
          <img src="../../assets/images/edit-delete.png" alt="" class="activity-detail-img">
          <div>
            <span class="activity-detail-seller-name"> 陆梦飞</span><span class="activity-detail-seller-store">巴拉巴拉巴拉拉</span>
            <div class="activity-detail-content1">
              <button class="activity-detail-btn"> <i class="iconfont icon-weixin icon-img"><span class="activity-detail-seller-store">1234567890</span></i></button>
              <button class="activity-detail-btn ml16"> <i class="iconfont icon-dianhua icon-img1"><span class="activity-detail-seller-store">1234567890</span></i></button>
            </div>
            <span class="activity-detail-seller-store mt20">加微信好友备注：双十一啊</span>
          </div>
        </div>

      </div>
    </div>
    <div class="activityDetail-btm-btns">
      <button
        type="button"
        @click="share"
        class="common-submit-btn-waring activityDetail-btm-btn"
      >分享有好礼
      </button>
      <button
        type="button"
        @click="registerDialog"
        class="common-submit-btn-default activityDetail-btm-btn"
      >我要报名参加
      </button>
    </div>
    <md-dialog
      class="activityDetail-register-dialog"
      title="注册海尔账号"
      :closable="true"
      v-model="registerDialogShow"
    >
      <div class="activityDetail-register-body">
        <div class="activityDetail-register-item">
          <input
            class="activityDetail-register-ipt"
            type="text"
            placeholder="请输入您的姓名"
          >
        </div>
        <div class="activityDetail-register-item">
          <input
            class="activityDetail-register-ipt"
            type="text"
            placeholder="请输入手机号码"
          >
        </div>
        <div class="activityDetail-register-item">
          <input
            class="activityDetail-register-ipt"
            type="text"
            placeholder="请输入验证码"
          >
          <b-verificationcode
          ></b-verificationcode>
        </div>
        <div class="activityDetail-register-item">
          <md-check-group
            class="md-check-group-inline activityDetail-checkbox"
            v-model="checkboxType"
          >
            <md-check name="self">预约认筹</md-check>
            <md-check name="couple">预约服务</md-check>
            <md-check name="parent">预约设计</md-check>
          </md-check-group>
        </div>
        <b-item
          class="activityDetail-register-item"
          title="选择产品类别"
          :arrow="true"
          @rightClick="showProductCatagory"
          :value="productCatagoryName"
        >
        </b-item>
        <div class="activityDetail-register-protocol">
          <b-radio
            inf="本人已阅读并同意"
            v-model="isRead"
          >
          </b-radio>
          <span class="activityDetail-register-protocol-href">《用户信息收集隐私协议》</span>
        </div>
        <div class="activityDetail-register-btns">
          <button
            type="button"
            class="common-submit-btn-primary activityDetail-register-btn"
          >清空
          </button>
          <button
            type="button"
            class="common-submit-btn-default activityDetail-register-btn"
          >确定
          </button>
        </div>
      </div>
    </md-dialog>
    <b-pop-check-list
      type="radio"
      :show.sync="isShowProductCatagory"
      title="选择产品类别"
      :list="productCatagoryList"
      v-model="form.productCatagoryList"
    ></b-pop-check-list>
    <md-dialog
      class="activityDetail-register-dialog"
      :closable="true"
      v-model="qrcodeDialogShow"
    >
      <div class="activityDetail-qrcode-body">
        <div class="activityDetail-qrcode-title">
          <p class="">
            扫描或长按识别
          </p>
          <p>
            关注海知友服务号
          </p>
        </div>
        <div class="activityDetail-qrcode-par">
          <div class="activityDetail-qrcode-corner activityDetail-qrcode-corner1"></div>
          <div class="activityDetail-qrcode-corner activityDetail-qrcode-corner2"></div>
          <div class="activityDetail-qrcode-corner activityDetail-qrcode-corner3"></div>
          <div class="activityDetail-qrcode-corner activityDetail-qrcode-corner4"></div>
          <img src="@/assets/images/activity/qrcode-example.png" alt="">
        </div>
        <p class="activityDetail-qrcode-inf">
          了解更多会员权益，获取更多会员福利尽在
        </p>
        <p class="activityDetail-qrcode-name">
          海尔·海知友服务号
        </p>
      </div>
    </md-dialog>
    <div class="popContainer" v-if="isShowPopContainer" @click="closeShare">

      <img src="@/assets/images/activity/activity-share.png" alt="" class="activity-detail-share">
    </div>
  </div>
</template>

<script>
import {
  Check,
  CheckGroup,
  Dialog
} from 'mand-mobile';
import ActivityNameTime from '../../components/business/activity/ActivityNameTime';
import {
  BItem,
  BPopCheckList,
  BRadio,
  BVerificationcode
} from '@/components/form';

export default {
  name: 'ActivityDetail',
  components: {
    BRadio,
    BPopCheckList,
    BItem,
    ActivityNameTime,
    BVerificationcode,
    'md-dialog': Dialog,
    'md-check-group': CheckGroup,
    'md-check': Check
  },
  data() {
    return {
      form: {
        productCatagoryList: []
      },
      // 注册对话框显示隐藏
      registerDialogShow: false,
      // 扫码识别二维码
      qrcodeDialogShow: false,
      checkboxType: [],
      // 注册对话框显示隐藏
      isShowProductCatagory: false,
      productCatagoryList: [
        {
          id: 1,
          name: '冰箱'
        },
        {
          id: 2,
          name: '彩电'
        },
        {
          id: 3,
          name: '厕所'
        },
        {
          id: 4,
          name: '刘能'
        }
      ],
      isRead: 0,
      isShowPopContainer: false,
    };
  },
  computed: {
    productCatagoryName() {
      /* 产品类别名 */
      const id = this.form.productCatagoryList[0];
      if (!id) {
        return '';
      }
      return this.productCatagoryList.find(v => id === v.id).name;
    }
  },
  methods: {
    showProductCatagory() {
      /* 显示产品类别 */
      this.isShowProductCatagory = true;
    },
    registerDialog() {
      this.registerDialogShow = true;
    },
    share() {
      this.isShowPopContainer = true;
    },
    closeShare() {
      this.isShowPopContainer = false;
    }
  }
};
</script>

<style lang="scss">
  .activityDetail {
    .b-pop-checkList {
      .md-popup {
        z-index: 9999;
      }
    }
  }

  .activityDetail-detail-title-bg {
    width: 100%;

    img {
      width: 100%;
    }
  }

  .activityDetail-btm-btns {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 24px;
    background: rgba(245, 245, 245, 1);

    .activityDetail-btm-btn {
      width: 45%;
    }
  }

  .activityDetail-register-dialog {
    .md-dialog-title {
      text-align: left;
      font-size: 36px;
    }

    .md-dialog-body {
      padding: 36px;
      max-height: 800px;
    }
  }

  .activityDetail-register-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    min-height: 80px;
    box-shadow: 0 1px 0 0 rgba(208, 208, 208, 0.6);
    color: #999;
    font-size: 28px;

    &.bItem-item {
      padding-left: 0;
      padding-right: 0;
    }

    .bItem-item-title {
      color: #999;
    }
  }

  .activityDetail-register-ipt {
    height: 100%;
    background: transparent;
    border: 0;
    box-shadow: none;
    padding-left: 4px;
  }

  .activityDetail-checkbox {
    .md-check {
      margin-left: 6px;

      &:first-child {
        margin-left: 0;
      }
    }
  }

  .activityDetail-register-btns {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 48px;

    .activityDetail-register-btn {
      width: 48%;
    }
  }

  .activityDetail-register-protocol {
    margin-top: 40px;
    font-size: 26px;

    .b-radio {
      display: inline;
      font-size: 26px;
      line-height: 38px;

      .iconfont {
        font-size: 26px;
      }
    }
  }

  .activityDetail-register-protocol-href {
    color: #4A90E2;
  }

  .activityDetail-qrcode-par {
    position: relative;
    padding: 42px;
    width: 500px;
    height: 500px;
    margin-left: auto;
    margin-right: auto;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .activityDetail-qrcode-corner {
    width: 40px;
    height: 40px;
    border-color: #999;
    border-style: solid;
    border-width: 0;
  }

  .activityDetail-qrcode-corner1 {
    position: absolute;
    top: 0;
    left: 0;
    border-top-width: 1px;
    border-left-width: 1px;
  }

  .activityDetail-qrcode-corner2 {
    position: absolute;
    top: 0;
    right: 0;
    border-top-width: 1px;
    border-right-width: 1px;
  }

  .activityDetail-qrcode-corner3 {
    position: absolute;
    bottom: 0;
    right: 0;
    border-bottom-width: 1px;
    border-right-width: 1px;
  }

  .activityDetail-qrcode-corner4 {
    position: absolute;
    bottom: 0;
    left: 0;
    border-bottom-width: 1px;
    border-left-width: 1px;
  }

  .activityDetail-qrcode-inf {
    margin-top: 38px;
    line-height: 1;
    color: #666;
    font-size: 26px;
    text-align: center;
  }

  .activityDetail-qrcode-name {
    margin-top: 20px;
    color: #333;
    font-size: 32px;
    line-height: 1;
    text-align: center;
  }

  .activityDetail-qrcode-title {
    text-align: center;

    p:nth-child(1) {
      color: #666;
      font-size: 26px;
    }

    p:nth-child(2) {
      color: #333;
      font-size: 32px;
    }
  }

  .activity-detail-container {
    padding-bottom: 132px;
  }

  .activity-detail-tip {
    color: rgba(51, 51, 51, 1);
    font-weight: bold;
    font-size: 30px;
    width: 100vw;
    height: 76px;
    background: rgba(245, 245, 245, 1);
    padding-left: 26px;
    line-height: 76px;
  }

  .activity-detail-content {
    background: #ffffff;
    width: 100vw;
    padding: 24px 30px;
  }

  .activity-detail-content-text {
    color: rgba(102, 102, 102, 1);
    font-size: 24px;
  }

  .activity-detail-content1 {
    display: flex;
    flex-direction: row;
  }

  .activity-detail-img {
    width: 120px;
    height: 120px;
    margin-right: 37px;
    margin-top: 12px;
    margin-bottom: 12px;
  }

  .activity-detail-content2 {
    display: flex;
    flex-direction: row;
  }

  .activity-detail-btn {
    width:216px;
    height:48px;
    border:1px solid rgba(102,102,102,1);
    border-radius:8px;
    background: #ffffff;
    margin-top: 12px;
    text-align: center;
  }

  .activity-detail-seller-name {
    font-size:32px;
    font-weight:bold;
    color:rgba(51,51,51,1);
    margin-right: 20px;
  }

  .activity-detail-seller-store {
    font-size:24px;
    color:rgba(153,153,153,1);
  }

  .icon-img {
    font-size:22px;
    color:#00cd00;
  }

  .icon-img1 {
    font-size:22px;
    color:#4A90E2;
  }

  .popContainer {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
  }

  .activity-detail-share {
    position: fixed;
    right: 128px;
    width: 493px;
    height: 694px;
  }
</style>
