<template>
  <div>
    <div class="activity-tab-bg activity-tab1">
      <md-tab-bar
        v-model="current"
        :items="items"
        :hasInk="false"
      />
    </div>

    <div v-show="current === 0">
      <div class="rights-notice" v-show="shareRightsList.length !== 0">
        <p>
          <span class="important-class">重要提示：</span>套购订单若包含卡萨帝产品，请在此选择卡萨帝单品权益，无需再去卡萨帝模式下重复录单，重复录单会造成权益无法领取！！！
        </p>
      </div>

      <p v-show="shareRightsList.length === 0" class="info-Class">暂无同享活动数据</p>
      <b-activity-item
        v-for="(item,index) in shareRightsList"
        :key="index"
        :getData.sync="item"
        :isFinish="false"
        :residueGift="false"
        :autoChooseMax="true"
        @minusCount="minusCount"
        @addCount="addCount"
        :hasData="false"
        @showLimit="showLimit"
        @showConfig="showConfig"
        v-show="shareRightsList.length !== 0"
      ></b-activity-item>
    </div>
    <div v-show="current === 2">
      <div class="rights-notice" v-show="mutexRightsList.length !== 0">
        <p>
          重要提示：套购订单若包含卡萨帝产品，请在此选择卡萨帝单品权益，无需再去卡萨帝模式下重复录单，重复录单会造成权益无法领取！！！
        </p>

      </div>
      <p v-show="mutexRightsList.length === 0" class="info-Class">暂无不可同享活动数据</p>
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
      ></b-activity-item>
    </div>

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
    >确定
    </button>
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

