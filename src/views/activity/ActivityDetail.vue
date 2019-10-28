<template>
  <div class="activityDetail">
    <div class="activityDetail-detail-title-bg">
      <img src="@/assets/images/activity/detail-example.png" alt="">
    </div>
    <activity-name-time
      title="海尔国潮家电节|海尔智慧厨房"
      startDate="2019-06-01"
      endDate="2019-06-18"
      address="青岛市崂山区海尔路10号海尔专卖店"
    ></activity-name-time>
    <div class="activityDetail-btm-btns">
      <button
        type="button"
        class="common-submit-btn-waring activityDetail-btm-btn"
      >分享有好礼
      </button>
      <button
        type="button"
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
      registerDialogShow: true,
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
      isRead: 0
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
</style>
