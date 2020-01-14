<template xmlns:v-slot="">
  <div>
<!--    头部用户基本信息-->
    <header>
      <img src="@/assets/images/houseServicer/head.png" alt="">
      <div class="right-content">
        <div class="user-info">
          <div>
            <span class="">{{this.customerInfo.userName}}</span>
<!--            <span v-show="this.usersex == 0">先生</span>-->
<!--            <span v-show="this.usersex == 1">小姐</span>-->
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
    <div class="content">
      <!--    入户服务总结-->
      <div class="panel">
        <div class="panel-title">
          <div class="fs30 text-333">入户服务总结</div>
          <div class="text-666">已完成<span class="text-primary">{{complete}}</span>项，未完成<span class="text-danger">{{uncomplete}}</span>项</div>
        </div>
        <div class="panel-body">
          <div class="body-item" :class="{'active': flagInfo.appraise_flag !== 0}" @click="changeState(0)">
            <img src="@/assets/images/houseServicer/completeInfor/icon1.png" alt="">
            <div class="content-center">
              <div class="title">1.邀请用户对本次服务做评价</div>
              <div class="words">用户的满意是我们前进的动力</div>
            </div>
            <span class="content-right lh60">邀请评价</span>
          </div>
          <div class="body-item" :class="{'active': flagInfo.family_flag != 0}" @click="changeState(1)">
            <img src="@/assets/images/houseServicer/completeInfor/icon2.png" alt="">
            <div class="content-center">
              <div class="title">2.完善用户小区及住宅信息</div>
              <div class="words">准确的用户信息将有助于后期产生复购</div>
            </div>
            <span class="content-right lh60">去完善</span>
          </div>
          <div class="body-item" :class="{'active': flagInfo.appliance_flag}" @click="changeState(2)">
            <img src="@/assets/images/houseServicer/completeInfor/icon3.png" alt="">
            <div class="content-center">
              <div class="title">3.完善用户已有家电信息</div>
              <div class="words">完善旧家电信息，创造购新机或以旧换新订单</div>
            </div>
            <span class="content-right lh60">去完善</span>
          </div>
          <div class="body-item" :class="{'active': flagInfo.story_flag}" @click="changeState(3)">
            <img src="@/assets/images/houseServicer/completeInfor/icon4.png" alt="">
            <div class="content-center">
              <div class="title">4.录入用户服务故事</div>
              <div class="words">一份生动的用户服务故事胜过10分钟的讲解</div>
            </div>
            <span class="content-right lh60">去完善</span>
          </div>
          <!--<div class="body-item mt16">
            <img src="@/assets/images/houseServicer/completeInfor/icon5.png" alt="">
            <div class="content-center">
              <div class="title lh60">引导用户代言/传播</div>
            </div>
            <span class="content-right lh60">去推广</span>
          </div>
          <div class="body-item">
            <img src="@/assets/images/houseServicer/completeInfor/icon6.png" alt="">
            <div class="content-center">
              <div class="title lh60">引导用户以旧换新/复购</div>
            </div>
            <span class="content-right lh60">估换新</span>
            <span class="content-right lh60">去换购</span>
          </div>-->
        </div>
      </div>
    </div>
<!--    温馨提示-->
    <div class="footer-tip">
      <p class="title text-333 lh36">温馨提示:</p>
      <p class="content-rows text-333 lh36">入户服务后，需要完善入户服务资料后可计入入户服务用户数，包括:</p>
      <p class="content-rows text-666 lh36">1.用户评价</p>
      <p class="content-rows text-666 lh36">2.完善更新用户信息(小区住宅、家庭及已有家电)</p>
      <p class="content-rows text-666 lh36">3.编写入户故事</p>
    </div>
  </div>
</template>

<script>
import {
  Toast, Popup, PopupTitleBar, Button, Icon
} from 'mand-mobile';
import {
  BActivityList,
  BDatePicker,
  BFieldset,
  BItem,
  BOrderProduct,
  BPop,
  BPopAddressList,
  BPopCheckList,
  BRadioItem,
} from '@/components/form';
import {
  BMultbuyCheck
} from '@/components/business';

