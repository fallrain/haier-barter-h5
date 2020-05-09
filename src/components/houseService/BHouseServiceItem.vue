<template>
  <div class="houseServiceItemClass">
    <div id="myPlan">
      <div class="rows header">
        <span class>我的入户计划</span>
        <!--        <span class="date">查看日历</span>-->
      </div>
      <div v-show="list.length == 0" class="panel-body text-center text-666">暂无数据...</div>
      <div class="panel-body" v-for="(item,index) in list" :key="index" @click="clickDetail(item)">
        <!--        自主创建-->
        <div v-if="item.flag == 0">
          <div class="rows mb20">
            <span class="info">
              <span class="key-color">购入户服务用户:</span>
              <span class="value-color">{{item.userName}}</span>
            </span>
            <span class="deal">
              <span class="text-warning">待入户服务</span>
            </span>
          </div>
          <div class="rows mb20">
            <span>
              <span class="key-color">计划上门服务时间:</span>
              <span class="value-color">{{item.serviceTime}}</span>
            </span>
            <span class="icon iconfont icon-shizhong pt2"></span>
          </div>
          <div class="mb20" v-show="item.accompanyingName !== ''">
            <span class="key-color">随行参与人:</span>
            <span class="value-color">{{item.accompanyingName}}</span>
          </div>
          <div class="rows mb20">
            <span>
              <span class="key-color">服务地址:</span>
              <span class="value-color">{{item.serviceAddress}}</span>
            </span>
            <span>
              <span class="icon iconfont icon-dingwei"></span>
            </span>
          </div>
          <!-- <div class="mb20 rows" v-show="item.dealproducts.length > 0">
            <div>
              <span class="key-color left">购机型号:</span>
              <ul class="type-list left" :class="{'hide-height':!item.arrowtag}">
                <li v-for="(i, index) in item.dealproducts" :key="index">{{i}}</li>
              </ul>
            </div>
            <div>
              <span
                class="icon iconfont icon-jiantou9"
                v-show="!item.arrowtag"
                @click="change(item)"
              ></span>
              <span
                class="icon iconfont icon-shangjiantou"
                v-show="item.arrowtag"
                @click="change(item)"
              ></span>
            </div>
          </div> -->
          <div class="btn-groups">
            <!-- <button type="button" @click.stop="successPlan(item)">完成入户</button>
            <button type="button" @click.stop="checkPlan(item)">查看订单</button>
            <button type="button" @click.stop="changePlan(item)">修改</button> -->
            <button type="button" @click.stop="deletePlan(item)" class="mn">删除</button>
          </div>
        </div>
        <!--        用户申请-->
        <div v-else>
          <div class="rows mb20">
            <span class="info">
              <span class="key-color">用户预约上门服务:</span>
              <span class="value-color">{{item.userName}}</span>
            </span>
            <span class="deal">
              <span class="text-primary">待完善计划</span>
            </span>
          </div>
          <div class="mb20">
            <span class="key-color">用户预约时间:</span>
            <span class="value-color">{{item.appointmentTime}}</span>
          </div>
          <div class="mb20">
            <span class="key-color">计划上门服务时间:</span>
            <span class="value-color">{{item.serviceTime}}</span>
          </div>
          <div class="mb20">
            <span class="key-color">来源:</span>
            <span class="value-color">{{item.source}}</span>
          </div>
          <div class="mb20">
            <span class="key-color">地址:</span>
            <span class="value-color">{{item.serviceAddress}}</span>
          </div>
          <div class="btn-groups">
            <button type="button">完善计划</button>
            <button type="button">修改</button>
            <button  type="button" class="mn">删除</button>
          </div>
        </div>
      </div>
      <div v-if="isMoreMyPlan" @click="clickMore" class="more-question">
        更多
        <md-icon name="arrow-down"></md-icon>
      </div>
    </div>
    <div id="otherPlan">
      <div class="rows header">
        <span class>本门店相同入户计划</span>
        <!--        <span class="date">展开详情</span>-->
      </div>
      <div v-show="otherlist.length == 0" class="panel-body text-center text-666">暂无数据...</div>
      <div class="panel-body ptn" v-for="(item,index) in otherlist" :key="index" >
        <div class="title">{{item.title}}</div>
        <div class="rows mb20">
          <span class="info">
            <span class="key-color">购入户服务用户:</span>
            <span class="value-color">{{item.userName}}</span>
          </span>
          <span class="deal">
            <span class="text-warning" v-show="item.status == 0">待入户服务</span>
            <span class="text-primary" v-show="item.status == 1">已入户服务</span>
            <span class="text-primary" v-show="item.status == 2">已完成</span>
          </span>
        </div>
        <div class="mb20">
          <span class="key-color">计划上门服务时间</span>
          <span class="value-color">{{item.serviceTime}}</span>
        </div>
        <div class="mb20" v-show="item.accompanyingName !== ''">
          <span class="key-color">随行参与人</span>
          <span class="value-color">{{item.accompanyingName}}</span>
        </div>
        <div class="mb20">
          <span class="key-color">服务地址</span>
          <span class="value-color">{{item.serviceAddress}}</span>
        </div>
        <!-- <div class="rows mb20" v-show="item.dealproducts.length > 0">
          <div>
            <span class="key-color left">购机型号:</span>
            <ul class="type-list left" :class="{'hide-height':!item.arrowtag}">
              <li v-for="(i, index) in item.dealproducts" :key="index">{{i}}</li>
            </ul>
          </div>
          <div>
            <span class="icon iconfont icon-jiantou9" v-show="!item.arrowtag" @click="change(item)"></span>
            <span
              class="icon iconfont icon-shangjiantou"
              v-show="item.arrowtag"
              @click="change(item)"
            ></span>
          </div>
        </div> -->
        <div class="btn-groups">
          <a :href="'tel:'+item.userPhone" class="tel-style">电话联系Ta</a>
        </div>
      </div>
    </div>
    <div class="footer">
      <template>
        <div class="md-example-child md-example-child-button md-example-child-button-3">
          <div class="md-example-section">
            <md-button type="primary" inline plain @click="addServiceUser()">创建新用户入户</md-button>
            <!--            <md-button type="primary" inline >查看优秀案例</md-button>-->
          </div>
        </div>
      </template>
    </div>
        <md-dialog
      title="确认"
      :closable="true"
      v-model="basicDialog.open"
      :btns="basicDialog.btns"
    >请确认是否要删除该入户计划？
    </md-dialog>
  </div>
