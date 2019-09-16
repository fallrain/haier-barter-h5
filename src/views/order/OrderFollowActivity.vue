<template>
  <div>
    <div class="activity-tab-bg activity-tab">
      <md-tab-bar
        v-model="current"
        :items="items"
        :hasInk="false"
      />
    </div>

    <div
      class="reportInstallList-view"
      v-show="curScrollViewName==='scrollViewActivity'">
      <div
        id="scrollViewActivity"
        ref="scrollViewActivity"
        class="mescroll"

      >
        <div>
          <b-activity-item
            v-for="(item,index) in scrollViewActivity.list"
            :key="index"
            :getData.sync="item"
            :isFinish="false"
            @minusCount="minusCount"
            @addCount="addCount"
            :hasData="false"
            @showLimit="showLimit"
            @showConfig="showConfig"
          ></b-activity-item>
        </div>
      </div>
    </div>
    <div class="reportInstallList-view"
         v-show="curScrollViewName==='scrollViewFinish'">
      <div
        id="scrollViewFinish"
        ref="scrollViewFinish"
        class="mescroll"

      >
        <div>
          <b-activity-item
            v-for="(item,index) in scrollViewFinish.list"
            :key="index"
            :getData.sync="item"
            :isFinish="true"
            :hasData="false"
            @showLimit="showLimit"
            @showConfig="showConfig"
          ></b-activity-item>
        </div>
      </div>
    </div>
    <button
      type="button"
      class="common-submit-btn-default mt23"
      @click="btmConfirmClick"
    >确定</button>
  </div>
</template>

<script>
import {
  TabBar,
} from 'mand-mobile';

import {
  BActivityItem
} from '@/components/form';