export default {
  name: 'CompleteUserInfor',
  components: {
    [Toast.name]: Toast,
    BActivityList,
    BDatePicker,
    BFieldset,
    BItem,
    BMultbuyCheck,
    BOrderProduct,
    BPop,
    BPopAddressList,
    BPopCheckList,
    BRadioItem,
    [Popup.name]: Popup,
    [PopupTitleBar.name]: PopupTitleBar,
    [Button.name]: Button,
    [Icon.name]: Icon,
  },
  data() {
    return {
      uncomplete: 4,
      complete: 0,
      judge: {},
      judgeTabState: 1, // 完善信息，1代表完善小区及住宅信息 3代表完善已有家电信息
      deliveryTime: '',
      tagList: [],
      tag: [],
      accompanier: '',
      tagPopShow: false,
      tagPopShow1: false,
      flagInfo: {},
      customerInfo: {
      },
    };
  },
  computed: {
  },
  mounted() {
  },
  activated() {
    if (this.$route.query.completeInfo) { // 完善资料用户信息
      this.customerInfo = JSON.parse(this.$route.query.completeInfo).completeInfo;
    }
    this.queryDetail(this.customerInfo.id);
    this.queryFlagsById(this.customerInfo.id);
  },
  created() {
  },
  methods: {
    queryDetail(id) { // 根据ID查询入户计划详情
      const param = { id };
      this.houseService.queryDetailById(param).then((res) => {
        if (res.code === 1) {
          this.customerInfo = res.data;
        }
      });
    },
    queryFlagsById(id) {
      const param = { id };
      this.houseService.queryFlagsById(param).then((res) => {
        if (res.code === 1) {
          this.flagInfo = res.data;
          this.delTagCount();
        }
      });
    },
    changeState(index) {
      switch (index) {
        case 0: // 邀请评价
          if (this.flagInfo.appraise_flag === 1) {
            return;
          }
          this.houseService.sendWeiXinMsg({
            userId: this.customerInfo.userId,
            userName: this.customerInfo.userName,
            planDateTime: this.customerInfo.serviceTime,
            planId: this.customerInfo.id,
            servicerName: this.customerInfo.servicerName
          }).then((res) => {
            if (res.code === 1) {
              Toast.succeed('邀请评价成功，请用户评价！')
            }
          });
          /* let host = `${window.location.protocol}//${window.location.host}`;
          if (host.indexOf('localhost') > -1) {
            host = 'https://testdb.haier.net';
          }
          const url = `${host}/houseservice/serviceEvaluate?planId=${this.customerInfo.id}&userId=${this.customerInfo.userId}&userName=${this.customerInfo.userName}&servicerName=${this.customerInfo.servicerName}`;
          window.open(url); */
          break;
        case 1: // 完善小区住宅信息
          this.judgeTabState = 1;
          this.$router.push({
            name: 'Houseservice.CompleteFamilyInfor',
            query: {
              customerId: this.customerInfo.id,
              tabState: this.judgeTabState
            }
          });
          break;
        case 2:// 完善家电信息
          this.judgeTabState = 2;
          this.$router.push({
            name: 'Houseservice.CompleteFamilyInfor',
            query: {
              customerId: this.customerInfo.id,
              tabState: this.judgeTabState
            }
          });
          break;
        case 3:// 编写入户故事
          this.$router.push({
            name: 'Houseservice.CompleteServiceStory',
            query: { planId: this.customerInfo.id },
          });
          break;
        default:
          break;
      }
    },
    delTagCount() {
      debugger;
      this.complete = 0;
      this.uncomplete = 4;
      // 已评价
      if (this.flagInfo.appraise_flag === 1) {
        this.complete++;
        this.uncomplete--;
      }
      // 完善家庭信息
      if (this.flagInfo.family_flag === 1) {
        this.complete++;
        this.uncomplete--;
      }
      // 完善家电信息
      if (this.flagInfo.appliance_flag === 1) {
        this.complete++;
        this.uncomplete--;
      }
      // 完善服务故事信息
      if (this.flagInfo.story_flag === 1) {
        this.complete++;
        this.uncomplete--;
      }
    },
  },
  beforeRouteLeave(to, from, next) {
    next();// 必须要有这个，否则无法跳转
  },
};
</script>
<style lang="scss">
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
    .right-content{
      flex-grow: 1;
      padding: 4px 0 0 26px;
      .user-info{
        display: flex;
        justify-content: space-between;
        span:nth-child(1){
          font-size: 30px;
          color: #333;
          margin-right: 30px;
        }
        span:nth-child(2){
          font-size: 28px;
          color: #999999;
        }
        span:nth-child(3){
          font-size: 28px;
          color: #999999;
        }
        .mobile{
          height: 48px;
          line-height: 48px;
          background: #4A90E2;
          border-radius: 24px;
          padding: 0 24px 0 60px;
          color: #fff;
          position: relative;
          span{
            color: #fff;
            position: absolute;
            left: 20px;
            top: 3px;
          }
        }
      }
      .focus-tag{
        margin-top: 28px;
        .focused{
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
  }
  .content{
    padding: 16px 24px 0;
    .active{
      .title,.words{
        color: #DCDCDC !important;
      }
      .content-right{
        color: #DCDCDC !important;
        text-underline: none !important;
      }
    }
    .panel{
      .panel-title{
        background: #fff;
        height: 76px;
        line-height: 76px;
        padding: 0 25px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #F5F5F5;
      }
      .panel-body{
        .body-item{
          background: #fff;
          height: 100px;
          padding: 20px 24px 0 20px;
          display: flex;
          border-bottom: 1px solid #F5F5F5;
          img{
            width: 60px;
            height: 60px;
            margin-right: 20px;
          }
          .content-center{
            flex-grow:1;
            .title{
              font-size: 28px;
              color: #666;
            }
            .words{
              font-size: 24px;
              color: #999;
            }
          }
          .content-right{
            font-size: 28px;
            color: #1969C6;
            text-decoration:underline;
          }
        }
      }
    }
  }
  .footer-tip{
    margin-top: 30px;
    font-size: 24px;
    padding: 0 24px;
    .title{

    }
    .content-rows{
      text-indent:35px
    }
  }
  .br-b{
    border-bottom: 1px solid #f5f5f5;
  }
  .ml10{
    margin-left: 10px;
  }
  .mt16{
    margin-top: 16px;
  }
  .mbn{
    margin-bottom: 0!important;
  }
  .lh36{
    line-height: 36px;
  }
  .lh60{
    line-height: 60px;
  }
  .fs30{
    font-size: 30px;
  }
  .fs34{
    font-size: 34px;
  }
  .icon-color{
    color: #4A90E2;
  }
  .text-333{
    color: #333333;
  }
  .text-666{
    color: #666666;
  }
  .text-ccc{
    color: #CCCCCC;
  }
  .text-primary{
    color: #1969C6;
  }
  .text-danger{
    color: #FF0000;
  }
  .text-bold{
    font-weight: bold;
  }
</style>
