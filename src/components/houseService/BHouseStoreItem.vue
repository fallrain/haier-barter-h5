<template>
  <div class="container">
    <div class="header">
      <div>
        <span class="itemClass" :class="{'active':quanguo}" @click="allList">全国</span>
        <span class="itemClass" :class="{'active':!quanguo}" @click="mineList">我的</span>
      </div>
      <div class="selecTitleClass">
        <div @click.stop="xialaAction">{{selectTitle}}</div>
        <img class="zanclass" src="@/assets/images/houseServicer/down-icon.png" />
      </div>

      <div :class="{activeli: isShow, none: !isShow}">
        <div
          v-for="(item, index) in menus"
          :key="index"
          @click="didSelectItem(item)"
          class="item-class"
        >{{item.name}}</div>
      </div>
    </div>
    <div class="panel-body"  v-for="(item,index) in list" :key="index">
      <div class="itemHeader">
        <img class="iconClass" src="@/assets/images/houseServicer/head.png" alt />
        <span class="userNameClass">{{item.visitServicePlanDTO.servicerName}}</span>
        <span class="dateclass">{{item.updatedTime}}</span>
      </div>
      <div class="img-show" @click="addStoreDetail(item)">
        <img :src="item.coverImage" />
      </div>
      <div class="title-show">{{item.title}}</div>
      <div class="bottomClass">
        <span v-if="item.readCount">被浏览 {{item.readCount}}次</span>
        <div v-if="item.praiseCount" class="bot-right">
          <img class="zanclass" src="@/assets/images/houseServicer/icon-zan.png" />
          <span>{{item.praiseCount}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  DropMenu
} from 'mand-mobile';

export default {
  name: '',
  components: {
    [DropMenu.name]: DropMenu
  },
  props: {
    list: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      data: [],
      quanguo: true,
      isShow: false,
      selectTitle: '按时间排序',
      menus: [
        {
          name: '按时间排序',
          class: '0'
        },
        {
          name: '按数量排序',
          class: '1'
        }
      ],
      createdBy: '',
      paixuId: '0', // 排序id
    };
  },
  created() {
    const userinfostr = localStorage.getItem('userinfo');
    this.userinfo = JSON.parse(userinfostr);
  },
  methods: {
    allList() {
      this.createdBy = '';
      this.quanguo = true;
      this.$emit('rhgsListAction', this.createdBy, this.paixuId);
    },
    mineList() {
      this.createdBy = this.userinfo.hmcid;
      this.quanguo = false;
      this.$emit('rhgsListAction', this.createdBy, this.paixuId);
    },
    xialaAction() {
      this.isShow = !this.isShow;
    },
    didSelectItem(item) {
      this.selectTitle = item.name;
      this.paixuId = item.class;
      this.$emit('rhgsListAction', this.createdBy, this.paixuId);
      this.isShow = !this.isShow;
    },
    // 跳到故事詳情
    addStoreDetail(item) {
      this.$router.push({
        name: 'Houseservice.HouseStoreDetailEntry',
        query: { planId: item.planId }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  //  color: cyan;
}
.header {
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  padding-left: 15px;
  padding-right: 15px;
}
.itemClass {
  margin-right: 15px;
}
.active {
  font-weight: 700;
  font-size: 30px;
}
.panel-body {
  background: #fff;
  padding: 24px;
  border-radius: 4px;
  margin-bottom: 16px;
}
.itemHeader {
  position: relative;
  display: flex;
  align-items: center;
  font: 12px;
  height: 104px;
}
.iconClass {
  width: 72px;
  height: 72px;
  margin-right: 10px;
}
.dateclass {
  position: absolute;
  right: 10px;
  font: 24px;
  color: #666666;
}
.img-show img {
  max-width: 100%;
  // height: 300px;
  background-size: cover;
  background-position: center 0;
}
.title-show {
  height: 95.5px;
  font: 15px;
  display: flex;
  align-items: center;
}
.bottomClass {
  border-top: #eeeeee 0.5px solid;
  display: flex;
  align-items: center;
  height: 80px;
  color: #999999;
  font: 22px;
  position: relative;
}
.bot-right {
  display: flex;
  right: 10px;
  position: absolute;
  align-items: center;
}
.zanclass {
  height: 29.65px;
  margin-right: 10px;
}
.userNameClass {
  -webkit-line-clamp: 10;
}
.none {
  display: none;
}
.selecTitleClass {
  position: relative;
  right: 0px;
  width: 5.68rem;
  display: flex;
}
.selecTitleClass img{
  position: absolute;
  right: 10px;
  bottom: 4px;
  width: 32px;
  height: 32px;
}
.activeli {
  position: absolute;
  // background-color: rgba(0, 0, 0, 0.2);
  width: 5.68rem;
  height: 4.8rem;
  right: 15px;
  top: 240px;
  z-index: 100;
}
.item-class{
  // height: 20px;
  margin-top: 5px;
}
</style>
