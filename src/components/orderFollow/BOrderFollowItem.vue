<template>
  <div class="orderFollowItemClass" >
    <div class="bar-v">
      <div
        class="bar-class"
        v-for="(item,index) in headList"
        :key="index"
      >
        <p
          class="order-span"
          v-bind:class="{active:item.isActive}"
          @click="headSwitch(index)"
        >{{item.name}}
        <i class="iconfont icon-jiantou9" v-show="!item.isActive"></i>
        <i class="iconfont2 icon-xialaactive-copy" v-show="item.isActive"></i>
        </p>
      </div>
    </div>
    <b-pop-sort-type
      :show.sync="sortShow"
      :list="sortList"
      @checkClick="checkClicked"
    >
    </b-pop-sort-type>
    <b-pop-button
      :show.sync="scenarioShow"
      :list="scenarioList"
      @popButtonClicked="buttonClicked"
    ></b-pop-button>
    <div style="height: 82px;"></div>
    <div
      class="label-class"
      v-for="(followItem,index) in list"
      :key="index"

    >
      <img
        src="@/assets/images/orderFollow-up/yizhanzhujia@3x.png"
        class="labelImage"
        v-show="followItem.businessScenarios =='YZZJ'"
      >
       <img
        src="@/assets/images/orderFollow-up/yijiuhuanxin@3x.png"
        class="labelImage"
        v-show="followItem.businessScenarios =='YJHX'"
      >
      <img
        src="@/assets/images/orderFollow-up/aidaojia@3x.png"
        class="labelImage"
        v-show="followItem.businessScenarios =='ADJ'"
      >
      <img
        src="@/assets/images/orderFollow-up/saomaludan.png"
        class="labelImage"
        v-show="followItem.businessScenarios =='SMLD'"
      >
      <img
        src="@/assets/images/orderFollow-up/SGLD.png"
        class="labelImage"
        v-show="followItem.businessScenarios =='SGLD'"
      >
      <img
        src="@/assets/images/orderFollow-up/renchou@3x.png"
        class="labelImage"
        v-show="followItem.businessScenarios =='RC'"
      >
      <div class="row-class">
        <span class="label-span">{{followItem.userName}}</span>
        <span
          class="sex-class"
          v-show="followItem.userSex == '1'"
        >先生</span>
        <span
          class="sex-class"
          v-show="followItem.userSex == '2'"
        >女士</span>
        <span class="sex-class">
          <img
            src="@/assets/images/orderFollow-up/tel@3x.png"
            class="telImage"
          >
        </span>
        <span class="sex-class-tel"> <a :href="'tel:' + followItem.userMobile" class="telClass" id="manual_bind_click_way">{{followItem.userMobile}}</a></span>
      </div>
      <div class="row-class">
        <img
          src="@/assets/images/orderFollow-up/Haier@3x.png"
          class="brandImage"
          v-show="followItem.recordMode =='Haier'"
        >
        <img
          src="@/assets/images/orderFollow-up/Casarte@3x.png"
          class="brandImage"
          v-show="followItem.recordMode =='Casarte'"
        >
        <span class="hand-class">{{followItem.userS}}</span>
        <span class="handred-class">{{followItem.tardinessS}}</span>
        <span class="handgray-class">{{followItem.flowS}}</span>
      </div>
      <div class="row-class">
        <img
          src="@/assets/images/orderFollow-up/time@3x.png"
          class="timeImage"
        >
        <span class="time-label">{{followItem.updatedTime}}</span>
        <span v-show="followItem.flowStatus !== 1 && followItem.flowStatus !== 0 && followItem.flowStatus !== 3&& followItem.flowStatus !== 2&& (followItem.add1 !=null || followItem.add2 !=null)" @click="detailHide(index,followItem)">
          <span class="information-class">详细信息</span>
          <img
            src="@/assets/images/orderFollow-up/xialablue@3x.png"
            class="information-xiala"

            v-show="!followItem.detailShow"
          >
           <img
             src="@/assets/images/orderFollow-up/shangla@3x.png"
             class="information-xiala"
             v-show="followItem.detailShow"
           >
          </span>
        <span v-show="followItem.flowStatus === 1"  @click="itemClick(index)">
          <span class="information-class-de">查看详情</span>
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
      <div
        class="information-p"
        v-show="followItem.detailShow"
      >
        <p>{{followItem.add1}}</p>
        <p>{{followItem.add2}}</p>
      </div>
      <div class="bottom-class">
        <img
          src="@/assets/images/orderFollow-up/dian@3x.png"
          class="dian-Class"
          @click="showMore(index)"
          v-show="followItem.flowStatus != '1'"
        >

        <p class="bottom-button" v-for="(button,index) in followItem.buttonList" @click="followButtonClick(button,followItem)">{{button.name}}</p>


        <!-- <p class="bottom-button">发券</p> -->
        <div
          class="demo"
          v-show="followItem.show"
        >
          <div class="out"></div>
          <div class="in"></div>
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
  Icon, Toast, Popup, PopupTitleBar, Button
} from 'mand-mobile';
import {
  BPopSortType, BPopButton
} from '@/components/form';

