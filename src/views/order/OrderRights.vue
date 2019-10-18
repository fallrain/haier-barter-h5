<template>
  <div>
    <div class="activity-tab-bg activity-tab">
      <md-tab-bar
        v-model="current"
        :items="items"
        :hasInk="false"
      />
    </div>
        <div>
          <b-activity-item
            v-for="(item,index) in rightListTest"
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
    <!--<div class="reportInstallList-view"-->
         <!--v-show="curScrollViewName==='scrollViewFinish'">-->
      <!--<div-->
        <!--id="scrollViewFinish"-->
        <!--ref="scrollViewFinish"-->
        <!--class="mescroll"-->

      <!--&gt;-->
        <!--<div>-->
          <!--<b-activity-item-->
            <!--v-for="(item,index) in scrollViewFinish.list"-->
            <!--:key="index"-->
            <!--:getData.sync="item"-->
            <!--:isFinish="true"-->
            <!--:hasData="false"-->
            <!--@showLimit="showLimit"-->
            <!--@showConfig="showConfig"-->
          <!--&gt;</b-activity-item>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <!--<button-->
      <!--type="button"-->
      <!--class="common-submit-btn-default1 mt23"-->
      <!--@click="btmConfirmClick"-->
    <!--&gt;确定</button>-->
  </div>
</template>

<script>
import {
  TabBar,
  Toast
} from 'mand-mobile';
import {
  BActivityItem
} from '@/components/form';
import rightListTest from '@/lib/address/rightsJson.js';

