<template>
  <div>
    <div class="orderConfirm-no">
      <span class="orderConfirm-p">订单号：</span>
      <p class="orderConfirm-s">{{orderNo}}</p>
    </div>
    <!-- <div class="orderEntry-header">
      <span class="orderEntry-header-name">门店：{{shopName}}</span>
    </div> -->
    <b-item
      class="mt16"
      title="门店："
      :value="shopName"
    >
    </b-item>
    <div class="orderEntry-header-cus">
      <span class="name mr16">顾客信息:{{username}}</span>
      <span class="name mr16">{{phone}}</span>
    </div>

    <div class="orderEntry-user">
      <div>
        <div class="orderEntry-user-head">
          <span class="name mr16">收货人：{{consignee.name}}</span>
          <span class="sex mr16">{{consignee.sexCn}}</span>
          <i class="iconfont icon-dianhua mr16"></i>
          <span class="phone mr16">{{consignee.phone}}</span>

        </div>
        <p class="orderEntry-user-address">
          {{consignee.address}}
        </p>
      </div>
    </div>
    <b-item
      class="mt16"
      title="购买日期："
      :value="buyDate"
    >
    </b-item>
    <b-item
      class="mt16"
      title="订单类型："
      :value="orderType"
    >
    </b-item>
    <b-fieldset
      class="mt16"
      title="用户购买的产品"
    >
      <div>
        <ul>
          <b-order-product-confirm
            class="mb20"
            v-for="(item,index) in productList"
            :key="index"
            :data="item"
            :index="index"
            :content="item.installTime"
          >
          </b-order-product-confirm>
        </ul>
      </div>
    </b-fieldset>
    <b-item
      class="mt16"
      title="送货时间："
      :value="deliveryTime"
    >
    </b-item>
    <b-fieldset
      class="mt16 orderEntry-rights-fieldset"
      title="已选择的权益"
      :headBtmLine="true"
    >
      <div>
        <b-activity-list
          :isDetail="isDetail"
          :data="activityList"
          v-model="choosedActivitys"
        ></b-activity-list>
      </div>
    </b-fieldset>
    <div class="orderEntry-btns-par">
      <button
        type="button"
        class="common-submit-btn-primary"
        @click="changeOrder"
      >返回修改草稿
      </button>
      <button
        type="button"
        class="common-submit-btn-default"
        @click="next"
      >确认订单
      </button>
    </div>
    <div v-show="tipState" class="shade-style">
      <div class="content">
        <div v-show="timeShow" class="time-style">{{totalTime}}s</div>
        <p class="title">权益录单合规提示函</p>
        <p>请保证订单录入真实，并遵循《中国区权益资源使用机制平台》，虚假订单将关闭兑呗权益使用权限并承担双倍买损责任！ </p>
        <!--<p class="text-indent2 fs28">
          各小微在使用权益资源的同时，应做好资源管理监控和闭环，杜绝权益虚假和恶意占用，保证直销员/门店录入订单的合理、合规，资源直达用户。
        </p>
        <p class="title2">一、 中国区权益资源使用虚假判定基本原则</p>
        <p class="lh40 fs28">
          第一条 严禁录入未产生真实销售的虚假订单;<br/>
          第二条 严禁代用户领取积分权益；<br/>
          第三条 严禁录入非当前活动期间购买的订单从而占用当前活动资源;<br/>
          第四条 严禁拼凑订单占用套购资源/单品资源;<br/>
          第五条 严禁将自己的兑呗账号借与他人，出现问题将由账号主人买损，后果自负；<br/>
          第六条 所有订单系统留痕，将不定期抽查，订单真实性以购机凭证为准；<br/>
        </p>
        <p class="title2">二、 适用范围</p>
        <p class="lh40 fs28">中国区整合营销套购权益、产业单品权益及产业内套、卡萨帝单品权益等其他用户权益；</p>
        <p class="title2">三、 虚假处罚机制：</p>
        <p class="lh40 fs28">
          1、违反以上《基本原则》的均视为虚假订单；<br/>
          2、小微自查套购虚假案例：直销员及相关参与者出现虚假，按录入虚假订单的发放权益价值双倍买单，并返还礼品，永久冻结权益使用权限。<br/>
          3、二次虚假者，按录入虚假订单的发放权益价值双倍买损，由平台拟定散单通报，人力，产业，小微总会签后直接散出企业，并将相关人员加入职场征信黑名单。<br/>
          4、造假情节严重者，追究其刑事责任，由内控和法务审核，中心配合交予公安机关按刑法处理。<br/>
        </p>
        <p class="title2">四、补充条款</p>
        <p class="lh40 fs28">
          1.真订单但发票不合规，如上传发票模糊，发票不完整，冻结权益使用权限1个月。<br/>
          2.真订单但重复录入，如上传发票上的型号与录入的订单不一致，发票多次使用，冻结权益使用权限3个月。<br/>
          3.假订单假发票，永久冻结权益使用权限。<br/>
          4.假套购订单并申报工资，永久冻结权益使用权限。<br/>
        </p>
        <p class="text-danger text-indent2 mt20">
          我已认真阅读《购机权益录单合规提示函》知晓其中内容，我郑重承诺，认同《购机权益录单合规提示函》中各项规定并严格遵守，保证录单真实规范，若有违反公司规章内容的，自愿接受公司相关规章制度的管理处罚。
        </p>-->
        <div class="tip-button">
          <md-button
            class="mr28"
            :type="timeShow?'disabled':'primary'"
            size="small"
            inline
            @click="cancelTip"
            plain
          >取消
          </md-button>
          <md-button
            :type="timeShow?'disabled':'primary'"
            size="small"
            inline
            @click="sureTip"
          >确定
          </md-button>
        </div>
      </div>
    </div>
    <md-dialog
      title=""
      :closable="true"
      v-model="basicDialog.open"
      :btns="basicDialog.btns"
    >
      {{basicDialog.countdown}}请保证订单录入真实，并遵循《中国区权益资源使用机制平台》，虚假订单将关闭兑呗权益使用权限并承担双倍买损责任！
    </md-dialog>
  </div>
