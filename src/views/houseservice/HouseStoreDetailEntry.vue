<template>
<div class="container">
  <div class="header">
    <img class="headerimg" :src="customerInfo.coverImage"/>
    <span class="headTitle">{{customerInfo.title}}</span>
    <!-- <div>
      <img class="iconClass" src="@/assets/images/houseServicer/head.png" alt />
      <span>合肥路加斯科店/李建国</span>
      <span>{{customerInfo.createdTime}}</span>
    </div> -->
  </div>
   <div class="content" v-html="message">{{message}}</div>
   </div>
  <!-- <div class="content">
    <img src="@/assets/images/houseServicer/default.png" />
    <span>我是第一段</span>
    <img src="@/assets/images/houseServicer/default.png" />
    <span>我是第二段</span>
    <img src="@/assets/images/houseServicer/default.png" />
    <span class="imgms">我的图片描述</span>
    <span>我是第三段</span>
  </div> -->
  <!-- <div class="bottomClass">
    <img class="zanclass" src="@/assets/images/houseServicer/icon-zan.png" />
    <span>12</span>
    <div class="moreClass">
      <img class="zanclass" src="@/assets/images/houseServicer/icon-zan.png" />
      <span>更多</span>
    </div>
  </div> -->
</template>

<script>
export default {
  data() {
    return {
      message: 'html',
      customerInfo: {}
    };
  },
  created() {
    debugger
    this.houseService
      .searchStoryByPlanId({
        planId: this.$route.query.planId
      })
      .then((res) => {
        debugger;
        if (res.code === 1) {
          this.customerInfo = res.data;
          this.message = res.data.content;
        }
      });
  }
};
</script>

<style scoped lang="scss">
.header{
  display: flex;
  flex-direction: column;
  background: white;
}
.headerimg {
  width: 100%;
}
.headTitle{
  font-size: 40px;;
  font-weight: 500;
}
.iconClass {
  width: 30px;
  height: 30px;
}
.content img {
  width: 100%;
}
.bottomClass {
  display: flex;
}
.zanclass {
  height: 29.65px;
}
.moreClass {
  display: flex;
}
</style>