export default {
  name: '',
  components: {
    [Icon.name]: Icon,
    [Toast.name]: Toast,
    BPopButton,
    BPopSortType,
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
      sortShow: false,
      scenarioShow: false,
      buttonList: [],
      pageNum: 1,
      dataList: [],
      sortType: '1',
      scenarioType: '',
      show: false,
      showList: [],
      checkedsortId: '',
      checkedButtonId: '',
      ID: '',
      headList: [
        {
          name: '排序',
          isActive: false,
          icon: '@/assets/images/orderFollow-up/xiala@3x.png',
          activeIcon: '@/assets/images/orderFollow-up/shangla@3x.png'
        },
        {
          name: '业务场景',
          isActive: false,
          icon: '@/assets/images/orderFollow-up/xiala@3x.png',
          activeIcon: '@/assets/images/orderFollow-up/shangla@3x.png'
        },
        {
          name: '筛选',
          isActive: false,
          icon: '@/assets/images/orderFollow-up/shaixuan@3x.png',
          activeIcon: '@/assets/images/orderFollow-up/shaixuan@3x.png'
        }
      ],
      sortList: [
        {
          id: '1',
          name: '智能排序'
        },
        {
          id: '2',
          name: '按时间倒序'
        },
        {
          id: '3',
          name: '按品牌'
        },
        {
          id: '4',
          name: '按成交可能性'
        }
      ],
      scenarioList: [
        {
          id: '1',
          name: '以旧换新'
        },
        {
          id: '2',
          name: '一站筑家'
        },
        {
          id: '3',
          name: '认筹'
        },
        {
          id: '4',
          name: '爱到家'
        }
      ],
      preIndex: '',
      currentList: this.list
    };
  },
  created() {
    this.productService.commonTypeQuery('BUSINESS_SCENARIOS').then((res) => {
      if (res.code === 1) {
        this.scenarioList = res.data
        debugger
      }
    });
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
      const  type = '3'
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
            this.remark = ''
            console.log('this.list', this.list);
            Toast.succeed('状态更新成功');
            this.popShow = false;
            this.$emit('updateOrderType', type);
          }
        });
    },
    itemClick(index) {
      this.stopProcess();
      this.$emit('itemClick', index);
    },
    headSwitch(index) {
      if (index === this.preIndex) {
        this.headList[index].isActive = false;
        this.preIndex = '';
        this.sortShow = false;
        this.scenarioShow = false;
        return;
      }
      for (let i = 0; i < this.headList.length; i++) {
        if (i === index) {
          this.preIndex = index;
          this.headList[i].isActive = true;
        } else {
          this.headList[i].isActive = false;
        }
      }
      if (index === 0) {
        this.sortShow = true;
        this.scenarioShow = false;
      } else if (index === 1) {
        this.sortShow = false;
        this.scenarioShow = true;
      } else {
        this.sortShow = false;
        this.scenarioShow = false;
      }
    },
    preparation() {},
    checkClicked(val) {
      ;
      this.checkedsortId = val[0];
      for (let i = 0; i < this.headList.length; i++) {
        this.headList[i].isActive = false;
      }
      this.$emit('checkClick', this.checkedsortId);
    },


    buttonClicked(val) {
      debugger
      this.stopProcess();
      this.checkedButtonId = val[0];
      for (let i = 0; i < this.headList.length; i++) {
        this.headList[i].isActive = false;
      }
      this.$emit('popButtonClicked', val);
    },
    followButtonClick(button, item) {
      this.stopProcess();
      ;
      this.$emit('followButtonClick', button, item);
    },
    showMore(index) {
      this.stopProcess();
      console.log('currentList', this.list);
      this.ID = this.list[index].id;
      for (let i = 0; i < this.list.length; i++) {
        if (index !== i) {
          this.$set(this.list[i], 'show', false);
        }
      }
      this.$set(this.list[index], 'show', !this.list[index].show);
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
        this.popShow = true
        return
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
            this.remark = ''
            console.log('this.list', this.list);
            Toast.succeed(res.msg);
            this.$emit('updateOrderType', type);
          }
        });
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
.bar-class .order-span.active {
  color: #1969c6;
}
.order-span {
  display: inline-block;
  color: #666666;
  font-size: 28px;
  padding-left: 56px;
  line-height: 72px;
}
.order-span-blue {
  display: inline-block;
  color: #1969c6;
  font-size: 28px;
  padding-left: 56px;
  line-height: 72px;
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

.bar-class {
  height: 72px;
  width: 250px;
  float: left;
  position: relative;
  .iconfont{
    color: #666666
  }
  .iconfont2{
    color: #1969c6 ;
   font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  }

}

.bar-v {
  background-color: white;
  height: 72px;
  position: absolute;
  top: 90px;
  z-index: 15;
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
  color: #1969c6;
  font-size: 28px;
  margin-left: 200px;
}
.information-class-de{
  color: #1969c6;
  font-size: 28px;
  margin-left: 230px;
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
    height: 50px;
  }
}

.bottom-class {
  margin-top: 20px;
  padding-top: 15px;
  height: 80px;
  border-top: 1px solid #eeeeee;
}

.dian-Class {
  width: 36px;
  height: 6px;
  margin-top: 30px;
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
  white-space: 200px;
  border-bottom: 1px solid #999999;
}

.demo {
  width: 200px;
  /*height: 200px;*/
  border: 1px solid #999999;
  background-color: white;
  z-index: 10;
  position: absolute;
  margin-top: 10px;
  border-radius: 10px;
}
.out,
.in {
  position: absolute;
  width: 0;
  height: 0px;
}
.out {
  border: 20px solid transparent;
  border-bottom-color: #999999; /*这里的颜色一定要跟上面demo边框颜色一样*/
  top: -40px;
  left: 20%;
}
.in {
  border: 18px solid transparent;
  border-bottom-color: #fff; /*这里的颜色一定要跟demo背景颜色一样*/
  top: -35px;
  left: 21%;
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
  .telClass{
    z-index: 100;
  }

.popInput{
  width: 600px;
  height: 300px;
  background-color: white;
  text-align: center;
  .pop-con{
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
.pop-p{
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