</template>

<script>
import {
  Button,
  Dialog
} from 'mand-mobile';
import {
  BActivityList,
  BFieldset,
  BItem,
  BOrderProductConfirm,
} from '@/components/form';

import {
  mapGetters
} from 'vuex';

import orderTypes from '@/store/mutationsTypes/orderTypes';

export default {
  name: 'OrderModify',
  components: {
    [Dialog.name]: Dialog,
    [Button.name]: Button,
    BActivityList,
    BFieldset,
    BItem,
    BOrderProductConfirm
  },
  data() {
    return {
      kind: -1,
      tipState: false,
      tipState2: false,
      timeShow: true,
      totalTime: 5,
      // 是否详情模式
      isDetail: true,
      // 门店名称
      shopName: '新华百货老大楼',

      // 收货人信息
      consignee: {
        // name: '',
        // sex: '男士',
        // phone: '15067543689'
      },

      // 订单类型
      orderType: 0,
      // 购机时间
      buyDate: '',
      // 产品列表
      productList: [],
      // 活动列表
      activityList: [],
      // 选中的活动id
      choosedActivitys: [],
      // 选择礼品pop显示隐藏
      chooseGiftPopShow: false,
      // pop礼品列表
      giftList: [],
      orderNo: '',
      createdTime: '',
      deliveryTime: '',
      customerString: '',
      username: '',
      phone: '',
      rightsJson: '',
      orderInfo: {},
      basicDialog: {
        open: false,
        countdown: 5,
        disabled: true,
        btns: [
          {
            text: '取消',
            handler: this.onBasicCancel,
          },
          {
            text: '确认',
            handler: this.onBasicConfirm,
          },
        ],
      },
      interval: null
    };
  },
  computed: {
    ...mapGetters([
      orderTypes.GET_INCLUDE_RIGHTS
    ])
  },
  created() {
    this.orderNo = this.$route.params.orderNo;
    this.orderFollowId = this.$route.params.orderFollowId;
    // this.orderNo = 'Z15645424968056668';
    if (this.orderNo) {
      this.getData();
    }
    this.basicService.userInfo().then((res) => {
      if (res.code === 1) {
        this.kind = res.data.kind;
      }
    });
  },
  methods: {
    getActivityList() {
      // this.rightsService.getRightsConfigInfoByOrderNo({orderNo:this.orderNo}, {}).then((res) => {
      //   if (res.code === 1) {
      //     if (res.data.length !== 0) {
      //       this.activityList = res.data;
      //       ri.startTime = ri.startTime.substring(0,10)
      //       ri.endTime = ri.endTime.substring(0,10)
      //     }
      //   }
      // });
      const obj = {
        orderDetailSaveQoList: this.productList,
        orderNo: this.orderNo,
        rightsUserJson: this.rightsJson
      };
      this.rightsService.getRightsConfigInfo(obj, {}).then((res) => {
        if (res.code === 1) {
          if (res.data.length !== 0) {
            this.activityList = res.data;
            this.activityList.forEach((ri) => {
              ri.startTime = ri.startTime.substring(0, 10);
              ri.endTime = ri.endTime.substring(0, 10);
            });
          }
        }
      });
    },
    getData() {
      this.orderService.queryOrderInfoByOrderNo({}, { orderNo: this.orderNo }).then((response) => {
        if (response.code === 1) {
          const resData = response.data;
          this.orderInfo = resData;
          this.shopName = resData.storeName;
          this.consignee.name = resData.consigneeName;
          this.username = resData.userName;
          this.phone = resData.userPhone;
          this.consignee.phone = resData.consigneePhone;
          this.consignee.sex = resData.userSex;
          if (resData.userSex === 1) {
            this.consignee.SexCn = '男士';
          } else {
            this.consignee.SexCn = '女士';
          }
          this.consignee.address = resData.dispatchProvince + resData.dispatchCity + resData.dispatchArea + resData.dispatchAdd;
          this.buyDate = resData.buyTime;
          if (resData.orderType == 0) {
            this.orderType = '单品';
          } else {
            this.orderType = '套购';
          }
          this.deliveryTime = resData.deliveryTime.replace(/-/g, '/');
          const dt = new Date(Date.parse(this.deliveryTime));
          const y = dt.getFullYear();
          const m = dt.getMonth() + 1;
          const d = dt.getDate();
          const h = dt.getHours();
          const ha = h + 1;
          const time = `${y}-${m}-${d} ${h}:00-${ha}:00`;
          this.deliveryTime = time;
          this.createdTime = resData.createdTime;
          this.orderNo = resData.orderNo;
          if (resData.orderDetailDtoList.length !== 0) {
            this.productList = resData.orderDetailDtoList;
            this.productList.forEach((item) => {
              if (item.productBrand == '000') {
                item.productBrandCN = '海尔';
              } else if (item.productBrand == '051') {
                item.productBrandCN = '卡萨帝';
              } else if (item.productBrand == '089') {
                item.productBrandCN = '统帅';
              } else {
                item.productBrandCN = '其他';
              }
            });
          }

          if (resData.rightsUserJson) {
            this.rightsJson = JSON.parse(resData.rightsUserJson);
            this.getActivityList();
          }
          // if (resData.rightName) {
          //   this.activityList = resData.rightName.split(',');
          // }
        }
      });
    },
    next() {
      // 有权益才弹出文字提示
      if (this[orderTypes.GET_INCLUDE_RIGHTS]) {
        this.tipState = true;
        const clock = setInterval(() => {
          this.totalTime--;
          if (this.totalTime < 1) {
            this.timeShow = false;
            this.totalTime = 5;
            clearInterval(clock);
          }
        }, 1000);
      } else {
        this.sureTip();
      }
    },
    cancelTip() {
      this.timeShow = true;
      this.tipState = false;
    },
    sureTip() {
      this.timeShow = true;
      this.tipState = false;
      this.orderService.createOrderSubmit({}, { orderNo: this.orderNo }).then((res) => {
        if (res.code === 1) {
          localStorage.removeItem('orderFollowId');
          this.$router.push({
            name: 'Order.OrderFollowCommitResult',
            params: { orderInfo: res.data }
          });
        }
      });
      /* Dialog.confirm({
                content: '请务必上传真实、清晰、完整的发票。否则，将影响用户权益的领取，而且将影响您的工资核算与发放！',
                confirmText: '确定',
                onConfirm: () => {
                  this.orderService.createOrderSubmit({}, { orderNo: this.orderNo }).then((res) => {
                    if (res.code === 1) {
                      localStorage.removeItem('orderFollowId');
                      this.$router.push({
                        name: 'Order.OrderFollowCommitResult',
                        params: { orderInfo: res.data }
                      });
                    }
                  });
                },
              }); */
    },
    changeOrder() {
      this.$router.push({
        name: 'Order.OrderModify',
        params: {
          orderNo: this.orderNo,
          orderFollowId: this.orderFollowId
        }
      });
    },
    saveOrder() {

    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.$vnode && this.$vnode.data.keepAlive) {
      if (this.$vnode.parent && this.$vnode.parent.componentInstance && this.$vnode.parent.componentInstance.cache) {
        if (this.$vnode.componentOptions) {
          const key = this.$vnode.key == null
            ? this.$vnode.componentOptions.Ctor.cid + (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '')
            : this.$vnode.key;
          const cache = this.$vnode.parent.componentInstance.cache;
          const keys = this.$vnode.parent.componentInstance.keys;
          if (to.name === 'Order.OrderModify') {
            keys.forEach((k) => {
              if (cache[k]) {
                if (cache[k].tag.indexOf('OrderEntry') > -1) {
                  delete cache[k];
                }
              }
            });
          }
          if (cache[key]) {
            if (keys.length) {
              const index = keys.indexOf(key);
              if (index > -1) {
                keys.splice(index, 1);
              }
            }
            delete cache[key];
          }
        }
      }
    }
    this.$destroy();

    next();
  },

};
</script>

