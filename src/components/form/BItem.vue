<template>
  <div class="bItem-item">
    <div class="bItem-item-left">
      <span
        class="bItem-item-title eee"
      >{{title || placeholder}}</span>
      <slot name="left"></slot>
    </div>
    <div
      class="bItem-item-right"
      @click="rightHandle"
    >
      <span
        v-if="placeholder"
        class="bItem-item-right-val"
      >{{value || placeholder}}</span>
      <span
        v-else
        class="bItem-item-right-val"
        v-show="value"
      >{{value}}</span>
      <slot name="right"></slot>
      <i
        v-if="arrow"
        class="iconfont"
        :class="[iconClass]"
      ></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BItem',
  props: {
    // 是否显示右箭头
    arrow: {
      type: Boolean,
      default: false
    },
    // 标题
    title: {
      default: ''
    },
    // 内容
    value: {
      default: ''
    },
    // 右侧图标class
    iconClass: {
      type: String,
      default: 'icon-youjiantou'
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  methods: {
    rightHandle() {
      /* 右箭头点击事件 */
      this.$emit('rightClick', this);
    }
  }
};
</script>

<style lang="scss">
  .bItem-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 74px;
    background: #fff;
    font-size: 28px;
    //border-bottom: 1px solid #1C1C21;
    padding-left: 24px;
    padding-right: 24px;
  }

  .bItem-item-title {
    color: #333;
  }

  .bItem-item-right {
    display: flex;
    align-items: center;

    & > .iconfont {
      margin-left: 12px;
      font-size: 26px;
      color: #D9D9D9;
    }
  }

  .bItem-item-right-val {
    color: #333;
  }
</style>
