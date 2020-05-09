<template>
  <div class="houseServiceItemClass">
    <div id="myPlan">
      <div class="searchInputClass">
        <input
          class="input-class"
          confirm-type="search"
          placeholder="请输入姓名、电话"
          placeholder-style="font-size: 28px;color: #BBBBBB;margin-left: 10px;"
          v-model="searchWord"
          type="search"
          @keyup.enter="fuzzySearch"
        />
        <img
          src="@/assets/images/orderFollow-up/search@3x.png"
          class="search-image"
          @click="fuzzySearch"
        />
      </div>

      <div class="panel-body" v-for="(item,index) in list" :key="index">
        <div class="rows mb20">
          <span class="info">
            <span class="key-color">购机后入户服务用户:</span>
            <span class="value-color">{{item.userName}}</span>
          </span>
          <span class="deal">
            <span class="text-warning" v-show="item.applianceFlag == 2">已邀请</span>
            <span class="text-warning" v-show="item.applianceFlag == 1">已评价</span>
            <span
              class="text-warning"
              v-show="item.applianceFlag == 0"
              @click="yaoqClick(item)"
            >邀请评价</span>
          </span>
        </div>
        <div class="mb20">
          <span>
            <span class="key-color">上门服务时间:</span>
            <span class="value-color">{{item.serviceTime}}</span>
          </span>
        </div>
        <div class="mb20">
          <span class="key-color">随行参与人:</span>
          <span class="value-color">{{item.accompanyingName}}</span>
        </div>
        <div class="mb20">
          <span class="key-color">服务地址:</span>
          <span class="value-color">{{item.serviceAddress}}</span>
        </div>
        <!-- <div class="mb20 rows">
          <div>
            <span class="key-color left">购机型号:</span>
            <ul class="type-list left" :class="{'hide-height':!item.arrowtag}">
              <li v-for="(item1, index1) in item.dealProducts" :key="index1">{{item1}}</li>
            </ul>
          </div>
          <div>
            <span class="icon iconfont icon-jiantou9" v-show="!item.arrowtag" @click="change(item)"></span>
            <span class="icon iconfont icon-shangjiantou" v-show="item.arrowtag" @click="change(item)"></span>
          </div>
        </div>-->
        <div class="bottomClass">
          <div class="shareClass" v-show="item.storyFlag === 1" @click="shareAction">
            <img src="@/assets/images/houseServicer/shareIcon.png" />
            分享
          </div>
          <div class="btn-groups">
            <button type="button" @click="dealOrder(item)">成交录单</button>
            <button type="button" v-show="item.storyFlag === 0" @click="storyNew(item)">生成服务故事</button>
            <button type="button" v-show="item.storyFlag === 1" @click="storyDetail(item)">修改服务故事</button>
            <!-- <button
            type="button"
            v-show="item.applianceFlag === 0 || item.appraiseFlag === 0
                  || item.familyFlag === 0 || item.storyFlag === 0"
            @click="completeUserInfo(item)"
            >完善资料</button>-->
          </div>
        </div>
      </div>
    </div>
    <!-- 底部菜单 -->
    <div :class="{'CustomPopup':showCustomPopup}" @click="maskClick"></div>
    <div class="CustomPopupContent" :class="{'CustomPopupContentShow':showCustomPopup}">
       <div class="shareIconItem" >
          <img  src="@/assets/images/houseServicer/ruhgsIcon.png" />
           入户故事
        </div>
         <div class="shareIconItem">
          <img src="@/assets/images/houseServicer/bendiIcon.png" />
          保存到本地
        </div>
    </div>
  </div>
</template>


<script>
import { Icon, Toast, Popup, PopupTitleBar, Button, Dialog } from "mand-mobile";
import { BPopSortType, BPopButton } from "@/components/form";