export default {
  name: 'OrderFollowActivity',
  components: {
    [TabBar.name]: TabBar,
    BActivityItem,
    Toast
  },
  data() {
    return {
      rightListTest: [],
      selectRightsList: [],
      residueRightsList: [],
      currentList: [],
      subInfo: {},
      current: 0,
      orderNo: '',
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
          // {
          //   title: '6月场景套权益昆明小微',
          //   reason: '套餐价格不符合',
          //   brand: '海尔，卡萨帝',
          //   scope: '所有产品',
          //   data: '2019-07-30至2019-08-02',
          //   data2: '2019-08-30至2019-09-02',
          //   type: '海贝积分',
          //   product: [{
          //     name: 'KFR-35GW/A4RCA21AU1套机空调 + 50T82电视',
          //     gift: '7500积分',
          //     count: '666',
          //     remain: '222',
          //   }, {
          //     name: '50T82电视',
          //     gift: '500积分233222222222222333vvervevrdfvsrftbrthytnjuykuikiuktgteegtgythh235456',
          //     count: '6',
          //     remain: '2',
          //   }
          //   ]
          // }, {
          //   title: '6月场景套权益昆明小微',
          //   reasn: '',
          //   brand: '海尔，卡萨帝',
          //   scope: '所有产品',
          //   data: '2019-07-30至2019-08-02',
          //   data2: '2019-08-30至2019-09-02',
          //   type: '海贝积分',
          // }
        ],
        isListInit: false
      },
      rightsJson: '',
      scrollViewFinish: {
        mescroll: null,
        list: [
          // {
          //   title: '666666',
          //   reason: '套餐价格不符合',
          // },
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
  // watch: {
  //   current(val) {
  //     const obj = {
  //       0: 'scrollViewActivity',
  //       1: 'scrollViewFinish'
  //     };
  //     const viewName = obj[val];
  //
  //     // tab切换后，创建新MeScroll对象（若无创建过），没有加载过则加载
  //     this.bUtil.scroviewTabChange(viewName, this);
  //   }
  // },
  mounted() {
    // this.bUtil.scroviewTabChange(this.curScrollViewName, this);
  },
  created() {
    this.rightListTest = rightListTest;
    this.residueRightsList = rightListTest;
    this.rightListTest.forEach((rights) => {
      rights.flag = 0;
    });
    this.anylizeData(rightListTest);
  },
  methods: {
    // upCallback(page) {
    //   // 下载过就设置已经初始化
    //   this[this.curScrollViewName].isListInit = true;
    //   this.search(page).then(({ result, pages }) => {
    //     this.$nextTick(() => {
    //       // 通过当前页的数据条数，和总数据量来判断是否加载完
    //       this[this.curScrollViewName].mescroll.endBySize(result.length, pages);
    //     });
    //   });
    // },
    minusCount(item) {
      // // 单品
      // if (item.rightsType === 'single') {
      //   // 同享
      //   item.rightsSelectedGroupDtoList.shift();
      //   let isReturn = false
      //   item.allowRightsConditionDtoList.forEach((rights) => {
      //     if (!isReturn) {
      //       if (rights.flag !== 0) {
      //         rights.flag = 0;
      //         item.selectedNum--;
      //         this.$set(item, 'selectedNum', item.selectedNum);
      //         this.$set(item, 'isSelected', item.selectedNum);
      //         isReturn = true
      //       }
      //     }
      //   });
      // } else {
      //   //套购同享
      //   let isReturn = false
      //   item.rightsSelectedGroupDtoList.shift();
      //   let present = []
      //   item.allowRightsConditionDtoList.forEach((rights) => {
      //     if (!isReturn) {
      //       if (rights.flag !== 0) {
      //         rights.flag = 0;
      //         item.selectedNum--;
      //         present = rights.orderIdList
      //         this.$set(item, 'selectedNum', item.selectedNum);
      //         this.$set(item, 'isSelected', item.selectedNum);
      //         isReturn = true
      //       }
      //     }
      //     rights.orderIdList.forEach(ri => {
      //       if (present.length > 0) {
      //         for (var i = 0; i < present.length; i++) {
      //           if (ri === present[i]) {
      //             this.$set(rights, 'flag', 0);
      //           }
      //         }
      //       }
      //     })
      //   });
      // }
      // if(item.isOptional = 0){
      //   this.$set(item,'isOptional',1)
      // }
      // this.anylizeData(this.rightListTest)
      /** **************互斥********************** */
      // 单品
      if (item.rightsType === 'single') {
        this.$set(item, 'isOptional', 1);
        this.$set(item, 'isSelected', 0);
        this.$set(item, 'selectedNum', 0);
        const present = item.allowRightsConditionDtoList;
        this.rightListTest.forEach((rights) => {
          rights.allowRightsConditionDtoList.forEach((ri) => {
            if (present.length > 0) {
              for (let i = 0; i < present.length; i++) {
                if (ri.orderId === present[i].orderId) {
                  this.$set(rights, 'isOptional', 1);
                }
              }
            }
          });
        });
      } else {
        // 套购同享
        this.$set(item, 'isOptional', 1);
        this.$set(item, 'isSelected', 0);
        this.$set(item, 'selectedNum', 0);
        const present = item.allowRightsConditionDtoList;
        this.rightListTest.forEach((rights) => {
          if(rights != item) {
            if(!rights.isOptional){
              rights.allowRightsConditionDtoList.forEach((ri) => {
                ri.orderIdList.forEach((id) => {
                  present.forEach(pre => {
                    if (this.array_contain(pre.orderIdList, id)) {
                      this.$set(rights, 'isOptional', 1);
                    }
                  })
                });
              });
            }
          }
        });
      }
      this.anylizeData(this.rightListTest);
    },

    addCount(item) {
      // 单品
      // if (item.rightsType === 'single') {
      //   // 同享
      //   let isReturn = false
      //   item.allowRightsConditionDtoList.forEach((rights) => {
      //     if(!isReturn){
      //       if (rights.flag !== 1) {
      //         this.$set(rights,'flag',1);
      //         item.rightsSelectedGroupDtoList.push(rights);
      //         item.selectedNum++;
      //         this.$set(item, 'selectedNum', item.selectedNum);
      //         this.$set(item, 'isSelected', item.selectedNum);
      //         isReturn = true
      //       }
      //     }
      //   });
      //   if (item.allowRightsConditionDtoList.length === item.rightsSelectedGroupDtoList.length) {
      //     this.$set(item, 'isOptional', 0);
      //   }
      // }else {
      //   // 套购
      //   debugger
      //   let isReturn = false
      //   let present = []
      //   item.allowRightsConditionDtoList.forEach((rights) => {
      //     if(!isReturn) {
      //       if (rights.flag !== 1) {
      //         this.$set(rights, 'flag', 1);
      //         item.rightsSelectedGroupDtoList.push(rights);
      //         present = rights.orderIdList
      //         item.selectedNum++;
      //         this.$set(item, 'selectedNum', item.selectedNum);
      //         this.$set(item, 'isSelected', item.selectedNum);
      //         isReturn = true
      //       }
      //     }
      //     rights.orderIdList.forEach(ri => {
      //       if(present.length > 0){
      //         for(var i = 0;i < present.length;i ++){
      //           if(ri === present[i]){
      //             this.$set(rights, 'flag', 1);
      //           }
      //         }
      //       }
      //     })
      //   })
      //   let num = 0
      //   item.allowRightsConditionDtoList.forEach(rights => {
      //     if(rights.flag === 1){
      //       num ++
      //     }
      //   })
      //   if(num === item.allowRightsConditionDtoList.length){
      //     this.$set(item, 'isOptional', 0);
      //   }
      // }
      //
      // this.anylizeData(this.rightListTest)

      /** ************互斥***************** */
      // 单品
      if (item.rightsType === 'single') {
        this.$set(item, 'isSelected', 1);
        this.$set(item, 'isOptional', 0);
        this.$set(item, 'selectedNum', 1);
        const present = item.allowRightsConditionDtoList;
        this.rightListTest.forEach((rights) => {
          rights.allowRightsConditionDtoList.forEach((ri) => {
            if (present.length > 0) {
              for (let i = 0; i < present.length; i++) {
                if (ri.orderId === present[i].orderId) {
                  this.$set(rights, 'isOptional', 0);
                }
              }
            }
          });
        });
      } else {
        // 套购
        this.$set(item, 'isSelected', 1);
        this.$set(item, 'isOptional', 0);
        this.$set(item, 'selectedNum', 1);
        debugger
        const present = item.allowRightsConditionDtoList;
        this.rightListTest.forEach((rights) => {
          if(rights != item) {
            if(rights.isOptional){
              rights.allowRightsConditionDtoList.forEach((ri) => {
                ri.orderIdList.forEach((id) => {
                  present.forEach(pre => {
                    if (this.array_contain(pre.orderIdList, id)) {
                      this.$set(rights, 'isOptional', 0);
                    }
                  })

                });
              });
            }
          }
          });

      }
      this.anylizeData(this.rightListTest);
    },

    array_contain(array, obj) {
      debugger
      return array.find(v => v === obj);
    },
    showConfig(item) {
      if (this.subInfo.orderType === 0) {
        this.rightsService.queryRightsSingleConfigList({}, { rightsNo: item.rightsNo },).then((res) => {
          if (res.code === 1) {
            if (res.data.length > 0) {
              item.isShowConfig = true;
              item.configList = res.data;
            } else {
              item.configList = [];
            }
          }
        });
      } else {
        this.rightsService.queryRightsSetsByRightsNo({}, { rightsNo: item.rightsNo }).then((res) => {
          if (res.code === 1) {
            if (res.data.length > 0) {
              item.isShowConfig = true;
              item.configList = res.data;
            } else {
              item.configList = [];
            }
          }
        });
      }
    },
    showLimit(item) {
      this.rightsService.queryRightsLimitConfigList({}, { limitType: 'model', rightsNo: item.rightsNo }).then((res) => {
        if (res.code === 1) {
          item.limitList = res.data;
        }
      });
    },
    btmConfirmClick() {
      this.rightsService.confirmSelectedOrderRights({}, { orderNo: this.orderNo }).then((res) => {
        if (res.code === 1) {
          this.rightsJson = JSON.stringify(res.data);
          this.$router.go(-1);
        }
      });
    },
    search(page) {
      // todo
      this.subInfo = JSON.parse(this.$route.params.orderInfo);
      this.orderNo = this.subInfo.orderNo;
      if (this.current === 0) {
        return this.rightsService.queryOrderOptionalRights(this.subInfo, {
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
            if (result && result.length > 0) {
              const list = result;
              console.log('currentList', list);
              this.anylizeData(list);
            }
            if (page.num === 1) {
              this[this.curScrollViewName].list = [];
              this[this.curScrollViewName].list = this.currentList;
            } else {
              this[this.curScrollViewName].list = this[this.curScrollViewName].list.concat(this.currentList);
            }
          } else {
            Toast.failed(res.msg);
            this[this.curScrollViewName].mescroll.endErr();
          }
          return sroviewObj;
        });
      }
      return this.rightsService.queryOrderNotOptionalRights(this.subInfo, {
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
          if (result && result.length > 0) {
            this.currentList = result;
            this[this.curScrollViewName].list = this.currentList;
          } else {
            Toast.info('暂无数据');
          }
        } else {
          Toast.failed(res.msg);
          this[this.curScrollViewName].mescroll.endErr();
        }
        return sroviewObj;
      });
    },
    anylizeData(curlist) {
      console.log('curlist', curlist);

      curlist.forEach((item) => {
        // if (item.rightsBrand = '000') {
        //   ;
        //   item.rightsBrandC = '海尔';
        // } else if (item.rightsBrand = '051') {
        //   ;
        //   item.rightsBrandC = '卡萨帝';
        // } else {
        //   item.rightsBrandC = '统帅';
        // }
        this.$set(item, 'minesGray', true);
        if (item.isOptional === 1) {
          this.$set(item, 'addGray', false);
        } else {
          this.$set(item, 'addGray', true);
        }
        if (item.selectedNum !== 0) {
          debugger;
          this.$set(item, 'minesGray', false);
        }
      });
      this.rightListTest = curlist;
    }
  },
  beforeRouteLeave(to, from, next) {
    const obj = { rightsJson: this.rightsJson };

    if (to.name === 'Order.OrderEntry' || 'Order.OrderModify') {
      to.query.temp = JSON.stringify(obj);
      debugger;
      // 此处判断是如果返回上一层，你可以根据自己的业务更改此处的判断逻辑，酌情决定是否摧毁本层缓存。
      if (this.$vnode && this.$vnode.data.keepAlive) {
        if (this.$vnode.parent && this.$vnode.parent.componentInstance && this.$vnode.parent.componentInstance.cache) {
          if (this.$vnode.componentOptions) {
            const key = this.$vnode.key == null
              ? this.$vnode.componentOptions.Ctor.cid + (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '')
              : this.$vnode.key;
            const cache = this.$vnode.parent.componentInstance.cache;
            const keys = this.$vnode.parent.componentInstance.keys;
            if (cache[key]) {
              if (keys.length) {
                const index = keys.indexOf(key);
                if (index > -1) {
                  keys.splice(index, 1);
                }
              }
              delete cache[key];
            }
          }
        }
      }
      this.$destroy();
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
  @mixin mix-submit-btn {
    width: 100%;
    height: 84px;
    font-size: 34px;
    border-radius: 8px;
  }
  .common-submit-btn-default1{
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
