<template>
  <div>
    <ol class="bCheckbox-list">
      <li
        class="bCheckbox-item"
        v-for="(item,i) in data"
        :key="item.id"
      >
        <div class="bCheckbox-item-detail-cnt">
          <p class="bActivityList-activity-name">{{item.activityName}}</p>
        </div>
        <div
          class="bActivityList-activity-num-par"
        >
          数量：<span class="bActivityList-activity-num">{{item.num}}</span>
        </div>
      </li>
    </ol>
  </div>
</template>
<script>
export default {
  name: 'BActivityList',
  props: {
    // 是否详情模式
    isDetail: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => []
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  methods: {
    checkboxClick(index) {
      const i = this.value.findIndex(v => index === v);
      if (i === -1) {
        this.value.push(index);
      } else {
        this.value.splice(i, 1);
      }
      this.$emit('input', this.value);
    },
    chooseGiftClick(item) {
      this.$emit('chooseGift', item);
    }
  }
};
</script>
<style lang="scss">
  .bCheckbox-icon {
    font-size: 40px;
    color: #479FE3;
    margin-right: 25px;

    &.icon-duoxuankuang {
      color: #D0D0D0;
    }
  }

  .bActivityList-activity-name {
    font-size: 28px;
    line-height: 1;
    color: #333;
    margin-bottom: 10px;
    width: 560px;
    p{
      line-height: 80px;
    }
  }

  .bCheckbox-list {
  }

  .bCheckbox-item {
    display: flex;
    align-items: center;
    height: 80px;
    border-bottom: 1px dashed #D0D0D0;
  }


  .bActivityList-activity-num-par {
    margin-left: auto;
    font-size: 24px;
    color: #666;
  }

  .bCheckbox-item-detail-cnt {
    border-left: 6px solid #1969C6;
    padding-left: 25px;
    padding-top: 10px;

  }
</style>
