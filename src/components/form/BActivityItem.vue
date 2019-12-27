<template>
  <div
    class="activity-item-bg bActivityItem"
    :class="{'active':isChose}"
  >
    <!--<div v-show="!hasData">-->
    <!--<p>暂无权益活动可选</p>-->
    <!--</div>-->
    <div>
      <div class="activity-gift">
        <i class="iconfont icon-liwu activity-gift-img"></i>
        <span class="activity-gift-title">{{getData.rightsName}}</span>
      </div>
      <div
        v-if="getData.reason && isFinish"
        class="activity-common-line activity-common-text activity-reason-text"
      >
        不可参与原因：{{getData.reason}}
      </div>
      <div class="activity-common-line activity-common-text">活动品牌：{{getData.rightsBrandC}}</div>
      <div class="activity-common-line activity-common-text">适用范围：{{getData.rightsProductCategory}}</div>
      <div class="activity-common-line activity-common-text">
        活动日期：<span class="activity-data-text">{{getData.activityStartDate}}至{{getData.activityEndDate}}</span>
      </div>
      <div
        class="activity-common-line activity-titleItem activity-common-top activity-common-border"
        @click="setShowConfig"
      >
        <span class="activity-tip-text activity-count-remain">查看礼品</span>
        <span
          class="icon iconfont icon-jiantou9 activity-tip-img activity-count-remain"
          :class="{'activity-tip-img-transform': isShowConfig}"
        ></span>
      </div>
      <div
        v-for="(item,c) in getData.configList"
        :key="c"
        v-show="isShowConfig"
      >
        <!--单品-->
        <div
          class="activity-common-line activity-common-border activity-common-top activity-titleItem"
          v-show="getData.rightsType === 'single'"
        >
          <div
            class="activity-item"
            v-show="item.singleProductMode === 'single'"
          >
            <span class="activity-name-icon">购</span>
            <span class="activity-common-left activity-common-product">{{item.productModel}}&nbsp;{{item.productGroupName}}</span>
          </div>
          <div class="activity-item" v-show="item.singleProductMode === 'multi' ">
            <span class="activity-name-icon">购</span>
            <span
              class="activity-common-left activity-common-product1"
              v-for="(pro,x) in item.rightsProductDtoList"
              :key="x"
            >{{pro.productModel}}&nbsp;{{pro.productGroupName}}、</span>
          </div>
          <div class="activity-item" v-show="item.singleProductMode === 'all' ">
            <span class="activity-name-icon">购</span>
            <span class="activity-common-left activity-common-product">全部型号</span>
          </div>
          <span
            class="activity-common-product activity-common-left activity-float"
            v-show="getData.giveGiftMode !== 'ratio'"
          >
            共<span class="activity-type-text">{{item.rightsGiftTotal}}</span>份，剩余<span class="activity-count-remain">{{item.rightsGiftSurplus}}</span>份
          </span>
          <span
            v-show="getData.giveGiftMode === 'ratio' && item.rightsGiftSurplus !== 0"
            class="activity-common-product activity-common-left activity-float activity-type-text"
          >
            剩余多份
          </span>
          <span
            v-show="getData.giveGiftMode === 'ratio' && item.rightsGiftSurplus === 0"
            class="activity-common-product activity-common-left activity-float activity-type-text"
          >
            积分已领完
          </span>
        </div>

        <!--套购-->
        <div class="activity-common-line activity-common-border activity-common-top activity-titleItem"
             v-show="getData.rightsType === 'sets'">
          <!--按特定型号组合-->
          <div class="activity-item" v-show="getData.setsCombineMode === 1">
            <span class="activity-name-icon">购</span>
            <span
              class="activity-product"
              v-for="(rightsSetsCombine ,j) in item.rightsSetsCombineDtoList"
              :key="j"
            >
            <span v-show="rightsSetsCombine.rightsProductDtoList == null">{{rightsSetsCombine.productBrandName}}{{rightsSetsCombine.industryName}}所有型号
            <span
              v-show="item.productCombineSymbols === 'and' && j !== item.rightsSetsCombineDtoList.length - 1">+</span>
            <span
              v-show="item.productCombineSymbols === 'or' && j !== item.rightsSetsCombineDtoList.length - 1">/</span>
            </span>
             <span v-show="rightsSetsCombine.rightsProductDtoList != null">
              <span
                v-for="(rightsSetsPro ,l) in rightsSetsCombine.rightsProductDtoList"
                :key="l"
              >
                {{rightsSetsPro.productBrandName}}{{rightsSetsPro.productGroupName}}{{rightsSetsPro.productModel}}
                <span v-show="l !== rightsSetsCombine.rightsProductDtoList.length - 1">、</span>
              </span>
              <span
                v-show="item.productCombineSymbols === 'and' && j !== item.rightsSetsCombineDtoList.length - 1">+</span>
              <span
                v-show="item.productCombineSymbols === 'or' && j !== item.rightsSetsCombineDtoList.length - 1">/</span>
            </span>
            </span>
          </div>
          <!--按满赠-->
          <div class="activity-item" v-show=" getData.setsCombineMode === 2">
            <span class="activity-name-icon">满</span>
            <span class=" activity-common-left activity-span">{{item.priceRangeStart}}</span>
            <span class=" activity-common-left activity-span">-</span>
            <span class=" activity-common-left activity-span">{{item.priceRangeEnd}}(元)</span>
          </div>
          <span class="activity-common-product activity-common-left activity-float">共<span
            class="activity-type-text">{{item.rightsGiftTotal}}</span>份，剩余<span class="activity-count-remain">{{item.rightsGiftSurplus}}</span>份</span>
        </div>
        <div class="activity-common-line activity-item activity-item-gift">
          <span class="activity-name-icon">送</span>
          <span class="activity-common-product activity-common-left activity-item-gift-desc"
                v-show="getData.giveGiftMode === 'designated'">{{item.giftName}}</span>
          <span class="activity-common-product activity-common-left activity-item-gift-desc"
                v-show="getData.giveGiftMode === 'fixed'">{{item.giveIntegralValue}}积分</span>
          <span class="activity-common-product activity-common-left activity-item-gift-desc"
                v-show="getData.giveGiftMode === 'ratio'">{{item.integralPriceRatio}}%比例积分</span>
          <span class="activity-common-product activity-common-left activity-item-gift-desc"
                v-show="getData.giftType === 'virtual'">{{item.virtualGiftName}}</span>
        </div>
      </div>
      <div class="activity-common-line activity-titleItem activity-common-top activity-common-border"
           @click="setShowLimit">
        <span class="activity-tip-text activity-count-remain">其他限制</span>
        <span class="icon iconfont icon-jiantou9 activity-tip-img activity-count-remain"
              :class="{'activity-tip-img-transform': isShowLimit}"></span>
      </div>

      <div v-if="isShowLimit">
        <div class="activity-common-line activity-common-text">
          <p>用户可兑换日期：{{getData.exchangeStartTime}}至{{getData.exchangeEndTime}}</p>
        </div>
        <div class="activity-common-line activity-common-text">
          <p v-show="getData.giftType ==='virtual'">礼品类型：尊享卡</p>
          <p v-show="getData.giftType ==='jfmall'">礼品类型：海贝积分</p>
          <p v-show="getData.giftType ==='casarte'">礼品类型：卡萨帝积分</p>
          <p v-show="getData.giftType ==='entity'">礼品类型：实物礼品</p>
        </div>

        <div
          class="activity-common-line"
          v-for="(model,i) in getData.limitList.model"
          :key="i"
        >
          <span>
            {{model.productBrandName}}：{{model.productGroupName}}
            <span
              v-show="model.productModel === '*'"
            >全部型号</span>
            <span
              v-show="model.productModel !== '*'"
            >{{model.productModel}}
            </span>
          </span>排除在权益计算之外
        </div>
        <div
          class="activity-common-line"
          v-for="(price,p) in getData.limitList.price"
          :key="p"
        >
          <p>
            {{price.productBrandName}}：{{price.productGroupName}}价格在{{price.limitPriceMin}}-{{price.limitPriceMax}}之间可参与套餐</p>
        </div>
        <div
          class="activity-common-line"
          v-for="(appoint,a) in getData.limitList.appoint"
          :key="a"
        >
          <span>
            {{appoint.productBrandName}}：{{appoint.productGroupName}}
            <span
              v-show="appoint.productModel === '*'"
            >全部型号</span>
            <span
              v-show="appoint.productModel !== '*'"
            >{{appoint.productModel}}
            </span>
          </span>
          必须包含其中任意一个
        </div>

      </div>
      <img class="activity-img" v-if="isFinish && !hasData && isShowImg"
           src="../../assets/images/orderFollow-up/activity-img.png"/>
      <div
        v-if="autoChooseMax"
        class="bActivityItem-choose-rights-btn-par"
      >
        <button
          v-show="!isChose"
          class="bActivityItem-choose-rights-btn"
          type="button"
          @click="chooseMaxnumRights"
        >选择此权益
        </button>
        <img
          v-show="isChose"
          class="bActivityItem-choose-rights-chose-icon"
          src="@/assets/images/orderFollow-up/chosedRightsIcon.png"
          @click="calcelChooseMaxnumRights"
        >
        <div
          v-show="isChose"
          class="bActivityItem-choose-rights-maxnum-par"
        >数量 <span class="bActivityItem-choose-rights-maxnum">{{maxRightsNum}}</span>
        </div>
      </div>
      <div class="activity-number" v-if="!isFinish && !residueGift && !autoChooseMax">
        <span
          class="activity-number-minus activity-number-common" @click="minusCount"
          v-show="!getData.minesGray"
        >-</span>
        <span class="activity-number-minus activity-number-common-no" v-show="getData.minesGray">-</span>

        <span class="activity-number-count">{{getData.selectedNum}}</span>
        <span
          class="activity-number-add activity-number-common"
          @click="addCount"
          v-show="!getData.addGray"
        >+</span>
        <span
          class="activity-number-add activity-number-common-no"
          v-show="getData.addGray"
        >+</span>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'BActivityItem',
  props: {
    // 权益item
    getData: {
      type: Object
    },
    isFinish: false,
    // 是否剩余礼品页面（不可选权益）
    residueGift: false,
    hasData: false,
    rightsType: '',
    // 自动选择最大数量的权益（不再加减去数量，直接选择，数量选择最大）
    autoChooseMax: {
      type: Boolean,
      default: false
    },
    // 已选择的权益，autoChooseMax为true的时候起效
    choseRights: {
      type: Array,
      default: () => []
    },
    // 活动里边也需要用这个组建  但是不需要显示图片，这个字段用来判断是否显示图片
    isShowImg: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      isShowLimit: false,
      isShowConfig: false,
      // 已经选中
      isChose: false,
      // 最大可选的权益数量
      maxRightsNum: 0
    };
  },
  created() {
    // this.rightsType = this.getData.rightsType;
  },
  methods: {
    setShowLimit() {
      this.isShowLimit = !this.isShowLimit;
      if (this.isShowLimit) {
        this.$emit('showLimit', this.getData);
      }
    },
    setShowConfig() {
      this.isShowConfig = !this.isShowConfig;
      if (this.isShowConfig) {
        this.$emit('showConfig', this.getData);
      }
    },
    minusCount() {
      this.$emit('minusCount', this.getData);
    },
    addCount() {
      this.$emit('addCount', this.getData);
    },
    genRightsNumMap(allowRightsConditionDtoList) {
      /* 生成权益和数量的映射 */
      const map = new Map();
      allowRightsConditionDtoList.forEach((v) => {
        if (map.get(v.configId)) {
          map.set(v.configId, map.get(v.configId) + 1);
        } else {
          map.set(v.configId, 1);
        }
      });
      return map;
    },
    updateRightsNumOverload(rightsNumMap, rightsList) {
      /* 是否超过了权益的剩余数量 */
      /**
         * @rightsNumMap 订单对应的权益、数量的映射
         * @rightsList 权益包含的子权益信息（包含数量）
         */
      rightsNumMap.forEach((number, configId) => {
        const rightsConfig = rightsList.find(right => configId === right.configId);
        const rightsGiftSurplus = rightsConfig.rightsGiftSurplus;
        // 检查订单符合的权益是否超过权益的剩余数量，超过则选剩余数量
        if (number > rightsGiftSurplus) {
          rightsNumMap.set(configId, rightsGiftSurplus);
        }
      });
    },
    combineRightsDeduplication(list) {
      /**
       *套购重复权益删除（后台返回了全部组合，例如[ab]组合，a1、a2、b1应该为[a1 b1]而不是 [a1 b1]和[a2 b1]）
       *@list 权益详细信息（子权益列表，以configId区分）
       */
      const listTemp = JSON.parse(JSON.stringify(list));
      listTemp.forEach((right) => {
        // 产品组合列表，orderIdList里的元素代表一个产品
        const orderIdList = right.orderIdList;
        // 去除orderIdList里的重复的
        right.orderIdList = this.orderIdListDeduplication(orderIdList);
      });
      return listTemp;
    },
    orderIdListDeduplication(orderIdList, newOrderIdList) {
      /**
       *去掉多余的orderId（副作用方法，改变原来数组）
       * */
      if (orderIdList.length === 0) {
        return newOrderIdList;
      }
      if (!newOrderIdList) {
        newOrderIdList = [];
      }
      // 新的orderId组合
      const newOrderIdCombination = orderIdList[0];
      newOrderIdList.push(newOrderIdCombination);
      orderIdList.splice(0, 1);
      // 排除所有重复组合
      for (let i = 0; i < orderIdList.length; i++) {
        // orderIdCombination：一个orderId们的组合
        const orderIdCombinationIds = orderIdList[i].ids;
        // 重复即删除
        if (this.bUtil.isRepeatArray(orderIdCombinationIds, newOrderIdCombination.ids)) {
          orderIdList.splice(i, 1);
          i--;
        }
      }
      return this.orderIdListDeduplication(orderIdList, newOrderIdList);
    },
    sortByCombineNum(list) {
      /**
       * 根据组合数量排序并转化为object,key代表权重，数量越大组合越少，从1开始递增
       * （副作用方法）
      * */
      // 根据组合排序，组合大的放前面
      list.sort((pre, next) => {
        const preLen = (pre.orderIdList && pre.orderIdList[0] && pre.orderIdList[0].ids.length) || 0;
        const nextLen = (next.orderIdList && next.orderIdList[0] && next.orderIdList[0].ids.length) || 0;
        if (preLen > nextLen) {
          return -1;
        }
        return 1;
      });
      return list;
    },
    chooseMaxnumRights() {
      /* 选择最大数量的权益 （直接选择，没有加减数量，默认数量最大） */
      const {
        // 单品 or 套购
        rightsType,
        // 允许所选的权益
        allowRightsConditionDtoList
      } = this.getData;
        // 有可选的权益才可选
      if (allowRightsConditionDtoList && allowRightsConditionDtoList.length) {
        // 查询权益详细信息
        const getRightsDetail = this.rightsService.viewGiftsNoLoading({
          rightsNo: this.getData.rightsNo
        });
        // 权益对应的数量映射
        let rightsNumMap;
        if (rightsType === 'single') {
          // 单品直接通过allowRightsConditionDtoList的数量来判断
          rightsNumMap = this.genRightsNumMap(allowRightsConditionDtoList);
          getRightsDetail.then(({ code, data }) => {
            if (code === 1) {
              this.updateRightsNumOverload(rightsNumMap, data);
              // 依次添加权益 todo 将来依然存在把数量添加按钮加回来的可能，所以保留单个添加权益的逻辑
              const rightsLength = [...rightsNumMap.values()].reduce((cur, all) => cur + all, 0);
              // 设置显示的最大可选权益的数量
              this.maxRightsNum = rightsLength;
              for (let i = 0; i < rightsLength; i++) {
                this.$emit('addCount', this.getData, {
                  rightsNumMap
                });
              }
              // 设置选中状态
              this.isChose = true;
            }
          });
        } else {
          // 套购需要综合计算allowRightsConditionDtoList里的子权益以及子权益的orderList来计算
          rightsNumMap = {};
          // 去掉权重低的（目前为组合数量小）的权益
          const delRight = getRightsDetail.then(({ code, data }) => {
            if (code === 1) {
              // 按照组合数量排序，避免每次查找组合数更少的组合
              this.sortByCombineNum(allowRightsConditionDtoList);
              // 排序之后一次排除，选择一个权益后，权益数量够，则排除权重小的权益里面的所有orderId组合，不够，则不排除，继续循环下一个权益
              // 删选出最大组合，例如abc组合 ab组合，应该取abc，排除掉ab
              allowRightsConditionDtoList.forEach((right, index) => {
                // 符合的权益的数量
                const rightLen = right.orderIdList.length;
                const rightConfigId = right.configId;
                const selectRights = data.find(v => v.configId === rightConfigId);
                // 权益剩余数量
                const rightsGiftSurplus = selectRights.rightsGiftSurplus;
                // 剩余数量若不足，则从上到下删减选取的权益
                if (rightLen > rightsGiftSurplus) {
                  right.orderIdList = right.orderIdList.slice(0, rightsGiftSurplus);
                }
                //
                right.orderIdList.forEach((orderIdObj) => {
                  // orderId组合（产品组合）
                  const orderIds = orderIdObj.ids;
                  // 从权重低的权益中去除初中的orderId组合（有一个orderId重复即排除）
                  for (let i = index + 1; i < allowRightsConditionDtoList.length; i++) {
                    const excludeOrderList = allowRightsConditionDtoList[i].orderIdList;
                    for (let j = 0; j < excludeOrderList.length; j++) {
                      const excludeOrder = excludeOrderList[j];
                      const ids = excludeOrder.ids;
                      // 权重低的的权益里如果有重复的，则删除掉
                      if (this.bUtil.isRepeatArray(ids, orderIds)) {
                        excludeOrderList.splice(j, 1);
                        j--;
                      }
                    }
                  }
                });
              });
            }
          });
          delRight.then(() => {
            // 去除重复权益，一个产品只能领一个权益
            const uniqueAllowRightsConditionDtoList = this.combineRightsDeduplication(allowRightsConditionDtoList);
            // todo
            console.log(uniqueAllowRightsConditionDtoList);
            // 设置显示的最大可选权益的数量
            const rightsLength = uniqueAllowRightsConditionDtoList.reduce((all, cur) => {
              const orderIdList = cur.orderIdList;
              let len;
              if (orderIdList) {
                len = all + cur.orderIdList.length;
              } else {
                len = all;
              }
              return len;
            }, 0);
            this.maxRightsNum = rightsLength;
            this.$emit('addCount', this.getData, {
              uniqueAllowRightsConditionDtoList
            });
            // 设置选中状态
            this.isChose = true;
          });
        }
      }
    },
    calcelChooseMaxnumRights() {
      /* 取消选中 */
      const {
        // 权益类型
        rightsType,
        // 允许所选的权益
        allowRightsConditionDtoList
      } = this.getData;
      if (rightsType === 'single') {
        // todo 单品暂时维持现状，单个减
        // 有可选的权益才可选
        allowRightsConditionDtoList.forEach(() => {
          this.$emit('minusCount', this.getData);
        });
      } else {
        // 只通过isSelected selectedNum来取消
        this.$set(this.getData, 'isSelected', 0);
        // todo 兼容写法，以后去掉selectedNum
        this.$set(this.getData, 'selectedNum', 0);
      }
      // 设置选中状态
      this.isChose = false;
    }
  },
  watch: {
    getData(newVal) {
      this.data = newVal;
    }
  }
};
</script>

