<template>
  <div>
    <div class="bar-v">
      <div
        class="bar-class"
        v-for="(item,index) in headList"
        :key="index"
        v-show="item.show"
      >
        <p
          class="order-span"
          v-bind:class="{active:item.isActive}"
          @click="headSwitch(index,item)"
        >{{item.name}}
          <i
            class="iconfont"
            :class="[
              item.icon || 'icon-jiantou9',
              item.isActive && 'active',
              item.isActive && item.activeClass
            ]"
          ></i>
        </p>
      </div>
      <slot>
      </slot>
    </div>
    <b-pop-sort-type
      :show.sync="sortShow"
      :list="sortList"
      v-model="sortTypeTemp"
      @checkClick="checkClicked"
      @popupHide="popupHide"
    >
    </b-pop-sort-type>
    <b-pop-button
      :type="businessCheckType"
      :radioCancel="businessTypeRadioCancel"
      :show.sync="scenarioShow"
      :list="scenarioList"
      v-model="businessTypeTemp"
      @popButtonClicked="buttonClicked"
      @popupHide="popupHide"
    ></b-pop-button>
  </div>
</template>

<script>
import {
  BPopButton,
  BPopSortType
} from '@/components/form';

export default {
  name: 'BOrderFollowSearchBar',
  components: {
    BPopButton,
    BPopSortType,
  },
  props: {
    // 业务场景下拉数据
    scenarioList: {
      type: Array,
      default: () => []
    },
    // 场景类型
    businessType: {
      type: String
    },
    // 业务场景选择类型:radio checkbox
    businessCheckType: {
      type: String
    },
    // 业务场景选择类型radios是否可取消
    businessTypeRadioCancel: {
      type: Boolean,
      default: false
    },
    // 排序类型id
    sortArray: {
      type: Array,
      default: () => []
    },
    // 排序类型
    sortType: {
      type: String
    },
    // 排序类型
    defalutCheckedsortId: {
      type: String
    },
    // 是否显示业务场景
    isShowScenario: {
      type: Boolean,
      default: true
    },
    // 是否显示筛选,默认不显示（场景少）
    isShowFilter: {
      type: Boolean,
      default: false
    },
    // 额外的搜索区按钮，结构同headList
    otherHeadList: {
      type: Array
    }
  },
  data() {
    return {
      headList: [
        {
          show: true,
          name: '排序',
          isActive: false,
          activeClass: 'reverse'
        },
        {
          show: this.isShowScenario,
          name: '业务场景',
          isActive: false,
          activeClass: 'reverse'
        }
      ],
      businessTypeTemp: [],
      preIndex: '',
      sortShow: false,
      scenarioShow: false,
      // 所有的排序类型
      sortListTemp: [
        {
          id: '1',
          name: '智能排序'
        },
        {
          id: '2',
          name: '按时间倒序'
        },
      ],
      sortTypeTemp: this.sortType.split(',') || [],
      checkedsortId: '',
      checkedButtonId: '',
    };
  },
  created() {
    this.setSearchOptions();
    this.businessTypeTemp.push(this.defalutCheckedsortId);
  },
  watch: {
    sortType(val) {
      this.sortTypeTemp = val.split(',');
    },
    sortTypeTemp(val) {
      // 更新排序id
      this.$emit('update:sortType', val.join(','));
    },
    businessType(val) {
      this.businessTypeTemp = val.split(',');
    },
    businessTypeTemp(val) {
      // 更新场景id
      this.$emit('update:businessType', val.join(','));
    },
  },
  methods: {
    setSearchOptions() {
      /* 设置搜索参数 */
      // sortIds
      // 排序方式，有传入用传入，无传入用默认的
      if (this.sortArray.length) {
        this.sortList = this.sortArray;
      } else {
        this.sortList = this.sortListTemp;
      }
      // 搜索区其他按钮
      if (this.otherHeadList) {
        this.headList = this.headList.concat(this.otherHeadList);
      }
    },
    headSwitch(index, item) {
      if (index === this.preIndex) {
        this.headList[index].isActive = false;
        this.preIndex = '';
        this.sortShow = false;
        this.scenarioShow = false;
      } else {
        for (let i = 0; i < this.headList.length; i++) {
          if (i === index) {
            this.preIndex = index;
            this.headList[i].isActive = true;
          } else {
            this.headList[i].isActive = false;
          }
        }
        if (index === 0) {
          this.sortShow = true;
          this.scenarioShow = false;
        } else if (index === 1) {
          this.sortShow = false;
          this.scenarioShow = true;
        } else {
          this.sortShow = false;
          this.scenarioShow = false;
        }
      }

      if (item.customeClick) {
        item.customeClick();
      }
    },
    checkClicked(val) {
      this.checkedsortId = val[0];
      for (let i = 0; i < this.headList.length; i++) {
        this.headList[i].isActive = false;
      }
      this.$emit('checkClick', this.checkedsortId);
    },
    stopProcess() {
      const e = window.event;
      if (e.stopPropagation) {
        e.stopPropagation();
        // 阻止事件 冒泡传播
      } else {
        e.cancelBubble = true; // ie兼容
      }
    },
    buttonClicked(val) {
      this.stopProcess();
      this.checkedButtonId = val[0];
      for (let i = 0; i < this.headList.length; i++) {
        this.headList[i].isActive = false;
      }
      this.$emit('popButtonClicked', val);
    },
    popupHide() {
      /* 隐藏 */
      this.sortShow = false;
      this.scenarioShow = false;
      // 取消active状态
      this.headList.forEach((v) => {
        v.isActive = false;
      });
    }
  }
};
</script>

<style scoped lang="scss">
  .bar-v {
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    width: 100%;
    height: 72px;
    border-bottom: 1px solid #eee;
    /*position: fixed;
    top: 90px;*/
  }

  .bar-class .order-span.active {
    color: #1969c6;
  }

  .bar-class {
    height: 72px;
    width: 360px;
    float: left;
    position: relative;

    .iconfont {
      color: #666666
    }

    .iconfont2 {
      color: #1969c6;
      font-family: "iconfont" !important;
      font-size: 16px;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

  }

  .order-span {
    display: inline-block;
    color: #666666;
    font-size: 28px;
    padding-left: 56px;
    line-height: 72px;

    .iconfont {
      font-size: 28px;
      vertical-align: top;
      display: inline-block;
    }

    .active {
      color: #1969c6;
    }

    .reverse {
      transform: rotateX(180deg);
    }
  }

  .order-span-blue {
    display: inline-block;
    color: #1969c6;
    font-size: 28px;
    padding-left: 56px;
    line-height: 72px;
  }
</style>
