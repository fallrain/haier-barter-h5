<template>
  <div class="orderFollowItemClass">
    <!--    <div style="height: 82px;"></div>-->
    <div
      class="label-class"
      v-for="(followItem,index) in list"
      :key="index"
      @click="orderClick"
    >
      <img
        src="@/assets/images/orderFollow-up/yizhanzhujia@3x.png"
        class="labelImage"
        v-show="followItem.businessScenarios ==='YZZJ'"
      >
      <img
        src="@/assets/images/orderFollow-up/yijiuhuanxin@3x.png"
        class="labelImage"
        v-show="followItem.businessScenarios ==='YJHX'"
      >
      <img
        src="@/assets/images/orderFollow-up/aidaojia@3x.png"
        class="labelImage"
        v-show="followItem.businessScenarios ==='ADJ'"
      >
      <img
        src="@/assets/images/orderFollow-up/saomaludan.png"
        class="labelImage"
        v-show="followItem.businessScenarios ==='SMLD'"
      >
      <img
        src="@/assets/images/orderFollow-up/SGLD.png"
        class="labelImage"
        v-show="followItem.businessScenarios ==='SGLD'"
      >
      <img
        src="@/assets/images/orderFollow-up/renchou@3x.png"
        class="labelImage"
        v-show="followItem.businessScenarios ==='RC'"
      >
      <img
        src="@/assets/images/orderFollow-up/yyfw@2x.png"
        class="labelImage"
        v-show="followItem.businessScenarios ==='YYFW'"
      >
      <!--<p>{{followItem.orderNo}}</p>-->
      <div class="row-class">
        <span class="label-span">{{followItem.userName}}</span>
        <span
          class="sex-class"
          v-show="followItem.userSex === '1'"
        >先生</span>
        <span
          class="sex-class"
          v-show="followItem.userSex === '2'"
        >女士</span>
        <span class="sex-class">
          <img
            src="@/assets/images/orderFollow-up/tel@3x.png"
            class="telImage"
          >
        </span>
        <span class="sex-class-tel">
          <a
            :href="'tel:' + followItem.userMobile" class="telClass"
            @click="recordCall(followItem)"
          >{{followItem.userMobile}}</a></span>
      </div>
      <div class="row-class">
        <img
          src="@/assets/images/orderFollow-up/Haier@3x.png"
          class="brandImage"
          v-show="followItem.recordMode ==='Haier'"
        >
        <img
          src="@/assets/images/orderFollow-up/Casarte@3x.png"
          class="brandImage"
          v-show="followItem.recordMode ==='Casarte'"
        >
        <span class="hand-class">{{followItem.userS}}</span>
        <span class="handred-class">{{followItem.tardinessS}}</span>
        <span class="handgray-class">{{followItem.flowS}}</span>
      </div>
      <div class="row-class bOrderFollowItem-row-time">
        <img
          src="@/assets/images/orderFollow-up/time@3x.png"
          class="timeImage"
        >
        <span class="time-label">{{followItem.updatedTime}}</span>
        <div class="bOrderFollowItem-row-time-right">
          <span
            v-show="followItem.flowStatus === 4 || followItem.flowStatus === 5 || followItem.businessScenarios === 'YYFW' || followItem.businessScenarios === 'ADJ'"
            @click="detailHide(index,followItem)"
            class="information-class bOrderFollowItem-textBtn"
          >
            <span class="information-class">详细信息 </span>
          </span>
          <span
            v-show="followItem.businessScenarios === 'YJHX'"
            @click="gujiaClick(followItem)"
            class="information-class-de bOrderFollowItem-textBtn"
          >估价详情
          </span>
          <span
            v-show="followItem.flowStatus === 1"
            @click="itemClick(followItem)"
            class="information-class-de bOrderFollowItem-textBtn"
          >查看详情
            <!--<img-->
            <!--src="@/assets/images/orderFollow-up/xialablue@3x.png"-->
            <!--class="information-xiala"-->

            <!--v-show="!followItem.detailShow"-->
            <!--&gt;-->
            <!--<img-->
            <!--src="@/assets/images/orderFollow-up/shangla@3x.png"-->
            <!--class="information-xiala"-->
            <!--v-show="followItem.detailShow"-->
            <!--&gt;-->
          </span>
        </div>
      </div>
      <!--<div-->
      <!--v-show="followItem.detailShow && followItem.showDetail"-->
      <!--v-for="(item,index) in followItem.productList"-->
      <!--:key="index"-->
      <!--&gt;-->
      <!--<p>-->
      <!--<span class="orderFollowItem-span">{{item.productBrandCN}}/{{item.productCategoryName}}，{{item.productModel}}</span>-->
      <!--<span class="orderFollowItem-span-blue">￥{{item.bccPrice}}</span>-->
      <!--</p>-->
      <!--</div>-->

      <!--爱获客、预约服务且订单正常下的详细信息-->
      <div
        v-if="
          (followItem.businessScenarios === 'YYFW' || followItem.businessScenarios === 'ADJ')
          && (followItem.flowStatus !== 4 && followItem.flowStatus !== 5)
        "
        class="information-p"
        v-show="followItem.detailShow"
      >
        <p>
          <strong>报名编号：</strong>{{followItem.sourceSn}}
        </p>
        <p
          v-if="followItem.add1"
        >
          <strong> 活动名称：</strong>{{followItem.add1}}
        </p>
        <p
          v-if="followItem.add2"
        >
          <strong>预约服务名称：</strong>{{followItem.add2}}
        </p>
        <p
          v-if="followItem.add3"
        >
          <strong>用户地址：</strong>{{followItem.add3}}
        </p>
      </div>
      <!--其他类型（只有取消、异常状态才显示）详细信息-->
      <div
        v-else
        class="information-p"
        v-show="followItem.detailShow"
      >
        <p v-if="followItem.add1">{{followItem.add1}}</p>
        <p v-if="followItem.add2">{{followItem.add2}}</p>
        <p v-if="followItem.add3">{{followItem.add3}}</p>
      </div>
      <div class="bottom-class">
        <div
          class="dian-class-par"
          v-show="followItem.flowStatus !== 1"
          @click="(e)=>showMore(index,e)"
        >
          <img
            src="@/assets/images/orderFollow-up/dian@3x.png"
            class="dian-class"
          >
        </div>
        <!--估价不显示录单操作-->
        <!--<span v-if="followItem.businessScenarios !== 'YJHX' && followItem.businessScenarios !== 'ADJ'">-->
        <span v-if="followItem.businessScenarios !== 'ADJ'">
          <p
            class="bottom-button"
            v-for="(button,index) in followItem.buttonList"
            :key="index"
            @click="followButtonClick(button,followItem)"
          >{{button.name}}
          </p>
        </span>

        <!-- <p class="bottom-button">发券</p> -->
        <div
          class="more-pop"
          :class="[followItem.showInTop && 'more-pop-reverse']"
          ref="more-pop"
          v-show="followItem.show"
        >
          <div class="more-pop-out"></div>
          <div class="more-pop-in"></div>
          <p
            v-for="(item,index) in followItem.showList"
            :key="index"
            @click="updateOrderType(item.id,followItem)"
            class="show-p"
          >{{item.name}}</p>
        </div>

      </div>
    </div>

    <md-popup
      v-model="popShow"
      position="center"
    >

      <div class="popInput">
        <p class="pop-p">暂不跟进原因</p>
        <input
          class="input-class"
          placeholder="请输入"
          placeholder-style="font-size: 28px;color: #BBBBBB;margin-left: 10px;"
          v-model="remark"
        />
        <p class="pop-con" @click="confirmRemark">确认</p>
      </div>

    </md-popup>


  </div>