export default {
  name: 'OrderFollowActivity',
  components: {
    [TabBar.name]: TabBar,
    BActivityItem,
  },
  data() {
    return {
      currentList:[],
      subInfo:{},
      current: 0,
      orderNo:'',
      items: [{
        name: 0,
        label: '可参与活动'
      }, {
        name: 1,
        label: '不可参与活动'
      }],
      isFinished: false,
      scrollViewActivity: {
        mescroll: null,
        list: [
          {
            title: '6月场景套权益昆明小微',
            reason: '套餐价格不符合',
            brand: '海尔，卡萨帝',
            scope: '所有产品',
            data: '2019-07-30至2019-08-02',
            data2: '2019-08-30至2019-09-02',
            type: '海贝积分',
            product: [{
              name: 'KFR-35GW/A4RCA21AU1套机空调 + 50T82电视',
              gift: '7500积分',
              count: '666',
              remain: '222',
            }, {
              name: '50T82电视',
              gift: '500积分233222222222222333vvervevrdfvsrftbrthytnjuykuikiuktgteegtgythh235456',
              count: '6',
              remain: '2',
            }
            ]
          }, {
            title: '6月场景套权益昆明小微',
            reasn: '',
            brand: '海尔，卡萨帝',
            scope: '所有产品',
            data: '2019-07-30至2019-08-02',
            data2: '2019-08-30至2019-09-02',
            type: '海贝积分',
          }
        ],
        isListInit: false
      },
      rightsJson:'',
      scrollViewFinish: {
        mescroll: null,
        list: [
          {
            title: '666666',
            reason: '套餐价格不符合',
          },
        ],
        isListInit: false
      },
    };
  },
  computed: {
    curScrollViewName() {
      // 当前tab下的scrollView的ref名字
      return {
        0: 'scrollViewActivity',
        1: 'scrollViewFinish'
      }[this.current];
    }
  },
  watch: {
    current(val) {
      const obj = {
        0: 'scrollViewActivity',
        1: 'scrollViewFinish'
      };
      const viewName = obj[val];
      // tab切换后，创建新MeScroll对象（若无创建过），没有加载过则加载
      this.bUtil.scroviewTabChange(viewName, this);
    }
  },
  mounted() {
    this.bUtil.scroviewTabChange(this.curScrollViewName, this);
  },
  created(){


  },
  methods: {
    upCallback(page) {
      // 下载过就设置已经初始化
      this[this.curScrollViewName].isListInit = true;
      this.search(page).then(({ result, pages }) => {
        this.$nextTick(() => {
          // 通过当前页的数据条数，和总数据量来判断是否加载完
          this[this.curScrollViewName].mescroll.endBySize(result.length, pages);
        });
      });
    },
    minusCount(item,count){
      this.rightsService.uncheckedOrderRights({orderNo:this.OrderNo,rightsNo:item.rightsNo},{}).then(res => {
        if(res.code === 1){
          // if(res.isOptional == 1){
          //   this.$set(item,'minesGray',false)
          // }else {
          //   this.$set(item,'minesGray',true)
          // }
          if(res.selectedNum === 0){
            this.$set(item,'minesGray',true)
          }else {
            this.$set(item,'minesGray',false)
          }

        }
      })

    },
    addCount(item){
      this.rightsService.checkedOrderRights({orderNo:this.OrderNo,rightsNo:item.rightsNo},{}).then(res => {
        if(res.code === 1){
          if(res.isOptional == 1){
            this.$set(item,'addGray',false)
          }else {
            this.$set(item,'addGray',true)
          }
        }
      })
    },
    showConfig(item){
      if(this.subInfo.orderType === 'single'){
        this.rightsService.queryRightsSingleConfigList({rightsNo:item.rightsNo},{}).then(res => {
            if(res.code === 1){
              item.configList = res.data
            }
        })
      }else {
        this.rightsService.queryRightsSetsByRightsNo({rightsNo:item.rightsNo},{}).then(res => {
          if(res.code === 1){
            item.configList = res.data
          }
        })
      }

    },
    showLimit(item){
    this.rightsService.queryRightsLimitConfigList({limitType:'model',rightsNo:item.rightsNo},{}).then(res => {
      if(res.code === 1){
          item.limitList = res.data
      }

    })


    },
    btmConfirmClick(){
      this.rightsService.confirmSelectedOrderRights({orderNo:this.orderNo},{}).then(res => {
          if(res.code === 1){
              this.rightsJson = res.data
          }
      })

    },
      search(page) {
      // todo
      this.subInfo = this.$route.params.orderInfo
      this.orderNo = this.subInfo.orderNo
      const formData = {
        pageNum: page.num,
        pageSize: page.size,
      };
      if(this.current === 0){
        this.rightsService.queryOrderOptionalRights(JSON.parse(this.subInfo),{}).then(res =>{
          debugger
          const sroviewObj = {};
          if(res.code === 1){

            const {
              result,
              pages
            } = res.data;
            sroviewObj.pages = pages;
            sroviewObj.result = result;
            if(result && result.length > 0){
              const list = result
              this.anylizeData(list)
            }
            this[this.curScrollViewName].list = this.currentList
          }else {
            this[this.curScrollViewName].mescroll.endErr();
          }
          return sroviewObj;
        })
      }else{
        this.rightsService.queryOrderNotOptionalRights(JSON.parse(this.subInfo),{}).then(res =>{
          debugger
          const sroviewObj = {};
          if(res.code === 1){
            debugger
            const {
              result,
              pages
            } = res.data;
            sroviewObj.pages = pages;
            sroviewObj.result = result;
            if(result && result.length > 0){
              const list = result
              this.anylizeData(list)
            }
            this[this.curScrollViewName].list = this.currentList

          }else {
            this[this.curScrollViewName].mescroll.endErr();
          }
          return sroviewObj;
        })
      }


    },
    anylizeData(curlist){
        curlist.forEach(item => {
            this.$set(item,'minesGray',true)
          if(item.isOptional === 1 ){
            this.$set(item,'addGray',false)
          }else {
            this.$set(item,'addGray',true)
          }

        })
      this.currentList = curlist
    }
  },
  beforeRouteLeave(to, from, next) {
    const obj = { rightsJson: this.rightsJson };

    if (to.name === 'Order.OrderEntry' || 'Order.OrderModify') {
      to.query.temp = JSON.stringify(obj);
    }
    next();// 必须要有这个，否则无法跳转
  },
};
</script>

<style lang="scss">

  .reportInstallList-view {
    height: calc(100vh - 108px);
  }

  .activity-tab-bg {
    .md-tab-bar {
      padding-left: 24px;
      padding-right: 24px;
      margin-top: 24px;
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

  .salesVerification-view {
    height: calc(100vh - 84px);
  }
  .common-submit-btn-default{
    /*position: fixed;*/
    width: 90%;
    margin-left: 5%;
    /*margin-bottom: 20px;*/
    position: absolute;
    bottom: 20px;
  }
</style>
