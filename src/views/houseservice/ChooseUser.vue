<template xmlns:v-slot="">
  <div>
    <div class="search-view">
      <form action="" @submit.prevent="()=>{return false}">
        <input
          class="input-class"
          confirm-type="search"
          placeholder="请输入姓名、电话"
          placeholder-style="font-size: 28px;color: #BBBBBB;margin-left: 10px;"
          v-model="searchWord"
          type="search"
          @keyup.enter="queryCostumerList"
        />
        <img
          src="@/assets/images/orderFollow-up/search@3x.png"
          class="search-image"
          @click="queryCostumerList"
        >
      </form>
    </div>
    <div class="list-view">
      <div class="list-item" @click="addServicePlan(item)" v-for="(item, index) in list" :key="index">
        <div class="img-style">
          <img src="@/assets/images/houseServicer/head.png" alt="">
        </div>
        <div class="right-content">
          <div class="title clear of-h dis-flex">
            <div class="item-name">
              {{item.username}}
            </div>
            <div class="of-h clear taglist" :class="{'hide-height':!item.arrowtag}">
              <div class="tag" v-for="(itemtag, index) in item.tag" :key="index">{{itemtag}}</div>
              <div class="btn-arrow" v-show="item.arrowShow">
                <span class="icon iconfont icon-jiantou9" v-show="!item.arrowtag" @click.stop="change(item)"></span>
                <span class="icon iconfont icon-shangjiantou" v-show="item.arrowtag" @click.stop="change(item)"></span>
              </div>
            </div>
          </div>
          <div class="content">
<!--            <span class="keyword">用户价值:</span> <span class="value">{{item.userval}}</span>-->
            <span class="keyword">购买统计:</span>
            <span class="value">{{item.totalOrder}}次/{{item.totalQuantity}}个/￥{{item.totalAmount}}万</span>
          </div>
        </div>
      </div>
    </div>
<!--    <div class="footer">-->
<!--      <span>用户会员等级有问题?</span>-->
<!--      <button class="btn" type="button">点击查看解决方法</button>-->
<!--    </div>-->
    <md-dialog
      title="其他入户服务计划"
      :closable="false"
      v-model="slotDialog.open"
      :btns="slotDialog.btns"
    >
      <div class="dialog-banner" slot="header">
        <div class="other-item">王刚</div>
      </div>
    </md-dialog>
  </div>
</template>

<script>
import {
  Toast, Popup, PopupTitleBar, Button, Icon, Dialog
} from 'mand-mobile';

export default {
  name: 'HouseServiceEntry',
  components: {
    [Toast.name]: Toast,
    [Popup.name]: Popup,
    [PopupTitleBar.name]: PopupTitleBar,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Dialog.name]: Dialog,
  },
  data() {
    return {
      searchWord: '',
      // 用户列表
      list: [
      ],
      item: {},
      slotDialog: {
        open: false,
        btns: [
          {
            text: '取消',
            handler: () => {
              this.slotDialog.open = false;
            }
          },
          {
            text: '继续',
            handler: () => {
              // Toast.info('继续');
              this.slotDialog.open = false;
              const choosedInfo = {};
              choosedInfo.name = this.item.name;
              choosedInfo.tel = this.item.tel;
              choosedInfo.sex = this.item.sex;
              this.$router.push({
                name: 'Houseservice.AddServiceUser',
                params: { choosedInfo }
              });
            }
          },
        ],
      },
    };
  },
  computed: {},
  mounted() {

  },
  activated() {
    this.queryCostumerList();
  },
  created() {
  },
  methods: {
    queryCostumerList() {
      const data = {
        customer: this.searchWord,
        pageNo: 1,
        pageSize: 20,
        groupType: 0
      };
      // JSON.stringify(param)
      this.basicService.queryCustomerList(data, '').then((res) => {
        this.list = res.data.result;
        this.list.forEach((item, index) => {
          item.totalAmount = (item.totalAmount / 10000).toFixed(2);
          item.tag = [];
          if (item.sex) {
            item.tag.push(item.sex === 1 ? '男' : '女');
          }
        });
      });
    },
    change(item) {
      item.arrowtag = !item.arrowtag;
    },
    addServicePlan(item) {
      this.item = item;
      // this.slotDialog.open = true;
      this.$router.push({
        name: 'Houseservice.AddServiceUser',
        params: { choosedInfo: this.item }
      });
    }
  },

};
</script>
<style lang="scss">
  .search-view {
    position: relative;
    padding: 22px;
    .search-image{
      position: absolute;
      right: 46px;
      top: 36px;
      width: 35px;
      height: 35px;
    }
  }
  .input-class {
    width: 100%;
    background-color: white;
    border-radius: 30px;
    border: 0 !important;
    height: 60px;
    padding-left: 30px !important;
    color: #666666;
    font-size: 28px;
    padding-right: 50px !important;
  }
  .list-view {
    padding-bottom: 105px;
  }
  .list-item{
    display: flex;
    background: #fff;
    border-bottom: 1px solid #dbdbdb;
    padding: 20px;
    .img-style{
      width: 100px;
      height: 100px;
      border-radius: 50%;
      display:inline;
      img{
        /*width: 100%;*/
        height: 100%;
      }
    }
    .right-content{

    }
    .item-name{
      font-size: 30px;
      color: #2f2f2f;
      width: 120px;
      margin-right: 20px;
    }
    .taglist{
      padding-right: 30px;
      position: relative;
      .btn-arrow{
        position: absolute;
        right: 10px;
        top: 0px;
        color: #1969C6;
      }
    }
    .tag{
      float: left;
      font-size: 22px;
      color: #f1bd69;
      padding: 2px 10px;
      background: #fefaf1;
      margin-right: 14px;
      margin-bottom: 20px;
    }
    .content{
      font-size: 24px;
      color: #1969C6;
      .keyword{
        margin-right: 20px;
        color: #333;
      }
      .value{
        margin-right: 20px;
      }
    }
  }
  .footer{
    position: fixed;
    background: #DADADA;
    z-index: 100;
    bottom: 0px;
    left: 0px;
    height: 105px;
    width: 100%;
    padding-top: 22px;
    text-align: center;
    span{
      margin-right: 20px;
    }
  }
  .btn{
    font-size: 28px;
    background: #fff;
    padding: 11px 17px;
    color: #195cad;
    border:1px solid rgba(25,105,198,1);
    border-radius:26px;
  }
  .clear{
    clear:both;
  }
  .of-h{
    overflow: hidden;
  }
  .hide-height{
    height: 50px;
  }
</style>
