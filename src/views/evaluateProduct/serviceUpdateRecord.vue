<template>
  <div class="container">
    <div class="reportInstallList-tab">
      <md-tab-bar v-model="curTab" :items="tabs" :hasInk="false"></md-tab-bar>
      <div class="count-class">共{{this[this.curScrollViewName].total}}人</div>
    </div>

    <div
       id="scrollViewAll"
       ref="scrollViewAll"
       class="mescroll scrollView"
       v-show="curTab===1">
      <b-evaluate-member-item
      :userlist="scrollViewAll.list"
      ></b-evaluate-member-item>
    </div>
    <div
      id="scrollViewContacted"
      ref="scrollViewContacted"
      class="mescroll scrollView"
      v-show="curTab===2">
      <b-evaluate-member-item
        :userlist="scrollViewContacted.list"
      ></b-evaluate-member-item>
    </div>
    <div
      id="scrollViewNoContact"
      ref="scrollViewNoContact"
      class="mescroll scrollView"
      v-show="curTab===3">
      <b-evaluate-member-item
        :userlist="scrollViewNoContact.list"
      ></b-evaluate-member-item>
    </div>
  </div>
</template>

<script>
import BEvaluateMemberItem from '@/components/business/evaluateProduct/BEvaluateMemberItem';
import {
  TabBar
} from 'mand-mobile';

export default {
  name: 'serviceUpdateRecord',
  components: {
    'md-tab-bar': TabBar,
    BEvaluateMemberItem
  },
  data() {
    return {
      // 当前选中tab
      curTab: 1,
      // tabs
      tabs: [
        {
          name: 1,
          label: '全部'
        },
        {
          name: 2,
          label: '已联系'
        },
        {
          name: 3,
          label: '未联系'
        }
      ],
      scrollViewAll: {
        mescroll: null,
        isListInit: false,
        list: [],
        total: 0
      },
      scrollViewContacted: {
        mescroll: null,
        isListInit: false,
        list: [],
        total: 0
      },
      scrollViewNoContact: {
        mescroll: null,
        isListInit: false,
        list: [],
        total: 0
      },
      userList: [],
      // 产品组数据
      industryAy: [],
      industryData: {},
      openId: ''
    };
  },
  created() {
    this.openId = JSON.parse(localStorage.getItem('userinfo')).openId;
  },
  computed: {
    curScrollViewName() {
      // 当前tab下的scrollView的ref名字
      return {
        1: 'scrollViewAll',
        2: 'scrollViewContacted',
        3: 'scrollViewNoContact'
      }[this.curTab];
    }
  },
  watch: {
    curTab(val) {
      const obj = {
        1: 'scrollViewAll',
        2: 'scrollViewContacted',
        3: 'scrollViewNoContact'
      };
      const viewName = obj[val];
      // tab切换后，创建新MeScroll对象（若无创建过），没有加载过则加载
      this.bUtil.scroviewTabChange(viewName, this);
    }
  },
  mounted() {
    // 创建当前tab的MeScroll对象，并下拉刷新
    this.bUtil.scroviewTabChange(this.curScrollViewName, this);
  },
  filters: {
    industryFilter(val) {
      return this.industryData[val] || '';
    }
  },
  methods: {
    upCallback(page) {
      // 下载过就设置已经初始化
      this[this.curScrollViewName].isListInit = true;
      this.query(page, this.getType(this.curScrollViewName)).then(({ code, data }) => {
        if (code === 1) {
          const {
            result,
            total
          } = data;
          this.$nextTick(() => {
            this.getIndustryList().then(() => {
              result.forEach((v) => {
                v.isChecked = false;
                v.industryName = this.industryData[v.industry];
              });
              if (page.num === 1) {
                this[this.curScrollViewName].list = result;
                document.querySelector('.scrollView').scrollTo(0, 0);
              } else {
                this[this.curScrollViewName].list = this[this.curScrollViewName].list.concat(result);
                console.log(this[this.curScrollViewName].list);
              }
              // 通过当前页的数据条数，和总数据量来判断是否加载完
              this[this.curScrollViewName].mescroll.endBySize(result.length, total);
              this[this.curScrollViewName].total = total;
            });
          });
        } else {
          this[this.curScrollViewName].mescroll.endErr();
        }
      });
    },
    getIndustryList() {
      /* 获取产业数据 */
      if (this.industryAy.length) {
        return Promise.resolve(this.industryAy);
      }
      return this.campaignService.listOldForNewIndustry().then(({ code, data }) => {
        if (code === 1) {
          this.convertIndustryList(data);
          this.industryAy = data;
        }
        return this.industryAy;
      });
    },
    convertIndustryList(industryData) {
      // 用来避免多次循环显示产业名的object
      industryData.forEach((v) => {
        this.industryData[v.industry] = v.industryName;
      });
    },
    query(page, type) {
      /* 按照临促人员openId查询估价列表 */
      return this.campaignService.getOldForNewQueryList({
        // openId: this.openId,
        openId: 'oxWgn45tr-Nk-uVKemFDLblYc49I',
        queryType: type,
        pageNo: page.num,
        pageSize: page.size,
      });
    },
    getType(name) {
      if (name === 'scrollViewAll') {
        return 0;
      }
      if (name === 'scrollViewContacted') {
        return 1;
      }
      if (name === 'scrollViewNoContact') {
        return 2;
      }
    }
  }
};
</script>

<style lang="scss">
  .scrollView{
    height: calc(100vh - 120px);
  }
.reportInstallList-tab {
  display: flex;
  flex-direction: row;
  background-color: white;
  align-items: center;
  margin-bottom: 20px;

  .md-tab-bar {
    flex-grow: 1;
    background-color: #fff;
    border-bottom: 2px solid #eee;
  }
  .count-class {
    width: 100px;
    font-size: 24px;
  }
}
</style>
