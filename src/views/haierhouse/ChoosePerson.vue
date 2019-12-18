<template>
<div class="fs28">
  <div class="text-999 lh70 pl20">选择一站筑家负责人</div>
  <ul class="content">
    <li class="item-style" v-for="(item,index) in this.userList" :key="index" @click="clickItem(item)">
      {{item.username}}
    </li>
<!--    <div v-show="this.userList.length === 0" class="item-style text-center">暂无数据。。。</div>-->
  </ul>
</div>
</template>

<script>
export default {
  name: 'choosePerson',
  data() {
    return {
      currentInfo: {},
      userList: []
    };
  },
  created() {
    this.queryUserList();
  },
  methods: {
    queryUserList() {
      const shopid = JSON.parse(localStorage.getItem('userinfo')).shopId
      this.productService.userList(shopid).then((res1) => {
        if (res1.code === 1) {
          this.userList = res1.data;
        }
      });
    },
    clickItem(item) {
      this.currentInfo = item;
      this.$router.go(-1);
    }
  },
  beforeRouteLeave(to, form, next) {
    to.params.userInfo = this.currentInfo;
    // this.$destroy();
    next();
  }
};
</script>

<style lang="scss">
.fs28{
  font-size: 28px;
}
.title{
  color: #999;
  line-height: 70;
  padding: 0 20px;
}
.content{
  background: #fff;
  padding: 0 20px;
  line-height: 70px;
  .item-style{
    padding: 0 20px;
    border-bottom: 1px solid #eee;
  }
}
.clear {
  clear: both;
  overflow: hidden;
}
.md-check-list .md-cell-item{
  float: left !important;
  margin-right: 20px !important;
}
</style>