export default {
  name: "",
  components: {
    [Icon.name]: Icon,
    [Toast.name]: Toast,
    BPopButton,
    BPopSortType,
    "md-popup": Popup,
    [PopupTitleBar.name]: PopupTitleBar,
    [Button.name]: Button,
    [Dialog.name]: Dialog
  },
  props: {
    list: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      searchWord: "",
      showCustomPopup: false
    };
  },
  created() {},
  methods: {
   
    maskClick() {
      this.showCustomPopup = false;
    },
    //分享
    shareAction() {
      //分享
      this.showCustomPopup = true;
    },
    // 搜索
    fuzzySearch() {
      this.$emit("fuzzySearchFather", this.searchWord);
    },
    // 邀请评价
    yaoqClick(item) {
      Dialog.confirm({
        title: "确认",
        content: "确定要推送邀请评价信息吗？",
        confirmText: "确定",
        onConfirm: () => {
          this.houseService
            .sendWeiXinMsg({
              userId: item.userId,
              userName: item.userName,
              planDateTime: item.serviceTime,
              planId: item.id,
              servicerName: item.servicerName
            })
            // eslint-disable-next-line arrow-parens
            .then(res => {
              if (res.code === 1) {
                Toast.succeed("邀请评价成功，请用户评价！");
              }
            });
        }
      });
    },
    change(item) {
      item.arrowtag = !item.arrowtag;
    },
    completeUserInfo(item) {
      // 完善用户资料
      this.$emit("completeUserInfo", item);
    },
    dealOrder(item) {
      // 成交录单
      console.log(item);
      this.orderService
        .createFollowByRHFW({
          hmcId: item.servicerId,
          userId: item.userId,
          userName: item.userName,
          userMobile: item.userPhone,
          recordMode: "Haier",
          sourceSn: item.id
        })
        .then(res => {
          if (res.code === 1) {
            const orderFollowId = res.data.id;
            this.orderService.checkCreateOrder().then(res1 => {
              // 判断店铺是否冻结
              if (res1.code != -1) {
                const freezeMsg = res1.data;
                this.$router.push({
                  name: "Order.OrderEntry",
                  params: {
                    customerConsigneeInfo: {
                      username: item.userName,
                      mobile: item.userPhone,
                      userId: item.userId,
                      recordMode: "Haier",
                      // businessScenarios: info.businessScenarios,
                      sourceSn: item.id,
                      smld: true,
                      id: orderFollowId,
                      freezeMsg
                      // oldForNew
                    },
                    region: "new"
                  }
                });
              }
            });
          }
        });
    },
    storyDetail(item) {
      this.$router.push({
        name: "Houseservice.CompleteServiceStory",
        query: { planId: item.id }
      });
    },
    storyNew(item) {
      this.$router.push({
        name: "Houseservice.CompleteServiceStory",
        query: { planId: item.id }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.houseServiceItemClass {
  padding: 25px;
  font-size: 28px;
}
.panel-body {
  background: #fff;
  padding: 24px;
  border-radius: 4px;
  margin-bottom: 16px;
}
.btn-groups {
  position: absolute;
  right: -10px;  
button {
    font-size: 24px;
    margin-right: 25px;
    border-radius: 3.333vw;
    background: #fff;
    padding: 0 1.5vw;
    line-height: 6vw;
    border: 1px solid #195cad;
    color: #195cad;
  }
}
#otherPlan .title {
  color: #353535;
  font-size: 3.733vw;
  width: 100%;
  line-height: 72px;
  margin-bottom: 20px;
  border-bottom: 1px solid #d2d2d2;
}
.key-color {
  color: #8a8a8a;
  margin-right: 20px;
}
.value-color {
  color: #353535;
}
.rows {
  display: flex;
  justify-content: space-between;
}
.mb20 {
  margin-bottom: 20px;
}
.pt2 {
  padding-top: 2px;
}
.iconfont {
  font-size: 28px;
  color: #2f77cb;
}
.header {
  color: #333;
  margin-bottom: 24px;
  .date {
    color: #2f77cb;
  }
}
.md-example-section {
  display: flex;
  justify-content: space-between;
  button {
    width: 48%;
    height: 80px;
  }
}
.text-warning {
  color: #333333;
  font-size: 28px;
}
.text-primary {
  color: #1969c6;
}
.text-success {
  color: #29ab91;
}
.type-list {
  width: 400px;
  overflow: hidden;
  height: 100%;
  color: #999;
  transition: all 0.3s ease-in;
  li {
    margin-bottom: 10px;
  }
}
.hide-height {
  height: 38px;
}
.mr22 {
  margin-right: 22px;
}
.mb15 {
  margin-bottom: 15px;
}
.mn {
  margin: 0px !important;
}
.ptn {
  padding-top: 0px !important;
}
.searchInputClass {
  position: relative;
}
.input-class {
  width: 100%;
  background-color: white;
  border-radius: 30px;
  border: 1px solid #bbbbbb;
  border: 0 !important;
  height: 60px;
  // margin-left: 24px;
  // margin-top: 14px;
  // padding-left: 30px !important;
  // color: #666666;
  font-size: 28px;
  margin-bottom: 20px;
  // padding-right: 50px !important;
  padding-left: 25px;
}
.search-image {
  width: 32px;
  height: 32px;
  position: absolute;
  right: 40px;
  top: 15px;
}
.bottomClass {
  position: relative;
  display: flex;
  justify-content: space-between;
  height: 40px;
}
.shareClass {
  display: flex;
  align-items: center;
  color: #195cad;
  font-size: 24px;
}
.shareClass img {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
.CustomPopup {
        height: 100%;
        position: fixed;
        z-index: 1000;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
    }

    .CustomPopupContent {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        transition: all 0.3s ease;
        transform: translateY(100%);
        z-index: 3000;
          display: flex;
        justify-content: space-around;
    }

    .CustomPopupContentShow {
        transform: translateY(0);
        background: #fff;
        height: 200px;
        display: flex;
        justify-content: space-around;
    }
  .shareIconItem{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 24px;
  }
  .shareIconItem img{
    width: 80px;
    height: 80px;
    margin-bottom: 10px;
  }
</style>
