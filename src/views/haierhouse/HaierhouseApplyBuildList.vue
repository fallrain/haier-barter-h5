<template>
  <div>
    <div class="bt2-myhouse pt50 mt16 position">
      <div class="">
        <div class="BTitle-par title-class">
          <p class="title-left"></p>
          <p class="Btitle">我的一站筑家</p>
        </div>
        <div class=" mescroll mescroll-touch" ref="scrollView" id="scrollView">
          <div class="">
            <div class="bt2-myhouse-card" v-for="(item, index) in this.scrollView.list" :key="index">
              <img v-if="item.imageUrl" :src="item.imageUrl" class="bt2-myhouse-card-portrait">
              <img v-else src="@/assets/images/haierHouse/Group@3x.png" class="bt2-myhouse-card-portrait"/>
              <div class="bt2-myhouse-card-cnt">
                <p class="title">{{item.buildAreaName}}</p>
                <p class="cnt">入驻产业：{{item.industryNameScope}}</p>
                <div class="bt2-myhouse-card-cnt-opt">
                  <button class="bt2-myhouse-card-cnt-opt-btn mr24" @click="changeInformation(item)"
                          v-show="item.status!=='审核通过'"
                  >补充信息
                  </button>
                  <!--              <button class="bt2-myhouse-card-cnt-opt-btn mr24" @click="changeInformation()" >修改信息</button>-->
                  <!--              <button class="bt2-myhouse-card-cnt-opt-btn mr24" @click="checkDetail()">查看详情</button>-->
                  <button class="bt2-myhouse-card-cnt-opt-btn mr24" @click="active">配置活动</button>
                  <div v-if="item.status === '审核通过'" class="bt2-myhouse-card-cnt-opt-statu">
                    <img src="@/assets/images/haierHouse/pass.png">
                    <span style="margin-left: 8px; color: #4a90e2;">{{item.status}}</span>
                  </div>
                  <div v-else-if="item.status === '拒绝'" class="bt2-myhouse-card-cnt-opt-statu">
                    <img src="@/assets/images/haierHouse/deny.png">
                    <span style="margin-left: 8px;color: #ec3334;">{{item.status}}</span>
                  </div>
                  <div v-else class="bt2-myhouse-card-cnt-opt-statu">
                    <img src="@/assets/images/haierHouse/Icons／Complete@2x.png">
                    <span style="margin-left: 8px;">{{item.status}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Toast
} from 'mand-mobile';

export default {
  name: 'HaierhouseApplyBuildList',
  components: {
    Toast
  },
  data() {
    return {
      scrollView: {
        mescroll: null, // mescroll实例对象
        list: [],
        isListInit: false,
      },
      imgNull: false,
      hmcid: '',
      tempData: []
    };
  },
  mounted() {
    // 创建当前tab的MeScroll对象，并下拉刷新
    // this.bUtil.scroviewTabChange('scrollView', this);
  },
  created() {
    this.getDatalist();
  },
  methods: {
    upCallback(page) {
      // 下载过就设置已经初始化
      this.scrollView.isListInit = true;
      this.getDatalist(page).then(({ result, pages }) => {
        this.$nextTick(() => {
          // 通过当前页的数据条数，和总页数来判断是否加载完
          this.scrollView.mescroll.endByPage(result.length, pages);
        });
      });
    },
    getDatalist(page) {
      return this.haierhouseService.queryMyShopList({
        // adminId: '00011682',
        hmcId: this.userInfo.hmcid,
      }).then((res) => {
        console.log(res);
        if (res.code === 1) {
          if (res.data.length === 0) {
            Toast.failed('一站筑家暂无信息');
            this.scrollView.list = [];
            return;
          }
          this.scrollView.list = res.data;
          const sroviewObj = {};
          sroviewObj.pages = 1;
          sroviewObj.result = res.data;
          return sroviewObj;
        }
      });
    },
    active() {
      Toast.failed('功能暂未开放，敬请期待');
    },
    changeInformation(item) {
      this.$router.push({
        name: 'Haierhouse.HaierhouseApply',
        params: { id: item.id }
      });
    },
    checkDetail() {
      uni.navigateTo({
        url: `/pages/haierHouse/ViewDetail?shopId=${this.myAreaList.id}&hmcid=${this.hmcid}`,
      });
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.$vnode && this.$vnode.data.keepAlive) {
      if (this.$vnode.parent && this.$vnode.parent.componentInstance && this.$vnode.parent.componentInstance.cache) {
        if (this.$vnode.componentOptions) {
          const key = this.$vnode.key == null
            ? this.$vnode.componentOptions.Ctor.cid + (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '')
            : this.$vnode.key;
          const cache = this.$vnode.parent.componentInstance.cache;
          const keys = this.$vnode.parent.componentInstance.keys;
          if (to.name === 'Haierhouse.HaierhouseEntry') {
            keys.forEach((k, index) => {
              if (cache[k]) {
                delete cache[k];
              }
            });
          }
        }
      }
    }
    this.$destroy();
    next();
  }
};
</script>

