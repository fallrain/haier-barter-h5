<template>
  <div class="content">
    <div class="swiper-style">
      <md-swiper
        @before-change="beforeChange"
        @after-change="afterChange"
        ref="swiper"
        :is-prevent="false"
        :useNative-driver="false"
      >
        <md-swiper-item :key="$index" v-for="(item, $index) in info">
          <img :src="item.url" width="100%" height="100%" alt="">
        </md-swiper-item>
      </md-swiper>
    </div>
    <ul class="bt2-house-menu mt16">
      <li class="bt2-house-menu-item" @click="homeApply">
        <img src="@/assets/images/haierHouse/apply@2x.png" class="icon-class">
        <p class="bt2-house-menu-item-cnt">筑家申请</p>
      </li>
      <!--     <li class="bt2-house-menu-item">
        <img src="@/assets/images/haierHouse/activity@2x.png" @click="jump('/pages/haierHouse/ChooseLeader')">
        <p class="bt2-house-menu-item-cnt">筑家活动</p>
      </li>
      <li class="bt2-house-menu-item">
        <img src="@/assets/images/haierHouse/user@2x.png">
        <p class="bt2-house-menu-item-cnt">用户跟进</p>
      </li> -->
    </ul>
    <div class="bt2-myhouse mt16">
      <p @click="showMoreList()" class="bt2-myhouse-more" v-show="myAreaList.length === 3">显示更多</p>
      <img src="@/assets/images/haierHouse/Shape@2x.png" class="img-class" v-show="myAreaList.length === 3"
           @click="showMoreList()"></img>
      <b-title cnt="我的一站筑家">
      </b-title>
      <div class="bt2-myhouse-card" v-for="(item, index) in myAreaList" :key="index">
        <img v-if="item.imageUrl" :src="item.imageUrl" class="bt2-myhouse-card-portrait">
        <img v-else src="@/assets/images/haierHouse/Group@3x.png" class="bt2-myhouse-card-portrait"/>
        <div class="bt2-myhouse-card-cnt">
          <p class="title">{{item.buildAreaName}}</p>
          <p class="cnt">入驻产业：{{item.industryNameScope}}</p>
          <div class="bt2-myhouse-card-cnt-opt">
            <button class="bt2-myhouse-card-cnt-opt-btn mr24" @click="changeInformation(item)"
                    v-show="item.status!=='审核通过'">补充信息
            </button>
