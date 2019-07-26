<template>
  <div>
    <ol class="bCheckbox-list">
      <li
        class="bCheckbox-item"
        v-for="(item,i) in data"
        :key="item.id"
      >
        <i
          class="bCheckbox-icon iconfont"
          :class="[value.some(v=>v===i)?'icon-duoxuankuang1':'icon-duoxuankuang']"
          @click="checkboxClick(i)"
        ></i>
        <div>
          <p class="bActivityList-activity-name">{{item.activityName}}</p>
          <div class="bActivityList-activity-description">
            <span class="bActivityList-activity-description-inf">{{item.inf}}</span>或
            <button
              type="button"
              class="common-btn-del"
            >选择礼品
            </button>
          </div>
        </div>
        <div class="bActivityList-activity-num-par">
          剩余<span class="bActivityList-activity-num">{{item.num}}</span>份
        </div>
      </li>
    </ol>
  </div>
</template>
<script>
export default {
  name: 'BActivityList',
  props: {
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
  }

  .bCheckbox-list {
  }

  .bCheckbox-item {
    display: flex;
    align-items: center;
    min-height: 120px;
    border-bottom: 1px dashed #D0D0D0;
  }

  .bActivityList-activity-description {
    display: flex;
    align-items: center;
    color: #333;
    font-size: 24px;

    .common-btn-del {
      margin-left: 15px;
      height: 44px;
      line-height: 44px;
      padding-top: 0;
      padding-bottom: 0;
    }
  }

  .bActivityList-activity-description-inf {
    margin-right: 20px;
    color: #EF5A4B;
    font-size: 24px;
  }

  .bActivityList-activity-num-par {
    margin-left: auto;
    font-size: 24px;
    color: #666;
  }

  .bActivityList-activity-num {
    font-size: 24px;
    color: #EF5A4B;
  }
</style>