<style scoped lang="scss">
  .pt50{
    padding-top: 50px !important;
  }
  .title-class {
    position: fixed;
    top: 0;
    background-color: white;
    height: 70px;
    width: 100%;
    z-index: 10;
  }

  .BTitle-par {
    display: flex;
    padding-left: 24px;
    line-height: 70px;
  }

  .Btitle {
    color: #333;
    font-size: 32px;
  }
  .title-left {
    font-size: 32px;
    line-height: 70px;
    border-left: 6px solid #4a90e2;
    width: 10px;
    padding-left: 16px;
    margin-top: 15px;
    height: 40px;
  }
  .text-666{
    color: #666;
  }
  .fs22{
    font-size: 22px;
  }
  .main-img-class{
    width: 280px;
    height: 134px;
  }
  .md-scroll-view{
    display: flex;
    align-items: center;
  .scroll-view-list{
    display: flex;
    padding: 0 20px;
    width: 1000px;
  .scroll-view-item{
    flex: 1;
    text-align: center;
    font-family: DINAlternate-Bold;
    border-right: .5px solid #efefef;
  }
  }
  }
  .mr24{
    margin-right: 24px;
  }
  .swiper-style{
    height: 350px;
  }
  .bt2-spacing-line{
    width: 100%;
    height: 16px;
    background: #F5F5F5;
  }
  .bt2- {
  &house-menu {
     display: flex;
     padding: 24px 44px;
     padding-bottom: 10px;
     background: #fff;
   }

  &house-menu-item {
     margin-left: 100px;
     text-align: center;
  &:first-child{
     margin-left: 0;
   }
  img{
    width: 88px;
    height: 88px;
  }
  }

  &house-menu-item-cnt{
     color: #666;
     font-size: 28px;
     line-height: 40px;
     margin-top: 14px;
   }

  &myhouse{
     background: #fff;
     padding-top: 24px;
     padding-bottom: 24px;
   }

  &myhouse-card{
     display: flex;
     padding: 24px;
     align-items: center;
   }
  }
  .bt2-help-inf-item-par{
    padding: 24px 48px;
  }

  .bt2-help-inf-item{
    font-size: 28px;
    line-height: 40px;
    color: #666;
    margin-top: 16px;
  }
  .bt2-myhouse-card-cnt{
    font-size: 28px;
  .title{
    color: #666;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .cnt{
    margin-top: 10px;
    color: #999;
  }
  }

  .bt2-myhouse-card-cnt-opt{
    display: flex;
    align-items: center;
    margin-top: 16px;
  }
  .bt2-myhouse-card-portrait{
    width: 160px;
    height: 160px;
    margin-right: 24px;
  }
  .bt2-myhouse-card-cnt-opt-btn{
    padding-left: 20px;
    padding-right: 20px;
    color: #4A90E2;
    background: #fff;
    border: 1px solid #4A90E2;
    width: 160px;
    height: 50px;
    border-radius: 25px;
    line-height: 45px;
    font-size: 25px;
  }

  .bt2-myhouse-card-cnt-opt-statu{
    color: #F5A623;
    font-size: 26px;
    position: absolute;
    right: 60px;
  img{
    width: 36px;
    height: 36px;
  }
  }
  .bt2-myhouse-card-cnt-opt-status-p{
    color: #4A90E2;
    font-size: 26px;
    position: absolute;
    right: 30px;
  img{
    width: 36px;
    height: 36px;
  }
  }
  .bt2-myhouse-card-cnt-opt-status-d{
    color: #F05B4B;
    font-size: 26px;
    position: absolute;
    right: 30px;
  img{
    width: 36px;
    height: 36px;
  }
  }

  .img-class {
    position: absolute;
    right: 24px;
    width: 38px;
    height: 38px;
    /* top:10px; */
  }

  .icon-class {
    width: 72px;
    height: 72px;
  }

  .mescroll-uni {
    padding-top: 0 !important;
  }

  .mescroll-upwarp {
    background-color: red !important;
    display: none !important
  }

  .pop-class {
    width: 600px;
    height: 500px;
    text-align: center
  }

  .pop-img-class {
    width: 500px;
    height: 400px;
    /* background-color: red; */
    position: absolute;
    right: 13%;
    top: 50px
  }

  .pop-p {
    text-align: center;
    position: absolute;
    width: 90%

  }

  .uni-popup-middle.uni-popup-fixed[data-v-728667af] {
    width: 100% !important
  }
</style>
