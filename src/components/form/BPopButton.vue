<template>
  <div class="b-pop-button">
    <md-popup
      v-model="popupShow"
      position="top"
      transition="fade"
    >
      <div class="b-pop-button-cnt">
        <ul class="b-pop-button-cnt-list">
          <li
            class="b-pop-button-cnt-list-item"
            :class="[checkIds.some(v=>v===item.itemCode) && 'active']"
            v-for="(item,index) in list"
            :key="index"
            @click="checkboxClick(item)"
          >
            <span class="b-pop-button-cnt-list-item-name">{{item.itemName}}</span>
          </li>
        </ul>
        <div>
          <button
            type="button"
            class="confirmbtn"
            @click="checkboxClickConfirm()"
          >确定
          </button>
        </div>
      </div>
    </md-popup>
  </div>
</template>

<script>
import {
  Popup,
} from 'mand-mobile';

export default {
  name: 'BPopButton',
  inheritAttrs: true,
  components: {
    'md-popup': Popup,
  },
  props: {
    // 类型：checkbox radio
    type: {
      type: String,
      default: 'checkbox'
    },
    // 是否在radio状态下也可通过再次点击取消选中状态
    radioCancel: {
      type: Boolean,
      default: false
    },
    value: {
      type: Array,
      default: () => []
    },
    // 显示隐藏
    show: {
      type: Boolean,
      default: false
    },
    // 多选列表
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      popupShow: this.show,
      checkIds: JSON.parse(JSON.stringify(this.value)),
    };
  },
  watch: {
    value(val) {
      this.checkIds = JSON.parse(JSON.stringify(val));
    },
    show(newVal) {
      this.popupShow = newVal;
      // 重新打开的时候刷新checkIds（点击了，未确定的情况）
      if (newVal) {
        this.checkIds = JSON.parse(JSON.stringify(this.value));
      }
    },
    popupShow(newVal) {
      this.$emit('update:show', newVal);
    }
  },
  methods: {
    checkboxClick(item) {
      const index = this.checkIds.findIndex(itemCode => itemCode === item.itemCode);
      // 多选添加数组添加id
      if (this.type === 'checkbox') {
        if (index === -1) {
          this.checkIds.push(item.itemCode);
        } else {
          this.checkIds.splice(index, 1);
        }
      } else {
        // 单选重置数组
        // 可取消radio的选中状态的话，则重置为空
        if (this.radioCancel && index > -1) {
          this.checkIds = [];
        } else {
          this.checkIds = [item.itemCode];
        }
      }
    },
    checkboxClickConfirm() {
      this.$emit('input', this.checkIds);
      this.$emit('popButtonClicked', this.checkIds);
      this.popupShow = false;
    },
  }
};
</script>

<style lang="scss">
  .b-pop-button {
    .md-popup-title-bar {
      // height: 100px;

      .title-bar-left {
        font-size: 28px;
        color: #BBB;
      }

      .title-bar-title {
        p.title {
          font-size: 28px;
          color: #333;
        }
      }

      .title-bar-right {
        font-size: 28px;
        color: #1969C6;
      }
    }

    .md-popup-mask {
      height: 1160px;
      top: 180px;
    }
  }

  .b-pop-button-cnt {
    background: #fff;
    padding-bottom: 16px;
  }

  .b-pop-button-cnt-list {
    &:after {
      content: '';
      display: block;
      clear: both;
    }
  }

  .b-pop-button-cnt-list-item {
    // width: 180px;
    height: 60px;
    margin-top: 10px;
    margin-left: 24px;
    padding-left: 24px;
    padding-right: 24px;
    line-height: 60px;
    background: #fff;
    text-align: center;
    color: #666666;
    border: 1px #cccccc solid;
    font-size: 24px;
    border-radius: 30px;
    float: left;

    &.active {
      border-color: #1969C6;

      .b-pop-button-cnt-list-item-name {
        color: #1969C6;
      }
    }
  }

  .b-pop-checkList-icon {
    font-size: 32px;
    color: #1969C6;
  }

  .confirmbtn {
    width: 120px;
    font-size: 28px;
    color: white;
    background-color: #1969C6;
    text-align: center;
    padding: 10px 15px;
    margin-left: 600px;
    border-radius: 30px;
    margin-top: 16px;
  }

  .b-pop-button-cnt-list-item-name {
    font-size: 28px;
    color: #666;
  }

  .b-pop-checkList-item-input {
    background: transparent;
    border: 0;
    height: 30px;
    font-size: 28px;
    color: #999;
    text-align: right;
    width: 320px;
    padding-right: 10px;
  }

  .md-popup-box {
    margin-top: 160px !important;
  }

</style>
