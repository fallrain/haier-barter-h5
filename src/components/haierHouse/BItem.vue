<template>
<div class="BItem-par">
  <div>
    <text v-if="required" class="bt2-houseApply-card-item-star">*
    </text>
    <text class="bt2-houseApply-card-item-name">{{title}}</text>
    <slot name="title"></slot>
  </div>
  <div class="BItem-left">
    <slot name="left"></slot>
  </div>
  <div class="BItem-middle">
    <slot name="middle"></slot>
  </div>
  <div v-if="right" class="BItem-right" @click="rightClick">
    <i class="iconfont icon-youjiantou1"></i>
  </div>
</div>
</template>

<script>
export default {
  name: 'BItem',
  props: {
    // 是否显示星号
    required: {
      type: Boolean,
      default: false
    },
    // 标题
    title: {
      type: String
    },
    // 是否显示右箭头
    right: {
      type: Boolean,
      default: false
    },
    // 箭头点击事件
    rightClick: {
      type: Function,
      default() {}
    }
  }
};
</script>

<style lang="scss">
.BItem-par {
  display: flex;
  width: 100%;
  align-items: center;
}

.BItem-right {}

.BItem-middle {
  flex-grow: 1;
}
.BItem-left {
  margin-left: 10px;
}
</style>