<!--            <button class="bt2-myhouse-card-cnt-opt-btn mr24" @click="changeInformation()" v-show="deny">修改信息</button>-->
<!--            <button class="bt2-myhouse-card-cnt-opt-btn mr24" @click="checkDetail()" v-show="informationComplete">查看详情-->
<!--            </button>-->
            <button class="bt2-myhouse-card-cnt-opt-btn mr24" @click="activity()">配置活动</button>
            <div v-if="item.status === '审核通过'" class="bt2-myhouse-card-cnt-opt-status">
              <img src="@/assets/images/haierHouse/pass.png">
              <span style="margin-left: 8px;">{{item.status}}</span>
            </div>
            <div v-if="item.status === '拒绝'" class="bt2-myhouse-card-cnt-opt-status">
              <img src="@/assets/images/haierHouse/deny.png">
              <span style="margin-left: 8px;">{{item.status}}</span>
            </div>
            <div v-else class="bt2-myhouse-card-cnt-opt-status">
              <img src="@/assets/images/haierHouse/Icons／Complete@2x.png">
              <span style="margin-left: 8px;">{{item.status}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bt2-myhouse mt16">
      <b-title cnt="优秀门店展示"></b-title>
      <ul class="bt2-shopShow-par mt16">
        <md-scroll-view
          ref="scrollView"
          :scrolling-y="false"
          :touch-angle="80"
          :is-prevent="false"
          :bouncing="true"
          :auto-reflow="true"
        >
          <div ref="scrollWidth" class="scroll-view-list">
            <li class="mr16" v-for="(item,index) in shopList" :key="index">
              <img :src="item.imageUrl" @click="showPic(item)" class="main-img-class">
              <p class="cnt text-center text-666 fs22">{{item.districtName}}</p>
            </li>
          </div>
        </md-scroll-view>
      </ul>
    </div>
    <div class="bt2-myhouse mt16">
      <b-title cnt="了解一站筑家"></b-title>
      <div class="bt2-help-inf">
        <ul class="bt2-help-inf-item-par">
          <li class="bt2-help-inf-item">
            1、一站筑家定义为面向新居成套用户的前置触点，形式包括样板间、新社区店、品牌联盟等执行模式
          </li>
          <li class="bt2-help-inf-item">
            2、围绕新社区建触点、做引流，具有高产出、高效率、高转化的特点
          </li>
          <li class="bt2-help-inf-item">
            3、对承接经销商在展示方案、交互方案、售卖方案、活动方案等予以营销指导及资源支持
          </li>
        </ul>
      </div>
    </div>
    <uni-popup
      :show="alert"
      position="middle"
      mode="fixed"
      @hidePopup="hidePopupAlert"
      :h5-top="h5top"
    >
      <div class="pop-class">
        <img :src="areaImg" alt="" :mode='imageMode' class="pop-img-class">
        <p class="pop-p">{{this.areaName}}</p>
      </div>
    </uni-popup>
  </div>
</template>

<script>
import {
  BTitle,
  MescrollUni,
  uniPopup
} from '@/components/haierHouse';
import {
  Toast, Swiper, SwiperItem, ScrollView
} from 'mand-mobile';

export default {
  components: {
    Toast,
    [Swiper.name]: Swiper,
    [SwiperItem.name]: SwiperItem,
    [ScrollView.name]: ScrollView,
    BTitle,
    MescrollUni,
    uniPopup
  },
  data() {
    return {
      userInfo: {},
      mescroll: null, // mescroll实例对象
      // 下拉刷新的配置
      downOption: {
        use: true, // 是否启用下拉刷新; 默认true
        auto: false // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
      },
      upOption: {
        use: false, // 是否启用下拉刷新; 默认true
        auto: false // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
      },
      alert: false,
      h5top: true,
      myAreaList: [], // 我的一站筑家
      myInfoImg: '',
      myInfoShow: false,
      hmcid: '',
      shopid: '',
      allList: [],
      middle: false,
      deny: false,
      pass: false,
      refresh: false,
      informationComplete: false,
      areaName: '',
      areaImg: '',
      imageMode: 'aspectFit',
      fillMode: 'aspectFill',
      info: [
        {
          colorClass: 'uni-bg-red',
          url: 'https://hzytest.haier.com/haierfile/sellerUploadImg/banner.jpeg',
          content: '内容 A'
        },
        {
          colorClass: 'uni-bg-red',
          url: 'https://hzytest.haier.com/haierfile/sellerUploadImg/banner.jpeg',
          content: '内容 A'
        }
      ],
      shopList: [
        // {
        //   url:require('@/assets/images/haierHouse/48C5FB2B-5CF2-4300-91D7-C45D0C960B7E.png'),
        //   desc:'左岸风度小区'
        // }
      ]
    };
  },

  // 必须注册列表滚动事件,使下拉刷新生效
  onPageScroll(e) {
    this.mescroll && this.mescroll.onPageScroll(e);
  },
  activated() {
    // 获取我的一站筑家
    this.getDatalist();
    // 获取优秀门店
    this.getStoreList();
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('userinfo'));
  },
  methods: {
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    /* 下拉刷新的回调, 有三种处理方式: */
    downCallback(mescroll) {
      this.getDatalist();
      if (this.refresh) {
        mescroll.endSuccess();
        this.refresh = false;
      }
    },
    showPic(item) {
      this.alert = true;
      this.areaName = item.name;
      this.areaImg = item.pic;
    },
    hidePopupAlert() {
      this.alert = false;
    },
    getStoreList() {
      this.haierhouseService.querGoodShopList({
        rowNum: 10
      }).then((res) => {
        if (res.code === 1) {
          this.shopList = res.data;
          // 设置优秀门店列表宽度
          this.$refs.scrollWidth.style.width = `${this.shopList.length * 160}px`;
          this.$refs.scrollView.reflowScroller();
        }
      });
    },
    getDatalist() {
      this.haierhouseService.queryMyShopList({
        // hmcId: '00011682',
        hmcId: this.userInfo.hmcid,
        rowNum: 3
      }).then((res) => {
        console.log(res);
        if (res.code === 1) {
          if (res.data.length === 0) {
            Toast.failed('一站筑家暂无信息');
            return;
          }
          this.myAreaList = res.data;
        }
      });
    },
    // 筑家申请
    homeApply() {
      this.$router.push({
        name: 'Haierhouse.HaierhouseApply',
        params: {}
      });
    },
    showAl() {
      Toast.failed('功能暂未开放，敬请期待');
    },
    information() {
      // uni.navigateTo({
      //   url: `/pages/haierHouse/ChangeInformation?shopId=${this.myAreaList.id}&hmcid=${this.hmcid}`,
      // });
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
    },
    activity() {
      this.showAl();
    },
    showMoreList() {
      this.$router.push({
        name: 'Haierhouse.HaierhouseApplyBuildList',
        params: { hmcId: this.userInfo.hmcid }
      });
    },
    getQueryString(name) {
      const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
      const r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return decodeURIComponent(r[2]);
      }
      return null;
    },
    setValue(id, value) {
      document.querySelector(id) && (document.querySelector(id).innerHTML = value);
    },
    beforeChange(from, to) {
      this.setValue('#valueSwiper0', from);
      this.setValue('#valueSwiper1', to);
    },
    afterChange(from, to) {
      this.setValue('#valueSwiper2', from);
      this.setValue('#valueSwiper3', to);
    },
  }
};
</script>

<style scoped lang="scss">
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
      position: relative;
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
  .bt2-myhouse-more {
    float: right;
    color: #4A90E2;
    position: absolute;
    right: 76px;
    top: 10px;
    font-size: 30px;
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

  .bt2-myhouse-card-cnt-opt-status{
    color: #F5A623;
    font-size: 26px;
    position: absolute;
    right: 10px;
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
    top: 18px;
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
