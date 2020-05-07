<template>
  <div class="container">
    <div class="header">
      <img class="headerimg" src="@/assets/images/houseServicer/default.png" />
      <span>我是一个大大的标题</span>
      <div>
        <img class="iconClass" src="@/assets/images/houseServicer/head.png" alt />
        <span>合肥路加斯科店/李建国</span>
        <span>2020/09/08</span>
      </div>
    </div>
    <div class="content">
      <img src="@/assets/images/houseServicer/default.png" />
      <span>我是第一段</span>
      <img src="@/assets/images/houseServicer/default.png" />
      <span>我是第二段</span>
      <img src="@/assets/images/houseServicer/default.png" />
      <span class="imgms">我的图片描述</span>
      <span>我是第三段</span>
    </div>
    <div class="bottomClass">
      <img class="zanclass" src="@/assets/images/houseServicer/icon-zan.png" />
      <span>12</span>
      <div class="moreClass">
        <img class="zanclass" src="@/assets/images/houseServicer/icon-zan.png" />
        <span>更多</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.headerimg{
  width: 100%;
}
.iconClass{
  width: 30px;
  height: 30px;
}
.content img{
  width: 100%;
}
.bottomClass{
  display: flex;
}
.zanclass{
  height: 29.65px;
}
.moreClass{
  display: flex;
}


</style>
