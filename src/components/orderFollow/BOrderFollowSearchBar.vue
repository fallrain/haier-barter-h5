<template>
  <div>
    <div class="bar-v">
      <div
        class="bar-class"
        v-for="(item,index) in headList"
        :key="index"
      >
        <p
          class="order-span"
          v-bind:class="{active:item.isActive}"
          @click="headSwitch(index)"
        >{{item.name}}
          <i class="iconfont icon-jiantou9" v-show="!item.isActive"></i>
          <i class="iconfont2 icon-xialaactive-copy" v-show="item.isActive"></i>
        </p>
      </div>
    </div>
    <b-pop-sort-type
      :show.sync="sortShow"
      :list="sortList"
      :value="sortType"
      @checkClick="checkClicked"
    >
    </b-pop-sort-type>
    <b-pop-button
      :show.sync="scenarioShow"
      :list="scenarioList"
      @popButtonClicked="buttonClicked"
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
    }
  },
  data() {
    return {
      headList: [
        {
          name: '排序',
          isActive: false,
          icon: '@/assets/images/orderFollow-up/xiala@3x.png',
          activeIcon: '@/assets/images/orderFollow-up/shangla@3x.png'
        },
        {
          name: '业务场景',
          isActive: false,
          icon: '@/assets/images/orderFollow-up/xiala@3x.png',
          activeIcon: '@/assets/images/orderFollow-up/shangla@3x.png'
        },
        /** *****功能未实现****** */
        // {
        //   name: '筛选',
        //   isActive: false,
        //   icon: '@/assets/images/orderFollow-up/shaixuan@3x.png',
        //   activeIcon: '@/assets/images/orderFollow-up/shaixuan@3x.png'
        // }
      ],
      preIndex: '',
      sortShow: false,
      scenarioShow: false,
      sortType: ['1'],
      sortList: [
        {
          id: '1',
          name: '智能排序'
        },
        {
          id: '2',
          name: '按时间倒序'
        },
        {
          id: '3',
          name: '按品牌'
        },
        {
          id: '4',
          name: '按成交可能性'
        }
      ],
      checkedsortId: '',
      checkedButtonId: '',
    };
  },
  methods: {
    headSwitch(index) {
      if (index === this.preIndex) {
        this.headList[index].isActive = false;
        this.preIndex = '';
        this.sortShow = false;
        this.scenarioShow = false;
        return;
      }
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
  }
};
</script>

<style scoped lang="scss">
  .bar-v {
    background-color: white;
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
  }

  .order-span-blue {
    display: inline-block;
    color: #1969c6;
    font-size: 28px;
    padding-left: 56px;
    line-height: 72px;
  }
</style>
