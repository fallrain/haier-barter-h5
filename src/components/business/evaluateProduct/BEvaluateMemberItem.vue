<template>
  <div v-if="currentUserList.length !== 0" class="member-style">
    <li class="songs-item-li" v-for="(item,index) in currentUserList" :key="index">
      <div class="bEvaluateProductItem-cnt-person mb22">
        <div class="name-style">{{item.userName}}</div>
        <a href="tel:18510778318" class="go-phone">
          <div class="num-style">{{item.userPhone}}</div>
          <div class="phone-style">
            <i class="iconfont icon-dianhua mr16"></i>
            拨打电话
          </div>
        </a>
      </div>
      <div class="bEvaluateProductItem-cnt-price mb22">
        <span class="name">{{item.industryName}}</span>
        <span class="price">￥{{item.totalPrice}}</span>
      </div>
      <div class="bEvaluateProductItem-cnt-time">
        <!-- <i class="iconfont icon-shizhong"></i> -->
        {{item.crTime}}
      </div>
      <div class="container-style">
        <div class="goutjlClass">沟通记录</div>
        <div class="inputgtClass" @click="addRecord(item)">
          <!--<input type="text" class="" placeholder="请输入本次沟通记录">-->
          <span class="">请输入本次沟通记录</span>
        </div>
        <div class="cliclMore" @click="barCodeClick(item)">查看记录</div>
      </div>
    </li>
    <md-dialog
      :closable="false"
      v-model="basicDialog.open"
      :btns="basicDialog.btns"
    >
      <div class="dialog-title">
        为 &nbsp;{{currentItem.userName}}&nbsp;添加本次沟通记录
      </div>
      <textarea v-model="recordContent" placeholder="请输入本次沟通记录" class="dialog-area" name="" id="" rows="5"></textarea>
    </md-dialog>
  </div>
</template>
<script>
import {
  Dialog, Button, Toast
} from 'mand-mobile';

export default {
  name: 'BEvaluateMemberItem',
  components: {
    Toast,
    [Dialog.name]: Dialog,
    [Button.name]: Button,
  },
  data() {
    return {
      openId: '',
      currentUserList: [],
      currentItem: {},
      recordContent: '',
      basicDialog: {
        open: false,
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
    };
  },
  props: {
    // 订单数据
    userlist: {
      type: Array
    }
  },
  created() {
    this.openId = JSON.parse(localStorage.getItem('userinfo')).openId;
  },
  watch: {
    userlist(newV, oldV) {
      this.currentUserList = newV;
    }
  },
  methods: {
    onBasicCancel() {
      this.basicDialog.open = false;
    },
    onBasicConfirm() {
      if (this.recordContent === '') {
        Toast.failed('请输入沟通内容');
        return;
      }
      this.campaignService.addComRecordSave({
        // openId: '233',
        openId: this.openId,
        mobile: this.currentItem.userPhone,
        wxName: '啊啊',
        sourceId: this.currentItem.id,
        content: this.recordContent
      }).then((res) => {
        if (res.code === 1) {
          Toast.succeed('添加成功');
          this.basicDialog.open = false;
          this.recordContent = '';
        }
      });
    },
    addRecord(item) {
      this.currentItem = item;
      this.basicDialog.open = true;
    },
    barCodeClick(item) {
      debugger;
      /* 查看记录click */
      this.$router.push({
        name: 'EvaluateProductHistoryList.evaluateProductDetail',
        params: { memberInfo: item }
      });
    },
    toDetail(item) {
      wx.miniProgram.navigateTo({
        url: `/pages/message/valuationInfo/valuationInfo?odlfornewdbId=${item.id}`
      });
    },
  }
};
</script>

<style lang="scss">
  .dialog-title{
    font-size: 34px;
    text-align: center;
    font-weight: 600;
    color: #333;
    margin-bottom: 20px;
  }
  .md-dialog-body{
    padding: 20px;
  }
  .dialog-area{
    width: 100%;
    font-size: 30px;
    line-height: 40px;
    border:2px solid rgba(238,238,238,1);
    border-radius:20px;
    padding: 18px;
  }
  .songs-item-li{
    background: #fff;
    border-bottom: 1px solid #eee;
    padding: 24px;
    .bEvaluateProductItem-cnt-person{
      line-height: 50px;
      display: flex;
      .name-style{
        width: 110px;
        font-size: 36px;
        color: #333;
        font-weight: 600;

      }
      .go-phone{
        display: flex;
        justify-content: space-between;
        flex-grow: 1;
        .num-style{
          color: #333333;
        }
        .phone-style{
          .iconfont{
            font-size: 32px;
          }
          color: #1969C6;
        }
      }
    }
    .bEvaluateProductItem-cnt-price{
      color: #1969C6;
      .name{
        padding-right: 20px;
      }
    }
    .bEvaluateProductItem-cnt-time{
      margin-bottom: 20px;
    }
    .container-style {
      display: flex;
      line-height: 60px;
      .goutjlClass{
        font-size: 24px;
      }
      .inputgtClass{
        flex-grow: 1;
        padding: 0 34px;
        span{
          display: inline-block;
          font-size: 24px;
          color: #666;
          width: 100%;
          height: 60px;
          line-height: 60px;
          padding: 0px 25px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }
      }
      .cliclMore {
        color: #1969c6;
      }
    }
  }
.bEvaluateProductItem {
  display: flex;
  align-items: center;
  padding-top: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #d9d9d9;
  word-break: break-all;
}


.bEvaluateProductItem-btn-par {
  margin-left: auto;
  text-align: right;
}

.bEvaluateProductItem-tips {
  font-size: 20px;
  color: #29ab91;
}
</style>