export default {
  name: 'OrderRights',
  components: {
    [TabBar.name]: TabBar,
    BActivityItem
  },
  data() {
    return {
      productGroupName: [],
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
        label: '可同享活动'
      },
      {
        name: 2,
        label: '不可同享活动'
      },
      {
        name: 1,
        label: '不可参与活动'
      }],
      rightsJson: '',
      num: 0,
      // 点确定的时候选择的权益数量，用来做随机数用(getTime毫秒级会重复)
      choseRightNum: 0,
      scrollViewFinish: {
        mescroll: null,
        list: [],
        isListInit: false
      },
      isFinished: false,
      shareNull: false,
      mutexNull: false,
      shareToastInfo: '',
      mutexToastInfo: ''
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // 通过 `vm` 访问组件实例
      // 请求同享列表
      vm.getData(1);
      // 请求互斥列表
      vm.getData(2);
      // 获取产品组信息
      vm.getProductGroup();
    });
  },
  created() {
    // debugger
    // this.getData(1);
    // this.getData(2);
    // this.getProductGroup();
  },
  computed: {
    curScrollViewName() {
      // 当前tab下的scrollView的ref名字
      // return {
      //   0: 'scrollViewActivity',
      //   1: 'scrollViewFinish'
      // }[this.current];
      return 'scrollViewFinish';
    }
  },
  watch: {
    current(val) {
      if (val === 0) {
        if (this.shareRightsList.length === 0) {
          this.getData(1);
        }
      } else if (val === 2) {
        if (this.mutexRightsList.length === 0) {
          this.getData(2);
        }
      } else {
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
      if (this.current === 1) {
        // 下载过就设置已经初始化
        this[this.curScrollViewName].isListInit = true;
        this.searchData(page)
          .then(({ result, total }) => {
            this.$nextTick(() => {
              // 通过当前页的数据条数，和总数据量来判断是否加载完
              this[this.curScrollViewName].mescroll.endBySize(result.length, total);
            });
          });
      }
    },
    // shareRightsClick() {
    //   this.shareShow = !this.shareShow;
    //   if(this.shareShow && this.shareNull){
    //     Toast.info(this.shareToastInfo)
    //   }else {
    //     if (!this.shareRightsList.length && !this.shareNull) {
    //       this.getData(1);
    //     }
    //   }
    // },
    // mutexRightsClick() {
    //   this.mutexShow = !this.mutexShow;
    //   if(this.mutexShow && this.mutexNull){
    //     Toast.info(this.mutexToastInfo)
    //   }else {
    //     if (!this.mutexRightsList.length && !this.mutexNull) {
    //       this.getData(2);
    //     }
    //   }
    // },
    minusCount(item) {
      // 单品
      if (item.rightsType === 'single') {
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
      }

      this.anylizeMCData(this.shareRightsList);
    },
    countRightnNumByConfigId(configId, list) {
      /* 根据configId计算权益数量 */
      let num = 0;
      if (list) {
        num = list.filter(v => v.configId === configId).length;
      }
      return num;
    },
    addCount(item, {
      rightsNumMap
    }) {
      /**
       *组合所选权益加到rightsSelectedGroupDtoList
       *@rightsNumMap 单品的时候权益数量map
       *@uniqueAllowRightsConditionDtoList 套购的时候，符合的权益
       * */
      // todo 前人此方法过于垃圾，待重构
      // 符合的权益组合
      const allowRightsConditionDtoList = item.allowRightsConditionDtoList;
      // 单品;
      if (item.rightsType === 'single') {
        // 同享
        for (let i = 0; i < allowRightsConditionDtoList.length; i++) {
          const rights = allowRightsConditionDtoList[i];
          // 已选的权益的数量
          const choseRightsNum = this.countRightnNumByConfigId(rights.configId, item.rightsSelectedGroupDtoList);
          // todo  if (rights.flag !== 1 && choseRightsNum < rightsNumMap.get(rights.configId))) {
          if (rights.flag !== 1) {
            // todo rightsNumMap非空判断无意义，临时代码
            if ((rightsNumMap && choseRightsNum < rightsNumMap.get(rights.configId)) || !rightsNumMap) {
              this.$set(rights, 'flag', 1);
              item.rightsSelectedGroupDtoList.push(rights);
              item.selectedNum++;
              this.$set(item, 'selectedNum', item.selectedNum);
              this.$set(item, 'isSelected', 1);
              break;
            }
          }
        }
        if (allowRightsConditionDtoList.length === item.rightsSelectedGroupDtoList.length) {
          this.$set(item, 'isOptional', 0);
        }
      } else {
        // 套购
        const rightsSelectedGroupDtoList = [];
        // 以orderIdList的item为维度，加入已选权益
        item.allowRightsConditionDtoList.forEach((right) => {
          right.orderIdList.forEach((childRight) => {
            rightsSelectedGroupDtoList.push({
              rightsNo: right.rightsNo,
              configId: right.configId,
              ids: childRight.ids,
            });
          });
        });
        item.rightsSelectedGroupDtoList = rightsSelectedGroupDtoList;
        this.$set(item, 'isSelected', 1);
        // todo 兼容写法，以后去掉selectedNum
        this.$set(item, 'selectedNum', 1);
      }

      this.anylizeMCData(this.shareRightsList);
    },
    // 互斥减
    minusMCount(item) {
      /** **************互斥********************** */
      // 单品
      if (item.rightsType === 'single') {
        let rightid = '';
        item.rightsSelectedGroupDtoList.shift();
        let isReturn = false;
        item.allowRightsConditionDtoList.forEach((rights) => {
          if (!isReturn) {
            if (rights.flag !== 0) {
              this.$set(rights, 'flag', 0);
              rightid = rights.orderId;
              item.selectedNum--;
              item.num--;
              this.$set(item, 'selectedNum', item.selectedNum);
              this.$set(item, 'isSelected', item.selectedNum);
              isReturn = true;
            }
          }
          if (rights.flag !== 0) {
            if (rights.orderId === rightid) {
              this.$set(rights, 'flag', 0);
              item.num--;
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
              ri.orderIdList.forEach((id) => {
                if (ri.flag !== 0 || id.tempList.length !== 0) {
                  const a = [];
                  a.push(rightid);
                  if (this.isRepeatArray(a, id.ids)) {
                    const index = id.tempList.findIndex(item => item === rightid);
                    id.tempList.splice(index, 1);
                    if (id.tempList.length === 0) {
                      this.$set(id, 'flag', 0);
                      ri.num--;
                      if (rights.isOptional === 0) {
                        this.$set(rights, 'isOptional', 1);
                      }
                    }
                    if (ri.flag === 1) {
                      this.$set(ri, 'flag', 0);
                      if (ri.num === ri.orderIdList.length - 1) {
                        rights.num--;
                      }
                    }
                  }
                }
              });
            } else {
              if (ri.flag !== 0) {
                if (rightid === ri.orderId) {
                  this.$set(ri, 'flag', 0);
                  rights.num--;
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
            rights.orderIdList.forEach((ri) => {
              if (!isReturn) {
                if (ri.flag !== 0) {
                  this.$set(ri, 'flag', 0);
                  ri.num--;
                  present = ri.ids;
                  ri.tempList = [];
                  // for(var i = 0;i < present.length;i ++){
                  //   ri.tempList = ri.tempList.splice(ri.tempList.findIndex(item => item === present[i]))
                  // }
                  item.selectedNum--;
                  this.$set(item, 'selectedNum', item.selectedNum);
                  this.$set(item, 'isSelected', item.selectedNum);
                  rights.num--;
                  if (rights.num === 0) {
                    this.$set(rights, 'flag', 0);
                    item.num--;
                  }
                  isReturn = true;
                }
              }
            });
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
                const a = [];
                a.push(ri.orderId);
                if (this.isRepeatArray(a, present)) {
                  if (rights.allowRightsConditionDtoList.length === 1 && rights.selectedNum === 1) {
                    return;
                  }
                  this.$set(ri, 'flag', 0);
                  rights.num--;
                }
                if (rights.isOptional === 0) {
                  this.$set(rights, 'isOptional', 1);
                }
              }
            } else {
              ri.orderIdList.forEach((r) => {
                if (ri.flag !== 0 || r.tempList.length !== 0) {
                  if (r.flag !== 0) {
                    if (this.isRepeatArray(r.ids, present)) {
                      for (var i = 0; i < r.ids.length; i++) {
                        for (let j = 0; j < present.length; j++) {
                          if (r.ids[i] === present[j]) {
                            if (r.tempList.find(item => item === r.ids[i])) {
                              // r.tempList = r.tempList.srplice(r.tempList.findIndex(item => item === r.ids[i]), 1)
                              const index = r.tempList.findIndex(item => item === r.ids[i]);
                              r.tempList.splice(index, 1);
                            }
                          }
                        }
                      }
                      if (r.tempList.length === 0) {
                        this.$set(r, 'flag', 0);
                        ri.num--;
                        if (ri.flag !== 0) {
                          this.$set(ri, 'flag', 0);
                          rights.num--;
                        }
                        if (rights.isOptional === 0) {
                          this.$set(rights, 'isOptional', 1);
                        }
                      }
                    }
                  }
                }
              });
            }
            // }
          });
        });
      }

      this.anylizeMCData(this.mutexRightsList);
    },
    // 互斥添加
    addMCount(item) {
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
              item.num++;
              this.$set(item, 'selectedNum', item.selectedNum);
              this.$set(item, 'isSelected', 1);
              isReturn = true;
            }
          }
          if (rights.flag !== 1) {
            if (rights.orderId === rightid) {
              this.$set(rights, 'flag', 1);
              item.num++;
            }
          }
        });

        if (item.num === item.allowRightsConditionDtoList.length) {
          this.$set(item, 'isOptional', 0);
        }
        this.mutexRightsList.forEach((rights) => {
          rights.allowRightsConditionDtoList.forEach((ri) => {
            if (!ri.orderId) {
              ri.orderIdList.forEach((r) => {
                if (ri.flag !== 1 || (r.tempList.length < r.ids.length)) {
                  const a = [];
                  a.push(rightid);
                  if (this.isRepeatArray(a, r.ids)) {
                    this.$set(r, 'flag', 1);
                    r.tempList.push(rightid);
                    ri.num++;
                    if (ri.num === ri.orderIdList.length) {
                      this.$set(ri, 'flag', 1);
                      rights.num++;
                    }
                  }
                }
              });
            } else {
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
          if (rights.flag !== 1) {
            rights.orderIdList.forEach((ri) => {
              if (!isReturn) {
                if (ri.flag !== 1) {
                  this.$set(ri, 'flag', 1);
                  present = ri.ids;
                  rights.selcted = ri.ids;
                  item.rightsSelectedGroupDtoList.push(rights);
                  item.selectedNum++;
                  this.$set(item, 'selectedNum', item.selectedNum);
                  this.$set(item, 'isSelected', 1);
                  rights.num++;
                  if (rights.num === rights.orderIdList.length) {
                    this.$set(rights, 'flag', 1);
                    item.num++;
                  }
                  isReturn = true;
                }
              }
            });
          }
        });
        if (item.num === item.allowRightsConditionDtoList.length) {
          this.$set(item, 'isOptional', 0);
        }
        this.mutexRightsList.forEach((rights) => {
          rights.allowRightsConditionDtoList.forEach((ri) => {
            if (!ri.orderIdList) {
              if (ri.flag !== 1) {
                const a = [];
                a.push(ri.orderId);
                if (this.isRepeatArray(a, present)) {
                  this.$set(ri, 'flag', 1);
                  rights.num++;
                }
              }
            } else {
              ri.orderIdList.forEach((r) => {
                if (ri.flag !== 1 || (r.tempList.length < r.ids.length)) {
                  if (r.flag !== 1 || (r.tempList.length < r.ids.length)) {
                    if (this.isRepeatArray(r.ids, present)) {
                      this.$set(r, 'flag', 1);
                      ri.num++;
                      for (var i = 0; i < r.ids.length; i++) {
                        for (let j = 0; j < present.length; j++) {
                          if (r.ids[i] === present[j]) {
                            if (r.tempList.length === 0) {
                              r.tempList.push(r.ids[i]);
                            } else {
                              if (!r.tempList.find(item => item === r.ids[i])) {
                                r.tempList.push(r.ids[i]);
                              }
                            }
                          }
                        }
                      }
                      if (ri.num === ri.orderIdList.length) {
                        this.$set(ri, 'flag', 1);
                        rights.num++;
                      }
                    }
                  }
                }
              });
            }
          });
          if (rights.num === rights.allowRightsConditionDtoList.length) {
            this.$set(rights, 'isOptional', 0);
          }
        });
      }
      this.anylizeMCData(this.mutexRightsList);
    },
    isRepeatArray(array1, array2) {
      /* 判断两个数组是否有重复的值 */
      const a = array1.length;
      const b = array2.length;
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
    // 查看礼品
    showConfig(item) {
      this.rightsService.viewGifts({}, { rightsNo: item.rightsNo },)
        .then((res) => {
          if (res.code === 1) {
            if (res.data.length > 0) {
              item.isShowConfig = true;
              this.$set(item, 'configList', res.data);
            } else {
              item.configList = [];
            }
          }
        });
    },
    // 其他限制
    showLimit(item) {
      this.rightsService.viewOtherLimited({}, { rightsNo: item.rightsNo })
        .then((res) => {
          if (res.code === 1) {
            this.$set(item, 'limitList', res.data);
          }
        });
    },

    btmConfirmClick() {
      this.jsonRightsList(this.shareRightsList,);
      this.jsonRightsList(this.mutexRightsList,);
    },
    // 字符串列表
    jsonRightsList(list) {
      if (list.length === 0) {
        this.num++;
      } else {
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
                const a = {};
                this.choseRightNum++;
                const timestamp = `${new Date().getTime()}${this.choseRightNum}`;
                a.orderDetailId = sel.orderId;
                a.rightsGroup = timestamp;
                r.rightsGroup = timestamp;
                this.rightsDetailList.push(a);
                r.configId = sel.configId;
                this.rightsUserDto.push(r);
              });
            } else {
              item.rightsSelectedGroupDtoList.forEach((sel) => {
                this.choseRightNum++;
                const timestamp = `${new Date().getTime()}${this.choseRightNum}`;
                // 起的什么破名
                // 权益信息
                this.rightsUserDto.push({
                  rightsId: item.rightsNo,
                  configId: sel.configId,
                  rightsGroup: timestamp,
                });
                // 子权益信息
                // todo 兼容写法，以后去掉sel.selcted
                const ids = sel.selcted || sel.ids;
                ids.forEach((val) => {
                  this.rightsDetailList.push({
                    orderDetailId: val,
                    rightsGroup: timestamp
                  });
                });
              });
            }
          }
        });
        this.num++;
      }
      if (this.num === 2) {
        // 重置所选的全部权益数量
        this.choseRightNum = 0;
        const rightJson = {};
        rightJson.rightsUserInterestsDetailsDTO = this.rightsDetailList;
        rightJson.rightName = this.nameList.join(',');
        rightJson.rightId = this.idList.join(',');
        rightJson.rightsUserInterestsDTO = this.rightsUserDto;
        this.rightsJson = JSON.stringify(rightJson);
        this.$router.go(-1);
      }
    },
    // 不可参与活动
    searchData(page) {
      return this.rightsService.queryOrderNotOptionalRights(this.subInfo, {
        pageNum: page.num,
        pageSize: page.size,
      })
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
                // 某天突然返回了个null=.=
                if (!not) {
                  return;
                }
                const ProductCategoryNameAy = [];
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
              // Toast.failed('暂无数据');
            }
            // ;
            // if (res.data.result.length > 0) {
            //   ;
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
            //   ;
            //   this.notOptionalList = temp;
            // } else {
            //   Toast.info('暂无数据');
            // }
          } else {
            this[this.curScrollViewName].mescroll.endErr();
          }
          return sroviewObj;
        });
    },
    getData(type) {
      /**
         * 请求权益互动
         * @type 1:同享 2:不同享
         * */
      // 获取订单信息，根据订单的产品、价格等信息获取满足的权益
      this.subInfo = JSON.parse(this.$route.params.orderInfo);
      // 订单号
      this.orderNo = this.subInfo.orderNo;
      if (this.current === 0) {
        if (!type) {
          return;
        }
        if (type === 1) {
          this.rightsService.queryOrderOptionalShareRights(this.subInfo, { requestNoToast: true })
            .then((res) => {
              if (res.code === 1) {
                if (res.data.length > 0) {
                  // this.shareRightsList = res.data;
                  this.anylizeData(res.data, 1);
                } else {
                  Toast.failed('暂无同享活动');
                }
              } else {
                // Toast.failed(res.msg);

                if (res.msg === '未匹配到可选权益数据！') {
                  this.shareNull = true;
                  this.shareToastInfo = '暂无同享活动';
                }
              }
            });
        } else {
          this.rightsService.queryOrderOptionalMutexRights(this.subInfo, { requestNoToast: true })
            .then((res) => {
              if (res.code === 1) {
                if (res.data.length > 0) {
                  this.anylizeData(res.data, 2);
                  // this.mutexRightsList = res.data;
                } else {
                  Toast.failed('暂无不可同享权益数据');
                }
              } else {
                // Toast.failed(res.msg);
                if (res.msg === '未匹配到可选权益数据！') {
                  this.mutexNull = true;
                  this.mutexToastInfo = '未匹配到互斥权益信息';
                }
              }
            });
        }
      } else {
        this.rightsService.queryOrderNotOptionalRights(this.subInfo, {
          pageNum: 1,
          pageSize: 30
        })
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
            }
          });
      }
    },
    anylizeMCData(list) {
      console.log('11111', list);

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
      this.productService.industryGroup()
        .then((res) => {
          if (res.code === 1) {
            this.productGroupName = res.data;
          }
        });
    },
    anylizeData(curlist, type) {
      /**
         * 转化权益列表
         * @curlist 原始权益列表
         * @type 1:同享列表 2：互斥列表
         * */
      curlist.forEach((item) => {
        // rightsProductCategory产品组code转化为产品组名称
        const productCategoryNameAy = [];
        this.productGroupName.forEach((v) => {
          const reg = new RegExp(v.groupCode);
          if (reg.test(item.rightsProductCategory)) {
            productCategoryNameAy.push(v.groupName);
          }
        });
        // rightsProductCategory属性重置为产品组名称
        item.rightsProductCategory = productCategoryNameAy.join('、');
        // 权益数量
        item.num = 0;
        // 把orderIdList从数组转化为对象
        item.allowRightsConditionDtoList.forEach((al) => {
          al.flag = 0;
          if (al.orderIdList) {
            const temp = [];
            al.num = 0;
            for (let i = 0; i < al.orderIdList.length; i++) {
              const a = {};
              a.flag = 0;

              a.ids = al.orderIdList[i];
              a.tempList = [];
              a.num = 0;
              temp.push(a);
            }
            al.orderIdList = temp;
          }
        });

        const rightsBrandTemp = item.rightsBrand;
        item.rightsBrandC = rightsBrandTemp.replace(/000/g, '海尔');
        item.rightsBrandC = item.rightsBrandC.replace(/051/g, '卡萨帝');
        item.rightsBrandC = item.rightsBrandC.replace(/089/g, '统帅');

        // 加按钮置灰
        this.$set(item, 'addGray', !(item.isOptional === 1));
        // 减按钮置灰(selectedNum可能开始没值)
        this.$set(item, 'minesGray', !(item.selectedNum !== 0));
      });
      if (type === 1) {
        this.shareRightsList = curlist;
      } else {
        this.mutexRightsList = curlist;
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.rightsJson) {
      const right = JSON.parse(this.rightsJson);
      if (right.rightsUserInterestsDetailsDTO.length === 0) {
        this.rightsJson = '';
      }
    }
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

  .activity-tab1 {
    .md-tab-bar-item {
      padding: 0;
      margin: 0;
      width: 33%;
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
        width: 33%;

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

  .right-p {
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

  .bottom-btn {
    width: 100%;
    padding: 20px 0;
    background: #fff;
    position: fixed;
    left: 0;
    bottom: 0;
  }

  .common-submit-btn-default3 {
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

  .bottom-div {
    position: relative;
  }

  .bottom-height {
    height: 150px;
  }

  .info-Class {
    text-align: center;
    padding: 30px;
    color: #666666;
    font-size: 32px;
  }

  .rights-notice {
    width: 700px;
    margin-left: 25px;
    margin-bottom: 25px;
    margin-top: 25px;
    background-color: #FDF3D8;
    border-radius: 8px;
    color: #666666;
    font-size: 28px;
    padding: 24px;
  }

  .important-class {
    font-weight: 500;
    font-size: 30px;
  }
</style>
