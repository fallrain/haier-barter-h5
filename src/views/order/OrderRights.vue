<template>
  <div>
    <div class="activity-tab-bg activity-tab">
      <md-tab-bar
        v-model="current"
        :items="items"
        :hasInk="false"
      />
    </div>
        <div v-show="current === 0">
          <p class="right-p" @click="shareRightsClick">同享活动
            <i class="iconfont icon-xialaactive-copy" v-show="shareShow"></i>
            <i class="iconfont icon-jiantou9" v-show="!shareShow"></i>
          </p>

          <b-activity-item
            v-for="(item,index) in shareRightsList"
            :key="index"
            :getData.sync="item"
            :isFinish="false"
            :residueGift="false"
            @minusCount="minusCount"
            @addCount="addCount"
            :hasData="false"
            @showLimit="showLimit"
            @showConfig="showConfig"
            v-show="shareShow"
          ></b-activity-item>

          <p class="right-p" @click="mutexRightsClick">互斥活动
            <i class="iconfont icon-xialaactive-copy" v-show="mutexShow"></i>
            <i class="iconfont icon-jiantou9" v-show="!mutexShow"></i>
          </p>
          <b-activity-item
            v-for="(item,index) in mutexRightsList"
            :key="index"
            :getData.sync="item"
            :isFinish="false"
            :residueGift="false"
            @minusCount="minusMCount"
            @addCount="addMCount"
            :hasData="false"
            @showLimit="showLimit"
            @showConfig="showConfig"
            v-show="mutexShow"
          ></b-activity-item>
        </div>
    <!--<div v-show="current === 1">-->
      <!--<b-activity-item-->
        <!--v-for="(item,index) in notOptionalList"-->
        <!--:key="index"-->
        <!--:getData.sync="item"-->
        <!--:isFinish="true"-->
        <!--:hasData="false"-->
        <!--@showLimit="showLimit"-->
        <!--@showConfig="showConfig"-->
      <!--&gt;</b-activity-item>-->
    <!--</div>-->
    <div class="reportInstallList-view"
         v-show="current === 1">
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
            :residueGift="false"
            :hasData="false"
            @showLimit="showLimit"
            @showConfig="showConfig"
          ></b-activity-item>
        </div>
      </div>
    </div>
      <button
        type="button"
        class="common-submit-btn-default3"
        @click="btmConfirmClick"
      >确定</button>
    <div class="bottom-height">
    </div>
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
      productGroupName:[],
      rightsDetailList: [],
      nameList: [],
      idList: [],
      rightsUserDto: [],
      rightListTest: [],
      residueRightsList: [],
      shareRightsList: [],
      mutexRightsList: [],
      notOptionalList: [],
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
      rightsJson: '',
      shareShow: false,
      mutexShow: false,
      num: 0,
      scrollViewFinish: {
        mescroll: null,
        list: [
        ],
        isListInit: false
      },
      isFinished: false,
    };
  },

  created() {
    // this.rightListTest = rightListTest;
    // this.residueRightsList = rightListTest;
    // this.rightListTest.forEach((rights) => {
    //   rights.flag = 0;
    // });
    this.getData();
    this.getProductGroup()
    // this.anylizeData(rightListTest);
  },
  computed: {
    curScrollViewName() {
      // 当前tab下的scrollView的ref名字
      // return {
      //   0: 'scrollViewActivity',
      //   1: 'scrollViewFinish'
      // }[this.current];
      return 'scrollViewFinish'
    }
  },
  watch: {
    current(val) {
      if(val === 0){
        // this.getData();
      }else {
        const viewName = 'scrollViewFinish';
        // tab切换后，创建新MeScroll对象（若无创建过），没有加载过则加载
        this.bUtil.scroviewTabChange(viewName, this);
      }
    }
  },
  mounted() {
    this.bUtil.scroviewTabChange(this.curScrollViewName, this);
  },
  methods: {
    upCallback(page) {
      // 下载过就设置已经初始化
      this[this.curScrollViewName].isListInit = true;
      this.searchData(page).then(({ result, total}) => {
        this.$nextTick(() => {
          // 通过当前页的数据条数，和总数据量来判断是否加载完
          this[this.curScrollViewName].mescroll.endBySize(result.length, total);
        });
      });
    },
    shareRightsClick() {
      this.shareShow = !this.shareShow;
      if (!this.shareRightsList.length) {
        this.getData(1);
      }
    },
    mutexRightsClick() {
      this.mutexShow = !this.mutexShow;
      if (!this.mutexRightsList.length) {
        this.getData(2);
      }
    },
    minusCount(item) {
      // 单品
      if (item.rightsType === 'single') {
        debugger;
        // 同享
        item.rightsSelectedGroupDtoList.shift();
        let isReturn = false;
        item.allowRightsConditionDtoList.forEach((rights) => {
          if (!isReturn) {
            if (rights.flag !== 0) {
              rights.flag = 0;
              item.selectedNum--;
              this.$set(item, 'selectedNum', item.selectedNum);
              this.$set(item, 'isSelected', item.selectedNum);
              isReturn = true;
            }
          }
        });
        if (item.isOptional === 0) {
          this.$set(item, 'isOptional', 1);
        }
      } else {
        // 套购同享
        let isReturn = false;
        item.rightsSelectedGroupDtoList.shift();
        let present = [];
        item.allowRightsConditionDtoList.forEach((rights) => {
          if (!isReturn) {
            if (rights.flag !== 0) {
              rights.flag = 0;
              item.selectedNum--;
              present = rights.orderIdList;
              this.$set(item, 'selectedNum', item.selectedNum);
              this.$set(item, 'isSelected', item.selectedNum);
              isReturn = true;
              item.num--;
            }
          }
          if (item.isOptional === 0) {
            this.$set(item, 'isOptional', 1);
          }

          if (rights.flag !== 0) {
            if (this.uniqueArray(rights.orderIdList, present)) {
              this.$set(rights, 'flag', 0);
              item.num--;
            }
          }
        });
      }

      this.anylizeMCData(this.shareRightsList);
    },
    addCount(item) {
      // 单品;
      if (item.rightsType === 'single') {
        // 同享
        let isReturn = false;
        item.allowRightsConditionDtoList.forEach((rights) => {
          if (!isReturn) {
            if (rights.flag !== 1) {
              this.$set(rights, 'flag', 1);
              item.rightsSelectedGroupDtoList.push(rights);
              item.selectedNum++;
              this.$set(item, 'selectedNum', item.selectedNum);
              this.$set(item, 'isSelected', 1);
              isReturn = true;
            }
          }
        });
        if (item.allowRightsConditionDtoList.length === item.rightsSelectedGroupDtoList.length) {
          this.$set(item, 'isOptional', 0);
        }
      } else {
        // 套购
        debugger;
        let isReturn = false;
        // let present = [];
        item.allowRightsConditionDtoList.forEach((rights) => {
          // if (!isReturn) {
          //   if (rights.flag !== 1) {
          //     this.$set(rights, 'flag', 1);
          //     item.rightsSelectedGroupDtoList.push(rights);
          //     present = rights.orderIdList;
          //     item.selectedNum++;
          //     this.$set(item, 'selectedNum', item.selectedNum);
          //     this.$set(item, 'isSelected', 1);
          //     isReturn = true;
          //     item.num++;
          //   }
          // }
          if (rights.flag !== 1) {
            rights.orderIdList.forEach(ri => {
              if (!isReturn) {
                if(ri.flag !== 1) {
                  this.$set(ri, 'flag', 1);
                  // present = ri.ids;
                  rights.selcted = ri.ids
                  item.rightsSelectedGroupDtoList.push(rights);
                  // ri.tempList =  ri.ids
                  // ri.tempList = Array.from(new Set(ri.tempList))
                  item.selectedNum++;
                  this.$set(item, 'selectedNum', item.selectedNum);
                  this.$set(item, 'isSelected', 1);
                  rights.num++;
                  if (rights.num == rights.orderIdList.length) {
                    this.$set(rights, 'flag', 1);
                    item.num++
                  }
                  isReturn = true;
                }
              }
            })
          }
          // if (rights.flag !== 1) {
          //   if (this.uniqueArray(rights.orderIdList, present)) {
          //     this.$set(rights, 'flag', 1);
          //     item.num++;
          //   }
          // }
        });
        if (item.num === item.allowRightsConditionDtoList.length) {
          this.$set(item, 'isOptional', 0);
        }
      }

      this.anylizeMCData(this.shareRightsList);
    },
    minusMCount(item) {
      /** **************互斥********************** */
      // 单品
      if (item.rightsType === 'single') {
        let rightid = '';
        item.rightsSelectedGroupDtoList.shift();
        let isReturn = false;
        item.allowRightsConditionDtoList.forEach((rights) => {
          debugger;
          if (!isReturn) {
            debugger;
            if (rights.flag !== 0) {
              this.$set(rights,'flag',0)
              rightid = rights.orderId;
              item.selectedNum--;
              item.num--
              this.$set(item, 'selectedNum', item.selectedNum);
              this.$set(item, 'isSelected', item.selectedNum);
              isReturn = true;
            }
          }
          if (rights.flag !== 0) {
            if (rights.orderId === rightid) {
              this.$set(rights,'flag',0)
              item.num--
            }
          }
        });
        if (item.isOptional === 0) {
          this.$set(item, 'isOptional', 1);
        }
        this.mutexRightsList.forEach((rights) => {
          rights.allowRightsConditionDtoList.forEach((ri) => {
            // if (ri.flag !== 0) {
              if (!ri.orderId) {
                ri.orderIdList.forEach(id => {
                  if (ri.flag !== 0 || id.tempList.length !== 0){
                    const a = []
                    a.push(rightid);
                    if(this.uniqueArray(a,id.ids)){
                      debugger
                      const index = id.tempList.findIndex(item => item === rightid)
                      const temp = id.tempList.splice(index,1)
                      id.tempList = temp
                      if(id.tempList.length === 0){
                        this.$set(id, 'flag', 0);
                        ri.num --
                        if (rights.isOptional === 0) {
                          this.$set(rights, 'isOptional', 1);
                        }
                      }
                      if(ri.flag === 1){
                        this.$set(ri,'flag',0)
                        if(ri.num === ri.orderIdList.length -1){
                          rights.num--
                        }
                      }
                    }

                  }

                })
              } else {
                if(ri.flag !== 0){
                  if(rightid === ri.orderId) {
                    this.$set(ri, 'flag', 0);
                    rights.num--
                  }
                }
                if (rights.isOptional === 0) {
                  this.$set(rights, 'isOptional', 1);
                }
            }
            // }
          });
        });
      } else {
        // 套购huchi
        let isReturn = false;
        item.rightsSelectedGroupDtoList.shift();
        let present = [];
        item.allowRightsConditionDtoList.forEach((rights) => {
          // if (!isReturn) {
            if (rights.flag !== 0) {
              rights.orderIdList.forEach(ri => {
                if (!isReturn) {
                  if (ri.flag !== 0) {
                    this.$set(ri, 'flag', 0);
                    ri.num --
                    present = ri.ids;
                    ri.tempList = []
                    // for(var i = 0;i < present.length;i ++){
                    //   ri.tempList = ri.tempList.splice(ri.tempList.findIndex(item => item === present[i]))
                    // }
                    item.selectedNum--;
                    this.$set(item, 'selectedNum', item.selectedNum);
                    this.$set(item, 'isSelected', item.selectedNum);
                    rights.num--;
                    if (rights.num === 0) {
                      this.$set(rights, 'flag', 0);
                      item.num--
                    }
                    isReturn = true;
                  }
                }
              })
            }
          // }
          if (item.isOptional === 0) {
            this.$set(item, 'isOptional', 1);
          }

        });
        this.mutexRightsList.forEach((rights) => {
          rights.allowRightsConditionDtoList.forEach((ri) => {
            // if (ri.flag !== 0 ) {
              if (!ri.orderIdList) {
                if (ri.flag !== 0) {
                  const a = []
                  a.push(ri.orderId);
                  if (this.uniqueArray(a, present)) {
                    if (rights.allowRightsConditionDtoList.length === 1 && rights.selectedNum === 1) {
                      return
                    }
                    this.$set(ri, 'flag', 0);
                    rights.num--
                  }
                  if (rights.isOptional === 0) {
                    this.$set(rights, 'isOptional', 1);
                  }
                }
              }else {
                  ri.orderIdList.forEach(r => {
                    if (ri.flag !== 0 || r.tempList.length !== 0) {
                    debugger
                    if (r.flag !== 0) {
                      if (this.uniqueArray(r.ids, present)) {
                        for (var i = 0; i < r.ids.length; i++) {
                          for (var j = 0; j < present.length; j++) {
                            if (r.ids[i] === present[j]) {
                              if (r.tempList.find(item => item === r.ids[i])) {
                                // r.tempList = r.tempList.srplice(r.tempList.findIndex(item => item === r.ids[i]), 1)
                                const index = r.tempList.findIndex(item => item === r.ids[i])
                                const temp = r.tempList.splice(index,1)
                                r.tempList = temp
                              }
                            }
                          }
                        }
                        if (r.tempList.length === 0) {
                          this.$set(r, 'flag', 0);
                          ri.num--
                          if (ri.flag !== 0) {
                            this.$set(ri, 'flag', 0)
                            rights.num--
                          }
                          if (rights.isOptional === 0) {
                            this.$set(rights, 'isOptional', 1);
                          }
                        }
                      }
                    }
                  }
                  })
              }
          // }
          });
        })
      }
      debugger
      this.anylizeMCData(this.mutexRightsList);
    },
    addMCount(item) {
      debugger;
      /** ************互斥***************** */
      // 单品
      if (item.rightsType === 'single') {
        let isReturn = false;
        let rightid = '';
        item.allowRightsConditionDtoList.forEach((rights) => {
          if (!isReturn) {
            if (rights.flag !== 1) {
              this.$set(rights, 'flag', 1);
                rightid = rights.orderId;
              item.rightsSelectedGroupDtoList.push(rights);
              item.selectedNum++;
              item.num ++
              this.$set(item, 'selectedNum', item.selectedNum);
              this.$set(item, 'isSelected', 1);
              isReturn = true;
            }
          }
          if(rights.flag!== 1){
            if(rights.orderId === rightid){
              this.$set(rights, 'flag', 1);
              item.num ++
            }
          }
        });

        if (item.num === item.allowRightsConditionDtoList.length) {
          this.$set(item, 'isOptional', 0);
        }
        this.mutexRightsList.forEach((rights) => {
            rights.allowRightsConditionDtoList.forEach((ri) => {
                if (!ri.orderId) {
                  ri.orderIdList.forEach(r => {
                     if(ri.flag !== 1 ||( r.tempList.length < r.ids.length)){
                       const a = []
                       a.push(rightid);
                       if(this.uniqueArray(a,r.ids)){
                         this.$set(r, 'flag', 1);
                         r.tempList.push(rightid)
                         ri.num ++
                         if(ri.num === ri.orderIdList.length){
                           this.$set(ri,'flag',1)
                           rights.num++
                         }
                       }
                     }
                  })
                }else {
                  if (ri.flag !== 1) {
                    if (rightid === ri.orderId) {
                      this.$set(ri, 'flag', 1);
                      rights.num++;
                    }
                  }
                  }
            });
            if (rights.num === rights.allowRightsConditionDtoList.length) {
              this.$set(rights, 'isOptional', 0);
            }
        });
      } else {
        // 套购
        let isReturn = false;
        let present = [];
        item.allowRightsConditionDtoList.forEach((rights) => {
          // if (!isReturn) {
            if (rights.flag !== 1) {
              rights.orderIdList.forEach(ri => {
                if (!isReturn) {
                if(ri.flag !== 1) {
                  this.$set(ri, 'flag', 1);
                  present = ri.ids;
                  rights.selcted = ri.ids
                  item.rightsSelectedGroupDtoList.push(rights);
                  // ri.tempList =  ri.ids
                  // ri.tempList = Array.from(new Set(ri.tempList))
                  item.selectedNum++;
                  this.$set(item, 'selectedNum', item.selectedNum);
                  this.$set(item, 'isSelected', 1);
                  rights.num++;
                  if (rights.num == rights.orderIdList.length) {
                    this.$set(rights, 'flag', 1);
                    item.num++
                  }
                  isReturn = true;
                }
                }
              })
            }

        });
        if (item.num === item.allowRightsConditionDtoList.length) {
          this.$set(item, 'isOptional', 0);
        }
        this.mutexRightsList.forEach((rights) => {
            rights.allowRightsConditionDtoList.forEach((ri) => {
                if (!ri.orderIdList) {
                  if (ri.flag !== 1 ) {
                    const a = []
                    a.push(ri.orderId);
                    if(this.uniqueArray(a,present)){
                      this.$set(ri, 'flag', 1);
                      rights.num ++
                    }
                  }
                }else {
                  ri.orderIdList.forEach(r => {
                    debugger
                    if (ri.flag !== 1 || (r.tempList.length < r.ids.length)) {
                    if (r.flag !== 1 || ( r.tempList.length < r.ids.length)) {
                      if (this.uniqueArray(r.ids, present)) {
                        this.$set(r, 'flag', 1);
                        ri.num++
                        for (var i = 0; i < r.ids.length; i++) {
                          for (var j = 0; j < present.length; j++) {
                            if (r.ids[i] === present[j]) {
                              if (r.tempList.length === 0) {
                                r.tempList.push(r.ids[i])
                              } else {
                                if (!r.tempList.find(item => item === r.ids[i])) {
                                  r.tempList.push(r.ids[i])
                                }
                              }
                            }
                          }
                        }
                        if (ri.num === ri.orderIdList.length) {
                          this.$set(ri, 'flag', 1)
                          rights.num++
                        }
                      }
                    }
                  }
                  })
                }
            });
            if (rights.num === rights.allowRightsConditionDtoList.length) {
              this.$set(rights, 'isOptional', 0);
            }
        });
      }
      this.anylizeMCData(this.mutexRightsList);
    },
    uniqueArray(array1, array2) {
      const a = array1.length
      const b = array2.length
      const concatA = array1.concat(array2);
      const setArray = Array.from(new Set(concatA));
      if (setArray.length < a + b) {
        return true;
      }
      return false;
    },
    array_contain(array, obj) {
      return array.find(v => v === obj);
    },
    showConfig(item) {
      // if (this.subInfo.orderType === 0) {
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
      // } else {
      //   this.rightsService.queryRightsSetsByRightsNo({}, { rightsNo: item.rightsNo }).then((res) => {
      //     if (res.code === 1) {
      //       if (res.data.length > 0) {
      //         item.isShowConfig = true;
      //         item.configList = res.data;
      //       } else {
      //         item.configList = [];
      //       }
      //     }
      //   });
      // }
    },
    showLimit(item) {
      // item.rightsNo = 'HBR53341494705815552'
      this.rightsService.viewOtherLimited({}, { rightsNo: item.rightsNo }).then((res) => {
        if (res.code === 1) {
          this.$set(item, 'limitList', res.data);
        }
      });
    },
    btmConfirmClick() {
      this.jsonRightsList(this.shareRightsList,);
      this.jsonRightsList(this.mutexRightsList,);
    },
    jsonRightsList(list) {
     if(list.length === 0){
      this.num ++
     }else {
       list.forEach((item) => {
         if (item.isSelected) {
           for (let i = 0; i < item.selectedNum; i++) {
             this.nameList.push(item.rightsName);
             this.idList.push(item.rightsNo);
           }
           if (item.rightsType === 'single') {
             item.rightsSelectedGroupDtoList.forEach((sel) => {
               const r = {
                 rightsId: item.rightsNo,
                 rightsGroup: '',
                 configId: ''
               };
               let timestamp = new Date().getTime();
               // let timestamp = 0
               let Num = 0;
               for (let i = 0; i < 6; i++) {
                 Num += Math.floor(Math.random() * 10);
               }
               timestamp += Num;
               const a = {};
               a.orderDetailId = sel.orderId;
               a.rightsGroup = timestamp;
               r.rightsGroup = timestamp;
               this.rightsDetailList.push(a);
               r.configId = sel.configId;
               this.rightsUserDto.push(r);
             });

           } else {
             const r = {
               rightsId: item.rightsNo,
               rightsGroup: '',
               configId: ''
             };
             let timestamp = ''
             item.rightsSelectedGroupDtoList.forEach((sel) => {
               timestamp = new Date().getTime();
               let Num = 0;
               for (let i = 0; i < 6; i++) {
                 Num += Math.floor(Math.random() * 10);
               }
               timestamp += Num;
               sel.selcted.forEach((val) => {
                 const a = {};
                 a.orderDetailId = val;
                 a.rightsGroup = timestamp;
                 this.rightsDetailList.push(a)
               });
                 r.rightsGroup = timestamp;
                 r.configId = sel.configId;
               this.rightsUserDto.push(r);
             })
           }
         }
       });
       this.num++;
     }
      if (this.num === 2) {
        const rightJson = {};
        rightJson.rightsUserInterestsDetailsDTO = this.rightsDetailList;
        if (this.nameList.length === 1) {
          rightJson.rightName = this.nameList[0];
        } else {
          rightJson.rightName = this.nameList.join(',');
        }
        if (this.idList.length === 1) {
          rightJson.rightId = this.idList[0];
        } else {
          rightJson.rightId = this.idList.join(',');
        }
        rightJson.rightsUserInterestsDTO = this.rightsUserDto;
        this.rightsJson = JSON.stringify(rightJson);
        debugger
        this.$router.go(-1);
      }
    },
    searchData(page){
     return this.rightsService.queryOrderNotOptionalRights(this.subInfo, {pageNum: page.num,
       pageSize: page.size, })
        .then((res) => {
          const sroviewObj = {};
          if (res.code === 1) {
            const {
              result,
              pages
            } = res.data;
            sroviewObj.pages = pages;
            sroviewObj.result = result;
            if (result && result.length > 0) {
              const temp = result;
              temp.forEach((not) => {
                const ProductCategoryNameAy = []
                this.productGroupName.forEach((v) => {
                  const reg = new RegExp(v.groupCode);
                  if (reg.test(not.rightsProductCategory)) {
                    ProductCategoryNameAy.push(v.groupName);
                  }
                });
                not.rightsProductCategory = ProductCategoryNameAy.join('、');
                const a = not.rightsBrand.split(',');
                const b = [];
                a.forEach((i) => {
                  if (i === '000') {
                    i = '海尔';
                    b.push(i);
                  } else if (i === '051') {
                    i = '卡萨帝';
                    b.push(i);
                  } else {
                    i = '统帅';
                    b.push(i);
                  }
                });
                not.rightsBrandC = b.join(',');
              });
              this.notOptionalList = temp;
              if (page.num === 1) {
                this[this.curScrollViewName].list = [];
                this[this.curScrollViewName].list = this.notOptionalList;
              } else {
                this[this.curScrollViewName].list = this[this.curScrollViewName].list.concat(this.notOptionalList);
              }
            } else {
             Toast.failed('暂无数据')
            }
            // debugger;
            // if (res.data.result.length > 0) {
            //   debugger;
            //   const temp = res.data.result;
            //   temp.forEach((not) => {
            //     const a = not.rightsBrand.split(',');
            //     const b = [];
            //     a.forEach((i) => {
            //       if (i === '000') {
            //         i = '海尔';
            //         b.push(i);
            //       } else if (i === '051') {
            //         i = '卡萨帝';
            //         b.push(i);
            //       } else {
            //         i = '统帅';
            //         b.push(i);
            //       }
            //     });
            //     not.rightsBrandC = b.join(',');
            //   });
            //   console.log('aaaaaaaaaaaaaaa', temp);
            //   debugger;
            //   this.notOptionalList = temp;
            // } else {
            //   Toast.info('暂无数据');
            // }
          } else {
            Toast.failed(res.msg);
            this[this.curScrollViewName].mescroll.endErr();
          }
          return sroviewObj;
        });
    },
    getData(type) {
      debugger;
      // todo
      this.subInfo = JSON.parse(this.$route.params.orderInfo);
      this.orderNo = this.subInfo.orderNo;
      if (this.current === 0) {
        if (!type) {
          return;
        }
        if (type === 1) {
          this.rightsService.queryOrderOptionalShareRights(this.subInfo, {})
            .then((res) => {
              if (res.code === 1) {
                if (res.data.length > 0) {
                  // this.shareRightsList = res.data;
                  this.anylizeData(res.data, 1);
                } else {
                  Toast.failed('暂无数据');
                }
              } else {
                Toast.failed(res.msg);
              }
            });
        } else {
          this.rightsService.queryOrderOptionalMutexRights(this.subInfo, {})
            .then((res) => {
              if (res.code === 1) {
                if (res.data.length > 0) {
                  this.anylizeData(res.data, 2);
                  // this.mutexRightsList = res.data;
                } else {
                  Toast.failed('暂无数据');
                }
              } else {
                Toast.failed(res.msg);
              }
            });
        }
      } else {
        this.rightsService.queryOrderNotOptionalRights(this.subInfo, { pageNum: 1,
          pageSize: 30 })
          .then((res) => {
            if (res.code === 1) {

              if (res.data.result.length > 0) {

                const temp = res.data.result;
                temp.forEach((not) => {
                  const a = not.rightsBrand.split(',');
                  const b = [];

                  a.forEach((i) => {
                    if (i === '000') {
                      b.push('海尔');
                    } else if (i === '051') {
                      b.push('卡萨帝');
                    } else {
                      b.push('统帅');
                    }
                  });
                  not.rightsBrandC = b.join(',');
                });

                this.notOptionalList = temp;
              } else {
                Toast.info('暂无数据');
              }
            } else {
              Toast.failed(res.msg);
            }
          });
      }
    },
    anylizeMCData(list) {
      console.log('11111',list)
      debugger
      list.forEach((item) => {
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
    },
    getProductGroup() {
      this.productService.industryGroup().then((res) => {
        if(res.code === 1){
          this.productGroupName = res.data
        }else {
          Toast.failed(res.msg)
        }
      });
    },
    anylizeData(curlist, type) {
      console.log('curlist', curlist);
      curlist.forEach((item) => {
        const ProductCategoryNameAy = []
        this.productGroupName.forEach((v) => {
          const reg = new RegExp(v.groupCode);
          if (reg.test(item.rightsProductCategory)) {
            ProductCategoryNameAy.push(v.groupName);
          }
        });
        item.rightsProductCategory = ProductCategoryNameAy.join('、');
        item.num = 0;
        item.allowRightsConditionDtoList.forEach((al) => {
          al.flag = 0;
          if(al.orderIdList){
            const temp = []
            al.num = 0;
            for(var i = 0;i < al.orderIdList.length; i++){
              let a = {}
              a.flag = 0

              a.ids = al.orderIdList[i]
              a.tempList = []
              a.num = 0
              temp.push(a)
            }
            al.orderIdList = temp

          }

        });
        const brands = []
        const a = item.rightsBrand.split(',')
        a.forEach(i => {
          if (i === '000') {
            brands.push('海尔')
          } else if (i === '051') {
            brands.push('卡萨帝')
          } else {
            brands.push('统帅')
          }
        })
        item.rightsBrandC = brands.join(',')
        // this.$set(item, 'minesGray', true);
        if (item.isOptional === 1) {
          this.$set(item, 'addGray', false);
        } else {
          this.$set(item, 'addGray', true);
        }
        if (item.selectedNum !== 0) {
          this.$set(item, 'minesGray', false);
        }else {
          this.$set(item, 'minesGray', true);
        }
      });
      if (type === 1) {
        this.shareRightsList = curlist;
      } else {
        this.mutexRightsList = curlist;
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    const obj = { rightsJson: this.rightsJson };

    if (to.name === 'Order.OrderEntry' || 'Order.OrderModify') {
      to.query.temp = JSON.stringify(obj);
      to.params.orderNo = this.subInfo.orderNo;
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
  .right-p{
    height: 80px;
    /*line-height: 80px;*/
    padding: 20px;
    border-radius: 8px;
    width: 700px;
    margin-left: 24px;
    margin-top: 24px;
    background-color: white;
    color: #666666;
  }
  .iconfont{
   font-size: 40px;
    float: right;
  }
  .bottom-btn{
    width: 100%;
    padding: 20px 0;
    background: #fff;
    position: fixed;
    left: 0;
    bottom: 0;
  }
  .common-submit-btn-default3{
    @include mix-submit-btn;
    color: #fff;
    background: #1969C6;
    position: fixed;
    width: 90%;
    margin-left: 5%;
    margin-top: 20px;
    margin-bottom: 20px;
    /*position: absolute;*/
    bottom: 20px;
  }
  .bottom-div{
    position: relative;
  }
  .bottom-height{
    height: 150px;
  }
</style>
