<template>
  <div class="activityDetail">
    <div class="activity-detail-container">
      <div class="activityDetail-detail-title-bg">
        <img :src="detailInfo.activityInfoPoster.posterUrl1" alt="">
      </div>
      <activity-name-time
        :title="detailInfo.activityTitle"
        :startDate="activityStartTime"
        :endDate="activityEndTime"
        :address="storeName"
      ></activity-name-time>
      <div class="activityDetail-detail-title-bg">
        <img v-if="detailInfo.activityInfoPoster.posterUrl2" :src="detailInfo.activityInfoPoster.posterUrl2" alt="">
        <img v-if="detailInfo.activityInfoPoster.posterUrl3" :src="detailInfo.activityInfoPoster.posterUrl3" alt="">
        <img v-if="detailInfo.activityInfoPoster.posterUrl4" :src="detailInfo.activityInfoPoster.posterUrl4" alt="">
        <img v-if="detailInfo.activityInfoPoster.posterUrl5" :src="detailInfo.activityInfoPoster.posterUrl5" alt="">
        <img v-if="detailInfo.activityInfoPoster.posterUrl6" :src="detailInfo.activityInfoPoster.posterUrl6" alt="">
        <img v-if="detailInfo.activityInfoPoster.posterUrl7" :src="detailInfo.activityInfoPoster.posterUrl7" alt="">
        <img v-if="detailInfo.activityInfoPoster.posterUrl8" :src="detailInfo.activityInfoPoster.posterUrl8" alt="">
        <img v-if="detailInfo.activityInfoPoster.posterUrl9" :src="detailInfo.activityInfoPoster.posterUrl9" alt="">
      </div>
      <div class="activity-detail-tip">
        活动说明
      </div>
      <div class="activity-detail-content">
        <span class="activity-detail-content-text">
          {{detailInfo.activityRules}}
        </span>
      </div>
      <div class="activity-detail-tip">
        联系人
      </div>
      <div class="activity-detail-content">
        <div class="activity-detail-content1">
          <img class="activity-detail-img" :src='detailInfo.activityLinkmanHeadUrl || defaultImg'>
          <div>
            <span class="activity-detail-seller-name"> {{activityLinkmanName}}</span>
            <!--            <span class="activity-detail-seller-store">巴拉巴拉巴拉拉</span>-->
            <div class="activity-detail-content1">
              <button class="activity-detail-btn mr16" v-show="detailInfo.activityLinkmanWechat">
                <i class="iconfont icon-weixin icon-img">
                  <span class="activity-detail-seller-store">{{detailInfo.activityLinkmanWechat}}</span>
                </i>
              </button>
              <button class="activity-detail-btn" v-show="activityLinkmanPhone">
                <i class="iconfont icon-dianhua icon-img1">
                  <a :href="'tel:'+activityLinkmanPhone"
                     class="activity-detail-seller-store">{{activityLinkmanPhone}}</a>
                </i>
              </button>
            </div>
            <span class="activity-detail-seller-store mt20" v-show="false">加微信好友备注：双十一啊</span>
          </div>
        </div>

      </div>
    </div>
    <div class="activityDetail-btm-btns">
      <button
        type="button"
        @click="share"
        v-show="detailInfo.allowShare === 1"
        class="common-submit-btn-waring activityDetail-btm-btn"
      >分享有好礼
      </button>
      <button
        type="button"
        @click="registerDialog"
        v-show="openId"
        style="margin-left: 30px"
        class="common-submit-btn-default activityDetail-btm-btn"
      >我要报名参加
      </button>
    </div>
    <md-dialog
      class="activityDetail-register-dialog"
      title="报名活动"
      :closable="true"
      v-model="registerDialogShow"
    >
      <div class="activityDetail-register-body">
        <div class="activityDetail-register-item">
          <input
            class="activityDetail-register-ipt"
            type="text"
            v-model="form.userNickname"
            v-resetInput
            placeholder="请输入您的姓名"
          >
        </div>
        <div class="activityDetail-register-item">
          <input
            class="activityDetail-register-ipt"
            type="text"
            v-model="form.mobile"
            v-resetInput
            placeholder="请输入手机号码"
          >
        </div>
        <div class="activityDetail-register-item1">
          <input
            class="activityDetail-verifyCode-ipt"
            type="text"
            maxlength="6"
            placeholder="请输入验证码"
            v-resetInput
            v-model="form.verifyCode"
          >
          <b-verificationcode
            :phone="form.mobile"
            :type="1"
          ></b-verificationcode>
        </div>
        <div class="activityDetail-register-item">
          <md-check-group
            class="md-check-group-inline activityDetail-checkbox"
            v-model="checkboxType"
          >
            <md-check name="1">预约认筹</md-check>
            <md-check name="2">预约服务</md-check>
            <md-check name="3">预约设计</md-check>
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
          <span class="activityDetail-register-protocol-href" @click="openLink">《用户信息收集隐私协议》</span>
        </div>
        <div class="activityDetail-register-btns">
          <button
            type="button"
            @click="clearJoinInfo"
            class="common-submit-btn-primary activityDetail-register-btn"
          >清空
          </button>
          <button
            type="button"
            @click="joinActivity"
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
            扫描识别
          </p>
          <p>
            关注海尔智家服务号
          </p>
        </div>
        <div class="activityDetail-qrcode-par">
          <div class="activityDetail-qrcode-corner activityDetail-qrcode-corner1"></div>
          <div class="activityDetail-qrcode-corner activityDetail-qrcode-corner2"></div>
          <div class="activityDetail-qrcode-corner activityDetail-qrcode-corner3"></div>
          <div class="activityDetail-qrcode-corner activityDetail-qrcode-corner4"></div>
          <img src="@/assets/images/activity/qrcode-zhijia.png" alt="">
        </div>
        <p class="activityDetail-qrcode-inf">
          了解更多会员权益，获取更多会员福利尽在
        </p>
        <p class="activityDetail-qrcode-name">
          海尔·智家服务号
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
  Dialog,
  Toast
} from 'mand-mobile';
import ActivityNameTime from '../../components/business/activity/ActivityNameTime';
import {
  BItem,
  BPopCheckList,
  BRadio,
  BVerificationcode
} from '@/components/form';
import defaultImg from '@/assets/images/activity/portrait-icon.png';

