<template>
  <div class="activity-bg h100vh">
    <b-search-input
      v-model="searchVal"
      @search="searchByCondition"
      placeholder="输入活动名称进行查询"
    >
    </b-search-input>
    <div class="activity-tab-bg activity-tab" v-if="false">
      <md-tab-bar
        v-model="current"
        :items="items"
        :hasInk="false"
      />
    </div>
    <div
      class="reportInstallList-view"
      v-show="curScrollViewName==='scrollViewRightsActivity'">
      <div
        id="scrollViewRightsActivity"
        ref="scrollViewRightsActivity"
        class="mescroll"
      >
        <div>
          <b-activity-item
            v-for="(item,index) in scrollViewRightsActivity.list"
            :key="index"
            :getData.sync="item"
            :isFinish="true"
            :isShowImg="false"
            :hasData="false"
            @showLimit="showLimit"
            @showConfig="showConfig"
          ></b-activity-item>
        </div>
      </div>
    </div>
    <div class="reportInstallList-view"
         v-show="curScrollViewName==='scrollViewDrainageActivity'">
      <div class="b-pop-button-cnt">
        <ul class="b-pop-button-cnt-list">
          <li
            class="b-pop-button-cnt-list-item"
            v-for="(item,index) in activityType"
            :class="[checkIds.some(v=>v===item.itemCode) && 'active']"
            :key="index"
            @click="checkboxClick(item)"
          >
            <span class="b-pop-button-cnt-list-item-name">{{item.itemName}}</span>
          </li>
        </ul>

      </div>
      <div
        id="scrollViewDrainageActivity"
        ref="scrollViewDrainageActivity"
        class="mescroll"
      >
        <div>
          <b-drainage-activity
            v-for="(item,index) in scrollViewDrainageActivity.list"
            :key="index"
            :getData.sync="item"
            :userData.sync="getUserInfo"
            @shareClick="shareClick">
          </b-drainage-activity>
        </div>
      </div>

    </div>

<!--    <md-popup-->
<!--      v-model="isPopupShow"-->
<!--      position="bottom"-->
<!--      class="md-popup-class"-->
<!--    >-->
<!--      <md-popup-title-bar-->
<!--        large-radius-->
<!--        @confirm="hidePopUp('bottom')"-->
<!--        @cancel="hidePopUp('bottom')"-->
<!--      ></md-popup-title-bar>-->
<!--      <div class="drainage-popup-items">-->
<!--        <div class="drainage-popup-item" @click="shareWechat">-->

<!--          <i class="iconfont icon-weixin drainage-popup-img"/>-->
<!--          <div>-->
<!--            <span class="drainage-popup-title">分享微信好友</span>-->
<!--          </div>-->
<!--          <div>-->
<!--            <span class="drainage-popup-tip">转发到聊天</span>-->
<!--          </div>-->

<!--        </div>-->
<!--        <div class="drainage-popup-item" @click="shareImg">-->

<!--          <i class="iconfont icon-tupian drainage-popup-img1"/>-->
<!--          <div>-->
<!--            <span class="drainage-popup-title">生成分享图片</span>-->
<!--          </div>-->
<!--          <div>-->
<!--            <span class="drainage-popup-tip">长按保存图片可分享</span>-->
<!--          </div>-->

<!--        </div>-->
<!--      </div>-->
<!--      <div class="popup-cancle" @click="drainageCancle">-->
<!--        取消-->
<!--      </div>-->
<!--    </md-popup>-->
    <div class="popContainer" v-if="isShowPopContainer" @click="closeShare" style="z-index: 100000">
      <img src="@/assets/images/activity/activity-share.png" alt="" class="activity-detail-share">
    </div>
  </div>
</template>

<script>
import {
  BSearchInput
} from '@/components/business';

import {
  TabBar,
  Toast,
  Popup, PopupTitleBar, Button, Icon
} from 'mand-mobile';

import {
  BActivityItem,
  BDrainageActivity
} from '@/components/form';


