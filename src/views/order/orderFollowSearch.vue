<template>
  <div class="page-class">
    <div
      class="notice-class"
      v-show="noticeShow"
    >
      <p class="notice-p">您有三笔超过24小时未处理的订单，请及时跟进</p>
      <img
        src="/static/img/orderFollow-up/close@3x.png"
        alt=""
        class="notice-image"
        @click="noticeClose"
      ></img>
    </div>
    <div class="uni-form-item uni-column search-view">
      <input
        class="input-class"
        confirm-type="search"
        placeholder="搜索用户姓名、电话或产品"
        placeholder-style="font-size: 28px;color: #BBBBBB;margin-left: 10px;"
      />
      <img
        src="/static/img/orderFollow-up/search@3x.png"
        class="search-image"
      ></img>
      <p class="orderFollowButton">手动录单</p>
    </div>
    <div class="bar-v">
      <div
        class="bar-class"
        @click="sort()"
      >
        <p class="order-span">智能排序</p>
        <img
          src="/static/img/orderFollow-up/xiala@3x.png"
          class="xialaimage"
        ></img>
      </div>
      <div
        class="bar-class"
        @click="businessScenario()"
      >
        <p class="order-span">业务场景</p>
        <img
          src="/static/img/orderFollow-up/xiala@3x.png"
          class="xialaimage"
        ></img>
      </div>
      <div class="bar-class">
        <p
          class="order-span"
          @click="preparation()"
        >筛选</p>
        <img
          src="/static/img/orderFollow-up/shaixuan@3x.png"
          class="xialaimage"
        ></img>
      </div>
    </div>
    <div
      class="masker"
      @click="maskerHidden()"
      v-show="maskShow"
    >
      <p
        v-for="(sort,index) in sortList"
        :key="index"
        class="sort-class"
        @click="sortClick()"
        v-show="sortShow"
      >{{sort.name}}</p>
      <div style="background-color:white;height: 50px;">
        <p
          class="orderFollowButtonRow"
          v-for="(scenario,index) in scenarioList"
          v-show="scenarioShow"
          @click="scenarioClick()"
        >{{scenario.name}}</p>
      </div>
    </div>
    <div>
      <div class="label-class">
        <div class="">
          <span class="label-span">张子强</span>
          <span class="sex-class">先生</span>
          <span class="sex-class">15678902345</span>
        </div>
        <div class="">
          <img
            src="/static/img/orderFollow-up/tel@3x.png"
            class="brandImage"
          ></img>
          <span class="hand-class">手工录单</span>
        </div>
        <div class="">
          <img
            src="/static/img/orderFollow-up/time@3x.png"
            class="timeImage"
          ></img>
          <span class="time-label">2019-06-1815:33</span>
          <span class="information-class">详细信息</span>
          <img
            src="/static/img/orderFollow-up/xialablue@3x.png"
            class="information-xiala"
          ></img>
        </div>
        <div class="information-p">
          <p>意向产品：bingxiang</p>
          <p>海尔/8年</p>
        </div>
        <div class="bottom-class">
          <img
            src="/static/img/orderFollow-up/dian@3x.png"
            class="dian-Class"
          ></img>
          <p class="bottom-button">成交录单</p>
          <p class="bottom-button">发券</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      noticeShow: false,
      maskShow: false,
      sortShow: false,
      scenarioShow: false,
      dataList: [],
      sortList: [
        {
          id: "1",
          name: "智能排序"
        },
        {
          id: "2",
          name: "按时间倒序"
        },
        {
          id: "3",
          name: "按品牌"
        },
        {
          id: "4",
          name: "按成交可能性"
        }
      ],
      scenarioList: [
        {
          id: "1",
          name: "以旧换新"
        },
        {
          id: "2",
          name: "一站筑家"
        },
        {
          id: "3",
          name: "认筹"
        },
        {
          id: "4",
          name: "爱到家"
        }
      ]
    };
  },
  onLoad() {
    this.searchData();
    debugger
  },
  computed: {},
  methods: {
    sort() {
      this.maskShow = !this.maskShow;
      this.sortShow = true;
      this.scenarioShow = false;
    },
    businessScenario() {
      this.maskShow = !this.maskShow;
      this.sortShow = false;
      this.scenarioShow = true;
    },
    preparation() {},
    sortClick() {
      this.maskerHidden();
    },
    scenarioClick() {
      this.maskerHidden();
    },
    maskerHidden() {
      this.maskShow = false;
      this.sortShow = false;
      this.scenarioShow = false;
    },
    noticeClose() {
      this.noticeShow = false;
    },
    searchData() {
      debugger
      this.hPost("/orderFollow/queryOrderFollowlList", {
        pageNum: 1,
        pageSize: 10
      }).then(data => {
        if (data.code === 1) {
          this.dataList = data.data.result;
        } else {
          uni.showToast({
            title: data.msg,
            duration: 4000,
            icon: "none"
          });
        }
      });
    },


  }
};
</script>

<style scoped lang="scss">
.notice-class {
  height: 64px;
  background-color: #fdf0ce;
  color: #e89748;
  font-size: 24px;
}
.notice-p {
  line-height: 64px;
  margin-left: 24px;
}
.notice-image {
  width: 32px;
  height: 32px;
  position: absolute;
  right: 24px;
  top: 18px;
}
.search-image {
  width: 32px;
  height: 32px;
  position: absolute;
  left: 480px;
  top: 25px;
}
.search-view {
  position: relative;
}
.input-class {
  width: 500px;
  background-color: white;
  border-radius: 20px;
  height: 60px;
  margin-left: 24px;
  margin-top: 14px;
  padding-left: 30px !important;
  color: #666666;
  font-size: 28px;
  padding-right: 50px !important;
}
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
  margin-top: 20px;
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
  margin-top: 20px;
  margin-left: 10px;
}
.order-span {
  display: inline-block;
  color: #666666;
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
  width: 80px;
}
.timeImage {
  width: 32px;
  height: 32px;
  position: absolute;
  margin-top: 14px;
}
.time-label {
  color: #bbbbbb;
  font-size: 28px;
  margin-left: 50px;
}
.bar-class {
  height: 72px;
  width: 250px;
  float: left;
  position: relative;
}
.bar-v {
  background-color: white;
  height: 72px;
  margin-top: 15px;
}
.masker {
  width: 100%;
  background-color: #9999;
  height: 1200px;
  z-index: 10;
  position: absolute;
  opacity: 50%;
}
.sort-class {
  color: #333333;
  font-size: 28px;
  background-color: white;
  height: 80px;
  line-height: 80px;
  padding-left: 24px;
  border-bottom: 1px solid #eeeeee;
}
.select-sort {
  color: #1969c6;
  font-size: 28px;
  background-color: white;
  height: 80px;
  line-height: 80px;
  padding-left: 24px;
  border-bottom: 1px solid #eeeeee;
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
.hand-class {
  color: #f5a623;
  font-size: 24px;
  margin-left: 16px;
}
.information-class {
  color: #1969c6;
  font-size: 28px;
  margin-left: 260px;
}
.information-xiala {
  width: 36px;
  height: 36px;
  margin-top: 14px;
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
  height: 80px;
  border-top: 1px solid #eeeeee;
}
.dian-Class {
  width: 36px;
  height: 6px;
  margin-top: 50px;
}
.page-class{
  background-color: #F5F5F5;
  height:1330px;
}
.app-container{
background-color: red !important;
}
</style>
