<template>
  <div class="container">
    <div class="person-info">
      <div class="bEvaluateProductItem-cnt-person mb22">
        <div class="name-style">张三</div>
        <a href="tel:18510778318" class="go-phone">
          <div class="num-style">18678611903</div>
          <div class="phone-style">
            <i class="iconfont icon-dianhua mr16"></i>
            拨打电话
          </div>
        </a>
      </div>
      <div class="bEvaluateProductItem-cnt-price mb22">
        <span class="name">电冰箱</span>
        <span class="price">￥1897</span>
      </div>
      <div class="bEvaluateProductItem-cnt-time">
        <!-- <i class="iconfont icon-shizhong"></i> -->
        2010.02.12
      </div>
    </div>
    <li class="songs-item-li" @click="gosonglistFn(item)" v-for="(item,k) in songList">
      <div class="listen">
        <div class="info-header">
          <div>2020.02.01 19:34</div>
          <div>临促：李柳</div>
          <div>微信号：ULss2233</div>
        </div>
        <div class="info-detail">
          记录：明天到店次数增加，今天到店次数减少
          <span class="no-data" v-show="false">无文字记录</span>
        </div>
      </div>
    </li>
    <div v-if="isShow" class="bot-class">
      <div class="addjlClass">添加记录</div>
      <div class="callClass">继续拨打</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'evaluateProductDetail',
  data() {
    return {
      songList: [1, 2, 3, 4, 5, 6, 7, 8],
      isShow: this.$route.params.isShow
    };
  }
};
</script>

<style lang="scss">
.container {
  .person-info{
    padding: 24px;
    background: #fff;
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
    }
  }
}

.c-container {
  display: flex;
  flex-direction: row;
}
.listen {
  margin-left: 24px;
  margin-right: 24px;
  margin-top: 24px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 24px;
}
.info-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 24px;
}
.info-detail {
  margin-top: 24px;
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 24px;
  color: #29ab91;
  font-size: 30px;
  font-weight: 500;
  .no-data{
    color: #999;
  }
}
.bot-class {
  display: flex;
  flex-direction: row;
  margin-top: 70px;
  margin-bottom: 40px;
  justify-content: space-around;
}
.addjlClass {
  height: 84px;
  border: #1969c6 solid 1px;
  background-color: white;
  border-radius: 10px;
  width: 330px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1969c6;
  font-size: 15px;
}
.callClass {
  height: 84px;
  border: #1969c6 solid 1px;
  background-color: #1969c6;
  border-radius: 10px;
  width: 330px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 15px;
}
</style>
