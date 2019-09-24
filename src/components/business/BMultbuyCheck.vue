<template>
  <div>
    <div class="b-multbuy-check-head">{{title}}</div>
    <div class="b-multbuy-check-par">
      <ul class="b-multbuy-check-list">
        <li
          v-if="checkAll"
          class="b-multbuy-check-item"
          :class="{active:checkdAll}"
          @click="checkAllClick"
        >
          <span>全部</span>
        </li>
        <li
          class="b-multbuy-check-item"
          :class="[value.some(v=>v===person.hmcId) && 'active']"
          v-for="(person,index) in persons"
          :key="index"
          @click="checkClick(person)"
        >
          <span>{{person.username}}</span>
          <span class="b-multbuy-check-item-industry">{{person.industry}}</span>
        </li>
      </ul>
      <p
        v-if="tips"
        class="b-multbuy-check-item-tips"
      >
        <span class="b-multbuy-check-item-tips-title">温馨提示：</span>{{tips}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BMultbuyCheck',
  props: {
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 套购人
    persons: {
      type: Array,
      default: () => []
    },
    // 温馨提示内容
    tips: {
      type: String,
      default: ''
    },
    // 是否带全选
    checkAll: {
      type: Boolean,
      default: false
    },
    // 选中的id
    value: {
      type: Array,
      default: () => []
    },
    // 类型 checkbox radio
    type: {
      type: String,
      default: 'checkbox'
    }
  },
  data() {
    return {
    };
  },
  computed: {
    checkdAll() {
      /* 是否选中全部 */
      return !!(this.value && this.value.length && this.value.length === this.persons.length);
    }
  },
  methods: {
    checkAllClick() {
      /* 选中全部 */
      let checkIds;
      if (!this.checkdAll) {
        checkIds = this.persons.map(v => v.hmcId);
      } else {
        checkIds = [];
      }
      this.$emit('input', checkIds);
    },
    checkClick({ hmcId }) {
      /* 选中 */
      const i = this.value.findIndex(v => hmcId === v);
      let values = [];
      if (this.type === 'radio') {
        values = [hmcId];
        this.$emit('radioCheck', values);
      } else {
        const checkIds = [...this.value];
        if (i === -1) {
          checkIds.push(hmcId);
        } else {
          checkIds.splice(i, 1);
        }
        values = checkIds;
      }

      this.$emit('input', values);
    }
  }
};
</script>

<style lang="scss">
  .b-multbuy-check-head {
    color: #0D0408;
    font-size: 28px;
    line-height: 1;
    margin-bottom: 28px;
  }

  .b-multbuy-check-par {
    padding: 15px 24px;
    border: 1px solid #D0D0D0;
  }

  .b-multbuy-check-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .b-multbuy-check-item {
    width: 188px;
    height: 60px;
    line-height: 60px;
    border-radius: 8px;
    color: #666;
    border: 1px solid #D0D0D0;
    font-size: 28px;
    margin-right: 42px;
    margin-bottom: 16px;
    text-align: center;

    &:nth-child(3n) {
      margin-right: 0;
    }

    &.active {
      border: 1px solid #1969C6;
      color: #1969C6;
    }
  }

  .b-multbuy-check-item-industry {
    font-size: 22px;
    margin-left: 8px;
  }

  .b-multbuy-check-item-tips {
    color: #999;
    font-size: 22px;
    line-height: 28px;
  }

  .b-multbuy-check-item-tips-title {
    color: #F4A623;
  }
</style>
