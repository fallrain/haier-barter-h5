<template>
  <div class="b-pop-checkList">
    <md-popup
      v-model="popupShow"
      position="bottom"
    >
      <md-popup-title-bar
        v-bind="$attrs"
        ok-text="确定"
        cancel-text="取消"
        @confirm="confirm()"
        @cancel="popupShow = false"
      ></md-popup-title-bar>
      <div class="b-pop-checkList-cnt">
        <ul>
          <li
            class="b-pop-checkList-item"
            :class="[checkIds.some(v=>v===item.id) && 'active']"
            v-for="(item,index) in list"
            :key="index"
            @click="checkboxClick(item)"
          >
            <span class="b-pop-checkList-item-name">{{item.name}}</span>
            <div>
              <input
                v-if="item.reason!==undefined"
                class="b-pop-checkList-item-input"
                type="text"
                v-model="item.reason"
                :placeholder="item.placeholder || '请输入'"
              >
              <i
                class="b-pop-checkList-icon iconfont"
                :class="[checkIds.some(v=>v===item.id) && 'icon-duihao']"
              ></i>
            </div>
          </li>
        </ul>
      </div>
    </md-popup>
  </div>
</template>

<script>
import {
  Popup,
  PopupTitleBar
} from 'mand-mobile';

export default {
  name: 'BPopCheckList',
  inheritAttrs: true,
  components: {
    'md-popup': Popup,
    'md-popup-title-bar': PopupTitleBar
  },
  props: {
    // 类型：checkbox radio
    type: {
      type: String,
      default: 'checkbox'
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
      checkIds: JSON.parse(JSON.stringify(this.value))
    };
  },
  watch: {
    show(newVal) {
      this.popupShow = newVal;
    },
    popupShow(newVal) {
      this.$emit('update:show', newVal);
    }
  },
  methods: {
    checkboxClick({ id }) {
      const i = this.checkIds.findIndex(v => id === v);
      if (this.type === 'radio') {
        this.checkIds = [id];
        this.$emit('itemClick', this.checkIds);
        return;
      }
      if (i === -1) {
        this.checkIds.push(id);
      } else {
        this.checkIds.splice(i, 1);
      }
      this.$emit('itemClick', this.checkIds);
    },
    chooseGiftClick(item) {
      this.$emit('chooseGift', item);
    },
    confirm() {
      /* 确定 */
      this.$emit('input', this.checkIds);
      this.$emit('confirm', this.checkIds);
      this.popupShow = false;
    }
  }
};
</script>

<style lang="scss">
  .b-pop-checkList {
    .md-popup-title-bar {
      // height: 80px;

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
  }

  .b-pop-checkList-cnt {
    background: #fff;
    padding-bottom: 24px;
  }

  .b-pop-checkList-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 24px;
    padding-right: 24px;
    height: 80px;
    border-bottom: 1px solid #D0D0D0;

    &.active {
      .b-pop-checkList-item-name {
        color: #1969C6;
      }
    }
  }

  .b-pop-checkList-icon {
    font-size: 32px;
    color: #1969C6;
  }

  .b-pop-checkList-item-name {
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
</style>
