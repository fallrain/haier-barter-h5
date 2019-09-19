<template>
  <div>
    <div class="activity-tab-bg activity-tab">
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
            :hasData="true"
            :getData.sync="item"
          ></b-activity-item>
        </div>
      </div>
    </div>
    </div>
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
       return 'scrollViewActivity'

      }
    },
    watch: {
      current(val) {
        const obj = {
          0: 'scrollViewActivity',
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

      showLimit(item){
        this.rightsService.queryRightsLimitConfigList({limitType:'model',rightsNo:item.rightsNo},{}).then(res => {
          if(res.code === 1){
            item.limitList = res.data
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
          this.rightsService.queryRightsResidue().then(res =>{
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

      },
      anylizeData(curlist){
        this.currentList = curlist
      }
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
  @mixin mix-submit-btn {
    width: 100%;
    height: 84px;
    font-size: 34px;
    border-radius: 8px;
  }
  .common-submit-btn-default{
    @include mix-submit-btn;
    color: #fff;
    background: #1969C6;
    /*position: fixed;*/
    width: 90%;
    margin-left: 5%;
    /*margin-bottom: 20px;*/
    position: absolute;
    bottom: 20px;
  }
</style>