</template>


<script>
import {
  Button,
  Icon,
  Popup,
  PopupTitleBar,
  Toast
} from 'mand-mobile';

export default {
  name: 'BOrderFollowItem',
  components: {
    [Icon.name]: Icon,
    [Toast.name]: Toast,
    'md-popup': Popup,
    [PopupTitleBar.name]: PopupTitleBar,
    [Button.name]: Button,

  },
  props: {
    // followItem: {
    //   type: Object,
    //   require: true
    // },
    list: {
      type: Array,
      require: true
    }
    // handleList:{
    //   type: Array,
    //   require: true
    // }
  },
  data() {
    return {
      popShow: false,
      remark: '',
      buttonList: [],
      pageNum: 1,
      dataList: [],
      scenarioType: '',
      show: false,
      showList: [],
      ID: '',
      currentList: this.list
    };
  },
  created() {
    console.log(this.currentList);
  },
  methods: {
    hidePopUp() {
      this.popShow = false;
    },
    confirmRemark() {
      if (this.remark === '') {
        Toast.info('请输入暂不跟进原因');
        this.popShow = true;
        return;
      }
      const type = '3';
      this.orderService
        .updateOrderFollowByType(
          {},
          {
            orderFollowId: this.ID,
            type,
            remark: this.remark
          }
        )
        .then((res) => {
          if (res.code === 1) {
            this.remark = '';
            console.log('this.list', this.list);
            Toast.succeed('状态更新成功');
            this.popShow = false;
            this.$emit('updateOrderType', type);
          }
        });
    },
    itemClick(followItem) {
      this.stopProcess();
      this.$emit('itemClick', followItem);
    },
    orderClick() {
      /* 隐藏弹出层 */
      this.list.forEach((v) => {
        this.$set(v, 'showInTop', false);
        this.$set(v, 'show', false);
      });
    },
    gujiaClick(followItem) {
      this.stopProcess();
      this.$emit('gujiaClick', followItem);
    },
    followButtonClick(button, item) {
      console.log(item);
      const orderMode = JSON.parse(localStorage.getItem('userinfo')).orderMode;
      if (orderMode === 'Casarte') {
        if (item.businessScenarios === 'SGLD') {
          Toast.failed('卡萨帝模式，不支持手工录单');
          return;
        }
      }
      this.stopProcess();

      this.$emit('followButtonClick', button, item);
    },
    showMore(index, e) {
      this.stopProcess();
      this.ID = this.list[index].id;
      for (let i = 0; i < this.list.length; i++) {
        if (index !== i) {
          this.$set(this.list[i], 'show', false);
        }
      }
      const isShow = this.list[index].show;
      let isOverflow = false;
      if (!isShow) {
        const target = e.currentTarget;
        const morePop = target.parentNode.querySelector('.more-pop');
        // 是否溢出显示区域
        isOverflow = this.bUtil.checkOverflowScreen({
          dom: morePop,
          btmDom: document.querySelector('.js-md-tab-bar')
        });
      }

      // 显示的时候才会设置showInTop，隐藏依然没有，防止计算屏幕溢出错误
      this.$set(this.list[index], 'showInTop', isOverflow && !isShow);
      this.$set(this.list[index], 'show', !isShow);
    },
    stopProcess() {
      const e = window.event;
      if (e.stopPropagation) {
        e.stopPropagation();
        // 阻止事件 冒泡传播
      } else {
        e.cancelBubble = true; // ie兼容
      }
    },
    detailHide(index, item) {
      this.stopProcess();
      this.$set(this.list[index], 'detailShow', !this.list[index].detailShow);
      if (this.list[index].detailShow) {
        this.$emit('searchProduct', item);
      }
    },
    updateOrderType(type, item) {
      this.stopProcess();
      for (let i = 0; i < this.list.length; i++) {
        this.$set(this.list[i], 'show', false);
      }
      if (type === '20') {
        this.$emit('userService', item);

        return;
      }
      if (type === '21') {
        this.$emit('maybeBuyer', item);
        return;
      }

      if (type === '10') {
        this.$emit('againEntry', item);
        return;
      }
      if (type === '11') {
        this.$emit('cancleOrder', item);
        return;
      }
      if (type === '3') {
        this.popShow = true;
        return;
      }
      this.orderService
        .updateOrderFollowByType(
          {},
          {
            orderFollowId: this.ID,
            type,
            remark: this.remark
          }
        )
        .then((res) => {
          if (res.code === 1) {
            this.remark = '';
            console.log('this.list', this.list);
            this.$emit('updateOrderType', type);
          }
        });
    },
    recordCall(item) {
      /* 记录以旧换新打电话 */
      const {
        businessScenarios,
        sourceSn: id
      } = item;
      // 现在只统计以旧换新
      if (businessScenarios === 'YJHX') {
        this.campaignService.recordFrequency({
          id,
          type: 1
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
  .orderFollowButton {
    padding-left: 24px;
    padding-right: 24px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #1969c6;
    border: 1px #1969c6 solid;
    font-size: 28px;
    width: 180px;
    border-radius: 30px;
    position: absolute;
    right: 20px;
    top: 10px;
  }

  .orderFollowButtonRow {
    padding-left: 24px;
    padding-right: 24px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #666666;
    border: 1px #cccccc solid;
    font-size: 24px;
    // width: 180px;
    border-radius: 30px;
    float: left;
    margin-top: 10px;
    margin-left: 24px;
  }

  .bottom-button {
    padding-left: 24px;
    padding-right: 24px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #1969c6;
    border: 1px #1969c6 solid;
    font-size: 24px;
    // width: 180px;
    border-radius: 30px;
    float: right;
    margin-top: 5px;
    margin-left: 10px;
  }

  .xialaimage {
    width: 36px;
    height: 36px;
    margin-top: 20px;
    position: absolute;
    margin-left: 14px;
  }

  .brandImage {
    height: 36px;
    width: 90px;
  }

  .telImage {
    height: 32px;
    width: 32px;
    margin-left: 10px;
    padding-bottom: 2px;
    top: 0;
  }

  .labelImage {
    height: 72px;
    width: 56px;
    float: right;
    right: 24px;
  }

  .timeImage {
    width: 32px;
    height: 32px;
    position: absolute;
    margin-top: 5px;
  }

  .time-label {
    color: #bbbbbb;
    font-size: 28px;
    margin-left: 40px;
    display: inline-block;
    width: 300px;
  }

  .label-class {
    margin-top: 16px;
    // height: 290px;
    background-color: white;
    padding: 24px;
  }

  .label-span {
    // display: inline;
    color: #333333;
    font-size: 36px;
  }

  .sex-class {
    color: #999999;
    font-size: 28px;
    margin-left: 10px;
  }

  .sex-class-tel {
    color: #999999;
    font-size: 28px;
    margin-left: 10px;

    a {
      color: #999999;
    }
  }

  .hand-class {
    color: #f5a623;
    font-size: 24px;
    margin-left: 16px;
  }

  .handred-class {
    color: #ff001f;
    font-size: 24px;
    margin-left: 16px;
  }

  .handgray-class {
    color: #cccccc;
    font-size: 24px;
    margin-left: 16px;
  }

  .information-class {
    // margin-left: 200px;
  }

  .information-class-de {
    // margin-left: 230px;
  }

  .bOrderFollowItem-textBtn {
    font-size: 28px;
    color: #1969c6;
    white-space: nowrap;
  }

  .label-class {
    position: relative;
  }

  .information-xiala {
    width: 36px;
    height: 36px;
    margin-top: 5px;
    position: absolute;
    margin-left: 14px;
  }

  .information-p {
    color: #666666;
    font-size: 28px;
    margin-top: 10px;
    // line-height: 40px;
    p {
      line-height: 50px;
    }
  }

  .bottom-class {
    position: relative;
    margin-top: 20px;
    padding-top: 15px;
    height: 80px;
    border-top: 1px solid #eeeeee;
  }

  .dian-class-par {
    position: relative;
    display: inline-block;
    width: 36px;
    height: 100%;
  }

  .dian-class {
    position: absolute;
    top: 50%;
    height: 6px;
    transform: translateY(-50%);
  }

  .orderFollowItemClass {
    background-color: #f5f5f5;
  }

  .app-container {
    background-color: red !important;
  }

  .md-example-child-tab-bar-4 {
    position: fixed;
    bottom: 0;
    width: 750px;
    z-index: 10;
    background-color: red;

    .custom-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      // flex: 1;
    }

    .text {
      font-size: 20px;
    }

    .md-tab-bar-inner {
      width: 750px !important;
    }

    .md-tab-bar {
      padding: 0 !important;
    }
  }

  .row-class {
    margin-bottom: 10px;
  }

  .bOrderFollowItem-row-time {
    display: flex;
    flex-wrap: wrap;
  }

  .bOrderFollowItem-row-time-right {
    margin-left: auto;
  }

  .show-class {
    // position: absolute;
    // height: 140px;
    // width: 240px;
    // background-color: white;
    // z-index: 10;
  }

  .show-p {
    color: #666666;
    font-size: 28px;
    text-align: center;
    height: 80px;
    line-height: 80px;
    border-bottom: 1px solid #999999;

    &:last-of-type {
      border-bottom: 0;
    }
  }

  .more-pop {
    width: 200px;
    /*height: 200px;*/
    border: 1px solid #999999;
    background-color: white;
    position: absolute;
    top: 80px;
    z-index: 10;
    border-radius: 10px;
  }

  .more-pop-reverse {
    top: 30px;
    transform: translateY(-100%);
  }

  .more-pop-reverse {
    .more-pop-out {
      border-bottom-color: transparent;
      border-top-color: #999;
      top: auto;
      bottom: -39px;
    }

    .more-pop-in {
      border-bottom-color: transparent;
      border-top-color: #fff;
      top: auto;
      bottom: -34px;
    }
  }

  .more-pop-out,
  .more-pop-in {
    position: absolute;
    width: 0;
    height: 0;
  }

  .more-pop-out {
    border: 20px solid transparent;
    border-bottom-color: #999; /*这里的颜色一定要跟上面more-pop边框颜色一样*/
    top: -39px;
    left: 10px;
  }

  .more-pop-in {
    border: 18px solid transparent;
    border-bottom-color: #fff; /*这里的颜色一定要跟more-pop背景颜色一样*/
    top: -34px;
    left: 12px
  }

  .orderFollowItem-span-blue {
    color: #1969c6;
    font-size: 28px;
    float: right;
  }

  .orderFollowItem-span {
    color: #666666;
    font-size: 28px;
  }

  .telClass {
    z-index: 100;
  }

  .popInput {
    width: 600px;
    height: 300px;
    background-color: white;
    text-align: center;

    .pop-con {
      margin-top: 30px;
      text-align: center;
      color: white;
      width: 200px;
      padding: 20px;
      background-color: #1969C6;
      border-radius: 20px;
      margin-left: 200px;
    }
  }

  .pop-p {
    text-align: center;
    padding: 20px;
    width: 100%;
    color: #333333;
  }

  .input-class {
    width: 550px;
    background-color: white;
    border-radius: 20px;
    /*border: 1px !important;*/
    /*border-color: #6d6dfe;*/
    height: 60px;
    margin-left: 24px;
    margin-top: 14px;
    padding-left: 30px !important;
    color: #666666;
    font-size: 28px;
    padding-right: 50px !important;
  }


</style>
