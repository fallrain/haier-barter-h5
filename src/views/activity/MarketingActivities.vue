<template>
  <div class="activity-bg h100vh">
    <b-search-input
      v-model="searchVal"
      @search="searchByCondition"
      placeholder="输入产品型号进行搜索"
    >
    </b-search-input>
    <div class="activity-tab-bg activity-tab">
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
            @shareClick="shareClick">
          </b-drainage-activity>
        </div>
      </div>

    </div>

    <md-popup
      v-model="isPopupShow"
      position="bottom"
      class="md-popup-class"
    >
      <md-popup-title-bar
        large-radius
        @confirm="hidePopUp('bottom')"
        @cancel="hidePopUp('bottom')"
      ></md-popup-title-bar>
      <div class="drainage-popup-items">
        <div class="drainage-popup-item" @click="shareWechat">

          <i class="iconfont icon-weixin drainage-popup-img"/>
          <div>
            <span class="drainage-popup-title">分享微信好友</span>
          </div>
          <div>
            <span class="drainage-popup-tip">转发到聊天</span>
          </div>

        </div>
        <div class="drainage-popup-item" @click="shareImg">

          <i class="iconfont icon-tupian drainage-popup-img1"/>
          <div>
            <span class="drainage-popup-title">生成分享图片</span>
          </div>
          <div>
            <span class="drainage-popup-tip">长按保存图片可分享</span>
          </div>

        </div>
      </div>
      <div class="popup-cancle" @click="drainageCancle">
        取消
      </div>
    </md-popup>
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
    [Popup.name]: Popup,
    [PopupTitleBar.name]: PopupTitleBar,
    [Button.name]: Button,
    [Icon.name]: Icon,
  },
  data() {
    return {
      userInfo: {},
      current: 0,
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
    };
  },
  methods: {
    upCallback(page) {
      // 下载过就设置已经初始化
      this[this.curScrollViewName].isListInit = true;
      this.search(page).then(({ result, pages }) => {
        this.$nextTick(() => {
          // 通过当前页的数据条数，和总数据量来判断是否加载完
          if (result) {
            this[this.curScrollViewName].mescroll.endBySize(result.length, pages);
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
      return this.activityService.queryActivityInfoListForHmc({
        activityType: '',
        keyWord: this.searchVal,
        microCode: '',
        channelType: ''
        // microCode: this.userInfo.storeInfo.microCode,
        // channelType: this.userInfo.storeInfo.mchannel,
        // storeId: this.userInfo.storeInfo.storeId,
        // productGroup: this.userInfo.productGroups,
      }, {
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
      this.isPopupShow = true;
    },
    shareWechat() {
      const opstion = {
        title: '1111', // 分享标题
        link: `${window.location.href}?home=1`,
        imgUrl: '', // 分享图标
        dec: '2222',
        success() {
        },
        error() {
        }
      };
      wx.onMenuShareAppMessage({
        title: opstion.title, // 分享标题
        link: opstion.link, // 分享链接
        imgUrl: opstion.imgUrl, // 分享图标
        desc: opstion.dec, // 分享描述
        success() {
          opstion.success();
        },
        cancel() {
          opstion.error();
        }
      });
    },
    shareImg() {
      // console.log(this.currentActivity);
      this.activityService.generateQrcode('http://baidu.com/', '123456', '9999').then((res) => {
        this.bUtil.downloadFile(res.data);
      });
      // return this.activityService.generateQrcode('http://baidu.com/', this.getData.id, this.getData.createdBy).then((res) => {
      //   this.bUtil.downloadFile(res.data);
      // });
    },
    getProductGroup() {
      this.productService.industryGroup()
        .then((res) => {
          if (res.code === 1) {
            this.productGroupName = res.data;
          }
        });
    },
  },
  created() {
    this.getProductGroup();
    this.baseService.userInfo().then((res) => {
      if (res.code === 1) {
        this.userInfo = res.data;
      }
    });
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
  watch: {
    current(val) {
      const obj = {
        0: 'scrollViewRightsActivity',
        1: 'scrollViewDrainageActivity'
      };
      const viewName = obj[val];

      // tab切换后，创建新MeScroll对象（若无创建过），没有加载过则加载
      this.bUtil.scroviewTabChange(viewName, this);
    }
  },
  mounted() {
    this.bUtil.scroviewTabChange(this.curScrollViewName, this);
  },
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
</style>