<style lang="scss">
  .text-indent2 {
    text-indent: 2em;
  }

  .lh40 {
    line-height: 40px;
  }

  .fs28 {
    font-size: 28px;
  }

  .text-danger {
    color: #f05b4b;
  }

  .tip-button {
    margin-top: 30px;
    display: flex;
    justify-content: center;
  }

  .shade-style {
    position: fixed;
    padding: 50px;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.7);

    .time-style {
      position: absolute;
      left: 24px;
      top: 16px;
      z-index: 999;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      line-height: 80px;
      text-align: center;
      border: 1px solid #1969c6;
      color: #1969c6;
      background: #fff;
    }

    .content {
      position: absolute;
      background: #fff;
      border-radius: 10px;
      overflow: auto;
      padding: 40px;
      width: 650px;
      // height: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      .title {
        font-size: 34px;
        font-weight: 600;
        text-align: center;
        line-height: 50px;
        margin-bottom: 20px;
      }

      .title2 {
        font-size: 30px;
        font-weight: 600;
        line-height: 50px;
      }
    }
  }

  .orderEntry-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 80px;
    background: #fff;
    padding-left: 27px;
    padding-right: 25px;
    color: #1969C6;
  }

  .orderEntry-header-name {
    font-size: 28px;
  }

  .orderEntry-header-icon {
    font-size: 32px;
  }

  .orderEntry-user {
    background: #fff;
    padding: 24px;
    margin-top: 16px;
  }

  .orderEntry-user-head {
    display: flex;
    align-items: center;

    .name {
      color: #333;
      font-size: 28px;
    }

    .sex {
      color: #333;
      font-size: 24px;
    }

    .icon-dianhua {
      font-size: 32px;
      color: #1969C6;
    }

    .phone {
      color: #1969C6;
      font-size: 28px;
    }

    .common-btn-waring {
      margin-left: auto;
    }
  }

  .orderEntry-user-address {
    color: #666;
    font-size: 28px;
    line-height: 36px;
    margin-top: 28px;
  }

  .orderEntry-date {
    width: 320px;
  }

  .orderEntry-reportInf {
    color: #3078CC;
    font-size: 24px;
  }

  .orderEntry-rights-fieldset {
    .b-fieldset-legend-left {
      font-size: 28px;
      color: #333;
    }

    .b-fieldset-legend-right {
      font-size: 24px;
      color: #1969C6;
    }
  }

  .orderEntry-rights-fieldset-more {
    margin-top: 20px;
    color: #1969C6;
    font-size: 24px;
    text-align: center;
  }

  .orderentry-address {
    .md-popup-mask {
      top: 0;
    }
  }

  .orderConfirm-no {
    color: #1969C6;
    font-size: 28px;
    height: 80px;
    display: flex;

    .orderConfirm-p {
      height: 80px;
      line-height: 80px;
      padding-left: 25px;
      /*width: 520px;*/
      flex-shrink: 0;
    }

    .orderConfirm-s {
      height: 80px;
      line-height: 80px;
      position: absolute;
      right: 24px;
    }
  }

  .orderEntry-header-cus {
    display: flex;
    align-items: center;

    width: 100%;
    height: 80px;
    background: #fff;
    padding-left: 27px;
    padding-right: 25px;
    color: #333;
    margin-top: 20px;
  }
</style>