</template>


<script>
import {
  Icon, Toast, PopupTitleBar, Button, Dialog
} from 'mand-mobile';

export default {
  name: '',
  components: {
    [Icon.name]: Icon,
    [Toast.name]: Toast,
    [PopupTitleBar.name]: PopupTitleBar,
    [Button.name]: Button,
    [Dialog.name]: Dialog
  },
  props: {
    // followItem: {
    //   type: Object,
    //   require: true
    // },
    otherlist: {
      type: Array,
      require: true
    },
    list: {
      type: Array,
      require: true
    },
    isMoreMyPlan: {
      type: Boolean,
      require: true
    }
  },
  data() {
    return {
      currentItem: {},
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
  created() {
    console.log(this.list);
  },
  methods: {
    onBasicConfirm() {
      const data = {};
      data.id = this.currentItem.id;
      this.houseService.deletePlanService(data, {}).then((res) => {
        console.log(res);
        if (res.code === 1) {
          Toast.succeed('删除计划成功');
          this.$emit('updatePlan');
        } else {
          Toast.succeed('删除计划失败');
        }
      });
      this.basicDialog.open = false;
    },
    onBasicCancel() {
      this.basicDialog.open = false;
    },
    // 跳转入户详情
    clickDetail(item) {
      this.$emit('clickDetail', item);
    },
    // 跳到用户选择
    addServiceUser() {
      // const query =
      this.$router.push({
        name: 'Houseservice.ChooseUser',
        params: { test: {}, tag: 'test' }
      });
    },
    clickMore() {
      // 查询更多
      this.$emit('morePlan');
    },
    change(item) {
      item.arrowtag = !item.arrowtag;
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
    // 删除计划
    deletePlan(item) {
      this.basicDialog.open = true;
      this.currentItem = item;
    },
    changePlan(item) {
      // 修改计划 changePlan
      this.$emit('changePlan', item);
    },
    checkPlan(item) {
      // 修改计划 changePlan
      this.$emit('checkPlan', item);
    },
    successPlan(item) {
      // 标注计划已入户
      item.status = 1;
      this.houseService.changePlanService(item, {}).then((res) => {
        if (res.code === 1) {
          this.$emit('updatePlan');
        }
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
  text-align: right;
  button {
    font-size: 24px;
    margin-right: 25px;
    border-radius: 3.333vw;
    background: #fff;
    padding: 0vw 1.5vw;
    line-height: 6vw;
    border: 1px solid #195cad;
    color: #195cad;
  }
  .tel-style {
    font-size: 24px;
    margin-right: 25px;
    border-radius: 3.333vw;
    background: #fff;
    padding: 0.7vw 1.5vw;
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
.more-question {
  text-align: center;
  line-height: 40px;
  font-size: 26px;
  margin-bottom: 16px;
  background: #fff;
  color: #2f77cb;
}
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  background: #fff;
  padding: 10px;
  width: 100%;
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
    width: 100%;
    height: 80px;
  }
}
.text-warning {
  color: #f5a623;
}
.text-primary {
  color: #1969c6;
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
.text-666 {
  color: #666;
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
.bg-white {
  background: #fff;
}
</style>