export default {
  name: 'MarketingActivities',
  components: {
    [TabBar.name]: TabBar,
    BSearchInput,
    BActivityItem,
    BDrainageActivity,
    Toast,
    [Popup.name]: Popup,
    [PopupTitleBar.name]: PopupTitleBar,
    [Button.name]: Button,
    [Icon.name]: Icon,
  },
  data() {
    return {
      getUserInfo: {},
      current: 1,
      currentActivity: {},
      orderNo: '',
      isPopupShow: false,
      items: [{
        name: 0,
        label: '购机权益活动'
      }, {
        name: 1,
        label: '引流活动'
      }],
      scrollViewRightsActivity: {
        mescroll: null,
        list: [],
        isListInit: false
      },
      scrollViewDrainageActivity: {
        mescroll: null,
        list: [],
        isListInit: false
      },
      // 搜索值
      searchVal: '',
      currentList: [],
      productGroupName: [],
      openId: '',
      isShowPopContainer: false,
      // 活动类型
      activityType: [],
      checkIds: [],
    };
  },
  watch: {
    current(val) {
      const obj = {
        0: 'scrollViewRightsActivity',
        1: 'scrollViewDrainageActivity'
      };
      const viewName = obj[val];

      // tab切换后，创建新MeScroll对象（若无创建过），没有加载过则加载
      this.bUtil.scroviewTabChange(viewName, this);
    },
    getUserInfo(val) {
      if (JSON.stringify(val) !== '{}') {
        this[this.curScrollViewName].mescroll.triggerDownScroll();
      }
    }
  },
  methods: {
    upCallback(page) {
      // 下载过就设置已经初始化
      this[this.curScrollViewName].isListInit = true;
      this.search(page).then(({ result, pages }) => {
        if (!result) {
          return;
        }
        this.$nextTick(() => {
          // 通过当前页的数据条数，和总数据量来判断是否加载完
          if (result) {
            this[this.curScrollViewName].mescroll.endByPage(result.length, pages);
          }
        });
      });
    },
    search(page) {
      if (this.current === 0) {
        return this.rightsService.queryRightsActivityList(this.searchVal).then((res) => {
          const sroviewObj = {};
          if (res.code === 1) {
            sroviewObj.pages = 1;
            sroviewObj.result = res.data;
            if (res.data && res.data.length > 0) {
              this.anylizeData(res.data);
            }
            if (!res.data || res.data.length == 0) {
              Toast.info('暂无数据');
              this.currentList = [];
            }
            if (page.num === 1) {
              this[this.curScrollViewName].list = [];
              this[this.curScrollViewName].list = this.currentList;
            } else {
              this[this.curScrollViewName].list = this[this.curScrollViewName].list.concat(this.currentList);
            }
          } else {
            this[this.curScrollViewName].mescroll.endErr();
          }
          return sroviewObj;
        });
      }
      let data = {
        activityType: '',
        activityTitle: this.searchVal,
        // 活动状态只显示已发布
        status: 1,
      };
      if (this.getUserInfo && JSON.stringify(this.getUserInfo) !== '{}') {
        if (this.getUserInfo.storeInfo) {
          data = {
            ...data,
            microCode: this.getUserInfo.storeInfo.microCode,
            channelType: this.getUserInfo.storeInfo.mchannel,
            storeId: this.getUserInfo.storeInfo.storeId,
          };
        }
        data = {
          ...data,
          productGroup: this.getUserInfo.productGroups,
          activityType: this.checkIds && this.checkIds.length > 0 ? this.checkIds[0] : '',
        };
      } else {
        return Promise.resolve({});
      }
      return this.activityService.queryActivityInfoListForHmc(data, {
        pageNum: page.num,
        pageSize: page.size,
      }).then((res) => {
        const sroviewObj = {};
        if (res.code === 1) {
          const {
            result,
            pages
          } = res.data;
          sroviewObj.pages = pages;
          sroviewObj.result = result;
          if (page.num === 1) {
            this[this.curScrollViewName].list = [];
            this[this.curScrollViewName].list = result;
          } else {
            this[this.curScrollViewName].list = this[this.curScrollViewName].list.concat(result);
          }
        } else {
          this[this.curScrollViewName].mescroll.endErr();
        }
        return sroviewObj;
      });
    },
    searchByCondition() {
      this[this.curScrollViewName].mescroll.triggerDownScroll();
    },
    showLimit(item) {
      this.rightsService.viewOtherLimited({}, { rightsNo: item.rightsNo }).then((res) => {
        if (res.code === 1) {
          this.$set(item, 'limitList', res.data);
        }
      });
    },
    showConfig(item) {
      this.rightsService.viewGifts({}, { rightsNo: item.rightsNo },).then((res) => {
        if (res.code === 1) {
          if (res.data.length > 0) {
            item.isShowConfig = true;
            this.$set(item, 'configList', res.data);
            // item.configList = res.data;
          } else {
            item.configList = [];
          }
        }
      });
    },
    anylizeData(curlist) {
      curlist.forEach((item) => {
        const ProductCategoryNameAy = [];
        this.productGroupName.forEach((v) => {
          const reg = new RegExp(v.groupCode);
          if (reg.test(item.rightsProductCategory)) {
            ProductCategoryNameAy.push(v.groupName);
          }
        });
        item.rightsProductCategory = ProductCategoryNameAy.join('、');
        item.num = 0;
        const brands = [];
        const a = item.rightsBrand.split(',');
        a.forEach((i) => {
          if (i === '000') {
            brands.push('海尔');
          } else if (i === '051') {
            brands.push('卡萨帝');
          } else {
            brands.push('统帅');
          }
        });
        item.rightsBrandC = brands.join(',');
        // this.$set(item, 'minesGray', true);
        if (item.isOptional === 1) {
          this.$set(item, 'addGray', false);
        } else {
          this.$set(item, 'addGray', true);
        }
        if (item.selectedNum !== 0) {
          this.$set(item, 'minesGray', false);
        } else {
          this.$set(item, 'minesGray', true);
        }
      });
      this.currentList = curlist;
    },
    drainageCancle() {
      this.isPopupShow = false;
    },
    shareClick(item) {
      this.currentActivity = item;
      // this.isPopupShow = true;
      this.isShowPopContainer = true;
      wx.ready(() => {
        console.log('this.getData.id====', item.id);
        console.log('this.getUserInfo.hmcId====', this.getUserInfo.hmcId);
        wx.miniProgram.postMessage({
          data: {
            activityId: item.id,
            hmcId: this.getUserInfo.hmcId,
          }
        });
      });
    },
    shareWechat() {
      this.isPopupShow = false;
      this.isShowPopContainer = true;
    },
    closeShare() {
      this.isShowPopContainer = false;
    },
    getProductGroup() {
      this.productService.industryGroup()
        .then((res) => {
          if (res.code === 1) {
            this.productGroupName = res.data;
          }
        });
    },
    checkboxClick(item) {
      const index = this.checkIds.findIndex(itemCode => itemCode === item.itemCode);
      if (this.radioCancel && index > -1) {
        this.checkIds = [];
      } else {
        this.checkIds = [item.itemCode];
      }
      this[this.curScrollViewName].mescroll.triggerDownScroll();
    },
  },
  created() {
    this.getProductGroup();
    // unionId=oe6Qqv0hQ-tQ5HixncpxsZhD8FH0
    this.openId = this.$route.query.openId;
    console.log('maActivity', this.unionId);
    this.baseService.userInfo().then((res) => {
      if (res.code === 1) {
        const userInfo = res.data || {};
        this.getUserInfo = {
          ...userInfo,
          openId: this.openId,
        };
      }
    });
    this.basicService.activityType().then((res) => {
      if (res.code === 1) {
        this.activityType = res.data;
      }
    });
    // var vConsole = new VConsole(option);
    // vConsole.setOption('maxLogNumber', 5000);
  },
  computed: {
    curScrollViewName() {
      // 当前tab下的scrollView的ref名字
      return {
        0: 'scrollViewRightsActivity',
        1: 'scrollViewDrainageActivity'
      }[this.current];
    }
  },
  mounted() {
    this.bUtil.scroviewTabChange(this.curScrollViewName, this);
  },
  activated() {
    const checkIds = this.$route.params.checkIds;
    this.checkIds = [];
    if (checkIds) {
      this.checkIds = [checkIds];
    }
  }
};
</script>

