<template>
  <div class="container">
    <div class="reportInstallList-tab">
      <md-tab-bar v-model="curTab" :items="tabs" :hasInk="false"></md-tab-bar>
      <div class="count-class">共10人</div>
    </div>
    <li class="songs-item-li" v-for="(item,k) in userList">
      <div class="bEvaluateProductItem-cnt">
        <div class="bEvaluateProductItem-cnt-person mb22">
          <span class="name mr16">张三</span>
          <span>18678611903</span>

          <span class="cliclMore">
            <i class="iconfont icon-dianhua mr16"></i>
            <a :href="'tel:'+18678611903" @click="recordCall(data)">拨打电话</a>
          </span>
        </div>
        <div class="bEvaluateProductItem-cnt-price mb22">
          <span class="name">电冰箱</span>
          <span class="price">￥1897</span>
        </div>
        <div class="bEvaluateProductItem-cnt-time">
          <!-- <i class="iconfont icon-shizhong"></i> -->
          2010.02.12
        </div>
        <div class="c-container">
          <div class="goutjlClass">沟通记录</div>
          <div class="inputgtClass">请输入本次沟通记录</div>
          <div class="cliclMore" @click="barCodeClick(item)">查看记录</div>
        </div>
      </div>
    </li>
  </div>
</template>

<script>
import { TabBar } from "mand-mobile";
export default {
  name: "serviceUpdateRecord",
  components: {
    "md-tab-bar": TabBar
  },
  data() {
    return {
      // 当前选中tab
      curTab: 1,
      // tabs
      tabs: [
        {
          name: 1,
          label: "全部"
        },
        {
          name: 2,
          label: "已联系"
        },
        {
          name: 3,
          label: "未联系"
        }
      ],
      userList: [1, 2, 3, 4, 5, 6]
    };
  },
  methods: {
    barCodeClick(item) {
      /* 查看记录click */
      this.$router.push({
        name: "EvaluateProductHistoryList.evaluateProductDetail",
        params: { isShow: true }
      });
    }
  }
};
</script>

<style lang="scss">
.reportInstallList-tab {
  display: flex;
  flex-direction: row;
  background-color: white;
  align-items: center;
  margin-bottom: 20px;

  .md-tab-bar {
    width: 75%;
    background-color: #fff;
    border-bottom: 2px solid #eee;
  }
  .count-class {
    font-size: 12px;
  }
  .md-tab-bar-item {
    min-height: 72px;
    color: #666;
    font-size: 12px;

    &.is-active {
      color: #1969c6;
    }
  }
}
.goutjlClass {
  font-size: 12px;
}
.bEvaluateProductItem-cnt {
  overflow: hidden;
  flex-grow: 1;
  flex-shrink: 0;
  background-color: white;
  height: 312px;
  border-bottom: #eeeeee 1px solid;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 30px;
}

.bEvaluateProductItem-cnt-person {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  color: #333;
  font-size: 28px;
  justify-content: space-between;

  & > .name {
    font-size: 36px;
  }

  .iconfont {
    font-size: 32px;
    color: #1969c6;
  }

  a {
    color: #333;
  }
}

.bEvaluateProductItem-cnt-price {
  line-height: 1;
  font-size: 28px;

  & > .name {
    color: #666;
    margin-right: 18px;
  }

  & > .price {
    color: #1969c6;
  }
}
.c-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 30px;
  align-items: center;
}

.bEvaluateProductItem-cnt-time {
  line-height: 1;
  font-size: 14px;

  .iconfont {
    font-size: 28px;
    margin-right: 18px;
    color: #bbb;
  }
}
.inputgtClass {
  height: 60px;
  font-size: 12px;
  display: flex;
  align-items: center;
  // justify-content: center;
  border: #dddddd 1px solid;
  border-radius: 10px;
  padding-left: 20px;
  width: 436px;
  color: #dddddd;
}
.cliclMore {
  color: #1969c6;
  font-size: 14px;
}
</style>