export default {
  name: 'ActivityDetail',
  components: {
    Toast,
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
      detailInfo: {
        activityInfoPoster: {
          posterUrl1: '',
          posterUrl2: '',
        }
      },
      // activityInfo: {},
      activityId: '',
      form: {
        productCatagoryList: [],
        userNickname: '',
        mobile: '',
        verifyCode: ''
      },
      // 注册对话框显示隐藏
      registerDialogShow: false,
      // 扫码识别二维码
      qrcodeDialogShow: false,
      checkboxType: [],
      // 注册对话框显示隐藏
      isShowProductCatagory: false,
      productCatagoryList: [],
      isRead: 1,
      isShowPopContainer: false,
      getUserInfo: {},
      openId: '',
      // 判断是不是在小程序里打开,1 =>小程序，0=>h5
      isMiniProgram: 0,
      // 联系人姓名手机号
      activityLinkmanName: '',
      activityLinkmanPhone: '',
      // 活动开始结束时间
      activityStartTime: '',
      activityEndTime: '',
      hmcId: '',
      linkUrl: '',
      storeName: '',
      defaultImg,
    };
  },
  async activated() {
    // 获取判断是否是小程序
    await this.getMiniProgramEnv();
    // this.openId = JSON.parse(localStorage.getItem('userinfo')).openId;
    // this.userinfo = JSON.parse(localStorage.getItem('userinfo'));
    this.getUserInfo = this.$route.params.userInfo;
    // 扫码打开的页面query里有activityId，跳转的params里有activityId
    this.activityId = this.$route.query.activityId || this.$route.params.activityId;
    if (this.getUserInfo) {
      this.openId = this.getUserInfo.openId;
    } else {
      this.openId = this.$route.query.openId;
    }
    console.log('activityDetail', this.openId);
    if (this.getUserInfo) {
      this.hmcId = this.getUserInfo.hmcId;
    } else {
      this.hmcId = this.$route.query.hmcId;
    }
    // 只要进来就增加浏览计数接口
    this.activityService.shareCount({}, {
      activityId: this.activityId,
      hmcId: this.hmcId,
      openId: this.openId,
      counterTypeCode: 'single_reading_count',
      noToken: true
    }).then((res) => {
      console.log('shareCount', res);
    });
    if (this.$route.query.activityId) {
      // 只有从分享后打开的才增加分享计数接口
      this.activityService.shareCount({}, {
        activityId: this.activityId,
        hmcId: this.hmcId,
        openId: this.openId,
        counterTypeCode: 'single_share_count',
        noToken: true
      }).then((res) => {
        console.log('shareCount', res);
      });
    }
    if (!this.openId) {
      if (this.isMiniProgram === 0) {
        const urlParams = window.location.href;
        this.linkUrl = urlParams;
        console.log('linkUrl before authorizedUrl', this.linkUrl);
        this.basicService.authorizedUrl({ frontUrl: this.linkUrl }).then((res) => {
          if (res.code === 1) {
            console.log('aut horizedUrl', res.data);
            window.location.replace(res.data);
          }
        });
      }
    }
    if (this.activityId) {
      // 活动详情查询
      this.activityService.queryActivityInfoDetails({}, {
        activityId: this.activityId,
        hmcId: this.hmcId,
        noToken: true
      }).then((res) => {
        if (res.code === 1) {
          // 通过扫码打开的活动并且不允许分享  不展示内容
          if (this.$route.query.activityId && res.data && res.data.allowShare === 0) {
            return;
          }
          this.detailInfo = res.data;
          if (this.detailInfo.storeName == '*') {
            this.storeName = '全部门店';
          } else {
            this.storeName = this.detailInfo.storeName;
          }
          if (this.detailInfo) {
            // 活动日期，截取到日
            if (this.detailInfo.activityEndTime) {
              const index = this.detailInfo.activityEndTime.indexOf(' ');
              this.activityEndTime = this.detailInfo.activityEndTime.substring(0, index);
            }
            if (this.detailInfo.activityStartTime) {
              const index = this.detailInfo.activityStartTime.indexOf(' ');
              this.activityStartTime = this.detailInfo.activityStartTime.substring(0, index);
            }
            if (this.detailInfo.activityLinkmanName) {
              this.activityLinkmanName = this.detailInfo.activityLinkmanName;
              this.activityLinkmanPhone = this.detailInfo.activityLinkmanPhone;
            } else {
              if (this.getUserInfo) {
                this.activityLinkmanName = this.getUserInfo.username;
                this.activityLinkmanPhone = this.getUserInfo.mobile;
              } else {
                this.activityLinkmanName = decodeURIComponent(this.$route.query.username);
                this.activityLinkmanPhone = this.$route.query.mobile;
              }
            }
            // https://testdb.haier.net/activity/activityDetail/?activityId=65022085451153408&mobile=15253269729&username=陆梦飞
            const protocol = `${window.location.protocol}//`;
            const host = window.location.host;
            const pathname = '/activity/activityDetail';
            const userName = encodeURIComponent(this.activityLinkmanName);
            const url = `${protocol + host + pathname}?activityId=${this.activityId}&mobile=${this.activityLinkmanPhone}&username=${userName}&hmcId=${this.hmcId}`;
            this.linkUrl = url;
            this.settingShareWX();
          }
        }
      });
    }
    this.getIndustry();
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
    getMiniProgramEnv() {
      // 判断环境是否为小程序
      return new Promise((resolve) => {
        wx.ready(() => {
          wx.miniProgram.getEnv((res) => {
            console.log(res.miniprogram);
            if (res.miniprogram) {
              this.isMiniProgram = 1;
            } else {
              this.isMiniProgram = 0;
            }
            return resolve(this.isMiniProgram);
          });
        });
        // 由于这里是进入就调用，如果wx config失败，则调用error，防止页面空白
        wx.error(() => resolve(true));
      });
    },
    showProductCatagory() {
      /* 显示产品类别 */
      this.isShowProductCatagory = true;
    },
    openLink() {
      window.location.href = 'https://account.haier.com/html/privacypolicy.html';
    },
    registerDialog() {
      // this.registerDialogShow = true;
      this.activityService.validateJoiner({
        activityId: this.activityId,
        openId: this.openId,
      }, {
        requestNoToast: true,
        noToken: true,
      }).then((res) => {
        if (res.code === -1) {
          Toast.failed(res.msg);
        } else {
          this.clearJoinInfo();
          this.registerDialogShow = true;
        }
      });
    },
    clearJoinInfo() {
      this.form = {
        productCatagoryList: [],
        userNickname: '',
        mobile: '',
        verifyCode: ''
      };
      this.checkboxType = [];
      this.isRead = 1;
    },
    // 获取产业数据
    getIndustry() {
      this.basicService.queryIndustry().then((res) => {
        if (res.code === 1) {
          res.data.forEach((item) => {
            item.id = item.industryCode;
            item.name = item.industryName;
          });
          this.productCatagoryList = res.data;
        }
      });
    },
    share() {
      this.isShowPopContainer = true;
      this.activityService.shareCount({}, {
        activityId: this.activityId,
        hmcId: this.hmcId,
        openId: this.openId,
        counterTypeCode: 'single_forword_count',
        noToken: true
      }).then((res) => {
        console.log('shareCount', res);
      });
    },
    // h5分享到朋友圈和好友的设置
    settingShareWX() {
      console.log('linkUrl', this.linkUrl);
      if (this.isMiniProgram === 0) {
        wx.ready(() => {
          wx.updateAppMessageShareData({
            title: '海知友兑呗', // 分享标题
            desc: '营销活动详情', // 分享描述
            link: this.linkUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: defaultImg, // 分享图标
            success: (res) => {
              // 转发计数接口
              console.log('updateAppMessageShareData success');
            },
            fail: (res) => {
              console.log('updateAppMessageShareData fail', res);
            }
          });
          wx.updateTimelineShareData({
            title: '海知友兑呗', // 分享标题
            link: this.linkUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: defaultImg, // 分享图标
            success: (res) => {
              // 转发计数接口
              console.log('updateTimelineShareData success');
            },
            fail: (res) => {
              console.log('updateTimelineShareData fail', res);
            }
          });
        });
      }
    },
    closeShare() {
      this.isShowPopContainer = false;
    },
    joinActivity() {
      if (!this.form.userNickname) {
        Toast.info('请输入您的姓名');
        return;
      }
      const mobile = this.form.mobile.trim();
      if (!mobile || !mobile.startsWith('1') || mobile.length != 11) {
        Toast.info('请输入正确手机号');
        return;
      }
      if (!this.form.verifyCode) {
        Toast.info('请输入验证码');
        return;
      }
      // 这两个不是必填项
      // if (!this.checkboxType || this.checkboxType.length == 0) {
      //   Toast.info('请选择预约类型');
      //   return;
      // }
      // if (!this.form.productCatagoryList || this.form.productCatagoryList.length == 0) {
      //   Toast.info('请选择产品类别');
      //   return;
      // }
      if (!this.isRead) {
        Toast.info('请阅读并同意隐私协议');
        return;
      }
      let getData = {
        activityId: this.activityId,
        hmcId: this.hmcId,
        openId: this.openId,
        isMiniProgram: this.isMiniProgram,
        productType: this.form.productCatagoryList[0],
        ...this.form,
        mobile,
      };
      this.checkboxType.forEach((item) => {
        if (item == 1) {
          getData = {
            ...getData,
            identifyFlag: 1,
          };
        } else if (item == 2) {
          getData = {
            ...getData,
            serviceFlag: 1,
          };
        } else if (item == 3) {
          getData = {
            ...getData,
            designFlag: 1,
          };
        }
      });
      this.activityService.saveJoiner(getData).then((res) => {
        if (res.code === 1) {
          Toast.info('报名成功');
          this.registerDialogShow = false;
          this.qrcodeDialogShow = true;
        }
      });
    },
  },
  beforeRouteLeave(to, from, next) {
    this.$destroy();
    next();
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
      /*width: 45%;*/
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
    flex-direction: row;
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

  .activityDetail-register-item1 {
    display: flex;
    flex-direction: row;
    align-items: center;
    min-height: 80px;
    box-shadow: 0 1px 0 0 rgba(208, 208, 208, 0.6);
  }

  .activityDetail-register-ipt {
    height: 100%;
    background: transparent;
    border: 0;
    box-shadow: none;
    padding-left: 4px;
  }

  .activityDetail-verifyCode-ipt {
    height: 100%;
    width: 360px;
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
    width: 216px;
    height: 48px;
    border: 1px solid rgba(102, 102, 102, 1);
    border-radius: 8px;
    background: #ffffff;
    margin-top: 12px;
    text-align: center;
  }

  .activity-detail-seller-name {
    font-size: 32px;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    margin-right: 20px;
  }

  .activity-detail-seller-store {
    font-size: 24px;
    color: rgba(153, 153, 153, 1);
  }

  .icon-img {
    font-size: 22px;
    color: #00cd00;
  }

  .icon-img1 {
    font-size: 22px;
    color: #4A90E2;
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