<style lang="scss">

  .reportInstallList-view {
    height: calc(100vh - 152px);
  }

  .activity-tab-bg {
    .md-tab-bar {
      padding-left: 24px;
      padding-right: 24px;
      margin-bottom: 8px;
      background: #f5f5f5;
    }
  }

  .activity-tab {
    .md-tab-bar-item {
      padding: 0;
      margin: 0;
      width: 50%;
      font-size: 28px;
      color: #666;
      justify-content: center;
      background: #fff;

      &:first-child {
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
      }

      &:last-child {
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
      }


      &.is-active {
        color: #fff;
        background: #1969C6;
        font-size: 28px;
        height: 60px;
        width: 50%;

        &:first-child {
          border-top-left-radius: 8px;
          border-bottom-left-radius: 8px;
        }

        &:last-child {
          border-top-right-radius: 8px;
          border-bottom-right-radius: 8px;
        }
      }
    }

    .md-tab-bar-item {
      min-height: 0;
    }
  }

  .activity-bg {
    .md-popup-class {
      .md-popup-box {
        background: #fff;
      }

      .md-popup-title-bar {
        background: #fff;
        height: 15px;
      }
    }
  }

  .drainage-popup-items {
    width: 100%;
    height: 234px;
    background: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .drainage-popup-item {
    /*width: 170px;*/
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    margin-left: 58px;
  }

  .drainage-popup-title {
    font-size: 28px;
    color: #333;
  }

  .drainage-popup-tip {
    font-size: 20px;
    color: #999;
  }

  .drainage-popup-img {
    font-size: 66px;
    color: #ffffff;
    border-radius: 50%;
    background: #00cd00;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    margin-bottom: 20px;
  }

  .drainage-popup-img1 {
    font-size: 66px;
    color: #ffffff;
    border-radius: 50%;
    background: rgb(255, 204, 0);
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    margin-bottom: 20px;
  }
  .popup-cancle {
    width: 100%;
    height: 100px;
    line-height: 100px;
    background: #F5F5F5;
    text-align: center;
    font-size: 32px;
    color: #333;
  }

  .activity-detail-share {
    position: fixed;
    right: 128px;
    width: 493px;
    height: 694px;
  }

  .popContainer {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
  }
  .b-pop-button-cnt {
    background: #fff;
    padding-bottom: 16px;
  }

  .b-pop-button-cnt-list {
    &:after {
      content: '';
      display: block;
      clear: both;
    }
  }

  .b-pop-button-cnt-list-item {
    // width: 180px;
    height: 60px;
    margin-top: 10px;
    margin-left: 24px;
    padding-left: 24px;
    padding-right: 24px;
    line-height: 60px;
    background: #fff;
    text-align: center;
    color: #666666;
    border: 1px #cccccc solid;
    font-size: 24px;
    border-radius: 30px;
    float: left;

    &.active {
      border-color: #1969C6;

      .b-pop-button-cnt-list-item-name {
        color: #1969C6;
      }
    }
  }

</style>