<style scoped lang="scss">
  .bActivityItem {
    &.active {
      border: 1px solid #F5A623;
    }
  }

  .activity-item-bg {
    position: relative;
    margin-top: 16px;
    margin-right: 24px;
    margin-left: 24px;
    background: #fff;
    padding-top: 30px;
    padding-right: 24px;
    padding-bottom: 20px;
    padding-left: 24px;
    border-radius: 16px;
    margin-bottom: 40px;
  }

  .activity-gift {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .activity-gift-img {
    font-size: 40px;
    color: #f5a623;
  }

  .activity-gift-title {
    font-size: 28px;
    color: #333;
    margin-left: 15px;
    display: block;
    word-break: normal;
    width: 400px;
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow: hidden;
  }

  .activity-common-text {
    word-break: break-all;
    width: 600px;
    font-size: 24px;
    color: #666;
  }

  .activity-common-left {
    // margin-left: 20px;
  }

  .activity-common-top {
    padding-top: 16px;
  }

  .activity-common-line {
    margin-top: 16px;
    margin-left: 5px;
  }

  .activity-common-border {
    border-top: 1px solid #F5F5F5;

  }

  .activity-data-text {
    color: #1969C6;
  }

  .activity-reason-text {
    color: #FF001F;
    width: 500px;
  }

  .activity-type-text {
    color: #f5a623;
  }

  .activity-count-remain {
    color: #1969C6;
  }

  .activity-name-icon {
    width: 38px;
    height: 38px;
    border: 2px solid #F5A623;
    border-radius: 10px;
    background: #fff;
    color: #F5A623;
    font-size: 24px;
    margin-right: 16px;
    padding-top: 2px;
    padding-right: 5px;
    padding-bottom: 2px;
    padding-left: 7px;
  }

  .activity-btn {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
  }

  .activity-img {
    position: absolute;
    width: 133px;
    height: 101px;
    right: 40px;
    top: 16px
  }

  .activity-number {
    position: absolute;
    right: 24px;
    top: 24px;
    display: flex;
  }

  .activity-number-add {
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
  }

  .activity-number-minus {
    border-bottom-left-radius: 4px;
    border-top-left-radius: 4px;
  }

  .activity-number-count {
    height: 48px;
    border-bottom: 1px solid #BBB;
    border-top: 1px solid #BBB;
    font-size: 28px;
    color: #333;
    text-align: center;
    padding-top: 2px;
    padding-left: 27px;
    padding-right: 27px;
  }

  .activity-number-common {
    width: 48px;
    height: 48px;
    border: 1px solid #BBB;
    font-size: 28px;
    color: #333;
    width: 48px;
    height: 48px;
    text-align: center;
  }

  .activity-number-common-no {
    width: 48px;
    height: 48px;
    border: 1px solid #BBB;
    font-size: 28px;
    color: #bbb;
    width: 48px;
    height: 48px;
    text-align: center;
  }

  .activity-common-product {
    font-size: 24px;
    color: #666;
  }

  .activity-common-product1 {
    font-size: 24px;
    color: #666;
    width: 50%;
  }


  .activity-item {
    display: flex;
    flex-wrap: wrap;
    position: relative;
  }

  .activity-titleItem {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    justify-content: space-between;
  }

  .activity-item-gift {
    display: flex;
  }

  .activity-item-gift-desc {
    flex-grow: 1;
    word-break: break-all;
  }

  .activity-span {
    font-size: 24px;
    color: #666;
  }

  .activity-float {
    margin-left: auto;
  }

  .activity-check-gift {
    width: 144px;
    flex-shrink: 0;
  }

  .activity-recommend-gift {
    position: relative;
    background: #F4F9FE;
    margin-top: 22px;
    padding: 26px 17px 26px 17px;
  }

  .activity-recommend-gift-pop {
    position: absolute;
    right: 65px;
    top: -26px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 16px;
    border-color: transparent transparent #F4F9FE transparent;
  }

  .activity-recommend-gift-text {
    font-size: 24px;
    color: #999;
  }

  .activity-product {
    font-size: 24px;
    color: #666;
  }

  .activity-tip-text {
    font-size: 28px;
  }

  .activity-tip-img {
    font-size: 36px;
  }

  .activity-tip-img-transform {
    transform: scaleY(-1);
  }

  .bActivityItem-choose-rights-btn-par {
    position: absolute;
    top: 0;
    right: 0;
  }

  .bActivityItem-choose-rights-btn {
    position: absolute;
    white-space: nowrap;
    top: 24px;
    right: 24px;
    border: 1px solid #196AC6;
    height: 42px;
    vertical-align: middle;
    border-radius: 8px;
    background: #fff;
    color: #196AC6;
    font-size: 24px;
    padding-left: 13px;
    padding-right: 13px;
  }

  .bActivityItem-choose-rights-chose-icon {
    position: absolute;
    top: -1px;
    right: -1px;
    width: 56px;
    height: 55px;
  }

  .bActivityItem-choose-rights-maxnum-par {
    position: absolute;
    top: 68px;
    right: 23px;
    color: #666;
    font-size: 24px;
    white-space: nowrap;
    max-width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .bActivityItem-choose-rights-maxnum {
    color: #000;
    font-size: 26px;
  }
</style>
