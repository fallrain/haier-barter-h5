<template>
  <div class="container">
    <div class="bEvaluateProductItem-cnt">
      <div class="bEvaluateProductItem-cnt-person mb22">
        <!-- <span class="name mr16">{{data.userName}}</span> -->
        <span class="name mr16">张三</span>
        <span>
          <i class="iconfont icon-dianhua mr16"></i>
          <a :href="'tel:'+18678611903" @click="recordCall(data)">18678611903</a>
        </span>
      </div>
      <div class="c-container">
        <div class="bEvaluateProductItem-cnt-price mb22">
          <span class="name">洗衣机</span>
          <span class="price">￥1998</span>
        </div>
        <div class="bEvaluateProductItem-cnt-time">
          <!-- <i class="iconfont icon-shizhong"></i> -->
          2019.09.20
        </div>
      </div>
    </div>
    <li class="songs-item-li" @click="gosonglistFn(item)" v-for="(item,k) in songList">
      <div class="listen">
        <div class="info-header">
          <div>2020.02.01 19:34</div>
          <div>临促：李柳</div>
          <div>微信号：ULss2233</div>
        </div>
        <div class="info-detail">记录：明天到店次数增加，今天到店次数减少</div>
      </div>
    </li>
  </div>
</template>

<script>
export default {
  name: "evaluateProductDetail",
  data() {
    return {
      songList: [1, 2, 3, 4, 5, 6, 7, 8]
    };
  }
};
</script>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
}
.bEvaluateProductItem-cnt {
  overflow: hidden;
  flex-grow: 1;
  flex-shrink: 0;
  padding-left: 30px;
  padding-top: 40px;
  background-color: white;
  height: 170px;
}

.bEvaluateProductItem-cnt-person {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  color: #333;
  font-size: 28px;

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
.c-container {
  display: flex;
  flex-direction: row;
}
.bEvaluateProductItem-cnt-price {
  line-height: 1;
  font-size: 28px;

  & > .name {
    color: #1969c6;
    margin-right: 18px;
  }

  & > .price {
    color: #1969c6;
  }
}

.bEvaluateProductItem-cnt-time {
  line-height: 1;
  font-size: 28px;
  margin-left: 30px;
  .iconfont {
    font-size: 28px;
    margin-right: 18px;
    color: #bbb;
  }
}
.listen {
  height: 208px;
  margin-left: 24px;
  margin-right: 24px;
  margin-top: 24px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}
.info-header {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  font-size: 12px;
  margin-top: 24px;
}
.info-detail {
  background-color: #f5f5f5;
  border-radius: 10px;
  height: 70px;
  margin-left: 24px;
  margin-right: 24px;
  margin-top: 24px;
  color: #29ab91;
  font-size: 15px;
  padding-left: 20px;
  padding-top: 20px;
}
</style>
