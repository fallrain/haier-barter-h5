<template>
  <div class="b-pop">
    <md-popup
      v-model="popupShow"
      position="bottom"
    >
      <div class="b-pop-cnt">
        <slot></slot>
        <button
          type="button"
          class="common-submit-btn-default mt23"
          @click="btmConfirmClick"
        >确定</button>
      </div>
    </md-popup>
  </div>
</template>

<script>
import {
  Popup,
} from 'mand-mobile';

export default {
  name: 'BPop',
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
    btmConfirmClick() {
      /* 确定 */
      this.popupShow = false;
    }
  }
};
</script>

<style lang="scss">
  .b-pop {
    .md-popup-title-bar {
      height: 80px;

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

  .b-pop-cnt {
    background: #fff;
    padding: 24px;
  }
</style>
